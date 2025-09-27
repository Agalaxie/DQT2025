import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    return NextResponse.json({
      status: 'ok',
      checks: {
        publicKeyPresent: !!stripePublicKey,
        secretKeyPresent: !!stripeSecretKey,
        publicKeyFormat: stripePublicKey?.startsWith('pk_'),
        secretKeyFormat: stripeSecretKey?.startsWith('sk_'),
        environment: process.env.NODE_ENV,
        stripeVersion: '2025-08-27.basil'
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: 'Configuration check failed'
    }, { status: 500 })
  }
}