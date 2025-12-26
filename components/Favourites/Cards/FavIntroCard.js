import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
const FavIntroCard = () => {
  return (
    <>
      <Box
        rounded={"lg"}
        p={"6"}
        width="100%"
        backgroundRepeat="no-repeat"
        backgroundPosition={"center"}
        alignItems="center"
        mb="2%"
      >
        <Text
          fontWeight={"bold"}
          fontSize={{ base: "3rem", lg: "3rem", md: "2rem", sm: "2rem" }}
        >
          Your Favourites
        </Text>
        <Text fontSize="1rem">All of your Favourite Books!</Text>
      </Box>
    </>
  );
};

export default FavIntroCard;
