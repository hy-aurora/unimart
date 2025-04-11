"use client";
import React, { useState } from 'react';
import { Button, Card, CardBody, Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';

export default function SizeGuideSection() {
  const bookAppointment = useMutation(api.contactQueries.bookSizingAppointment);
  const schools = useQuery(api.schools.getAll);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.school) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await bookAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        school: formData.school as Id<"schools">
      });
      // Removing the duplicate call to bookAppointment that was causing the type error
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        school: ''
      });
      
      setFormSuccess(true);
      
      toast.success("Appointment requested!", {
        description: "We'll contact you soon to confirm the details.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment", {
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="relative py-20 bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://img.heroui.chat/image/fashion?w=1920&h=600&u=51"
            alt="Custom Sizing"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Custom Sizing Service
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Get the perfect fit with our professional measurement and alteration service.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary-900"
              endContent={<Icon icon="lucide:arrow-right" />}
              onPress={() => document.getElementById('booking-form')?.scrollIntoView({behavior: 'smooth'})}
            >
              Book Appointment
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "lucide:ruler",
                title: "Professional Measurement",
                description: "Our trained staff will take accurate measurements to ensure the perfect fit."
              },
              {
                icon: "lucide:scissors",
                title: "Free Alterations",
                description: "Complimentary alterations service included with your uniform purchase."
              },
              {
                icon: "lucide:check-circle",
                title: "Perfect Fit Guarantee",
                description: "We guarantee your satisfaction with the final fit of your uniform."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="dark:bg-dark-card dark:border-dark-border">
                  <CardBody className="text-center p-6">
                    <div className="mb-4 inline-flex p-3 bg-primary-100 rounded-full">
                      <Icon icon={feature.icon} className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-dark-gray-400">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Book an Appointment",
                    description: "Schedule a convenient time for your measurement session."
                  },
                  {
                    title: "Get Measured",
                    description: "Our professionals will take detailed measurements."
                  },
                  {
                    title: "Alterations",
                    description: "If needed, we'll alter your uniform for the perfect fit."
                  },
                  {
                    title: "Final Fitting",
                    description: "Try on your perfectly fitted uniform."
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-500 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-dark-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id="booking-form"
            >
              <Card className="dark:bg-dark-card dark:border-dark-border">
                <CardBody className="p-6">
                  {formSuccess ? (
                    <div className="text-center py-8">
                      <div className="mb-4 inline-flex p-3 bg-green-100 rounded-full">
                        <Icon icon="lucide:check" className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Appointment Requested!</h3>
                      <p className="text-gray-600 dark:text-dark-gray-400 mb-6">
                        Thank you for booking a sizing appointment. We'll contact you soon to confirm the details.
                      </p>
                      <Button
                        color="primary"
                        onPress={() => setFormSuccess(false)}
                      >
                        Book Another Appointment
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3 className="text-xl font-semibold mb-4">Book Your Session</h3>
                      <div className="space-y-4">
                        <Input
                          type="text"
                          name="name"
                          label="Your Name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          isRequired
                        />
                        <Input
                          type="email"
                          name="email"
                          label="Email Address"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          isRequired
                        />
                        <Input
                          type="tel"
                          name="phone"
                          label="Phone Number"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          isRequired
                        />
                        <Select
                          name="school"
                          label="Select Your School"
                          placeholder="Choose your school"
                          value={formData.school}
                          onChange={handleChange}
                          isRequired
                          isDisabled={schools === undefined}
                        >
                          {schools === undefined ? (
                            <SelectItem key="loading">
                              Loading schools...
                            </SelectItem>
                          ) : schools.length === 0 ? (
                            <SelectItem key="none">
                              No schools available
                            </SelectItem>
                          ) : (
                            schools.map(school => (
                              <SelectItem key={school._id} >
                                {school.name}
                              </SelectItem>
                            ))
                          )}
                        </Select>
                        <Button
                          type="submit"
                          color="primary"
                          fullWidth
                          size="lg"
                          isLoading={isSubmitting}
                          isDisabled={isSubmitting || schools === undefined}
                        >
                          Schedule Appointment
                        </Button>
                      </div>
                    </form>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}