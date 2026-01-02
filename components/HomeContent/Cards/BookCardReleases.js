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
} from "@chakra-ui/react";
import NextLink from "next/link";

const BookCardReleases = ({ details }) => {
  const { volumeInfo } = details;

  const highResUrl = `https://books.google.com/books/publisher/content/images/frontcover/${details.id}?fife=w400-h600&source=gbs_api`;


  const placeHolder = "https://www.biotrop.org/images/default-book.png";

  // State to hold the current image being displayed
  const [imgSrc, setImgSrc] = useState(highResUrl || placeHolder);

  useEffect(() => {
    setImgSrc(highResUrl || placeHolder);
  }, [highResUrl]);
  return (
    <div>
      <Box
        role={"group"}
        p={6}
        width={"330px"}
        height="500px"
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"lg"}
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
            backgroundImage: `url(${imgSrc})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={imgSrc}
            alt={volumeInfo.title || "Book Cover"}
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth < 50 && imgSrc !== highResUrl) {
                setImgSrc(placeHolder);
              }
            }}
            onError={() => {
              if (imgSrc !== placeHolder) {
                setImgSrc(placeHolder);
              }
            }}
          />
        </Box>
        <Stack pt={10} textAlign="center" align="center">
          <Text
            color={"gray.500"}
            fontSize={"sm"}
            alignContent="center"
            textTransform={"uppercase"}
            noOfLines={1}
          >
            {details.volumeInfo.publisher}
          </Text>

          <Heading
            align="center"
            fontSize={{ base: "1.5rem", lg: "1.5rem", md: "1rem", sm: "1rem" }}
            fontFamily={"body"}
            fontWeight={800}
            noOfLines={{ sm: "2" }}
          >
            {details.volumeInfo.title}
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
              {details.volumeInfo.authors[0]}
            </Text>
          </Stack>

          <Button
            as={NextLink}
            href={`/books/details/${details.id}`}
            width="80%"
            position="absolute"
            bottom="4"
            rounded="3xl"
            colorScheme="gray"
          >
            Details
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default BookCardReleases;
