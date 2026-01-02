import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Card,
  CardBody,
  HStack,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
  Icon,
  Collapse,
  Button,
  Flex,
  Badge,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { SiGooglegemini } from "react-icons/si";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaBookReader,
  FaMusic,
  FaSpotify,
  FaPlayCircle,
} from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

const BookSummarizer = ({ details }) => {
  //Gemini AI Summarizer
  const [summary, setSummary] = useState(null);
  const [sumLoad, setSumLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const PlaceholderData = {
    summary:
      "Join Jill Pole and Eustace Scrubb on their perilous journey into the land of Underland to rescue Prince Rilian from an evil force. With enchantment all around, they must face their fears and overcome treacherous obstacles to save the prince.",
    vibe: {
      emojis: ["😈", ":", "🏰"],
      tags: ["Adventure", "Fantasy", "Friendship"],
    },
    why_read: [
      "Explore the enchanting world of Underland",
      "Experience the bravery and courage of Jill and Eustace",
      "Discover the evil forces that threaten the land",
    ],
    safety: "Mild Fantasy Violence, Suitable for All Ages",
    songs: [
      {
        song_img_url: "https://placekitten.com/200/300",
        song_title: "Clair de Lune",
        artist: "Claude Debussy",
        reason: "A soothing melody to set the tone for a fantastical journey",
        spotify_url:
          "https://open.spotify.com/embed/track/3yYzEKjizQ5d0jwYiU0A7T",
      },
      {
        song_img_url: "https://placekitten.com/200/300",
        song_title: "The Lumberjack Song",
        artist: "Monty Python",
        reason:
          "A fun and quirky tune to match the adventurous spirit of the story",
        spotify_url:
          "https://open.spotify.com/embed/track/2BhjZ7f5W4QYkGg7lJF7Y5",
      },
      {
        song_img_url: "https://placekitten.com/200/300",
        song_title: "The Sorcerer s Apprentice",
        artist: "Paul Dukas",
        reason: "A thrilling and magical melody to match the epic journey",
        spotify_url:
          "https://open.spotify.com/embed/track/2K1Y3JYQ2WZx4w6wQ6x1wQ",
      },
      {
        song_img_url: "https://placekitten.com/200/300",
        song_title: "Pure Imagination",
        artist: "Leonard Bernstein",
        reason: "A whimsical and enchanting tune to inspire the imagination",
        spotify_url:
          "https://open.spotify.com/embed/track/2Wx1g7wQ1WwX5w4w5w4w5w",
      },
      {
        song_img_url: "https://placekitten.com/200/300",
        song_title: "Eye of the Tiger",
        artist: "Survivor",
        reason:
          "A classic and motivational rock anthem to match the courage of the characters",
        spotify_url:
          "https://open.spotify.com/embed/track/2K1YJYQ2WZx4w6wQ6wQ6wQ",
      },
    ],
    estimate_read: {
      difficulty: "Medium",
      target_audience: "Any Ages",
      time_to_finish: "5-7 days",
    },
  };
  //Onload trigger the summary
  useEffect(() => {
    const handleSummarizer = async () => {
      setSumLoading(true);
      try {
        const res = await fetch("/api/BookSummary/GroqBookAnalyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: details.volumeInfo.title,
            author: details.volumeInfo.authors?.[0],
            description: details.volumeInfo?.description,
            page_count: details.volumeInfo?.pageCount,
          }),
        });

        const data = await res.json();
        setSummary(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      setSumLoading(false);
    };
    handleSummarizer();
    //setSummary(PlaceholderData);
    //setSumLoading(false);
  }, [details]);

  return (
    <>
      <Box
        mt="2%"
        bg="#d0b8ac"
        p={{ base: 4, md: 8 }}
        borderRadius="lg"
        color="white"
        fontFamily="sans-serif"
        width={"100%"}
        lineHeight="0.9"
        userSelect="none"
      >
        <Box>
          <Flex justify={"space-between"} align={"center"} wrap="wrap">
            <HStack spacing={2}>
              <Icon
                as={SiGooglegemini}
                boxSize={{ base: "1.2rem", md: "1.5rem" }}
              />
              <Text
                fontSize={{
                  base: "1.3rem",
                  md: "1.5rem",
                  lg: "1.8rem",
                  xl: "2rem",
                }}
                fontWeight="bold"
                color="whiteAlpha"
                letterSpacing="tight"
              >
                GROQ AI Analysis
              </Text>
            </HStack>
          </Flex>
        </Box>
        <Box>
          {sumLoad ? (
            <Box my="10px">
              {" "}
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                color={"white"}
              />
            </Box>
          ) : (
            <>
              <Box w={"100%"}>
                <HStack
                  spacing={2}
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
                  {summary?.vibe?.tags?.map((tag, i) => (
                    <Badge
                      key={i}
                      colorScheme="gray"
                      variant="subtle"
                      fontSize="0.8rem"
                      p="2"
                      borderRadius="full"
                      
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      <HStack>
                        <Box> {summary.vibe.emojis[i]}</Box>
                        <Box>{tag}</Box>
                      </HStack>
                    </Badge>
                  ))}
                </HStack>
              </Box>
              <SimpleGrid
                mt="5"
                columns={{ base: 1, md: 1, lg: 2 }}
                spacing={6}
              >
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize={{
                      base: "1.2rem",
                      md: "1.3rem",
                      lg: "1.5rem",
                      xl: "1.8rem",
                    }}
                    textDecoration={"underline"}
                    color={"white"}
                  >
                    Summary
                  </Text>
                  <Collapse startingHeight={80} in={show}>
                    <Text
                      fontSize={{
                        base: "1rem",
                        md: "1rem",
                        lg: "1rem",
                        xl: "1rem",
                      }}
                      fontWeight="bold"
                      color="whiteAlpha.800"
                      my="10px"
                      lineHeight={"tall"}
                    >
                      {summary?.summary}
                    </Text>
                  </Collapse>
                  <Button
                    size="md"
                    onClick={handleToggle}
                    mt="1rem"
                    variant="link"
                    colorScheme="whiteAlpha.900"
                    textDecoration={"underline"}
                  >
                    {show ? "Show Less" : "Read More"}
                  </Button>
                </Box>
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize={{
                      base: "1.2rem",
                      md: "1.3rem",
                      lg: "1.5rem",
                      xl: "1.8rem",
                    }}
                    mb={3}
                    color={"white"}
                    textDecor={"underline"}
                  >
                    Why read this?
                  </Text>
                  <List spacing={2}>
                    {summary?.why_read?.map((reason, i) => (
                      <ListItem
                        key={i}
                        fontSize="lg"
                        display="flex"
                        alignItems="start"
                      >
                        <ListIcon as={FaCheckCircle} color="#7e695eff" />
                        <Text
                          fontWeight={"bold"}
                          fontSize={"md"}
                          color="whiteAlpha.800"
                        >
                          {reason}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </SimpleGrid>
              <Box>
                {sumLoad ? (
                  <Box my="10px">
                    {" "}
                    <SkeletonText
                      mt="4"
                      noOfLines={4}
                      spacing="4"
                      skeletonHeight="2"
                      color={"white"}
                    />
                  </Box>
                ) : (
                  <>
                    <SimpleGrid columns={{ base: 2, md: 4 }} mt="5" spacing={3}>
                      <StatBox
                        icon={FaClock}
                        label="Estimated Read Time"
                        value={`${summary?.estimate_read.time_to_finish} hours`}
                        fontSize={"md"}
                      />
                      <StatBox
                        icon={FaBookReader}
                        label="Difficulty"
                        value={summary?.estimate_read.difficulty}
                        fontSize={"md"}
                      />
                      <StatBox
                        icon={FaUser}
                        label="Audience"
                        value={summary?.estimate_read.target_audience}
                        fontSize={"md"}
                      />

                      <StatBox
                        icon={FiAlertTriangle}
                        label="Audience"
                        value={summary?.safety}
                        fontSize={"sm"}
                      />
                    </SimpleGrid>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Box
        mt="2%"
        bg="#ccd5ae"
        p={{ base: 4, md: 8 }}
        borderRadius="lg"
        color="white"
        fontFamily="sans-serif"
        width={"100%"}
        lineHeight="0.9"
        userSelect="none"
      >
        {sumLoad ? (
          <Box my="10px">
            {" "}
            <SkeletonText
              mt="4"
              noOfLines={4}
              spacing="4"
              skeletonHeight="2"
              color={"white"}
            />
          </Box>
        ) : (
          <>
            <Box>
              <HStack
                mb={3}
                fontSize={{
                  base: "1rem",
                  md: "1.3rem",
                  lg: "1.6rem",
                  xl: "1.8rem",
                }}
              >
                <Icon as={FaSpotify} color={"whiteAlpha.900"}></Icon>
                <Text
                  fontWeight="bold"
                  color="whiteAlpha"
                  letterSpacing="tight"
                >
                  Reading Soundtrack
                </Text>
              </HStack>
              <Flex
                overflowX="auto"
                pb={4}
                gap={4}
                css={{
                  "&::-webkit-scrollbar": { height: "4px" },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#8d987dff",
                    borderRadius: "24px",
                  },
                }}
              >
                {summary?.songs.map((song, i) => {
                  // Create the Search Link
                  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(
                    song.song_title + " " + song.artist
                  )}`;

                  return (
                    <Link
                      key={i}
                      href={spotifySearchUrl}
                      isExternal
                      _hover={{ textDecoration: "none" }}
                      target="_blank"
                    >
                      <Flex
                        minW="300px"
                        h="150px"
                        bg="#282828"
                        rounded="md"
                        overflow="hidden"
                        align="center"
                        shadow="lg"
                        transition="transform 0.2s"
                        _hover={{ transform: "scale(1.02)", bg: "#3E3E3E" }}
                      >
                        <Box
                          w="100px"
                          h="full"
                          bgGradient="linear(to-br, green.500, blue.500)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon
                            as={FaSpotify}
                            color="whiteAlpha.800"
                            fontSize="30px"
                          />
                        </Box>

                        <VStack align="start" spacing={1} px={3} flex={1}>
                          <Text
                            fontWeight="bold"
                            color="white"
                            fontSize="sm"
                            noOfLines={1}
                          >
                            {song.song_title}
                          </Text>
                          <Text color="gray.400" fontSize="xs" noOfLines={1}>
                            {song.artist}
                          </Text>
                        </VStack>

                        <Box pr={4}>
                          <Icon
                            as={FaPlayCircle}
                            color="#1DB954"
                            fontSize="32px"
                          />
                        </Box>
                      </Flex>
                    </Link>
                  );
                })}
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

const StatBox = ({ icon, label, value, fontSize }) => (
  <Box
    p={3}
    bg="whiteAlpha.400"
    border="1px solid"
    borderColor="gray.100"
    rounded="md"
  >
    <HStack color="whiite" mb={1}>
      <Icon as={icon} boxSize={3} />
      <Text fontSize={"10px"} fontWeight="bold" textTransform="uppercase">
        {label}
      </Text>
    </HStack>
    <Text fontSize={fontSize} fontWeight="bold" color="whiteå">
      {value}
    </Text>
  </Box>
);
export default BookSummarizer;
