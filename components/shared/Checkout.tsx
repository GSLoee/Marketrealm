import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { IProduct } from '@/lib/database/models/product.model'
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const Checkout = ({ product, userId }: { product: IProduct, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);
  const onCheckout = async () => {
    const order = {
      productTitle: product.title,
      productId: product._id,
      price: product.price,
      buyerId: userId
    }
    await checkoutOrder(order);
  }
  
  return (
    <form action={onCheckout} method='post'>
      <Button type='submit' role='link' size='lg' className='button sm:w-fit'>
        Buy Product
      </Button>
    </form>
  )
}

export default Checkout
