"use client"

import { useState } from "react"
import { ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export function ProfileWishlist() {
  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Premium School Blazer",
      price: 49.99,
      image: "/images/placeholder.webp",
      category: "Blazers & Jumpers",
    },
    {
      id: 2,
      name: "White School Shirt (Pack of 2)",
      price: 18.99,
      image: "/images/placeholder.webp",
      category: "Shirts & Blouses",
    },
    {
      id: 3,
      name: "School Backpack",
      price: 29.99,
      image: "/images/placeholder.webp",
      category: "Accessories",
    },
    {
      id: 4,
      name: "PE Kit Bundle",
      price: 45.99,
      image: "/placeholder.svg?height=300&width=300&text=PE+Kit",
      category: "PE Kit",
    },
    {
      id: 5,
      name: "School Water Bottle",
      price: 12.99,
      image: "/placeholder.svg?height=300&width=300&text=Bottle",
      category: "Accessories",
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">My Wishlist</h2>
        {wishlistItems.length > 0 && (
          <Button
            variant="outline"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
            onClick={() => setWishlistItems([])}
          >
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
              <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-indigo-900 dark:text-indigo-400">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Items added to your wishlist will appear here. Start browsing our catalog to add items you like.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard product={item} />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-red-500 hover:text-red-600 dark:bg-gray-800/80 dark:hover:bg-gray-800"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove from wishlist</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

