import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paiement de Facture - DigitalQT',
  description: 'Paiement sécurisé de votre facture par carte bancaire. Règlement rapide et confidentiel.',
  alternates: {
    canonical: 'https://www.digitalqt.com/facture',
  },
  openGraph: {
    title: 'Paiement de Facture - DigitalQT',
    description: 'Paiement sécurisé de votre facture par carte bancaire.',
    url: 'https://www.digitalqt.com/facture',
    siteName: 'Stéphane D. - Développeur Frontend',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function FactureLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
