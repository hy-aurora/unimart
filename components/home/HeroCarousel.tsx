import React, { useState, useEffect } from 'react';
import { Box, Heading, Text,Flex, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { Button } from '@heroui/react';

const slides = [
  {
    id: 1,
    title: 'Back to School Sale',
    subtitle: 'Get up to 30% off on all uniform sets',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    image: '/images/hero/back-to-school.jpg',
  },
  {
    id: 2,
    title: 'New School Year, New Uniforms',
    subtitle: 'Refresh your school wardrobe with our latest collection',
    buttonText: 'Explore Collection',
    buttonLink: '/categories/all',
    image: '/images/hero/new-collection.jpg',
  },
  {
    id: 3,
    title: 'Customized School Uniforms',
    subtitle: 'Get your school logo embroidered on uniforms',
    buttonText: 'Learn More',
    buttonLink: '/customization',
    image: '/images/hero/custom-uniforms.jpg',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      position="relative" 
      height={{ base: '500px', md: '600px' }} 
      overflow="hidden"
      width="100%"
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          backgroundImage={`url(${slide.image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity={index === currentSlide ? 1 : 0}
          transition="opacity 1s ease-in-out"
          _after={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }}
        >
          <Container maxW="container.xl" height="100%">
            <Flex 
              direction="column" 
              height="100%" 
              justifyContent="center" 
              position="relative" 
              zIndex={2}
              maxWidth={{ base: '90%', md: '600px' }}
            >
              <Heading 
                as="h1" 
                size="2xl" 
                color="white" 
                mb={4}
                fontWeight="bold"
              >
                {slide.title}
              </Heading>
              <Text 
                fontSize="xl" 
                color="white" 
                mb={6}
              >
                {slide.subtitle}
              </Text>
              <Box>
                <Button 
                  as={Link} 
                  href={slide.buttonLink}
                  size="lg" 
                  style={{ backgroundColor: 'var(--chakra-colors-primary-500)', color: 'white' }}
                >
                  {slide.buttonText}
                </Button>
              </Box>
            </Flex>
          </Container>
        </Box>
      ))}

      {/* Slider controls */}
      <Flex position="absolute" bottom="6" width="100%" justifyContent="center" zIndex={2}>
        {slides.map((_, index) => (
          <Box
            key={index}
            bg={index === currentSlide ? 'primary.500' : 'whiteAlpha.700'}
            width="10px"
            height="10px"
            borderRadius="full"
            mx={1}
            cursor="pointer"
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default HeroCarousel;
