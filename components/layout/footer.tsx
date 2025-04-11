import React from 'react';
import { Link, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export function Footer() {
  return (
    <footer className="bg-background border-t py-12 dark:bg-dark-background dark:border-dark-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:book-open" className="w-6 h-6 text-primary-500" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-dark-gray-100">UniMart</h3>
            </div>
            <p className="text-gray-600 max-w-xs dark:text-dark-gray-400">
              Your trusted partner for high-quality school uniforms, delivering comfort and style to students nationwide.
            </p>
            <div className="flex gap-4">
              <Button
                isIconOnly
                variant="light"
                aria-label="Facebook"
                className="text-primary-500"
              >
                <Icon icon="lucide:facebook" className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                aria-label="Instagram"
                className="text-primary-500"
              >
                <Icon icon="lucide:instagram" className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                aria-label="Twitter"
                className="text-primary-500"
              >
                <Icon icon="lucide:twitter" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/schools" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Find Your School
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/custom-sizing" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Custom Sizing
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Delivery Information
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/size-exchange" className="text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                  Size Exchange
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-gray-600 dark:text-dark-gray-400">
              Subscribe to receive updates about new collections and special offers.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              />
              <Button 
                color="primary"
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-dark-gray-400">
              © {new Date().getFullYear()} UniMart. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-primary-500 dark:text-dark-gray-400 dark:hover:text-dark-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}