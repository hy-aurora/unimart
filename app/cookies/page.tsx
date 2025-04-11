import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CookiePolicyPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Cookie Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Last updated: June 1, 2023
      </p>

      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <p>
          This Cookie Policy explains how UniMart ("Company", "we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">What Are Cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>

        <p className="mt-4">
          Cookies set by the website owner (in this case, UniMart) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Why Do We Use Cookies?</h2>
        <p>
          We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Types of Cookies We Use</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Essential Cookies</h3>
            <p>
              These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Performance and Functionality Cookies</h3>
            <p>
              These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mt-6 mb-2 text-indigo-900 dark:text-indigo-400">Analytics and Customization Cookies</h3>
            <p>
              These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">How Can You Control Cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner when you visit our website.
        </p>

        <p className="mt-4">
          You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-indigo-900 dark:text-indigo-400">Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or other technologies, please contact us at:
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
