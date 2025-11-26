'use client'

import { useState, useEffect } from 'react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import { useMotionConfig } from '@/hooks/useReducedMotion'
import { useOptimizedLayout, usePerformanceOptimizations } from '@/hooks/useOptimizedLayout'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Code,
  Globe,
  Smartphone,
  Zap,
  Star,
  MapPin,
  Mail,
  ExternalLink,
  ChevronDown,
  Play,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import PerlinNoiseBackground from '@/components/PerlinNoiseBackground'
import PerlinNoiseTransparent from '@/components/PerlinNoiseTransparent'
import RotatingText from '@/components/RotatingText'

// Schema.org structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Stéphane D.",
  "jobTitle": "Développeur Frontend Expert",
  "description": "Développeur Frontend Expert spécialisé WordPress, React & Next.js",
  "url": "https://stephane-dev.fr",
  "sameAs": [
    "https://www.malt.fr/profile/stephanedupont"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Paris",
    "addressCountry": "France"
  },
  "knowsAbout": [
    "WordPress",
    "React",
    "Next.js",
    "JavaScript",
    "Frontend Development",
    "Web Development",
    "E-commerce",
    "WooCommerce"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Développeur Frontend",
    "occupationLocation": {
      "@type": "City",
      "name": "Paris"
    }
  },
  "offers": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Développement Frontend",
      "description": "Services de développement web WordPress et React"
    }
  }
}

const skills = [
  "WordPress", "Développement web", "E-commerce", "Elementor", "Intégration web",
  "WooCommerce", "HTML5", "CSS3", "Site wordpress", "Responsive design",
  "JavaScript", "jQuery", "React", "Next.js", "Supabase", "Stripe"
]

const services = [
  {
    icon: Globe,
    title: "Développement WordPress personnalisé",
    description: "Sites WordPress sur mesure qui dépassent les simples templates.",
    highlights: [
      "Thèmes personnalisés adaptés à votre identité visuelle",
      "Plugins spécifiques à vos besoins métier",
      "Intégration WooCommerce pour e-commerce performant",
      "Optimisation SEO complète (structure, vitesse, métadonnées)"
    ],
    deliverables: "Site rapide (PageSpeed 90+), sécurisé (SSL, pare-feu) et évolutif. Back-office intuitif avec formation incluse.",
    price: "À partir de 1500€",
    features: ["Thème personnalisé", "Plugins sur mesure", "Optimisation SEO", "Formation incluse"]
  },
  {
    icon: Code,
    title: "Création de sites React/Next.js",
    description: "Applications web modernes ultra-performantes avec React et Next.js 15, le framework de référence utilisé par Netflix et Airbnb.",
    highlights: [
      "Server-Side Rendering (SSR) pour temps de chargement optimal",
      "TypeScript pour un code robuste et maintenable",
      "Intégrations avancées (Stripe, Supabase, IA)",
      "Design moderne avec Tailwind CSS et animations Framer Motion"
    ],
    deliverables: "Application complète déployée sur Vercel avec code source documenté et tests automatisés. Support Progressive Web Apps (PWA).",
    price: "À partir de 2800€",
    features: ["Next.js 15 + React 19", "TypeScript", "SSR/SSG optimisé", "Intégrations IA"]
  },
  {
    icon: Zap,
    title: "Maintenance et optimisation",
    description: "Audit et optimisation de votre infrastructure web pour garantir performances et sécurité maximales.",
    highlights: [
      "Analyse Core Web Vitals et PageSpeed Insights",
      "Optimisation images et code (lazy loading, minification)",
      "Mises à jour sécurité (SSL, protection SQL/XSS)",
      "Configuration cache avancé (Redis, CDN)"
    ],
    deliverables: "Site optimisé avec sauvegardes automatiques quotidiennes. Rapport détaillé avec recommandations long terme.",
    price: "À partir de 800€",
    features: ["Audit performance", "Mises à jour sécurité", "Optimisation vitesse", "Support continu"]
  },
  {
    icon: Smartphone,
    title: "Migration et refonte",
    description: "Transformation digitale complète de votre site avec garantie zéro perte de données et zéro impact SEO.",
    highlights: [
      "Migration WordPress vers React/Next.js",
      "Export complet et redirections 301 préservant le SEO",
      "Design moderne (mobile-first, accessibilité WCAG)",
      "Environnement de staging pour validation"
    ],
    deliverables: "Mise en production planifiée en heures creuses avec accompagnement post-migration. Formation et documentation complète.",
    price: "À partir de 2200€",
    features: ["Migration complète", "Zéro perte de données", "Redirections SEO", "Design moderne"]
  }
]

const clients = [
  {
    name: "Netflix",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg",
    alt: "Netflix - Plateforme de streaming"
  },
  {
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg",
    alt: "Spotify - Streaming musical"
  },
  {
    name: "Airbnb",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/airbnb.svg",
    alt: "Airbnb - Location de logements"
  },
  {
    name: "Microsoft",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg",
    alt: "Microsoft - Solutions technologiques"
  },
  {
    name: "Vercel",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg",
    alt: "Vercel - Plateforme de déploiement"
  },
  {
    name: "Shopify",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shopify.svg",
    alt: "Shopify - E-commerce"
  }
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})
  const motionConfig = useMotionConfig()

  // Hooks d'optimisation de performance
  useOptimizedLayout()
  usePerformanceOptimizations()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleCard = (title: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen bg-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 smooth-scroll overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DigitalQT
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <Link href="#packs" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors font-medium">
                  Packs
                </Link>
                <Link href="#services" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                  Services
                </Link>
                <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                  Dashboard
                </Link>
                <Link href="#clients" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                  Clients
                </Link>
              </div>

              <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="#contact">Contact</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section hero-content relative pt-32 pb-20 px-6 overflow-hidden bg-slate-50">
        {/* Perlin Noise Animation Background - Disabled on mobile for performance */}
        {!motionConfig.shouldReduceMotion && (
          <PerlinNoiseTransparent
            className="absolute top-1/3 left-1/4 w-1/2 h-1/2"
            nodeCount={200}
            speed={0.002}
            opacity={0.15}
            colorCycle={true}
          />
        )}

        {/* Shader Background Animation - Disabled on mobile for performance */}
        {!motionConfig.shouldReduceMotion && (
          <div className="shader-bg opacity-50">
            <div className="shader-layer"></div>
            <div className="shader-layer"></div>
            <div className="shader-layer"></div>
          </div>
        )}

        {/* Background Illustration */}
        <div className="absolute inset-0 pointer-events-none opacity-70 overflow-hidden">
          {/* Animated Gradient Shapes */}
          <div className="absolute top-20 left-0 md:left-10 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/15 dark:from-blue-900/15 dark:to-purple-900/10 rounded-full blur-3xl animate-pulse [animation-duration:8s]"></div>
          <div className="absolute top-40 right-0 md:right-20 w-48 md:w-80 h-48 md:h-80 bg-gradient-to-br from-slate-100/25 to-blue-100/15 dark:from-slate-800/20 dark:to-blue-800/10 rounded-full blur-3xl animate-pulse [animation-duration:6s] [animation-delay:2s]"></div>
          <div className="absolute bottom-20 left-1/4 md:left-1/3 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-purple-100/20 to-slate-100/15 dark:from-purple-900/10 dark:to-slate-800/10 rounded-full blur-3xl animate-pulse [animation-duration:10s] [animation-delay:4s]"></div>

          {/* Floating Geometric Elements - Hidden on mobile */}
          <div className="hidden md:block absolute top-32 right-1/4 opacity-10 dark:opacity-15 animate-[float_12s_ease-in-out_infinite]">
            <div className="w-24 h-24 border border-slate-300 dark:border-slate-600 rounded-lg rotate-12"></div>
          </div>
          <div className="hidden md:block absolute bottom-40 left-20 opacity-8 dark:opacity-12 animate-[float_15s_ease-in-out_infinite_reverse]">
            <div className="w-20 h-20 border border-slate-300 dark:border-slate-600 rotate-45"></div>
          </div>
          <div className="hidden md:block absolute top-1/2 right-32 opacity-6 dark:opacity-10 animate-[float_10s_ease-in-out_infinite]">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-200/30 to-purple-200/20 dark:from-blue-800/20 dark:to-purple-800/15 rounded-full"></div>
          </div>

          {/* Subtle Dot Pattern - Hidden on mobile */}
          <div className="hidden md:block absolute inset-0 opacity-15 dark:opacity-25">
            <div className="absolute top-24 left-32 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:4s]"></div>
            <div className="absolute top-48 right-40 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:3s] [animation-delay:1s]"></div>
            <div className="absolute bottom-32 left-1/2 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:5s] [animation-delay:2s]"></div>
            <div className="absolute top-1/3 left-16 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:6s] [animation-delay:3s]"></div>
            <div className="absolute bottom-48 right-24 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:4s] [animation-delay:1.5s]"></div>
          </div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div
            {...motionConfig.slideUp}
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 mb-6 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
              <div className="w-3 h-3 availability-dot rounded-full"></div>
              <span className="font-medium text-sm">Disponibilité confirmée</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent">
              Développeur Frontend Expert
              <br />
              <RotatingText
                words={['React', 'Next.js', 'TypeScript', 'WordPress', 'Tailwind', 'Node.js']}
                interval={2500}
              />{' '}
              Freelance
            </h1>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                <Link href="#packs">
                  <Clock className="mr-2 w-4 h-4" />
                  Dès 150€ la demi-journée
                </Link>
              </Button>
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="#services">
                  Voir tous les services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://www.malt.fr/profile/stephanedumas" target="_blank">
                  <Star className="mr-2 w-4 h-4" />
                  Profil Malt
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            {...motionConfig.slideUp}
            className="mt-16"
          >
            <ChevronDown className="mx-auto w-6 h-6 text-slate-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            {...motionConfig.slideUp}
            whileInView={motionConfig.slideUp.animate}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Compétences Techniques</h2>
            <p className="text-slate-600 dark:text-slate-400">Technologies maîtrisées et certifiées</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-default">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packs Développement - Section mise en avant */}
      <section id="packs" className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 md:left-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 md:right-1/4 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Offre Recommandée
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Packs Développement
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Réservez du temps de développement sans engagement projet. Idéal pour tester mes compétences ou pour des besoins ponctuels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pack Demi-journée */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full border-2 border-blue-200 dark:border-blue-800 shadow-xl bg-white dark:bg-slate-900 overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Demi-journée</CardTitle>
                      <CardDescription>4 heures de développement</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-blue-600">150€</span>
                    <span className="text-slate-500">HT</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    Parfait pour des corrections, ajustements ou petites fonctionnalités.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">4h de développement dédié</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Bug fixes et corrections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Petites fonctionnalités</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Optimisations ponctuelles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Livraison dans la journée</span>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link href="/payment?pack=demi-journee&amount=150">
                        Réserver ma demi-journée
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pack Journée complète - Mis en avant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full border-2 border-orange-300 dark:border-orange-700 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden hover:shadow-2xl transition-shadow ring-2 ring-orange-400/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>

                {/* Badge populaire */}
                <div className="absolute -top-0 -right-0">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                    ⭐ POPULAIRE
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Journée complète</CardTitle>
                      <CardDescription>8 heures de développement</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-orange-600">290€</span>
                    <span className="text-slate-500">HT</span>
                    <Badge variant="secondary" className="ml-2 text-emerald-600 bg-emerald-50">
                      -3% vs 2x demi-journée
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-400">
                    Idéal pour des fonctionnalités complètes ou une refonte partielle.
                  </p>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">8h de développement dédié</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Fonctionnalités complètes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Intégrations API / bases de données</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Refonte de pages ou sections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Support prioritaire</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">Appel de briefing inclus (15 min)</span>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Link href="/payment?pack=journee&amount=290">
                        Réserver ma journée
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Avantages des packs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Facture professionnelle</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Satisfaction garantie</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Services Développement Web Freelance</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Solutions complètes et performantes adaptées à vos besoins</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const isExpanded = expandedCards[service.title]
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`transition-all duration-300 border-0 shadow-md overflow-hidden cursor-pointer bg-white dark:bg-slate-900 ${
                      isExpanded
                        ? 'shadow-2xl'
                        : 'hover:shadow-xl'
                    }`}
                    onClick={() => toggleCard(service.title)}
                  >
                    <CardHeader className="space-y-5">
                      {/* En-tête toujours visible */}
                      <div className="flex items-start justify-between gap-3">
                        <motion.div
                          className="relative p-3 rounded-xl ring-1 ring-blue-500/20 group overflow-hidden"
                          whileHover={{
                            scale: 1.05
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Animated gradient background */}
                          <motion.div
                            className="absolute inset-0 opacity-20 group-hover:opacity-100"
                            style={{
                              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(59, 130, 246))',
                              backgroundSize: '200% 200%',
                            }}
                            initial={{ backgroundPosition: '0% 50%' }}
                            whileHover={{
                              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          <service.icon className="w-7 h-7 text-blue-600 dark:text-blue-400 relative z-10 group-hover:text-white transition-colors duration-300" />
                        </motion.div>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400 font-semibold">
                          {service.price}
                        </Badge>
                      </div>

                      <div>
                        <CardTitle className="text-2xl mb-3 text-slate-900 dark:text-white">{service.title}</CardTitle>
                        {!isExpanded && (
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Cliquez pour voir les détails
                          </p>
                        )}
                      </div>

                      {/* Contenu expandable */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? "auto" : 0,
                          opacity: isExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-5 pt-2">
                          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                            {service.description}
                          </p>

                          {/* Highlights - Points clés */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">Ce que vous obtenez :</h4>
                            <ul className="space-y-2.5">
                              {service.highlights.map((highlight, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Deliverables */}
                          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                              ✓ {service.deliverables}
                            </p>
                          </div>

                          {/* Boutons d'action */}
                          <div className="space-y-3 pt-2" onClick={(e) => e.stopPropagation()}>
                            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              <Link href="/payment">
                                Commander maintenant
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                              <Link href="/#contact">
                                Demander un devis gratuit
                                <Mail className="ml-2 w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* E-commerce Template Showcase Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white mb-6">
              Solution E-commerce Clés en Main
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Template E-commerce Professionnel & Personnalisable
            </h2>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Une solution e-commerce complète et moderne, prête à être déployée et entièrement personnalisable selon vos besoins.
              Du front-end au back-office, tout est inclus pour lancer votre boutique en ligne rapidement.
            </p>
          </motion.div>

          {/* Statistiques rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">150+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Produits intégrés</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Personnalisable</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">CMS</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Admin complet</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-emerald-600 mb-2">Stripe</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Paiement intégré</div>
            </div>
          </motion.div>

          {/* Fonctionnalités principales */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Front-end */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 ring-1 ring-emerald-500/20">
                      <Globe className="w-6 h-6 text-emerald-600" />
                    </div>
                    <CardTitle className="text-2xl">Site E-commerce Front-end</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Page d'accueil avec hero animé et sections dynamiques</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Catalogue produits avec catégories et sous-catégories hiérarchiques</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Fiches produits détaillées avec galerie multi-images + zoom</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Système de variations produits avec gestion stock en temps réel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Filtres avancés personnalisables selon vos critères métier</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Panier d'achat et tunnel de commande complet avec validation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Intégration paiement Stripe sécurisé</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Blog intégré avec système de commentaires</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Pages légales complètes (CGV, mentions légales, cookies)</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Back-end Admin */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-blue-500/20">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">Interface Admin (CMS)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Dashboard avec statistiques et KPIs en temps réel</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Gestion produits : CRUD complet avec drag & drop images</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Gestion variations produits avec réordonnancement drag & drop</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Système de promotions avec dates et pourcentages</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Gestion articles blog avec éditeur WYSIWYG</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Gestion galerie et portfolio projets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Interface intuitive et entièrement responsive</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Gestion complète des commandes et clients</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800"
          >
            <h3 className="text-2xl font-bold mb-4">Prêt à lancer votre boutique en ligne ?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Cette solution clés en main est entièrement personnalisable. Changez les couleurs, le contenu,
              ajoutez vos produits et lancez votre e-commerce en quelques jours seulement.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" asChild className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                <Link href="/payment">
                  Découvrir l'offre e-commerce
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" asChild variant="outline">
                <Link href="/#contact">
                  Demander une démo
                </Link>
              </Button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-6 italic">
              💡 Ci-dessous : découvrez en détail chaque fonctionnalité
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Showcase Section */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Texte */}
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Interfaces Personnalisées
              </Badge>

              <h2 className="text-4xl font-bold">
                Dashboard Analytics pour E-commerce
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Transformez vos données en décisions stratégiques avec des interfaces de dashboard modernes et intuitives.
                Créées avec les technologies les plus avancées du marché.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Visualisation de données en temps réel</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Graphiques interactifs (Area, Bar, Line charts) avec Recharts pour suivre vos KPIs essentiels
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Interface responsive et moderne</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Design adaptatif avec sidebar navigation, compatible mobile/tablette/desktop
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Stack technologique premium</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Next.js 15, React 19, TypeScript, Tailwind CSS 4, shadcn/ui - Technologies de pointe
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Personnalisation complète</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Metrics personnalisées, intégration API, exports de données, alertes automatiques
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link href="/dashboard">
                    Voir la démo live
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#contact">
                    Demander un devis
                  </Link>
                </Button>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                  ⚡ Idéal pour e-commerce, SaaS, plateformes de gestion, applications métier
                </p>
              </div>
            </div>

            {/* Image/Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl"></div>
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                    <Link href="/dashboard" className="group w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                          Cliquez pour voir la démo
                        </p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">En temps réel</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 px-6 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Clients de Confiance</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Des entreprises qui me font confiance pour leurs projets digitaux
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <Badge variant="secondary" className="text-emerald-600">
                +50 missions réussies
              </Badge>
              <Badge variant="secondary" className="text-blue-600">
                ⭐⭐⭐⭐⭐ (50 avis)
              </Badge>
            </div>
          </motion.div>

          {/* Infinite scrolling logos */}
          <div className="relative overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950/50 z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950/50 z-10 pointer-events-none"></div>

            {/* Scrolling container */}
            <motion.div
              className="flex space-x-12 items-center"
              animate={motionConfig.shouldReduceMotion ? {} : {
                x: [0, -1000],
              }}
              transition={motionConfig.shouldReduceMotion ? { duration: 0 } : {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              style={{ width: 'fit-content' }}
            >
              {/* First set of logos */}
              {clients.map((client, index) => (
                <motion.div
                  key={`first-${client.name}`}
                  {...motionConfig.fadeIn}
                  whileInView={motionConfig.fadeIn.animate}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-32 h-16 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800">
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={120}
                      height={60}
                      className="max-w-full max-h-full object-contain filter brightness-0 dark:brightness-100"
                      loading="lazy"
                      quality={75}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `<span class="text-sm font-semibold text-slate-600 dark:text-slate-400">${client.name}</span>`
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <motion.div
                  key={`second-${client.name}`}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-32 h-16 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800">
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={120}
                      height={60}
                      className="max-w-full max-h-full object-contain filter brightness-0 dark:brightness-100"
                      loading="lazy"
                      quality={75}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `<span class="text-sm font-semibold text-slate-600 dark:text-slate-400">${client.name}</span>`
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Third set for extra smooth scrolling */}
              {clients.map((client, index) => (
                <motion.div
                  key={`third-${client.name}`}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-32 h-16 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800">
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={120}
                      height={60}
                      className="max-w-full max-h-full object-contain filter brightness-0 dark:brightness-100"
                      loading="lazy"
                      quality={75}
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = `<span class="text-sm font-semibold text-slate-600 dark:text-slate-400">${client.name}</span>`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Rejoignez ces entreprises qui ont choisi l'excellence
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">
                Démarrer votre projet
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Prêt à démarrer votre projet ?</h2>
            <p className="text-xl text-blue-100 mb-8">Discutons de vos besoins et créons quelque chose d'exceptionnel ensemble</p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/devis">
                  Demander un devis gratuit
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
                <Link href="mailto:contact@digitalqt.com">
                  <Mail className="mr-2 w-4 h-4" />
                  Me contacter
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@digitalqt.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  France, disponible à distance
                </p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <Link href="/payment" className="block hover:text-white transition-colors">
                  Développement Web Moderne
                </Link>
                <Link href="/payment" className="block hover:text-white transition-colors">
                  Sites WordPress Expert
                </Link>
                <Link href="/payment" className="block hover:text-white transition-colors">
                  E-commerce & Paiements
                </Link>
                <Link href="/payment" className="block hover:text-white transition-colors">
                  Optimisation & Performance
                </Link>
              </div>
            </div>

            {/* Informations */}
            <div>
              <h3 className="text-white font-semibold mb-4">Informations</h3>
              <div className="space-y-2">
                <Link href="/devis" className="block hover:text-white transition-colors">
                  Demander un devis
                </Link>
                <Link href="/facture" className="block hover:text-white transition-colors">
                  Payer une facture
                </Link>
                <Link href="https://www.malt.fr/profile/stephanedumas" target="_blank" className="block hover:text-white transition-colors">
                  Profil Malt
                </Link>
                <Link href="/mentions-legales" className="block hover:text-white transition-colors">
                  Mentions légales
                </Link>
                <div className="pt-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    ⭐⭐⭐⭐⭐ (50 avis)
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-800 pt-8 text-center">
            <p>&copy; 2025 DigitalQT - Stéphane D. - Développeur Frontend Expert. Tous droits réservés.</p>
            <p className="mt-2 text-sm">
              +10 ans d'expérience • 57 projets réalisés • Spécialiste WordPress & React
            </p>
          </div>
        </div>
      </footer>

      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </div>
    </LazyMotion>
  )
}
