"use client"

import { useState } from "react"
import Image from "next/image"
import { Home, LogOut, Package, Settings, ShoppingBag } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
import { useUser, SignOutButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileOrders } from "@/components/profile-orders"
import { ProfileSettings } from "@/components/profile-settings"
import { ProfileAddresses } from "@/components/profile-addresses"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { isSignedIn } = useUser()
  
  // Get user data from Convex
  const userData = useQuery(api.users.get)
  // Get user's orders
  const orders = useQuery(api.users.getUserOrders, {})

  // If not signed in, redirect to sign in page
  if (isSignedIn === false) {
    router.push("/sign-in")
    return null
  }

  // Render loading state while data is being fetched
  if (userData === undefined) {
    return (
      <div className="container px-4 py-8">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          <div>
            <div className="flex flex-col items-center text-center mb-6">
              <Skeleton className="h-24 w-24 rounded-full mb-4" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // If user data is null after loading
  if (!userData) {
    return (
      <div className="container px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">User Profile Not Found</h1>
        <p className="mb-4">We couldn't find your user profile. Please try signing in again.</p>
        <Button onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      </div>
    )
  }

  // Format join date
  const joinDate = "Recently joined"; // Replace with a default value or fetch the join date from another source if available.

  // Count recent orders (last 30 days)
  const recentOrders = orders?.filter(order => {
    const orderDate = new Date(order.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return orderDate > thirtyDaysAgo;
  }).length || 0;

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div className="md:border-r pr-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-indigo-100 dark:border-indigo-900">
              <Image 
                src={userData.imageUrl || "/placeholder.svg"}
                alt={userData.name} 
                fill 
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-400">{userData.name}</h2>
            <p className="text-sm text-gray-500">Member since {joinDate}</p>
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
            <SignOutButton>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </SignOutButton>
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
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400">{orders?.length || 0}</h3>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                    <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400">{recentOrders}</h3>
                  <p className="text-sm text-gray-500">Recent Orders</p>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full mb-3">
                    <Home className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400">{userData.address?.length || 0}</h3>
                  <p className="text-sm text-gray-500">Saved Addresses</p>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Recent Orders</h2>
                {!orders || orders.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Button onClick={() => router.push("/products")} variant="outline">
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <h3 className="font-medium text-indigo-900 dark:text-indigo-400">{order._id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-indigo-900 dark:text-indigo-400">₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {orders && orders.length > 0 && (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                      onClick={() => setActiveTab("orders")}
                    >
                      View All Orders
                    </Button>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Account Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-indigo-900 dark:text-indigo-400">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-indigo-900 dark:text-indigo-400">{userData.email}</p>
                  </div>
                  {userData.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-indigo-900 dark:text-indigo-400">{userData.phone}</p>
                    </div>
                  )}
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
          {activeTab === "addresses" && <ProfileAddresses />}
          {activeTab === "settings" && <ProfileSettings />}
        </div>
      </div>
    </div>
  )
}

