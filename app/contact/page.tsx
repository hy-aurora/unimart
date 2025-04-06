"use client"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState("general")

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Have a question or need assistance? We're here to help. Fill out the form below and we'll get back to you as
            soon as possible.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+44 (0) 123 456 7890</p>
                <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm GMT</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">support@unimart.com</p>
                <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400">Address</h3>
                <p className="text-gray-600 dark:text-gray-300">123 Business Street</p>
                <p className="text-gray-600 dark:text-gray-300">London, EC1A 1BB</p>
                <p className="text-sm text-gray-500">United Kingdom</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <Label htmlFor="enquiry-type" className="text-indigo-900 dark:text-indigo-300">
                Enquiry Type
              </Label>
              <RadioGroup
                value={enquiryType}
                onValueChange={setEnquiryType}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="general" id="general" className="mr-2" />
                  <Label htmlFor="general">General Enquiry</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="order" id="order" className="mr-2" />
                  <Label htmlFor="order">Order Support</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="school" id="school" className="mr-2" />
                  <Label htmlFor="school">School Partnership</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="other" id="other" className="mr-2" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-indigo-900 dark:text-indigo-300">
                  Name
                </Label>
                <Input id="name" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="email" className="text-indigo-900 dark:text-indigo-300">
                  Email
                </Label>
                <Input id="email" type="email" className="mt-1" required />
              </div>
            </div>

            {enquiryType === "order" && (
              <div>
                <Label htmlFor="order-number" className="text-indigo-900 dark:text-indigo-300">
                  Order Number
                </Label>
                <Input id="order-number" className="mt-1" placeholder="e.g., ORD-123456" />
              </div>
            )}

            {enquiryType === "school" && (
              <div>
                <Label htmlFor="school-name" className="text-indigo-900 dark:text-indigo-300">
                  School Name
                </Label>
                <Input id="school-name" className="mt-1" />
              </div>
            )}

            <div>
              <Label htmlFor="message" className="text-indigo-900 dark:text-indigo-300">
                Message
              </Label>
              <Textarea id="message" className="mt-1" rows={5} required />
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}