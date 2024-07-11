import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getProductsByUser } from '@/lib/actions/product.actions'
// import { getOrdersByUser } from '@/lib/actions/order.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import { IOrder, IOrderItem } from '@/lib/database/models/order.model'
import { getOrdersByUserA, getOrdersByUser, getOrdersByProduct } from '@/lib/actions/order.actions'
import { IProduct } from '@/lib/database/models/product.model'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const orderss = await getOrdersByUser({ userId, page: 1})
  // const orders = await getOrdersByUserA(userId)
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const productsPage = Number(searchParams?.productsPage) || 1;

  // const orders = await getOrdersByUser({ userId, page: ordersPage })

  const orderedProducts = orderss?.data.map((order: IOrder) => order.product) || [];
  const myProducts = await getProductsByUser({ userId, page: productsPage })
  // console.log("==logeds==", orders)
  console.log("---g-g-g-g-", myProducts)
  return (
    <>
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
          totalPages={orderss?.totalPages}
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
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <Link href={`/orders/user?userId=${userId}`}><h3 className='h3-bold text-center sm:text-left'>Your Orders</h3></Link>
          </div>
          </section>
      {/* ORDERSSSSS */}
      {/* <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <Link href={`/orders/user?userId=${userId}`}><h3 className='h3-bold text-center sm:text-left'>Your Orders</h3></Link>
        </div>   
      </section>
      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Product Title</th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-right">Total Amount</th>
              <th className="min-w-[50px] py-3 text-right">Shipping Address</th>
            </tr>
          </thead> */}
          {/* <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((o: any) => (
                <tr
                  key={o.orderId}
                  className="p-regular-14 lg:p-regular-16 border-b"
                  style={{ boxSizing: 'border-box' }}>
                  <td className="min-w-[250px] py-4 text-primary-500">{o._id}</td>
                  <td className="min-w-[200px] flex-1 py-4 pr-4">{o.productTitle}</td>
                  <td className="min-w-[150px] py-4">{o.buyerName}</td>
                  <td className="min-w-[100px] py-4 text-right">{o.productPrice}</td>
                  <th className="min-w-[50px] py-3 text-right">{o.buyerAddress.line1}</th>
                </tr>
              ))
            )}
          </tbody> */}
        {/* </table>
      </section> */}
    </>
  )
}

export default ProfilePage