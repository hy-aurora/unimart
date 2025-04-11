"use client";

import React, { useRef } from 'react';
import { Card, Button, Badge, Spinner } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Id } from '@/convex/_generated/dataModel';
import { motion } from 'framer-motion';

interface DynamicFeaturedProductsProps {
  onQuickView?: (productId: string) => void;
}

export function DynamicFeaturedProducts({ onQuickView }: DynamicFeaturedProductsProps) {
  const router = useRouter();
  const featuredProducts = useQuery(api.products.getFeaturedProducts, { limit: 8 });
  const addItemToCart = useMutation(api.carts.addItem);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = async (productId: Id<"products">) => {
    try {
      await addItemToCart({
        productId,
        quantity: 1,
      });
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (featuredProducts === undefined) {
    // Loading state
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border border-gray-200 dark:border-dark-border">
            <div className="relative aspect-[4/5]">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg border-dashed">
        <p className="text-gray-500">No featured products available at the moment.</p>
      </div>
    );
  }

  // Determine if we should use carousel (more than 3 items)
  const useCarousel = featuredProducts.length > 3;

  const renderProductCard = (product: any) => (
    <Card
      key={product._id}
      isPressable
      className={`border border-gray-200 hover:border-primary-200 transition-all dark:border-dark-border dark:hover:border-dark-primary ${useCarousel ? 'min-w-[280px] md:min-w-[300px]' : ''}`}
      onPress={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.imageUrls[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.isSale && (
          <Badge
            color="danger"
            className="absolute top-2 right-2"
          >
            Sale
          </Badge>
        )}
        {product.isNew && (
          <Badge
            color="success"
            className="absolute top-2 left-2"
          >
            New
          </Badge>
        )}

        {/* Quick view button that appears on hover */}
        <div className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-black/20 transition-all">
          <Button
            size="sm"
            color="default"
            variant="solid"
            className="bg-white text-black"
            onPress={(e) => {
              // Stop event propagation without using preventDefault
              if (onQuickView) {
                onQuickView(product._id);
              }
            }}
          >
            Quick View
          </Button>
        </div>
      </div>
      <div className="p-4">
        {product.schoolId && (
          <SchoolLabel schoolId={product.schoolId} />
        )}
        <h3 className="font-semibold text-lg mb-2 dark:text-dark-foreground">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary-600">
            ₹{product.price}
            {product.originalPrice && (
              <span className="ml-2 text-sm line-through text-gray-400">
                ₹{product.originalPrice}
              </span>
            )}
          </span>
          <Button
            isIconOnly
            color="primary"
            variant="light"
            onPress={(e) => {
              // Call handler without trying to modify the event
              handleAddToCart(product._id);
            }}>
            <Icon icon="lucide:shopping-cart" className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="relative">
      {useCarousel ? (
        <>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map(product => (
              <div key={product._id} className="snap-start">
                {renderProductCard(product)}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white dark:bg-dark-card rounded-full p-2 shadow-md z-10 hover:bg-gray-100 dark:hover:bg-dark-hover"
            aria-label="Previous slide"
          >
            <Icon icon="lucide:chevron-left" className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white dark:bg-dark-card rounded-full p-2 shadow-md z-10 hover:bg-gray-100 dark:hover:bg-dark-hover"
            aria-label="Next slide"
          >
            <Icon icon="lucide:chevron-right" className="w-5 h-5" />
          </button>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => renderProductCard(product))}
        </div>
      )}
    </div>
  );
}

// Helper component to display school name
function SchoolLabel({ schoolId }: { schoolId: Id<"schools"> }) {
  const school = useQuery(api.schools.getSchool, { id: schoolId });

  if (!school) return null;

  return (
    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
      {school.name}
    </p>
  );
}
