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
  useDisclosure,
} from "@chakra-ui/react";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { db } from "../../config/firebase";
import { useAuth } from "../../service/AuthService";
import { useToast } from "@chakra-ui/react";
import AddToShelveModal from "./AddToShelveModal";

const BookImage = ({ details }) => {
  const { currentUser } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [favourite, setFavourite] = useState(false);
  const [shelfs, setShelfList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { volumeInfo } = details;

  //Modal States
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Image handling logic
  const highResUrl = volumeInfo.imageLinks?.thumbnail
    ?.replace("http://", "https://")
    ?.replace("&edge=curl", "")
    ?.replace("zoom=1", "zoom=0");

  const safeThumbnail = volumeInfo.imageLinks?.thumbnail;
  const placeholder = "https://www.biotrop.org/images/default-book.png";
  const [imgSrc, setImgSrc] = useState(highResUrl || placeholder);

  useEffect(() => {
    setImgSrc(highResUrl || placeholder);
  }, [highResUrl]);

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
          } else {
            setFavourite(false);
          }
        })
        .then(() => {
          db.collection("users")
            .doc(currentUser.uid)
            .collection("bookshelves")
            .get()
            .then((results) => {
              let shelves = [];
              results.forEach((doc) => {
                shelves.push({ id: doc.id, ...doc.data() });
              });
              setShelfList(shelves);
              
            })
            .finally(() => {
              setLoading(false);
            });
        });
    } else {
      setFavourite(false);
      setLoading(false);
    }
  }, [details]);

  const favouriteBook = () => {
    if (currentUser != null) {
      setFavourite(!favourite);
      db.collection("users")
        .doc(currentUser.uid)
        .collection("favourites")
        .add(details)
        .then(() => {
          toast({
            title: "Added to Favourites!",
            description: "Book has been added to your favourites.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
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
          toast({
            title: "Removed from Favourites!",
            description: "Book has been removed from your favourites.",
            status: "warning",
            duration: 4000,
            isClosable: true,
            position: "top",
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
    }
  };

  const addToBookshelve = () => {
    if (currentUser != null) {
      onOpen();
    } else {
      toast({
        title: "Please Login!",
        description: "You need an account to perform this action!",
        status: "info",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const addBookToShelf = (shelfId) => {
    onClose();
    if (currentUser != null) {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .doc(shelfId)
        .collection("books")
        .add(details)
        .then(() => {
          toast({
            title: "Book Added to Bookshelve!",
            description: "Book has been added to your bookshelve.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top",
          });

        });
    }
  }

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
            backgroundImage: `url(${volumeInfo.imageLinks?.thumbnail})`,
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
              src={volumeInfo.imageLinks?.thumbnail}
              alt="https://www.biotrop.org/images/default-book.png"
              mt="20px"
              height={"230px"}
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
            width="90%"
            rounded="3xl"
            colorScheme="purple"
            mt="50px"
            onClick={favourite === false ? favouriteBook : removeFavourite}
            isLoading={loading ? true : false}
          >
            <Icon
              mr="4"
              fontSize={"16"}
              color={favourite && "white"}
              as={favourite ? AiFillHeart : FiHeart}
            ></Icon>
            {favourite ? "Added To Favourites" : "Favourite"}
          </Button>

          <Button
            variant="solid"
            width="90%"
            rounded="3xl"
            colorScheme="gray"
            isLoading={loading ? true : false}
            onClick={addToBookshelve}
          >
            <Icon
              mr="4"
              fontSize={"16"}
              _groupHover={{ color: "black" }}
              as={FiBookmark}
            ></Icon>
            Add to Bookshelve
          </Button>
        </Stack>
      </Box>
      <AddToShelveModal
        shelfs={shelfs}
        isOpen={isOpen}
        onClose={onClose}
        bookDetails={details}
        addBookToShelf={addBookToShelf}
        
      />
    </div>
  );
};

export default BookImage;
