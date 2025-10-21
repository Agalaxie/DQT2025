'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Cookie, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { useConsent } from '@/hooks/useConsent'

export default function CookieBanner() {
  const { hasConsented, preferences, acceptAll, rejectAll, updatePreferences } = useConsent()
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [localPreferences, setLocalPreferences] = useState(preferences)

  useEffect(() => {
    // Afficher le banner seulement si l'utilisateur n'a pas encore consenti
    if (hasConsented === false) {
      setShowBanner(true)
    } else {
      setShowBanner(false)
    }
  }, [hasConsented])

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  const handleAcceptAll = () => {
    acceptAll()
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    rejectAll()
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    updatePreferences(localPreferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-slate-200 dark:border-slate-800">
          {!showSettings ? (
            /* Banner simple */
            <>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Respect de votre vie privée</CardTitle>
                      <CardDescription className="mt-1">
                        Nous utilisons des cookies pour améliorer votre expérience
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRejectAll}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Ce site utilise des cookies essentiels pour son fonctionnement et des cookies
                  optionnels pour analyser le trafic et améliorer nos services. Vous pouvez
                  personnaliser vos préférences ou accepter tous les cookies.{' '}
                  <Link href="/mentions-legales" className="text-blue-600 hover:underline">
                    En savoir plus
                  </Link>
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Tout accepter
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1"
                  >
                    Tout refuser
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Personnaliser
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            /* Paramètres détaillés */
            <>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Paramètres des cookies</CardTitle>
                      <CardDescription className="mt-1">
                        Personnalisez vos préférences de cookies
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cookies essentiels */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex-1">
                    <Label htmlFor="necessary" className="text-base font-semibold cursor-pointer">
                      Cookies essentiels
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Nécessaires au fonctionnement du site (authentification, panier, sécurité).
                      Ces cookies ne peuvent pas être désactivés.
                    </p>
                  </div>
                  <Switch
                    id="necessary"
                    checked={true}
                    disabled
                    className="mt-1"
                  />
                </div>

                <Separator />

                {/* Cookies analytiques */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex-1">
                    <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer">
                      Cookies analytiques
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Nous aident à comprendre comment vous utilisez le site pour l&apos;améliorer
                      (Vercel Analytics, pages visitées, temps passé).
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={localPreferences.analytics}
                    onCheckedChange={(checked) =>
                      setLocalPreferences({ ...localPreferences, analytics: checked })
                    }
                    className="mt-1"
                  />
                </div>

                <Separator />

                {/* Cookies marketing */}
                <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex-1">
                    <Label htmlFor="marketing" className="text-base font-semibold cursor-pointer">
                      Cookies marketing
                    </Label>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Utilisés pour vous proposer des publicités personnalisées.
                      Actuellement non utilisés sur ce site.
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={localPreferences.marketing}
                    onCheckedChange={(checked) =>
                      setLocalPreferences({ ...localPreferences, marketing: checked })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSavePreferences}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Enregistrer mes préférences
                  </Button>
                  <Button
                    onClick={() => setShowSettings(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Retour
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
