'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, CreditCard, CheckCircle2 } from 'lucide-react'
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

const services = [
  {
    id: 'wordpress-expert',
    title: "Développement WordPress personnalisé",
    description: "Sites WordPress sur mesure qui dépassent les simples templates.",
    price: 1500,
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
    highlights: [
      "Migration WordPress vers React/Next.js",
      "Export complet et redirections 301 préservant le SEO",
      "Design moderne (mobile-first, accessibilité WCAG)",
      "Environnement de staging pour validation"
    ],
    deliverables: "Mise en production planifiée en heures creuses avec accompagnement post-migration. Formation et documentation complète."
  }
]

export default function PaymentPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isCreatingPayment, setIsCreatingPayment] = useState(false)

  const handleServiceSelect = async (serviceId: string) => {
    setSelectedService(serviceId)
    setIsCreatingPayment(true)

    const service = services.find(s => s.id === serviceId)
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
  }

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
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
          <div className="max-w-6xl mx-auto">
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