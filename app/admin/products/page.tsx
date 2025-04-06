"use client"

import { useState } from "react"
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye
} from "lucide-react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock product data
const productData = [
  {
    id: "PROD-1001",
    name: "School Uniform Shirt",
    category: "Uniform",
    price: 24.99,
    stock: 120,
    status: "In Stock",
  },
  {
    id: "PROD-1002",
    name: "School Blazer",
    category: "Uniform",
    price: 49.99,
    stock: 85,
    status: "In Stock",
  },
  {
    id: "PROD-1003",
    name: "PE Kit Shirt",
    category: "Sports",
    price: 19.99,
    stock: 65,
    status: "In Stock",
  },
  {
    id: "PROD-1004",
    name: "School Pants",
    category: "Uniform",
    price: 29.99,
    stock: 95,
    status: "In Stock",
  },
  {
    id: "PROD-1005",
    name: "School Skirt",
    category: "Uniform",
    price: 27.99,
    stock: 78,
    status: "In Stock",
  },
  {
    id: "PROD-1006",
    name: "School Tie",
    category: "Accessories",
    price: 12.99,
    stock: 150,
    status: "In Stock",
  },
  {
    id: "PROD-1007",
    name: "School Jumper",
    category: "Uniform",
    price: 34.99,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: "PROD-1008",
    name: "PE Kit Shorts",
    category: "Sports",
    price: 17.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PROD-1009",
    name: "School Socks (Pack of 5)",
    category: "Accessories",
    price: 9.99,
    stock: 200,
    status: "In Stock",
  },
  {
    id: "PROD-1010",
    name: "School Backpack",
    category: "Accessories",
    price: 39.99,
    stock: 45,
    status: "In Stock",
  },
]

// Product categories for filtering
const categories = [
  { id: "all", label: "All Categories" },
  { id: "uniform", label: "Uniform" },
  { id: "sports", label: "Sports" },
  { id: "accessories", label: "Accessories" },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  // Filter products based on search query and category
  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || 
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-name" className="sm:text-right">
                    Name
                  </Label>
                  <Input id="product-name" className="col-span-1 sm:col-span-3" placeholder="Product name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-category" className="sm:text-right">
                    Category
                  </Label>
                  <Input id="product-category" className="col-span-1 sm:col-span-3" placeholder="Category" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-price" className="sm:text-right">
                    Price (£)
                  </Label>
                  <Input id="product-price" type="number" className="col-span-1 sm:col-span-3" placeholder="0.00" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-stock" className="sm:text-right">
                    Stock
                  </Label>
                  <Input id="product-stock" type="number" className="col-span-1 sm:col-span-3" placeholder="0" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                  <Label htmlFor="product-description" className="sm:text-right pt-2">
                    Description
                  </Label>
                  <textarea 
                    id="product-description" 
                    className="col-span-1 sm:col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Product description"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <div className="sm:text-right">
                    <Label>Status</Label>
                  </div>
                  <div className="col-span-1 sm:col-span-3 flex items-center space-x-2">
                    <Checkbox id="product-active" defaultChecked />
                    <Label htmlFor="product-active">Active</Label>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="w-full sm:w-auto">Save Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                Manage your product catalog and inventory levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {categories.map((category) => (
                        <DropdownMenuItem 
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={selectedCategory === category.id ? "bg-muted" : ""}
                        >
                          {category.label}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>In Stock</DropdownMenuItem>
                      <DropdownMenuItem>Low Stock</DropdownMenuItem>
                      <DropdownMenuItem>Out of Stock</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Product ID</TableHead>
                      <TableHead className="whitespace-nowrap">Name</TableHead>
                      <TableHead className="whitespace-nowrap">Category</TableHead>
                      <TableHead className="whitespace-nowrap">Price</TableHead>
                      <TableHead className="whitespace-nowrap">Stock</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>£{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            product.status === "In Stock" 
                              ? "bg-green-100 text-green-800" 
                              : product.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>
                            {product.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-end space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 py-4">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
