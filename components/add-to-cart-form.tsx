"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Id } from '../convex/_generated/dataModel';

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  colors: string[];
  school: string;
}

const classOptions = ["Class 1", "Class 2", "Class 3", "Year 1", "Year 2", "Year 3"];

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedClass, setSelectedClass] = useState("");
  const [useCustomMeasurements, setUseCustomMeasurements] = useState(false);
  const [customMeasurements, setCustomMeasurements] = useState({
    chest: undefined,
    waist: undefined,
    hips: undefined,
    height: undefined,
    sleeve: undefined,
    inseam: undefined,
  });

  const addItemToCart = useMutation(api.carts.addItem);
  const productId = product.id as Id<"products">;
  const handleAddToCart = async () => {
    try {
      await addItemToCart({
        productId: productId,
        quantity,
        size: useCustomMeasurements ? undefined : selectedSize,
        customSize: useCustomMeasurements ? customMeasurements : undefined,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleCustomMeasurementChange = (
    field: string,
    value: number | null
  ) => {
    setCustomMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label
          htmlFor="class"
          className="text-base font-medium text-indigo-900 dark:text-indigo-400 mb-2 block"
        >
          Select Class/Year Group
        </Label>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select class/year" />
          </SelectTrigger>
          <SelectContent>
            {classOptions.map((classOption) => (
              <SelectItem key={classOption} value={classOption}>
                {classOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="color"
          className="text-base font-medium text-indigo-900 dark:text-indigo-400 mb-2 block"
        >
          Color
        </Label>
        <RadioGroup
          id="color"
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex items-center gap-2"
        >
          {product.colors.map((color) => (
            <Label
              key={color}
              htmlFor={`color-${color.toLowerCase()}`}
              className={`border cursor-pointer rounded-md p-2 flex items-center gap-2 ${
                selectedColor === color
                  ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-700"
                  : ""
              }`}
            >
              <RadioGroupItem
                id={`color-${color.toLowerCase()}`}
                value={color}
              />
              {color}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label
            htmlFor="size"
            className="text-base font-medium text-indigo-900 dark:text-indigo-400 mb-2"
          >
            Size
          </Label>
          <div className="flex items-center">
            <Checkbox
              id="custom-measurements"
              checked={useCustomMeasurements}
              onCheckedChange={(checked) =>
                setUseCustomMeasurements(checked === true)
              }
            />
            <label
              htmlFor="custom-measurements"
              className="ml-2 text-sm text-gray-600 dark:text-gray-300"
            >
              Use custom measurements
            </label>
          </div>
        </div>

        {!useCustomMeasurements ? (
          <>
            <RadioGroup
              id="size"
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="flex items-center gap-2"
            >
              {product.sizes.map((size) => (
                <Label
                  key={size}
                  htmlFor={`size-${size.toLowerCase()}`}
                  className={`border cursor-pointer rounded-md p-2 flex items-center gap-2 ${
                    selectedSize === size
                      ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-700"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    id={`size-${size.toLowerCase()}`}
                    value={size}
                  />
                  {size}
                </Label>
              ))}
            </RadioGroup>
            <Link
              href="/size-guide"
              className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 inline-block"
            >
              Size Guide
            </Link>
          </>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="custom-measurements">
              <AccordionTrigger className="text-indigo-600 dark:text-indigo-400">
                Enter Custom Measurements
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="chest" className="text-sm">
                      Chest (cm)
                    </Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="e.g., 90"
                      onChange={(e) =>
                        handleCustomMeasurementChange(
                          "chest",
                          Number(e.target.value) || null
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="waist" className="text-sm">
                      Waist (cm)
                    </Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="e.g., 75"
                      onChange={(e) =>
                        handleCustomMeasurementChange(
                          "waist",
                          Number(e.target.value) || null
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="hips" className="text-sm">
                      Hips (cm)
                    </Label>
                    <Input
                      id="hips"
                      type="number"
                      placeholder="e.g., 95"
                      onChange={(e) =>
                        handleCustomMeasurementChange(
                          "hips",
                          Number(e.target.value) || null
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-sm">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 170"
                      onChange={(e) =>
                        handleCustomMeasurementChange(
                          "height",
                          Number(e.target.value) || null
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="sleeve" className="text-sm">
                      Sleeve Length (cm)
                    </Label>
                    <Input
                      id="sleeve"
                      type="number"
                      placeholder="e.g., 60"
                      onChange={(e) =>
                        handleCustomMeasurementChange(
                          "sleeve",
                          Number(e.target.value) || null
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="inseam" className="text-sm">
                      Inseam (cm)
                    </Label>
                    <Input
                      id="inseam"
                      type="number"
                      placeholder="e.g., 80"
                      onChange={(e) =>
                        handleCustomMeasurementChange(
                          "inseam",
                          Number(e.target.value) || null
                        )
                      }
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Our tailors will create a custom-fit uniform based on these
                  measurements. Please allow an additional 7-10 days for
                  delivery of custom items.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>

      <div>
        <Label
          htmlFor="quantity"
          className="text-base font-medium text-indigo-900 dark:text-indigo-400 mb-2 block"
        >
          Quantity
        </Label>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-indigo-200"
            onClick={decreaseQuantity}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <div className="w-12 h-10 flex items-center justify-center border-y border-indigo-200">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-indigo-200"
            onClick={increaseQuantity}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <Button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          size="lg"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
        >
          <Heart className="mr-2 h-5 w-5" />
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
}
