import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Card,
  HStack,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
  Icon,
  Collapse,
  Button
} from "@chakra-ui/react";
import { SiGooglegemini } from "react-icons/si";
const BookSummarizer = ({ details }) => {
  //Gemini AI Summarizer
  const [summary, setSummary] = useState(null);
  const [sumLoad, setSumLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  //Onload trigger the summary
  useEffect(() => {
    const handleSummarizer = async () => {
      setSumLoading(true);
      try {
        const res = await fetch("/api/BookSummary/GeminiSummarizer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: details.volumeInfo.title,
            author: details.volumeInfo.authors?.[0],
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
  }, []);
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
              Summary by Gemini AI
            </Text>
          </HStack>
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
              <Collapse startingHeight={80} in={show}>
                <Text
                  fontSize={{
                    base: "1rem",
                    md: "1rem",
                    lg: "1rem",
                    xl: "1rem",
                  }}
                  fontWeight="bold"
                  color="white"
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
              >
                {show ? "Show Less" : "Read More"}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default BookSummarizer;
