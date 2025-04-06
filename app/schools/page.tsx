import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SchoolsPage() {
  // Mock data for schools
  const schools = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `School ${i + 1}`,
    location: `City ${(i % 5) + 1}`,
    image: `/images/placeholder.webp`,
  }))

  return (
    <div className="container px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-2 text-indigo-900 dark:text-indigo-400">Find Your School</h1>
      <p className="text-lg text-indigo-600/70 dark:text-indigo-300/70 mb-8">
        Browse schools and find all the uniform items you need
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500" />
          <Input placeholder="Search by school name" className="pl-10 border-indigo-100 dark:border-indigo-800 focus-visible:ring-indigo-500" />
        </div>
        <div className="w-full md:w-48">
          <select className="w-full h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Cities</option>
            <option value="1">City 1</option>
            <option value="2">City 2</option>
            <option value="3">City 3</option>
            <option value="4">City 4</option>
            <option value="5">City 5</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools.map((school) => (
          <Link key={school.id} href={`/schools/${school.id}`} className="group">
            <div className="flex flex-col border rounded-xl overflow-hidden transition-all hover:shadow-md bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={school.image || "/placeholder.svg"}
                  alt={school.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{school.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {school.location}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-2">
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
          <Button variant="outline" size="sm" className="h-8 w-8" disabled>
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
            3
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
            4
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
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
        </div>
      </div>
    </div>
  )
}

