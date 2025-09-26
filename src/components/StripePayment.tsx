'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, CreditCard, Shield, Lock } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
  metadata?: Record<string, string>
}

function PaymentForm({ amount, onSuccess, onError, metadata }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || 'Une erreur est survenue')
        onError(error.message || 'Une erreur est survenue')
      } else {
        setMessage('Une erreur inattendue est survenue.')
        onError('Une erreur inattendue est survenue.')
      }
    } else {
      onSuccess()
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        <PaymentElement />

        <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
          <Shield className="w-3 h-3" />
          <span>Paiement sécurisé par Stripe • SSL 256-bit • PCI DSS Level 1</span>
        </div>
      </div>

      {message && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-sm">
          {message}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total à payer</div>
          <div className="text-2xl font-bold">{amount}€</div>
        </div>

        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-w-[120px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Payer {amount}€
            </>
          )}
        </Button>
      </div>

      <div className="text-xs text-slate-500 space-y-1">
        <p>✅ Paiement 100% sécurisé</p>
        <p>✅ Aucune donnée bancaire stockée</p>
        <p>✅ Remboursement possible sous 14 jours</p>
      </div>
    </form>
  )
}

interface StripePaymentProps {
  amount: number
  title: string
  description: string
  metadata?: Record<string, string>
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function StripePayment({
  amount,
  title,
  description,
  metadata,
  onSuccess,
  onError
}: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    createPaymentIntent()
  }, [amount])

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          metadata: {
            ...metadata,
            title,
            description
          }
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setClientSecret(data.clientSecret)
      }
    } catch (err) {
      setError('Erreur de connexion au serveur de paiement')
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = () => {
    setSuccess(true)
    onSuccess?.()
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    onError?.(errorMessage)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Préparation du paiement sécurisé...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (success) {
    return (
      <Card className="border-2 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardContent className="text-center py-12">
          <CheckCircle className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
          <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
            Paiement réussi !
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Votre paiement de {amount}€ a été traité avec succès.
            Vous allez recevoir une confirmation par email.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-2 border-red-200 bg-red-50/50 dark:bg-red-950/20">
        <CardContent className="text-center py-12">
          <XCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
            Erreur de paiement
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {error}
          </p>
          <Button onClick={createPaymentIntent} variant="outline">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!clientSecret) {
    return null
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px'
    }
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              {title}
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {description}
            </p>
          </div>
          <Badge variant="outline" className="text-emerald-600 border-emerald-200">
            Paiement sécurisé
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm
            amount={amount}
            onSuccess={handleSuccess}
            onError={handleError}
            metadata={metadata}
          />
        </Elements>
      </CardContent>
    </Card>
  )
}