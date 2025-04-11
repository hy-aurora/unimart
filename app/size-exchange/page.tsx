import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, PackageOpen, Ruler, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SizeExchangePage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Size Exchange Program</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Finding the perfect fit is important. Our Size Exchange Program makes it easy to exchange items for a different size without the hassle of a full return and repurchase.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">How It Works</h2>
          
          <ol className="space-y-6 relative before:absolute before:left-4 before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-indigo-100 dark:before:bg-indigo-900">
            <li className="pl-12 relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">1</div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Request an Exchange</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Log into your account, go to your order history, and select "Request Size Exchange" for the item you want to exchange.
              </p>
            </li>
            
            <li className="pl-12 relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">2</div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Select New Size</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose the new size you need and confirm your selection. You'll receive a prepaid return label by email.
              </p>
            </li>
            
            <li className="pl-12 relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">3</div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Return Original Item</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pack the original item with all tags still attached and ship it back using the provided return label.
              </p>
            </li>
            
            <li className="pl-12 relative">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">4</div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Receive Your New Size</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Once we receive your return, we'll process your exchange and ship the new size to you right away.
              </p>
            </li>
          </ol>
        </div>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Size Exchange Eligibility</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                  <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Time Limit</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Size exchanges must be requested within 30 days of receiving your order.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                  <PackageOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Item Condition</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Items must be unworn, unwashed, and have all original tags attached.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full h-fit">
                  <Ruler className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-400 mb-1">Available Sizes</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Exchange is subject to new size availability. If your desired size is out of stock, we'll contact you with options.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Important Notes</h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300">
                  Price differences will be refunded or charged accordingly if exchanging for a different priced item.
                </p>
              </div>
              
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300">
                  One exchange per item is allowed. If you need another size after the exchange, a regular return process will apply.
                </p>
              </div>
              
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300">
                  Customized items with embroidery are not eligible for size exchange.
                </p>
              </div>
              
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300">
                  Standard shipping is free for size exchanges. Express shipping options are available for an additional fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator className="my-12" />
      
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Need Help Finding Your Size?</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          Not sure which size to order? Check out our detailed size guide to find your perfect fit or consider our custom sizing options for a tailored experience.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild>
            <Link href="/size-guide">
              View Size Guide
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/custom-sizing">
              Custom Sizing Options
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
