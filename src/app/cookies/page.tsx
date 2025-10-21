'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Cookie, Shield, BarChart3, Target, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useConsent } from '@/hooks/useConsent'

export default function CookiesPage() {
  const { preferences, updatePreferences, resetConsent } = useConsent()
  const [localPreferences, setLocalPreferences] = useState(preferences)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setLocalPreferences(preferences)
  }, [preferences])

  const handleSave = () => {
    updatePreferences(localPreferences)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser vos préférences de cookies ?')) {
      resetConsent()
      setLocalPreferences({
        necessary: true,
        analytics: false,
        marketing: false,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      {/* Page Header */}
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Link>
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gestion des Cookies
              </h1>
            </div>

            <Badge variant="outline" className="text-blue-600 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              RGPD Conforme
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Respect de votre vie privée</CardTitle>
            </div>
            <CardDescription>
              Nous utilisons des cookies pour améliorer votre expérience de navigation et analyser
              l&apos;utilisation de notre site. Vous pouvez personnaliser vos préférences ci-dessous.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>
                Les cookies sont de petits fichiers texte stockés sur votre appareil lors de votre
                visite sur notre site. Ils nous aident à :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Assurer le bon fonctionnement du site</li>
                <li>Comprendre comment vous utilisez nos services</li>
                <li>Améliorer votre expérience utilisateur</li>
                <li>Sécuriser vos données et vos transactions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Préférences */}
        <div className="space-y-6">
          {/* Cookies essentiels */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900">
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Cookies essentiels</CardTitle>
                    <CardDescription className="mt-1">
                      Nécessaires au fonctionnement du site
                    </CardDescription>
                  </div>
                </div>
                <Switch checked={true} disabled />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Ces cookies sont indispensables au bon fonctionnement du site. Ils permettent
                d&apos;utiliser les principales fonctionnalités comme la navigation sécurisée,
                l&apos;authentification et le panier. Ils ne peuvent pas être désactivés.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Sécurité et authentification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Gestion du panier et des sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Préférences de consentement</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies analytiques */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Cookies analytiques</CardTitle>
                    <CardDescription className="mt-1">
                      Pour comprendre l&apos;utilisation du site
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.analytics}
                  onCheckedChange={(checked) =>
                    setLocalPreferences({ ...localPreferences, analytics: checked })
                  }
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Ces cookies nous permettent de mesurer l&apos;audience du site et d&apos;analyser
                comment les visiteurs utilisent nos services. Ces données nous aident à améliorer
                l&apos;expérience utilisateur.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Vercel Analytics (analyse de trafic anonyme)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Pages visitées et temps passé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Performance et vitesse du site</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies marketing */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                    <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Cookies marketing</CardTitle>
                    <CardDescription className="mt-1">
                      Publicité personnalisée
                    </CardDescription>
                  </div>
                </div>
                <Switch
                  checked={localPreferences.marketing}
                  onCheckedChange={(checked) =>
                    setLocalPreferences({ ...localPreferences, marketing: checked })
                  }
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ces cookies sont utilisés pour vous proposer des publicités personnalisées en
                fonction de vos centres d&apos;intérêt.{' '}
                <Badge variant="secondary" className="ml-2">
                  Actuellement non utilisés
                </Badge>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Préférences enregistrées
              </>
            ) : (
              'Enregistrer mes préférences'
            )}
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1">
            Réinitialiser
          </Button>
        </div>

        {/* Informations complémentaires */}
        <Card className="mt-8 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-base">Pour en savoir plus</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <p>
              Pour plus d&apos;informations sur notre politique de confidentialité et l&apos;utilisation
              de vos données, consultez notre{' '}
              <Link href="/mentions-legales" className="text-blue-600 hover:underline">
                page mentions légales
              </Link>
              .
            </p>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
              de suppression de vos données personnelles.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
