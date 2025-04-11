import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
interface CartItem {
  productId: Id<"products">;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  customSize?: {
    chest?: number;
    waist?: number;
    height?: number;
    notes?: string;
  };
}

export function CartItemDetails({ item }: { item: CartItem }) {
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [editedCustomSize, setEditedCustomSize] = useState(item.customSize || {});
  const updateCartItem = useMutation(api.carts.updateItem);

  const handleCustomSizeUpdate = async () => {
    try {
      await updateCartItem({
        productId: item.productId,
        customSize: editedCustomSize
      });
      toast.success("Custom measurements updated");
      setIsEditingOpen(false);
    } catch (error) {
      toast.error("Failed to update measurements");
      console.error(error);
    }
  };

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">
        Size: {item.size || "Custom"}, Quantity: {item.quantity}
      </p>

      {item.customSize && (
        <Dialog open={isEditingOpen} onOpenChange={setIsEditingOpen}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-xs text-indigo-600 dark:text-indigo-400 p-0 h-auto flex items-center gap-1"
            >
              <span>View Custom Measurements</span>
              <Pencil className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Custom Measurements</DialogTitle>
              <DialogDescription>
                View or update your custom measurements for this item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Chest measurement */}
              <div className="space-y-2">
                <label htmlFor="chest" className="text-sm font-medium">
                  Chest (cm):
                </label>
                <Input
                  id="chest"
                  type="number"
                  value={editedCustomSize.chest || ""}
                  onChange={(e) => 
                    setEditedCustomSize({
                      ...editedCustomSize,
                      chest: e.target.value ? parseFloat(e.target.value) : undefined
                    })
                  }
                  placeholder="Enter chest size"
                />
              </div>
              
              {/* Waist measurement */}
              <div className="space-y-2">
                <label htmlFor="waist" className="text-sm font-medium">
                  Waist (cm):
                </label>
                <Input
                  id="waist"
                  type="number"
                  value={editedCustomSize.waist || ""}
                  onChange={(e) => 
                    setEditedCustomSize({
                      ...editedCustomSize,
                      waist: e.target.value ? parseFloat(e.target.value) : undefined
                    })
                  }
                  placeholder="Enter waist size"
                />
              </div>
              
              {/* Height measurement */}
              <div className="space-y-2 col-span-2">
                <label htmlFor="height" className="text-sm font-medium">
                  Height (cm):
                </label>
                <Input
                  id="height"
                  type="number"
                  value={editedCustomSize.height || ""}
                  onChange={(e) => 
                    setEditedCustomSize({
                      ...editedCustomSize,
                      height: e.target.value ? parseFloat(e.target.value) : undefined
                    })
                  }
                  placeholder="Enter height"
                />
              </div>
              
              {/* Notes */}
              <div className="space-y-2 col-span-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Special Instructions:
                </label>
                <Textarea
                  id="notes"
                  value={editedCustomSize.notes || ""}
                  onChange={(e) => 
                    setEditedCustomSize({
                      ...editedCustomSize,
                      notes: e.target.value
                    })
                  }
                  placeholder="Add any special instructions or notes..."
                  className="min-h-20"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditingOpen(false)}
                className="gap-1"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button onClick={handleCustomSizeUpdate} className="gap-1">
                <span>Update Measurements</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
