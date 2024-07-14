import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const NavItems = () => {
  return (
    <>
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
    </>
  )
}

export default NavItems