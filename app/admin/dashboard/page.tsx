"use client"
import { Calendar, DollarSign, Package, ShoppingBag, Users, ArrowUpRight, ArrowDownRight, MoreHorizontal, RefreshCw, FileText, BarChart2, PieChart, TrendingUp, Download, Bell, Filter, CheckCircle, AlertCircle, Info } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New order received",
      message: "Order #ORD-006 has been placed by Richard Lee",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "system",
      title: "Inventory alert",
      message: "School Blazer (Size M) is running low on stock",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment received",
      message: "Payment of £210.75 received for order #ORD-004",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "system",
      title: "System update",
      message: "The system will undergo maintenance on Friday at 11 PM",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "order",
      title: "Order shipped",
      message: "Order #ORD-003 has been shipped via Royal Mail",
      time: "Yesterday",
      read: true,
    },
  ]

  // Mock data for analytics
  const salesBySchool = [
    { name: "Westfield Academy", value: 34.5 },
    { name: "St. Mary's School", value: 22.7 },
    { name: "Oakwood High", value: 16.8 },
    { name: "Greendale Primary", value: 14.3 },
    { name: "Other Schools", value: 11.7 },
  ]

  const monthlySales = [
    { month: "Jan", value: 12400 },
    { month: "Feb", value: 15600 },
    { month: "Mar", value: 18200 },
    { month: "Apr", value: 21500 },
    { month: "May", value: 24800 },
    { month: "Jun", value: 29300 },
  ]

  // Mock data for reports
  const availableReports = [
    {
      id: "rep-001",
      name: "Monthly Sales Summary",
      description: "Summary of sales broken down by product categories",
      lastGenerated: "2023-04-01",
      format: "PDF",
    },
    {
      id: "rep-002",
      name: "School Performance Report",
      description: "Sales and order metrics by school",
      lastGenerated: "2023-04-10",
      format: "Excel",
    },
    {
      id: "rep-003",
      name: "Inventory Status",
      description: "Current stock levels and reorder recommendations",
      lastGenerated: "2023-04-15",
      format: "PDF",
    },
    {
      id: "rep-004",
      name: "Customer Insights",
      description: "Customer ordering patterns and preferences",
      lastGenerated: "2023-03-28",
      format: "PDF",
    },
  ]

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button className="w-full sm:w-auto">
              <Calendar className="mr-2 h-4 w-4" />
              Download Reports
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="flex w-full md:w-auto h-auto p-1 flex-wrap md:flex-nowrap">
              <TabsTrigger value="overview" className="flex-1 h-10">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1 h-10">Analytics</TabsTrigger>
              <TabsTrigger value="reports" className="flex-1 h-10">Reports</TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1 h-10">Notifications</TabsTrigger>
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
                <Card className="col-span-full lg:col-span-4">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
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

                <Card className="col-span-full lg:col-span-3">
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
                <Card className="col-span-full lg:col-span-4">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>You have {recentOrders.length} orders this month</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View All</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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

                <Card className="col-span-full lg:col-span-3">
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24.8%</div>
                    <div className="flex items-center text-xs text-green-500">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      <span>+2.4% from last month</span>
                    </div>
                    <div className="mt-4 h-[60px] w-full bg-muted/20 rounded-md flex items-end">
                      {[35, 45, 32, 50, 68, 75].map((height, i) => (
                        <div 
                          key={i} 
                          className="h-full flex-1 flex items-end mx-[1px]"
                        >
                          <div 
                            className="bg-primary w-full rounded-sm" 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">£78.92</div>
                    <div className="flex items-center text-xs text-red-500">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      <span>-0.5% from last month</span>
                    </div>
                    <div className="mt-4 h-[60px] w-full bg-muted/20 rounded-md flex items-end">
                      {[65, 70, 75, 72, 68, 69].map((height, i) => (
                        <div 
                          key={i} 
                          className="h-full flex-1 flex items-end mx-[1px]"
                        >
                          <div 
                            className="bg-primary w-full rounded-sm" 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">76.3%</div>
                    <div className="flex items-center text-xs text-green-500">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      <span>+4.6% from last month</span>
                    </div>
                    <div className="mt-4 h-[60px] w-full bg-muted/20 rounded-md flex items-end">
                      {[45, 52, 58, 62, 70, 76].map((height, i) => (
                        <div 
                          key={i} 
                          className="h-full flex-1 flex items-end mx-[1px]"
                        >
                          <div 
                            className="bg-primary w-full rounded-sm" 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Sales by Month</CardTitle>
                    <CardDescription>Monthly revenue trend for 2023</CardDescription>
                  </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <div className="flex h-full flex-col justify-between">
                          <div className="space-y-6">
                            {monthlySales.map((data) => (
                              <div key={data.month} className="flex items-center">
                                <div className="w-12 text-sm text-muted-foreground">{data.month}</div>
                                <div className="flex-1">
                                  <div className="h-2 w-full rounded-full bg-muted">
                                    <div 
                                      className="h-full rounded-full bg-primary" 
                                      style={{ width: `${(data.value / 30000) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="w-20 text-right text-sm font-medium">
                                  £{data.value.toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-6 text-xs text-muted-foreground">
                            <div>Source: Sales Database</div>
                            <div>Updated: Today at 09:45 AM</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                <Card className="col-span-1">
                  <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle>Sales by School</CardTitle>
                    <CardDescription>Distribution across educational institutions</CardDescription>
                  </div>
                  <Select defaultValue="thisMonth">
                    <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="lastQuarter">Last Quarter</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  </CardHeader>
                  <CardContent>
                  <div className="h-[300px] relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                      {salesBySchool.map((school, index) => {
                        // Calculate each slice
                        const startAngle = salesBySchool
                        .slice(0, index)
                        .reduce((sum, s) => sum + s.value, 0) * 3.6; // 3.6 = 360/100
                        const endAngle = startAngle + school.value * 3.6;
                        
                        // Convert angles to radians for calculations
                        const startRad = (startAngle - 90) * Math.PI / 180;
                        const endRad = (endAngle - 90) * Math.PI / 180;
                        
                        // Calculate path coordinates
                        const x1 = 50 + 50 * Math.cos(startRad);
                        const y1 = 50 + 50 * Math.sin(startRad);
                        const x2 = 50 + 50 * Math.cos(endRad);
                        const y2 = 50 + 50 * Math.sin(endRad);
                        
                        // Create path string for the slice
                        const largeArcFlag = school.value > 50 ? 1 : 0;
                        const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                        
                        return (
                        <path
                          key={school.name}
                          d={pathData}
                          fill={`hsl(${index * 60}, 70%, 60%)`}
                          stroke="#fff"
                          strokeWidth="0.5"
                        />
                        );
                      })}
                      <circle cx="50" cy="50" r="25" fill="white" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                      {salesBySchool.reduce((sum, school) => sum + school.value, 0)}%
                      </div>
                    </div>
                    </div>
                    
                    <div className="absolute bottom-0 w-full px-4">
                    <div className="grid grid-cols-2 gap-2">
                      {salesBySchool.map((school, index) => (
                      <div key={school.name} className="flex items-center text-xs">
                        <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ background: `hsl(${index * 60}, 70%, 60%)` }}
                        ></div>
                        <span className="truncate">{school.name}</span>
                        <span className="ml-1 font-medium">{school.value}%</span>
                      </div>
                      ))}
                    </div>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Product Performance Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of product performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <div className="space-y-4 min-w-[700px]">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div className="font-medium">Product</div>
                      <div className="flex space-x-4">
                        <div className="w-[80px] text-center font-medium">Units Sold</div>
                        <div className="w-[80px] text-center font-medium">Revenue</div>
                        <div className="w-[80px] text-center font-medium">Growth</div>
                        <div className="w-[100px] text-center font-medium">Conversion</div>
                      </div>
                    </div>
                    
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="font-medium">{product.name}</div>
                        <div className="flex space-x-4">
                          <div className="w-[80px] text-center">{product.sales}</div>
                          <div className="w-[80px] text-center">£{product.revenue}</div>
                          <div className="w-[80px] text-center text-green-500">+{Math.floor(15 - index * 2)}%</div>
                          <div className="w-[100px] text-center">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div 
                                className="h-full rounded-full bg-primary" 
                                style={{ width: `${85 - index * 7}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between">
                  <Button variant="outline" className="w-full sm:w-auto">Export Data</Button>
                  <Button className="w-full sm:w-auto">View Detailed Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium">Available Reports</h3>
                  <p className="text-sm text-muted-foreground">Generate, download, and schedule reports</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button className="w-full sm:w-auto">
                    <FileText className="mr-2 h-4 w-4" />
                    Create New Report
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {availableReports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle>{report.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Schedule</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <div className="text-muted-foreground">Last Generated:</div>
                        <div>{report.lastGenerated}</div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <div className="text-muted-foreground">Format:</div>
                        <div>{report.format}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between bg-muted/50 border-t px-6 py-3 gap-2">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                      <Button size="sm" className="w-full sm:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Report Settings</CardTitle>
                  <CardDescription>Configure your report preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Default Format</label>
                        <Select defaultValue="pdf">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Schedule Frequency</label>
                        <Select defaultValue="weekly">
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Email Recipients</label>
                      <div className="mt-1 flex rounded-md border px-3 py-2 text-sm">
                        admin@unimart.com, reports@unimart.com
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                  <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                  <Button className="w-full sm:w-auto">Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">System and order notifications</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark All as Read
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 flex items-start hover:bg-muted/50 ${notification.read ? '' : 'bg-muted/20'}`}
                      >
                        <div className="mr-4 mt-0.5">
                          {notification.type === "order" ? (
                            <ShoppingBag className="h-5 w-5 text-blue-500" />
                          ) : notification.type === "system" ? (
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${notification.read ? '' : 'font-semibold'}`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/50 border-t px-6 py-3">
                  <div className="text-sm text-muted-foreground">
                    Showing 5 of 12 notifications
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Order Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive alerts for new orders and status changes
                        </div>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Inventory Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when products are running low
                        </div>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Payment Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Alerts for successful payments and issues
                        </div>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
                        <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">System Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Information about maintenance and new features
                        </div>
                      </div>
                      <div className="h-6 w-11 rounded-full bg-muted relative cursor-pointer">
                        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto w-full sm:w-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}

