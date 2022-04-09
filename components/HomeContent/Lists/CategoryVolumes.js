import React, { useEffect, useState } from "react";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
  Text
} from "@chakra-ui/react";

import BookCardCategories from "../Cards/BookCardCategories";
const CategoryVolumes = ({ header, pageid, query }) => {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Call the api and set te state
    const getVolumesfromURl = async () => {
      const res = await fetch(
        `http://localhost:3000/api/books/volumes/${query}`
      );
      const volumes = await res.json();
      return volumes;
    };

    getVolumesfromURl().then((data) => {
      setTimeout(() => {
        setVolumes(data.items);
        setLoading(false);
     
      }, 2800);
  
    });
  }, []);

  return (
    <>
      {!loading ? (
        <div id={pageid}>
          <Text
            fontSize="4xl"
            fontWeight="bold"
            style={{ paddingTop: "2rem", paddingBottom: "0.5rem" }}
          >
            {header}
          </Text>
         {volumes != null && <SimpleGrid
            columns={{ base: 8, lg: 8, md: 4, sm: 2, xs: 2 }}
            minChildWidth={{
              base: "200px",
              lg: "200px",
              md: "170px",
              sm: "170px",
            }}
            spacing="40px"
          >
            {volumes.map((book) => (
                <BookCardCategories key={book.id} details={book} />
              ))
              .slice(0, 8)}
          </SimpleGrid>}
        </div>
      ) : (
        <>
          <SimpleGrid
            columns={{ base: 4, lg: 4, md: 4, sm: 2, xs: 2 }}
            minChildWidth={{
              lg: "200px",
              md: "200px",
              sm: "200px",
            }}
            spacing="10"
          >
            <BookInfoSmallSkeleton />
            <BookInfoSmallSkeleton />
            <BookInfoSmallSkeleton />
            <BookInfoSmallSkeleton />
            
          </SimpleGrid>
        </>
      )}
    </>
  );
};


const BookInfoSmallSkeleton = () => {
  return (
    <>
      <Box padding="10" mt="2%" boxShadow="lg" bg="white" mb={50}>
        <SkeletonCircle
          size={{ base: "150px", lg: "150px", md: "150px", sm: "150px" }}
        />
        <SkeletonText mt="10" noOfLines={6} spacing="5" />
      </Box>
    </>
  );
};

export default CategoryVolumes;
