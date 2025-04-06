"use client"
import { Calendar, DollarSign, Package, ShoppingBag, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin-layout"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      status: "Delivered",
      date: "2023-04-23",
      total: 87.99,
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      status: "Processing",
      date: "2023-04-22",
      total: 124.5,
    },
    {
      id: "ORD-003",
      customer: "Michael Brown",
      status: "Shipped",
      date: "2023-04-21",
      total: 56.25,
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      status: "Processing",
      date: "2023-04-20",
      total: 210.75,
    },
    {
      id: "ORD-005",
      customer: "David Wilson",
      status: "Delivered",
      date: "2023-04-19",
      total: 45.99,
    },
  ]

  // Mock data for top selling products
  const topProducts = [
    { name: "School Uniform Shirt", sales: 345, revenue: 8625 },
    { name: "School Blazer", sales: 243, revenue: 12150 },
    { name: "PE Kit", sales: 187, revenue: 5610 },
    { name: "School Pants", sales: 156, revenue: 3900 },
    { name: "School Tie", sales: 132, revenue: 1320 },
  ]

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Download Reports
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£45,231.89</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+20.1% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+12.4% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+18.7% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center text-xs text-green-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>+2 new schools this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Monthly sales performance</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download Data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex flex-col justify-between">
                    <div className="space-y-6">
                      {/* Simple monthly data display instead of chart */}
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
                        <div key={month} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-12 text-sm text-muted-foreground">{month}</div>
                            <div className="h-2 bg-primary" style={{ 
                              width: `${(index + 1) * 10}%`
                            }}></div>
                          </div>
                          <div className="text-sm font-medium">
                            £{(index + 1) * 1500}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-6 text-sm text-muted-foreground">
                      * Sales data is showing an upward trend compared to previous quarters.
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                  <CardDescription>Products with highest sales volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{product.name}</span>
                          <span className="text-xs text-muted-foreground">{product.sales} units</span>
                        </div>
                        <span className="font-medium">£{product.revenue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Products</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>You have {recentOrders.length} orders this month</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.id} • {order.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">£{order.total.toFixed(2)}</div>
                          <div
                            className={`rounded-full px-2 py-1 text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>Tasks that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 rounded border border-gray-300 flex items-center justify-center">
                          <input type="checkbox" id="task-1" className="sr-only peer" />
                          <svg
                            className="h-3 w-3 text-primary opacity-0 peer-checked:opacity-100"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 6L4.5 8.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="task-1" className="text-sm font-medium cursor-pointer">
                            Update inventory for School 3
                          </label>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 rounded border border-gray-300 flex items-center justify-center">
                          <input type="checkbox" id="task-2" className="sr-only peer" />
                          <svg
                            className="h-3 w-3 text-primary opacity-0 peer-checked:opacity-100"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 6L4.5 8.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="task-2" className="text-sm font-medium cursor-pointer">
                            Process pending orders (5)
                          </label>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-2 mt-0.5 h-5 w-5 rounded border border-gray-300 flex items-center justify-center">
                          <input type="checkbox" id="task-3" className="sr-only peer" />
                          <svg
                            className="h-3 w-3 text-primary opacity-0 peer-checked:opacity-100"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 6L4.5 8.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="task-3" className="text-sm font-medium cursor-pointer">
                            Review new school application
                          </label>
                          <p className="text-xs text-muted-foreground">Tomorrow</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Add New Task</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics View</CardTitle>
                <CardDescription>Detailed analytics will be shown here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Analytics content will be available in future updates
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Reports module will be available in future updates
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>System and order notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  Notifications will be shown here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

