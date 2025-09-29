'use client'

import { useEffect } from 'react'

export function useOptimizedLayout() {
  useEffect(() => {
    // Optimiser les performances en utilisant requestIdleCallback pour les opérations non-critiques
    const optimizeNonCriticalElements = () => {
      // Charger les éléments non-critiques après le premier paint
      const nonCriticalElements = document.querySelectorAll('.non-critical')
      nonCriticalElements.forEach(el => {
        el.classList.add('loaded')
      })
    }

    // Utiliser requestIdleCallback ou setTimeout comme fallback
    if ('requestIdleCallback' in window) {
      requestIdleCallback(optimizeNonCriticalElements, { timeout: 1000 })
    } else {
      setTimeout(optimizeNonCriticalElements, 100)
    }

    // Optimisations pour éviter les forced reflows
    const preventReflows = () => {
      // Batching des lectures DOM
      const elements = document.querySelectorAll('[data-measure]')
      const measurements: { element: Element; rect: DOMRect }[] = []

      // Phase de lecture (batch reads)
      elements.forEach(element => {
        measurements.push({
          element,
          rect: element.getBoundingClientRect()
        })
      })

      // Phase d'écriture (batch writes)
      measurements.forEach(({ element, rect }) => {
        if (element instanceof HTMLElement) {
          element.style.width = `${rect.width}px`
          element.style.height = `${rect.height}px`
        }
      })
    }

    // Éviter les mesures durant les animations
    let isAnimating = false
    const optimizedMeasure = () => {
      if (!isAnimating) {
        isAnimating = true
        requestAnimationFrame(() => {
          preventReflows()
          isAnimating = false
        })
      }
    }

    // Observer les changements de viewport sans reflow
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(optimizedMeasure, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])
}

export function usePerformanceOptimizations() {
  useEffect(() => {
    // Précharger les ressources critiques
    const preloadCriticalResources = () => {
      // Preload des images critiques
      const criticalImages = [
        '/hero-bg.jpg',
        '/favicon.ico'
      ]

      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })
    }

    // Différer le chargement des ressources non-critiques
    const deferNonCriticalResources = () => {
      // Lazy load des images en dessous du fold
      const lazyImages = document.querySelectorAll('img[data-lazy]')
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.lazy) {
              img.src = img.dataset.lazy
              img.removeAttribute('data-lazy')
              imageObserver.unobserve(img)
            }
          }
        })
      })

      lazyImages.forEach(img => imageObserver.observe(img))
    }

    preloadCriticalResources()
    deferNonCriticalResources()
  }, [])
}