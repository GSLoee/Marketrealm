'use client'
import { IProduct } from '@/lib/database/models/product.model'
import { SignInButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ product }: {product: IProduct}) => {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId as string
    return (
    <div className='flex items-center gap-3'>
        
        <SignedOut>
            <Button asChild className='rounded-full'>                    
                <SignInButton />
            </Button>
        </SignedOut>
        <SignedIn>
            <Checkout product={product} userId={userId}/>
        </SignedIn>
    </div>  
  )
}

export default CheckoutButton