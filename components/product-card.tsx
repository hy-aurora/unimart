"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, Eye, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating?: number
    ratingCount?: number
    inStock?: boolean
    isNew?: boolean
    isFeatured?: boolean
    isSale?: boolean
    category?: string
    school?: string
  }
  variant?: "default" | "compact"
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function ProductCard({
  product,
  variant = "default",
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [isAddedToCart, setIsAddedToCart] = React.useState(false)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Here you would add the product to cart 
    // For demo purpose
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }
  
  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-200 h-full",
        isHovered && "shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <Link href={`/product/${product.id}`} className="focus:outline-none focus-visible:ring-2">
        <div className="relative">
          {/* Labels */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-600">New</Badge>
            )}
            {product.isSale && (
              <Badge className="bg-red-600">Sale</Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-amber-500">Featured</Badge>
            )}
          </div>
          
          {/* Image container */}
          <div className={cn(
            "relative w-full overflow-hidden", 
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}>
            <Image
              src={product.image || "/images/product-placeholder.png"}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-300",
                isHovered && "scale-105"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Quick action buttons */}
          <div className={cn(
            "absolute top-2 right-2 z-10 flex flex-col gap-2 transition-all duration-200",
            !isHovered && "opacity-0 translate-x-4",
            isHovered && "opacity-100 translate-x-0"
          )}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8 rounded-full shadow-sm"
                    onClick={toggleWishlist}
                  >
                    <Heart className={cn(
                      "h-4 w-4", 
                      isWishlisted && "fill-primary text-primary"
                    )} />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Add to wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8 rounded-full shadow-sm"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Quick view</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Add to cart button */}
          {variant === "default" && (
            <div className={cn(
              "absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-2 text-center transition-all duration-300",
              !isHovered && "translate-y-full opacity-0",
              isHovered && "translate-y-0 opacity-100"
            )}>
              <Button 
                className="w-full font-medium text-xs h-9"
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
        
        <div className="p-4">
          {product.category && (
            <CardDescription className="text-xs font-medium uppercase tracking-wide">
              {product.category}
              {product.school && ` • ${product.school}`}
            </CardDescription>
          )}
          
          <CardTitle className={cn(
            "line-clamp-2 mt-1 text-base font-medium leading-tight",
            !product.category && !product.school && "mt-0"
          )}>
            {product.name}
          </CardTitle>
          
          {product.rating && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-3.5 w-3.5", 
                      i < Math.floor(product.rating || 0) 
                        ? "fill-amber-400 text-amber-400" 
                        : "fill-muted text-muted"
                    )} 
                  />
                ))}
              </div>
              {product.ratingCount && (
                <span className="text-xs text-muted-foreground">
                  ({product.ratingCount})
                </span>
              )}
            </div>
          )}
          
          <div className="mt-2 flex items-center gap-2">
            <p className="font-medium">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
            {product.originalPrice && (
              <Badge variant="outline" className="text-xs font-normal text-red-600 ml-auto">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          
          {variant === "compact" && (
            <div className="mt-3 flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 h-8"
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={toggleWishlist}
              >
                <Heart className={cn(
                  "h-4 w-4", 
                  isWishlisted && "fill-primary text-primary"
                )} />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
          )}
        </div>
      </Link>
    </Card>
  )
}

