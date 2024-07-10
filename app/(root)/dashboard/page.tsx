import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getProductsByUser } from '@/lib/actions/product.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import { IOrder } from '@/lib/database/models/order.model'
import { getOrdersByUser } from '@/lib/actions/order.actions'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const orders = await getOrdersByUser({ userId, page: 1})
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const productsPage = Number(searchParams?.productsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage })

  const orderedProducts = orders?.data.map((order: IOrder) => order.product) || [];
  const myProducts = await getProductsByUser({ userId, page: productsPage })
  console.log("------------", myProducts)
  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Your Purchased Products</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#products">
              Explore More Products
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={orderedProducts}
          emptyTitle="No product tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting products to explore!"
          collectionType="My_Products"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Products Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>My Products</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/list-product">
              Add New Product
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={myProducts?.data}
          emptyTitle="No products have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Products_Organized"
          limit={3}
          page={productsPage}
          urlParamName="productsPage"
          totalPages={myProducts?.totalPages}
        />
      </section>
      {/* ORDERSSSSS */}



      {/* <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Your Orders</h3>
        </div>   
      </section>
      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Product Title</th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Shipping Address</th>
              <th className="min-w-[100px] py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b"
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">{row.productTitle}</td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section> */}
    </>
  )
}

export default ProfilePage
