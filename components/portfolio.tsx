"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Trophy, Medal, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"

export default function Portfolio() {
  const { isLoggedIn } = useAuth()
  const [displayCount, setDisplayCount] = useState(11)  // 3 top + 8 initial

  const allInvestors = [
    { id: "1", name: "Heme", range: "499.70 - 458.20", amount: "425,05", image: "/images/investor1.png", place: 1 },
    { id: "2", name: "Sarah", range: "498.20 - 456.20", amount: "449,05", image: "/images/investor2.png", place: 2 },
    { id: "3", name: "Alex", range: "498.70 - 456.70", amount: "425,05", image: "/images/investor3.png", place: 3 },
    { id: "4", name: "Rarretom", amount: "322,50T", image: "/images/investor4.png", place: 4 },
    { id: "5", name: "Neurdon", amount: "322,14M", image: "/images/investor5.png", place: 5 },
    { id: "6", name: "Rarretom", amount: "322,20T", image: "/images/investor6.png", place: 6 },
    { id: "7", name: "Jonny", amount: "33,29JM", image: "/images/investor7.png", place: 7 },
    { id: "8", name: "Rarretom", amount: "32,29FM", image: "/images/investor8.png", place: 8 },
    { id: "9", name: "Tommy", amount: "S:D f 6,260B", image: "/images/investor9.png", place: 9 },
    { id: "10", name: "Jeremy", amount: "1,234K", image: "/images/investor10.png", place: 10 },
    { id: "11", name: "Kkluv", amount: "1,200K", image: "/images/investor11.png", place: 11 },
    { id: "12", name: "Investor 12", amount: "1,150K", image: "/images/investor12.jpg", place: 12 },
    { id: "13", name: "Investor 13", amount: "1,100K", image: "/images/investor13.jpg", place: 13 },
    { id: "14", name: "Investor 14", amount: "1,050K", image: "/images/investor14.jpg", place: 14 },
    { id: "15", name: "Investor 15", amount: "1,000K", image: "/images/investor15.jpg", place: 15 },
    { id: "16", name: "Investor 16", amount: "950K", image: "/images/investor16.jpg", place: 16 },
    { id: "17", name: "Investor 17", amount: "900K", image: "/images/investor17.jpg", place: 17 },
    { id: "18", name: "Investor 18", amount: "850K", image: "/images/investor18.jpg", place: 18 },
    { id: "19", name: "Investor 19", amount: "800K", image: "/images/investor19.jpg", place: 19 },
  ]

  const topInvestors = allInvestors.slice(0, 3)
  const displayedInvestors = allInvestors.slice(3, displayCount)

  const handleSeeMore = () => {
    setDisplayCount(prevCount => Math.min(prevCount + 8, allInvestors.length))
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-center">
          Top Ranking Investor
          <br />
          Crypto Investment Portfolio
        </h1>

        <div className="flex justify-center mb-8 sm:mb-12">
          <Star className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end mb-8 sm:mb-12 space-y-6 sm:space-y-0">
          {topInvestors.map((investor, index) => (
            <div key={index} className={`flex flex-col items-center ${
              investor.place === 1 ? 'sm:order-2 sm:mx-8' :
              investor.place === 2 ? 'sm:order-1' :
              'sm:order-3'
            }`}>
              {investor.place === 1 ? (
                <Link href={`/investor/${investor.id}`}>
                  <Card className="bg-white bg-opacity-20 backdrop-blur-lg text-white rounded-2xl p-4 sm:p-6 w-full sm:w-80 md:w-96 cursor-pointer hover:bg-opacity-30 transition-all">
                    <div className="flex items-center mb-4">
                      <Image
                        src={investor.image}
                        alt={investor.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-xl sm:text-2xl">{investor.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-300">{investor.range}</p>
                      </div>
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 ml-auto" />
                    </div>
                    <p className="text-2xl sm:text-4xl font-bold">{investor.amount} <span className="text-yellow-400 text-xs sm:text-sm">GOLD</span></p>
                  </Card>
                </Link>
              ) : (
                <Card className={`bg-white bg-opacity-20 backdrop-blur-lg text-white rounded-2xl p-4 sm:p-6 w-full sm:w-64 md:w-72`}>
                  <div className="flex items-center mb-4">
                    <Image
                      src={investor.image}
                      alt={investor.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg sm:text-xl">{investor.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-300">{investor.range}</p>
                    </div>
                    {investor.place === 2 && <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 ml-auto" />}
                    {investor.place === 3 && <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-700 ml-auto" />}
                  </div>
                  <p className="text-xl sm:text-3xl font-bold">{investor.amount} <span className="text-yellow-400 text-xs sm:text-sm">GOLD</span></p>
                </Card>
              )}
              <div className={`w-full ${
                investor.place === 1 ? 'h-8 sm:h-12 bg-yellow-400' :
                investor.place === 2 ? 'h-6 sm:h-8 bg-gray-300' : 'h-4 sm:h-6 bg-yellow-700'
              } mt-4 rounded-t-lg`}></div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Other Top Investors</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {displayedInvestors.map((investor, index) => (
            <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-lg text-white rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Image
                  src={investor.image}
                  alt={investor.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <h4 className="font-semibold text-sm">{investor.name}</h4>
              </div>
              <p className="text-lg font-bold">{investor.amount}</p>
              <p className="text-xs text-gray-300">Rank {investor.place}</p>
            </Card>
          ))}
        </div>

        {displayCount < allInvestors.length && (
          <div className="flex justify-center">
            <Button 
              onClick={handleSeeMore}
              className="bg-yellow-500 text-black hover:bg-yellow-600 flex items-center text-sm sm:text-base"
            >
              See More <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}