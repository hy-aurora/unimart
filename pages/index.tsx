import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Flex,
  Stack,
  Grid,
  Badge,
  Icon
} from "@chakra-ui/react";
import { Button, Image } from "@heroui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaTruck, FaThumbsUp, FaShieldAlt, FaPercentage } from "react-icons/fa";
import ProductCard from "@/components/products/ProductCard";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TestimonialCard from "@/components/home/TestimonialCard";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Elementary School Polo",
    price: 24.99,
    image: "/images/products/elementary-polo.jpg",
    school: "Oak Elementary",
    category: "Shirts"
  },
  {
    id: "2",
    name: "Middle School Uniform Set",
    price: 49.99,
    image: "/images/products/middle-uniform.jpg",
    school: "Riverside Middle",
    category: "Sets"
  },
  {
    id: "3",
    name: "High School Blazer",
    price: 79.99,
    image: "/images/products/high-blazer.jpg",
    school: "Washington High",
    category: "Outerwear"
  },
  {
    id: "4",
    name: "Elementary Pleated Skirt",
    price: 29.99,
    image: "/images/products/elementary-skirt.jpg",
    school: "Pine Elementary",
    category: "Bottoms"
  },
  {
    id: "5",
    name: "School Backpack",
    price: 34.99,
    image: "/images/products/backpack.jpg",
    category: "Accessories"
  },
  {
    id: "6",
    name: "Sports Uniform Set",
    price: 54.99,
    image: "/images/products/sports-uniform.jpg",
    category: "Sports"
  },
  {
    id: "7",
    name: "Leather School Shoes",
    price: 44.99,
    image: "/images/products/shoes.jpg",
    category: "Footwear"
  },
  {
    id: "8",
    name: "Winter School Jacket",
    price: 64.99,
    image: "/images/products/winter-jacket.jpg",
    category: "Outerwear"
  }
];

// Mock data for testimonials
const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Parent",
    content: "UniMart has been a lifesaver for our family. With three kids in different schools, finding all their uniforms in one place makes back-to-school shopping so much easier.",
    avatar: "/images/testimonials/sarah.jpg"
  },
  {
    id: "2",
    name: "Michael Thomas",
    role: "School Administrator",
    content: "We've partnered with UniMart for our school's uniforms and couldn't be happier. Their quality is excellent, and the ordering process is seamless for our parents.",
    avatar: "/images/testimonials/michael.jpg"
  },
  {
    id: "3",
    name: "Jennifer Riley",
    role: "Parent",
    content: "The uniforms we purchased from UniMart have held up incredibly well throughout the school year. The fabric quality is impressive, and my kids say they're comfortable too!",
    avatar: "/images/testimonials/jennifer.jpg"
  }
];

export default function Home() {
  const [currentTab, setCurrentTab] = useState("featured");

  return (
    <>
      <Head>
        <title>UniMart - School Uniform Store</title>
        <meta name="description" content="Your one-stop shop for quality school uniforms and supplies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <Box bg="primary.50" pt={10} pb={20}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={10} alignItems="center">
            <Box>
              <Heading
                as="h1"
                size="2xl"
                fontWeight="bold"
                color="primary.700"
                lineHeight="1.2"
                mb={4}
              >
                Quality School Uniforms for Every Student
              </Heading>
              <Text fontSize="xl" mb={6} color="gray.600">
                Find the perfect uniforms for your children from elementary to high school.
                Durable, comfortable, and always in stock.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} gap={4}>
                <Button
                  color="primary"
                  size="lg"
                  as={Link}
                  href="/products"
                >
                  <Box as="span" ml={2}><ChevronRightIcon />
                    Shop Now
                  </Box>
                </Button>
                <Button
                  variant="bordered"
                  color="primary"
                  size="lg"
                  as={Link}
                  href="/schools"
                >
                  Find Your School
                </Button>
              </Stack>
            </Box>
            <Box>
              <Image
                src="/images/hero-students.jpg"
                alt="Happy students in uniforms"
                shadow="lg"
              />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Box py={16}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            Shop by Category
          </Heading>
          <FeaturedCategories />
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={12} textAlign="center">
            Why Choose UniMart?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={10}>
            <VStack align="center" p={6} bg="white" rounded="lg" shadow="md">
              <Icon as={FaTruck} boxSize={12} color="primary.500" mb={4} />
              <Heading as="h3" size="md" mb={2}>
                Fast Delivery
              </Heading>
              <Text textAlign="center" color="gray.600">
                Quick shipping to ensure your uniforms arrive on time for school
              </Text>
            </VStack>

            <VStack align="center" p={6} bg="white" rounded="lg" shadow="md">
              <Icon as={FaThumbsUp} boxSize={12} color="primary.500" mb={4} />
              <Heading as="h3" size="md" mb={2}>
                Quality Guaranteed
              </Heading>
              <Text textAlign="center" color="gray.600">
                Durable materials that withstand daily wear and tear
              </Text>
            </VStack>

            <VStack align="center" p={6} bg="white" rounded="lg" shadow="md">
              <Icon as={FaShieldAlt} boxSize={12} color="primary.500" mb={4} />
              <Heading as="h3" size="md" mb={2}>
                Easy Returns
              </Heading>
              <Text textAlign="center" color="gray.600">
                Hassle-free return policy if something doesn&apos;t fit right
              </Text>
            </VStack>

            <VStack align="center" p={6} bg="white" rounded="lg" shadow="md">
              <Icon as={FaPercentage} boxSize={12} color="primary.500" mb={4} />
              <Heading as="h3" size="md" mb={2}>
                Bulk Discounts
              </Heading>
              <Text textAlign="center" color="gray.600">
                Special pricing for schools and large family orders
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Box py={16}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading as="h2" size="xl">
              {currentTab === "featured" ? "Featured Products" : "New Arrivals"}
            </Heading>
            <HStack gap={4}>
              <Button
                color={currentTab === "featured" ? "primary" : "default"}
                variant={currentTab === "featured" ? "solid" : "bordered"}
                onPress={() => setCurrentTab("featured")}
              >
                Featured
              </Button>
              <Button
                color={currentTab === "new" ? "primary" : "default"}
                variant={currentTab === "new" ? "solid" : "bordered"}
                onPress={() => setCurrentTab("new")}
              >
                New Arrivals
              </Button>
            </HStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          <Box textAlign="center" mt={10}>
            <Button
              size="lg"
              color="primary"
              as={Link}
              href="/products"
            >
              <Box as="span" mr={2}>
                <ChevronRightIcon />
              View All Products
              </Box>
            </Button>
          </Box>
        </Container>
      </Box>

      {/* School Spotlight Section */}
      <Box bg="primary.50" py={16}>
        <Container maxW="container.xl">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="center">
            <Box>
              <Badge color="primary" mb={2}>Featured School</Badge>
              <Heading as="h2" size="xl" mb={4}>
                Washington High School
              </Heading>
              <Text fontSize="lg" mb={6} color="gray.700">
                We&apos;re proud to be the official uniform provider for Washington High School.
                Our exclusive collection meets all school requirements while providing
                comfort and durability for students.
              </Text>
              <Button
                color="primary"
                size="lg"
                as={Link}
                href="/schools/washington-high"
              >
                Shop Washington High Collection
              </Button>
            </Box>
            <Box>
              <Image
                src="/images/washington-high.jpg"
                alt="Washington High School"
                shadow="lg"
              />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box py={16}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={10} textAlign="center">
            What Parents & Schools Say
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box bg="gray.800" color="white" py={16}>
        <Container maxW="container.md" textAlign="center">
          <Heading as="h2" size="xl" mb={4}>
            Stay Updated
          </Heading>
          <Text fontSize="lg" mb={8}>
            Subscribe to our newsletter for exclusive deals, back-to-school specials, and more.
          </Text>
          <HStack maxW="500px" mx="auto">
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: '10px 16px',
                borderRadius: '4px 0 0 4px',
                border: 'none',
                width: '100%',
                color: 'black'
              }}
            />
            <Button
              color="primary"
              size="lg"
            >
              Subscribe
            </Button>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
