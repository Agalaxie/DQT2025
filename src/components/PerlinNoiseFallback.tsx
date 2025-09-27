'use client'

interface PerlinNoiseFallbackProps {
  className?: string
}

export default function PerlinNoiseFallback({ className = '' }: PerlinNoiseFallbackProps) {
  return (
    <div className={`${className} absolute inset-0`}>
      {/* Static gradient fallback that mimics the Perlin noise effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 animate-pulse [animation-duration:8s]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-green-500/8 via-pink-500/4 to-blue-500/8 animate-pulse [animation-duration:12s] [animation-delay:2s]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/6 via-cyan-500/3 to-green-500/6 animate-pulse [animation-duration:10s] [animation-delay:4s]"></div>
      </div>

      {/* Subtle animated dots pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse [animation-duration:3s]"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse [animation-duration:4s] [animation-delay:1s]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse [animation-duration:5s] [animation-delay:2s]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse [animation-duration:3.5s] [animation-delay:1.5s]"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-pink-400 rounded-full animate-pulse [animation-duration:4.5s] [animation-delay:2.5s]"></div>
      </div>
    </div>
  )
}