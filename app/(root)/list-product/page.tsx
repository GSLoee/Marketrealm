import ProductForm from '@/components/shared/ProductForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const ListProduct = () => {
    const {sessionClaims} = auth()
    
    const userId = sessionClaims?.userId as string

    console.log(userId)
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
            List a Product
        </h3>
    </section>
    <div className='wrapper my-8'>
        <ProductForm userId={userId} type="Create"/>
    </div>
    </>
  )
}

export default ListProduct