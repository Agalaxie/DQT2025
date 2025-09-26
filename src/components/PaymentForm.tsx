'use client'

import { useState, useEffect } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, Shield } from 'lucide-react'

interface PaymentFormProps {
  service: {
    id: string
    title: string
    price: number
    description: string
  }
  clientSecret: string
  onSuccess: () => void
}

export default function PaymentForm({ service, clientSecret, onSuccess }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Validate form
      if (!formData.name || !formData.email) {
        throw new Error('Veuillez remplir tous les champs obligatoires')
      }

      // Confirm payment
      const { error: submitError } = await elements.submit()
      if (submitError) {
        throw new Error(submitError.message)
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success?service=${service.id}`,
          receipt_email: formData.email,
        }
      })

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          throw new Error(error.message)
        } else {
          throw new Error("Une erreur inattendue s'est produite.")
        }
      }

      // If we get here, payment was successful
      onSuccess()
    } catch (err) {
      console.error('Payment failed:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors du paiement')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Client Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Informations client
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="company">Entreprise (optionnel)</Label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="message">Détails du projet (optionnel)</Label>
          <Textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Décrivez votre projet, vos besoins spécifiques..."
            className="mt-1"
          />
        </div>
      </div>

      {/* Payment Element */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Informations de paiement
        </h3>

        <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
          <PaymentElement />
        </div>
      </div>

      {/* Error display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Submit button */}
      <Button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full h-12 text-lg"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Traitement en cours...
          </div>
        ) : (
          `Payer ${service.price.toLocaleString('fr-FR')}€`
        )}
      </Button>

      <div className="text-center text-sm text-slate-500">
        <p className="flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" />
          Paiement sécurisé par Stripe - Aucune donnée de carte stockée
        </p>
      </div>
    </form>
  )
}