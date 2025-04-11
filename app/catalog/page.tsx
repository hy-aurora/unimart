"use client";
import React from 'react';
import { Button, Input, Card, CardBody, Badge, Checkbox, Select, SelectItem, Slider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState([0, 100]);
  const [sortBy, setSortBy] = React.useState("featured");

  const schools = useQuery(api.schools.getForCatalog) || [];
  const products = useQuery(api.products.getAll) || [];
  const categories = useQuery(api.categories.getAllCategories) || [];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
        <p className="text-gray-600 dark:text-dark-gray-400">
          Browse our collection of high-quality school uniforms
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-64 h-fit dark:bg-dark-card dark:border-dark-border">
          <CardBody className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 100]);
                  }}
                >
                  Reset all
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Checkbox
                        key={category.name}
                        isSelected={selectedCategories.includes(category.name)}
                        onValueChange={() => handleCategoryToggle(category.name)}
                      >
                        {category.name}
                      </Checkbox>
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
                    onChange={(value) => {
                      if (Array.isArray(value)) {
                        setPriceRange(value);
                      }
                    }}
                    className="max-w-full"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[0]}
                    </span>
                    <span className="text-sm text-gray-600">
                      ₹{priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Icon icon="lucide:search" />}
              className="w-full sm:max-w-xs dark:bg-dark-input dark:text-dark-foreground dark:placeholder-dark-gray-400"
            />

            <Select
              placeholder="Sort by"
              selectedKeys={[sortBy]}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <SelectItem key="featured">Featured</SelectItem>
              <SelectItem key="priceLowToHigh">Price: Low to High</SelectItem>
              <SelectItem key="priceHighToLow">Price: High to Low</SelectItem>
              <SelectItem key="newest">Newest</SelectItem>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card
                  isPressable
                  className="group"
                  onClick={() => window.location.href = `/product/${product.id}`} // Navigate to Product page
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardBody>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-primary-600 font-bold">
                      ₹{product.price.toFixed(2)}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {product.isNew && (
                        <Badge color="primary">New</Badge>
                      )}
                      {product.isSale && (
                        <Badge color="danger">Sale</Badge>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}