"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  PlusCircle,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Upload,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenericId } from "convex/values";

export default function ProductsPage() {
  const products = useQuery(api.products.getAll) || [];
  const schools = useQuery(api.schools.getAll) || [];
  const addProduct = useMutation(api.products.add);
  const updateProduct = useMutation(api.products.modify);
  const deleteProduct = useMutation(api.products.remove);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<null | typeof products[0]>(null);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: null,
    schoolId: "", // Initialize schoolId in formState
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async () => {
    let imageUrls: string[] = [];
    if (selectedImage) {
      imageUrls = [selectedImage]; // Use the selected image directly
    }

    await addProduct({
      id: "", // Example default value
      name: formState.name,
      price: parseFloat(formState.price),
      originalPrice: parseFloat(formState.price), // Example default value
      imageUrls, // Use the selected image
      rating: 0, // Example default value
      ratingCount: 0, // Example default value
      inStock: true, // Example default value
      isNew: true, // Example default value
      isFeatured: false, // Example default value
      isSale: false, // Example default value
      category: formState.category,
      school: "", // Example default value
      description: formState.description,
      sizes: [], // Example default value
      gender: "unisex", // Example default value
      classLevel: "", // Example default value
      schoolId: formState.schoolId as GenericId<"schools">, // Convert to the correct type
      stock: parseInt(formState.stock, 10),
      allowCustomSize: false, // Example default value
      createdAt: Date.now(),
    });

    setFormState({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: null,
      schoolId: "", // Reset schoolId
    });
    setSelectedImage(null);
  };

  const handleUpdateProduct = async () => {
    let imageUrls: string[] = [];
    if (selectedImage) {
      imageUrls = [selectedImage]; // Use the selected image directly
    }

    const updates = {
      productId: selectedProduct?._id as GenericId<"products">,
      name: formState.name,
      price: parseFloat(formState.price),
      category: formState.category,
      stock: parseInt(formState.stock, 10),
      description: formState.description,
      imageUrls, // Use the selected image
    };

    if (updates.productId) {
      await updateProduct(updates);
    } else {
      console.error("Invalid productId");
    }
    setSelectedProduct(null);
    setFormState({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: null,
      schoolId: "", // Reset schoolId
    });
    setSelectedImage(null);
  };

  const handleDeleteProduct = async (productId: GenericId<"products">) => {
    await deleteProduct({ productId });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? "Edit Product" : "Add Product"}
                </DialogTitle>
                <DialogDescription>
                  {selectedProduct
                    ? "Update the product details."
                    : "Fill in the details to add a new product."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="sm:text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="col-span-1 sm:col-span-3"
                    placeholder="Product name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="sm:text-right">
                    Price (£)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formState.price}
                    onChange={handleInputChange}
                    className="col-span-1 sm:col-span-3"
                    placeholder="0.00"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="sm:text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="col-span-1 sm:col-span-3"
                    placeholder="Category"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="sm:text-right">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formState.stock}
                    onChange={handleInputChange}
                    className="col-span-1 sm:col-span-3"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="school" className="sm:text-right">
                    School
                  </Label>
                  <select
                    id="school"
                    name="schoolId"
                    value={formState.schoolId}
                    onChange={handleInputChange}
                    className="col-span-1 sm:col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select a school</option>
                    {schools.map((school) => (
                      <option key={school._id} value={school._id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="sm:text-right pt-2">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    className="col-span-1 sm:col-span-3 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Product description"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="sm:text-right">
                    Image
                  </Label>
                  <div className="col-span-1 sm:col-span-3">
                    <Input
                      id="image"
                      type="file"
                      onChange={handleImageUpload}
                    />
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="mt-2 h-24 w-24 object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={
                    selectedProduct ? handleUpdateProduct : handleAddProduct
                  }
                  className="w-full sm:w-auto"
                >
                  {selectedProduct ? "Update Product" : "Save Product"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                Manage your product catalog and inventory levels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" size="icon" variant="ghost">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>£{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setFormState({
                                      name: product.name,
                                      price: product.price.toString(),
                                      category: product.category || "",
                                      stock: product.stock.toString(),
                                      description: "description" in product ? (product.description as string) : "", // Ensure description is optional
                                      image: null,
                                      schoolId: product.schoolId || "", // Add schoolId
                                  });
                                }}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
