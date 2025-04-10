import React from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

export default function SizeGuideSection() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="relative py-20 bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://img.heroui.chat/image/fashion?w=1920&h=600&u=51"
            alt="Custom Sizing"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Custom Sizing Service
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Get the perfect fit with our professional measurement and alteration service.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary-900"
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              Book Appointment
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "lucide:ruler",
                title: "Professional Measurement",
                description: "Our trained staff will take accurate measurements to ensure the perfect fit."
              },
              {
                icon: "lucide:scissors",
                title: "Free Alterations",
                description: "Complimentary alterations service included with your uniform purchase."
              },
              {
                icon: "lucide:check-circle",
                title: "Perfect Fit Guarantee",
                description: "We guarantee your satisfaction with the final fit of your uniform."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="dark:bg-dark-card dark:border-dark-border">
                  <CardBody className="text-center p-6">
                    <div className="mb-4 inline-flex p-3 bg-primary-100 rounded-full">
                      <Icon icon={feature.icon} className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-dark-gray-400">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Book an Appointment",
                    description: "Schedule a convenient time for your measurement session."
                  },
                  {
                    title: "Get Measured",
                    description: "Our professionals will take detailed measurements."
                  },
                  {
                    title: "Alterations",
                    description: "If needed, we'll alter your uniform for the perfect fit."
                  },
                  {
                    title: "Final Fitting",
                    description: "Try on your perfectly fitted uniform."
                  }
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-500 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-dark-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="dark:bg-dark-card dark:border-dark-border">
                <CardBody className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Book Your Session</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    />
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none">
                      <option value="">Select Your School</option>
                      <option value="school1">St. Mary's Academy</option>
                      <option value="school2">Riverside High</option>
                      <option value="school3">Kings College</option>
                    </select>
                    <Button
                      color="primary"
                      fullWidth
                      size="lg"
                    >
                      Schedule Appointment
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}