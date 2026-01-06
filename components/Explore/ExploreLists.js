import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  Image,
  VStack,
  Badge,
  Icon,
  HStack,
  LinkBox,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import NextLink from "next/link";
const ExploreLists = ({ results }) => {
  return (
    <>
      {results && (
        <>
          <Box my="1%">
            <Text fontSize={"2xl"} fontWeight="bold" mb="4">
              Explore More Books
            </Text>

            <VStack spacing={4} align="stretch">
              {results?.map((book) => (
                <Box key={book.id} mb="1">
                  <MoreBooks book={book} />
                </Box>
              )).slice(11, 20)}
            </VStack>
          </Box>
        </>
      )}
    </>
  );
};

const MoreBooks = ({ book }) => {
  // Design Hooks
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const iconBg = useColorModeValue("purple.50", "rgba(128, 90, 213, 0.2)");

  return (
    <Box>
      <Flex
        align="center"
        gap={3}
        as={NextLink}
        href={`/books/details/${book.id}`}
        bg={bg}
        p={4}
        rounded="xl"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="sm"
        transition="all 0.2s ease"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "md",
          borderColor: "purple.200",
        }}
      >
        <Flex
          justify="center"
          align="center"
          h="60px"
          w="50px"
          rounded="md"
          bg={iconBg}
          overflow="hidden"
          flexShrink={0}
          minW="50px"
        >
          <Image
            src={book.volumeInfo?.imageLinks?.thumbnail}
            h="100%"
            w="100%"
            objectFit="cover"
            alt={book.volumeInfo?.title || "Book Cover"}
            fallbackSrc="https://via.placeholder.com/50x60?text=No+Img"
          />
        </Flex>
        <VStack align="start" spacing={1} flex={1} overflow="hidden">
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", lg: "lg", md: "md", sm: "sm" }}
            color={useColorModeValue("gray.800", "white")}
            noOfLines={1}
          >
            {book.volumeInfo?.title || "No Title"}
          </Text>
          <HStack spacing={2} fontSize="xs" color="gray.500">
            <Text>
              {book.volumeInfo?.pageCount
                ? `${book.volumeInfo.pageCount} pages`
                : "Unknown length"}
            </Text>

            <Text display={{ base: "none", md: "block" }}>•</Text>
            <Text display={{ base: "none", md: "block" }}>
              {book.volumeInfo?.publishedDate?.substring(0, 4) || "N/A"}
            </Text>
            <Text display={{ base: "none", md: "block" }}>•</Text>
            {book.volumeInfo?.categories?.[0] && (
              <Badge
                colorScheme="purple"
                variant="subtle"
                fontSize="0.65rem"
                px={2}
                py={1}
                borderRadius="full"
                maxW="150px"
                isTruncated
              >
                {book.volumeInfo.categories[0].split("/")[0]}
              </Badge>
            )}
          </HStack>
        </VStack>

        <Icon as={FaChevronRight} color="gray.400" />
      </Flex>
    </Box>
  );
};

export default ExploreLists;
