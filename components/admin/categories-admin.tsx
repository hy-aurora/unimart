"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Id } from "@/convex/_generated/dataModel";
import { GenericId } from "convex/values";

export function CategoriesAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState<{
    _id: Id<"categories">;
    name: string;
    description?: string;
  } | null>(null);

  const categories = useQuery(api.categories.getAllCategories);
  const addCategory = useMutation(api.categories.addCategory);
  const updateCategory = useMutation(api.categories.updateCategory);
  const removeCategory = useMutation(api.categories.removeCategory);

  const handleAddOrUpdateCategory = async () => {
    if (editingCategory) {
      await updateCategory({
        categoryId: editingCategory._id,
        name,
        description,
      });
    } else {
      await addCategory({
        name,
        description,
        createdAt: Date.now(),
      });
    }
    setName("");
    setDescription("");
    setEditingCategory(null);
  };

  const handleEdit = (category: { _id: Id<"categories">; name: string; description?: string } | null) => {
    setEditingCategory(category);
    if (category) {
      setName(category.name);
      setDescription(category.description || "");
    }
  };

  const handleDelete = async (categoryId: GenericId<"categories">) => {
    await removeCategory({ categoryId });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Manage Categories</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description (optional)"
          />
        </div>
        <Button onClick={handleAddOrUpdateCategory}>
          {editingCategory ? "Update Category" : "Add Category"}
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description || "N/A"}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEdit(category)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
