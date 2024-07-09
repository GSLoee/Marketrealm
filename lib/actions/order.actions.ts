"use server"
import Stripe from 'stripe'
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByProductParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import Product from '../database/models/product.model';
import { ObjectId } from 'mongodb';
import User from '../database/models/user.model';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: order.productTitle
            }
          },
          quantity: 1
        },
      ],
      shipping_address_collection: {
        allowed_countries: ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 
          'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'GB', 'US', 'CA'] // Add the countries you want to allow
      },
      metadata: {
        productId: order.productId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!)
  } catch (error) {
    throw error;
  }
}
export const createOrder = async (order: CreateOrderParams) => {
    try {
      await connectToDatabase();
  
      const newOrder = await Order.create({
        stripeId: order.stripeId,
        totalAmount: order.totalAmount,
        product: order.productId,
        buyer: order.buyerId,
        address: {
          city: order.address.city,
          country: order.address.country,
          line1: order.address.line1,
          line2: order.address.line2 || '',
          postal_code: order.address.postal_code,
        },
      });
      console.log("New Order created:", newOrder);
  
      return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
      handleError(error);
    }
  };

// GET ORDERS BY PRODUCT
export async function getOrdersByProduct({ searchString, productId }: GetOrdersByProductParams) {
  try {
    await connectToDatabase()

    if (!productId) throw new Error('Product ID is required')
    const productObjectId = new ObjectId(productId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          productTitle: '$product.title',
          productId: '$product._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ productId: productObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('product._id')
      .find(conditions)
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'product',
        model: Product,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('product._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}