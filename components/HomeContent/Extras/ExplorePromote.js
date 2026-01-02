import React from "react";
import { Grid, Card, GridItem, Center, Text, Box, SimpleGrid } from "@chakra-ui/react";
import NextLink from "next/link"; // 1. Renamed import for clarity

const ExplorePromote = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }} // Stack on mobile (1), Side-by-side on desktop (2)
      spacing={5}
      mt="5"
      w="full"
    >
      {/* First Card */}
      <Card
        as={NextLink}
        href="/search/books/starwars"
        // Styles
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          textDecoration: "none",
          transform: "scale(1.02)",
          transition: "0.2s",
        }}
         borderRadius="lg"
      >
        <Box
          bg="#3E3232"
          p={{ base: 8, md: 12 }}
         
         borderRadius={"lg"}
          color="white"
          fontFamily="sans-serif"
          width={"100%"}
          lineHeight="0.9"
          userSelect="none"
        >
          <Text
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="whiteAlpha.500"
            letterSpacing="tight"
          >
            Discover
          </Text>
          <Text
            fontSize={{
              base: "1rem",
              md: "1.5rem",
              lg: "2rem",
              xl: "3rem",
            }}
            fontWeight="bold"
            color="white"
          >
            Explore Books
          </Text>
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="bold"
            color="whiteAlpha.500"
            letterSpacing="tight"
            my="2%"
          >
            Your Next Novel
          </Text>
        </Box>
      </Card>

      {/* Second Card */}
      <Card
        as={NextLink}
        href="/bookshelves/all"
        // Styles
         borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          textDecoration: "none",
          transform: "scale(1.02)",
          transition: "0.2s",
        }}
      >
        <Box
          bg="#ac9a8fff"
          p={{ base: 8, md: 12 }}
          borderRadius="lg"
          color="white"
          fontFamily="sans-serif"
          width={"100%"}
          lineHeight="0.9"
          userSelect="none"
        >
          <Text
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="whiteAlpha.500"
            letterSpacing="tight"
          >
            Manage
          </Text>
          <Text
            fontSize={{
              base: "1rem",
              md: "1.5rem",
              lg: "2rem",
              xl: "3rem",
            }}
            fontWeight="bold"
            color="white"
          >
            Bookshelves
          </Text>
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="bold"
            color="whiteAlpha.500"
            letterSpacing="tight"
            my="2%"
          >
            Curate Your Books
          </Text>
        </Box>
      </Card>
    </SimpleGrid>
  );
};

export default ExplorePromote;
