import React from 'react';
import { Card, CardBody, Avatar, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Parent",
    avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=11",
    content: "The custom sizing service was excellent. The uniforms fit perfectly and the staff were very professional.",
    school: "St. Mary's Academy",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "School Administrator",
    avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=12",
    content: "UniMart has been an excellent partner for our school. Their quality and service are consistently outstanding.",
    school: "Riverside High",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Parent",
    avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=13",
    content: "The online ordering process was so simple, and the uniforms arrived quickly. Great experience!",
    school: "Kings College",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-20 bg-primary-50 dark:bg-dark-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              What Our Customers Say
            </h1>
            <p className="text-xl text-gray-600 dark:text-dark-gray-400">
              Read testimonials from parents and schools about their experience with UniMart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="dark:bg-dark-card dark:border-dark-border">
                  <CardBody className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar
                        src={testimonial.avatar}
                        size="lg"
                        className="mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-dark-gray-400">{testimonial.role}</p>
                        <p className="text-sm text-primary-500">{testimonial.school}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon 
                          key={i}
                          icon="lucide:star" 
                          className="w-5 h-5 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-dark-gray-400">{testimonial.content}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              color="primary"
              size="lg"
              endContent={<Icon icon="lucide:edit-3" />}
            >
              Share Your Experience
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Happy Parents" },
              { number: "50+", label: "Partner Schools" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 dark:text-dark-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}