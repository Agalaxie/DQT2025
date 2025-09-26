'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Home, Mail, Download } from 'lucide-react'
import Link from 'next/link'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service')

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-20"></div>
          </div>

          <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">
            Paiement Réussi !
          </h1>

          <p className="text-xl text-green-600 dark:text-green-400">
            Merci pour votre confiance
          </p>
        </div>

        {/* Payment Details */}
        <Card className="shadow-xl border-green-200 dark:border-green-800 mb-8">
          <CardHeader className="bg-green-50 dark:bg-green-950/30">
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              Commande Confirmée
            </CardTitle>
            <CardDescription>
              Votre paiement a été traité avec succès
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Service Details */}
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Service commandé :</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {service === 'acces-developpeur-jour' ? 'Accès Développeur - 1 Journée' :
                     service === 'dev-web-moderne' ? 'Développement Web Moderne' :
                     service === 'wordpress-expert' ? 'Sites WordPress Expert' :
                     service === 'ecommerce-paiements' ? 'E-commerce & Paiements' :
                     service === 'optimisation-performance' ? 'Optimisation & Performance' :
                     'Service sélectionné'}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Statut</div>
                  <Badge className="bg-green-600 text-white">Confirmé</Badge>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold">Prochaines étapes :</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Confirmation par email</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Vous recevrez un email de confirmation avec tous les détails dans les prochaines minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Prise de contact</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Je vous contacterai sous 24h pour organiser le travail et définir les priorités.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Livraison</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Livraison selon les délais convenus avec suivi en temps réel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="mailto:contact@digitalqt.com">
                <Mail className="mr-2 w-4 h-4" />
                Me contacter directement
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/">
                <Home className="mr-2 w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 mb-2">
              Besoin d'aide ? Contactez-moi à{' '}
              <Link href="mailto:contact@digitalqt.com" className="text-green-600 hover:underline">
                contact@digitalqt.com
              </Link>
            </p>
            <p className="text-xs text-slate-400">
              Numéro de transaction : #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
