"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, Search } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

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
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState("all")
  
  // Fetch orders from Convex
  const orders = useQuery(api.users.getUserOrders, { status });

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  // Filter orders based on search term
  const filteredOrders = orders?.map((order) => ({
    ...order,
    createdAt: new Date(order.createdAt).toISOString(),
    total: order.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    shippingAddress: typeof order.shippingAddress === "string"
      ? JSON.parse(order.shippingAddress)
      : order.shippingAddress,
  })).filter((order) => 
    order._id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order._id?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (orders === undefined) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

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

      <Tabs defaultValue="all" onValueChange={handleStatusChange}>
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
              filteredOrders.map((order) => <OrderItem key={order._id} order={order} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="processing">
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No processing orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => <OrderItem key={order._id} order={order} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="shipped">
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No shipped orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => <OrderItem key={order._id} order={order} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No delivered orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => <OrderItem key={order._id} order={order} />)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Order {
  _id: string;
  createdAt: string;
  status: string;
  total: number;
  items: { image?: string; name: string; quantity: number; price?: number }[];
  shippingAddress?: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  subtotal?: number;
  shippingCost?: number;
}

function OrderItem({ order }: { order: Order }) {
  // Format the date
  const formattedDate = new Date(order.createdAt).toLocaleDateString();
  
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="font-medium text-indigo-900 dark:text-indigo-400">{order._id}</h3>
          <p className="text-sm text-gray-500">Ordered on {formattedDate}</p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center">
          <span
            className={`text-xs px-2 py-1 rounded-full mr-3 ${
              order.status === "delivered"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : order.status === "shipped"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <span className="font-medium text-indigo-900 dark:text-indigo-400">₹{order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="relative w-16 h-16 rounded overflow-hidden">
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
              <DialogTitle className="text-indigo-900 dark:text-indigo-400">Order {order._id}</DialogTitle>
              <DialogDescription>
                Ordered on {formattedDate} • Status: {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-indigo-50 dark:bg-indigo-950 px-4 py-2 font-medium text-indigo-900 dark:text-indigo-300">
                  Order Items
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="relative w-16 h-16 rounded overflow-hidden mr-4">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-indigo-900 dark:text-indigo-400">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-indigo-900 dark:text-indigo-400">₹{item.price?.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">
                            ₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
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
                    {order.shippingAddress ? (
                      <>
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.line1}</p>
                        {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </>
                    ) : (
                      <p className="text-gray-500">No shipping address available</p>
                    )}
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-indigo-50 dark:bg-indigo-950 px-4 py-2 font-medium text-indigo-900 dark:text-indigo-300">
                    Order Summary
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-indigo-900 dark:text-indigo-400">
                        ₹{(order.subtotal || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-indigo-900 dark:text-indigo-400">
                        ₹{(order.shippingCost || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-indigo-900 dark:text-indigo-400">Total</span>
                      <span className="text-indigo-700 dark:text-indigo-400">₹{order.total.toFixed(2)}</span>
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
                {order.status === "delivered" && (
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

        {order.status === "delivered" && (
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            Buy Again
          </Button>
        )}
      </div>
    </div>
  )
}

