"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Globe, User, Menu, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function Header() {
  const { isLoggedIn, login, logout } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  useEffect(() => {
    // Check localStorage for authentication state on component mount
    const storedAuthState = localStorage.getItem('isAuthenticated')
    if (storedAuthState === 'true' && !isLoggedIn) {
      login()
    }
  }, [isLoggedIn, login])

  const handleLogout = () => {
    logout()
    localStorage.removeItem('isAuthenticated')
  }

  const handleLoginClick = () => {
    setShowAuthModal(true)
    setIsLoginMode(true)
  }

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoginMode) {
      if (username === "jackkong1999" && password === "19990317JWJ") {
        login()
        localStorage.setItem('isAuthenticated', 'true')
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

  return (
    <header className="p-4 sm:p-8">
      <div className="flex justify-between items-center mb-8 sm:mb-12">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">crypto</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/meme" className="hover:text-yellow-200">
            Meme
          </Link>
          <Link href="/home" className="hover:text-yellow-200">
            Trending
          </Link>
          <Link href="/portfolio" className="hover:text-yellow-200">
            Portfolio
          </Link>
          <Link href="/forum" className="hover:text-yellow-200">
            Forum
          </Link>
          <Link href="/follow" className="hover:text-yellow-200">
            Follow
          </Link>
          <Link href="/channel/1" className="hover:text-yellow-200">
            Channel
          </Link>
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Globe className="w-5 h-5" />
          </Button>
          <Link href="/profile">
            <Button className="bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80 text-xs sm:text-sm">
              $21 508
            </Button>
          </Link>
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-xs sm:text-sm"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Logout
            </Button>
          ) : (
            <Button 
              onClick={handleLoginClick}
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-xs sm:text-sm"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Login
            </Button>
          )}
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-4 mb-6">
          <Link href="/home" className="block py-2 hover:text-yellow-200">
            Home
          </Link>
          <Link href="/portfolio" className="block py-2 hover:text-yellow-200">
            Portfolio
          </Link>
          <Link href="/forum" className="block py-2 hover:text-yellow-200">
            Forum
          </Link>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
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
              <Button type="submit" className="w-full bg-yellow-500 bg-opacity-80 text-black hover:bg-yellow-600 hover:bg-opacity-80">
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
    </header>
  )
}