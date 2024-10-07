"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Globe, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Generate more realistic stock-like data
const generateStockData = (days: number) => {
  let value = 41605.07 // Starting from the current total investment
  const data = []
  const now = Date.now()
  const minutesInDay = 24 * 60
  
  for (let i = 0; i < days * minutesInDay; i++) {
    const minuteChange = (Math.random() - 0.5) * 0.05 // Smaller minute-by-minute fluctuations
    value *= (1 + minuteChange / 100) // Percentage change
    
    // Add some occasional sharp movements
    if (Math.random() < 0.001) { // 0.1% chance of a sharp movement
      value *= (1 + (Math.random() - 0.5) * 0.01) // Up to 0.5% sudden change
    }
    
    // Ensure the value doesn't go below a certain threshold
    value = Math.max(value, 35000)
    
    if (i % 60 === 0 || i === days * minutesInDay - 1) { // Record hourly data points
      data.push({
        date: new Date(now - (days * minutesInDay - i) * 60 * 1000).toISOString(),
        value: Math.round(value * 100) / 100 // Round to 2 decimal places
      })
    }
  }
  return data
}

const investmentData = generateStockData(365) // Generate data for a year

// Mock data for the stocks (unchanged)
const stocks = [
  { symbol: 'AMZN', shares: 6.36, change: 343.78, isPositive: true },
  { symbol: 'TSLA', shares: 10, change: 112.10, isPositive: true },
  { symbol: 'U', shares: 22.29, change: 513.25, isPositive: false },
  { symbol: 'MSFT', shares: 6, change: 184.77, isPositive: true },
  { symbol: 'NVDA', shares: 10, change: 11.80, isPositive: true },
  { symbol: 'DJT', shares: 50, change: 1207.30, isPositive: false },
]

interface InvestorDetailProps {
  investorId: string;
}

export default function InvestorDetail({ investorId }: InvestorDetailProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")

  // Mock data for the top investor
  const investorData = {
    id: "1",
    name: "Heme",
    totalInvestment: "$41,605.07",
    image: "/images/investor1.png"
  }

  console.log('Investor ID:', investorId);

  const periods = ["1D", "1W", "1M", "3M", "YTD", "1Y"]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const calculateChange = () => {
    const latestValue = investmentData[investmentData.length - 1].value
    const previousValue = investmentData[investmentData.length - 2].value
    const change = latestValue - previousValue
    const percentChange = (change / previousValue) * 100
    return {
      value: formatCurrency(change),
      percent: percentChange.toFixed(2),
      isPositive: change >= 0
    }
  }

  const change = calculateChange()

  const chartData = useMemo(() => {
    const now = new Date()
    const filteredData = investmentData.filter(item => {
      const itemDate = new Date(item.date)
      switch (selectedPeriod) {
        case "1D":
          return now.getTime() - itemDate.getTime() <= 24 * 60 * 60 * 1000
        case "1W":
          return now.getTime() - itemDate.getTime() <= 7 * 24 * 60 * 60 * 1000
        case "1M":
          return now.getTime() - itemDate.getTime() <= 30 * 24 * 60 * 60 * 1000
        case "3M":
          return now.getTime() - itemDate.getTime() <= 90 * 24 * 60 * 60 * 1000
        case "YTD":
          return itemDate.getFullYear() === now.getFullYear()
        case "1Y":
        default:
          return true
      }
    })
    return filteredData
  }, [selectedPeriod])

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem)
    switch (selectedPeriod) {
      case "1D":
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      case "1W":
      case "1M":
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
      case "3M":
      case "YTD":
      case "1Y":
        return date.toLocaleDateString([], { month: 'short', year: 'numeric' })
      default:
        return date.toLocaleDateString()
    }
  }

  const formatYAxis = (value: number) => {
    return `$${(value / 1000).toFixed(1)}k`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-yellow-900 to-yellow-600 text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-6 sm:mb-12">
        <Link href="/portfolio" className="flex items-center text-yellow-400 hover:text-yellow-200">
          <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 mr-1 sm:mr-2" />
          <span className="text-sm sm:text-base">Back to Portfolio</span>
        </Link>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">crypto</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <Card className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <Image
                src={investorData.image}
                alt={investorData.name}
                width={60}
                height={60}
                className="rounded-full mr-3 sm:mr-4"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{investorData.name}</h1>
                <p className="text-lg sm:text-xl text-yellow-400">{investorData.totalInvestment}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className={`text-xl sm:text-2xl font-bold ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {change.isPositive ? '▲' : '▼'} {change.value}
              </p>
              <p className={`text-base sm:text-lg ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                ({change.percent}%) Today
              </p>
            </div>
          </div>

          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.5)"
                  tickFormatter={formatXAxis}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  tickFormatter={formatYAxis}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4CAF50" 
                  dot={false} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-between mt-4">
            {periods.map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`${
                  selectedPeriod === period
                    ? 'bg-yellow-500 text-black'
                    : 'bg-transparent text-white'
                } hover:bg-yellow-600 hover:text-black text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 mb-2`}
              >
                {period}
              </Button>
            ))}
          </div>
        </Card>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Stocks & ETFs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stocks.map((stock) => (
            <Card key={stock.symbol} className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-xl p-3 sm:p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{stock.symbol}</h3>
                  <p className="text-xs sm:text-sm text-gray-300">{stock.shares} shares</p>
                </div>
                <div className={`flex items-center ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.isPositive ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
                  <span className="font-semibold text-sm sm:text-base">${Math.abs(stock.change).toFixed(2)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
            View Full Portfolio
          </Button>
        </div>
      </main>
    </div>
  )
}