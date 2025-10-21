'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calculator,
  CreditCard,
  FileText,
  Globe,
  Code,
  Smartphone,
  Zap,
  CheckCircle,
  Clock,
  Euro
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PaymentForm from '@/components/PaymentForm'

// Validate Stripe key before loading
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
if (!stripePublishableKey) {
  console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
}

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null

const services = [
  {
    id: 'web-moderne',
    icon: Code,
    title: 'Développement Web Moderne',
    description: 'Applications React, Next.js avec intégration IA et solutions complètes',
    basePrice: 2800,
    features: ['React/Next.js', 'Intégration IA', 'Base de données', 'Responsive design']
  },
  {
    id: 'wordpress',
    icon: Globe,
    title: 'Sites WordPress Expert',
    description: 'Développement avancé avec plugins personnalisés et optimisation SEO',
    basePrice: 1500,
    features: ['Thème personnalisé', 'Plugins sur mesure', 'Optimisation SEO', 'Formation incluse']
  },
  {
    id: 'ecommerce',
    icon: Smartphone,
    title: 'E-commerce & Paiements',
    description: 'Boutiques en ligne performantes avec intégration Stripe et WooCommerce',
    basePrice: 3500,
    features: ['Boutique complète', 'Paiements Stripe', 'Gestion stock', 'Analytics']
  },
  {
    id: 'optimisation',
    icon: Zap,
    title: 'Optimisation & Performance',
    description: 'Web Core Vitals 90+ sur Google PageSpeed Insights',
    basePrice: 800,
    features: ['Audit complet', 'Optimisation vitesse', 'SEO technique', 'Monitoring']
  }
]

const complexity = [
  { value: 'simple', label: 'Simple', multiplier: 1 },
  { value: 'moyen', label: 'Moyen', multiplier: 1.5 },
  { value: 'complexe', label: 'Complexe', multiplier: 2 },
  { value: 'entreprise', label: 'Entreprise', multiplier: 3 }
]

interface FormData {
  service: string
  complexity: string
  deadline: string
  company: string
  name: string
  email: string
  phone: string
  description: string
  budget: string
}

export default function DevisPage() {
  const [formData, setFormData] = useState<FormData>({
    service: '',
    complexity: '',
    deadline: '',
    company: '',
    name: '',
    email: '',
    phone: '',
    description: '',
    budget: ''
  })

  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [showPayment, setShowPayment] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [isLoadingPayment, setIsLoadingPayment] = useState(false)

  const calculatePrice = () => {
    const selectedService = services.find(s => s.id === formData.service)
    const selectedComplexity = complexity.find(c => c.value === formData.complexity)

    if (!selectedService || !selectedComplexity) return 0

    return Math.round(selectedService.basePrice * selectedComplexity.multiplier)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const price = calculatePrice()
    setEstimatedPrice(price)
    setShowPayment(true)
  }

  const handlePayment = async () => {
    setIsLoadingPayment(true)
    const depositAmount = Math.round(estimatedPrice * 0.3)

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: depositAmount * 100, // Convert to cents
          currency: 'eur',
          metadata: {
            type: 'deposit',
            quote_total: estimatedPrice,
            deposit_percentage: 30,
            service: formData.service,
            client_email: formData.email,
            client_name: formData.name,
            company: formData.company,
          }
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setClientSecret(data.clientSecret)
        setShowPaymentForm(true)
      } else {
        throw new Error('Erreur lors de la création du paiement')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Erreur lors de la création du paiement. Veuillez réessayer.')
    } finally {
      setIsLoadingPayment(false)
    }
  }

  const selectedService = services.find(s => s.id === formData.service)

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
                Demande de Devis
              </h1>
            </div>

            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              <FileText className="w-3 h-3 mr-1" />
              Devis gratuit
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Détails de votre projet
                </CardTitle>
                <CardDescription>
                  Remplissez le formulaire pour obtenir un devis personnalisé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Sélection du service */}
                  <div>
                    <Label htmlFor="service">Type de service *</Label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez votre service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.id}>
                            <div className="flex items-center gap-2">
                              <service.icon className="w-4 h-4" />
                              {service.title}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Complexité */}
                  <div>
                    <Label htmlFor="complexity">Complexité du projet *</Label>
                    <Select value={formData.complexity} onValueChange={(value) => setFormData({...formData, complexity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Évaluez la complexité" />
                      </SelectTrigger>
                      <SelectContent>
                        {complexity.map(comp => (
                          <SelectItem key={comp.value} value={comp.value}>
                            {comp.label} (x{comp.multiplier})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Délai */}
                  <div>
                    <Label htmlFor="deadline">Délai souhaité</Label>
                    <Select value={formData.deadline} onValueChange={(value) => setFormData({...formData, deadline: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Quand souhaitez-vous livrer ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (&lt; 2 semaines)</SelectItem>
                        <SelectItem value="rapide">Rapide (2-4 semaines)</SelectItem>
                        <SelectItem value="normal">Normal (1-2 mois)</SelectItem>
                        <SelectItem value="flexible">Flexible (&gt; 2 mois)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Informations client */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        placeholder="Votre entreprise"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description du projet *</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre projet en détail..."
                      className="h-32"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <Label htmlFor="budget">Budget approximatif</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Votre budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-1500">500€ - 1 500€</SelectItem>
                        <SelectItem value="1500-3000">1 500€ - 3 000€</SelectItem>
                        <SelectItem value="3000-5000">3 000€ - 5 000€</SelectItem>
                        <SelectItem value="5000+">5 000€+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!formData.service || !formData.name || !formData.email || !formData.description}
                  >
                    Calculer le devis
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Aperçu et résumé */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Service sélectionné */}
            {selectedService && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <selectedService.icon className="w-5 h-5 text-blue-600" />
                    {selectedService.title}
                  </CardTitle>
                  <CardDescription>{selectedService.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium">Inclus dans ce service :</h4>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Estimation de prix */}
            {showPayment && estimatedPrice > 0 && (
              <Card className="border-2 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <Euro className="w-5 h-5" />
                    Estimation de prix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-2xl font-bold">
                      <span>Total estimé :</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{estimatedPrice}€ HT</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>Devis valable 30 jours</span>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Options de règlement :</h4>

                      <Button
                        onClick={handlePayment}
                        disabled={isLoadingPayment}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      >
                        <CreditCard className="mr-2 w-4 h-4" />
                        {isLoadingPayment ? 'Préparation...' : `Acompte 30% - ${Math.round(estimatedPrice * 0.3)}€`}
                      </Button>

                      <Button variant="outline" className="w-full">
                        Recevoir le devis détaillé par email
                      </Button>

                      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        <p>✅ Acompte de 30% pour démarrer le projet</p>
                        <p>✅ Solde à la livraison</p>
                        <p>✅ Garantie satisfait ou remboursé</p>
                        <p>✅ Support technique inclus</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations */}
            <Card>
              <CardHeader>
                <CardTitle>Processus de collaboration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Analyse du projet</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Étude détaillée de vos besoins et création d'un cahier des charges
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Développement</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Création de votre solution avec mises à jour régulières
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Tests & livraison</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Tests complets, formation et mise en production
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Payment Form Modal */}
        {showPaymentForm && clientSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowPaymentForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="shadow-2xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle>Paiement de l&apos;acompte</CardTitle>
                      <CardDescription>Paiement sécurisé avec Stripe</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPaymentForm(false)}
                      className="h-8 w-8 p-0"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Quote Summary */}
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Service</span>
                      <span className="font-semibold">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Client</span>
                      <span className="font-semibold">{formData.name}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Total devis</span>
                      <span className="font-semibold">{estimatedPrice}€ HT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Acompte 30%</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {Math.round(estimatedPrice * 0.3)}€
                        </div>
                        <div className="text-sm text-slate-500">TTC</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {stripePromise ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary: '#10b981',
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
                        service={{
                          id: formData.service,
                          title: `Acompte 30% - ${selectedService?.title || 'Devis'}`,
                          description: `Acompte de ${Math.round(estimatedPrice * 0.3)}€ sur un total de ${estimatedPrice}€`,
                          price: Math.round(estimatedPrice * 0.3),
                        }}
                        clientSecret={clientSecret}
                        onSuccess={() => {
                          window.location.href = '/payment/success'
                        }}
                      />
                    </Elements>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-red-600 mb-4">❌ Erreur de configuration Stripe</div>
                      <p className="text-slate-600">Impossible de charger le système de paiement.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}