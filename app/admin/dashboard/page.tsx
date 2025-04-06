"use client"
import { Calendar, DollarSign, Package, ShoppingBag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin-layout"
import { Chart, ChartContainer, ChartTooltip, ChartXAxis, ChartYAxis, ChartBar } from "@/components/ui/chart"

export default function AdminDashboard() {
  // Mock data for charts
  const salesData = [
    { name: "Jan", total: 1500 },
    { name: "Feb", total: 2300 },
    { name: "Mar", total: 1800 },
    { name: "Apr", total: 2400 },
    { name: "May", total: 2800 },
    { name: "Jun", total: 3200 },
    { name: "Jul", total: 2900 },
    { name: "Aug", total: 3500 },
    { name: "Sep", total: 3800 },
    { name: "Oct", total: 4200 },
    { name: "Nov", total: 4800 },
    { name: "Dec", total: 5200 },
  ]

  const categoryData = [
    { name: "Shirts & Blouses", value: 35 },
    { name: "Trousers & Skirts", value: 25 },
    { name: "Blazers & Jumpers", value: 20 },
    { name: "PE Kit", value: 15 },
    { name: "Accessories", value: 5 },
  ]

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

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
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
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+12.4% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2,350</div>
                  <p className="text-xs text-muted-foreground">+18.7% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 new schools this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer height={350}>
                    <Chart data={salesData}>
                      <ChartTooltip />
                      <ChartXAxis dataKey="name" />
                      <ChartYAxis />
                      <ChartBar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </Chart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Distribution of sales across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer height={300}>
                    <Chart data={categoryData}>
                      <ChartTooltip />
                      <ChartXAxis dataKey="name" />
                      <ChartYAxis />
                      <ChartBar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </Chart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>You have {recentOrders.length} orders this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.id} • {order.date}
                          </p>
                        </div>
                        <div className="ml-auto font-medium">£{order.total.toFixed(2)}</div>
                        <div
                          className={`ml-4 rounded-full px-2 py-1 text-xs ${
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
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="task-1" className="mr-2" />
                        <label htmlFor="task-1" className="text-sm font-medium">
                          Update inventory for School 3
                        </label>
                        <span className="ml-auto text-xs text-muted-foreground">Today</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="task-2" className="mr-2" />
                        <label htmlFor="task-2" className="text-sm font-medium">
                          Process pending orders (5)
                        </label>
                        <span className="ml-auto text-xs text-muted-foreground">Today</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="task-3" className="mr-2" />
                        <label htmlFor="task-3" className="text-sm font-medium">
                          Review new school application
                        </label>
                        <span className="ml-auto text-xs text-muted-foreground">Tomorrow</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="task-4" className="mr-2" />
                        <label htmlFor="task-4" className="text-sm font-medium">
                          Prepare monthly sales report
                        </label>
                        <span className="ml-auto text-xs text-muted-foreground">Apr 30</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="task-5" className="mr-2" />
                        <label htmlFor="task-5" className="text-sm font-medium">
                          Update product pricing
                        </label>
                        <span className="ml-auto text-xs text-muted-foreground">May 1</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

