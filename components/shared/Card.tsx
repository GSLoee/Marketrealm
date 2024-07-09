import { IProduct } from '@/lib/database/models/product.model'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'


type CardProps ={
    product: IProduct,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = ({product, hasOrderLink, hidePrice}: CardProps) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string
    const isProductCreator = userId === product.seller._id.toString();

    console.log('Product in Card:', product);
  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
        <Link 
            href={`/products/${product._id}`}
            style={{backgroundImage: `url(${product.imageURL})`}}
            className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500'
            />
            {/* Product Creator */}
            {isProductCreator &&(
                <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
                    <Link href={`/products/${product._id}/update`}>
                        <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20}/>
                    </Link>

                    <DeleteConfirmation productId={product._id}/>
                </div>
            )}
            <div
            className='flex min-h-[230px flex-col gap-3 p-5 md:gap-4]'
            >
            <div className='flex gap-2'>
                <span className='p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60'>
                    {`$${product.price}`}
                </span>
                <p className='p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500'>
                    {product.category.name}
                </p>
            </div>
                <Link href={`/products/${product._id}`}>
                <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>
                    {product.title}
                </p>
               </Link>
                <div className='flex-between w-full'>
                    <p className='p-medium-14 md:p-medium-16 text-grey-600'>
                        Seller: {product.seller.firstName} {product.seller.lastName}
                    </p>
                    {hasOrderLink && (
                        <Link href={`/orders?productId=${product._id}`} 
                        className='flex gap-2'>
                            <p className='text-primary-500'>Order Details</p>
                            <Image src="/assets/icon/arrow.svg" alt="search" width={10} height={10} />
                        </Link>
                    )}
                </div>
            </div>
    </div>
  )
}

export default Card