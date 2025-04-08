"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Checkbox,
  Select,
  SelectItem,
  Badge,
  Slider,
} from "@heroui/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortOption, setSortOption] = useState<{ value: string; label: string }[]>([
    { value: "featured", label: "Featured" },
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "priceHighToLow", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filteredProducts, setFilteredProducts] = useState<
    Array<{
      _id: Id<"products">;
      _creationTime: number;
      originalPrice?: number;
      rating?: number;
      ratingCount?: number;
      inStock?: boolean;
      isNew?: boolean;
      name: string;
      category: string;
      price: number;
      imageUrls?: string; // Optional image property
      isSale?: boolean;
      allowCustomSize: boolean;
    }>
  >([]);

  const products = useQuery(api.products.getAll) || [];
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
      );
    }

    if (activeFilters.categories?.length) {
      result = result.filter((product) =>
        activeFilters.categories.includes(product.category?.toLowerCase())
      );
    }

    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      result = result.filter(
        (product) => (product.price || 0) >= min && (product.price || 0) <= max
      );
    }

    setFilteredProducts(
      result.map((product) => ({
        ...product,
        imageUrls: product.imageUrls?.[0] ?? "/placeholder.webp", // Use the first image or a placeholder
        category: product.category ?? "Uncategorized", // Provide a default category
      }))
    );
  }, [searchQuery, activeFilters, products]);

  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
      setActiveFilters((prev) => ({
        ...prev,
        priceRange: value,
      }));
    }
  };

  const toggleCategoryFilter = (category: string) => {
    setActiveFilters((prev) => {
      const currentCategories = prev.categories || [];
      const categoryLower = category.toLowerCase();

      return {
        ...prev,
        categories: currentCategories.includes(categoryLower)
          ? currentCategories.filter((c: string) => c !== categoryLower)
          : [...currentCategories, categoryLower],
      };
    });
  };

  const resetFilters = () => {
    setActiveFilters({});
    setPriceRange([0, 100]);
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
        <p className="text-default-600">
          Browse our collection of high-quality products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                size="sm"
                variant="light"
                onPress={resetFilters}
                isDisabled={Object.keys(activeFilters).length === 0}
              >
                Reset all
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox
                        isSelected={activeFilters.categories?.includes(
                          (category ?? "").toLowerCase()
                        )}
                        onValueChange={() => category && toggleCategoryFilter(category)}
                      >
                        <span className="text-sm">{category}</span>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <Slider
                  label="Price"
                  step={1}
                  minValue={0}
                  maxValue={100}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="max-w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-default-600">
                    ${priceRange[0]}
                  </span>
                  <span className="text-sm text-default-600">
                    ${priceRange[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={
                <Icon icon="lucide:search" className="text-default-400" />
              }
              className="w-full sm:max-w-xs"
            />

            <Select
              className="w-full sm:w-48"
              selectedKeys={sortOption.map(option => option.value)}
              onChange={(e) => {
                const selectedOption = sortOption.find(option => option.value === e.target.value);
                if (selectedOption) {
                  setSortOption([selectedOption]);
                }
              }}
            >
              {sortOption.map((option) => (
                <SelectItem key={option.value} textValue={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-default-100">
                  <img
                    src={product.imageUrls}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm text-default-600">${product.price}</p>
                  {product.isSale && (
                    <Badge color="danger" variant="flat" size="sm">
                      Sale
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
