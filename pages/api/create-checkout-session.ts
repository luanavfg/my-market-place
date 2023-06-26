import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')('sk_test_51NNE5WFV6CfuIk4YTDt2gxiWIOKFwSLTKfOc0M5jNgNlWph6gPkVn2UrR3pA7cqb1rLqYi5IJnX0rtFCRhxhHlMv00KdLJXZgC')

export default async function handler(
  req: NextApiRequest, res: NextApiResponse
) {
  const lineItems = [];
  const { cart } = JSON.parse(req.body)
  for (const key in cart) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: cart[key].name,
          images: [cart[key].imageUrl],
        },
        unit_amount: cart[key].price * 100
      },
      quantity: cart[key].qty
    })
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [...lineItems],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })

  res.status(200).json({session})
}