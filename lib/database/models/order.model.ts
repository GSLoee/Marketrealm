import { Schema, model, models, Document } from 'mongoose'

export interface IOrder extends Document {
  stripeId: string
  totalAmount: string
  product: {
    _id: string
    title: string
  }
  buyer: {
    _id: string
    username: string
  }
  address: {
    city: string
    country: string 
    line1: string
    line2?: string
    postal_code: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  productTitle: string
  productId: string
  buyer: string
  address: {
    city: string
    country: string 
    line1: string
    line2?: string
    postal_code: string
  }
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
  address: {
    city: String,
    country: String,
    line1: String,
    line2: String,
    postal_code: String
  }
})

const Order = models.Order || model('Order', OrderSchema)

export default Order
