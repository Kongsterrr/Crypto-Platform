"use client";

import { useState, useEffect, useCallback } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useRouter } from 'next/navigation'

interface CryptoDetailProps {
  id: string;
}

interface MarketData {
  current_price: { [key: string]: number };
  high_24h: { [key: string]: number };
  low_24h: { [key: string]: number };
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: { [key: string]: number };
  atl: { [key: string]: number };
}

interface CryptoDetail {
  id: string;
  symbol: string;
  name: string;
  description: { [key: string]: string };
  image: { large: string };
  market_data: MarketData;
  market_cap_rank: number;
}

interface ChartData {
  date: string;
  price: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for crypto details
const CHART_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for chart data
const TIME_PERIODS = ['1D', '7D', '14D', '30D', '90D', '1Y'];
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 1000;

// Queue for API requests
const requestQueue: (() => Promise<void>)[] = [];
let isProcessingQueue = false;

const processQueue = async () => {
  if (isProcessingQueue) return;
  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between requests
    }
  }

  isProcessingQueue = false;
};

const fetchWithRetry = async (url: string, options: RequestInit = {}, retries = MAX_RETRIES, delay = INITIAL_RETRY_DELAY): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (response.status === 429 && retries > 0) {
      console.log(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Error occurred. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
};

const getCachedData = (key: string, duration: number) => {
  const cachedData = localStorage.getItem(key);
  const cachedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (cachedData && cachedTimestamp) {
    const now = new Date().getTime();
    if (now - parseInt(cachedTimestamp) < duration) {
      return JSON.parse(cachedData);
    }
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_timestamp`, new Date().getTime().toString());
};

const formatPrice = (price: number) => {
  if (price >= 1) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (price >= 0.01) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  } else {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumSignificantDigits: 2,
      maximumSignificantDigits: 6,
    });
  }
};

export default function CryptoDetail({ id }: CryptoDetailProps) {
  const router = useRouter()
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('7D')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [priceData, setPriceData] = useState<ChartData[]>([])

  const fetchCryptoDetail = useCallback(async () => {
    try {
      const cachedData = getCachedData(`cryptoDetail_${id}`, CACHE_DURATION);
      if (cachedData) {
        setCryptoDetail(cachedData);
        setLoading(false);
        return;
      }

      const response = await fetchWithRetry(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`);
      if (!response.ok) {
        throw new Error(response.status === 429 ? "Rate limit exceeded. Please try again later." : "Failed to fetch data");
      }
      const data = await response.json();
      setCryptoDetail(data);
      setCachedData(`cryptoDetail_${id}`, data);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setLoading(false);
    }
  }, [id]);

  const fetchChartData = useCallback(async () => {
    try {
      const now = Math.floor(Date.now() / 1000);
      let from;
      switch (selectedPeriod) {
        case '1D': from = now - 24 * 60 * 60; break;
        case '7D': from = now - 7 * 24 * 60 * 60; break;
        case '14D': from = now - 14 * 24 * 60 * 60; break;
        case '30D': from = now - 30 * 24 * 60 * 60; break;
        case '90D': from = now - 90 * 24 * 60 * 60; break;
        case '1Y': from = now - 365 * 24 * 60 * 60; break;
        default: from = now - 7 * 24 * 60 * 60;
      }

      const cacheKey = `chartData_${id}_${selectedPeriod}`;
      const cachedChartData = getCachedData(cacheKey, CHART_CACHE_DURATION);
      if (cachedChartData) {
        setPriceData(cachedChartData);
        return;
      }

      const response = await fetchWithRetry(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${now}`);
      if (!response.ok) {
        throw new Error(response.status === 429 ? "Rate limit exceeded. Please try again later." : "Failed to fetch chart data");
      }
      const data = await response.json();
      const formattedData = data.prices.map(([timestamp, price]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price: price
      }));
      setPriceData(formattedData);
      setCachedData(cacheKey, formattedData);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  }, [id, selectedPeriod]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCryptoDetail();
      if (cryptoDetail) {
        await fetchChartData();
      }
    };

    requestQueue.push(fetchData);
    processQueue();
  }, [fetchCryptoDetail, fetchChartData, cryptoDetail]);

  if (loading) {
    return <div className="text-center text-white text-2xl mt-20">Loading...</div>
  }

  if (error || !cryptoDetail) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-white hover:text-pink-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="bg-red-500/20 text-red-500 p-4 rounded-md mt-4">
            {error || "Failed to load cryptocurrency data"}
          </div>
        </div>
      </div>
    )
  }

  const currentPrice = cryptoDetail.market_data.current_price.usd;
  const priceChange = cryptoDetail.market_data.price_change_24h;
  const priceChangePercent = cryptoDetail.market_data.price_change_percentage_24h;
  const isNegative = priceChange < 0;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-white hover:text-pink-500"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        {/* Coin Name, Symbol, and Image */}
        <div className="flex items-center justify-center mb-6">
          <img
            src={cryptoDetail.image.large}
            alt={`${cryptoDetail.name} logo`}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {cryptoDetail.name} ({cryptoDetail.symbol.toUpperCase()})
            </h1>
          </div>
        </div>

        {/* Price Section */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">
            {formatPrice(currentPrice)}
          </div>
          <div className={`flex items-center justify-center gap-2 ${isNegative ? 'text-pink-500' : 'text-green-500'}`}>
            <span>{isNegative ? '▼' : '▲'}</span>
            <span>{formatPrice(Math.abs(priceChange))}</span>
            <span>({priceChangePercent.toFixed(2)}%) Today</span>
          </div>
        </div>

        {/* Price Chart */}
        <div className="h-[200px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#ff007a" 
                strokeWidth={2}
                dot={false}
              />
              <XAxis dataKey="date" hide={true} />
              <YAxis hide={true} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: number) => [formatPrice(value), 'Price']}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Time Period Selector */}
        <div className="flex justify-between mb-8">
          {TIME_PERIODS.map((period) => (
            <Button
              key={period}
              variant="ghost"
              className={`${
                selectedPeriod === period 
                  ? 'text-pink-500 bg-pink-500/10' 
                  : 'text-gray-400'
              } hover:text-pink-400`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <div className={`text-gray-300 ${!showFullDescription && 'line-clamp-3'}`}>
            <div dangerouslySetInnerHTML={{ __html: cryptoDetail.description.en }} />
          </div>
          <Button
            variant="link"
            className="text-pink-500 hover:text-pink-400 p-0 h-auto mt-2"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Stats</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-1">52 wk high</p>
              <p className="text-xl font-semibold">
                {formatPrice(cryptoDetail.market_data.ath.usd)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">24h volume</p>
              <p className="text-xl font-semibold">
                {formatPrice(cryptoDetail.market_data.total_volume.usd)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">52 wk low</p>
              <p className="text-xl font-semibold">
                {formatPrice(cryptoDetail.market_data.atl.usd)}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Market cap</p>
              <p className="text-xl font-semibold">
                {formatPrice(cryptoDetail.market_data.market_cap.usd)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-400 mb-1">Circulating supply</p>
              <p className="text-xl font-semibold">
                {cryptoDetail.market_data.circulating_supply.toLocaleString()} {cryptoDetail.symbol.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}