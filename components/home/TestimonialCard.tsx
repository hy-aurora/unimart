import React from 'react';
import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { Avatar } from '@heroui/react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role, 
  content, 
  avatar 
}) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        width: '3rem',
        height: '3rem',
        backgroundImage: 'url(/images/quote.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        opacity: 0.1,
        zIndex: 0
      }}
    >
      <Text
        fontSize="md"
        color="gray.600"
        position="relative"
        zIndex={1}
        mb={6}
        fontStyle="italic"
      >
        &quot;{content}&quot;
      </Text>
      <Flex align="center">
        <Box mr={4}>
          <Avatar src={avatar} name={name} size="md" />
        </Box>
        <Box>
          <Heading as="h4" size="sm">
            {name}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {role}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default TestimonialCard;
