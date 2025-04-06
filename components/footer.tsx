import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400">SchoolUniform.co</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              One-stop shop for all your school uniform needs. Quality products, easy ordering, and fast delivery.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-400">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/schools" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Schools
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/custom-sizing" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Custom Sizing
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-400">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-400">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SchoolUniform.co. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

