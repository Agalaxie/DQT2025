'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, CreditCard } from 'lucide-react'
import Link from 'next/link'
import PaymentForm from '@/components/PaymentForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const services = [
  {
    id: 'acces-developpeur-jour',
    title: "Accès Développeur - 1 Journée",
    description: "Accès complet à mes services de développement pendant une journée entière. Idéal pour les projets urgents ou ponctuels.",
    price: 300,
    features: [
      "8h de développement dédié",
      "Toutes technologies (WordPress, React, Next.js)",
      "Développement en temps réel",
      "Communication directe",
      "Livraison le jour même",
      "Support technique inclus",
      "Parfait pour missions urgentes"
    ],
    featured: true,
    popular: true
  },
  {
    id: 'dev-web-moderne',
    title: "Développement Web Moderne",
    description: "Applications React, Next.js avec intégration IA et solutions complètes",
    price: 2800,
    features: [
      "Application React/Next.js complète",
      "Intégration IA (OpenAI, Claude)",
      "Base de données Supabase",
      "Authentification utilisateur",
      "Interface responsive moderne",
      "SEO optimisé",
      "Déploiement Vercel"
    ]
  },
  {
    id: 'wordpress-expert',
    title: "Sites WordPress Expert",
    description: "Développement avancé avec plugins personnalisés et optimisation SEO",
    price: 1500,
    features: [
      "Site WordPress custom",
      "Thème sur mesure",
      "Plugins personnalisés",
      "Optimisation SEO avancée",
      "Performance 90+ PageSpeed",
      "Sécurité renforcée",
      "Formation incluse"
    ]
  },
  {
    id: 'ecommerce-paiements',
    title: "E-commerce & Paiements",
    description: "Boutiques en ligne performantes avec intégration Stripe et WooCommerce",
    price: 3500,
    features: [
      "Boutique e-commerce complète",
      "Intégration Stripe/PayPal",
      "Gestion des stocks",
      "Interface d'administration",
      "Emails automatiques",
      "Analytics avancées",
      "Support 3 mois"
    ]
  },
  {
    id: 'optimisation-performance',
    title: "Optimisation & Performance",
    description: "Web Core Vitals 90+ sur Google PageSpeed Insights",
    price: 800,
    features: [
      "Audit complet du site",
      "Optimisation des images",
      "Minification CSS/JS",
      "Cache et CDN",
      "Core Web Vitals 90+",
      "Rapport détaillé",
      "Suivi 1 mois"
    ]
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
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
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
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
            Choisissez le service qui correspond à vos besoins
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
            🔥 <strong>Nouveau :</strong> Accès développeur à seulement 300€/jour
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
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
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Featured Service - 300€/jour */}
            {services.filter(service => service.featured).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Card className="relative h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-xl group cursor-pointer bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-2 border-orange-200 dark:border-orange-800"
                      onClick={() => handleServiceSelect(service.id)}>
                  {/* Badges - repositionnés pour éviter les chevauchements */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg text-xs px-2 py-1">
                      ⭐ OFFRE PHARE
                    </Badge>
                    {service.popular && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg text-xs px-2 py-1">
                        🔥 POPULAIRE
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="relative z-10 pt-8">
                    {/* Prix en haut à droite, séparé du titre */}
                    <div className="flex justify-end mb-4">
                      <div className="text-right">
                        <div className="text-4xl font-bold text-orange-600">
                          {service.price.toLocaleString('fr-FR')}€
                        </div>
                        <div className="text-sm text-slate-500">par jour</div>
                      </div>
                    </div>

                    {/* Titre et description */}
                    <div className="space-y-3">
                      <CardTitle className="text-2xl font-bold leading-tight">{service.title}</CardTitle>
                      <CardDescription className="text-lg leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="grid md:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg text-lg py-6"
                        disabled={isCreatingPayment}
                        size="lg"
                      >
                        {isCreatingPayment ? 'Préparation...' : '🚀 Réserver maintenant'}
                      </Button>
                      <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">
                          ✅ Disponibilité immédiate • ✅ Livraison le jour même
                        </p>
                        <p className="text-xs text-slate-500">
                          Vous préférez Malt ?
                          <Link
                            href="https://www.malt.fr/profile/stephanedumas"
                            target="_blank"
                            className="text-orange-600 hover:text-orange-700 underline ml-1"
                          >
                            Réserver sur Malt
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Other Services */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8 text-slate-700 dark:text-slate-300">
                Autres services disponibles
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {services.filter(service => !service.featured).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 1) * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer"
                          onClick={() => handleServiceSelect(service.id)}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-3">
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {service.price.toLocaleString('fr-FR')}€
                            </div>
                            <div className="text-sm text-slate-500">TTC</div>
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                              <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full group-hover:bg-blue-600 transition-colors"
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
                {clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
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
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Initialisation du paiement...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}