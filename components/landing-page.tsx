"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuroraBackground } from "@/components/ui/aurora-background"

const icon = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1
  }
}

export default function LandingPage() {
  return (
    <AuroraBackground className="bg-gradient-to-b from-black via-yellow-900 to-yellow-600">
      <div className="relative z-10 flex flex-col items-center justify-center p-4 w-full h-full min-h-screen">
        <svg width="0" height="0">
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="50%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </svg>
        
        <div className="flex flex-col items-center justify-center flex-grow w-full">
          <div className="w-full flex justify-center items-center mb-12">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 100"
              className="w-full h-auto max-w-[75vw] max-h-[40vh]"
              initial="hidden"
              animate="visible"
            >
              {/* C */}
              <motion.path
                d="M30 90c-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 13.8 0 25.5 9.3 29.1 22.5"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={icon}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* R */}
              <motion.path
                d="M80 30h20c11.046 0 20 8.954 20 20s-8.954 20-20 20h-20v-40 M100 70l15 20"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={icon}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Y */}
              <motion.path
                d="M150 30l15 20 15-20 M165 50v40"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={icon}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* P */}
              <motion.path
                d="M210 30h20c11.046 0 20 8.954 20 20s-8.954 20-20 20h-20v-40"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={icon}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* T */}
              <motion.path
                d="M270 30h40 M290 30v60"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={icon}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* O */}
              <motion.path
                d="M370 60c0 16.569-13.431 30-30 30s-30-13.431-30-30 13.431-30 30-30 30 13.431 30 30z"
                stroke="url(#logo-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                variants={icon}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>

          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Link href="/home">
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600 text-base sm:text-lg px-6 py-2.5 sm:px-8 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Enter Platform
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  )
}