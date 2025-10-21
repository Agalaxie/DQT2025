'use client'

import { useState, useEffect } from 'react'

export type ConsentPreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_COOKIE_NAME = 'cookie-consent'
const CONSENT_EXPIRY_DAYS = 365

export function useConsent() {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Toujours activé (essentiel pour le fonctionnement)
    analytics: false,
    marketing: false,
  })

  // Charger les préférences depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setPreferences(parsed.preferences)
        setHasConsented(true)
      } catch (e) {
        console.error('Erreur lors du parsing des préférences cookies:', e)
      }
    } else {
      setHasConsented(false)
    }
  }, [])

  const saveConsent = (newPreferences: ConsentPreferences) => {
    const consentData = {
      preferences: newPreferences,
      timestamp: new Date().toISOString(),
      expiryDays: CONSENT_EXPIRY_DAYS,
    }

    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(consentData))
    setPreferences(newPreferences)
    setHasConsented(true)

    // Déclencher un événement personnalisé pour que d'autres parties de l'app puissent réagir
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: newPreferences }))
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  }

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }

  const updatePreferences = (newPreferences: Partial<ConsentPreferences>) => {
    const updated = { ...preferences, ...newPreferences }
    saveConsent(updated)
  }

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_COOKIE_NAME)
    setHasConsented(false)
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }

  return {
    hasConsented,
    preferences,
    acceptAll,
    rejectAll,
    updatePreferences,
    resetConsent,
  }
}
