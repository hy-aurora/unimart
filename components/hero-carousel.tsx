import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

const carouselItems = [
  {
    id: 1,
    title: "Quality School Uniforms",
    description: "Find the perfect fit with our extensive range of school uniforms designed for comfort and durability.",
    image: "https://img.heroui.chat/image/fashion?w=1200&h=600&u=1",
    cta: { text: "Shop Now", link: "/catalog" }
  },
  {
    id: 2,
    title: "Custom Sizing Available",
    description: "Get uniforms tailored to your exact measurements with school-approved designs.",
    image: "https://img.heroui.chat/image/fashion?w=1200&h=600&u=2",
    cta: { text: "Learn More", link: "/sizing" }
  },
  {
    id: 3,
    title: "Fast & Free Delivery",
    description: "Order online and have your uniforms delivered directly to your home or school.",
    image: "https://img.heroui.chat/image/fashion?w=1200&h=600&u=3",
    cta: { text: "How It Works", link: "/" }
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-b from-primary-100/50 to-white dark:from-dark-primary/50 dark:to-dark-background">
      <div className="absolute inset-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url(${carouselItems[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-800/80" />
      </div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex items-center h-full">
          <motion.div 
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {carouselItems[current].title}
            </h1>
            <p className="text-lg mb-8 opacity-90 dark:text-dark-gray-400">
              {carouselItems[current].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                color="primary"
                className="bg-white text-primary-500 hover:bg-primary-50"
                size="lg"
              >
                {carouselItems[current].cta.text}
              </Button>
              <div className="relative">
                <Input
                  placeholder="Search your school..."
                  startContent={<Icon icon="lucide:search" />}
                  className="w-full sm:w-64 bg-white/10 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'w-8 bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}