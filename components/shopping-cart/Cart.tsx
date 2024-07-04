
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ShoppingCart, ShoppingCartIcon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { formatPrice } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'


const itemCount = 1
const Cart = () => {
  return <Sheet>
        <SheetTrigger className='group -m-2 flex items-center p-2'>
            <ShoppingCart
            aria-hidden='true'
            className='h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-600'/>
            <span className='ml-1 text-sm font-medium text-gray-700 group-hover:text-grap-800'>
                0
            </span>
            </SheetTrigger>
            <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg bg-white'>
                <SheetHeader className='space-y-2.5 pr-6'>
                    <SheetTitle> Cart (0) </SheetTitle>
                </SheetHeader>
                    {itemCount > 0 ? (
                        <>
                            <div className='flex w-full flex-col pr-6'>
                                Cart Items 
                            </div>
                            <div className='space-y-4 pr-6'>
                                <Separator />
                                <div className='space-y-1.5 text-sm'></div>
                                <div className='flex'>
                                    <span className='flex-1'>Shipping</span>
                                    <span>cost</span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>Transaction Fee</span>
                                    <span>{formatPrice(1)}</span>
                                </div>
                                <div className='flex'>
                                    <span className='flex-1'>Total</span>
                                    <span>{formatPrice(1)}</span>
                                </div>
                                <SheetFooter>
                                    <SheetTrigger asChild>
                                        <Link href='/cart' className={buttonVariants({
                                            className: 'w-full'
                                        })}>
                                            Continue to Checkout
                                        </Link>
                                    </SheetTrigger>
                                </SheetFooter>
                            </div>
                        </>
                    ) : (
                        <div className='flex h-full flex-col items-center justify-center space-y-1'>
                            {/* <div 
                            aria-hidden='true'
                            className='relative mb-4 h-60 w-60 text-muted-foreground ml-10'>
                                <Image src='/assets/icons/EmptyCartIcon.png' 
                                alt='Empty shopping cart bag icon' width={150} height={150}/>
                            </div> */}
                            <div className='text-xl font-semibold'>
                                Your cart is empty
                            </div>
                        </div>
                    )}
            </SheetContent>
    </Sheet>
  
}

export default Cart