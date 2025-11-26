'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
}

export default function RotatingText({
  words,
  interval = 3000,
  className = ""
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={`inline-block text-center ${className}`} style={{ minWidth: 'min(280px, 80vw)' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{
            opacity: 0,
            y: 20,
            filter: 'blur(8px)'
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{
            opacity: 0,
            y: -20,
            filter: 'blur(8px)'
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] // Cubic bezier easing for smooth effect
          }}
          className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
