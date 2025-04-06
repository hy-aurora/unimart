import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  badge?: string
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        >
          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>

      {product.badge && (
        <div className="absolute top-2 left-2 z-10">
          <Badge
            className={`
            ${product.badge === "Sale" ? "bg-red-500" : ""}
            ${product.badge === "New" ? "bg-green-500" : ""}
            ${product.badge === "Best Seller" ? "bg-amber-500" : ""}
            ${product.badge === "Popular" ? "bg-indigo-500" : ""}
          `}
          >
            {product.badge}
          </Badge>
        </div>
      )}

      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          {product.category && <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>}
          <h3 className="font-medium text-indigo-900 dark:text-indigo-300 line-clamp-2">{product.name}</h3>
          <p className="font-bold mt-1 text-indigo-700 dark:text-indigo-400">£{product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Add to Cart</Button>
      </div>
    </div>
  )
}

