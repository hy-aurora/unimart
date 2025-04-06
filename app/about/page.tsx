import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">About UniMart</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            UniMart is your trusted partner in providing high-quality school uniforms. We work directly with schools to
            ensure that every student has access to comfortable, durable, and compliant uniforms.
          </p>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To provide high-quality, affordable school uniforms while making the purchasing process simple and convenient
                for parents and schools.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Our Values</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Quality and durability in every product</li>
                <li>• Exceptional customer service</li>
                <li>• Sustainability in manufacturing</li>
                <li>• Inclusive sizing options</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative aspect-square">
          <Image
            src="/images/placeholder.webp"
            alt="About UniMart"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900 dark:text-indigo-400">Why Choose Us?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-xl mb-4 text-indigo-900 dark:text-indigo-400">Quality Assurance</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every uniform is made with premium materials and undergoes strict quality control measures.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-xl mb-4 text-indigo-900 dark:text-indigo-400">Custom Sizing</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We offer custom sizing options to ensure a perfect fit for every student.
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="font-bold text-xl mb-4 text-indigo-900 dark:text-indigo-400">School Partnerships</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Direct partnerships with schools ensure compliance with uniform policies.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Ready to Get Started?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Browse our collection of school uniforms or contact us to learn more about our services.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/schools">
              Find Your School
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}