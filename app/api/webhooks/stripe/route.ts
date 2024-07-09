import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'


interface ExtendedSession extends stripe.Checkout.Session {
    shipping?: {
      address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
      };
    };
  }
export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const session = event.data.object as ExtendedSession;
    const { id, amount_total, metadata } = session;

    const order = {
      stripeId: id,
      productId: metadata?.productId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
      address: {
        city: session.shipping?.address?.city || '',
        country: session.shipping?.address?.country || '',
        line1: session.shipping?.address?.line1 || '',
        line2: session.shipping?.address?.line2 || '',
        postal_code: session.shipping?.address?.postal_code || ''
      }
    };
    console.log('_______________', order)

    const newOrder = await createOrder(order)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}