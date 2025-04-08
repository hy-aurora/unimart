"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { Button, Card, CardBody, Badge } from "@heroui/react";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";

export default function SchoolPage() {
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("id"); // Retrieve the id from search params

  if (!schoolId || schoolId.trim() === "") {
    return <div>Error: School ID is missing or invalid.</div>; // Handle missing or invalid schoolId
  }

  const school = useQuery(api.schools.getWithProducts, {
    schoolId: schoolId as Id<"schools">,
  }); // Fetch school with products
  const categories = useQuery(api.categories.getAll) || []; // Fetch categories from backend
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [sortOption, setSortOption] = React.useState("popular");

  const filteredProducts = React.useMemo(() => {
    if (!school) return [];
    let filtered = [...school.products];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    switch (sortOption) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return filtered;
  }, [school, selectedCategory, sortOption]);

  if (!school) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[320px] overflow-hidden">
        <img
          src={school.bannerUrl}
          alt={school.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto flex items-end gap-6">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <img
                src={school.logoUrl}
                alt={school.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="text-white flex-1">
              <h1 className="text-3xl font-bold mb-2">{school.name}</h1>
              <div className="flex gap-4">
                <Badge variant="flat" color="secondary" className="gap-1">
                  <Icon icon="lucide:map-pin" />
                  {school.location}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardBody>
            <h2 className="text-xl font-bold mb-4">About the School Uniform</h2>
            <p className="text-default-600">{school.description}</p>
          </CardBody>
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="lg:w-64 h-fit">
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
                    onPress={() => setSelectedCategory(category.name)}
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
                <select
                  className="border rounded-lg px-3 py-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </CardBody>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    school: school.name,
                    image: product.imageUrls[0] || "",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
