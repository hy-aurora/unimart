import React from 'react';
import { Card, Button, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';

const products = [
  {
    id: "1",
    name: "Premium School Blazer",
    price: 49.99,
    image: "https://img.heroui.chat/image/fashion?w=400&h=500&u=11",
    badge: "Best Seller"
  },
  {
    id: "2",
    name: "White School Shirt Pack",
    price: 18.99,
    image: "https://img.heroui.chat/image/fashion?w=400&h=500&u=12",
    badge: "Popular"
  },
  {
    id: "3",
    name: "Navy School Trousers",
    price: 22.50,
    image: "https://img.heroui.chat/image/fashion?w=400&h=500&u=13"
  },
  {
    id: "4",
    name: "School Tie",
    price: 9.99,
    image: "https://img.heroui.chat/image/fashion?w=400&h=500&u=14",
    badge: "New"
  }
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id}
          isPressable
          className="border border-gray-200 hover:border-primary-200 transition-all dark:border-dark-border dark:hover:border-dark-primary"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <Badge 
                color="primary"
                className="absolute top-2 right-2"
              >
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 dark:text-dark-foreground">{product.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-primary-600">
                £{product.price}
              </span>
              <Button 
                isIconOnly
                color="primary"
                variant="light"
                onPress={() => console.log('Added to cart')}
              >
                <Icon icon="lucide:shopping-cart" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}