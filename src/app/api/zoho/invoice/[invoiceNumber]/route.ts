import { NextRequest, NextResponse } from 'next/server'
import { getInvoiceByNumber } from '@/lib/zoho'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ invoiceNumber: string }> }
) {
  try {
    const { invoiceNumber } = await params

    if (!invoiceNumber) {
      return NextResponse.json(
        { error: 'Invoice number is required' },
        { status: 400 }
      )
    }

    // Vérifier que les credentials Zoho sont configurés
    if (
      !process.env.ZOHO_CLIENT_ID ||
      !process.env.ZOHO_CLIENT_SECRET ||
      !process.env.ZOHO_REFRESH_TOKEN ||
      !process.env.ZOHO_ORGANIZATION_ID
    ) {
      console.error('Zoho credentials not configured')
      return NextResponse.json(
        { error: 'Zoho Invoice integration not configured' },
        { status: 500 }
      )
    }

    const invoice = await getInvoiceByNumber(invoiceNumber)

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      invoice,
      success: true,
    })
  } catch (error) {
    console.error('Error fetching invoice:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    )
  }
}
