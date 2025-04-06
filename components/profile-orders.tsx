"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ProfileOrders() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2023-04-23",
      status: "Delivered",
      total: 87.99,
      items: [
        {
          id: 1,
          name: "School Blazer",
          price: 45.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=Blazer",
        },
        {
          id: 2,
          name: "School Tie",
          price: 8.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=Tie",
        },
      ],
    },
    {
      id: "ORD-002",
      date: "2023-04-10",
      status: "Processing",
      total: 124.5,
      items: [
        {
          id: 3,
          name: "White Shirt (Pack of 3)",
          price: 24.99,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80&text=Shirt",
        },
        {
          id: 4,
          name: "Navy Trousers",
          price: 18.99,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80&text=Trousers",
        },
      ],
    },
    {
      id: "ORD-003",
      date: "2023-03-28",
      status: "Shipped",
      total: 56.25,
      items: [
        {
          id: 5,
          name: "PE Kit",
          price: 35.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=PE+Kit",
        },
        {
          id: 6,
          name: "School Socks (Pack of 5)",
          price: 9.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=Socks",
        },
      ],
    },
    {
      id: "ORD-004",
      date: "2023-02-15",
      status: "Delivered",
      total: 78.5,
      items: [
        {
          id: 7,
          name: "School Jumper",
          price: 28.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=Jumper",
        },
        {
          id: 8,
          name: "School Backpack",
          price: 24.99,
          quantity: 1,
          image: "/placeholder.svg?height=80&width=80&text=Backpack",
        },
      ],
    },
  ]

  const filteredOrders = orders.filter((order) => order.id.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">My Orders</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => <OrderItem key={order.id} order={order} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="processing">
          <div className="space-y-4">
            {filteredOrders.filter((order) => order.status === "Processing").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No processing orders found.</p>
              </div>
            ) : (
              filteredOrders
                .filter((order) => order.status === "Processing")
                .map((order) => <OrderItem key={order.id} order={order} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="shipped">
          <div className="space-y-4">
            {filteredOrders.filter((order) => order.status === "Shipped").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No shipped orders found.</p>
              </div>
            ) : (
              filteredOrders
                .filter((order) => order.status === "Shipped")
                .map((order) => <OrderItem key={order.id} order={order} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="space-y-4">
            {filteredOrders.filter((order) => order.status === "Delivered").length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No delivered orders found.</p>
              </div>
            ) : (
              filteredOrders
                .filter((order) => order.status === "Delivered")
                .map((order) => <OrderItem key={order.id} order={order} />)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderItem({ order }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="font-medium text-indigo-900 dark:text-indigo-400">{order.id}</h3>
          <p className="text-sm text-gray-500">Ordered on {order.date}</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full mr-3 ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
          >
            {order.status}
          </span>
          <span className="font-medium text-indigo-900 dark:text-indigo-400">£{order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="relative w-16 h-16 rounded overflow-hidden">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-indigo-900 dark:text-indigo-400">Order {order.id}</DialogTitle>
              <DialogDescription>
                Ordered on {order.date} • Status: {order.status}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-indigo-50 dark:bg-indigo-950 px-4 py-2 font-medium text-indigo-900 dark:text-indigo-300">
                  Order Items
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="relative w-16 h-16 rounded overflow-hidden mr-4">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-indigo-900 dark:text-indigo-400">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-indigo-900 dark:text-indigo-400">£{item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">£{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-indigo-50 dark:bg-indigo-950 px-4 py-2 font-medium text-indigo-900 dark:text-indigo-300">
                    Shipping Address
                  </div>
                  <div className="p-4">
                    <p>John Smith</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>London, EC1A 1BB</p>
                    <p>United Kingdom</p>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-indigo-50 dark:bg-indigo-950 px-4 py-2 font-medium text-indigo-900 dark:text-indigo-300">
                    Order Summary
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-indigo-900 dark:text-indigo-400">£{(order.total - 4.99).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-indigo-900 dark:text-indigo-400">£4.99</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-indigo-900 dark:text-indigo-400">Total</span>
                      <span className="text-indigo-700 dark:text-indigo-400">£{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                >
                  Track Order
                </Button>
                {order.status === "Delivered" && (
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Leave Review</Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
        >
          Track Order
        </Button>

        {order.status === "Delivered" && (
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Buy Again
          </Button>
        )}
      </div>
    </div>
  )
}

