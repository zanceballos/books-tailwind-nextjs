import React, { useState, useEffect } from "react";
import {
  Text,
  Box,
  SimpleGrid,
  Center,
  Button,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Icon,
} from "@chakra-ui/react";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { db } from "../../config/firebase";
import { useAuth } from "../../service/AuthService";
import { useToast } from "@chakra-ui/react";
const BookImage = ({ details }) => {
  const { currentUser } = useAuth();
  const toast= useToast()
  const router = useRouter();
  const [favourite, setFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser != null) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("favourites")
        .where("id", "==", details.id)
        .get()
        .then((results) => {
          if (results.size > 0) {
            setFavourite(true);
            setLoading(false);
          } else {
            setFavourite(false);
            setLoading(false);
          }
        });
    } else {
      setFavourite(false);
      setLoading(false);
    };
  }, [details]);

  const favouriteBook = () => {
    if (currentUser != null) {
      setFavourite(!favourite);
      db.collection("users")
        .doc(currentUser.uid)
        .collection("favourites")
        .add(details);
    } else {
      toast({
        title: "Please Login!",
        description: "You need an account to perform this action!",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      router.replace("/account/login");
    }
  };

  const removeFavourite = () => {
    if (currentUser != null) {
      setFavourite(!favourite);
      db.collection("users")
        .doc(currentUser.uid)
        .collection("favourites")
        .where("id", "==", details.id)
        .get()
        .then((results) => {
          results.forEach((docs) => {
            docs.ref.delete();
          });
        });
    } else {
      toast({
        title: "Please Login!",
        description: "You need an account to perform this action!",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      router.replace("/account/login");
    }
  };

  return (
    <div>
      <Box
        role={"group"}
        p={6}
        minW={{ base: "400px", lg: "350px", md: "300px", sm: "300px" }}
        maxW={"450px"}
        height="600px"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage:
              details.volumeInfo.imageLinks != undefined
                ? `url(${details.volumeInfo.imageLinks.thumbnail})`
                : "https://www.biotrop.org/images/default-book.png",
            filter: "blur(15px)",
            zIndex: -1,
            
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Center>
            <Image
              rounded={"lg"}
              objectFit={""}
              backgroundPosition={"center"}
              src={details.volumeInfo.imageLinks.thumbnail}
              alt="https://www.biotrop.org/images/default-book.png"
              mt="20px"
            />
          </Center>
        </Box>
        <Stack pt={10} align="center">
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            alignContent="center"
            textTransform={"uppercase"}
          >
            {details.volumeInfo.publisher != undefined
              ? details.volumeInfo.publisher
              : "No Publisher"}
          </Text>

          <Heading
            align="center"
            fontSize={{ base: "1.5rem", lg: "1.5rem", md: "1rem", sm: "1rem" }}
            fontFamily={"body"}
            fontWeight={800}
            noOfLines={2}
            justifyContent="center"
          >
            {details.volumeInfo.title != undefined
              ? details.volumeInfo.title
              : "No Title"}
          </Heading>

          <Stack direction={"row"} align={"center"}>
            <Text
              alignItems="center"
              fontSize={{
                base: "1.2rem",
                lg: "1.2rem",
                md: "0.8rem",
                sm: "0.8rem",
              }}
            >
              {details.volumeInfo.authors != undefined
                ? details.volumeInfo.authors[0]
                : "No Authors"}
            </Text>
          </Stack>

          <Button
            variant={favourite ? "solid" : "outline"}
            width="80%"
            rounded="3xl"
            colorScheme="purple"
            mt="100px"
            onClick={favourite === false ? favouriteBook : removeFavourite}
            isLoading={loading ? true : false}
          >
            <Icon
              mr="4"
              fontSize={"16"}
              color={favourite && "white"}
              as={favourite ? AiFillHeart : FiHeart}
            ></Icon>
            {favourite ? "Added To Favorites" : "Favorite"}
          </Button>

          <Link href={`/books/details/${details.id}`} passHref>
            <Button width="80%" rounded="3xl" colorScheme="gray">
              <Icon
                mr="4"
                fontSize={"16"}
                _groupHover={{ color: "black" }}
                as={FiBookmark}
              ></Icon>
              Bookshelve
            </Button>
          </Link>
        </Stack>
      </Box>
    </div>
  );
};

export default BookImage;
