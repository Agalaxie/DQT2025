import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Devis & Estimation - Développeur Frontend Expert | Stéphane D.',
  description: 'Demandez un devis personnalisé pour votre projet web. Développement WordPress, React, Next.js. Tarifs transparents et réponse rapide.',
  alternates: {
    canonical: 'https://www.digitalqt.com/devis',
  },
  openGraph: {
    title: 'Devis & Estimation - Développeur Frontend Expert',
    description: 'Demandez un devis personnalisé pour votre projet web. Tarifs transparents et réponse rapide.',
    url: 'https://www.digitalqt.com/devis',
    siteName: 'Stéphane D. - Développeur Frontend',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function DevisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
