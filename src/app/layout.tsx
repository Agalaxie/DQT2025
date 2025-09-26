import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only load when needed
});

export const metadata: Metadata = {
  title: "DigitalQT | Stéphane D. | Développeur Frontend Expert WordPress & React | Freelance",
  description: "Développeur Frontend Expert freelance spécialisé WordPress, React & Next.js. +10 ans d'expérience, 57 projets réalisés, ⭐⭐⭐⭐⭐ 50 avis clients. Solutions web performantes.",
  keywords: [
    "développeur frontend",
    "développeur wordpress",
    "développeur react",
    "développeur nextjs",
    "expert wordpress freelance",
    "développement web freelance",
    "freelance développeur",
    "création site web",
    "développeur full stack",
    "intégration web",
    "optimisation performance web",
    "développeur ecommerce",
    "woocommerce expert",
    "développeur responsive",
    "consultant web"
  ].join(", "),
  authors: [{ name: "Stéphane D." }],
  creator: "Stéphane D.",
  publisher: "Stéphane D.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://digitalqt.com"),
  openGraph: {
    title: "Stéphane D. | Développeur Frontend Expert WordPress & React",
    description: "Développeur Frontend Expert freelance spécialisé WordPress, React & Next.js. +10 ans d'expérience, 57 projets réalisés, solutions web performantes.",
    url: "https://digitalqt.com",
    siteName: "Stéphane D. - Développeur Frontend",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stéphane D. - Développeur Frontend Expert"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stéphane D. | Développeur Frontend Expert",
    description: "Développeur Frontend Expert WordPress & React freelance. +10 ans d'expérience.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "gbUUtgppTHp2TFJjb4IDMEM_tsAmmOu5qZlLjuHnq9g",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
