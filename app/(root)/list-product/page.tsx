import ProductForm from '@/components/shared/ProductForm'
import React from 'react'

const ListProduct = () => {
  return (
    <>
    <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
            List a Product
        </h3>
    </section>
    <div>
        <ProductForm />
    </div>
    </>
  )
}

export default ListProduct