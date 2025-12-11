"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface APODCardProps {
  image: string
  title: string
  date: string
  onClick?: () => void
}

export function APODCard({ image, title, date, onClick }: APODCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="neon-border rounded-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4 bg-slate-900/50">
        <p className="text-xs text-purple-400 font-mono">{date}</p>
        <h3 className="text-sm font-semibold text-white mt-1 line-clamp-2">{title}</h3>
      </div>
    </motion.div>
  )
}
