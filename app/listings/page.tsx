import Link from "next/link"
import Image from "next/image"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for listings
const listings = [
  {
    id: "1",
    title: "MacBook Pro 2020",
    description: "Great condition, barely used. Only selling because I got a new one for graduation.",
    price: 899,
    image: "https://via.placeholder.com/300x200?text=MacBook+Pro",
    seller: "Alex J.",
    location: "Engineering Building",
    created: "2 days ago",
    category: "Electronics"
  },
  {
    id: "2",
    title: "Calculus Textbook",
    description: "9th Edition, no highlights or notes. Perfect condition.",
    price: 45,
    image: "https://via.placeholder.com/300x200?text=Calculus+Textbook",
    seller: "Maya R.",
    location: "Math Department",
    created: "3 days ago",
    category: "Textbooks"
  },
  {
    id: "3",
    title: "Dorm Mini Fridge",
    description: "Works perfectly, graduating soon so no longer need it.",
    price: 75,
    image: "https://via.placeholder.com/300x200?text=Mini+Fridge",
    seller: "Carlos M.",
    location: "North Dorms",
    created: "1 week ago",
    category: "Furniture"
  },
  {
    id: "4",
    title: "Physics Textbook Bundle",
    description: "Physics 101 and 102 textbooks. Minor wear but good condition.",
    price: 60,
    image: "https://via.placeholder.com/300x200?text=Physics+Books",
    seller: "Jamie L.",
    location: "Science Building",
    created: "5 days ago",
    category: "Textbooks"
  },
  {
    id: "5",
    title: "Desk Lamp",
    description: "Adjustable LED desk lamp, perfect for studying.",
    price: 25,
    image: "https://via.placeholder.com/300x200?text=Desk+Lamp",
    seller: "Taylor P.",
    location: "West Campus",
    created: "3 days ago",
    category: "Furniture"
  },
  {
    id: "6",
    title: "Wireless Headphones",
    description: "Sony WH-1000XM4, great noise cancellation. Like new condition.",
    price: 180,
    image: "https://via.placeholder.com/300x200?text=Headphones",
    seller: "Jordan K.",
    location: "Computer Science Building",
    created: "1 day ago",
    category: "Electronics"
  },
]

export default function ListingsPage() {
  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Browse Listings</h1>
          <p className="text-muted-foreground">
            Find the perfect items from students in your university
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters - Desktop */}
          <div className="hidden md:flex md:w-1/4 lg:w-1/5 flex-col gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="all" />
                  <label htmlFor="all" className="text-sm">All Categories</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="electronics" />
                  <label htmlFor="electronics" className="text-sm">Electronics</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="textbooks" />
                  <label htmlFor="textbooks" className="text-sm">Textbooks</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="furniture" />
                  <label htmlFor="furniture" className="text-sm">Furniture</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clothing" />
                  <label htmlFor="clothing" className="text-sm">Clothing</label>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">Location</h3>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="dorms">Dormitories</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                  <SelectItem value="student-center">Student Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button>Apply Filters</Button>
          </div>

          <div className="flex-1">
            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search listings..." className="pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Mobile Filters Button */}
              <Button variant="outline" className="md:hidden flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Listings Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <span className="font-bold text-lg">${item.price}</span>
                    </div>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>{item.seller}</span>
                        <span>{item.created}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>{item.location}</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/items/${item.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="icon" disabled>
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
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
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
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
