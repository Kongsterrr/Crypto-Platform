"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Star, ArrowUp, ArrowDown, CircleDollarSign, Timer, TrendingUp, Rocket } from 'lucide-react'
import { Switch } from "@/components/ui/switch"

interface MemeCoin {
  id: string
  name: string
  symbol: string
  timeAgo: string
  priceChange: number
  txCount: number
  volume: number
  marketCap: number
  holders: number
  price: number
  status: "new" | "completing" | "completed"
}

const sampleMemeCoins: MemeCoin[] = [
  {
    id: "doge-moon",
    name: "DogeMoon",
    symbol: "DGMN",
    timeAgo: "6s",
    priceChange: -2.5,
    txCount: 142,
    volume: 15800,
    marketCap: 89600,
    holders: 250,
    price: 0.00042,
    status: "new"
  },
  {
    id: "pepe-king",
    name: "PepeKing",
    symbol: "PEPEK",
    timeAgo: "2m",
    priceChange: 15.7,
    txCount: 567,
    volume: 45900,
    marketCap: 156700,
    holders: 890,
    price: 0.00078,
    status: "completing"
  },
  {
    id: "rocket-doge",
    name: "RocketDoge",
    symbol: "RKDG",
    timeAgo: "15m",
    priceChange: 32.4,
    txCount: 892,
    volume: 78500,
    marketCap: 234500,
    holders: 1240,
    price: 0.00156,
    status: "completed"
  },
  {
    id: "shiba-moon",
    name: "ShibaMoon",
    symbol: "SHMN",
    timeAgo: "30s",
    priceChange: 5.2,
    txCount: 89,
    volume: 8900,
    marketCap: 45600,
    holders: 180,
    price: 0.00021,
    status: "new"
  },
  {
    id: "elon-mars",
    name: "ElonMars",
    symbol: "ELMRS",
    timeAgo: "5m",
    priceChange: -8.3,
    txCount: 321,
    volume: 28700,
    marketCap: 98700,
    holders: 560,
    price: 0.00052,
    status: "completing"
  },
  {
    id: "moon-lambo",
    name: "MoonLambo",
    symbol: "MLMB",
    timeAgo: "22m",
    priceChange: 18.9,
    txCount: 678,
    volume: 56400,
    marketCap: 189000,
    holders: 980,
    price: 0.00112,
    status: "completed"
  },
  {
    id: "doge-father",
    name: "DogeFather",
    symbol: "DGFTH",
    timeAgo: "1m",
    priceChange: 3.7,
    txCount: 112,
    volume: 12300,
    marketCap: 67800,
    holders: 320,
    price: 0.00035,
    status: "new"
  },
  {
    id: "safe-moon",
    name: "SafeMoon",
    symbol: "SFMN",
    timeAgo: "8m",
    priceChange: -4.6,
    txCount: 456,
    volume: 34500,
    marketCap: 123000,
    holders: 720,
    price: 0.00068,
    status: "completing"
  },
  {
    id: "floki-inu",
    name: "FlokiInu",
    symbol: "FLKI",
    timeAgo: "35m",
    priceChange: 25.1,
    txCount: 789,
    volume: 67800,
    marketCap: 210000,
    holders: 1120,
    price: 0.00138,
    status: "completed"
  }
]

const formatNumber = (num: number) => {
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

const formatPrice = (price: number) => {
  if (price < 0.0001) return price.toExponential(2)
  return price.toFixed(6)
}

export default function MemePage() {
  const [filter, setFilter] = useState("")
  const [activeTab, setActiveTab] = useState<'pump' | 'moonshot' | 'new' | 'completing' | 'soaring' | 'completed'>('pump')

  const filterCoins = (coins: MemeCoin[], status: MemeCoin["status"]) =>
    coins.filter(coin => coin.status === status)

  const tabs = [
    { id: 'new' as const, label: 'New Creation' },
    { id: 'completing' as const, label: 'Completing' },
    { id: 'soaring' as const, label: 'Soaring' },
    { id: 'completed' as const, label: 'Completed' },
  ] as const;

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="flex items-center h-16 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-yellow-500" />
                <span className={`text-lg ${activeTab !== 'moonshot' ? 'text-white font-bold' : 'text-gray-500'}`}>
                  Pump
                </span>
              </div>
              <Switch
                checked={activeTab === 'moonshot'}
                onCheckedChange={(checked) => setActiveTab(checked ? 'moonshot' : 'pump')}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-yellow-500"
              />
              <span className={`text-lg ${activeTab === 'moonshot' ? 'text-white font-bold' : 'text-gray-500'}`}>
                Moonshot
              </span>
            </div>
            <div className="flex items-center gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`rounded-md px-4 py-2 text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto p-4 pt-2 sm:p-8 sm:pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Creations Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-yellow-500" />
                <h2 className="text-lg font-bold text-white">New Creations</h2>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            {filterCoins(sampleMemeCoins, "new").map(coin => (
              <div
                key={coin.id}
                className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{coin.name}</h3>
                      <p className="text-sm text-gray-400">{coin.symbol}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-yellow-500/20 text-yellow-500">
                    {coin.timeAgo}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className={coin.priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                      {coin.priceChange}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>{formatNumber(coin.marketCap)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completing Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <h2 className="text-lg font-bold text-white">Completing</h2>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            {filterCoins(sampleMemeCoins, "completing").map(coin => (
              <div
                key={coin.id}
                className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{coin.name}</h3>
                      <p className="text-sm text-gray-400">{coin.symbol}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/20 text-green-500">
                    {coin.timeAgo}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className={coin.priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                      {coin.priceChange}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>{formatNumber(coin.marketCap)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <h2 className="text-lg font-bold text-white">Completed</h2>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            {filterCoins(sampleMemeCoins, "completed").map(coin => (
              <div
                key={coin.id}
                className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{coin.name}</h3>
                      <p className="text-sm text-gray-400">{coin.symbol}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-500">
                    {coin.timeAgo}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className={coin.priceChange >= 0 ? "text-green-500" : "text-red-500"}>
                      {coin.priceChange}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <CircleDollarSign className="w-4 h-4" />
                    <span>{formatNumber(coin.marketCap)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}