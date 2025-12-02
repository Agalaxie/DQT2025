'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#clients', label: 'Clients' },
  { href: '/devis', label: 'Devis' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const navRect = navRef.current?.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    if (navRect) {
      setPillStyle({
        left: targetRect.left - navRect.left,
        width: targetRect.width,
        opacity: 1,
      })
    }
  }

  const handleMouseLeave = () => {
    setPillStyle(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DigitalQT
          </Link>

          <div className="flex items-center gap-6">
            <div
              ref={navRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding pill background */}
              <span
                className="absolute top-1/2 -translate-y-1/2 h-9 bg-blue-500/20 rounded-full transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
              />

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={handleMouseEnter}
                  className="relative z-10 px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/#contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
