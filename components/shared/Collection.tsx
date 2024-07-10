import { IProduct } from '@/lib/database/models/product.model'
import React from 'react'
import Card from './Card'

type CollectionProps = {
  data: IProduct[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Products_Organized' | 'My_Products' | 'All_Products'
}

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  console.log('Data Collection---:', data); // Log the data to ensure it's a single array of product objects

  return (
    <>
      {data.length > 0 ? (
        <div className='flex flex-col items-center gap-10'>
          <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {data.map((product) => {
              const hasOrderLink = collectionType === "Products_Organized";
              const hidePrice = collectionType === "My_Products";

              console.log('Product:', product); // Log each product to verify the structure

              return (
                <li className='flex justify-center'>
                  {/* Ensure we pass a single product object */}
                  <Card product={product} hasOrderLink={hasOrderLink} hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
          <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
          <p className='p-regular-14'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default Collection
