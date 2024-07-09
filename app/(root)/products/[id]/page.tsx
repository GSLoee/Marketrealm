import CheckoutButton from '@/components/shared/CheckoutButton';
import { getProductById } from '@/lib/actions/product.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import React from 'react'

const ProductDetails = async ({ params: { id }}: SearchParamProps) => {
  const product = await getProductById(id);

  console.log(product)
  return (
    <>
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
    <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
        <Image 
            src={product.imageURL}
            alt='product image'
            width={1000}
            height={1000}
            className='h-full min-h-[300px] object-cover object-center'
        />
    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className='h2-bold'>{product.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  ${product.price}
                </p>
                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                  {product.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                by{' '}
                <span className="text-primary-500">{product.seller.firstName} {product.seller.lastName}</span>
              </p>
            </div>
            <CheckoutButton product={product} />
            <div className="flex flex-col gap-2">
            <p className="p-bold-20 text-grey-600">Description:</p>
            <p className="p-medium-16 lg:p-regular-18">{product.description}</p>
            </div>
          </div>
    </div>
    </div>
    </section>
</>
  )
}

export default ProductDetails