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
import Link from "next/link";

const BookCardReleases = ({ details }) => {
  return (
    <div>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        height="500px"
        w={"full"}
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
            backgroundImage: `url(${details.volumeInfo.imageLinks.thumbnail})`,
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
            src={details.volumeInfo.imageLinks.thumbnail}
            alt="https://www.biotrop.org/images/default-book.png"
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
            noOfLines={{sm:"2"}}
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
          <Link href={`/books/details/${details.id}`} passHref>
            <Button
              width="80%"
              position="absolute"
              bottom="4"
              rounded="3xl"
              colorScheme="gray"
            >
              Details
            </Button>
          </Link>
        </Stack>
      </Box>
    </div>
  );
};

export default BookCardReleases;
