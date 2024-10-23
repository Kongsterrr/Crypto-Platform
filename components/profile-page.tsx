"use client"

import React, { useState, useMemo } from 'react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title)

// Generate more realistic earnings data
const generateEarningsData = (days: number) => {
  let value = 12000 // Starting value
  const data = []
  const now = Date.now()
  const hoursInDay = 24
  
  for (let i = 0; i < days * hoursInDay; i++) {
    const hourChange = (Math.random() - 0.5) * 0.01 // Smaller hourly fluctuations
    value *= (1 + hourChange)
    
    // Add some occasional sharp movements
    if (Math.random() < 0.01) { // 1% chance of a sharp movement
      value *= (1 + (Math.random() - 0.5) * 0.05) // Up to 2.5% sudden change
    }
    
    // Ensure the value doesn't go below a certain threshold
    value = Math.max(value, 10000)
    
    if (i % 24 === 0 || i === days * hoursInDay - 1) { // Record daily data points
      data.push({
        date: new Date(now - (days * hoursInDay - i) * 60 * 60 * 1000).toISOString(),
        value: Math.round(value * 100) / 100 // Round to 2 decimal places
      })
    }
  }
  return data
}

const ProfilePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1Y")

  const earningsData = useMemo(() => generateEarningsData(365), []) // Generate data for a year

  const holdingsData = {
    labels: ['BTC', 'ETH', 'ADA'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#F7931A', '#627EEA', '#0033AD'],
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
      }
    ]
  }

  const cryptoList = [
    { name: 'Bitcoin', symbol: 'BTC', amount: '0.5', value: '$15,000' },
    { name: 'Ethereum', symbol: 'ETH', amount: '5', value: '$10,000' },
    { name: 'Cardano', symbol: 'ADA', amount: '1000', value: '$500' }
  ]

  const periods = ["1D", "1W", "1M", "3M", "YTD", "1Y"]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const calculateChange = () => {
    const latestValue = earningsData[earningsData.length - 1].value
    const previousValue = earningsData[earningsData.length - 2].value
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
    const filteredData = earningsData.filter(item => {
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
  }, [earningsData, selectedPeriod])

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
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto p-4">
        <header className="flex items-center mb-6">
     
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/5 md:pr-10">
              <img
                src="/images/jack.png"
                alt="Profile"
                className="w-80 h-80 mx-auto rounded-full mb-4"
              />
              <h2 className="text-2xl font-semibold text-center">John Doe</h2>
              <p className="text-yellow-300 text-center mb-4">Crypto Enthusiast</p>
              <p className="text-3xl font-bold text-center mb-2">$75,500</p>
              <p className="text-yellow-300 text-center mb-10">Total Portfolio Value</p>

              <div className="w-full h-64 relative ml-6">
              <Doughnut 
                data={holdingsData}
                options={{
                  plugins: {
                    legend: {
                      position: 'right' as const,
                      labels: {
                        color: 'white',
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          const label = context.label || '';
                          const value = context.formattedValue;
                          return `${label}: ${value}`;
                        }
                      }
                    }
                  },
                  cutout: '55%', // Adjusted from 70% to 55% to make the bar wider
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
             
              </div>
          </div>

          <div className="md:w-3/5">
            <Card className="bg-black bg-opacity-50 rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h3 className="text-lg font-semibold mb-2 sm:mb-0 text-yellow-300">All-Time Earnings</h3>
                <div className="text-right">
                  <p className={`text-xl font-bold ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {change.isPositive ? '▲' : '▼'} {change.value}
                  </p>
                  <p className={`text-base ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    ({change.percent}%) Today
                  </p>
                </div>
              </div>

              <div className="h-[250px] w-full">
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
                    <RechartsTooltip
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

            <Card className="bg-black bg-opacity-50 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-300">Crypto Shareholdings</h3>
              {cryptoList.map((crypto, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-yellow-900 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-600 mr-3"></div>
                    <div>
                      <p className="font-semibold">{crypto.name}</p>
                      <p className="text-sm text-yellow-300">{crypto.amount} {crypto.symbol}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold mr-2">{crypto.value}</p>
                    <ChevronRight className="w-5 h-5 text-yellow-300" />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage