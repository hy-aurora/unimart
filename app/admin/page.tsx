"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AdminLayout } from "@/components/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Users,
  School,
  ShoppingBag,
  Star,
  TrendingDown,
  TrendingUp,
  GanttChart,
  Percent,
  BadgeCheck,
  Tags,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminDashboardPage() {
  // Use the admin dashboard statistics query
  const stats = useQuery(api.admin.getDashboardStats);
  const removeNotification = useMutation(api.adminNotifications.remove);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await removeNotification({ notificationId: notificationId as Id<"admin_notifications"> });
    } catch (error) {
      console.error("Failed to remove notification:", error);
    }
  };

  // Handle loading state
  const isLoading = stats === undefined;

  return (
    <AdminLayout>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      ) : (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          {/* Main stat cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Package className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Products
                    </p>
                    <h3 className="text-2xl font-bold">{stats.counts.products}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <School className="h-6 w-6 text-indigo-700 dark:text-indigo-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Schools
                    </p>
                    <h3 className="text-2xl font-bold">{stats.counts.schools}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <ShoppingBag className="h-6 w-6 text-green-700 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Orders
                    </p>
                    <h3 className="text-2xl font-bold">{stats.counts.orders}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <Users className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Users
                    </p>
                    <h3 className="text-2xl font-bold">{stats.counts.users}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Revenue & Products */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>
                  Total revenue from all orders: £{stats.revenue.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Revenue", value: stats.revenue }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`£${Number(value).toFixed(2)}`, "Amount"]} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Product Stats */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Product Stats</CardTitle>
                <CardDescription>
                  Overview of product types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                      <Star className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Featured Products
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold">{stats.counts.featuredProducts}</h4>
                        <Badge className="bg-yellow-500">{((stats.counts.featuredProducts / stats.counts.products) * 100).toFixed(0)}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                      <Percent className="h-5 w-5 text-red-700 dark:text-red-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Sale Products
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold">{stats.counts.saleProducts}</h4>
                        <Badge className="bg-red-500">{((stats.counts.saleProducts / stats.counts.products) * 100).toFixed(0)}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                      <Tags className="h-5 w-5 text-green-700 dark:text-green-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        New Products
                      </p>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold">{stats.counts.newProducts}</h4>
                        <Badge className="bg-green-500">{((stats.counts.newProducts / stats.counts.products) * 100).toFixed(0)}%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      View All Products
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders & Low Stock Products */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest orders from customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium">{order._id.slice(-6).toUpperCase()}</TableCell>
                        <TableCell>
                          <Badge className={
                            order.status === "delivered" ? "bg-green-500" :
                            order.status === "shipped" ? "bg-blue-500" :
                            order.status === "paid" ? "bg-indigo-500" :
                            order.status === "pending" ? "bg-yellow-500" :
                            "bg-red-500"
                          }>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>£{order.totalAmount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Low Stock Products */}
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Products</CardTitle>
                <CardDescription>
                  Products that need restocking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.lowStockProducts.slice(0, 5).map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={
                            product.stock === 0 ? "bg-red-500" :
                            product.stock < 3 ? "bg-yellow-500" :
                            "bg-blue-500"
                          }>
                            {product.stock === 0 ? "Out of Stock" :
                             product.stock < 3 ? "Critical" : "Low"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Low Stock Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Admin Notifications</CardTitle>
                <CardDescription>
                  Notifications for recent actions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <>
                  {/* Replace this section with a fallback message or handle notifications differently */}
                  <p className="text-sm text-gray-500">No notifications available.</p>
                  </>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

