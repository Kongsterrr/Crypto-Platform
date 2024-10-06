"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Globe, User, ArrowUpDown, X } from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/AuthContext"

export default function CryptoPlatform() {
  const { isLoggedIn, login, logout } = useAuth()
  const [isTradable, setIsTradable] = useState(true)
  const [sortByProfit, setSortByProfit] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  const cryptos = [
    { name: "Elol Go", icon: "🔴", price: "$833,100", description: "Test lorem", profit: "+5.2%" },
    { name: "Rachele", icon: "🟠", price: "$833,100", description: "Test lorem", profit: "+3.7%" },
    { name: "Eao Madgeo", icon: "🔵", price: "$833,100", description: "Test lorem", profit: "+2.1%" },
    { name: "Caina Naci", icon: "🟡", price: "$833,100", description: "Test lorem", profit: "+4.5%" },
    { name: "Poatnele", icon: "🟠", price: "$833,100", description: "Test lorem", profit: "+1.8%" },
    { name: "Nicho", icon: "🟣", price: "$833,100", description: "Test lorem", profit: "+6.3%" },
    { name: "Caioun", icon: "⚪", price: "$833,100", description: "Test lorem", profit: "+0.9%" },
    { name: "Acio Siath", icon: "🔹", price: "$833,100", description: "Test lorem", profit: "+3.2%" },
    { name: "Sandceh", icon: "🟣", price: "$833,100", description: "Test lorem", profit: "+2.7%" },
    { name: "Aons Horae", icon: "🟠", price: "$833,100", description: "Test lorem", profit: "+4.1%" },
    { name: "Sonc Mosly", icon: "🟣", price: "$833,100", description: "Test lorem", profit: "+1.5%" },
    { name: "Camke Mage", icon: "🔴", price: "$833,100", description: "Test lorem", profit: "+3.9%" },
    { name: "Miodan", icon: "🟣", price: "$833,100", description: "Test lorem", profit: "+2.3%" },
    { name: "Se Orich", icon: "🔴", price: "$833,100", description: "Test lorem", profit: "+5.7%" },
    { name: "Daboite", icon: "🟠", price: "$833,100", description: "Test lorem", profit: "+0.6%" },
    { name: "Ger Adte", icon: "🔹", price: "$833,100", description: "Test lorem", profit: "+3.4%" },
  ]

  const sortedCryptos = sortByProfit
    ? [...cryptos].sort((a, b) => parseFloat(b.profit) - parseFloat(a.profit))
    : cryptos

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

  const handleLogout = () => {
    logout()
    setUsername("")
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-yellow-900 to-yellow-600 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-2">
          <Globe className="w-8 h-8" />
          <span className="text-2xl font-bold">crypto</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-200">
            Home
          </Link>
          <Link href="/portfolio" className="hover:text-yellow-200">
            Portfolio
          </Link>
          <Link href="/forum" className="hover:text-yellow-200">
            Forum
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Globe className="w-5 h-5" />
          </Button>
          <Button className="bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80">
            $21 508
          </Button>
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-20 hover:text-white transition-colors duration-300"
            >
              <User className="w-5 h-5 mr-2" />
              Logout
            </Button>
          ) : (
            <Button 
              onClick={() => {
                setShowAuthModal(true)
                setIsLoginMode(true)
              }}
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-20 hover:text-white transition-colors duration-300"
            >
              <User className="w-5 h-5 mr-2" />
              Login / Register
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-center">
          Search for
          <br />
          cryptocurrencies
        </h1>

        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-full shadow-lg">
              <Input
                type="text"
                placeholder="Search cryptocurrencies"
                className="w-full py-3 pl-5 pr-14 text-white bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300"
              />
              <Button className="absolute right-0 h-full rounded-full bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80 px-4">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl p-4 flex items-center space-x-2">
            <span className="mr-2">Tradable</span>
            <Switch
              checked={isTradable}
              onCheckedChange={setIsTradable}
              className="data-[state=checked]:bg-yellow-500 data-[state=checked]:bg-opacity-80"
            />
            <span>Non-tradable</span>
          </Card>
          <Card 
            className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl p-4 flex items-center cursor-pointer hover:bg-opacity-20 transition-all"
            onClick={() => setSortByProfit(!sortByProfit)}
          >
            <ArrowUpDown className="w-5 h-5 mr-2" />
            <span>{sortByProfit ? "Most Profit" : "Least Profit"}</span>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedCryptos.map((crypto, index) => (
            <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-2xl p-4 flex items-center hover:bg-opacity-20 transition-all">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${getIconColor(crypto.icon)}`}>
                {crypto.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{crypto.name}</h3>
                <p className="text-sm text-gray-300">{crypto.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-yellow-400">{crypto.price}</p>
                  <p className="text-green-400">{crypto.profit}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
          <Card className="bg-gradient-to-b from-black via-yellow-900 to-yellow-600 bg-opacity-40 backdrop-blur-xl text-white p-6 rounded-lg w-96 border border-yellow-500 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-yellow-300">{isLoginMode ? "Login" : "Register"}</h2>
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
              {authError && <p className="text-red-400 mb-4">{authError}</p>}
              <Button type="submit" className="w-full bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80">
                {isLoginMode ? "Login" : "Register"}
              </Button>
            </form>
            <p className="mt-4 text-center text-yellow-200">
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

function getIconColor(icon: string) {
  switch (icon) {
    case '🔴':
      return 'bg-red-500 bg-opacity-80 text-white';
    case '🟠':
      return 'bg-orange-500 bg-opacity-80 text-white';
    case '🔵':
      return 'bg-blue-500 bg-opacity-80 text-white';
    case '🟡':
      return 'bg-yellow-500 bg-opacity-80 text-white';
    case '🟣':
      return 'bg-purple-500 bg-opacity-80 text-white';
    case '⚪':
      return 'bg-gray-200 bg-opacity-80 text-gray-800';
    case '🔹':
      return 'bg-blue-300 bg-opacity-80 text-white';
    default:
      return 'bg-gray-500 bg-opacity-80 text-white';
  }
}