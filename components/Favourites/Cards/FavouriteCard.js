import React from "react";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  Flex,
  Badge,
  Button,
  Center,
  VStack,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
const FavouriteCard = ({ book, remove }) => {
  const rawDescription =
    book.volumeInfo.description || "No description available.";

  const cleanDescription = rawDescription.replace(/<[^>]+>/g, "");
  return (
    <>
      <>
        <Box
          borderWidth="1px"
          borderRadius="xl"
          bg="white"
          boxShadow="md"
          overflow="hidden"
          p={{ base: 4, md: 6 }}
          mt={4}
          h="100%"
          display={"flex"}
          flexDirection={"column"}
        >
          <Flex direction={{ base: "column", md: "row" }} h="100%" alignItems={{md: "stretch"}} gap={6}>
            <Box
              flexShrink={0}
              mx={{ base: "auto", md: 0 }}
              width={{ base: "180px", md: "200px" }}
              rounded={"lg"}
              pos={"relative"}
              height={{ base: "250px", md: "auto" }}
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
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={`Cover of ${book.volumeInfo.title}`}
                borderRadius="lg"
                boxShadow="2xl"
                objectFit="cover"
                width="100%"
                height="auto"
                fallbackSrc="https://www.biotrop.org/images/default-book.png"
              />
            </Box>

            <VStack align="start" spacing={3} flex={1} w="full" h="100%" justifyContent={"space-between"}>
              {/* Title and Author */}
              <Box>
                <Heading size="lg" lineHeight="tight">
                  {book.volumeInfo.title}
                </Heading>
                <Text color="gray.600" fontWeight="medium" mt={1}>
                  by{" "}
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors[0]
                    : "Unknown"}
                </Text>
              </Box>

              <HStack spacing={1} align="center">
                <Text color="yellow.400" fontSize="lg">
                  ★★★★☆
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="bold" ml={2}>
                  4.5/5
                </Text>
              </HStack>

              <Badge
                colorScheme="purple"
                variant="subtle"
                fontSize="0.7rem"
                px={3}
                py={1}
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {book.volumeInfo.categories
                  ? book.volumeInfo.categories[0]
                  : "Uncategorized"}
              </Badge>

              <Text
                fontSize="sm"
                color="gray.700"
                noOfLines={{ base: 3, md: 4 }}
              >
                {cleanDescription}
              </Text>

              {/* Buttons located at the bottom */}
              <Stack direction="row" spacing={4} w="full" pt={4} mt="auto">
                <Button
                  as={NextLink}
                  href={`/books/details/${book.id}`}
                  colorScheme={"gray"}
                  mr="5px"
                >
                  Details
                </Button>
                <Button
                  onClick={() => remove(book.id)}
                  bgColor={"red.500"}
                  color="white"
                >
                  Remove
                </Button>
              </Stack>
            </VStack>
          </Flex>
        </Box>
      </>
    </>
  );
};

export default FavouriteCard;
