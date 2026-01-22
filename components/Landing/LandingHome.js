import React from "react";
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
  return (
    <>
      <Box
        width={"full"}
        h={{ base: "500px", md: "450px" }}
        position={"relative"}
        overflow={"hidden"}
        bg="gray.900"
        borderRadius={"lg"}
        shadow={"lg"}
      >
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
          alt="Background"
          w="full"
          h="full"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
          filter="brightness(0.6) blur(2px)"
          transform="scale(1.1)"
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
            src="https://m.media-amazon.com/images/I/91Gj-44WqkL._AC_UF1000,1000_QL80_.jpg"
            alt="Project Hail Mary"
            h={{ base: "200px", md: "350px" }}
            w={"200px"}
            borderRadius="md"
            boxShadow="dark-lg"
            display={{ base: "none", md: "block" }}
            transform="translateY(20px)"
          />

          <Stack spacing={5} maxW="600px" justify="center">
            <Heading
              color="white"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="black"
              lineHeight="1"
            >
              Project Hail Mary
            </Heading>

            <Text
              color="gray.300"
              fontSize={{ base: "sm", md: "lg" }}
              noOfLines={3}
            >
              A lone astronaut must save the earth from disaster in this
              spacetacular adventure. Ryland Grace is the sole survivor on a
              desperate, last-chance mission.
            </Text>

            <Text fontWeight="bold" color="purple.300">
              By Andy Weir
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
            <Stack direction={"row"} spacing={4} pt="2">
              <Button
                bg="whiteAlpha.500"
                color="black"
                size="md"
                fontWeight="bold"
                borderRadius="full"
                _hover={{ bg: "whiteAlpha.900" }}
              >
                <Icon as={FaArrowLeft} />
              </Button>
                <Button
                bg="whiteAlpha.500"
                color="black"
                size="md"
                fontWeight="bold"
                borderRadius="full"
                _hover={{ bg: "whiteAlpha.900" }}
              >
                <Icon as={FaArrowRight} />
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default LandingHome;
