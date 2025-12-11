"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { FloatingStars } from "@/components/floating-stars"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"

const Planet = dynamic(() => import("@/components/planet").then((mod) => ({ default: mod.Planet })), {
  ssr: false,
})

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 overflow-hidden relative">
      <FloatingStars />
      <Navbar />

      {/* Cursor trail effect */}
      <motion.div
        className="pointer-events-none fixed w-8 h-8 rounded-full border border-purple-400 opacity-50"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-4 items-center">
          {/* Left: 3D Planet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-96 flex items-center justify-center"
          >
            <div className="w-full h-full rounded-full overflow-hidden shadow-2xl shadow-purple-900/50">
              <Planet />
            </div>
          </motion.div>

          {/* Right: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h1 className="text-6xl font-bold text-white glow-text">
                Explore the
                <span className="block text-purple-400">Cosmos</span>
              </h1>
              <p className="text-xl text-slate-300">
                Discover the most stunning astronomy pictures from NASA's Astronomy Picture of the Day
              </p>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Journey through the wonders of the universe with daily curated images and insights. From distant galaxies
              to nebulae, experience the beauty of space like never before.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/apod"
                className="inline-block px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 neon-border"
              >
                Enter the Universe →
              </Link>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 glass-morphism rounded-lg border-l-2 border-purple-400">
                <p className="text-2xl font-bold text-purple-400">365+</p>
                <p className="text-xs text-slate-400">Daily Pictures</p>
              </div>
              <div className="p-4 glass-morphism rounded-lg border-l-2 border-blue-400">
                <p className="text-2xl font-bold text-blue-400">HD</p>
                <p className="text-xs text-slate-400">Quality Images</p>
              </div>
              <div className="p-4 glass-morphism rounded-lg border-l-2 border-cyan-400">
                <p className="text-2xl font-bold text-cyan-400">∞</p>
                <p className="text-xs text-slate-400">Exploration</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated background nebula */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen opacity-10 blur-3xl animate-drift" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen opacity-10 blur-3xl animate-drift"
        style={{ animationDirection: "reverse" }}
      />
    </main>
  )
}
