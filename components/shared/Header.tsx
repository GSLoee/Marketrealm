import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton, 
    SignUpButton
  } from '@clerk/nextjs'
import { Button } from '../ui/button'
import Cart from '../shopping-cart/Cart'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className='wrapper flex items-center justify-between'>
            <Link href='/' className='w-36'>
                <Image src='/assets/logo/marketrealm logo.png' width={200} height={40}
                 alt='marketrealm logo'/>
            </Link>
            <div className='flex w-32 justify-end gap-3'>
            <SignedOut>
                <Button asChild className='rounded-full'>
                    
                <SignInButton />
                </Button>
                <Button asChild className='rounded-full'>
                   
                <SignUpButton />
                </Button>                
            </SignedOut>
            <SignedIn>
            <UserButton />
                <Button className='rounded-full'>
                    <Link href='/'>
                    Home
                    </Link>
                </Button>
                <Button className='rounded-full'>
                    <Link href='/list-product'>
                    Add Product
                    </Link>
                </Button>
                <Button className='rounded-full'>
                    <Link href='/dashboard'>
                    My Dashboard
                    </Link>
                </Button>
                <Cart />                
            </SignedIn>
            </div>
        </div>
    </header>
  )
}

export default Header