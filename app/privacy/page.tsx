import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Last updated: June 1, 2023
      </p>

      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <p>
          At UniMart, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect via the website includes:
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Personal Data</h3>
        <p>
          Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the website or when you choose to participate in various activities related to the website. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the website.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Derivative Data</h3>
        <p>
          Information our servers automatically collect when you access the website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the website.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Financial Data</h3>
        <p>
          Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the website. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
        </p>

        <Separator className="my-8" />

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
        </p>

        <ul className="list-disc pl-8 space-y-2">
          <li>Create and manage your account.</li>
          <li>Process orders and payments.</li>
          <li>Send you a newsletter.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
          <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
          <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the website to you.</li>
          <li>Increase the efficiency and operation of the website.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
          <li>Notify you of updates to the website.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
          <li>Perform other business activities as needed.</li>
          <li>Request feedback and contact you about your use of the website.</li>
        </ul>

        <Separator className="my-8" />

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Disclosure of Your Information</h2>
        <p>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">By Law or to Protect Rights</h3>
        <p>
          If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Third-Party Service Providers</h3>
        <p>
          We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </p>
        <address className="not-italic mt-4 text-gray-600 dark:text-gray-300">
          UniMart<br />
          123 Business Street<br />
          London, EC1A 1BB<br />
          United Kingdom<br />
          <a href="mailto:privacy@unimart.com" className="text-indigo-600 dark:text-indigo-400">privacy@unimart.com</a><br />
          <a href="tel:+441234567890" className="text-indigo-600 dark:text-indigo-400">+44 (0) 123 456 7890</a>
        </address>
      </div>
    </div>
  );
}
