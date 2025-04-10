"use client"
import React from 'react';
import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { HeroCarousel } from '@/components/hero-carousel';
import SizeGuideSection from '@/components/custom-sizing';
import { FeaturedProducts } from '@/components/featured-products';
import TestimonialsSection from '@/components/testimonial';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Why Choose Our Uniforms?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-dark-gray-400">
              We partner with schools to provide high-quality uniforms with a seamless ordering experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "lucide:shield",
                title: "Quality Assured",
                description: "Premium materials and strict quality control for durability."
              },
              {
                icon: "lucide:ruler",
                title: "Perfect Fit",
                description: "Custom sizing service available for the perfect fit."
              },
              {
                icon: "lucide:truck",
                title: "Fast Delivery",
                description: "Quick and reliable shipping to your doorstep."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full dark:bg-dark-card dark:border-dark-border">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <Icon icon={feature.icon} className="w-6 h-6 text-primary-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <SizeGuideSection />

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular school uniform items
            </p>
          </motion.div>

          <FeaturedProducts />

          <div className="text-center mt-12">
            <Button 
              color="primary"
              size="lg"
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Find your school and start shopping for quality uniforms today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary-900"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                Find Your School
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="text-white border-white"
              >
                Browse Catalog
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}