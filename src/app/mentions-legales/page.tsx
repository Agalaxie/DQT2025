'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building,
  User,
  Globe,
  Shield,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      {/* Page Header */}
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Link>
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mentions Légales
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Informations légales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                Informations légales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-600" />
                    Éditeur du site
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 space-y-1">
                    <p><strong>Nom :</strong> Stéphane D.</p>
                    <p><strong>Statut :</strong> Développeur Frontend Expert</p>
                    <p><strong>Activité :</strong> Développement Web & Solutions IA</p>
                    <p><strong>SIRET :</strong> [À compléter]</p>
                    <p><strong>Code APE :</strong> 6201Z</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-600" />
                    Coordonnées
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Paris, France
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      contact@stephaned.fr
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      +33 6 XX XX XX XX
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-600" />
                  Hébergement
                </h3>
                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                  <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                  <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                  <p><strong>Site :</strong> <a href="https://vercel.com" className="text-blue-600 hover:underline">vercel.com</a></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conditions d'utilisation */}
          <Card>
            <CardHeader>
              <CardTitle>Conditions d'utilisation</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>1. Objet</h3>
              <p>
                Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités
                et conditions d'utilisation du site web de Stéphane D., développeur frontend expert.
              </p>

              <h3>2. Acceptation des conditions</h3>
              <p>
                L'utilisation du site implique l'acceptation pleine et entière des conditions générales
                d'utilisation ci-après décrites. Ces conditions d'utilisation sont susceptibles d'être
                modifiées ou complétées à tout moment.
              </p>

              <h3>3. Services proposés</h3>
              <p>Le site propose les services suivants :</p>
              <ul>
                <li>Présentation des compétences et services de développement web</li>
                <li>Portfolio et exemples de réalisations</li>
                <li>Système de demande de devis en ligne</li>
                <li>Paiement sécurisé via Stripe</li>
              </ul>

              <h3>4. Responsabilité</h3>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement
                remis à jour, mais peut contenir des inexactitudes, des omissions ou des lacunes.
              </p>

              <h3>5. Propriété intellectuelle</h3>
              <p>
                Tous les éléments de ce site (textes, images, graphiques, logo, icônes, sons, logiciels) sont
                la propriété exclusive de Stéphane D., à l'exception des marques, logos ou contenus appartenant
                à d'autres sociétés partenaires ou auteurs.
              </p>

              <h3>6. Protection des données personnelles</h3>
              <p>
                Les données personnelles collectées sont traitées conformément au RGPD. Elles sont nécessaires
                pour le traitement de vos demandes et ne sont pas transmises à des tiers sans votre consentement.
              </p>

              <h3>7. Cookies</h3>
              <p>
                Le site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic.
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
              </p>
            </CardContent>
          </Card>

          {/* Politique de confidentialité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Politique de confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Collecte des données</h3>
              <p>
                Nous collectons les données suivantes lors de l'utilisation de nos services :
              </p>
              <ul>
                <li>Informations de contact (nom, email, téléphone)</li>
                <li>Informations sur votre projet (description, budget)</li>
                <li>Données de paiement (via Stripe, non stockées sur nos serveurs)</li>
                <li>Données de navigation (cookies, adresse IP)</li>
              </ul>

              <h3>Utilisation des données</h3>
              <p>Ces données sont utilisées pour :</p>
              <ul>
                <li>Traiter vos demandes de devis</li>
                <li>Communiquer sur l'avancement de votre projet</li>
                <li>Améliorer nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>

              <h3>Conservation des données</h3>
              <p>
                Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles
                elles ont été collectées, puis supprimées conformément aux obligations légales.
              </p>

              <h3>Vos droits</h3>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul>
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à :
                <a href="mailto:contact@stephaned.fr" className="text-blue-600 hover:underline ml-1">
                  contact@stephaned.fr
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4">Une question juridique ?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                N'hésitez pas à nous contacter pour toute question concernant ces mentions légales.
              </p>
              <Button asChild>
                <Link href="mailto:contact@stephaned.fr">
                  <Mail className="mr-2 w-4 h-4" />
                  Nous contacter
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}