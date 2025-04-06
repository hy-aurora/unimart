import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    category?: string
    badge?: string | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/images/placeholder.webp"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.badge && (
            <Badge className="absolute top-2 right-2 bg-indigo-600">{product.badge}</Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium line-clamp-1">{product.name}</h3>
          {product.category && (
            <p className="text-sm text-muted-foreground">{product.category}</p>
          )}
          <p className="font-bold text-indigo-700 dark:text-indigo-400 mt-1">£{product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <button className="w-full py-2 text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  )
}

