'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, Calendar, Home, Download } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const services = {
  'dev-web-moderne': 'Développement Web Moderne',
  'wordpress-expert': 'Sites WordPress Expert',
  'ecommerce-paiements': 'E-commerce & Paiements',
  'optimisation-performance': 'Optimisation & Performance'
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service')
  const serviceName = serviceId ? services[serviceId as keyof typeof services] : 'Service'

  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    // Simulate email confirmation
    const timer = setTimeout(() => {
      setEmailSent(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const nextSteps = [
    {
      icon: Mail,
      title: "Email de confirmation",
      description: "Vous recevrez un email avec les détails de votre commande dans les prochaines minutes",
      status: emailSent ? "completed" : "pending"
    },
    {
      icon: Calendar,
      title: "Prise de contact",
      description: "Je vous contacterai dans les 24h pour planifier notre premier appel",
      status: "pending"
    },
    {
      icon: Download,
      title: "Documents de travail",
      description: "Réception du cahier des charges et planning détaillé du projet",
      status: "pending"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900">
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-emerald-600 mb-4">
              Paiement réussi !
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
              Merci pour votre confiance. Votre projet <strong>{serviceName}</strong> va commencer très bientôt.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                Commande confirmée
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Projet {serviceId?.replace('-', ' ')}
              </Badge>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Résumé de votre commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{serviceName}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Service professionnel de développement
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        Payé
                      </div>
                      <div className="text-sm text-slate-500">via Stripe</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Prochaines étapes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nextSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900"
                    >
                      <div className={`p-2 rounded-lg ${
                        step.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{step.title}</h3>
                          {step.status === 'completed' && (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Une question ?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                N'hésitez pas à me contacter si vous avez des questions ou des précisions sur votre projet.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>stephane@digitalqt.fr</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="outline">
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild>
              <Link href="/#contact" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Me contacter
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}