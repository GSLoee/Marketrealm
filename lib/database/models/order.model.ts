import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  stripeId: string
  totalAmount: string
  shippingAddress: string
  product: {
    _id: string
    title: string
  }
  buyer: {
    _id: string
    username: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  productTitle: string
  productId: string
  buyer: string
}

const OrderSchema = new Schema({
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Order = models.Order || model('Order', OrderSchema)

export default Order