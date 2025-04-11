"use client"
import React, { useState, useRef } from 'react';
import { Button, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { HeroCarousel } from '@/components/hero-carousel';
import SizeGuideSection from '@/components/custom-sizing';
import TestimonialsSection from '@/components/testimonial';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import { DynamicFeaturedProducts } from '@/components/dynamic-featured-products';
import { SchoolFinderModal } from '@/components/school-finder-modal';
import { ProductQuickViewModal } from '@/components/product-quick-view-modal';
import { useQuery } from 'convex/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function HomePage() {
  // State for modals
  const [isSchoolFinderOpen, setIsSchoolFinderOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const schoolCarouselRef = useRef<HTMLDivElement>(null);

  // Fetch featured schools for the hero section
  const featuredSchools = useQuery(api.schools.getFeaturedSchools, {});

  // Handle product quick view
  const handleQuickView = (productId: string) => {
    setSelectedProductId(productId);
    setIsQuickViewOpen(true);
  };

  // Scroll function for school carousel
  const scrollSchoolCarousel = (direction: 'left' | 'right') => {
    if (schoolCarouselRef.current) {
      const { scrollLeft, clientWidth } = schoolCarouselRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;

      schoolCarouselRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  // Determine if schools should use carousel
  const useSchoolCarousel = featuredSchools && featuredSchools.length > 3;

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

          <DynamicFeaturedProducts onQuickView={handleQuickView} />

          <div className="text-center mt-12">
            <Button
              color="primary"
              size="lg"
              endContent={<Icon icon="lucide:arrow-right" />}
              as="a"
              href="/products"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Schools Section */}
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
              Our Partner Schools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto dark:text-dark-gray-400">
              We partner with top educational institutions to provide high-quality uniforms that meet school standards
            </p>
          </motion.div>

          <div className="relative">
            {!featuredSchools ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(3).fill(0).map((_, index) => (
                  <Card key={index} className="overflow-hidden h-full dark:bg-dark-card dark:border-dark-border">
                    <div className="flex flex-col">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <Skeleton className="h-16 w-16 rounded-full mr-4" />
                          <div className="flex-1">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                        <Skeleton className="h-20 w-full mb-4" />
                        <Skeleton className="h-10 w-2/3 mx-auto" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : featuredSchools.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                No partner schools available at the moment.
              </div>
            ) : useSchoolCarousel ? (
              <>
                <div
                  ref={schoolCarouselRef}
                  className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {featuredSchools.map((school, index) => (
                    <motion.div
                      key={school._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="h-full min-w-[320px] md:min-w-[380px] snap-start"
                    >
                      <Card className="overflow-hidden h-full flex flex-col dark:bg-dark-card dark:border-dark-border">
                        {/* School banner image */}
                        <div
                          className="h-48 w-full relative"
                          style={{
                            backgroundImage: `url(${school.bannerUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          {/* Featured badge */}
                          {school.featured && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="bg-yellow-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-md backdrop-blur-sm">
                                <Icon icon="lucide:star" className="w-3.5 h-3.5 mr-1.5" />
                                FEATURED
                              </span>
                            </div>
                          )}
                          {/* Gradient overlay for better text visibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                          {/* School name in banner */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="text-xl font-bold drop-shadow-md">{school.name}</h3>
                            <p className="text-sm opacity-90">{school.location}</p>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          {/* School logo and description - Fixed positioning */}
                          <div className="flex flex-col items-center mb-4">
                            {/* Larger, centered logo with proper z-index and positioning */}
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-100 bg-white shadow-lg -mt-16 mb-4 z-10 relative">
                              <img
                                src={school.logoUrl}
                                alt={`${school.name} logo`}
                                className="w-full h-full object-contain p-1"
                              />
                            </div>

                            <div className="w-full">
                              <p className="text-gray-600 text-sm dark:text-dark-gray-400 text-center">
                                {school.description || `Quality uniforms for ${school.name} students.`}
                              </p>
                            </div>
                          </div>

                          {/* Action buttons - Modified to show only View Products */}
                          <div className="mt-auto pt-4 flex justify-center">
                            <Button
                              color="primary"
                              size="md"
                              className="px-6"
                              endContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
                              as="a"
                              href={`/school/${school.slug}`}
                            >
                              View Products
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={() => scrollSchoolCarousel('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white dark:bg-dark-card rounded-full p-2 shadow-md z-10 hover:bg-gray-100 dark:hover:bg-dark-hover"
                  aria-label="Previous school"
                >
                  <Icon icon="lucide:chevron-left" className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollSchoolCarousel('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white dark:bg-dark-card rounded-full p-2 shadow-md z-10 hover:bg-gray-100 dark:hover:bg-dark-hover"
                  aria-label="Next school"
                >
                  <Icon icon="lucide:chevron-right" className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredSchools.map((school, index) => (
                  <motion.div
                    key={school._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col dark:bg-dark-card dark:border-dark-border">
                      {/* School banner image */}
                      <div
                        className="h-48 w-full relative"
                        style={{
                          backgroundImage: `url(${school.bannerUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        {/* Featured badge */}
                        {school.featured && (
                          <div className="absolute top-3 right-3 z-10">
                            <span className="bg-yellow-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-md backdrop-blur-sm">
                              <Icon icon="lucide:star" className="w-3.5 h-3.5 mr-1.5" />
                              FEATURED
                            </span>
                          </div>
                        )}
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                        {/* School name in banner */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-xl font-bold drop-shadow-md">{school.name}</h3>
                          <p className="text-sm opacity-90">{school.location}</p>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        {/* School logo and description - Fixed positioning */}
                        <div className="flex flex-col items-center mb-4">
                          {/* Larger, centered logo with proper z-index and positioning */}
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-100 bg-white shadow-lg -mt-16 mb-4 z-10 relative">
                            <img
                              src={school.logoUrl}
                              alt={`${school.name} logo`}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>

                          <div className="w-full">
                            <p className="text-gray-600 text-sm dark:text-dark-gray-400 text-center">
                              {school.description || `Quality uniforms for ${school.name} students.`}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons - Modified to show only View Products */}
                        <div className="mt-auto pt-4 flex justify-center">
                          <Button
                            color="primary"
                            size="md"
                            className="px-6"
                            endContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
                            as="a"
                            href={`/school/${school.slug}`}
                          >
                            View Products
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              color="primary"
              size="lg"
              endContent={<Icon icon="lucide:search" />}
              as="a"
              href="/schools"
            >
              View All Schools
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
                onPress={() => setIsSchoolFinderOpen(true)}
              >
                Find Your School
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="text-white border-white"
                as="a"
                href="/products"
              >
                Browse Catalog
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modals */}
      <SchoolFinderModal
        isOpen={isSchoolFinderOpen}
        onClose={() => setIsSchoolFinderOpen(false)}
      />

      <ProductQuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        productId={selectedProductId}
      />
    </div>
  );
}