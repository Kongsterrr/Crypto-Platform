"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Link from 'next/link'

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function CryptoPlatform() {
  const { isLoggedIn, login } = useAuth()
  const [sortByProfit, setSortByProfit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        // Check if we have cached data
        const cachedData = localStorage.getItem('cryptoData');
        const cachedTimestamp = localStorage.getItem('cryptoDataTimestamp');

        if (cachedData && cachedTimestamp) {
          const now = new Date().getTime();
          if (now - parseInt(cachedTimestamp) < CACHE_DURATION) {
            setCryptos(JSON.parse(cachedData));
            setLoading(false);
            return;
          }
        }

        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setCryptos(data)
        setLoading(false)

        // Cache the data
        localStorage.setItem('cryptoData', JSON.stringify(data));
        localStorage.setItem('cryptoDataTimestamp', new Date().getTime().toString());

      } catch (error) {
        setError("Failed to fetch cryptocurrency data. Please try again later.")
        setLoading(false)
      }
    }

    fetchCryptos()
  }, [])

  const sortedCryptos = sortByProfit
    ? [...cryptos].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    : cryptos

  const filteredCryptos = sortedCryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCryptos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCryptos = filteredCryptos.slice(startIndex, endIndex)

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoginMode) {
      if (username === "jackkong1999" && password === "19990317JWJ") {
        login()
        setShowAuthModal(false)
        setAuthError("")
      } else {
        setAuthError("Invalid username or password")
      }
    } else {
      console.log("Registration attempted with:", username, password)
      setAuthError("Registration functionality is not implemented yet")
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  if (loading) {
    return <div className="text-center text-white text-2xl mt-20">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 text-2xl mt-20">{error}</div>
  }

  return (
    <div className="p-4 sm:p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 text-center">
          Search for
          <br />
          cryptocurrencies
        </h1>

        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative w-full max-w-md">
            <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-full shadow-lg">
              <Input
                type="text"
                placeholder="Search cryptocurrencies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 sm:py-3 pl-4 sm:pl-5 pr-12 sm:pr-14 text-white bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300 text-sm sm:text-base"
              />
              <Button className="absolute right-0 h-full rounded-full bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80 px-3 sm:px-4">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Card 
            className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl p-3 sm:p-4 flex items-center cursor-pointer hover:bg-opacity-20 transition-all"
            onClick={() => setSortByProfit(!sortByProfit)}
          >
            <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="text-sm sm:text-base">{sortByProfit ? "Most Profit" : "Least Profit"}</span>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentCryptos.map((crypto) => (
            <Link href={`/home/${crypto.id}`} key={crypto.id}>
              <Card className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl p-3 sm:p-4 flex items-center hover:bg-opacity-20 transition-all h-[120px] cursor-pointer">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex-grow overflow-hidden">
                  <h3 className="font-semibold text-base sm:text-lg truncate" style={{ fontSize: crypto.name.length > 12 ? '0.875rem' : '1rem' }}>{crypto.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-300">{crypto.symbol.toUpperCase()}</p>
                  <div className="flex justify-between items-center mt-1 sm:mt-2">
                    <p className="font-bold text-yellow-400 text-sm sm:text-base">${crypto.current_price.toLocaleString()}</p>
                    <p className={`text-xs sm:text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 space-x-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-gradient-to-b from-black via-yellow-900 to-yellow-600 bg-opacity-40 backdrop-blur-xl text-white p-4 sm:p-6 rounded-lg w-full max-w-sm border border-yellow-500 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-300">{isLoginMode ? "Login" : "Register"}</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAuthModal(false)} className="text-yellow-300 hover:text-yellow-200">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <form onSubmit={handleAuth}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-yellow-200">Username</label>
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-black bg-opacity-20 border-yellow-500 text-white placeholder-yellow-200 placeholder-opacity-50 focus:border-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-yellow-200">Password</label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-black bg-opacity-20 border-yellow-500 text-white placeholder-yellow-200 placeholder-opacity-50 focus:border-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
                />
              </div>
              {authError && <p className="text-red-400 mb-4 text-sm">{authError}</p>}
              <Button type="submit" className="w-full bg-yellow-500 bg-opacity-80 text-black  hover:bg-yellow-600 hover:bg-opacity-80">
                {isLoginMode ? "Login" : "Register"}
              </Button>
            </form>
            <p className="mt-4 text-center text-yellow-200 text-sm">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-yellow-300 hover:text-yellow-200 ml-1"
              >
                {isLoginMode ? "Register" : "Login"}
              </Button>
            </p>
          </Card>
        </div>
      )}
    </div>
  )
}