import React from "react";
import { Box, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import BookCardRec from "../../BookDetails/Cards/BookCardRec";
import { RiSearchEyeLine } from "react-icons/ri";
const SearchList = ({ results, totalItems }) => {
  
  return (
    <>
      {totalItems !== 0 ? (
        <Box my="1%">
          <Text
            my={{ lg: "1%", md: "4%", sm: "10%" }}
            fontWeight={"bold"}
            fontSize="1rem"
            color={"gray"}
          >
            {totalItems} books found. Showing 20 results.
          </Text>
          <SimpleGrid
            columns={{ base: 4, lg: 4, md: 2, sm: 2 }}
            spacing={"20px"}
            minChildWidth="400px"
          >
            {results.map((book) => (
              <BookCardRec key={book.id} book={book} />
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <EmptySearch />
      )}
    </>
  );
};

const EmptySearch = () => {
  return (
    <>
      <Box textAlign={"center"} my="10%">
        <Icon
          mr="1"
          fontSize={"5rem"}
          color="#805ad5"
          as={RiSearchEyeLine}
        ></Icon>
        <Text fontWeight={"bold"} fontSize="2rem" color="#805ad5">
          No Results found!
        </Text>
      </Box>
    </>
  );
};

export default SearchList;
