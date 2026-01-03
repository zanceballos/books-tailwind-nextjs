import React from "react";
import {
  Box,
  Badge,
  Image,
  Center,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link"; 

const BookCardCategories = ({ details }) => {

  
  const { volumeInfo, id } = details;
  const imageLink = volumeInfo.imageLinks?.thumbnail;
  const category = volumeInfo.categories?.[0];
  const author = volumeInfo.authors?.[0];

  return (
    <Box
      textAlign="center"
      height="400px"
      w="200px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={2}
      display="flex"
      flexDirection="column"
      bg="white"
    >
      <Center flex={1} mb={2}>
        <Image
          src={imageLink}
          fallbackSrc="https://www.biotrop.org/images/default-book.png"
          alt={volumeInfo?.title || "Book Cover"}
          maxH="220px"
          objectFit="contain"
          rounded="lg"
          shadow={imageLink ? "lg" : "none"}
        />
      </Center>

      <Stack spacing={2} align="center" pb={2}>
        <Badge
          borderRadius="full"
          px="3"
          colorScheme={category ? "red" : "teal"}
        >
          {category || "No Category"}
        </Badge>

        <Text
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          px={2}
        >
          {volumeInfo?.title}
        </Text>

        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {author || "Unknown Author"}
        </Text>

        <Button
          as={NextLink}
          href={`/books/details/${id}`}
          width="80%"
          rounded="3xl"
          colorScheme="gray"
          size="sm"
          _hover={{
            textDecoration: "none",
            bg: "gray.300",
          }}
        >
          Details
        </Button>
      </Stack>
    </Box>
  );
};

export default BookCardCategories;
