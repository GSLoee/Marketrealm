import Search from '@/components/shared/Search'
import { getOrdersByProduct } from '@/lib/actions/order.actions'
import { SearchParamProps } from '@/types'
import { IOrderItem } from '@/lib/database/models/order.model'
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
const Orders = async ({ searchParams }: SearchParamProps) => {
  const productId = (searchParams?.productId as string) || ''
  const searchText = (searchParams?.query as string) || ''

  const orders = await getOrdersByProduct({ productId, searchString: searchText })
  console.log('orders---->', orders)
  function addComma(number: number): string {
    return number.toLocaleString('en-US');
  }
  const totalRevenue = orders.reduce((sum: number, order: Order) => sum + parseFloat(order.totalAmount), 0);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Orders</h3>
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Total Revenue: ${addComma(totalRevenue)}</h3>
        </div>
      </section>
      <section className="wrapper mt-8">
        {/* <Search placeholder="Search buyer name..." /> */}
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">Order ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Product Title</th>
              <th className="min-w-[150px] py-3 text-left">Buyer</th>
              <th className="min-w-[100px] py-3 text-left">Amount</th>
              <th className="min-w-[100px] py-3 text-right">Shipping Address</th>
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
                      <td className="min-w-[150px] py-4">{row.buyer} ({row.buyerEmail})</td>
                      <td className='min-w-[100px] py-4'>${addComma(parseFloat(row.totalAmount))}</td>
                      <td className='min-w-[100px] py-3 text-right'>{row.address.line1} {row.address.city} {row.address.country} {row.address.postal_code}</td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Orders
