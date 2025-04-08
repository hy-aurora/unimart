"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  Tag,
  School,
  CreditCard,
  X,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ProductType {
  id: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  ratingCount?: number;
  category?: string;
  school?: string;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  gender?: "boy" | "girl" | "unisex";
  classLevel?: string;
  stock?: number;
  allowCustomSize?: boolean;
}

// Add mock images
const MOCK_CATEGORIES = [
  { id: "uniforms", name: "Uniforms", count: 120 },
  { id: "shoes", name: "Shoes", count: 45 },
  { id: "sportswear", name: "Sportswear", count: 32 },
  { id: "accessories", name: "Accessories", count: 78 },
  { id: "books", name: "Books & Stationery", count: 56 },
  { id: "bags", name: "Bags & Backpacks", count: 24 },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function CatalogPage() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch products and schools from Convex backend
  const products = useQuery(api.products.getAll) || [];
  const schools = useQuery(api.schools.getForCatalog) || [];
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(
    products.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.imageUrls?.[0] || "",
      rating: product.rating,
      ratingCount: product.ratingCount,
      category: product.category,
      school: product.school,
      sizes: product.sizes,
      inStock: product.inStock,
      isNew: product.isNew,
      isFeatured: product.isFeatured,
      isSale: product.isSale,
      gender: product.gender,
      classLevel: product.classLevel,
      stock: product.stock,
      allowCustomSize: product.allowCustomSize,
    }))
  );

  // Count active filters
  const activeFilterCount = Object.keys(activeFilters).reduce((count, key) => {
    if (Array.isArray(activeFilters[key])) {
      return count + activeFilters[key].length;
    }
    return activeFilters[key] ? count + 1 : count;
  }, 0);

  // Filter products
  useEffect(() => {
    let result = [...products];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.category?.toLowerCase().includes(query) || false) ||
          product.school?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (activeFilters.categories?.length) {
      result = result.filter((product) =>
        activeFilters.categories.includes(product.category?.toLowerCase())
      );
    }

    // Apply school filter
    if (activeFilters.schools?.length) {
      result = result.filter((product) =>
        activeFilters.schools.includes(product.school)
      );
    }

    // Apply price range filter
    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      result = result.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Apply availability filter
    if (activeFilters.inStock) {
      result = result.filter((product) => product.inStock);
    }

    if (activeFilters.onSale) {
      result = result.filter((product) => product.isSale);
    }

    // Apply sort
    switch (sortOption) {
      case "newest":
        // For mock data, we'll just shuffle
        result = [...result].sort(() => Math.random() - 0.5);
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      // Featured is default
      default:
        break;
    }

    setFilteredProducts(
      result.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.imageUrls?.[0] || "", // Ensure 'image' is included
        rating: product.rating,
        ratingCount: product.ratingCount,
        category: product.category,
        school: product.school,
        sizes: product.sizes,
        inStock: product.inStock,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        isSale: product.isSale,
        gender: product.gender,
        classLevel: product.classLevel,
        stock: product.stock,
        allowCustomSize: product.allowCustomSize,
      }))
    );
  }, [searchQuery, activeFilters, sortOption, products]);

  // Update price range filter
  const handlePriceRangeChange = useCallback((value: number[]) => {
    setPriceRange(value);
    setActiveFilters((prev) => ({
      ...prev,
      priceRange: value,
    }));
  }, []);

  // Toggle category filter
  const toggleCategoryFilter = useCallback((category: string) => {
    setActiveFilters((prev) => {
      const currentCategories = prev.categories || [];
      const categoryLower = category.toLowerCase();

      if (currentCategories.includes(categoryLower)) {
        return {
          ...prev,
          categories: currentCategories.filter(
            (c: string) => c !== categoryLower
          ),
        };
      } else {
        return {
          ...prev,
          categories: [...currentCategories, categoryLower],
        };
      }
    });
  }, []);

  // Toggle school filter
  const toggleSchoolFilter = useCallback((school: string) => {
    setActiveFilters((prev) => {
      const currentSchools = prev.schools || [];

      if (currentSchools.includes(school)) {
        return {
          ...prev,
          schools: currentSchools.filter((s: string) => s !== school),
        };
      } else {
        return {
          ...prev,
          schools: [...currentSchools, school],
        };
      }
    });
  }, []);

  // Toggle availability filter
  const toggleAvailabilityFilter = useCallback((key: "inStock" | "onSale") => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setActiveFilters({});
    setPriceRange([0, 100]);
    setSearchQuery("");
  }, []);

  // Clear a specific filter
  const clearFilter = useCallback((key: string, value?: any) => {
    setActiveFilters((prev) => {
      if (value !== undefined && Array.isArray(prev[key])) {
        return {
          ...prev,
          [key]: prev[key].filter((v: any) => v !== value),
        };
      }

      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });

    if (key === "priceRange") {
      setPriceRange([0, 100]);
    }
  }, []);

  // Filter component for desktop view
  const DesktopFilters = () => (
    <div className="hidden md:block w-64 flex-shrink-0 pr-8">
      <div className="sticky top-24 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-muted-foreground hover:text-foreground"
            >
              Reset all
            </Button>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-sm font-medium">Categories</h3>
          <div className="space-y-2">
            {MOCK_CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={activeFilters.categories?.includes(
                    category.name.toLowerCase()
                  )}
                  onCheckedChange={() => toggleCategoryFilter(category.name)}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="flex flex-1 items-center justify-between text-sm"
                >
                  {category.name}
                  <Badge
                    variant="outline"
                    className="ml-auto text-xs font-normal"
                  >
                    {category.count}
                  </Badge>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-4 text-sm font-medium">Price Range</h3>
          <Slider
            defaultValue={[0, 100]}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            max={100}
            step={1}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <div className="text-sm">$0</div>
            <div className="text-sm">$100</div>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-sm font-medium">Schools</h3>
          <div className="space-y-2">
            {schools.map((school) => (
              <div key={school._id} className="flex items-center space-x-2">
                <Checkbox
                  id={`school-${school._id}`}
                  checked={activeFilters.schools?.includes(school.name)}
                  onCheckedChange={() => toggleSchoolFilter(school.name)}
                />
                <Label htmlFor={`school-${school._id}`} className="text-sm">
                  {school.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-sm font-medium">Availability</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={!!activeFilters.inStock}
                onCheckedChange={() => toggleAvailabilityFilter("inStock")}
              />
              <Label htmlFor="in-stock" className="text-sm">
                In Stock
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={!!activeFilters.onSale}
                onCheckedChange={() => toggleAvailabilityFilter("onSale")}
              />
              <Label htmlFor="on-sale" className="text-sm">
                On Sale
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container max-w-screen-xl py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Catalog
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our collection of high-quality school uniforms and supplies.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <SearchInput
            placeholder="Search products, schools..."
            className="w-full sm:max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={(value) => setSearchQuery(value)}
          />

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative md:hidden gap-1"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-1 text-xs h-5 px-1 bg-primary">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>

                <div className="py-4 overflow-y-auto h-[calc(100vh-10rem)]">
                  <Accordion
                    type="multiple"
                    defaultValue={[
                      "categories",
                      "price",
                      "schools",
                      "availability",
                    ]}
                  >
                    <AccordionItem value="categories">
                      <AccordionTrigger className="text-sm font-medium">
                        Categories
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {MOCK_CATEGORIES.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`mobile-category-${category.id}`}
                                checked={activeFilters.categories?.includes(
                                  category.name.toLowerCase()
                                )}
                                onCheckedChange={() =>
                                  toggleCategoryFilter(category.name)
                                }
                              />
                              <Label
                                htmlFor={`mobile-category-${category.id}`}
                                className="flex flex-1 items-center justify-between text-sm"
                              >
                                {category.name}
                                <Badge
                                  variant="outline"
                                  className="ml-auto text-xs font-normal"
                                >
                                  {category.count}
                                </Badge>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price">
                      <AccordionTrigger className="text-sm font-medium">
                        Price Range
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="px-1 py-4">
                          <Slider
                            defaultValue={[0, 100]}
                            value={priceRange}
                            onValueChange={handlePriceRangeChange}
                            max={100}
                            step={1}
                            className="mb-6"
                          />
                          <div className="flex items-center justify-between">
                            <div className="text-sm">$0</div>
                            <div className="text-sm">$100</div>
                          </div>
                          <div className="mt-2 text-center text-sm text-muted-foreground">
                            ${priceRange[0]} - ${priceRange[1]}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="schools">
                      <AccordionTrigger className="text-sm font-medium">
                        Schools
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          {schools.map((school) => (
                            <div
                              key={school._id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`mobile-school-${school._id}`}
                                checked={activeFilters.schools?.includes(
                                  school.name
                                )}
                                onCheckedChange={() =>
                                  toggleSchoolFilter(school.name)
                                }
                              />
                              <Label
                                htmlFor={`mobile-school-${school._id}`}
                                className="text-sm"
                              >
                                {school.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="availability">
                      <AccordionTrigger className="text-sm font-medium">
                        Availability
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-in-stock"
                              checked={!!activeFilters.inStock}
                              onCheckedChange={() =>
                                toggleAvailabilityFilter("inStock")
                              }
                            />
                            <Label
                              htmlFor="mobile-in-stock"
                              className="text-sm"
                            >
                              In Stock
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mobile-on-sale"
                              checked={!!activeFilters.onSale}
                              onCheckedChange={() =>
                                toggleAvailabilityFilter("onSale")
                              }
                            />
                            <Label htmlFor="mobile-on-sale" className="text-sm">
                              On Sale
                            </Label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <SheetFooter>
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={resetFilters}
                    >
                      Reset
                    </Button>
                    <SheetClose asChild>
                      <Button className="flex-1">
                        Apply ({filteredProducts.length})
                      </Button>
                    </SheetClose>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active filters display */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {Object.entries(activeFilters).map(([key, value]) => {
              if (Array.isArray(value)) {
                return value.map((v) => (
                  <Badge
                    key={`${key}-${v}`}
                    variant="secondary"
                    className="text-xs px-2 py-1 gap-1"
                  >
                    {key === "categories"
                      ? "Category:"
                      : key === "schools"
                        ? "School:"
                        : ""}{" "}
                    {v}
                    <button
                      className="ml-1"
                      onClick={() => clearFilter(key, v)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ));
              }

              if (key === "priceRange") {
                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="text-xs px-2 py-1 gap-1"
                  >
                    Price: ${value[0]} - ${value[1]}
                    <button className="ml-1" onClick={() => clearFilter(key)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              }

              if (value === true) {
                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="text-xs px-2 py-1 gap-1"
                  >
                    {key === "inStock" ? "In Stock" : "On Sale"}
                    <button className="ml-1" onClick={() => clearFilter(key)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              }

              return null;
            })}

            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-7 text-xs text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="flex">
        <DesktopFilters />

        <div className="w-full">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="mx-auto h-16 w-16 text-muted-foreground">
                <Search className="h-16 w-16 opacity-20" />
              </div>
              <h3 className="font-semibold text-xl">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={resetFilters} className="mt-2">
                Reset all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={{ ...product, name: product.name || "Unnamed Product", price: product.price ?? 0 }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
