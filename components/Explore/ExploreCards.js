import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import BookCardCategories from "../HomeContent/Cards/BookCardCategories";
const ExploreCards = ({ results }) => {
  return (
    <>
      {results && (
        <Box>
          <Text fontSize={"2xl"} fontWeight="bold" >
            Top Picks For You
          </Text>

          <Box width={"100%"}>
            {results != null && (
              <HStack
                spacing={2}
                overflowX="auto"
                css={{
                  "&::-webkit-scrollbar": { height: "4px" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#00000014",
                    borderRadius: "24px",
                  },
                }}
                my="2"
              >
                {results?.map((book) => (
                  <Box
                    key={book.id}
                    mx={"2"}
                    flexShrink={0}
                    display={"flex"}
                    justifyContent={"center"}
                    mb="5"
                  >
                    <BookCardCategories key={book.id} details={book} />
                  </Box>
                )).slice(0, 10)}
              </HStack>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ExploreCards;
