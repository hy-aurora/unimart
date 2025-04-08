"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody, Button, Badge, Tooltip } from "@heroui/react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    ratingCount?: number;
    inStock?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    isSale?: boolean;
    category?: string;
    school?: string;
  };
  variant?: "default" | "compact";
  aspectRatio?: "portrait" | "square";
}

export function ProductCard({
  product,
  variant = "default",
  aspectRatio = "portrait",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  const handleAddToCart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const toggleWishlist = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card
      isPressable
      isHoverable
      className="group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardBody className="p-0">
        <div className="relative">
          {/* Labels */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.isNew && (
              <Badge color="success" variant="flat">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge color="danger" variant="flat">
                Sale
              </Badge>
            )}
            {product.isFeatured && (
              <Badge color="warning" variant="flat">
                Featured
              </Badge>
            )}
          </div>

          {/* Image */}
          <div
            className={`relative w-full overflow-hidden ${
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Quick actions */}
          <div
            className={`absolute top-2 right-2 z-10 flex flex-col gap-2 transition-all duration-200 ${
              !isHovered
                ? "opacity-0 translate-x-4"
                : "opacity-100 translate-x-0"
            }`}
          >
            <Tooltip content="Add to wishlist" placement="left">
              <div
                className="rounded-full"
                role="button"
                tabIndex={0}
                title={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={toggleWishlist}
                onKeyDown={(e) => e.key === "Enter" && toggleWishlist(e)}
              >
                <Icon
                  icon="lucide:heart"
                  className={`h-5 w-5 ${isWishlisted ? "text-primary fill-current" : ""}`}
                />
              </div>
            </Tooltip>

            <Tooltip content="Quick view" placement="left">
              <div
                className="rounded-full"
                role="button"
                tabIndex={0}
                onClick={(e) => e.preventDefault()}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              >
                <Icon icon="lucide:eye" className="h-5 w-5" />
              </div>
            </Tooltip>
          </div>

          {/* Add to cart button */}
          {variant === "default" && (
            <div
              className={`absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-2 transition-all duration-300 ${
                !isHovered
                  ? "translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={
                  isAddedToCart ? "Item added to cart" : "Add to cart"
                }
                onClick={handleAddToCart}
                aria-disabled={isAddedToCart}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon
                    icon={
                      isAddedToCart
                        ? "lucide:check-circle"
                        : "lucide:shopping-cart"
                    }
                    className="h-5 w-5"
                  />
                  <span>{isAddedToCart ? "Added" : "Add to Cart"}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          {product.category && (
            <p className="text-xs font-medium uppercase tracking-wide text-default-500">
              {product.category}
            </p>
          )}
          {product.category && (
            <p className="text-xs font-medium uppercase tracking-wide text-default-500">
              {product.category}
              {product.school && ` • ${product.school}`}
            </p>
          )}

          <h3 className="mt-2 line-clamp-2 text-base font-medium">
            {product.name}
          </h3>

          {product.rating !== undefined && (
            <div className="mt-1 flex items-center gap-1">
              <div className="flex items-center">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Icon
                      key={i}
                      icon="lucide:star"
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(product.rating ?? 0)
                          ? "text-warning fill-current"
                          : "text-default-300"
                      }`}
                    />
                  ))}
              </div>
              {product.ratingCount !== undefined && (
                <span className="text-xs text-default-500">
                  ({product.ratingCount})
                </span>
              )}
            </div>
          )}

          <div className="mt-2 flex items-center gap-2">
            <p className="font-medium text-primary">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice !== undefined && (
              <>
                <p className="text-sm text-default-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <Badge
                  variant="flat"
                  color="danger"
                  size="sm"
                  className="ml-auto"
                >
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100
                  )}
                  % OFF
                </Badge>
              </>
            )}
          </div>

          {variant === "compact" && (
            <div className="mt-3 flex gap-2">
              <Button
                fullWidth
                color="primary"
                size="sm"
                onClick={handleAddToCart}
                isDisabled={isAddedToCart}
                startContent={
                  isAddedToCart ? (
                    <Icon icon="lucide:check-circle" className="h-4 w-4" />
                  ) : (
                    <Icon icon="lucide:shopping-cart" className="h-4 w-4" />
                  )
                }
              >
                {isAddedToCart ? "Added" : "Add to Cart"}
              </Button>
              <Button
                isIconOnly
                variant="bordered"
                size="sm"
                onClick={toggleWishlist}
              >
                <Icon
                  icon="lucide:heart"
                  className={isWishlisted ? "fill-current text-primary" : ""}
                />
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
