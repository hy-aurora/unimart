import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  color: string
  class: string
  customMeasurements: any | null
}

export function CartItemDetails({ item }: { item: CartItem }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">
        Size: {item.size}, Color: {item.color}, Class: {item.class}
      </p>

      {item.customMeasurements ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-xs text-indigo-600 dark:text-indigo-400 p-0 h-auto">
              View Custom Measurements
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Custom Measurements</DialogTitle>
              <DialogDescription>This item has been ordered with custom measurements.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium">Chest:</p>
                <p className="text-sm">{item.customMeasurements.chest} cm</p>
              </div>
              <div>
                <p className="text-sm font-medium">Waist:</p>
                <p className="text-sm">{item.customMeasurements.waist} cm</p>
              </div>
              <div>
                <p className="text-sm font-medium">Hips:</p>
                <p className="text-sm">{item.customMeasurements.hips} cm</p>
              </div>
              <div>
                <p className="text-sm font-medium">Height:</p>
                <p className="text-sm">{item.customMeasurements.height} cm</p>
              </div>
              <div>
                <p className="text-sm font-medium">Sleeve Length:</p>
                <p className="text-sm">{item.customMeasurements.sleeve} cm</p>
              </div>
              <div>
                <p className="text-sm font-medium">Inseam:</p>
                <p className="text-sm">{item.customMeasurements.inseam} cm</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  )
}

