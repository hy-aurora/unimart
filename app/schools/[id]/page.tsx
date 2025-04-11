"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardBody, Badge, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function SchoolPage() {
  const params = useParams();
  const router = useRouter();
  const schoolId = params?.id && typeof params.id === "string" ? (params.id as Id<"schools">) : null; // Convert to Id<"schools">
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fetch school details and products using the school ID
  const school = schoolId
    ? useQuery(api.schools.getById, { schoolId })
    : null;
  const products = schoolId
    ? useQuery(api.products.getBySchool, { schoolId }) || []
    : [];

  // Extract unique categories from products
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return uniqueCategories.map((category) => ({ name: category }));
  }, [products]);

  // Filter products based on selected category and search query
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Handle loading or invalid state
  if (!schoolId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Invalid school ID provided.</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading school details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="relative h-[320px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${school?.bannerUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-primary-800/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto flex items-end gap-6">
            <Card className="w-28 h-28 p-2">
              <img
                src={school?.logoUrl}
                alt={school?.name}
                className="w-full h-full object-contain"
              />
            </Card>
            <div className="text-white flex-1">
              <motion.h1
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {school?.name}
              </motion.h1>
              <Badge color="primary">
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:map-pin" className="w-4 h-4" />
                  {school?.location}
                </div>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-bold mb-4">About the School Uniform</h2>
            <p className="text-gray-600 dark:text-dark-gray-400">
              {school?.description}
            </p>
          </CardBody>
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="lg:w-64 h-fit dark:bg-dark-card dark:border-dark-border">
            <CardBody>
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="space-y-1">
                <Button
                  fullWidth
                  variant={selectedCategory === "all" ? "solid" : "light"}
                  color={selectedCategory === "all" ? "primary" : "default"}
                  onPress={() => setSelectedCategory("all")}
                  className="justify-start"
                >
                  All Items
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    fullWidth
                    variant={
                      selectedCategory === category.name ? "solid" : "light"
                    }
                    color={
                      selectedCategory === category.name ? "primary" : "default"
                    }
                    onPress={() => setSelectedCategory(category.name || "all")}
                    className="justify-start"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          <div className="flex-1">
            <Card className="mb-6">
              <CardBody className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {selectedCategory === "all"
                    ? "All Products"
                    : selectedCategory}
                </h2>
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Icon icon="lucide:search" />}
                  className="max-w-xs"
                />
              </CardBody>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  isHoverable
                  isPressable
                  onClick={() => router.push(`/product/${product.id}`)} // Navigate to Product page
                >
                  <CardBody>
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-primary font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}