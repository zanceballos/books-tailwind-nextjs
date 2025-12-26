import React, { useState, useEffect } from "react";

import { Box, SimpleGrid, Center, Link } from "@chakra-ui/react";
const TopCards = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    setProperties([
      {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        title: "Fantasy",
        pageid: "#fantasy",
      },
      {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        title: "Sci-Fi",
        pageid: "#science-fiction",
      },
      {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        title: "Thriller",
        pageid: "#thriller",
      },
      {
        imageUrl: "https://bit.ly/2Z4KKcF",
        imageAlt: "Rear view of modern home with pool",
        title: "Romance",
        pageid: "#romance",
      },
    ]);
  }, []);

  return (
    <>
      <SimpleGrid columns={{lg:4, md:2, sm:2}} mt={50} spacing="40px">
        {properties.map((property) => (
          <Box
            width="100"
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
    <Center>
      <Link href={property.pageid}>
        <Box p="6">
          <Center>
            <Box
              mt="1"
              fontWeight="bold"
              as="h4"
              fontSize="3xl"
              lineHeight="tight"
              isTruncated
            >
              {property.title}
            </Box>
          </Center>
        </Box>
      </Link>
    </Center>
  );
};

export default TopCards;
