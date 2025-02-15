"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Zap, Star, Copy, MoreHorizontal, Filter, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

interface Activity {
  id: string
  trader: {
    name: string
    avatar: string
    verified: boolean
    hasWallet: boolean
    hasAlert: boolean
  }
  timeAgo: string
  type: 'buy' | 'sell' | 'new'
  action: string
  tokenAmount: string
  tokenName: string
  tokenPrice: number
  marketCap: number
  percentageChange: number
  stats: {
    unrealizedProfit: {
      amount: number
      percentage: number
    }
    realizedProfit: {
      amount: number | 'HODL'
      percentage?: number
    }
    avgCost: number
    totalTrades: number
  }
}

const activities: Activity[] = [
  {
    id: "1",
    trader: {
      name: "不是机器人",
      avatar: "/images/investor4.png",
      verified: true,
      hasWallet: true,
      hasAlert: true
    },
    timeAgo: "3m ago",
    type: "buy",
    action: "Buy More",
    tokenAmount: "50.1B",
    tokenName: "PENGU",
    tokenPrice: 0.94984,
    marketCap: 8400000,
    percentageChange: 54.79,
    stats: {
      unrealizedProfit: {
        amount: 4625.73,
        percentage: 57.83
      },
      realizedProfit: {
        amount: 'HODL'
      },
      avgCost: 0.60181,
      totalTrades: 2
    }
  },
  {
    id: "2",
    trader: {
      name: "蛙哥",
      avatar: "/images/investor2.png",
      verified: true,
      hasWallet: true,
      hasAlert: true
    },
    timeAgo: "4m ago",
    type: "sell",
    action: "Sell part",
    tokenAmount: "500K",
    tokenName: "$horny",
    tokenPrice: 0.01022,
    marketCap: 10200000,
    percentageChange: 3.09,
    stats: {
      unrealizedProfit: {
        amount: 12000,
        percentage: 353.6
      },
      realizedProfit: {
        amount: 5057.59,
        percentage: 69.79
      },
      avgCost: 0.00225,
      totalTrades: 5
    }
  },
  {
    id: "3",
    trader: {
      name: "100K可跟",
      avatar: "/images/investor2.png",
      verified: true,
      hasWallet: true,
      hasAlert: true
    },
    timeAgo: "27m ago",
    type: "new",
    action: "New holder",
    tokenAmount: "5.2M",
    tokenName: "SIGMABOY",
    tokenPrice: 0.00065,
    marketCap: 650200,
    percentageChange: 42.32,
    stats: {
      unrealizedProfit: {
        amount: 0,
        percentage: 0
      },
      realizedProfit: {
        amount: 'HODL'
      },
      avgCost: 0.00065,
      totalTrades: 1
    }
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`
  }
  return `$${num.toFixed(2)}`
}

export default function ActivityPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Tabs defaultValue="activity" className="w-full sm:w-auto">
            <TabsList className="bg-white/10">
              <TabsTrigger value="watchlist" asChild>
                <Link href="/watchlist">Watchlist</Link>
              </TabsTrigger>
              <TabsTrigger value="follow" asChild>
                <Link href="/follow">Follow</Link>
              </TabsTrigger>
              <TabsTrigger value="activity" asChild>
                <Link href="/activity">Activity</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${
                activeFilters.includes('>5k') ? 'bg-white/20' : ''
              }`}
              onClick={() => toggleFilter('>5k')}
            >
              ${'>'} 5k
            </Button>
            <Button
              variant="outline"
              className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${
                activeFilters.includes('>1k') ? 'bg-white/20' : ''
              }`}
              onClick={() => toggleFilter('>1k')}
            >
              ${'>'} 1k
            </Button>
            <Button
              variant="outline"
              className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${
                activeFilters.includes('>100') ? 'bg-white/20' : ''
              }`}
              onClick={() => toggleFilter('>100')}
            >
              ${'>'} 100
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Filter className="w-4 h-4 mr-2" />
              6
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between">
                <div className="flex-1">
                  {/* Left side */}
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2">
                      <img src={activity.trader.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="text-white font-medium">{activity.trader.name}</span>
                          {activity.trader.verified && <Star className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <span className="text-sm text-gray-400">{activity.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Badge 
                      variant="outline" 
                      className={`
                        ${activity.type === 'buy' ? 'bg-green-500/20 text-green-500' : ''} 
                        ${activity.type === 'sell' ? 'bg-red-500/20 text-red-500' : ''}
                        ${activity.type === 'new' ? 'bg-blue-500/20 text-blue-500' : ''}
                      `}
                    >
                      {activity.action}
                    </Badge>
                    <p className="text-white mt-2">
                      {activity.tokenAmount} {activity.tokenName} (
                      {formatCurrency(activity.tokenPrice)}) at MC {formatNumber(activity.marketCap)}.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20">
                        <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                        Copy Swap
                        <span className="ml-2 text-green-500">+{activity.percentageChange}%</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right side stats */}
                <div className="ml-8 min-w-[200px]">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Unrealized Profit</span>
                        <span>Realized Profit(PnL)</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="text-green-500">
                          ${activity.stats.unrealizedProfit.amount}
                          <span className="ml-1">
                            (+{activity.stats.unrealizedProfit.percentage}%)
                          </span>
                        </div>
                        <div className={typeof activity.stats.realizedProfit.amount === 'number' ? 'text-green-500' : 'text-white'}>
                          {typeof activity.stats.realizedProfit.amount === 'number' 
            ? `$${activity.stats.realizedProfit.amount} (+${activity.stats.realizedProfit.percentage}%)`
            : activity.stats.realizedProfit.amount}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Avg Cost</span>
                        <span>Total Trades</span>
                      </div>
                      <div className="flex justify-between mt-1 text-white">
                        <span>${activity.stats.avgCost}</span>
                        <span>{activity.stats.totalTrades}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}