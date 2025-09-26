import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature manquante' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('Erreur validation webhook:', err)
    return NextResponse.json(
      { error: 'Webhook invalide' },
      { status: 400 }
    )
  }

  // Gérer les événements Stripe
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Paiement réussi:', paymentIntent.id)

      // Ici vous pouvez :
      // - Enregistrer la commande en base de données
      // - Envoyer un email de confirmation
      // - Déclencher d'autres actions

      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      console.log('Paiement échoué:', failedPayment.id)
      break

    default:
      console.log(`Événement non géré: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}