import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, School, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section */}
      <section className="w-full bg-gradient-to-b from-indigo-50 to-white">
        <HeroCarousel />
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900">
                Why Choose Us?
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We partner with schools to provide high-quality uniforms with a seamless ordering experience.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-3 bg-indigo-100 rounded-full">
                <School className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900">School Partnerships</h3>
              <p className="text-gray-600 text-center">
                We work directly with schools to ensure uniform compliance and quality.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-3 bg-indigo-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900">Quality Guaranteed</h3>
              <p className="text-gray-600 text-center">
                All our products are made with premium materials for durability and comfort.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Truck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900">Fast Delivery</h3>
              <p className="text-gray-600 text-center">
                Quick and reliable shipping to your doorstep or school pickup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900">
                Featured Products
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most popular school uniform items
              </p>
            </div>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Featured Schools */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900">
                Featured Schools
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse uniforms from our partner schools or search for your school.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href={`/schools/school-${i}`} className="group">
                <div className="flex flex-col items-center space-y-3 border p-6 rounded-lg transition-all hover:shadow-md bg-white">
                  <div className="relative w-24 h-24 overflow-hidden rounded-full border-4 border-indigo-100">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=School+${i}`}
                      alt={`School ${i}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-indigo-900">School {i}</h3>
                  <p className="text-sm text-gray-600">View Uniforms</p>
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    Browse Collection
                  </Button>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              <Link href="/schools">View All Schools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-20 bg-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-indigo-900">
                What Parents Say
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. Here's what parents have to say about our service.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                name: "Sarah Johnson",
                role: "Parent",
                content:
                  "The quality of the uniforms is excellent, and the ordering process was so simple. My kids' uniforms arrived well before the school year started.",
                avatar: "/placeholder.svg?height=100&width=100&text=SJ",
              },
              {
                name: "Michael Chen",
                role: "Parent",
                content:
                  "I love that I can order all my children's uniforms in one place, even though they attend different schools. The size guide was very helpful.",
                avatar: "/placeholder.svg?height=100&width=100&text=MC",
              },
              {
                name: "Priya Sharma",
                role: "Parent & PTA Member",
                content:
                  "As a PTA member, I appreciate how they work with our school to ensure all uniform requirements are met. The quality is consistent and the prices are reasonable.",
                avatar: "/placeholder.svg?height=100&width=100&text=PS",
              },
            ].map((testimonial, i) => (
              <div key={i} className="flex flex-col space-y-4 border p-6 rounded-lg shadow-sm bg-white">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 flex-grow">{testimonial.content}</p>
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-20 bg-indigo-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find your school and start shopping for quality uniforms today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
              <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-gray-100">
                <Link href="/schools">
                  Find Your School <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-indigo-800">
                <Link href="/catalog">Browse Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

