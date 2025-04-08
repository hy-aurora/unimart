"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Filter } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@heroui/react";
import { ProductCard } from "@/components/product-card";
import { Id } from "@/convex/_generated/dataModel";

export default function SchoolPage() {
  const params = useParams();
  const schoolId = params.id as string;

  const school = useQuery(api.schools.getById, {
    schoolId: schoolId as Id<"schools">,
  }) as {
    _id: Id<"schools">;
    _creationTime: number;
    name: string;
    slug: string;
    logoUrl: string;
    bannerUrl: string;
    description: string;
    location: string;
    createdAt: number;
    categories?: string[]; // Added categories property
  } | null;
  const products = useQuery(api.products.getBySchool, {
    schoolId: schoolId as Id<"schools">,
  });

  if (!school) {
    return <div>Loading school details...</div>;
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-6">
        <Link
          href="/schools"
          className="group flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Schools
        </Link>
      </div>

      <div className="relative w-full h-[220px] md:h-[320px] rounded-xl overflow-hidden mb-10 shadow-md">
        <Image
          src={school.bannerUrl || "/placeholder.svg"}
          alt={school.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-2 w-24 h-24 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
                <Image
                  src={school.logoUrl || "/placeholder.svg"}
                  alt={school.name}
                  width={70}
                  height={70}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{school.name}</h1>
          </div>
        </div>
      </div>

      <div className="mb-10 bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">
          About the School Uniform
        </h2>
        <p className="text-indigo-700/80 dark:text-indigo-300/80">
          {school.description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="sticky top-20 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400">
                Categories
              </h3>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start font-normal hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/50"
              >
                All Items
              </Button>
              {school.categories?.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="w-full justify-start font-normal hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/50"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">
              Products
            </h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select className="text-sm border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.imageUrls[0] || "/placeholder.svg",
                  inStock: product.stock > 0,
                  school: school.name,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
