"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Home, LogOut, Package, Settings, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileOrders } from "@/components/profile-orders"
import { ProfileWishlist } from "@/components/profile-wishlist"
import { ProfileSettings } from "@/components/profile-settings"
import { ProfileAddresses } from "@/components/profile-addresses"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=100&width=100&text=JS",
    joinDate: "January 2023",
    orders: {
      total: 12,
      recent: 3,
    },
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div className="md:border-r pr-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-indigo-100 dark:border-indigo-900">
              <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
            </div>
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-400">{user.name}</h2>
            <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
          </div>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "overview" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <Home className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "orders" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "wishlist" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : ""}`}
              onClick={() => setActiveTab("wishlist")}
            >
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "addresses" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : ""}`}
              onClick={() => setActiveTab("addresses")}
            >
              <Home className="mr-2 h-4 w-4" />
              Addresses
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start ${activeTab === "settings" ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>

        <div>
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                    <ShoppingBag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400">{user.orders.total}</h3>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                    <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400">{user.orders.recent}</h3>
                  <p className="text-sm text-gray-500">Recent Orders</p>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                    <Heart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400">5</h3>
                  <p className="text-sm text-gray-500">Wishlist Items</p>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Recent Orders</h2>
                <div className="space-y-4">
                  {[
                    { id: "ORD-001", date: "2023-04-23", status: "Delivered", total: 87.99 },
                    { id: "ORD-002", date: "2023-04-10", status: "Processing", total: 124.5 },
                    { id: "ORD-003", date: "2023-03-28", status: "Shipped", total: 56.25 },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium text-indigo-900 dark:text-indigo-400">{order.id}</h3>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-indigo-900 dark:text-indigo-400">£{order.total.toFixed(2)}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                    onClick={() => setActiveTab("orders")}
                  >
                    View All Orders
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Account Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-indigo-900 dark:text-indigo-400">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-indigo-900 dark:text-indigo-400">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                    onClick={() => setActiveTab("settings")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && <ProfileOrders />}
          {activeTab === "wishlist" && <ProfileWishlist />}
          {activeTab === "addresses" && <ProfileAddresses />}
          {activeTab === "settings" && <ProfileSettings />}
        </div>
      </div>
    </div>
  )
}

