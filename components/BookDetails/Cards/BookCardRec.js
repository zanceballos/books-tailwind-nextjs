import React from "react";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
const BookCardRec = ({ book }) => {
  return (
    <>
      <Box
        boxShadow={"lg"}
        rounded="lg"
        width={"100%"}
        mt={{ base: "1%", lg: "1%", md: "1%", sm: "1%" }}
      >
        <Box p={"3"}>
          <Flex>
            <Box
              rounded={"lg"}
              pos={"relative"}
              height={"230px"}
              width="50%"
              _after={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                top: 1,
                left: 0,
                backgroundImage:
                  book.volumeInfo.imageLinks != null
                    ? `url(${book.volumeInfo.imageLinks.thumbnail})`
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
              <Image
                alt="alt"
                src={
                  book.volumeInfo.imageLinks != undefined
                    ? book.volumeInfo.imageLinks.thumbnail
                    : "https://www.biotrop.org/images/default-book.png"
                }
                shadow="2xl"
                rounded={"lg"}
                border="0.5px"
              />
            </Box>

            <Box p={"6"} width="100%">
              <Text fontSize={"1rem"} fontWeight="bold" noOfLines={1}>
                {book.volumeInfo.title != undefined
                  ? book.volumeInfo.title
                  : "No title"}
              </Text>
              <Text
                fontSize={"0.8rem"}
                fontWeight="bold"
                color={"gray"}
                noOfLines={1}
              >
                by{" "}
                {book.volumeInfo.authors != null
                  ? book.volumeInfo.authors[0]
                  : "No authors"}
              </Text>
              <Badge colorScheme={"purple"} rounded="full" mx="2px" my="2px">
                {book.volumeInfo.categories != undefined
                  ? book.volumeInfo.categories[0]
                  : "No Category"}
              </Badge>

              <Text
                fontSize={"0.8rem"}
                fontWeight="bold"
                color={"gray"}
                noOfLines={1}
                mt="2"
              >
                {book.volumeInfo.publisher != undefined
                  ? book.volumeInfo.publisher
                  : "No Publisher"}{" "}
                (
                {book.volumeInfo.publishedDate != undefined
                  ? book.volumeInfo.publishedDate
                  : "No Publisher"}
                )
              </Text>

              <Box pt="10px">
                <Link href={`/books/details/${book.id}`} passHref>
                  <Button colorScheme={"gray"}>Details</Button>
                </Link>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default BookCardRec;
