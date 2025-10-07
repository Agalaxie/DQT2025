import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales - DigitalQT',
  description: 'Informations légales et coordonnées de Stéphane D., développeur frontend freelance.',
  alternates: {
    canonical: 'https://www.digitalqt.com/mentions-legales',
  },
  openGraph: {
    title: 'Mentions Légales - DigitalQT',
    description: 'Informations légales et coordonnées de Stéphane D., développeur frontend freelance.',
    url: 'https://www.digitalqt.com/mentions-legales',
    siteName: 'Stéphane D. - Développeur Frontend',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
