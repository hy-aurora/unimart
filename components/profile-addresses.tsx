"use client"

import { useState, useEffect } from "react"
import { Edit, Home, Plus, Trash2, Building } from "lucide-react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileAddresses() {
  // Get user data from Convex
  const userData = useQuery(api.users.get);
  
  // Convex mutations
  const addAddress = useMutation(api.users.addAddress);
  const updateAddress = useMutation(api.users.updateAddress);
  const deleteAddress = useMutation(api.users.deleteAddress);
  
  // Local state
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update local addresses when user data loads
  useEffect(() => {
    if (userData && userData.address) {
      setAddresses(Array.isArray(userData.address) ? userData.address : []);
    }
  }, [userData]);

  const handleAddAddress = async (newAddress: any) => {
    setIsLoading(true);
    try {
      await addAddress(newAddress);
      toast.success("Address added successfully");
      setIsAddingAddress(false);
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = async (updatedAddress: any) => {
    setIsLoading(true);
    try {
      await updateAddress({
        addressId: updatedAddress.id,
        ...updatedAddress
      });
      toast.success("Address updated successfully");
      setEditingAddress(null);
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteAddress({ addressId: id });
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    setIsLoading(true);
    try {
      await updateAddress({ 
        addressId: id,
        isDefault: true
      });
      toast.success("Default address updated");
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to update default address");
    } finally {
      setIsLoading(false);
    }
  };

  if (userData === undefined) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">My Addresses</h2>
        <Button 
          onClick={() => setIsAddingAddress(true)} 
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-gray-500">You haven't added any addresses yet.</p>
          <Button 
            onClick={() => setIsAddingAddress(true)} 
            variant="outline" 
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-6 relative ${
                address.isDefault ? "border-indigo-200 dark:border-indigo-800" : ""
              }`}
            >
              {address.isDefault && (
                <span className="absolute top-2 right-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                  Default
                </span>
              )}

              <div className="flex items-start mb-4">
                <div
                  className={`p-2 rounded-full ${
                    address.type === "home" ? "bg-indigo-100 dark:bg-indigo-900" : "bg-green-100 dark:bg-green-900"
                  }`}
                >
                  {address.type === "home" ? (
                    <Home className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-indigo-900 dark:text-indigo-400">{address.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{address.type} Address</p>
                </div>
              </div>

              <div className="space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                  onClick={() => setEditingAddress(address)}
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>

                {!address.isDefault && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                      onClick={() => handleSetDefault(address.id)}
                      disabled={isLoading}
                    >
                      Set as Default
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressDialog
        isOpen={isAddingAddress}
        onClose={() => setIsAddingAddress(false)}
        onSave={handleAddAddress}
        title="Add New Address"
        isProcessing={isLoading}
      />

      <AddressDialog
        isOpen={!!editingAddress}
        onClose={() => setEditingAddress(null)}
        onSave={handleEditAddress}
        title="Edit Address"
        address={editingAddress}
        isProcessing={isLoading}
      />
    </div>
  )
}

function AddressDialog({ isOpen, onClose, onSave, title, address, isProcessing }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void; 
  title: string; 
  address?: any; 
  isProcessing?: boolean;
}) {
  const [formData, setFormData] = useState(
    address || {
      name: "",
      line1: "",
      line2: "",
      city: "",
      postalCode: "",
      country: "United Kingdom",
      isDefault: false,
      type: "home",
    },
  )

  // Reset form data when address changes
  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        name: "",
        line1: "",
        line2: "",
        city: "",
        postalCode: "",
        country: "United Kingdom",
        isDefault: false,
        type: "home",
      });
    }
  }, [address, isOpen]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleTypeChange = (value: string) => {
    setFormData({ ...formData, type: value });
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-indigo-900 dark:text-indigo-400">{title}</DialogTitle>
          <DialogDescription>Fill in the address details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name" className="text-indigo-900 dark:text-indigo-300">
                Full Name
              </Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1" required />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="type" className="text-indigo-900 dark:text-indigo-300">
                Address Type
              </Label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select address type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="line1" className="text-indigo-900 dark:text-indigo-300">
                Address Line 1
              </Label>
              <Input id="line1" name="line1" value={formData.line1} onChange={handleChange} className="mt-1" required />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="line2" className="text-indigo-900 dark:text-indigo-300">
                Address Line 2 (Optional)
              </Label>
              <Input id="line2" name="line2" value={formData.line2} onChange={handleChange} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="city" className="text-indigo-900 dark:text-indigo-300">
                City
              </Label>
              <Input id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1" required />
            </div>

            <div>
              <Label htmlFor="postalCode" className="text-indigo-900 dark:text-indigo-300">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="country" className="text-indigo-900 dark:text-indigo-300">
                Country
              </Label>
              <Select 
                value={formData.country} 
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label className="text-indigo-900 dark:text-indigo-300 flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => setFormData({ ...formData, isDefault: !!checked })}
                />
                <span>Set as Default Address</span>
              </Label>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={isProcessing}
          >
            {isProcessing ? "Saving..." : "Save Address"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

