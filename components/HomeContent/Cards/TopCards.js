import React, { useState, useEffect } from "react";

import { Box, SimpleGrid, Center, Link, VStack, Text } from "@chakra-ui/react";
import { FaChessKing, FaGhost, FaHeart, FaSpaceShuttle } from "react-icons/fa";
const TopCards = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    setProperties([
      { id: 1, title: "Fantasy", pageid: "#fantasy" , color: "#95b8d1", icon: <FaChessKing />},
      { id: 2, title: "Sci-Fi", pageid: "#science-fiction", color: "#9381ff", icon: <FaSpaceShuttle />},
      { id: 3, title: "Thriller", pageid: "#thriller", color: "#c8b6ff", icon: <FaGhost /> },
      { id: 4, title: "Romance", pageid: "#romance", color: "#e27396", icon: <FaHeart />},
    ]);
  }, []);

  return (
    <>
      <SimpleGrid columns={{ lg: 4, md: 2, sm: 2 }} mt={50} spacing="20px">
        {properties.map((property) => (
          <Box
            width="100%"
            borderWidth="0px"
            borderRadius="lg"
            overflow="hidden"
            height="200"
            boxShadow="lg"
            className="categories"
            key={property.id}
          >
            <Cards property={property} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

const Cards = ({ property }) => {
  return (
    <Link href={property.pageid} style={{ textDecoration: "none" }}>
      <Box
        h="200px"
        w="100%"
        bg={property.color}
        boxShadow="lg"
        position="relative"
        overflow="hidden"
        color="white"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: "translateY(-8px)", // Moves up on hover
          boxShadow: "2xl", // Shadow grows
          filter: "brightness(1.1)", // Slightly brighter
        }}
      >
        <Box
          position="absolute"
          top="15"
          right="-10"
          fontSize={"10rem"}
          borderRadius="full"
          color="whiteAlpha.400"
        >
          {property.icon}
        </Box>

        <Center h="100%">
          <VStack spacing={1}>
            <Text
              fontWeight="bold"
              fontSize="3xl"
              letterSpacing="wide"
              textShadow="0px 2px 4px rgba(0,0,0,0.3)"
            >
              {property.title}
            </Text>
          </VStack>
        </Center>
      </Box>
    </Link>
  );
};

export default TopCards;
