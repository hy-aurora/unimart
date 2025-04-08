"use client";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button, Input } from "@heroui/react";

export default function SchoolsPage() {
  const schools = useQuery(api.schools.getAll);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your School</h1>
        <p className="text-default-600">
          Browse schools and find all the uniform items you need
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mb-10 bg-default-100 p-5 rounded-xl shadow-sm border border-default-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-default-400" />
          <Input placeholder="Search by school name" className="pl-10" />
        </div>
        <div className="w-full lg:w-48">
          <select className="w-full h-10 px-3 rounded-md border border-default-200 bg-default-100 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Cities</option>
            {/* Add city filtering dynamically if needed */}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools?.map((school) => (
          <Link
            key={school._id}
            href={`/schools/${school._id}`}
            className="group"
          >
            <div className="flex flex-col border rounded-xl overflow-hidden transition-all hover:shadow-md bg-default-100 border-default-200">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={school.logoUrl || "/placeholder.svg"}
                  alt={school.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-default-900 group-hover:text-primary transition-colors">
                  {school.name}
                </h3>
                <p className="text-sm text-default-500 flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {school.location}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
