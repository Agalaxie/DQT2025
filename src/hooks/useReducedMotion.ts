'use client'

import { useState, useEffect } from 'react'

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur préfère les animations réduites
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Détecter si c'est un appareil mobile/tablet pour réduire les animations
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => {
      mediaQuery.removeEventListener('change', handler)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Retourner true si on doit réduire les animations (préférence utilisateur OU mobile)
  return prefersReducedMotion || isMobile
}

export function useMotionConfig() {
  const shouldReduceMotion = useReducedMotion()

  return {
    shouldReduceMotion,
    // Configurations d'animation simplifiées pour mobile
    fadeIn: shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 } },

    slideUp: shouldReduceMotion
      ? { initial: { y: 0, opacity: 1 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0 } }
      : { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.6 } },

    slideIn: shouldReduceMotion
      ? { initial: { x: 0, opacity: 1 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0 } }
      : { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.6 } },

    stagger: shouldReduceMotion
      ? { delayChildren: 0, staggerChildren: 0 }
      : { delayChildren: 0.1, staggerChildren: 0.1 }
  }
}