"use client"

import { useState, useEffect, Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { FloatingStars } from "@/components/floating-stars"
import { motion } from "framer-motion"
import Image from "next/image"

interface APODData {
  title: string
  date: string
  explanation: string
  url: string
  media_type: string
  hdurl?: string
}

function APODContent() {
  const [apod, setApod] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string>("")

  useEffect(() => {
    fetchAPOD()
  }, [])

  const fetchAPOD = async (date?: string) => {
    setLoading(true)
    try {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY
      const url = new URL("https://api.nasa.gov/planetary/apod")
      url.searchParams.append("api_key", apiKey || "")
      if (date) {
        url.searchParams.append("date", date)
      }

      const response = await fetch(url.toString())
      const data = await response.json()
      setApod(data)
    } catch (error) {
      console.error("Failed to fetch APOD:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRandomDate = () => {
    const start = new Date("2000-01-01")
    const end = new Date()
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    const dateString = randomDate.toISOString().split("T")[0]
    setSelectedDate(dateString)
    fetchAPOD(dateString)
  }

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      <FloatingStars />
      <Navbar />

      <div className="pt-20 pb-12 relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white glow-text">Astronomy Picture of the Day</h1>
            <p className="text-slate-300">NASA's daily selection of the cosmos</p>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-blue-400 rounded-full animate-spin mx-auto" />
                <p className="text-slate-400">Loading cosmic wonders...</p>
              </div>
            </div>
          ) : apod ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Image/Video Container */}
              <div className="neon-border rounded-lg overflow-hidden bg-slate-900/50">
                {apod.media_type === "video" ? (
                  <iframe width="100%" height="500" src={apod.url} allowFullScreen className="w-full aspect-video" />
                ) : (
                  <div className="relative w-full aspect-video">
                    <Image src={apod.hdurl || apod.url} alt={apod.title} fill className="object-cover" priority />
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="neon-border rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-purple-400 font-mono">{apod.date}</p>
                  <h2 className="text-3xl font-bold text-white mt-2">{apod.title}</h2>
                </div>

                <p className="text-slate-300 leading-relaxed">{apod.explanation}</p>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={getRandomDate}
                    className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                  >
                    🎲 Random Day
                  </motion.button>
                  {apod.hdurl && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={apod.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-lg font-semibold text-white border border-slate-600 hover:border-slate-400 transition-all duration-300"
                    >
                      Download HD
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-slate-400">Failed to load APOD</div>
          )}
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen opacity-5 blur-3xl" />
    </main>
  )
}

export default function APODPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <APODContent />
    </Suspense>
  )
}
