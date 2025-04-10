import { Truck, Package, RefreshCw, Clock, Phone, Mail } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Shipping & Returns</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        We want to make sure you're completely satisfied with your purchase. Here's everything you need to know about our
        shipping and returns policies.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Shipping Information</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Delivery Options</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Standard Delivery (3-5 business days) - ₹4.99</li>
                  <li>• Express Delivery (1-2 business days) - ₹9.99</li>
                  <li>• School Delivery (Free)</li>
                  <li>• Free shipping on orders over ₹50</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Order Processing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Orders are processed within 24 hours of being placed. You'll receive a confirmation email with tracking
                  information once your order ships.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Custom Orders</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Custom-sized uniforms require additional processing time. Please allow 7-10 business days for custom
                  orders.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Returns Policy</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <RefreshCw className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Easy Returns</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We accept returns within 30 days of purchase. Items must be unworn, unwashed, and have original tags
                  attached.
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-4">Return Process</h3>
              <ol className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex gap-4">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">1.</span>
                  <p>Log into your account and initiate a return from your order history</p>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">2.</span>
                  <p>Print the prepaid return label provided</p>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">3.</span>
                  <p>Package your items securely with all tags and original packaging</p>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">4.</span>
                  <p>Drop off your package at any designated shipping location</p>
                </li>
              </ol>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Important Notes</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Custom-sized items are non-returnable</li>
                <li>• Return shipping is free for size exchanges</li>
                <li>• Refunds are processed within 5-7 business days</li>
                <li>• Store credit is available for items without tags</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border rounded-lg p-6 bg-indigo-50 dark:bg-indigo-950">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Need Help?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Our customer service team is available to assist you with any questions about shipping or returns.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-gray-600 dark:text-gray-300">+44 (0) 123 456 7890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-gray-600 dark:text-gray-300">support@unimart.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}