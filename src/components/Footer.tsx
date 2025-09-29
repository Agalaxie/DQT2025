import { Badge } from "@/components/ui/badge"
import { Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
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
                Accès Développeur 300€/jour
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
              <Link href="/conditions-utilisation" className="block hover:text-white transition-colors">
                Conditions d'utilisation
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
  )
}