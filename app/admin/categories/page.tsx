"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AdminLayout } from "@/components/admin-layout";

export default function CategoriesPage() {
  const categories = useQuery(api.categories.getAllCategories) || [];
  const addCategory = useMutation(api.categories.addCategory);

  const [formState, setFormState] = useState({ name: "", description: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = async () => {
    await addCategory({ ...formState, createdAt: Date.now() });
    setFormState({ name: "", description: "" });
  };

  return (
    <AdminLayout>
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Category name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Category description"
                ></textarea>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Existing Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="py-2 border-b last:border-none">
                {category.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
</AdminLayout>
  );
}
