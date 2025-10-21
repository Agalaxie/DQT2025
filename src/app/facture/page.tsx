'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, FileText, CheckCircle, AlertCircle, Lock, ArrowLeft, Search, Loader2 } from 'lucide-react'
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

interface ZohoInvoice {
  invoice_id: string
  invoice_number: string
  status: string
  total: number
  balance: number
  customer_name: string
  email: string
  date: string
  due_date: string
  currency_symbol: string
}

export default function FacturePage() {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [zohoInvoice, setZohoInvoice] = useState<ZohoInvoice | null>(null)
  const [isLoadingZoho, setIsLoadingZoho] = useState(false)
  const [zohoError, setZohoError] = useState<string | null>(null)

  const handleSearchInvoice = async () => {
    if (!invoiceNumber.trim()) {
      setZohoError('Veuillez saisir un numéro de facture')
      return
    }

    setIsLoadingZoho(true)
    setZohoError(null)
    setZohoInvoice(null)

    try {
      const response = await fetch(`/api/zoho/invoice/${encodeURIComponent(invoiceNumber)}`)

      if (response.ok) {
        const data = await response.json()
        setZohoInvoice(data.invoice)

        // Auto-remplir les champs
        setAmount(data.invoice.balance.toFixed(2))
        if (data.invoice.email) {
          setClientEmail(data.invoice.email)
        }
      } else {
        const error = await response.json()
        setZohoError(error.error || 'Facture non trouvée dans Zoho Invoice')
      }
    } catch (error) {
      console.error('Error fetching invoice:', error)
      setZohoError('Erreur lors de la recherche de la facture')
    } finally {
      setIsLoadingZoho(false)
    }
  }

  const handlePayment = async () => {
    if (!invoiceNumber || !amount || !clientEmail) {
      alert('Veuillez remplir tous les champs')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Convert to cents
          currency: 'eur',
          metadata: {
            type: 'invoice_payment',
            invoice_number: invoiceNumber,
            client_email: clientEmail,
            zoho_invoice_id: zohoInvoice?.invoice_id || null,
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
      alert('Erreur lors de la création du paiement')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 pt-24 max-w-4xl">
        {/* Header */}
        {!showPaymentForm && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-blue-50/80 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 mb-6 border border-blue-200/50 dark:border-blue-800/50">
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Paiement sécurisé</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent">
              Paiement de Facture
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400">
              Réglez votre facture rapidement et en toute sécurité
            </p>
          </div>
        )}

        {!showPaymentForm ? (
          <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informations de paiement
              </CardTitle>
              <CardDescription>
                Saisissez les informations de votre facture pour procéder au paiement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="invoice">Numéro de facture</Label>
                <div className="flex gap-2">
                  <Input
                    id="invoice"
                    placeholder="Ex: FAC-2025-001"
                    value={invoiceNumber}
                    onChange={(e) => {
                      setInvoiceNumber(e.target.value)
                      setZohoInvoice(null)
                      setZohoError(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchInvoice()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleSearchInvoice}
                    disabled={isLoadingZoho || !invoiceNumber.trim()}
                    variant="outline"
                    className="shrink-0"
                  >
                    {isLoadingZoho ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Afficher les infos Zoho */}
                {zohoInvoice && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                          {zohoInvoice.customer_name}
                        </p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300">
                          Facture trouvée dans Zoho Invoice
                        </p>
                      </div>
                      <Badge
                        variant={zohoInvoice.status === 'paid' ? 'default' : 'destructive'}
                        className={zohoInvoice.status === 'paid' ? 'bg-emerald-600' : ''}
                      >
                        {zohoInvoice.status === 'paid' ? 'Payée' :
                         zohoInvoice.status === 'unpaid' ? 'Impayée' :
                         zohoInvoice.status === 'overdue' ? 'En retard' : zohoInvoice.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400">
                      <p>Montant restant : {zohoInvoice.currency_symbol}{zohoInvoice.balance.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                {/* Afficher l'erreur Zoho */}
                {zohoError && (
                  <div className="mt-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                    <p className="text-sm text-orange-900 dark:text-orange-100">
                      {zohoError}
                    </p>
                    <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                      Vous pouvez quand même saisir les informations manuellement ci-dessous.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Montant (€)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 1500.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email de confirmation</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>

              <Separator />

              <Button
                onClick={handlePayment}
                disabled={isLoading || !invoiceNumber || !amount || !clientEmail}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isLoading ? (
                  "Traitement en cours..."
                ) : (
                  <>
                    <CreditCard className="mr-2 w-4 h-4" />
                    Procéder au paiement
                  </>
                )}
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Paiement sécurisé via Stripe. Vos données sont protégées.
              </p>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Security Info */}
            <Card className="border border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <Lock className="w-5 h-5" />
                  Paiement 100% Sécurisé
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Chiffrement SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Conformité PCI DSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Protection Stripe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Confirmation par email</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Moyens de paiement acceptés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="outline" className="justify-center py-2">
                    💳 Visa
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    💳 Mastercard
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    💳 American Express
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    🏛️ Virement SEPA
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card className="border border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <AlertCircle className="w-5 h-5" />
                  Besoin d'aide ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  En cas de problème avec votre facture ou le paiement :
                </p>
                <div className="space-y-2">
                  <p className="text-sm">
                    📧 <strong>Email :</strong> contact@digitalqt.com
                  </p>
                  <p className="text-sm">
                    ⏰ <strong>Réponse :</strong> Sous 24h ouvrées
                  </p>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="mailto:contact@digitalqt.com">
                    Contacter le support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        ) : (
          /* Payment Form with Stripe Elements */
          <div className="max-w-2xl mx-auto">
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
                    <CardTitle>Finaliser le paiement</CardTitle>
                    <CardDescription>Paiement sécurisé avec Stripe</CardDescription>
                  </div>
                </div>

                {/* Invoice Summary */}
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Facture N°</span>
                      <span className="font-semibold">{invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Email</span>
                      <span className="font-semibold">{clientEmail}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Montant à payer</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{parseFloat(amount).toLocaleString('fr-FR')}€</div>
                        <div className="text-sm text-slate-500">TTC</div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      service={{
                        id: 'invoice_payment',
                        title: `Facture ${invoiceNumber}`,
                        description: `Paiement de la facture ${invoiceNumber}`,
                        price: parseFloat(amount),
                      }}
                      clientSecret={clientSecret}
                      onSuccess={() => {
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
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}