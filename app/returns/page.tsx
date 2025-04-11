import { CheckCircle, Clock, PackageOpen, RefreshCw, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Returns Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        We want you to be completely satisfied with your purchase. If you're not, we offer a simple and hassle-free return process.
      </p>

      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Return Eligibility</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">30-Day Return Window</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You have 30 days from the date of delivery to return your items.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <PackageOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Item Condition</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Items must be unworn, unwashed, and have all original tags attached. They should be in the same condition you received them.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <ShieldAlert className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Non-Returnable Items</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Customized items with embroidered names or custom sizing cannot be returned unless they are defective.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Return Process</h2>
          <ol className="space-y-4 list-decimal list-inside text-gray-600 dark:text-gray-300">
            <li className="pl-2">
              <span className="font-medium">Initiate a return</span>: Log into your account and go to your order history to start the return process.
            </li>
            <li className="pl-2">
              <span className="font-medium">Print return label</span>: Once your return is approved, you'll receive a return shipping label by email.
            </li>
            <li className="pl-2">
              <span className="font-medium">Package items</span>: Pack the items securely in their original packaging if possible.
            </li>
            <li className="pl-2">
              <span className="font-medium">Ship return</span>: Attach the return label and drop the package at any authorized shipping location.
            </li>
            <li className="pl-2">
              <span className="font-medium">Refund processing</span>: Once we receive and inspect your return, we'll process your refund within 5-7 business days.
            </li>
          </ol>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Refunds</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Refund Methods</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Refunds will be issued to the original payment method used for the purchase. For credit card payments, it may take an additional 3-5 business days for the refund to appear on your statement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <RefreshCw className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Size Exchanges</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  If you need a different size, we recommend using our <Link href="/size-exchange" className="text-indigo-600 hover:underline dark:text-indigo-400">Size Exchange</Link> program for a faster resolution.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about our return policy or need assistance with a return, please contact our customer service team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/size-exchange" 
              className="inline-flex items-center px-4 py-2 border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-950 transition-colors"
            >
              Size Exchange
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
