"use client";
import React from "react";
import { Icon } from "@iconify/react";
import {
  Button,
  Input,
  Checkbox,
  Select,
  SelectItem,
  Badge,
  Accordion,
  AccordionItem,
  Slider
} from "@heroui/react";

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
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<Record<string, any>>({});
  const [sortOption, setSortOption] = React.useState("featured");
  const [priceRange, setPriceRange] = React.useState([0, 100]);
  const [filteredProducts, setFilteredProducts] = React.useState<ProductType[]>([]);

  // Mock data for demonstration
  const products = React.useMemo(() => Array(12).fill(null).map((_, i) => ({
    id: i.toString(),
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 20,
    image: `https://img.heroui.chat/image/fashion?w=300&h=300&u=${i}`,
    category: MOCK_CATEGORIES[Math.floor(Math.random() * MOCK_CATEGORIES.length)].name.toLowerCase(),
    inStock: Math.random() > 0.2,
    isSale: Math.random() > 0.7,
  })), []);

  const schools = React.useMemo(() => Array(5).fill(null).map((_, i) => ({
    _id: i.toString(),
    name: `School ${i + 1}`,
  })), []);

  // Filter products based on active filters
  React.useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    if (activeFilters.categories?.length) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category?.toLowerCase())
      );
    }

    if (activeFilters.priceRange) {
      const [min, max] = activeFilters.priceRange;
      result = result.filter(product => 
        (product.price || 0) >= min && (product.price || 0) <= max
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, activeFilters, products]);

  const handlePriceRangeChange = (value: number | number[]) => {
      if (Array.isArray(value)) {
        setPriceRange(value);
        setActiveFilters(prev => ({
          ...prev,
          priceRange: value,
        }));
      }
    };

  const toggleCategoryFilter = (category: string) => {
    setActiveFilters(prev => {
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
        <p className="text-default-600">Browse our collection of high-quality products</p>
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
                  {MOCK_CATEGORIES.map(category => (
                    <div key={category.id} className="flex items-center gap-2">
                      <Checkbox
                        isSelected={activeFilters.categories?.includes(category.name.toLowerCase())}
                        onValueChange={() => toggleCategoryFilter(category.name)}
                      >
                        <span className="text-sm">{category.name}</span>
                      </Checkbox>
                      <Badge variant="flat" color="default" className="ml-auto">
                        {category.count}
                      </Badge>
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
                  <span className="text-sm text-default-600">${priceRange[0]}</span>
                  <span className="text-sm text-default-600">${priceRange[1]}</span>
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
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="w-full sm:max-w-xs"
            />
            
            <Select 
              className="w-full sm:w-48"
              selectedKeys={[sortOption]}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} textValue={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="group relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-default-100">
                  <img
                    src={product.image}
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