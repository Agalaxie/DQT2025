// Zoho Invoice API Helper

interface ZohoTokenResponse {
  access_token: string
  expires_in: number
  api_domain: string
}

interface ZohoInvoice {
  invoice_id: string
  invoice_number: string
  status: string
  total: number
  balance: number
  customer_name: string
  customer_id: string
  email: string
  date: string
  due_date: string
  currency_code: string
  currency_symbol: string
}

// Cache pour le token (éviter de régénérer à chaque requête)
let cachedToken: string | null = null
let tokenExpiry: number = 0

/**
 * Génère un nouveau access token à partir du refresh token
 */
async function getAccessToken(): Promise<string> {
  // Si on a un token en cache et qu'il n'a pas expiré
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken
  }

  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    grant_type: 'refresh_token',
  })

  const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get Zoho access token: ${error}`)
  }

  const data: ZohoTokenResponse = await response.json()

  // Mettre en cache le token (expire dans 1h, on garde 55min pour sécurité)
  cachedToken = data.access_token
  tokenExpiry = Date.now() + (55 * 60 * 1000)

  return data.access_token
}

/**
 * Récupère une facture Zoho par son numéro
 */
export async function getInvoiceByNumber(invoiceNumber: string): Promise<ZohoInvoice | null> {
  try {
    const accessToken = await getAccessToken()
    const orgId = process.env.ZOHO_ORGANIZATION_ID!

    // Rechercher la facture par numéro
    const url = `https://www.zohoapis.com/invoice/v3/invoices?organization_id=${orgId}&invoice_number=${encodeURIComponent(invoiceNumber)}`

    const response = await fetch(url, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Zoho API error:', error)
      return null
    }

    const data = await response.json()

    // Zoho renvoie un tableau d'invoices
    if (data.code === 0 && data.invoices && data.invoices.length > 0) {
      const invoice = data.invoices[0]

      return {
        invoice_id: invoice.invoice_id,
        invoice_number: invoice.invoice_number,
        status: invoice.status,
        total: invoice.total,
        balance: invoice.balance,
        customer_name: invoice.customer_name,
        customer_id: invoice.customer_id,
        email: invoice.email || '',
        date: invoice.date,
        due_date: invoice.due_date,
        currency_code: invoice.currency_code,
        currency_symbol: invoice.currency_symbol,
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching Zoho invoice:', error)
    return null
  }
}

/**
 * Récupère toutes les factures impayées
 */
export async function getUnpaidInvoices(): Promise<ZohoInvoice[]> {
  try {
    const accessToken = await getAccessToken()
    const orgId = process.env.ZOHO_ORGANIZATION_ID!

    const url = `https://www.zohoapis.com/invoice/v3/invoices?organization_id=${orgId}&status=unpaid`

    const response = await fetch(url, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
      },
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()

    if (data.code === 0 && data.invoices) {
      return data.invoices.map((invoice: any) => ({
        invoice_id: invoice.invoice_id,
        invoice_number: invoice.invoice_number,
        status: invoice.status,
        total: invoice.total,
        balance: invoice.balance,
        customer_name: invoice.customer_name,
        customer_id: invoice.customer_id,
        email: invoice.email || '',
        date: invoice.date,
        due_date: invoice.due_date,
        currency_code: invoice.currency_code,
        currency_symbol: invoice.currency_symbol,
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching unpaid invoices:', error)
    return []
  }
}
