"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { FloatingStars } from "@/components/floating-stars"
import { APODCard } from "@/components/apod-card"
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

export default function GalleryPage() {
  const [gallery, setGallery] = useState<APODData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAPOD, setSelectedAPOD] = useState<APODData | null>(null)

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    setLoading(true)
    try {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY
      const today = new Date()
      const dates: string[] = []

      // Get last 12 days
      for (let i = 0; i < 12; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        dates.push(date.toISOString().split("T")[0])
      }

      const promises = dates.map((date) =>
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`).then((res) => res.json()),
      )

      const results = await Promise.all(promises)
      setGallery(results.filter((item) => item.media_type === "image"))
    } catch (error) {
      console.error("Failed to fetch gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 relative overflow-hidden">
      <FloatingStars />
      <Navbar />

      <div className="pt-20 pb-12 relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white glow-text">Cosmic Gallery</h1>
            <p className="text-slate-300">Browse the latest astronomy pictures</p>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-blue-400 rounded-full animate-spin mx-auto" />
                <p className="text-slate-400">Loading gallery...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <APODCard
                      image={item.url}
                      title={item.title}
                      date={item.date}
                      onClick={() => setSelectedAPOD(item)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Modal */}
              {selectedAPOD && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSelectedAPOD(null)}
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900/90 rounded-lg neon-border max-w-2xl max-h-96 overflow-y-auto space-y-4 p-6"
                  >
                    <div className="relative w-full aspect-video">
                      <Image
                        src={selectedAPOD.hdurl || selectedAPOD.url}
                        alt={selectedAPOD.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-purple-400 font-mono">{selectedAPOD.date}</p>
                      <h3 className="text-2xl font-bold text-white mt-2">{selectedAPOD.title}</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{selectedAPOD.explanation}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedAPOD(null)}
                      className="w-full px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen opacity-5 blur-3xl animate-drift" />
      <div
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen opacity-5 blur-3xl"
        style={{ animation: "drift 30s linear infinite reverse" }}
      />
    </main>
  )
}
