import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'

// Lazy initialization pour éviter les erreurs au build
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  })
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('Missing stripe-signature header')
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Traitement des événements
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✅ Paiement réussi:', paymentIntent.id)

        // Ici tu peux ajouter la logique pour :
        // - Envoyer un email de confirmation
        // - Mettre à jour ta base de données
        // - Déclencher la livraison du service

        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('❌ Paiement échoué:', failedPayment.id)

        // Ici tu peux ajouter la logique pour :
        // - Notifier l'échec du paiement
        // - Envoyer un email d'information

        break

      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('✅ Session checkout complétée:', session.id)

        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('✅ Facture payée:', invoice.id)

        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('❌ Paiement de facture échoué:', failedInvoice.id)

        break

      default:
        console.log(`Événement non géré: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erreur webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Méthodes autorisées
export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint' })
}