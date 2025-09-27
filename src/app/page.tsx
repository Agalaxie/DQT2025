'use client'

import { useState, useEffect } from 'react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
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
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import PerlinNoiseBackground from '@/components/PerlinNoiseBackground'
import PerlinNoiseTransparent from '@/components/PerlinNoiseTransparent'

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
    icon: Zap,
    title: "Accès Développeur - 1 Journée",
    description: "Accès complet à mes services de développement pendant une journée entière. Idéal pour les projets urgents ou ponctuels.",
    price: "300€/jour",
    featured: true
  },
  {
    icon: Code,
    title: "Développement Web Moderne",
    description: "Applications React, Next.js avec intégration IA et solutions complètes",
    price: "À partir de 2800€"
  },
  {
    icon: Globe,
    title: "Sites WordPress Expert",
    description: "Développement avancé avec plugins personnalisés et optimisation SEO",
    price: "À partir de 1500€"
  },
  {
    icon: Smartphone,
    title: "E-commerce & Paiements",
    description: "Boutiques en ligne performantes avec intégration Stripe et WooCommerce",
    price: "À partir de 3500€"
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen bg-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 smooth-scroll">
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
                <Link href="#services" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
                  Services
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
      <section className="hero-section relative pt-32 pb-20 px-6 overflow-hidden bg-slate-50">
        {/* Perlin Noise Animation Background */}
        <PerlinNoiseTransparent
          className="absolute top-1/3 left-1/4 w-1/2 h-1/2"
          nodeCount={200}
          speed={0.002}
          opacity={0.15}
          colorCycle={true}
        />

        {/* Shader Background Animation */}
        <div className="shader-bg opacity-50">
          <div className="shader-layer"></div>
          <div className="shader-layer"></div>
          <div className="shader-layer"></div>
        </div>

        {/* Background Illustration */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          {/* Animated Gradient Shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/15 dark:from-blue-900/15 dark:to-purple-900/10 rounded-full blur-3xl animate-pulse [animation-duration:8s]"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-slate-100/25 to-blue-100/15 dark:from-slate-800/20 dark:to-blue-800/10 rounded-full blur-3xl animate-pulse [animation-duration:6s] [animation-delay:2s]"></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-100/20 to-slate-100/15 dark:from-purple-900/10 dark:to-slate-800/10 rounded-full blur-3xl animate-pulse [animation-duration:10s] [animation-delay:4s]"></div>

          {/* Floating Geometric Elements */}
          <div className="absolute top-32 right-1/4 opacity-10 dark:opacity-15 animate-[float_12s_ease-in-out_infinite]">
            <div className="w-24 h-24 border border-slate-300 dark:border-slate-600 rounded-lg rotate-12"></div>
          </div>
          <div className="absolute bottom-40 left-20 opacity-8 dark:opacity-12 animate-[float_15s_ease-in-out_infinite_reverse]">
            <div className="w-20 h-20 border border-slate-300 dark:border-slate-600 rotate-45"></div>
          </div>
          <div className="absolute top-1/2 right-32 opacity-6 dark:opacity-10 animate-[float_10s_ease-in-out_infinite]">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-200/30 to-purple-200/20 dark:from-blue-800/20 dark:to-purple-800/15 rounded-full"></div>
          </div>

          {/* Subtle Dot Pattern */}
          <div className="absolute inset-0 opacity-15 dark:opacity-25">
            <div className="absolute top-24 left-32 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:4s]"></div>
            <div className="absolute top-48 right-40 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:3s] [animation-delay:1s]"></div>
            <div className="absolute bottom-32 left-1/2 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:5s] [animation-delay:2s]"></div>
            <div className="absolute top-1/3 left-16 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:6s] [animation-delay:3s]"></div>
            <div className="absolute bottom-48 right-24 w-1 h-1 bg-slate-400 rounded-full animate-pulse [animation-duration:4s] [animation-delay:1.5s]"></div>
          </div>
        </div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-50/80 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 mb-6 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
              <div className="w-3 h-3 availability-dot rounded-full"></div>
              <span className="font-medium text-sm">Disponibilité confirmée</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent">
              Développeur Frontend Expert WordPress & React
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              <strong>Développeur Frontend freelance</strong> spécialisé WordPress, React & Next.js
              <br />
              <span className="text-lg">Création de sites web performants • +10 ans d'expérience • 57 projets • ⭐⭐⭐⭐⭐ (50 avis clients)</span>
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>France</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>280€/jour</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="text-slate-600 dark:text-slate-400">
                8-15 ans d'expérience
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                <Link href="https://www.malt.fr/profile/stephanedumas" target="_blank">
                  🚀 Réserver 300€/jour
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="#services">
                  Voir tous les services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#clients">
                  <Play className="mr-2 w-4 h-4" />
                  Mes clients
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Mes Services</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Solutions complètes et performantes adaptées à vos besoins</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200">{service.price}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/payment">
                        Commander maintenant
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/#contact">
                        Demander un devis
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              style={{ width: 'fit-content' }}
            >
              {/* First set of logos */}
              {clients.map((client, index) => (
                <motion.div
                  key={`first-${client.name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
