"use client"

import { useState } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    schoolName: "",
    message: ""
  })

  // Get the mutation to add a contact query
  const addContactQuery = useMutation(api.contactQueries.add)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare subject based on enquiry type
      let subject = `${enquiryType.charAt(0).toUpperCase() + enquiryType.slice(1)} Enquiry`
      
      if (enquiryType === "order" && formData.orderNumber) {
        subject += ` - Order #${formData.orderNumber}`
      } else if (enquiryType === "school" && formData.schoolName) {
        subject += ` - ${formData.schoolName}`
      }

      // Append any additional info to the message
      let fullMessage = formData.message
      if (enquiryType === "order" && formData.orderNumber) {
        fullMessage = `Order Number: ${formData.orderNumber}\n\n${fullMessage}`
      } else if (enquiryType === "school" && formData.schoolName) {
        fullMessage = `School Name: ${formData.schoolName}\n\n${fullMessage}`
      }

      // Submit the contact query
      await addContactQuery({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject,
        message: fullMessage
      })

      // Show success message
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        orderNumber: "",
        schoolName: "",
        message: ""
      })
      setEnquiryType("general")
      
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to send message", {
        description: "Please try again later."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-indigo-900 dark:text-indigo-300">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1" 
                  required 
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-indigo-900 dark:text-indigo-300">
                Phone (Optional)
              </Label>
              <Input 
                id="phone" 
                type="tel" 
                value={formData.phone}
                onChange={handleChange}
                className="mt-1" 
              />
            </div>

            {enquiryType === "order" && (
              <div>
                <Label htmlFor="orderNumber" className="text-indigo-900 dark:text-indigo-300">
                  Order Number
                </Label>
                <Input 
                  id="orderNumber" 
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="mt-1" 
                  placeholder="e.g., ORD-123456" 
                />
              </div>
            )}

            {enquiryType === "school" && (
              <div>
                <Label htmlFor="schoolName" className="text-indigo-900 dark:text-indigo-300">
                  School Name
                </Label>
                <Input 
                  id="schoolName" 
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="mt-1" 
                />
              </div>
            )}

            <div>
              <Label htmlFor="message" className="text-indigo-900 dark:text-indigo-300">
                Message
              </Label>
              <Textarea 
                id="message" 
                value={formData.message}
                onChange={handleChange}
                className="mt-1" 
                rows={5} 
                required 
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}