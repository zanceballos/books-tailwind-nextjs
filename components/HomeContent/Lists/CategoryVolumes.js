import React, { useEffect, useState } from "react";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
  Text,
  HStack,
} from "@chakra-ui/react";
import { server } from "../../../config";
import BookCardCategories from "../Cards/BookCardCategories";
const CategoryVolumes = ({ header, pageid, query }) => {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Call the api and set te state
    const getVolumesfromURl = async () => {
      const res = await fetch(`${server}/api/books/volumes/${query}`);
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
          <Box width={"100%"}>
            {volumes != null && (
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
                {volumes.map((book) => (
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
                ))}
              </HStack>
            )}
          </Box>
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
      <Box padding="10" mt="2%" boxShadow="lg" bg="white" >
        <SkeletonCircle
          size={{ base: "150px", lg: "150px", md: "100px", sm: "100px" }}
        />
        <SkeletonText mt="10" noOfLines={6} spacing="5" />
      </Box>
    </>
  );
};

export default CategoryVolumes;
