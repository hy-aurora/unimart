import React from 'react';
import { 
  Box, 
  Image, 
  Heading, 
  Text, 
  Flex, 
  Badge, 
  Icon,
  Stack
} from '@chakra-ui/react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { ProductType } from '@/context/CartContext';
import { Button } from '@heroui/react';

interface ProductCardProps {
  product: ProductType;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isNew = false, 
  isBestSeller = false 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        transition="transform 0.3s, box-shadow 0.3s" 
        _hover={{ 
          transform: 'translateY(-5px)', 
          boxShadow: 'xl',
          borderColor: 'primary.300'
        }}
        bg="white"
        position="relative"
        cursor="pointer"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Badges */}
        <Stack position="absolute" top="10px" left="10px" gap={1} zIndex={1}>
          {isNew && <Badge colorScheme="green">New</Badge>}
          {isBestSeller && <Badge colorScheme="orange">Best Seller</Badge>}
          {product.school && <Badge colorScheme="purple">{product.school}</Badge>}
        </Stack>
        
        {/* Wishlist button */}
        <Box 
          position="absolute" 
          top="10px" 
          right="10px" 
          zIndex={1}
          onClick={handleWishlist}
        >
          <Icon 
            as={FaHeart} 
            w={6} 
            h={6} 
            color="gray.200" 
            _hover={{ color: 'red.400' }} 
            transition="color 0.2s"
          />
        </Box>

        {/* Product image */}
        <Box 
          bg="gray.100" 
          position="relative" 
          pt="100%" /* 1:1 Aspect Ratio */
        >
          <Image
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            src={product.image}
            alt={product.name}
            objectFit="cover"
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/300")}
          />
        </Box>

        {/* Product details */}
        <Box p={4} flex="1" display="flex" flexDirection="column">
          <Box flex="1">
            <Text 
              color="gray.500" 
              fontSize="sm" 
              textTransform="uppercase" 
              letterSpacing="wider"
              mb={1}
            >
              {product.category}
            </Text>
            
            <Heading 
              as="h3" 
              size="md" 
              lineHeight="tight" 
              truncate 
              mb={2}
              color="gray.700"
            >
              {product.name}
            </Heading>
            
            <Text 
              fontWeight="bold" 
              fontSize="xl" 
              color="primary.600"
            >
              ${product.price.toFixed(2)}
            </Text>
          </Box>

          <Flex mt={4} justify="space-between" align="center">
            <Box flex="1">
              <Button
                color="primary"
                size="sm"
                onClick={handleAddToCart}
              >
                <FaShoppingCart />Add to Cart
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
