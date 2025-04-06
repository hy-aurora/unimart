import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/product-card"

export default function SchoolPage({ params }: { params: { id: string } }) {
  const schoolId = params.id

  // Mock data for school
  const school = {
    id: schoolId,
    name: `School ${schoolId}`,
    logo: `/placeholder.svg?height=100&width=100&text=School+${schoolId}`,
    banner: `/placeholder.svg?height=300&width=1200&text=School+${schoolId}+Banner`,
    description:
      "This is a description of the school and its uniform requirements. The school has specific guidelines for uniforms that all students must follow.",
  }

  // Mock data for categories
  const categories = [
    { id: 1, name: "Shirts & Blouses" },
    { id: 2, name: "Trousers & Skirts" },
    { id: 3, name: "Blazers & Jumpers" },
    { id: 4, name: "PE Kit" },
    { id: 5, name: "Accessories" },
  ]

  // Mock data for products
  const products = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: [
      "White Shirt",
      "Navy Trousers",
      "School Blazer",
      "PE T-Shirt",
      "School Tie",
      "Grey Skirt",
      "School Jumper",
      "School Bag",
    ][i],
    price: Math.floor(Math.random() * 30) + 10,
    image: `/placeholder.svg?height=300&width=300&text=Product+${i + 1}`,
    category: categories[i % categories.length].name,
  }))

  return (
    <div className="container px-4 py-8">
      <div className="mb-6">
        <Link href="/schools" className="flex items-center text-sm text-gray-500 hover:text-primary">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Schools
        </Link>
      </div>

      <div className="relative w-full h-[200px] md:h-[300px] rounded-lg overflow-hidden mb-8">
        <Image src={school.banner || "/placeholder.svg"} alt={school.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center">
                <Image
                  src={school.logo || "/placeholder.svg"}
                  alt={school.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold">{school.name}</h1>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About the School Uniform</h2>
        <p className="text-muted-foreground">{school.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Categories</h3>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start font-normal">
                All Items
              </Button>
              {categories.map((category) => (
                <Button key={category.id} variant="ghost" className="w-full justify-start font-normal">
                  {category.name}
                </Button>
              ))}
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="font-bold mb-4">Sizes</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="size-xs" className="mr-2" />
                  <label htmlFor="size-xs" className="text-sm">
                    XS
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="size-s" className="mr-2" />
                  <label htmlFor="size-s" className="text-sm">
                    S
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="size-m" className="mr-2" />
                  <label htmlFor="size-m" className="text-sm">
                    M
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="size-l" className="mr-2" />
                  <label htmlFor="size-l" className="text-sm">
                    L
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="size-xl" className="mr-2" />
                  <label htmlFor="size-xl" className="text-sm">
                    XL
                  </label>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="font-bold mb-4">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="radio" id="price-all" name="price" className="mr-2" checked />
                  <label htmlFor="price-all" className="text-sm">
                    All Prices
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-under-10" name="price" className="mr-2" />
                  <label htmlFor="price-under-10" className="text-sm">
                    Under £10
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-10-20" name="price" className="mr-2" />
                  <label htmlFor="price-10-20" className="text-sm">
                    £10 - £20
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-20-30" name="price" className="mr-2" />
                  <label htmlFor="price-20-30" className="text-sm">
                    £20 - £30
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="price-over-30" name="price" className="mr-2" />
                  <label htmlFor="price-over-30" className="text-sm">
                    Over £30
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="text-sm border rounded p-1">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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
      </div>
    </div>
  )
}

