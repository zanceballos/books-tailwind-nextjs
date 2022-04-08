import React from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import BookCardRec from "../Cards/BookCardRec";
const RecommendList = ({ details, similar }) => {
  console.log(similar)
  return (
    <>
      <Box my="4%">
        <Text
          fontWeight={"bold"}
          fontSize={"2rem"}
          colorScheme={"purple"}
          mb={"1%"}
        >
          Similar books from {details.volumeInfo.authors[0]}
        </Text>
        <SimpleGrid columns={{base:4, lg:4,md: 2, sm:2}} spacing={"10px"} minChildWidth="400px">
          {similar.map((book) => (
            <BookCardRec key={book.id} book={book}/>
          )).slice(0,4)}
        </SimpleGrid>
        
      </Box>
    </>
  );
};

export default RecommendList;
