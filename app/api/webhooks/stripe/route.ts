import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createOrder } from '@/lib/actions/order.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// New route segment configuration
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed.`, err);
      return res.status(400).send(`Webhook signature verification failed.`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { metadata, shipping_details, amount_total, id } = session;
      
      const orderData = {
        stripeId: id,
        productId: metadata?.productId,
        buyerId: metadata?.buyerId,
        totalAmount: amount_total ? (amount_total / 100).toString() : '0',
        address: {
          city: shipping_details?.address?.city || '',
          country: shipping_details?.address?.country || '',
          line1: shipping_details?.address?.line1 || '',
          line2: shipping_details?.address?.line2 || '',
          postal_code: shipping_details?.address?.postal_code || '',
        }
      };

      await createOrder(orderData);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
