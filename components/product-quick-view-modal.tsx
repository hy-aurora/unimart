"use client";

import React, { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button,
  Spinner,
  Chip,
  Tabs,
  Tab
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
}

export function ProductQuickViewModal({ isOpen, onClose, productId }: ProductQuickViewModalProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  // Reset state when modal opens with a new product
  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedSize("");
    }
  }, [isOpen, productId]);
  
  // Fetch product details
  const product = useQuery(
    api.products.getProduct, 
    productId ? { id: productId as Id<"products"> } : "skip"
  );
  
  // Get school info if available
  const school = useQuery(
    api.schools.getSchool,
    product?.schoolId ? { id: product.schoolId } : "skip"
  );
  
  // Add to cart mutation
  const addItemToCart = useMutation(api.carts.addItem);
  
  const handleAddToCart = async () => {
    if (!product || !productId) return;
    
    try {
      await addItemToCart({
        productId: product._id,
        quantity,
        size: selectedSize || undefined,
      });
      toast.success("Item added to cart");
      onClose();
    } catch (error) {
      console.error("Failed to add item:", error);
      toast.error("Failed to add item to cart");
    }
  };

  // View product details
  const viewProductDetails = () => {
    if (product) {
      router.push(`/products/${product.id}`);
      onClose();
    }
  };

  if (!isOpen || !productId) return null;
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {!product ? (
          <div className="p-8 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ModalHeader>
              <h2 className="text-xl font-bold">{product.name}</h2>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrls[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isSale && (
                    <Chip 
                      color="danger" 
                      className="absolute top-2 right-2"
                    >
                      Sale
                    </Chip>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="space-y-4">
                  {school && (
                    <Chip color="primary" variant="flat" className="mb-2">
                      {school.name}
                    </Chip>
                  )}
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg line-through text-gray-400">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Short description */}
                  <p className="text-gray-600">{product.description}</p>
                  
                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="size-select">Select Size</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <div className="flex items-center">
                      <Button
                        isIconOnly
                        variant="bordered"
                        className="rounded-r-none"
                        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                      >
                        <Icon icon="lucide:minus" />
                      </Button>
                      <div className="px-4 py-2 border-y border-x-0 flex items-center justify-center w-12">
                        {quantity}
                      </div>
                      <Button
                        isIconOnly
                        variant="bordered"
                        className="rounded-l-none"
                        onPress={() => setQuantity(quantity + 1)}
                      >
                        <Icon icon="lucide:plus" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Add to cart button */}
                  <div className="pt-4">
                    <Button
                      color="primary"
                      className="w-full"
                      size="lg"
                      onPress={handleAddToCart}
                    >
                      <Icon icon="lucide:shopping-bag" className="mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Product details tabs */}
              <div className="mt-8">
                <Tabs>
                  <Tab key="details" title="Details & Care">
                    <div className="p-4">
                      {product.detailsAndCare?.materials && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-1">Materials</h4>
                          <p>{product.detailsAndCare.materials}</p>
                        </div>
                      )}
                      
                      {product.detailsAndCare?.careInstructions && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-1">Care Instructions</h4>
                          <ul className="list-disc pl-5">
                            {product.detailsAndCare.careInstructions.map((instruction, i) => (
                              <li key={i}>{instruction}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {product.detailsAndCare?.additionalInfo && (
                        <div>
                          <h4 className="font-medium mb-1">Additional Information</h4>
                          <p>{product.detailsAndCare.additionalInfo}</p>
                        </div>
                      )}
                      
                      {(!product.detailsAndCare?.materials && 
                        !product.detailsAndCare?.careInstructions && 
                        !product.detailsAndCare?.additionalInfo) && (
                        <p className="text-gray-500">No detailed information available for this product.</p>
                      )}
                    </div>
                  </Tab>
                  <Tab key="sizing" title="Size Guide">
                    <div className="p-4">
                      <p className="mb-4">
                        Please refer to our size guide to find the perfect fit for your child.
                      </p>
                      {product.allowCustomSize && (
                        <div className="bg-primary-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-1">Custom Sizing Available</h4>
                          <p className="text-sm">
                            This product is eligible for custom sizing. View full product details for more information.
                          </p>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="bordered" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" variant="light" onPress={viewProductDetails}>
                View Full Details
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
