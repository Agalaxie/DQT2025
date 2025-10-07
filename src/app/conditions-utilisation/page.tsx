import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions d\'utilisation - DigitalQT',
  description: 'Conditions générales d\'utilisation et modalités de paiement pour les prestations DigitalQT',
  alternates: {
    canonical: 'https://www.digitalqt.com/conditions-utilisation',
  },
  openGraph: {
    title: 'Conditions d\'utilisation - DigitalQT',
    description: 'Conditions générales d\'utilisation et modalités de paiement pour les prestations DigitalQT',
    url: 'https://www.digitalqt.com/conditions-utilisation',
    siteName: 'Stéphane D. - Développeur Frontend',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ConditionsUtilisation() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Conditions d&apos;utilisation
        </h1>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Les présentes conditions générales s&apos;appliquent à toutes les prestations de développement web et de services numériques fournies par DigitalQT.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 1 — Modalités de paiement
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le Client s&apos;engage à verser un acompte de <strong>30%</strong> à la signature du devis/contrat avant le démarrage des prestations.
                  Le solde est dû à la livraison et validation des livrables, sous <strong>30 jours</strong>.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  En l&apos;absence de paiement aux échéances, le Prestataire pourra suspendre immédiatement l&apos;accès aux livrables et/ou aux services hébergés jusqu&apos;au paiement complet.
                  Des pénalités de retard seront appliquées automatiquement : intérêt égal à <strong>1,5% par mois de retard</strong> et indemnité forfaitaire de <strong>40 €</strong> pour frais de recouvrement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 2 — Propriété intellectuelle & transfert des droits
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le Prestataire conserve l&apos;intégralité des droits d&apos;auteur et droits voisins portant sur les développements, codes sources, composants techniques et assets créés dans le cadre de la mission (les « Créations »).
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Le Prestataire concède au Client une licence d&apos;utilisation <strong>exclusive</strong> pour les Créations dès paiement intégral de la facture finale et sous réserve du respect des modalités contractuelles.
                  Avant paiement intégral, le Client bénéficie uniquement d&apos;un droit d&apos;usage provisoire, non transférable et révocable.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Le transfert définitif des droits d&apos;exploitation fera l&apos;objet d&apos;un avenant et d&apos;une facture libératoire.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 3 — Suspension, accès et sécurité
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  En cas de non-paiement persistant malgré mises en demeure, le Prestataire pourra suspendre l&apos;accès administratif aux services, bloquer la diffusion d&apos;évolutions, et/ou retirer les sources sur les environnements fournis par le Prestataire.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Le Prestataire s&apos;engage à ne pas supprimer définitivement les données du Client avant la résolution du litige et à maintenir une copie de sauvegarde pendant <strong>60 jours</strong>.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Le Prestataire ne pourra être tenu responsable des dommages indirects subis par le Client liés à cette suspension si le Client est en défaut de paiement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 4 — Clause pénale / résolution
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  À défaut de paiement complet sous <strong>15 jours</strong> suivant la mise en demeure restée infructueuse, le présent contrat pourra être résilié de plein droit.
                  Le Client restera redevable des sommes dues et d&apos;une indemnité de résiliation équivalente à <strong>20%</strong> du montant restant dû.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 5 — Modalités techniques
              </h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Le Prestataire conserve la maîtrise du dépôt principal (hébergement / dépôt git privé) tant que la facture finale n&apos;est pas soldée.
                  À la demande du Client et sous réserve de paiement, le Prestataire remettra le code source, la documentation et les accès nécessaires.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Une assistance peut être mise en place moyennant facturation complémentaire.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 6 — Méthodes de paiement
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">
                  Paiements acceptés :
                </h3>
                <ul className="list-disc list-inside text-blue-800 dark:text-blue-200 space-y-2">
                  <li>Virement SEPA instant</li>
                  <li>Paiement par carte bancaire (Stripe)</li>
                  <li>PayPal Business</li>
                  <li>Chèque (délai de traitement plus long)</li>
                </ul>
                <p className="text-blue-700 dark:text-blue-300 mt-4 font-medium">
                  <strong>Acompte exigé :</strong> 30% à la signature — démarrage à réception du paiement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Article 7 — Clause de sauvegarde
              </h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Résumé pour devis :</strong> Prestations démarrent à réception de l&apos;acompte.
                  Le transfert définitif des droits d&apos;exploitation est conditionné au paiement intégral.
                  En cas de retard de paiement, l&apos;accès aux services/développements sera suspendu après mise en demeure ;
                  des pénalités et indemnité forfaitaire légale seront appliquées.
                </p>
              </div>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
                </p>
                <p className="mt-2">
                  Ces conditions générales d&apos;utilisation sont soumises au droit français.
                  Tout litige relève de la compétence des tribunaux de Paris.
                </p>
                <p className="mt-4">
                  <strong>Contact :</strong> Pour toute question relative à ces conditions,
                  contactez-nous via notre page de contact.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}