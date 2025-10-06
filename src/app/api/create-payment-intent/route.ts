import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
  console.warn('STRIPE_SECRET_KEY is not defined')
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2025-08-27.basil',
}) : null

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  try {
    const { amount, currency = 'eur', metadata } = await request.json()

    // Déterminer l'URL de base
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                    (process.env.NODE_ENV === 'production'
                      ? 'https://www.digitalqt.com'
                      : 'http://localhost:3000')

    // Créer une Checkout Session au lieu d'un Payment Intent
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'sepa_debit'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: metadata?.type === 'invoice_payment'
                ? `Paiement Facture ${metadata.invoice_number}`
                : 'Paiement de service',
              description: metadata?.invoice_number
                ? `Facture numéro: ${metadata.invoice_number}`
                : undefined,
            },
            unit_amount: Math.round(amount), // Amount en centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/facture?canceled=true`,
      customer_email: metadata?.client_email,
      metadata,
    })

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })
  } catch (error) {
    console.error('Erreur création Checkout Session:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    )
  }
}