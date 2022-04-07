import React, { useState, useEffect } from "react";
import { Grid, GridItem, Box, Center, Text } from "@chakra-ui/react";
import Link from "next/link";
const ColumnsCards = () => {
  return (
    <>
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
        <Link href="#new-releases" passHref>
          <GridItem
            className="column-category"
            rounded="lg"
            boxShadow="lg"
            rowSpan={{ base: 2, lg: 2, md: 2, sm: 4 }}
            colSpan={{ base: 6, md: 6, sm: 12 }}
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
                  New Releases
                </Text>
              </Box>
            </Center>
          </GridItem>
        </Link>

        <Link href="#top-books" passHref>
          <GridItem
            className="column-category"
            rounded="lg"
            boxShadow="lg"
            rowSpan={{ base: 1, lg: 1, md: 1, sm: 3 }}
            colSpan={{ base: 3, md: 3, sm: 6 }}
            bg="papayawhip"
          >
            <Center>
              <Box>
                <Text
                  fontSize={{
                    base: "3rem",
                    lg: "2rem",
                    md: "2rem",
                    sm: "1.5rem",
                  }}
                  fontWeight="bold"
                  color="white"
                >
                  Top Books
                </Text>
              </Box>
            </Center>
          </GridItem>
        </Link>

        <Link href="#top-books" passHref>
          <GridItem
            className="column-category"
            rounded="lg"
            boxShadow="lg"
            rowSpan={{ base: 1, lg: 1, md: 1, sm: 3 }}
            colSpan={{ base: 3, md: 3, sm: 6 }}
            bg="papayawhip"
          >
            <Center>
              <Box>
                <Text
                  fontSize={{
                    base: "3rem",
                    lg: "2rem",
                    md: "2rem",
                    sm: "1.5rem",
                  }}
                  fontWeight="bold"
                  color="white"
                >
                  Top Authors
                </Text>
              </Box>
            </Center>
          </GridItem>
        </Link>
        <Link href="#top-books" passHref>
          <GridItem
            className="column-category"
            rounded="lg"
            boxShadow="lg"
            rowSpan={{ base: 1, lg: 1, md: 1, sm: 12 }}
            colSpan={{ base: 6, md: 6, sm: 12 }}
            bg="tomato"
          >
            <Center>
              <Box>
                <Text
                  fontSize={{
                    base: "3rem",
                    lg: "2rem",
                    md: "2rem",
                    sm: "1.5rem",
                  }}
                  fontWeight="bold"
                  color="white"
                >
                  Best Sellers
                </Text>
              </Box>
            </Center>
          </GridItem>
        </Link>
      </Grid>
    </>
  );
};

export default ColumnsCards;
