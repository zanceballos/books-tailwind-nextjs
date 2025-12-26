import React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import Link from "next/link";

const ColumnsCards = ({ images }) => {
  
  const cardStyles = {
    rounded: "lg",
    boxShadow: "lg",
    display: "flex",
    alignItems: "center", // Vertical Center
    justifyContent: "center", // Horizontal Center
    transition: "all 0.2s",
    cursor: "pointer",
    _hover: {
      transform: "scale(1.02)",
      boxShadow: "xl",
    },
  };

  return (
    <Grid
      h="500px"
      templateRows={{
        base: "repeat(12, 1fr)",
        sm: "repeat(12, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      templateColumns="repeat(12, 1fr)"
      gap={4}
    >
      {/* Card 1: New Releases */}
      <GridItem
        as={Link} 
        href="#new-releases"
        {...cardStyles}
        rowSpan={{ base: 2, lg: 2, md: 2, sm: 4 }}
        colSpan={{ base: 6, md: 6, sm: 12 }}
        bg="tomato"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgImage={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('" + images.newReleases + "')"}
        _hover={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
          textDecoration: "none", 
          transform: "scale(1.02)",
          transition: "all 0.2s",
        }}
        bgSize={"cover"}
        bgPos={"center"}
        bgColor={"#d0d0d0"}
      >
        <Text
          fontSize={{ base: "4rem", lg: "3rem", md: "2rem", sm: "1.5rem" }}
          fontWeight="bold"
          color="white"
        >
          New Releases
        </Text>
      </GridItem>

      {/* Card 2: Top Books */}
      <GridItem
        as={Link}
        href="#top-books"
        {...cardStyles}
        rowSpan={{ base: 1, lg: 1, md: 1, sm: 3 }}
        colSpan={{ base: 3, md: 3, sm: 6 }}
        bg="papayawhip"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgImage={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('" + images.topBooks + "')"}
        _hover={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.63)",
          textDecoration: "none", 
          transform: "scale(1.02)", 
          transition: "all 0.2s",
        }}
        bgSize={"cover"}
        bgPos={"center"}
        bgColor={"#d0d0d0"}
      >
        <Text
          fontSize={{ base: "3rem", lg: "2rem", md: "2rem", sm: "1.5rem" }}
          fontWeight="bold"
          color="white"
        >
          Top Books
        </Text>
      </GridItem>

      {/* Card 3: Top Authors */}
      <GridItem
        as={Link}
        href="#top-authors"
        {...cardStyles}
        rowSpan={{ base: 1, lg: 1, md: 1, sm: 3 }}
        colSpan={{ base: 3, md: 3, sm: 6 }}
        bg="papayawhip"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgImage={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('" + images.topAuthors + "')"}
        _hover={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
          textDecoration: "none", 
          transform: "scale(1.02)", 
          transition: "all 0.2s",
        }}
        bgSize={"cover"}
        bgPos={"center"}
        bgColor={"#d0d0d0"}
      >
        <Text
          fontSize={{ base: "3rem", lg: "2rem", md: "2rem", sm: "1.5rem" }}
          fontWeight="bold"
          color="white"
          textAlign={"center"}
        >
          Top Authors
        </Text>
      </GridItem>

      {/* Card 4: Best Sellers */}
      <GridItem
        as={Link}
        href="#best-sellers"
        {...cardStyles}
        rowSpan={{ base: 1, lg: 1, md: 1, sm: 12 }}
        colSpan={{ base: 6, md: 6, sm: 12 }}
        bgImage={"linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url('" + images.bestSellers + "')"}
        _hover={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
          textDecoration: "none", 
          transform: "scale(1.02)", 
          transition: "all 0.2s",
        }}
        bgSize={"cover"}
        bgPos={"center"}
        bgColor={"#d0d0d0"}
      >
        <Text
          fontSize={{ base: "3rem", lg: "2rem", md: "2rem", sm: "1.5rem" }}
          fontWeight="bold"
          color="white"
        >
          Best Sellers
        </Text>
      </GridItem>
    </Grid>
  );
};

export default ColumnsCards;
