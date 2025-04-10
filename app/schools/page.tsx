"use client";
import React from "react";
import { Icon } from "@iconify/react";
import {
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Button,
  Badge,
} from "@heroui/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface School {
  _id: string;
  name: string;
  logoUrl: string;
  location: string;
  studentCount?: number;
  uniformCount?: number;
}

export default function SchoolsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");

  // Fetch schools and their product counts dynamically
  const schools = useQuery(api.schools.getAll) || [];
  const products = useQuery(api.products.getAll) || [];

  // Extract unique cities from schools
  const cities = React.useMemo(
    () => Array.from(new Set(schools.map((school) => school.location))),
    [schools]
  );

  // Filter schools based on search query and selected city
  const filteredSchools = React.useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = !selectedCity || school.location === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [schools, searchQuery, selectedCity]);

  // Count products for each school
  const schoolWithProductCounts = React.useMemo(() => {
    return filteredSchools.map((school) => {
      const productCount = products.filter(
        (product) => product.schoolId === school._id
      ).length;
      return { ...school, productCount };
    });
  }, [filteredSchools, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your School</h1>
        <p className="text-default-600">
          Browse schools and find all the uniform items you need
        </p>
      </div>

      <Card className="mb-10">
        <CardBody className="flex flex-col lg:flex-row gap-4">
          <Input
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={
              <Icon icon="lucide:search" className="text-default-400" />
            }
            className="flex-1"
          />
          <Select
            placeholder="All Cities"
            selectedKeys={selectedCity ? [selectedCity] : []}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full lg:w-48"
          >
            <SelectItem key="">All Cities</SelectItem>
            <>
            {cities.map((city) => (
              <SelectItem key={city}>{city}</SelectItem>
            ))}
            </>
          </Select>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {schoolWithProductCounts.map((school) => (
          <Card
            key={school._id}
            isPressable
            isHoverable
            className="border-none"
            as="a"
            href={`/schools/${school._id}`}
          >
            <CardBody className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={school.logoUrl}
                  alt={school.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                  {school.name}
                </h3>
                <p className="text-sm text-default-500 flex items-center">
                  <Icon icon="lucide:map-pin" className="mr-1 h-4 w-4" />
                  {school.location}
                </p>
                <p className="text-sm text-default-500">
                  {school.productCount} Products Available
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {schoolWithProductCounts.length === 0 && (
        <div className="text-center py-12">
          <Icon
            icon="lucide:school"
            className="mx-auto h-16 w-16 text-default-300"
          />
          <h3 className="mt-4 text-lg font-semibold">No schools found</h3>
          <p className="mt-2 text-default-500">
            Try adjusting your search or filter criteria
          </p>
          <Button
            color="primary"
            variant="light"
            className="mt-4"
            onPress={() => {
              setSearchQuery("");
              setSelectedCity("");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
