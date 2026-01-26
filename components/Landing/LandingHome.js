import React, { useState, useEffect } from "react";
import {
  Box,
  Image,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlay, FaPlus, FaArrowRight } from "react-icons/fa";

const LandingHome = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        setLoading(true);
        // Fetch famous/top books from Google Books API
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=10`,
        );
        const data = await response.json();

        if (data.items) {
          setTopBooks(data.items);
        }
      } catch (error) {
        console.error("Error fetching top books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBooks();
  }, []);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < topBooks.length - 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 300);
    }
  };

  const currentBook = topBooks[currentIndex]?.volumeInfo || {};

  // Get high quality image URL
  const getHighQualityImage = (imageLinks) => {
    if (!imageLinks) return null;
    // Try to get the largest available image
    const imageUrl = imageLinks.large || imageLinks.medium || imageLinks.small || imageLinks.thumbnail || imageLinks.smallThumbnail;
    if (imageUrl) {
      // Convert to https and increase zoom for better quality
      return imageUrl
        .replace('http:', 'https:')
        .replace('zoom=1', 'zoom=3')
        .replace('&edge=curl', '');
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        width={"full"}
        h={{ base: "500px", md: "450px" }}
        bg="gray.900"
        borderRadius={"lg"}
        shadow={"lg"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontSize="xl">
          Loading top books...
        </Text>
      </Box>
    );
  }

  return (
    <>
      {" "}
      {topBooks.length > 0 && topBooks[currentIndex] && (
        <>
          <Box
            width={"full"}
            h={{ base: "500px", md: "450px" }}
            position={"relative"}
            overflow={"hidden"}
            bg="gray.900"
            borderRadius={"lg"}
            shadow={"lg"}
            transition="opacity 0.3s ease-in-out"
          >
            <Image
              src={
                getHighQualityImage(currentBook.imageLinks) ||
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
              }
              alt="Background"
              w="full"
              h="full"
              objectFit="cover"
              position="absolute"
              top="0"
              left="0"
              filter="brightness(0.6) blur(2px)"
              transform="scale(1.1)"
              transition="opacity 0.3s ease-in-out"
              opacity={fadeIn ? 1 : 0}
            />

            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              bgGradient="linear(to-r, purple.800 10%, transparent 100%)"
            ></Box>

            <Box
              position="absolute"
              bottom="0"
              w="full"
              h="200px"
              bgGradient="linear(to-t, purple.800, transparent)" //
            />

            <Flex
              position={"relative"}
              zIndex={"1"}
              w="full"
              align={"center"}
              px={{ base: 4, md: 10 }}
              gap={8}
              maxW="7xl"
              mx="auto"
            >
              <Image
                src={
                  getHighQualityImage(currentBook.imageLinks) ||
                  "https://m.media-amazon.com/images/I/91Gj-44WqkL._AC_UF1000,1000_QL80_.jpg"
                }
                alt={currentBook.title || "Book cover"}
                h={{ base: "200px", md: "350px" }}
                w={"200px"}
                borderRadius="md"
                boxShadow="dark-lg"
                display={{ base: "none", md: "block" }}
                transform="translateY(20px)"
                opacity={fadeIn ? 1 : 0}
              />

              <Stack spacing={5} maxW="600px" justify="center" mt="20px">
                <Heading
                  color="white"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="black"
                  lineHeight="1"
                >
                  {currentBook.title || "Some Book"}
                </Heading>

                <Text
                  color="gray.300"
                  fontSize={{ base: "sm", md: "lg" }}
                  noOfLines={3}
                >
                  {currentBook.description ||
                    "A lone astronaut must save the earth from disaster in this spacetacular adventure. Ryland Grace is the sole survivor on a desperate, last-chance mission."}
                </Text>

                <Text fontWeight="bold" color="purple.300">
                  By {currentBook.authors?.join(", ") || "Andy Weir"}
                </Text>

                <Stack direction="row" spacing={4} pt={2}>
                  <Button
                    leftIcon={<Icon as={FaPlay} />}
                    bg="white"
                    color="black"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ bg: "gray.200" }}
                  >
                    Read Now
                  </Button>

                  <Button
                    leftIcon={<Icon as={FaPlus} />}
                    variant="outline"
                    color="white"
                    colorScheme="whiteAlpha"
                    size="lg"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    My List
                  </Button>
                </Stack>
              </Stack>
            </Flex>

            {/* Absolute positioned navigation buttons */}
            <Button
              position="absolute"
              left={{ base: "10px", md: "20px" }}
              top="50%"
              transform="translateY(-50%)"
              bg="whiteAlpha.500"
              color="white"
              size="lg"
              fontWeight="bold"
              borderRadius="full"
              zIndex={2}
              _hover={{ bg: "whiteAlpha.900", color: "black" }}
              onClick={handlePrevious}
              isDisabled={currentIndex === 0}
            >
              <Icon as={FaArrowLeft} />
            </Button>

            <Button
              position="absolute"
              right={{ base: "10px", md: "20px" }}
              top="50%"
              transform="translateY(-50%)"
              bg="whiteAlpha.500"
              color="white"
              size="lg"
              fontWeight="bold"
              borderRadius="full"
              zIndex={2}
              _hover={{ bg: "whiteAlpha.900", color: "black" }}
              onClick={handleNext}
              isDisabled={currentIndex === topBooks.length - 1}
            >
              <Icon as={FaArrowRight} />
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default LandingHome;
