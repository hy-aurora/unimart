import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function TermsOfServicePage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Terms of Service</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Last updated: June 1, 2023
      </p>

      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <p>
          These Terms of Service ("Terms") govern your use of the website operated by UniMart ("Company", "we", "us", or "our") and any services offered through the website. Please read these Terms carefully before using our website. Your access to and use of the website is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the website.
        </p>

        <p className="mt-4">
          By accessing or using the website, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the website.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate, complete, and up-to-date information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our website.
        </p>

        <p className="mt-4">
          You are responsible for safeguarding the password that you use to access the website and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Products and Orders</h2>
        <p>
          We reserve the right to refuse any order placed through the website. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
        </p>

        <p className="mt-4">
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue any product (or any part or content thereof) without notice at any time. We shall not be liable to you or any third-party for any modification, price change, suspension, or discontinuance of any product.
        </p>

        <Separator className="my-8" />

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Intellectual Property</h2>
        <p>
          The website and its original content, features, and functionality are and will remain the exclusive property of UniMart and its licensors. The website is protected by copyright, trademark, and other laws of both the United Kingdom and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of UniMart.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Limitation of Liability</h2>
        <p>
          In no event shall UniMart, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the website; (ii) any conduct or content of any third party on the website; (iii) any content obtained from the website; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <address className="not-italic mt-4 text-gray-600 dark:text-gray-300">
          UniMart<br />
          123 Business Street<br />
          London, EC1A 1BB<br />
          United Kingdom<br />
          <a href="mailto:legal@unimart.com" className="text-indigo-600 dark:text-indigo-400">legal@unimart.com</a><br />
          <a href="tel:+441234567890" className="text-indigo-600 dark:text-indigo-400">+44 (0) 123 456 7890</a>
        </address>
      </div>
    </div>
  );
}
