import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Text,
  SimpleGrid,
  HStack,
  Badge,
  Avatar,
  Button,
  Icon,
  useColorModeValue,
  Collapse,
} from "@chakra-ui/react";
import BookImage from "./BookImage";
import { FiBook, FiBookOpen, FiInfo, Fi } from "react-icons/fi";
import { AiFillInfoCircle, AiFillFileText } from "react-icons/ai";
import { BsBookFill } from "react-icons/bs";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BookInfo = ({ details }) => {
  // Placeholder
  const cleanDescription = details.volumeInfo.description.replace(
    /<[^>]+>/g,
    ""
  );

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <>
      <Grid
        mt="2%"
        minH="500px"
        templateRows={{
          lg: "repeat(1, 1fr)",
        }}
        templateColumns={{
          lg: "repeat(4, 1fr)",
          md: "repeat(1, 1fr)",
        }}
        gap={4}
        alignItems={"start"}
      >
        <GridItem
          rowSpan={1}
          colSpan={{ base: 1, lg: 1, md: 4, sm: 4 }}
          className="book-details-image"
        >
          <BookImage details={details} />
        </GridItem>
        <GridItem rowSpan={1} colSpan={{ base: 3, lg: 3, md: 4, sm: 4 }} bg="">
          <Box mb="1%">
            <Box>
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
                {details.volumeInfo.categories != undefined
                  ? details.volumeInfo?.categories[0].split("/")[0]
                  : "No Category"}
              </Badge>
              <Badge
                colorScheme="pink"
                variant="subtle"
                fontSize="0.7rem"
                px={3}
                py={1}
                ml="5px"
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {details.volumeInfo.publishedDate != undefined
                  ? details.volumeInfo.publishedDate
                  : "Coming Soon"}
              </Badge>
              <Badge
                colorScheme="gray"
                variant="subtle"
                fontSize="0.7rem"
                px={3}
                py={1}
                ml="5px"
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="wider"
                m={{ sm: "10px" }}
              >
                {details.volumeInfo.publisher != undefined
                  ? details.volumeInfo.publisher
                  : "Publisher"}
              </Badge>
            </Box>
            <Text
              mt={"10px"}
              fontWeight="bold"
              fontSize={{ lg: "1.8rem", md: "1.5rem", sm: "1.5rem" }}
            >
              {details.volumeInfo.title != undefined
                ? details.volumeInfo.title
                : "No Title"}
            </Text>

            <Box width={"300px"}>
              <HStack>
                <Avatar
                  colorScheme="teal"
                  color={"white"}
                  size={"sm"}
                  name={
                    details.volumeInfo.authors != undefined
                      ? details.volumeInfo.authors[0]
                      : "No Author"
                  }
                />
                <Text fontWeight={"semibold"} fontSize={"1rem"}>
                  {details.volumeInfo.authors != undefined
                    ? details.volumeInfo.authors[0]
                    : "No Author"}
                </Text>
              </HStack>
            </Box>
          </Box>

          <Box
            
            border={"2px solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            rounded={"lg"}
          >
            <Box p="5">
              <HStack color={"purple.500"} mb="10px">
                <Icon
                  mr="1"
                  fontSize={"20"}
                  _groupHover={{ color: "black" }}
                  as={AiFillInfoCircle}
                ></Icon>{" "}
                <Text fontSize={"1.2rem"} fontWeight={"bold"}>
                  Description
                </Text>
              </HStack>
              <Collapse startingHeight={120} in={show}>
              <Text
                textAlign={"justify"}
                color={"gray"}
                justifyContent={""}
                width="100%"
              >
                {details.volumeInfo.description != undefined
                  ? cleanDescription
                  : "No Description Yet"}
              </Text>
              </Collapse>
              
              <Text
                cursor={"pointer"}
                _hover={{ color: "pink.500" }}
                colorScheme={"purple"}
                color={useColorModeValue("gray.500", "gray.400")}
                as="u"
                onClick={handleToggle}
              >
                {show ? (
                  <b>Show Less...</b>
                ) : (
                  <b>Read More...</b>
                )}
              </Text>
            </Box>
          </Box>
          <SimpleGrid
            columns={{ base: 2, lg: 2, md: 1, sm: 1 }}
            spacing={"10px"}
            
            my="5"
            minChildWidth="300px"
          >
            <Box
              border={"2px solid"}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              rounded={"lg"}
            >
              <Box p={"5"}>
                <HStack color={"#805ad5"}>
                  <Icon
                    mr="1"
                    fontSize={"20"}
                    _groupHover={{ color: "black" }}
                    as={BsBookFill}
                  ></Icon>{" "}
                  <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                    More Details
                  </Text>
                </HStack>

                <SimpleGrid
                  columns={{ base: 2, lg: 2, md: 2, sm: 2 }}
                  fontWeight={"bold"}
                >
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Pages
                    </Text>
                    <Text color={"gray.500"} fontSize={"md"}>
                      {details.volumeInfo.pageCount != undefined
                        ? details.volumeInfo.pageCount
                        : "N/A"}
                    </Text>
                  </Box>

                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      PrintType
                    </Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      {details.volumeInfo.printType != undefined
                        ? details.volumeInfo.printType
                        : "N/A"}
                    </Text>
                  </Box>
                </SimpleGrid>
                <Box p={"3"}>
                  <Text fontSize={"1rem"} fontWeight={"bold"}>
                    Publisher
                  </Text>

                  <Text fontWeight={"bold"} color={"gray.500"} fontSize={"md"}>
                    {details.volumeInfo.publisher != undefined
                      ? details.volumeInfo.publisher
                      : "N/A"}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              border={"2px solid"}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              rounded={"lg"}
            >
              <Box p={"5"}>
                <HStack color={"#805ad5"}>
                  <Icon
                    mr="1"
                    fontSize={"20"}
                    _groupHover={{ color: "black" }}
                    as={AiFillFileText}
                  ></Icon>{" "}
                  <Text fontWeight={"bold"} fontSize={"1.2rem"}>
                    Supplementary Details
                  </Text>
                </HStack>

                <SimpleGrid
                  columns={{ base: 2, lg: 2, md: 2, sm: 2 }}
                  fontWeight={"bold"}
                >
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Language
                    </Text>
                    <Text fontSize={"md"} color={"gray.500"}>
                      {details.volumeInfo.language != undefined
                        ? details.volumeInfo.language
                        : "N/A"}
                    </Text>
                  </Box>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Rating
                    </Text>
                    <Text fontSize={"md"} color={"gray.500"}>
                      {details.volumeInfo.maturityRating != undefined
                        ? details.volumeInfo.maturityRating
                        : "N/A"}
                    </Text>
                  </Box>
                </SimpleGrid>
                <Box p={"3"}>
                  <Text fontSize={"1rem"} fontWeight={"bold"}>
                    Format
                  </Text>
                  <Text fontSize={"md"} color={"gray.500"} fontWeight={"bold"}>
                    {details.volumeInfo.dimensions != undefined
                      ? details.volumeInfo.dimensions.height
                      : "N/A"}{" "}
                    x{" "}
                    {details.volumeInfo.dimensions != undefined
                      ? details.volumeInfo.dimensions.width
                      : "N/A"}{" "}
                    x{" "}
                    {details.volumeInfo.dimensions != undefined
                      ? details.volumeInfo.dimensions.thickness
                      : "N/A"}
                  </Text>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>

          <Box mt="3%" alignItems={"end"}>
            <Link
              href={details.volumeInfo.previewLink}
              passHref
              target="_blank"
            >
              <Button
                colorScheme={"purple"}
                height="65px"
                width={{ base: "200px", lg: "200px", md: "100%", sm: "100%" }}
                size="lg"
                mb={{ base: "0px", lg: "0px", md: "5px", sm: "5px" }}
                mr={{ base: "10px", lg: "10px", md: "0px", sm: "0px" }}
              >
                <Icon
                  mr="2"
                  fontSize={"20"}
                  _groupHover={{ color: "black" }}
                  as={FiBook}
                ></Icon>
                Google Books
              </Button>
            </Link>

            <Link
              href={details.volumeInfo.canonicalVolumeLink}
              passHref
              target="_blank"
            >
              <Button
                colorScheme={"purple"}
                height="65px"
                width={{ base: "200px", lg: "200px", md: "100%", sm: "100%" }}
                size="lg"
                variant={"outline"}
              >
                <Icon
                  mr="2"
                  fontSize={"20"}
                  _groupHover={{ color: "black" }}
                  as={FiBookOpen}
                ></Icon>
                Preview
              </Button>
            </Link>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export const ExtraCardDetails = () => {};

export default BookInfo;
