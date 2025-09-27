'use client'

import { useEffect, useRef, useState } from 'react'
import { createNoise3D } from 'simplex-noise'
import PerlinNoiseFallback from './PerlinNoiseFallback'

interface PerlinNoiseBackgroundProps {
  className?: string
  nodeCount?: number
  speed?: number
  opacity?: number
  colorCycle?: boolean
}

class Node {
  ctx: CanvasRenderingContext2D
  max_x: number
  max_y: number
  max_l: number
  seed: number
  noise: (x: number, y: number, z: number) => number
  x: number = 0
  y: number = 0
  prev_x: number = 0
  prev_y: number = 0
  l: number = 2
  color: string = ''
  time: number = 0

  constructor(params: {
    ctx: CanvasRenderingContext2D
    seed: number
    max_x: number
    max_y: number
    max_l: number
    noise: (x: number, y: number, z: number) => number
    opacity: number
    colorCycle: boolean
  }) {
    this.ctx = params.ctx
    this.max_x = params.max_x
    this.max_y = params.max_y
    this.max_l = params.max_l
    this.seed = params.seed
    this.noise = params.noise
    this.getValue(0, params.opacity, params.colorCycle)
  }

  update(time: number, opacity: number, colorCycle: boolean) {
    this.getValue(time, opacity, colorCycle)

    // Draw lines
    this.ctx.strokeStyle = this.color
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(this.prev_x, this.prev_y)
    this.ctx.lineWidth = this.l
    this.ctx.stroke()
  }

  getValue(time: number, opacity: number, colorCycle: boolean) {
    this.time = time

    // Different noise for different values
    const noise_x = this.noise(this.seed, this.seed * -1, this.time)
    const noise_y = this.noise(this.seed * -1, this.seed, this.time)

    // Color noise stronger towards center
    const noise_c = 1 - Math.max(Math.abs(noise_x), Math.abs(noise_y))
    const noise_l = noise_c

    // Set previous position for drawing lines
    this.prev_x = this.x
    this.prev_y = this.y

    // Set new positions
    this.x = noise_x * this.max_x / 2 + this.max_x / 2
    this.y = noise_y * this.max_y / 2 + this.max_y / 2

    // Line width
    this.l = noise_l * this.max_l / 2 + this.max_l / 2

    // Check if dark mode
    const isDark = typeof window !== 'undefined' &&
                   (document.documentElement.classList.contains('dark') ||
                    window.matchMedia('(prefers-color-scheme: dark)').matches)

    // Color adaptation for light/dark theme
    const hue = colorCycle ? 360 * (time % 10 / 10) : 200 + noise_c * 100
    const sat = noise_c * 60 + 40

    // Adjust lightness based on theme
    const lit = isDark ?
                (noise_c * 60 + 20) :  // Original for dark theme
                (noise_c * 40 + 35)     // Darker for light theme

    this.color = `hsla(${hue}, ${sat}%, ${lit}%, ${opacity})`
  }
}

export default function PerlinNoiseBackground({
  className = '',
  nodeCount = 800,
  speed = 0.005,
  opacity = 0.03,
  colorCycle = true
}: PerlinNoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const nodesRef = useRef<Node[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [canvasSupported, setCanvasSupported] = useState(true)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Intersection Observer for performance
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isIntersecting || prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setCanvasSupported(false)
      return
    }

    // Set canvas size to match container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    resizeCanvas()
    setIsVisible(true)

    // Create noise function
    const noise3D = createNoise3D()

    // Create nodes
    const nodes: Node[] = []
    const w = canvas.width / (window.devicePixelRatio || 1)
    const h = canvas.height / (window.devicePixelRatio || 1)

    for (let i = 0; i < nodeCount; i++) {
      const new_node = new Node({
        ctx: ctx,
        seed: (i + 1) / nodeCount,
        max_x: w,
        max_y: h,
        max_l: 2,
        noise: noise3D,
        opacity: opacity,
        colorCycle: colorCycle
      })
      nodes.push(new_node)
    }

    let clock = 0
    const update = () => {
      // Very subtle clearing for trail effect - adapt to theme
      const isDark = document.documentElement.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches

      // For light theme, use more aggressive clearing to prevent black background
      if (isDark) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
        ctx.fillRect(0, 0, w, h)
      } else {
        // For light theme, clear more aggressively or skip clearing entirely
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.fillRect(0, 0, w, h)
      }

      // Update each node
      nodes.forEach((node) => {
        node.update(clock, opacity, colorCycle)
      })

      clock += speed

      // Reset after full cycle to create seamless loop
      if (clock >= 10) {
        clock = 0
        // Optional: clear canvas for fresh start
        // ctx.clearRect(0, 0, w, h)
      }

      animationRef.current = requestAnimationFrame(update)
    }

    // Start animation
    update()

    // Handle resize
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [nodeCount, speed, opacity, colorCycle, isIntersecting, prefersReducedMotion])

  // Show fallback if canvas is not supported, motion is reduced, or user prefers it
  if (!canvasSupported || prefersReducedMotion) {
    return <PerlinNoiseFallback className={className} />
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      {/* Show fallback while loading */}
      {!isVisible && <PerlinNoiseFallback className={className} />}
    </>
  )
}