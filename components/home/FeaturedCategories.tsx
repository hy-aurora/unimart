import React from 'react';
import Link from 'next/link';
import { Box, SimpleGrid, Text, Image, Flex, Heading } from '@chakra-ui/react';

const categories = [
  {
    id: 'elementary',
    title: 'Elementary School',
    image: '/images/categories/elementary.jpg',
    url: '/categories/elementary'
  },
  {
    id: 'middle',
    title: 'Middle School',
    image: '/images/categories/middle.jpg',
    url: '/categories/middle'
  },
  {
    id: 'high',
    title: 'High School',
    image: '/images/categories/high.jpg',
    url: '/categories/high'
  },
  {
    id: 'pe',
    title: 'PE & Sports',
    image: '/images/categories/sports.jpg',
    url: '/categories/sports'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: '/images/categories/accessories.jpg',
    url: '/categories/accessories'
  },
  {
    id: 'footwear',
    title: 'Footwear',
    image: '/images/categories/footwear.jpg',
    url: '/categories/footwear'
  }
];

const FeaturedCategories = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
      {categories.map((category) => (
        <Link key={category.id} href={category.url} passHref>
          <Box 
            position="relative" 
            overflow="hidden" 
            borderRadius="lg"
            height="280px"
            transition="transform 0.3s ease"
            _hover={{
              transform: 'scale(1.03)',
              '& > div': {
                bg: 'rgba(0, 0, 0, 0.65)'
              }
            }}
            cursor="pointer"
          >
            <Image
              src={category.image}
              alt={category.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(0, 0, 0, 0.5)"
              transition="background 0.3s ease"
              alignItems="center"
              justifyContent="center"
              direction="column"
              p={4}
            >
              <Heading as="h3" size="lg" color="white" textAlign="center">
                {category.title}
              </Heading>
              <Text 
                color="white" 
                fontWeight="medium" 
                mt={2}
                opacity="0.9"
              >
                Shop Now
              </Text>
            </Flex>
          </Box>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default FeaturedCategories;
