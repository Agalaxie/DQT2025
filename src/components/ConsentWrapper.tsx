'use client'

import { useEffect, useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { useConsent } from '@/hooks/useConsent'

export function ConsentSpeedInsights() {
  const { preferences } = useConsent()
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Charger SpeedInsights seulement si l'utilisateur a accepté les cookies analytiques
    setShouldLoad(preferences.analytics)
  }, [preferences.analytics])

  // Écouter les changements de consentement
  useEffect(() => {
    const handleConsentUpdate = (event: CustomEvent) => {
      setShouldLoad(event.detail.analytics)
    }

    window.addEventListener('consent-updated', handleConsentUpdate as EventListener)
    return () => {
      window.removeEventListener('consent-updated', handleConsentUpdate as EventListener)
    }
  }, [])

  if (!shouldLoad) return null

  return <SpeedInsights />
}
