import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Card,
  Flex,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  MenuItemOption,
  Icon,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { FaRobot, FaMeteor, FaCode, FaFire } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SiGooglegemini } from "react-icons/si";
import { useRouter } from "next/router";
const GroqSearch = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [categorySearch, setCategorySearch] = useState([]);

  const handleSearch = (e) => {
    router.push(`/jawa-search/${searchInput}`);
    //redirect to search page
  };

  const handleSearchByBadge = (tag) => {
    //redirect to search page
    router.push(`/jawa-search/subject:${tag.label}`);
  };

  //Search on load

  useEffect(() => {
    const handleRecommendedSearch = async () => {
      const CACHE_KEY = "home_GROQ_TagRecommendations";
      const CACHE_DURATION = 1000 * 60 * 60; // 1 Hour (in milliseconds)

      const cachedData = localStorage.getItem(CACHE_KEY);

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isFresh = Date.now() - timestamp < CACHE_DURATION;

        if (isFresh) {
          console.log("Using Cached Recommendations");
          setCategorySearch(data); // Load instant data
          return;
        }
      }
      try {
        console.log("Fetching from GROQ API...");
        const response = await fetch("/api/GroqSearch/SearchRecommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        const keywords = result.trending_keywords;

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: keywords, timestamp: Date.now() })
        );

        setCategorySearch(keywords);
      } catch (error) {
        console.error("Error fetching recommended search:", error);
      }
    };
    handleRecommendedSearch();
  }, []);

  return (
    <>
      <Card
        my="4"
        border="1px solid"
        borderColor="whiteAlpha.400"
        borderRadius="md"
        bgGradient="linear(to-br, purple.600, purple.800, blue.800)"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          top="-50%"
          left="-10%"
          w="300px"
          h="300px"
          bg="purple.400"
          filter="blur(70px)"
          opacity="0.4"
          borderRadius="full"
        />
        <Box
          position="absolute"
          bottom="-30%"
          right="-10%"
          w="250px"
          h="250px"
          bg="blue.400"
          filter="blur(60px)"
          opacity="0.3"
          borderRadius="full"
        />
        <Box p="8" textAlign={"center"} alignItems={"center"}>
          <Flex direction="column" align="center" mb={8}>
            <Flex align="center" gap={2} mb={2}>
              <Icon
                as={SiGooglegemini}
                boxSize={{ base: "1.2rem", md: "1.5rem" }}
                color={"white"}
              />
              <Text
                bgGradient="linear(to-r, white, purple.200)"
                bgClip="text"
                fontWeight="extrabold"
                fontSize={{ base: "2xl", md: "4xl" }}
                letterSpacing="tight"
              >
                Jawa Search
              </Text>
            </Flex>
            <Text
              fontSize={{ base: "sm", md: "lg" }}
              color="whiteAlpha.800"
              maxW="xl"
            >
              Uttini! Find books from a universe of knowledge with Groq
            </Text>
          </Flex>

          <Flex
            mt="4"
            justifyContent={"between"}
            alignItems={"center"}
            shadow={"lg"}
            bg="white"
            padding={"4"}
            rounded="full"
            mx={{ lg: "10" }}
          >
            <Box width={"90%"}>
              <Input
                border={"0px"}
                outlineColor=""
                placeholder="What are you looking for?"
                focusBorderColor="transparent"
                bg="transparent"
                color="black"
                fontWeight={"bold"}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                fontSize={{ base: "0.8rem", md: "1rem", lg: "1.2rem" }}
              />
            </Box>
            <Box
              w="1px"
              h="24px"
              bg="whiteAlpha.300"
              mx={2}
              display={{ base: "none", md: "block" }}
            />

            <Box>
              <Button
                color={"white"}
                rounded="full"
                width={"100%"}
                bgGradient="linear(to-r,purple.400 , #805ad5)"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </Box>
          </Flex>
          <Box w={"100%"} mt="10">
            <HStack
              spacing={3}
              justify="start"
              
              mt={4}
              overflowX="auto"
              pb="4"
              css={{
                "&::-webkit-scrollbar": { height: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#00000014",
                  borderRadius: "24px",
                },
              }}
              my="2"
            >
              {categorySearch?.map((tag) => (
                <Badge
                  key={tag}
                  size="lg"
                  variant="subtle"
                  fontSize="0.8rem"
                  p={2}
                  colorScheme={tag.color}
                  borderRadius="full"
                  cursor="pointer"
                  flexShrink={0}
                  whiteSpace="nowrap"
                  _hover={{ transform: "scale(1.05)", opacity: 0.9 }} // Little pop animation
                  onClick={() => handleSearchByBadge(tag)}
                >
                 {tag.Emoji} {tag.label}
                </Badge>
              ))}
            </HStack>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default GroqSearch;
