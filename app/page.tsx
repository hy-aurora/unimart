"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, School, Star, Truck, Ruler, Shield, Users, ShoppingBag, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section - Enhanced with full width */}
      <section className="w-full bg-gradient-to-b from-indigo-100 to-white dark:from-indigo-950 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] dark:bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>
        <HeroCarousel />
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">Our Advantages</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900 dark:text-indigo-200 relative">
                Why Choose UniMart?
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-600 dark:bg-indigo-400 rounded hidden md:block"></span>
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                We partner with schools to provide high-quality uniforms with a seamless ordering experience.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { 
                icon: <School className="h-8 w-8 text-indigo-600" />, 
                title: "School Partnerships", 
                description: "Direct partnerships ensure uniform compliance and quality standards." 
              },
              { 
                icon: <Ruler className="h-8 w-8 text-indigo-600" />, 
                title: "Custom Sizing", 
                description: "Perfect fit guaranteed with our custom measurement service." 
              },
              { 
                icon: <Shield className="h-8 w-8 text-indigo-600" />, 
                title: "Quality Assured", 
                description: "Premium materials and strict quality control for durability." 
              },
              { 
                icon: <Truck className="h-8 w-8 text-indigo-600" />, 
                title: "Fast Delivery", 
                description: "Quick and reliable shipping to your doorstep or school."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center space-y-3 border dark:border-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 hover:border-indigo-200 dark:hover:border-indigo-700 group"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-300">
                  <div className="text-indigo-600 dark:text-indigo-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Sizing Promotion */}
      <section className="w-full py-12 md:py-20 bg-indigo-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 dark:bg-indigo-800 rounded-full -mt-32 -mr-32 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200 dark:bg-indigo-800 rounded-full -mb-32 -ml-32 opacity-40"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            className="grid gap-8 md:grid-cols-2 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn}>
              <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3">Perfect Fit</span>
              <h2 className="text-3xl font-bold mb-4 text-indigo-900 dark:text-indigo-200">Perfect Fit Guarantee</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get uniforms tailored to your exact measurements. Our custom sizing service ensures comfort and confidence
                for every student.
              </p>
              <ul className="space-y-4">
                {[
                  "Professional measurement guidance",
                  "Precise tailoring to your specifications",
                  "Alterations if needed",
                  "Quality materials that last",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300">
                <Link href="/size-guide" className="flex items-center gap-2">
                  Learn About Custom Sizing <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden shadow-xl dark:shadow-indigo-500/10"
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/perfect-fit.jpg"
                alt="Custom Sizing"
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 opacity-0 dark:opacity-100"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">Shop Now</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900 dark:text-indigo-200 relative">
                Featured Products
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-600 dark:bg-indigo-400 rounded hidden md:block"></span>
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Discover our most popular and highest quality school uniform items
              </p>
            </div>
          </motion.div>
          <FeaturedProducts />
          <div className="flex justify-center mt-12">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600">
              <Link href="/catalog" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" /> View All Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">Our Partners</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900 dark:text-indigo-200 relative">
                Featured Schools
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-600 dark:bg-indigo-400 rounded hidden md:block"></span>
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Browse uniforms from our partner schools or search for your school.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div key={i} variants={fadeIn}>
                <Link href={`/schools/school-${i}`} className="group block">
                  <div className="flex flex-col items-center space-y-4 border dark:border-gray-700 p-6 rounded-xl transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800 hover:border-indigo-200 dark:hover:border-indigo-600">
                    <div className="relative w-24 h-24 overflow-hidden rounded-full border-4 border-indigo-100 dark:border-indigo-800 group-hover:border-indigo-200 dark:group-hover:border-indigo-700 transition-colors duration-300">
                      <Image
                        src={`/images/placeholder.webp`}
                        alt={`School ${i}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">School {i}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View Uniforms</p>
                    <Button
                      variant="outline"
                      className="mt-2 w-full border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors duration-300"
                    >
                      Browse Collection
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center mt-10">
            <Button asChild variant="outline" className="border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
              <Link href="/schools" className="flex items-center gap-2">
                View All Schools <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">Testimonials</span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900 dark:text-indigo-200 relative">
                What Parents Say
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-600 dark:bg-indigo-400 rounded hidden md:block"></span>
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                Don't just take our word for it. Here's what parents have to say about our service.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                name: "Sarah Johnson",
                role: "Parent",
                content:
                  "The quality of the uniforms is excellent, and the ordering process was so simple. My kids' uniforms arrived well before the school year started.",
                avatar: "/images/placeholder.webp",
              },
              {
                name: "Michael Chen",
                role: "Parent",
                content:
                  "I love that I can order all my children's uniforms in one place, even though they attend different schools. The size guide was very helpful.",
                avatar: "/images/placeholder.webp",
              },
              {
                name: "Priya Sharma",
                role: "Parent & PTA Member",
                content:
                  "As a PTA member, I appreciate how they work with our school to ensure all uniform requirements are met. The quality is consistent and the prices are reasonable.",
                avatar: "/images/placeholder.webp",
              },
            ].map((testimonial, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col space-y-4 border p-6 rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">{testimonial.content}</p>
                <div className="flex items-center space-x-3 pt-4 border-t dark:border-gray-700">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900 dark:text-indigo-200">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* School Partnership */}
      <section className="w-full py-12 md:py-20 bg-indigo-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] dark:bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>
        <div className="container px-4 md:px-6">
          <motion.div 
            className="grid gap-8 md:grid-cols-2 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            <motion.div 
              className="relative aspect-square rounded-xl overflow-hidden shadow-md dark:shadow-indigo-900/20"
              variants={fadeIn}
            >
              <Image
                src="/images/partner-with-us.jpg"
                alt="School Partnership"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-indigo-900/0 dark:bg-indigo-900/20 hover:bg-indigo-900/10 dark:hover:bg-indigo-900/30 transition-colors duration-300"></div>
            </motion.div>
            <motion.div variants={fadeIn}>
              <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-3">Partnership</span>
              <h2 className="text-3xl font-bold mb-4 text-indigo-900 dark:text-indigo-200">Partner With UniMart</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join our network of partner schools and provide your students with high-quality uniforms and exceptional
                service.
              </p>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Quality Assurance</h3>
                    <p className="text-gray-600 dark:text-gray-300">Consistent quality and compliance with school uniform policies.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Dedicated Support</h3>
                    <p className="text-gray-600 dark:text-gray-300">Personal account manager and priority customer service.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg">
                    <Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-200">Efficient Distribution</h3>
                    <p className="text-gray-600 dark:text-gray-300">Direct delivery to school or individual student addresses.</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-white">
                <Link href="/contact">Become a Partner School</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="w-full py-16 md:py-24 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-800"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed opacity-90">
                Find your school and start shopping for quality uniforms today.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row mt-8">
              <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-6 text-lg">
                <Link href="/schools" className="flex items-center gap-2">
                  Find Your School <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent px-8 py-6 text-lg">
                <Link href="/catalog" className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" /> Browse Catalog
                </Link>
              </Button>
            </div>
            <p className="text-indigo-200 mt-6">Join thousands of satisfied parents and schools</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}