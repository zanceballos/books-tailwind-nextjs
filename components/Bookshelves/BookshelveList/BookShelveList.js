import React, { useState, useEffect } from "react";
import { useAuth } from "../../../service/AuthService";
import { db } from "../../../config/firebase";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
  Text,
  Button,
  Grid,
} from "@chakra-ui/react";
const BookShelveList = () => {
  // Declare the states
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    //Get the list from Firebase Firestore
    async function getBookshelveList() {
      setIsLoaded(true);
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .get()
        .then((results) => {
          results.docs.forEach((item) => {
            setList((list) => [...list, item.data()]);
          });
        })
        .then(() => {
          setLoading(false);
          console.log("Bookshelve list loaded");
        });
    }
    if (!isLoaded) {
      getBookshelveList();
    }
  }, []);

  return (
    <>
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <>
          {!loading && list.length === 0 ? (
            <div>No bookshelves found</div>
          ) : (
            <div>
              {list.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
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
export default BookShelveList;
