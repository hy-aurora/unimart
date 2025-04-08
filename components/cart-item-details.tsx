import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CartItem {
  productId: string;
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
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">
        Size: {item.size || "Custom"}, Quantity: {item.quantity}
      </p>

      {item.customSize && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="text-xs text-indigo-600 dark:text-indigo-400 p-0 h-auto"
            >
              View Custom Measurements
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Custom Measurements</DialogTitle>
              <DialogDescription>
                This item has custom measurements.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {item.customSize.chest && (
                <div>
                  <p className="text-sm font-medium">Chest:</p>
                  <p className="text-sm">{item.customSize.chest} cm</p>
                </div>
              )}
              {/* ...other custom size fields... */}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
