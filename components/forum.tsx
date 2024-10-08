"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Heart, Repeat2, BarChart2, Upload, Smile, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';
import { useAuth } from "@/contexts/AuthContext"

export default function Forum() {
  const { isLoggedIn } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [postContent, setPostContent] = useState("")

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

  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto p-4 sm:p-8">
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
    </div>
  )
}