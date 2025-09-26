'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, FileText, CheckCircle, AlertCircle, Lock } from 'lucide-react'
import Link from 'next/link'

export default function FacturePage() {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
            client_email: clientEmail
          }
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
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
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DigitalQT
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
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
                <Input
                  id="invoice"
                  placeholder="Ex: FAC-2025-001"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
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
      </div>
    </div>
  )
}