"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const [scrollPosition, setScrollPosition] = useState(0)

  // Mock featured products
  const products = [
    {
      id: 1,
      name: "Premium School Blazer",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300&text=Blazer",
      category: "Blazers & Jumpers",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "White School Shirt (Pack of 2)",
      price: 18.99,
      image: "/placeholder.svg?height=300&width=300&text=Shirt",
      category: "Shirts & Blouses",
      badge: "Popular",
    },
    {
      id: 3,
      name: "Navy School Trousers",
      price: 22.5,
      image: "/placeholder.svg?height=300&width=300&text=Trousers",
      category: "Trousers & Skirts",
    },
    {
      id: 4,
      name: "School Tie",
      price: 9.99,
      image: "/placeholder.svg?height=300&width=300&text=Tie",
      category: "Accessories",
      badge: "New",
    },
    {
      id: 5,
      name: "PE T-Shirt",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300&text=PE+Shirt",
      category: "PE Kit",
    },
    {
      id: 6,
      name: "School Cardigan",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300&text=Cardigan",
      category: "Blazers & Jumpers",
    },
    {
      id: 7,
      name: "School Backpack",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300&text=Backpack",
      category: "Accessories",
      badge: "Sale",
    },
    {
      id: 8,
      name: "Grey Pleated Skirt",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300&text=Skirt",
      category: "Trousers & Skirts",
    },
  ]

  const scrollContainer = (direction) => {
    const container = document.getElementById("featured-products-container")
    if (!container) return

    const scrollAmount = 320 // Approximate width of a product card + gap
    const maxScroll = container.scrollWidth - container.clientWidth

    let newPosition
    if (direction === "left") {
      newPosition = Math.max(0, scrollPosition - scrollAmount)
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount)
    }

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scrollContainer("left")}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft className="h-6 w-6 text-indigo-900" />
        </button>
      </div>

      <div
        id="featured-products-container"
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 py-4 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={() => scrollContainer("right")}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-indigo-900" />
        </button>
      </div>

      <style jsx>{`
        #featured-products-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

