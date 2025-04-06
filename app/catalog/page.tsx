"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CatalogPage() {
  const [sortBy, setSortBy] = useState("popularity")
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Mock categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "shirts", name: "Shirts & Blouses" },
    { id: "trousers", name: "Trousers & Skirts" },
    { id: "blazers", name: "Blazers & Jumpers" },
    { id: "pe", name: "PE Kit" },
    { id: "accessories", name: "Accessories" },
  ]

  // Mock schools
  const schools = [
    { id: 1, name: "School 1" },
    { id: 2, name: "School 2" },
    { id: 3, name: "School 3" },
    { id: 4, name: "School 4" },
    { id: 5, name: "School 5" },
  ]

  // Mock products
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: [
      "White School Shirt",
      "Navy Trousers",
      "Grey Pleated Skirt",
      "School Blazer",
      "V-Neck Jumper",
      "PE T-Shirt",
      "PE Shorts",
      "School Tie",
      "School Cardigan",
      "School Backpack",
      "School Socks (Pack of 5)",
      "School Water Bottle",
    ][i],
    price: Math.floor(Math.random() * 40) + 5,
    image: `/images/placeholder.webp`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].name,
    badge: i % 5 === 0 ? "Sale" : i % 7 === 0 ? "New" : null,
  }))

  return (
    <div className="container px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Product Catalog</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:w-auto flex items-center gap-2 border-indigo-200">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-4 text-indigo-900 dark:text-indigo-400">Filters</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 text-indigo-900 dark:text-indigo-400">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox id={`category-${category.id}`} className="mr-2" />
                        <Label htmlFor={`category-${category.id}`} className="text-sm">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3 text-indigo-900 dark:text-indigo-400">Schools</h3>
                  <div className="space-y-2">
                    {schools.map((school) => (
                      <div key={school.id} className="flex items-center">
                        <Checkbox id={`school-${school.id}`} className="mr-2" />
                        <Label htmlFor={`school-${school.id}`} className="text-sm">
                          {school.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3 text-indigo-900 dark:text-indigo-400">Sizes</h3>
                  <div className="space-y-2">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <div key={size} className="flex items-center">
                        <Checkbox id={`size-${size}`} className="mr-2" />
                        <Label htmlFor={`size-${size}`} className="text-sm">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3 text-indigo-900 dark:text-indigo-400">Price Range</h3>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center">
                      <RadioGroupItem id="price-all" value="all" className="mr-2" />
                      <Label htmlFor="price-all" className="text-sm">
                        All Prices
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem id="price-under-10" value="under-10" className="mr-2" />
                      <Label htmlFor="price-under-10" className="text-sm">
                        Under £10
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem id="price-10-20" value="10-20" className="mr-2" />
                      <Label htmlFor="price-10-20" className="text-sm">
                        £10 - £20
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem id="price-20-30" value="20-30" className="mr-2" />
                      <Label htmlFor="price-20-30" className="text-sm">
                        £20 - £30
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem id="price-over-30" value="over-30" className="mr-2" />
                      <Label htmlFor="price-over-30" className="text-sm">
                        Over £30
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={() => setFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                  <Button variant="outline" className="flex-1 border-indigo-200">
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled className="border-indigo-200">
            <span className="sr-only">Previous page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-indigo-200 bg-indigo-50 text-indigo-700"
            disabled
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-indigo-200">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-indigo-200">
            3
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-indigo-200">
            4
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 border-indigo-200">
            5
          </Button>
          <Button variant="outline" size="icon" className="border-indigo-200">
            <span className="sr-only">Next page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

