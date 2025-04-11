import Link from "next/link";
import { Clock, Truck, MapPin, Calendar, PackageOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DeliveryPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Delivery Information</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Everything you need to know about our shipping options, delivery times, and processes.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Shipping Options</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Truck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Delivery Options</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Standard Delivery:</span> 3-5 business days (£4.99)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Express Delivery:</span> 1-2 business days (£9.99)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">School Delivery:</span> Free delivery to participating schools on scheduled days
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Free Shipping:</span> On all orders over £50
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Processing Times</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Orders are typically processed within 24 hours of being placed. Custom-sized uniforms may require additional processing time of 5-7 business days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Delivery Areas</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We currently deliver to all addresses within the United Kingdom. For international shipping inquiries, please <Link href="/contact" className="text-indigo-600 hover:underline dark:text-indigo-400">contact us</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">School Deliveries</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">School Delivery Schedule</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  For participating schools, we offer free delivery directly to the school on scheduled days. This service helps parents save on shipping costs and ensures students receive their uniforms efficiently.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Please check your school's specific delivery days during checkout or on your school's uniform page.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                <PackageOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">School Distribution</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Orders delivered to schools are distributed according to each school's protocol. Typically, items are delivered to the school office and then distributed to students by school staff. Some schools may have a dedicated uniform shop or collection point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Delivery Times by Region</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Standard Delivery</TableHead>
                  <TableHead>Express Delivery</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">London & South East</TableCell>
                  <TableCell>2-3 business days</TableCell>
                  <TableCell>Next business day</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Midlands</TableCell>
                  <TableCell>2-4 business days</TableCell>
                  <TableCell>1-2 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">North England</TableCell>
                  <TableCell>3-4 business days</TableCell>
                  <TableCell>1-2 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Scotland</TableCell>
                  <TableCell>3-5 business days</TableCell>
                  <TableCell>2 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wales</TableCell>
                  <TableCell>3-4 business days</TableCell>
                  <TableCell>1-2 business days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            *Delivery times are estimates and may vary based on weather conditions, holidays, and other factors.
          </p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Delivery FAQs</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">What happens if I'm not home when my order is delivered?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                For standard and express deliveries, if you're not home, the courier will leave your package in a safe place or with a neighbor. If this isn't possible, they'll leave a card with instructions for rescheduling delivery or collection from a local depot.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Can I change my delivery address after placing an order?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Address changes can be accommodated if the order hasn't been dispatched yet. Please contact our customer service team as soon as possible with your order number to request a change.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-2">Do you deliver on weekends?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We typically don't deliver on weekends. All deliveries are made Monday through Friday, excluding public holidays.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Need More Information?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          If you have any other questions about delivery or need special shipping arrangements, don't hesitate to reach out to our customer service team.
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
