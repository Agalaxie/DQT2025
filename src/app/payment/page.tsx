'use client'

import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, CreditCard, CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react'
import Link from 'next/link'
import PaymentForm from '@/components/PaymentForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Validate Stripe key before loading
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
if (!stripePublishableKey) {
  console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

// Packs développement - Offres mises en avant
const packs = [
  {
    id: 'demi-journee',
    title: "Pack Demi-journée",
    description: "4 heures de développement dédié. Parfait pour des corrections, ajustements ou petites fonctionnalités.",
    price: 150,
    isPack: true,
    isPopular: false,
    highlights: [
      "4h de développement dédié",
      "Bug fixes et corrections",
      "Petites fonctionnalités",
      "Optimisations ponctuelles",
      "Livraison dans la journée"
    ],
    deliverables: "Livraison rapide avec rapport de travail détaillé. Sans engagement, facture professionnelle incluse."
  },
  {
    id: 'journee',
    title: "Pack Journée complète",
    description: "8 heures de développement dédié. Idéal pour des fonctionnalités complètes ou une refonte partielle.",
    price: 290,
    isPack: true,
    isPopular: true,
    highlights: [
      "8h de développement dédié",
      "Fonctionnalités complètes",
      "Intégrations API / bases de données",
      "Refonte de pages ou sections",
      "Support prioritaire",
      "Appel de briefing inclus (15 min)"
    ],
    deliverables: "Livraison complète avec documentation. Support prioritaire et modifications incluses si besoin."
  }
]

const services = [
  {
    id: 'wordpress-expert',
    title: "Développement WordPress personnalisé",
    description: "Sites WordPress sur mesure qui dépassent les simples templates.",
    price: 1500,
    isPack: false,
    isPopular: false,
    highlights: [
      "Thèmes personnalisés adaptés à votre identité visuelle",
      "Plugins spécifiques à vos besoins métier",
      "Intégration WooCommerce pour e-commerce performant",
      "Optimisation SEO complète (structure, vitesse, métadonnées)"
    ],
    deliverables: "Site rapide (PageSpeed 90+), sécurisé (SSL, pare-feu) et évolutif. Back-office intuitif avec formation incluse."
  },
  {
    id: 'dev-web-moderne',
    title: "Création de sites React/Next.js",
    description: "Applications web modernes ultra-performantes avec React et Next.js 15, le framework de référence utilisé par Netflix et Airbnb.",
    price: 2800,
    isPack: false,
    isPopular: false,
    highlights: [
      "Server-Side Rendering (SSR) pour temps de chargement optimal",
      "TypeScript pour un code robuste et maintenable",
      "Intégrations avancées (Stripe, Supabase, IA)",
      "Design moderne avec Tailwind CSS et animations Framer Motion"
    ],
    deliverables: "Application complète déployée sur Vercel avec code source documenté et tests automatisés. Support Progressive Web Apps (PWA)."
  },
  {
    id: 'optimisation-performance',
    title: "Maintenance et optimisation",
    description: "Audit et optimisation de votre infrastructure web pour garantir performances et sécurité maximales.",
    price: 800,
    isPack: false,
    isPopular: false,
    highlights: [
      "Analyse Core Web Vitals et PageSpeed Insights",
      "Optimisation images et code (lazy loading, minification)",
      "Mises à jour sécurité (SSL, protection SQL/XSS)",
      "Configuration cache avancé (Redis, CDN)"
    ],
    deliverables: "Site optimisé avec sauvegardes automatiques quotidiennes. Rapport détaillé avec recommandations long terme."
  },
  {
    id: 'migration-refonte',
    title: "Migration et refonte",
    description: "Transformation digitale complète de votre site avec garantie zéro perte de données et zéro impact SEO.",
    price: 2200,
    isPack: false,
    isPopular: false,
    highlights: [
      "Migration WordPress vers React/Next.js",
      "Export complet et redirections 301 préservant le SEO",
      "Design moderne (mobile-first, accessibilité WCAG)",
      "Environnement de staging pour validation"
    ],
    deliverables: "Mise en production planifiée en heures creuses avec accompagnement post-migration. Formation et documentation complète."
  }
]

// Combiner packs et services
const allServices = [...packs, ...services]

// Composant qui gère les paramètres d'URL
function PackAutoSelector({ onSelectPack }: { onSelectPack: (packId: string) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const pack = searchParams.get('pack')
    if (pack && (pack === 'demi-journee' || pack === 'journee')) {
      onSelectPack(pack)
    }
  }, [searchParams, onSelectPack])

  return null
}

export default function PaymentPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)

  const handleServiceSelect = useCallback(async (serviceId: string) => {
    setSelectedService(serviceId)
    setIsCreatingPayment(true)

    const service = allServices.find(s => s.id === serviceId)
    if (service) {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: service.price * 100, // Convert to cents for Stripe
            currency: 'eur',
            metadata: {
              service_id: service.id,
              service_name: service.title,
              is_pack: service.isPack ? 'true' : 'false'
            }
          }),
        })

        const data = await response.json()
        if (response.ok) {
          setClientSecret(data.clientSecret)
          setShowPaymentForm(true)
        } else {
          console.error('Error creating payment intent:', data.error)
        }
      } catch (error) {
        console.error('Error creating payment intent:', error)
      }
    }
    setIsCreatingPayment(false)
  }, [])

  const selectedServiceData = allServices.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Auto-sélection des packs depuis l'URL */}
      <Suspense fallback={null}>
        <PackAutoSelector onSelectPack={handleServiceSelect} />
      </Suspense>

      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-8 pt-24">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </div>

      <div className="container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Commencer votre projet</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Choisissez le service qui correspond à vos besoins
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Paiement sécurisé Stripe
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Sans engagement
            </Badge>
          </div>
        </motion.div>

        {!showPaymentForm ? (
          /* Service Selection */
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Section Packs - Mise en avant */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white mb-4 px-4 py-1.5">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Offres Recommandées
                </Badge>
                <h2 className="text-2xl font-bold">Packs Développement</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Idéal pour tester mes compétences ou pour des besoins ponctuels
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {packs.map((pack, index) => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`h-full hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-slate-900 relative overflow-hidden ${
                        pack.isPopular
                          ? 'border-2 border-orange-300 dark:border-orange-700 ring-2 ring-orange-400/50 shadow-xl'
                          : 'border-2 border-blue-200 dark:border-blue-800 shadow-lg'
                      }`}
                      onClick={() => handleServiceSelect(pack.id)}
                    >
                      {/* Top accent line */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${
                        pack.isPopular
                          ? 'bg-gradient-to-r from-orange-500 to-red-500'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}></div>

                      {/* Badge populaire */}
                      {pack.isPopular && (
                        <div className="absolute -top-0 -right-0">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                            POPULAIRE
                          </div>
                        </div>
                      )}

                      <CardHeader className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl ${
                            pack.isPopular
                              ? 'bg-orange-100 dark:bg-orange-900/30'
                              : 'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            {pack.isPopular ? (
                              <Calendar className={`w-6 h-6 ${pack.isPopular ? 'text-orange-600' : 'text-blue-600'}`} />
                            ) : (
                              <Clock className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{pack.title}</CardTitle>
                            <CardDescription>
                              {pack.id === 'demi-journee' ? '4 heures' : '8 heures'} de développement
                            </CardDescription>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className={`text-4xl font-bold ${pack.isPopular ? 'text-orange-600' : 'text-blue-600'}`}>
                            {pack.price}€
                          </span>
                          <span className="text-slate-500">HT</span>
                          {pack.isPopular && (
                            <Badge variant="secondary" className="ml-2 text-emerald-600 bg-emerald-50 text-xs">
                              -3% vs 2x demi-journée
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {pack.description}
                        </p>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {pack.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                pack.isPopular ? 'text-orange-600' : 'text-blue-600'
                              }`} />
                              <span className="text-sm text-slate-600 dark:text-slate-400">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <Button
                          className={`w-full ${
                            pack.isPopular
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                          disabled={isCreatingPayment}
                        >
                          {isCreatingPayment ? 'Préparation...' : `Réserver ${pack.id === 'demi-journee' ? 'ma demi-journée' : 'ma journée'}`}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Séparateur */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 px-4 text-sm text-slate-500">
                  ou choisissez un projet complet
                </span>
              </div>
            </div>

            {/* Section Services Complets */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl font-bold">Projets Complets</h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Solutions clés en main pour vos projets web
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer bg-white dark:bg-slate-900"
                          onClick={() => handleServiceSelect(service.id)}>
                      <CardHeader className="space-y-4">
                        <div className="flex justify-between items-start mb-3">
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <Badge variant="outline" className="text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400 font-semibold">
                            {service.price.toLocaleString('fr-FR')}€
                          </Badge>
                        </div>

                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                          {service.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Ce que vous obtenez :</h4>
                          <ul className="space-y-2.5">
                            {service.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverables */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                            ✓ {service.deliverables}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          disabled={isCreatingPayment}
                        >
                          {isCreatingPayment ? 'Préparation...' : 'Choisir ce service'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Payment Form */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPaymentForm(false)}
                    className="p-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <CardTitle>Finaliser votre commande</CardTitle>
                    <CardDescription>Paiement sécurisé avec Stripe</CardDescription>
                  </div>
                </div>

                {selectedServiceData && (
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{selectedServiceData.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {selectedServiceData.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {selectedServiceData.price.toLocaleString('fr-FR')}€
                        </div>
                        <div className="text-sm text-slate-500">TTC</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent>
                {clientSecret && stripePromise ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#2563eb',
                          colorBackground: '#ffffff',
                          colorText: '#1f2937',
                          colorDanger: '#ef4444',
                          fontFamily: 'system-ui, sans-serif',
                          spacingUnit: '4px',
                          borderRadius: '8px'
                        }
                      },
                    }}
                  >
                    <PaymentForm
                      service={selectedServiceData!}
                      clientSecret={clientSecret}
                      onSuccess={() => {
                        // Redirect to success page
                        window.location.href = '/payment/success'
                      }}
                    />
                  </Elements>
                ) : !stripePromise ? (
                  <div className="text-center py-8">
                    <div className="text-red-600 mb-4">❌ Erreur de configuration Stripe</div>
                    <p className="text-slate-600">Impossible de charger le système de paiement.</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Initialisation du paiement sécurisé...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}