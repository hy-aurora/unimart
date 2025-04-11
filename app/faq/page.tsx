import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I find my school's uniform?",
      answer: "You can use our 'Find Your School' feature on the homepage or navigate to the Schools page and search for your school by name."
    },
    {
      question: "How does sizing work for your uniforms?",
      answer: "We offer standard sizes (XS to XXXL) as well as custom sizing options. You can refer to our Size Guide for detailed measurements, or use our Custom Sizing service for a perfect fit."
    },
    {
      question: "Can I return items if they don't fit?",
      answer: "Yes, we offer a 30-day return policy for unworn items with tags still attached. For size-related issues, we also offer a Size Exchange program for a more streamlined process."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express delivery is available for 1-2 business days. School deliveries are also available and are typically delivered on scheduled days each week."
    },
    {
      question: "Are there any bulk ordering discounts?",
      answer: "Yes, we offer special discounts for bulk orders. Please contact our customer service team for details on bulk pricing."
    },
    {
      question: "How do I care for my uniform?",
      answer: "Care instructions vary by item. Generally, we recommend washing in cold water, avoiding bleach, and tumble drying on low or hanging to dry. Specific care instructions are included on each product's tag and product page."
    },
    {
      question: "Do you offer embroidery services?",
      answer: "Yes, we offer embroidery for school logos, names, and other customizations. These options are available during the checkout process for applicable items."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and school-approved purchase orders. Some schools also offer integration with school payment systems."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive an email with tracking information. You can also check your order status by logging into your account and viewing your order history."
    },
    {
      question: "What if my school isn't listed?",
      answer: "If your school isn't currently in our system, please contact us. We're continually expanding our partnerships and can work with your school to provide uniform solutions."
    }
  ];

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold mb-6 text-indigo-900 dark:text-indigo-400">Frequently Asked Questions</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Find answers to the most common questions about our products, ordering process, and policies.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium text-indigo-900 dark:text-indigo-400">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-indigo-400">Still have questions?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If you couldn't find the answer to your question, please feel free to contact our customer support team.
        </p>
        <div className="flex gap-4">
          <a 
            href="/contact" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Contact Us
          </a>
          <a 
            href="mailto:support@unimart.com" 
            className="inline-flex items-center px-4 py-2 border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-950 transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}
