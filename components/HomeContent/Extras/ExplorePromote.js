import React from "react";
import { Grid, GridItem, Box, Center, Text } from "@chakra-ui/react";
const ExplorePromote = () => {
  return (
    <>
      <Grid
        h={{base:"200px", lg:"200px", md:"200px" , sm:"200px"}}
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
          className="column-explore"
          rounded="lg"
          boxShadow="lg"
          rowSpan={{ base: 1, lg: 1, md: 1, sm: 1 }}
          colSpan={{ base: 6, md: 6, sm: 6 }}
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
                Explore Books
              </Text>
            </Box>
          </Center>
        </GridItem>
        <GridItem
          className="column-explore"
          rounded="lg"
          boxShadow="lg"
          rowSpan={{ base: 1, lg: 1, md: 1, sm: 1 }}
          colSpan={{ base: 6, md: 6, sm: 6 }}
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
                Your Bookshelves
              </Text>
            </Box>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
};

export default ExplorePromote;
