"`use client";
import React from 'react';
import { Button, Card, CardBody, Badge, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id && typeof params.id === 'string' ? params.id : null;
  const product = useQuery(
    api.products.getProductById,
    id ? { productId: id as Id<"products"> } : "skip"
  );

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="light"
        className="mb-6"
        startContent={<Icon icon="lucide:arrow-left" />}
      >
        Back to {product.schoolId}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <motion.div
            className="relative aspect-square overflow-hidden rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img
              src={product.imageUrls[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-2">
            {product.imageUrls.map((image, i) => (
              <Card
                key={i}
                isPressable
                className={`aspect-square overflow-hidden ${i === selectedImage ? 'ring-2 ring-primary' : ''
                  }`}
                onPress={() => setSelectedImage(i)}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <Badge color="primary" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon="lucide:star"
                  className={`w-5 h-5 ${i < Math.floor(product.rating ?? 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                    }`}
                />
              ))}
              <span className="text-gray-600">
                ({product.ratingCount ?? 0} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold text-primary mt-4">
              £{product.price.toFixed(2)}
            </p>
          </div>

          <Card className="mb-6 dark:bg-dark-card dark:border-dark-border">
            <CardBody className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "solid" : "bordered"}
                      color={selectedSize === size ? "primary" : "default"}
                      onPress={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/*              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "solid" : "bordered"}
                      color={selectedColor === color ? "primary" : "default"}
                      onPress={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>*/}

              <Button
                color="primary"
                size="lg"
                fullWidth
                startContent={<Icon icon="lucide:shopping-cart" />}
              >
                Add to Cart
              </Button>
            </CardBody>
          </Card>

          <Tabs aria-label="Product information" className="dark:text-dark-foreground">
            <Tab key="description" title="Description">
              <Card>
                <CardBody>
                  <p className="text-gray-600 dark:text-dark-gray-400">{product.description}</p>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="details" title="Details & Care">
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Materials</h3>
                      <p className="text-gray-600">65% Polyester, 35% Viscose</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Care Instructions</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Machine washable at 40°C</li>
                        <li>Do not bleach</li>
                        <li>Iron on medium heat</li>
                        <li>Do not tumble dry</li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="reviews" title={`Reviews (${product.ratingCount ?? 0})`}>
              <Card>
                <CardBody>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            icon="lucide:star"
                            className={`w-5 h-5 ${i < Math.floor(product.rating ?? 0)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                              }`}
                          />
                        ))}
                        <span className="text-gray-600">
                          {product.rating} out of 5
                        </span>
                      </div>
                      <Button color="primary">Write a Review</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}