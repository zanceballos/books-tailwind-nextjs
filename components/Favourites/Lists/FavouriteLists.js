import React, { useState, useEffect } from "react";
import FavouriteCard from "../Cards/FavouriteCard";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../service/AuthService";
import NextLink from "next/link";
import { GridItem, useToast } from "@chakra-ui/react";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
  Text,
  Button,
  Grid,
} from "@chakra-ui/react";
const FavouriteLists = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useAuth();
  const toast = useToast();

  useEffect(() => {
    // Load the list
    async function getFavourites() {
      setIsLoaded(true);
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("favourites")
        .get()
        .then((results) => {
          results.docs.forEach((item) => {
            setList((list) => [...list, item.data()]);
          });
        })
        .then(() => {
          setLoading(false);
        });
    }
    if (!isLoaded) {
      getFavourites();
    }
  }, []);

  const removeFromFavourites = (id) => {
    db.collection("users")
      .doc(currentUser.uid)
      .collection("favourites")
      .where("id", "==", id)
      .get()
      .then((results) => {
        results.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .then(() => {
        toast({
          title: "Removed From Favourites",
          description: "Book was successfully removed from your favourites!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setList((list) => list.filter((book) => book.id !== id));
      });
  };

  return (
    <>
      {loading === true ? (
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
              Fetching Your Favourites
            </Text>
            <Text fontSize="1rem">
              Please sit tight while we get all of your favourites!
            </Text>
          </Box>
          <SimpleGrid
            columns={{ base: 2, lg: 2, md: 6, sm: 2, xs: 2 }}
            minChildWidth={{
              lg: "200px",
              md: "200px",
              sm: "200px",
            }}
            spacing="10"
          >
            <BookInfoSmallSkeleton />
            <BookInfoSmallSkeleton />
            
          </SimpleGrid>
        </>
      ) : (
        <>
          {!loading && list.length === 0 ? (
            <Empty />
          ) : (
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
                  fontSize={{
                    base: "3rem",
                    lg: "3rem",
                    md: "2rem",
                    sm: "2rem",
                  }}
                >
                  Your Favourites
                </Text>
                <Text fontSize="1rem">
                  List of all of your favourite books here!
                </Text>
              </Box>
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
                {list.map((book) => (
                  <GridItem key={book.id} colSpan={{ lg: 1, md: 3, sm: 3 }}>
                    <FavouriteCard book={book} remove={removeFromFavourites} />
                  </GridItem>
                ))}
              </SimpleGrid>
            </>
          )}
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

const Empty = () => {
  return (
    <>
      <Box textAlign={"center"} mt="10%">
        <Text fontWeight={"bold"} fontSize="2rem">
          Your Favourites List is Empty!
        </Text>
        <Text fontWeight={"bold"} color="gray" fontSize="1rem">
          Your Favourites List is Empty!
        </Text>

        <Button
          as={NextLink}
          href="/"
          mt="1%"
          width={"200px"}
          height="60px"
          rounded={"full"}
          shadow="lg"
          colorScheme={"purple"}
        >
          {" "}
          Explore Books{" "}
        </Button>
      </Box>
    </>
  );
};

export default FavouriteLists;
