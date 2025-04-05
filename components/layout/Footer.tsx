import React from "react";
import Link from "next/link";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { Divider } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-10">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">UniMart</h2>
            <p className="text-sm mb-4">
              Your one-stop shop for all school uniform needs
            </p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} UniMart. All rights reserved
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-primary-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 2c-2.716 0-3.056.012-4.123.06-1.064.049-1.791.218-2.427.465a4.883 4.883 0 0 0-1.77 1.153A4.88 4.88 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.88 4.88 0 0 0 1.153 1.77 4.88 4.88 0 0 0 1.77 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.88 4.88 0 0 0 1.77-1.153 4.88 4.88 0 0 0 1.153-1.77c.247-.636.416-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.88 4.88 0 0 0-1.153-1.77 4.88 4.88 0 0 0-1.77-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2zm0 1.802c2.67 0 2.986.01 4.04.058.976.045 1.505.207 1.858.344.466.181.8.397 1.15.748.35.35.566.684.747 1.15.137.353.3.882.344 1.857.048 1.055.058 1.37.058 4.041 0 2.67-.01 2.986-.058 4.04-.045.976-.207 1.505-.344 1.858a3.09 3.09 0 0 1-.748 1.15c-.35.35-.683.566-1.15.747-.353.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-.976-.045-1.505-.207-1.858-.344a3.086 3.086 0 0 1-1.15-.748 3.086 3.086 0 0 1-.747-1.15c-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.045-.976.207-1.505.344-1.858.181-.466.397-.8.748-1.15.35-.35.683-.566 1.15-.747.353-.137.882-.3 1.857-.344 1.055-.048 1.37-.058 4.041-.058z" />
                  <path d="M12 15.333a3.333 3.333 0 1 1 0-6.665 3.333 3.333 0 0 1 0 6.665zm0-8.467a5.133 5.133 0 1 0 0 10.267 5.133 5.133 0 0 0 0-10.267zm6.533-.133a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-primary-600">All Products</Link></li>
              <li><Link href="/categories/elementary" className="hover:text-primary-600">Elementary School</Link></li>
              <li><Link href="/categories/middle" className="hover:text-primary-600">Middle School</Link></li>
              <li><Link href="/categories/high" className="hover:text-primary-600">High School</Link></li>
              <li><Link href="/categories/accessories" className="hover:text-primary-600">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-primary-600">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary-600">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-600">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-primary-600">Size Guide</Link></li>
              <li><Link href="/track-order" className="hover:text-primary-600">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to get special offers and more.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-white"
              />
              <Button color="primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <Divider className="my-8" />
        
        <div className="text-center text-sm">
          <p>Payment methods: Visa, Mastercard, PayPal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
