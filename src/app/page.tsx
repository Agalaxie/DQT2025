'use client'

import { motion } from 'framer-motion'
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

const skills = [
  "WordPress", "Développement web", "E-commerce", "Elementor", "Intégration web",
  "WooCommerce", "HTML5", "CSS3", "Site wordpress", "Responsive design",
  "JavaScript", "jQuery", "React", "Next.js", "Supabase", "Stripe"
]

const services = [
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
  },
  {
    icon: Zap,
    title: "Optimisation & Performance",
    description: "Web Core Vitals 90+ sur Google PageSpeed Insights",
    price: "À partir de 800€"
  }
]

const experiences = [
  {
    company: "Orange Money",
    role: "Développeur Front-End",
    period: "nov. 2024 - déc. 2024",
    logo: "🟠",
    achievements: [
      "Développement d'un thème personnalisé Orange Money",
      "Implémentation d'un slider interactif avec Slick",
      "Intégration Front-End avancée"
    ],
    tech: ["JavaScript", "jQuery", "WordPress"]
  },
  {
    company: "Apple",
    role: "Responsable d'Analyse et d'Intégration",
    period: "juin 2021 - août 2024",
    logo: "🍎",
    achievements: [
      "Analyse de maquettes et faisabilité technique",
      "Intégration de trackers et analytics",
      "Création de comparateurs pour produits Apple"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Zoom"]
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Stéphane D.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <Link href="#services" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              Services
            </Link>
            <Link href="#experience" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              Expérience
            </Link>
            <Button asChild>
              <Link href="#contact">Contact</Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-200 dark:border-emerald-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Disponibilité confirmée
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white bg-clip-text text-transparent">
              Développeur Frontend Expert
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              WordPress & Applications Web IA | Super Malter
              <br />
              <span className="text-lg">+10 ans d'expérience • 57 projets • ⭐⭐⭐⭐⭐ (50 avis)</span>
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
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
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link href="#services">
                  Voir mes services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#experience">
                  <Play className="mr-2 w-4 h-4" />
                  Mon parcours
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
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href="/devis">
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

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Expériences Récentes</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Missions réalisées avec succès</p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="text-4xl">{exp.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{exp.company}</h3>
                            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{exp.role}</p>
                            <p className="text-slate-500 dark:text-slate-400">{exp.period}</p>
                          </div>
                        </div>

                        <ul className="space-y-2 mb-6">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <Badge key={tech} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="mailto:stephane@example.com">
                  <Mail className="mr-2 w-4 h-4" />
                  Me contacter
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Stéphane D. - Développeur Frontend Expert. Tous droits réservés.</p>
          <div className="mt-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}