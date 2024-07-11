import { getOrdersByUserA } from '@/lib/actions/order.actions'
import { SearchParamProps } from '@/types'
import React from 'react'

type Order = {
    _id: string;
    orderId: string;
    totalAmount: string;
    productTitle: string;
    productId: string;
    buyerName: string;
    buyerEmail: string;
    buyerAddress: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
  function addComma(number: number): string {
    return number.toLocaleString('en-US');
  }
const UserOrders = async ({ searchParams}: SearchParamProps) => {
    const userId = (searchParams?.userId as string) || ''
    const searchText = (searchParams?.query as string) || ''

    const orders = await getOrdersByUserA({ userId, searchString: searchText})
    const totalRevenue = orders.reduce((sum: number, order: Order) => sum + parseFloat(order.totalAmount), 0);
    console.log('orders{}{}{}{}', totalRevenue)
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Total Revenue: ${addComma(totalRevenue)}</h3>
        </div>
      </section>
         <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Product Title</th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-right">Shipping Address</th>
              <th className="min-w-[50px] py-3 text-right">Price</th>
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
              orders.map((o: any) => (
                <tr
                  key={o.orderId}
                  className="p-regular-14 lg:p-regular-16 border-b"
                  style={{ boxSizing: 'border-box' }}>
                  <td className="min-w-[250px] py-4 text-primary-500">{o._id}</td>
                  <td className="min-w-[200px] flex-1 py-4 pr-4">{o.productTitle}</td>
                  <td className="min-w-[150px] py-4">{o.buyerName} ({o.buyerEmail})</td>
                  <td className="min-w-[100px] py-4 text-right">{o.buyerAddress.line1}, {o.buyerAddress.city}, {o.buyerAddress.postal_code}, {o.buyerAddress.country}</td>
                  <th className="min-w-[50px] py-3 text-right">${addComma(parseFloat(o.totalAmount))}</th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default UserOrders