"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Globe, User, Search, MessageCircle, Heart, Repeat2, BarChart2, Upload, Smile, ImageIcon, X, Menu } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';
import { useAuth } from "@/contexts/AuthContext"

export default function Forum() {
  const { isLoggedIn, login, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [postContent, setPostContent] = useState("")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const posts = [
    {
      id: 1,
      user: {
        name: "Jack",
        handle: "@jack",
        avatar: "/images/jack.jpeg"
      },
      content: "Just updated my crypto portfolio! Current holding: $50,000 in BTC, $30,000 in ETH, and $20,000 in ADA. What's your strategy? #CryptoHoldings",
      timestamp: "2h ago",
      likes: 1200,
      comments: 89,
      reposts: 245,
      portfolioImage: "/images/portfolio.png"
    },
    {
      id: 2,
      user: {
        name: "Pai",
        handle: "@pai",
        avatar: "/images/pai.jpeg"
      },
      content: "Monthly update: My crypto holdings have grown to $175,000! Breakdown: 40% BTC, 30% ETH, 15% DOT, 10% LINK, 5% smaller altcoins. Always DYOR! #CryptoPortfolio",
      timestamp: "5h ago",
      likes: 3500,
      comments: 210,
      reposts: 678,
      portfolioImage: "/images/portfolio2.png"
    }
  ]

  const handlePostSubmit = () => {
    console.log("Posting:", postContent)
    setPostContent("")
    // Here you would typically send the post to your backend
  }

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
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-yellow-900 to-yellow-600 text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8 sm:mb-12">
        <div className="flex items-center space-x-2">
          <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">crypto</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/home" className="hover:text-yellow-200">
            Home
          </Link>
          <Link href="/portfolio" className="hover:text-yellow-200">
            Portfolio
          </Link>
          <Link href="/forum" className="hover:text-yellow-200">
            Forum
          </Link>
        </nav>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" className="text-white">
            <Globe className="w-5 h-5" />
          </Button>
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600 text-xs sm:text-sm">
            $21 508
          </Button>
          {isLoggedIn ? (
            <Button 
              onClick={handleLogout}
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-300 text-xs sm:text-sm"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Logout
            </Button>
          ) : (
            <Button 
              onClick={() => {
                setShowAuthModal(true)
                setIsLoginMode(true)
              }}
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-300 text-xs sm:text-sm"
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
      </header>

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

      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-center">Crypto Forum</h1>

        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 sm:py-3 pl-10 pr-4 text-white bg-white bg-opacity-20 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300 text-sm sm:text-base"
            />
            <Search className="absolute left-3 top-2.5 sm:top-3.5 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full bg-[#3D3522] rounded-full p-1 mb-6">
            <TabsTrigger 
              value="for-you" 
              className="w-1/2 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-black"
            >
              For you
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="w-1/2 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-black"
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-3 sm:p-4">
                <div className="flex space-x-3 sm:space-x-4">
                  <Avatar>
                    <AvatarImage src="/images/des.jpeg" alt="Your Avatar" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <Textarea
                      placeholder="What's happening in crypto?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="w-full mb-2 bg-transparent text-white placeholder-gray-400 border-none focus:ring-0 text-sm sm:text-base"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1 sm:space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-500"><ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-500"><Globe className="h-4 w-4 sm:h-5 sm:w-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-500"><BarChart2 className="h-4 w-4 sm:h-5 sm:w-5" /></Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-yellow-500"><Smile className="h-4 w-4 sm:h-5 sm:w-5" /></Button>
                      </div>
                      <Button onClick={handlePostSubmit} className="bg-yellow-500 text-black hover:bg-yellow-600 text-xs sm:text-sm">Post</Button>
                    </div>
                  </div>
                </div>
              </Card>
              {posts.map((post) => (
                <Card key={post.id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
                  <div className="flex space-x-3 sm:space-x-4">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} alt={post.user.name} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-sm sm:text-base">{post.user.name}</h3>
                        <span className="text-gray-400 text-xs sm:text-sm">{post.user.handle}</span>
                        <span className="text-gray-400 text-xs sm:text-sm">· {post.timestamp}</span>
                      </div>
                      <p className="mt-2 text-sm sm:text-base">{post.content}</p>
                      {post.portfolioImage && (
                        <div className="mt-3 sm:mt-4 rounded-lg overflow-hidden">
                          <Image
                            src={post.portfolioImage}
                            alt="Portfolio Chart"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="flex justify-between mt-3 sm:mt-4 text-gray-400">
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 hover:text-yellow-500 text-xs sm:text-sm">
                          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 hover:text-yellow-500 text-xs sm:text-sm">
                          <Repeat2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.reposts}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2 hover:text-yellow-500 text-xs sm:text-sm">
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-yellow-500">
                          <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="following">
            <Card className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 sm:p-6">
              <p className="text-white text-sm sm:text-base">Content from users you follow will appear here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
    </div>
  )
}