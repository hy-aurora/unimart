"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "School Blazer",
      price: 45.99,
      quantity: 1,
      size: "M",
      color: "Navy",
      class: "Year 7",
      image: "/placeholder.svg?height=200&width=200&text=Blazer",
    },
    {
      id: 2,
      name: "White Shirt",
      price: 15.99,
      quantity: 2,
      size: "L",
      color: "White",
      class: "Year 7",
      image: "/placeholder.svg?height=200&width=200&text=Shirt",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (
    <div className="container px-4 py-8">
      <div className="mb-6">
        <Link
          href="/cart"
          className="flex items-center text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-indigo-900 dark:text-indigo-400">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-indigo-900 dark:text-indigo-300">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-indigo-900 dark:text-indigo-300">
                    Phone
                  </Label>
                  <Input id="phone" type="tel" placeholder="Your phone number" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-indigo-900 dark:text-indigo-300">
                    First Name
                  </Label>
                  <Input id="firstName" placeholder="First name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-indigo-900 dark:text-indigo-300">
                    Last Name
                  </Label>
                  <Input id="lastName" placeholder="Last name" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-indigo-900 dark:text-indigo-300">
                    Address
                  </Label>
                  <Input id="address" placeholder="Street address" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="addressLine2" className="text-indigo-900 dark:text-indigo-300">
                    Address Line 2 (Optional)
                  </Label>
                  <Input id="addressLine2" placeholder="Apartment, suite, etc." className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city" className="text-indigo-900 dark:text-indigo-300">
                    City
                  </Label>
                  <Input id="city" placeholder="City" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-indigo-900 dark:text-indigo-300">
                    Postal Code
                  </Label>
                  <Input id="postalCode" placeholder="Postal code" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="country" className="text-indigo-900 dark:text-indigo-300">
                    Country
                  </Label>
                  <Select defaultValue="uk">
                    <SelectTrigger id="country" className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Shipping Method</h2>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center justify-between border p-4 rounded-md mb-2">
                  <div className="flex items-center">
                    <RadioGroupItem id="standard" value="standard" className="mr-2" />
                    <Label htmlFor="standard" className="text-indigo-900 dark:text-indigo-300">
                      Standard Delivery (3-5 business days)
                    </Label>
                  </div>
                  <span className="font-medium text-indigo-900 dark:text-indigo-300">₹4.99</span>
                </div>
                <div className="flex items-center justify-between border p-4 rounded-md mb-2">
                  <div className="flex items-center">
                    <RadioGroupItem id="express" value="express" className="mr-2" />
                    <Label htmlFor="express" className="text-indigo-900 dark:text-indigo-300">
                      Express Delivery (1-2 business days)
                    </Label>
                  </div>
                  <span className="font-medium text-indigo-900 dark:text-indigo-300">₹9.99</span>
                </div>
                <div className="flex items-center justify-between border p-4 rounded-md">
                  <div className="flex items-center">
                    <RadioGroupItem id="school" value="school" className="mr-2" />
                    <Label htmlFor="school" className="text-indigo-900 dark:text-indigo-300">
                      School Delivery (Free)
                    </Label>
                  </div>
                  <span className="font-medium text-indigo-900 dark:text-indigo-300">₹0.00</span>
                </div>
              </RadioGroup>
            </div>

            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Payment Method</h2>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
                </TabsList>
                <TabsContent value="card">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName" className="text-indigo-900 dark:text-indigo-300">
                        Name on Card
                      </Label>
                      <Input id="cardName" placeholder="Name on card" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber" className="text-indigo-900 dark:text-indigo-300">
                        Card Number
                      </Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-indigo-900 dark:text-indigo-300">
                          Expiry Date
                        </Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc" className="text-indigo-900 dark:text-indigo-300">
                          CVC
                        </Label>
                        <Input id="cvc" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal">
                  <div className="text-center py-8">
                    <Image
                      src="/placeholder.svg?height=60&width=200&text=PayPal"
                      alt="PayPal"
                      width={200}
                      height={60}
                      className="mx-auto mb-4"
                    />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <Button className="bg-[#0070ba] hover:bg-[#005ea6]">Continue with PayPal</Button>
                  </div>
                </TabsContent>
                <TabsContent value="razorpay">
                  <div className="text-center py-8">
                    <Image
                      src="/placeholder.svg?height=60&width=200&text=Razorpay"
                      alt="Razorpay"
                      width={200}
                      height={60}
                      className="mx-auto mb-4"
                    />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      You will be redirected to Razorpay to complete your payment.
                    </p>
                    <Button className="bg-[#0066ff] hover:bg-[#0052cc]">Pay with Razorpay</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Additional Information</h2>
              <div>
                <Label htmlFor="notes" className="text-indigo-900 dark:text-indigo-300">
                  Order Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Notes about your order, e.g. special delivery instructions"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 shadow-sm sticky top-20">
            <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-indigo-900 dark:text-indigo-300">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.size} / {item.color} / {item.class}
                    </p>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="font-medium text-indigo-900 dark:text-indigo-300">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-indigo-900 dark:text-indigo-300">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-indigo-900 dark:text-indigo-300">₹{shipping.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold mb-6">
              <span className="text-indigo-900 dark:text-indigo-300">Total</span>
              <span className="text-indigo-700 dark:text-indigo-400">₹{total.toFixed(2)}</span>
            </div>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
              Place Order
            </Button>

            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>Secure checkout</span>
            </div>

            <div className="mt-4 flex justify-center">
              <Image
                src="/placeholder.svg?height=30&width=200&text=Payment+Methods"
                alt="Payment Methods"
                width={200}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

