"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Bell, Copy, AlertCircle, FileDown } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

interface Trader {
  id: string
  name: string
  avatar: string
  balance: number
  solBalance: number
  totalProfit: {
    amount: number
    percentage: number
  }
  txCount: number
  lastActive: string
  hasAlert: boolean
}

const traders: Trader[] = [
  {
    id: "1",
    name: "蛙哥",
    avatar: "/images/investor1.png",
    balance: 8600000,
    solBalance: 380.5,
    totalProfit: {
      amount: 7000000,
      percentage: 26.1
    },
    txCount: 1866,
    lastActive: "2h",
    hasAlert: true
  },
  {
    id: "2",
    name: "100K可跟",
    avatar: "/images/investor2.png",
    balance: 348100,
    solBalance: 90.3,
    totalProfit: {
      amount: 880900,
      percentage: 69.6
    },
    txCount: 4387,
    lastActive: "0s",
    hasAlert: true
  },
  {
    id: "3",
    name: "不是机器人",
    avatar: "/images/investor4.png",
    balance: 120800,
    solBalance: 4.6,
    totalProfit: {
      amount: 119900,
      percentage: 42.3
    },
    txCount: 394,
    lastActive: "0s",
    hasAlert: true
  }
]

const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return `$${amount.toFixed(2)}`
}

export default function FollowPage() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <Tabs defaultValue="follow" className="w-full sm:w-auto">
            <TabsList className="bg-white/10">
              <TabsTrigger value="watchlist" className="text-sm">Watchlist</TabsTrigger>
              <TabsTrigger value="follow" className="text-sm">Follow</TabsTrigger>
              <TabsTrigger value="activity" asChild>
                <Link href="/activity">Activity</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Input
                type="text"
                placeholder="Search Wallet"
                className="w-full sm:w-[300px] bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <AlertCircle className="w-4 h-4 mr-2" />
              TG Alert
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Bell className="w-4 h-4 mr-2" />
              0-Latency Alert
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <FileDown className="w-4 h-4 mr-2" />
              Bulk Import/Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Wallet</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Balance</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">SOL Balance</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Total Profit</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">30D TXs</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Last Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">TG Alert</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {traders.map((trader) => (
                <tr key={trader.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleFavorite(trader.id)}
                        className={`text-gray-400 hover:text-yellow-500 ${
                          favorites.has(trader.id) ? 'text-yellow-500' : ''
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={favorites.has(trader.id) ? "currentColor" : "none"} />
                      </button>
                      <div className="flex items-center gap-2">
                        <img src={trader.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <span className="text-white font-medium">{trader.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{formatCurrency(trader.balance)}</td>
                  <td className="py-4 px-4 text-white">{trader.solBalance}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-white">{formatCurrency(trader.totalProfit.amount)}</span>
                      <span className="text-green-500">+{trader.totalProfit.percentage}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">{trader.txCount}</td>
                  <td className="py-4 px-4 text-white">{trader.lastActive}</td>
                  <td className="py-4 px-4">
                    {trader.hasAlert && (
                      <Bell className="w-4 h-4 text-yellow-500" />
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}