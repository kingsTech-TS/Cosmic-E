"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="glow-text text-xl font-bold">
            🌌 Cosmic Explorer
          </Link>

          <div className="flex gap-8">
            <Link
              href="/"
              className={`transition-all duration-300 ${
                isActive("/") ? "text-purple-400 glow-effect" : "text-slate-300 hover:text-purple-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/apod"
              className={`transition-all duration-300 ${
                isActive("/apod") ? "text-blue-400 glow-effect" : "text-slate-300 hover:text-blue-300"
              }`}
            >
              APOD
            </Link>
            <Link
              href="/gallery"
              className={`transition-all duration-300 ${
                isActive("/gallery") ? "text-purple-400 glow-effect" : "text-slate-300 hover:text-purple-300"
              }`}
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
