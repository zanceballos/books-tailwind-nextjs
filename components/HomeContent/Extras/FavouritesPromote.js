import React from "react";
import { Grid, GridItem, Box, Center, Text } from "@chakra-ui/react";
const FavouritesPromote = () => {
  return (
    <>
      <Grid
        h={{ base: "150px", lg: "150px", md: "150px", sm: "150px" }}
        marginTop="4rem"
        templateRows={{
          base: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
        }}
        templateColumns="repeat(12, 1fr)"
        gap={4}
      >
        <GridItem
          className="column-favourite"
          rounded="lg"
          boxShadow="lg"
          rowSpan={{ base: 1, lg: 1, md: 1, sm: 1 }}
          colSpan={{ base: 12, md: 12, sm: 12 }}
          bg="tomato"
        >
          <Center>
            <Box>
              <Text
                fontSize={{
                  base: "4rem",
                  lg: "3rem",
                  md: "2rem",
                  sm: "1.5rem",
                }}
                fontWeight="bold"
                color="white"
              >
                Manage Your Favourites
              </Text>
            </Box>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
};

export default FavouritesPromote;
