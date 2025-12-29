import React from "react";
import {
  Grid,
  GridItem,
  Box,
  Center,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaChevronRight } from "react-icons/fa";

const FavouritesPromote = () => {
  return (
    <>
      <Box
        mt="5%"
        bg="#abae93ff"
        p={{ base: 8, md: 12 }}
        borderRadius="3xl"
        color="white"
        fontFamily="sans-serif"
        width={"100%"}
        lineHeight="0.9"
        userSelect="none"
       
      >
        <HStack spacing={4}  as={NextLink}
        href={"/favourites"}>
          <Box>
            <Text
              fontSize={{
                base: "1rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "3rem",
              }}
              fontWeight="bold"
              color="whiteAlpha.700"
              letterSpacing="tight"
            >
              Toggle your likes
            </Text>
            <Text
              fontSize={{
                base: "1.3rem",
                md: "1.5rem",
                lg: "2rem",
                xl: "3rem",
              }}
              fontWeight="bold"
              color="white"
            >
              Favourites
            </Text>
            <Text
              fontSize={{
                base: "1rem",
                md: "1rem",
                lg: "2rem",
                xl: "3rem",
              }}
              fontWeight="bold"
              color="whiteAlpha.500"
              letterSpacing="tight"
            >
              Save It For Later
            </Text>
          </Box>
          <Spacer />
          <Text>
            <FaChevronRight size={"50px"} />
          </Text>
        </HStack>
      </Box>
    </>
  );
};

export default FavouritesPromote;
