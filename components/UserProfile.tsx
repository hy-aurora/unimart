"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Package, ShoppingBag, UserIcon } from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const user = useQuery(api.users.get);
  const userOrders = useQuery(api.users.getUserOrders, { status: "all" });

  if (user === undefined || userOrders === undefined) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-md p-6">
        <UserIcon className="h-10 w-10 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium">Please sign in to view your profile</h3>
        <p className="text-sm text-gray-500 mb-4">Create an account or sign in to access your profile and orders</p>
        <Button asChild>
          <Link href="/auth">Sign In / Register</Link>
        </Button>
      </div>
    );
  }

  // Count orders by status
  const orderCounts = {
    total: userOrders?.length || 0,
    pending: userOrders?.filter(order => order.status === "pending").length || 0,
    shipped: userOrders?.filter(order => order.status === "shipped").length || 0,
    delivered: userOrders?.filter(order => order.status === "delivered").length || 0,
  };

  // Get recent orders (last 3)
  const recentOrders = userOrders?.slice(0, 3) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative">
          <img 
            src={user.imageUrl} 
            alt="Profile" 
            className="rounded-full h-32 w-32 object-cover border-4 border-primary-100"
          />
          <div className="absolute -bottom-2 -right-2">
            {user.role === "admin" && (
              <Badge className="bg-indigo-500">Admin</Badge>
            )}
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          {user.phone && (
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          )}
          {user.address && (
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> {user.address}
            </p>
          )}
          <div className="mt-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/profile/settings">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400">Total Orders</p>
            <p className="text-2xl font-bold">{orderCounts.total}</p>
          </div>
          <ShoppingBag className="h-8 w-8 text-blue-500" />
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-600 dark:text-amber-400">Pending/Shipped</p>
            <p className="text-2xl font-bold">{orderCounts.pending + orderCounts.shipped}</p>
          </div>
          <Package className="h-8 w-8 text-amber-500" />
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 dark:text-green-400">Delivered</p>
            <p className="text-2xl font-bold">{orderCounts.delivered}</p>
          </div>
          <CalendarIcon className="h-8 w-8 text-green-500" />
        </div>
      </div>

      {recentOrders.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 hover:border-primary-200 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()} • 
                      {order.items.length} item(s) • ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <Badge className={
                    order.status === "delivered" ? "bg-green-500" :
                    order.status === "shipped" ? "bg-blue-500" :
                    order.status === "paid" ? "bg-amber-500" :
                    order.status === "cancelled" ? "bg-red-500" :
                    "bg-gray-500"
                  }>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/orders/${order._id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {orderCounts.total > 3 && (
            <div className="mt-4 text-center">
              <Button asChild variant="ghost">
                <Link href="/orders">View All Orders</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
