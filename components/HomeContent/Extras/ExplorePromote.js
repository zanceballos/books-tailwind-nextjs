import React from "react";
import { Grid, GridItem, Center, Text } from "@chakra-ui/react";
import NextLink from "next/link"; // 1. Renamed import for clarity

const ExplorePromote = () => {
  return (
    <Grid
      h={{ base: "200px", sm: "200px" }}
      marginTop="4rem"
      templateRows="1fr"
      templateColumns="repeat(12, 1fr)"
      gap={4}
    >
      {/* First Card */}
      <GridItem
        as={NextLink}
        href="/search/books/starwars"
        // Styles
        className="column-explore"
        rounded="lg"
        boxShadow="lg"
        rowSpan={1}
        colSpan={{ base: 6, md: 6, sm: 6 }}
        bg="tomato"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          textDecoration: "none",
          transform: "scale(1.02)",
          transition: "0.2s",
        }}
      >
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
      </GridItem>

      {/* Second Card */}
      <GridItem
        as={NextLink}
        href="/bookshelves"
        className="column-explore"
        rounded="lg"
        boxShadow="lg"
        rowSpan={1}
        colSpan={{ base: 6, md: 6, sm: 6 }}
        bg="tomato"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _hover={{
          textDecoration: "none",
          transform: "scale(1.02)",
          transition: "0.2s",
        }}
      >
        <Text
          fontSize={{
            base: "1rem",
            md: "1.5rem",
            lg: "2rem",
            xl: "3rem",
          }}
          fontWeight="bold"
          color="white"
          alignItems={"center"}
        >
          Your Bookshelves
        </Text>
      </GridItem>
    </Grid>
  );
};

export default ExplorePromote;
