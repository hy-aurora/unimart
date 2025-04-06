"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CartItemDetails } from "@/components/cart-item-details"

export default function CartPage() {
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "School Blazer",
      price: 45.99,
      quantity: 1,
      size: "M",
      color: "Navy",
      class: "Year 7",
      image: "/images/placeholder.webp",
      customMeasurements: null,
    },
    {
      id: 2,
      name: "White Shirt",
      price: 15.99,
      quantity: 2,
      size: "L",
      color: "White",
      class: "Year 7",
      image: "/images/placeholder.webp",
      customMeasurements: null,
    },
    {
      id: 3,
      name: "School Tie",
      price: 8.99,
      quantity: 1,
      size: "One Size",
      color: "Striped",
      class: "Year 7",
      image: "/images/placeholder.webp",
      customMeasurements: null,
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-indigo-900 dark:text-indigo-400">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/schools">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-indigo-50 dark:bg-indigo-950 px-4 py-3 font-medium text-indigo-900 dark:text-indigo-300">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="px-4 py-4 border-t">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="relative w-16 h-16 rounded overflow-hidden mr-4">
                          <Image src={item.image || "/images/placeholder.webp"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h3 className="font-medium text-indigo-900 dark:text-indigo-300">{item.name}</h3>
                          <CartItemDetails item={item} />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 flex items-center mt-1"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">£{item.price.toFixed(2)}</div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-indigo-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <div className="w-10 h-8 flex items-center justify-center border-y border-indigo-200">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-indigo-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2 text-center font-medium text-indigo-900 dark:text-indigo-300">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Link
                href="/schools"
                className="flex items-center text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Continue Shopping
              </Link>
              <Button
                variant="outline"
                onClick={() => setCartItems([])}
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-indigo-900 dark:text-indigo-300">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-indigo-900 dark:text-indigo-300">£{shipping.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold mb-6">
                <span className="text-indigo-900 dark:text-indigo-300">Total</span>
                <span className="text-indigo-700 dark:text-indigo-400">£{total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="coupon"
                    className="text-sm font-medium mb-1 block text-indigo-900 dark:text-indigo-300"
                  >
                    Coupon Code
                  </label>
                  <div className="flex">
                    <Input id="coupon" placeholder="Enter coupon" className="rounded-r-none" />
                    <Button
                      variant="outline"
                      className="rounded-l-none border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

