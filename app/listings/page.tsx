import Link from "next/link"
import Image from "next/image"
import { Filter, Search, Clock, MapPin, Tag } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

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
    <div className="container py-12 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-400">Browse Listings</h1>
          <p className="text-xl text-indigo-600/70 dark:text-indigo-300/70">
            Find the perfect items from students in your university
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:flex md:w-1/4 lg:w-1/5 flex-col gap-6">
            <div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
              <h3 className="font-medium mb-4 text-indigo-900 dark:text-indigo-400 text-lg">Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox id="all" className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  <label htmlFor="all" className="text-sm font-medium">All Categories</label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="electronics" className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  <label htmlFor="electronics" className="text-sm font-medium">Electronics</label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="textbooks" className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  <label htmlFor="textbooks" className="text-sm font-medium">Textbooks</label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="furniture" className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  <label htmlFor="furniture" className="text-sm font-medium">Furniture</label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="clothing" className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  <label htmlFor="clothing" className="text-sm font-medium">Clothing</label>
                </div>
              </div>
            </div>
            
            <div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
              <h3 className="font-medium mb-4 text-indigo-900 dark:text-indigo-400 text-lg">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
            
            <div className="border rounded-xl p-5 shadow-sm bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
              <h3 className="font-medium mb-4 text-indigo-900 dark:text-indigo-400 text-lg">Location</h3>
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
            
            <Button className="bg-indigo-600 hover:bg-indigo-700">Apply Filters</Button>
          </div>

          <div className="flex-1">
            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500" />
                <Input type="search" placeholder="Search listings..." className="pl-9 border-indigo-100 dark:border-indigo-800 focus-visible:ring-indigo-500" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px] border-indigo-100 dark:border-indigo-800 focus:ring-indigo-500">
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
              <Button variant="outline" className="md:hidden flex items-center gap-2 border-indigo-200">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Listings Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-100 dark:border-gray-800">
                  <div className="aspect-video relative">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-indigo-600">${item.price}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-indigo-900 dark:text-indigo-400">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col text-sm space-y-1.5">
                      <div className="flex items-center text-indigo-600">
                        <Tag className="h-4 w-4 mr-1.5" />
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>{item.created} • {item.seller}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
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
