import React from "react";
import {
  Text,
  Box,
  Badge,
  Image,
  Center,
  Button,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

const BookCardCategories = ({ details }) => {
  return (
    <>
      <Box
        textAlign="center"
        height="400px"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
      >
        <Center>
          {details.volumeInfo.imageLinks != undefined ? (
            <Image
              minH={{ base: "229px" }}
              maxH={{ base: "229px" }}
              padding="4"
              src={details.volumeInfo.imageLinks.thumbnail}
              alt="alt"
              rounded="lg"
            />
          ) : (
            <Image
              minH={{ base: "100px" }}
              maxH={{ base: "229px" }}
              padding="4"
              src="https://www.biotrop.org/images/default-book.png"
              alt="alt"
            />
          )}
        </Center>

        <Box p="1">
          <Stack>
            <Box alignItems="center">
              {details.volumeInfo.categories != undefined ? (
                <Badge borderRadius="full" px="3" colorScheme="red">
                  {details.volumeInfo.categories[0]}
                </Badge>
              ) : (
                <Badge borderRadius="full" px="3" colorScheme="teal">
                  No Category
                </Badge>
              )}
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={{ base: 1, lg: 1, md: 1, sm: 1 }}
            >
              {details.volumeInfo.title}
            </Box>

            {details.volumeInfo.authors != undefined && (
              <Box>{details.volumeInfo.authors[0]}</Box>
            )}

            <Box>
              <Link href={`/books/details/${details.id}`} passHref>
                <Button width="80%" rounded="3xl" colorScheme="gray">
                  Details
                </Button>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default BookCardCategories;
