import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation des données
    const {
      serviceType,
      complexity,
      timeline,
      company,
      name,
      email,
      phone,
      description,
      budget
    } = body

    if (!serviceType || !complexity || !timeline || !name || !email || !description) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Calcul du prix basé sur les paramètres
    let basePrice = 0

    // Prix de base par type de service
    switch (serviceType) {
      case 'Sites WordPress Expert':
        basePrice = 1500
        break
      case 'Développement Web Moderne':
        basePrice = 2800
        break
      case 'E-commerce & Paiements':
        basePrice = 3500
        break
      case 'Optimisation & Performance':
        basePrice = 800
        break
      default:
        basePrice = 1500
    }

    // Multiplicateur de complexité
    let complexityMultiplier = 1
    switch (complexity) {
      case 'Simple (x1)':
        complexityMultiplier = 1
        break
      case 'Moyen (x1.5)':
        complexityMultiplier = 1.5
        break
      case 'Complexe (x2.5)':
        complexityMultiplier = 2.5
        break
      default:
        complexityMultiplier = 1
    }

    // Multiplicateur de délai (délai court = plus cher)
    let timelineMultiplier = 1
    switch (timeline) {
      case 'Urgent (1-2 semaines)':
        timelineMultiplier = 1.5
        break
      case 'Rapide (2-4 semaines)':
        timelineMultiplier = 1.2
        break
      case 'Standard (1-2 mois)':
        timelineMultiplier = 1
        break
      case 'Flexible (2+ mois)':
        timelineMultiplier = 0.9
        break
      default:
        timelineMultiplier = 1
    }

    const finalPrice = Math.round(basePrice * complexityMultiplier * timelineMultiplier)

    // Ici vous pouvez ajouter l'envoi d'email ou la sauvegarde en base de données
    console.log('Nouveau devis reçu:', {
      serviceType,
      complexity,
      timeline,
      company,
      name,
      email,
      phone,
      description,
      budget,
      calculatedPrice: finalPrice
    })

    // Simuler l'envoi d'email (vous pouvez intégrer un service comme SendGrid, Resend, etc.)
    // await sendEmailNotification({ ...body, calculatedPrice: finalPrice })

    return NextResponse.json({
      success: true,
      message: 'Devis calculé avec succès',
      estimatedPrice: finalPrice,
      details: {
        basePrice,
        complexityMultiplier,
        timelineMultiplier,
        serviceType,
        complexity,
        timeline
      }
    })

  } catch (error) {
    console.error('Erreur lors du calcul du devis:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}