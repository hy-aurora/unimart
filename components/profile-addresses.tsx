"use client"

import { useState } from "react"
import { Edit, Home, Plus, Trash2 } from "lucide-react"

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

export function ProfileAddresses() {
  // Mock addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Smith",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "London",
      postalCode: "EC1A 1BB",
      country: "United Kingdom",
      isDefault: true,
      type: "home",
    },
    {
      id: 2,
      name: "John Smith",
      line1: "456 School Road",
      line2: "",
      city: "London",
      postalCode: "SW1A 1AA",
      country: "United Kingdom",
      isDefault: false,
      type: "school",
    },
  ])

  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }])
    setIsAddingAddress(false)
  }

  const handleEditAddress = (updatedAddress) => {
    setAddresses(addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr)))
    setEditingAddress(null)
  }

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">My Addresses</h2>
        <Button onClick={() => setIsAddingAddress(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

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
                <Home
                  className={`h-5 w-5 ${
                    address.type === "home"
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                />
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
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddressDialog
        isOpen={isAddingAddress}
        onClose={() => setIsAddingAddress(false)}
        onSave={handleAddAddress}
        title="Add New Address"
      />

      <AddressDialog
        isOpen={!!editingAddress}
        onClose={() => setEditingAddress(null)}
        onSave={handleEditAddress}
        title="Edit Address"
        address={editingAddress}
      />
    </div>
  )
}

function AddressDialog({ isOpen, onClose, onSave, title, address = null }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
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
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label className="text-indigo-900 dark:text-indigo-300 flex items-center space-x-2">
                <Checkbox
                  id="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked })}
                />
                <span>Set as Default Address</span>
              </Label>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

