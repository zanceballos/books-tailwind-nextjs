import React from "react";
import {
  Grid,
  GridItem,
  Image,
  Box,
  Text,
  SimpleGrid,
  Flex,
  Center,
  HStack,
  Badge,
  Avatar,
  Button,
  Icon,
} from "@chakra-ui/react";
import BookImage from "./BookImage";
import ExtraInfoCard from "./Cards/ExtraInfoCard";
import { FiBook, FiBookOpen, FiInfo, Fi } from "react-icons/fi";
import {AiFillInfoCircle, AiFillFileText} from "react-icons/ai"
import {BsBookFill} from "react-icons/bs"
const BookInfo = ({ details }) => {
  return (
    <>
      <Grid
        mt="2%"
        minH="500px"
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "repeat(1, 1fr)",
        }}
        templateColumns={{
          base: "repeat(4, 1fr)",
          lg: "repeat(4, 1fr)",
          md: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
        }}
        gap={4}
      >
        <GridItem
          rowSpan={1}
          colSpan={{ base: 1, lg: 1, md: 4, sm: 4 }}
          className="book-details-image"
        >
          <BookImage details={details} />
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={{ base: 3, lg: 3, md: 4, sm: 4 }}
          bg=""
          p={6}
        >
          <Text fontWeight="bold" fontSize={"2.5rem"}>
            {details.volumeInfo.title != undefined
              ? details.volumeInfo.title
              : "No Title"}
          </Text>
          <Box mt="1%" mb="1%">
            <Box>
              <Badge
                px="3"
                borderRadius="full"
                fontSize={"1.1rem"}
                colorScheme="purple"
                isTruncated
              >
                {
                  (details.volumeInfo.categories = undefined
                    ? details.volumeInfo.categories[0]
                    : "No Category")
                }
              </Badge>
              <Badge
                px="3"
                borderRadius="full"
                fontSize={"1.1rem"}
                ml="1%"
                colorScheme="pink"
              >
                {details.volumeInfo.publishedDate != undefined
                  ? details.volumeInfo.publishedDate
                  : "Coming Soon"}
              </Badge>
            </Box>
            <Box width={"300px"} mt="1%">
              <HStack>
                <Avatar
                bg={"#805ad5"}
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
          <Box my={"2%"}>
            <HStack color={"#805ad5"}>
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
            <Text
              textAlign={"justify"}
              noOfLines={5}
              color={"gray"}
              justifyContent={""}
            >
              {details.volumeInfo.description != undefined
                ? details.volumeInfo.description
                : "No Description Yet"}
            </Text>
          </Box>
          <SimpleGrid
            columns={{ base: 2, lg: 2, md: 1, sm: 1 }}
            spacing={"10px"}
            mt={"1.2rem"}
            mb={"1.2rem"}
            minChildWidth="350px"
          >
            <Box boxShadow={"md"} rounded={"lg"}>
              <Box p={"5"}>
              <HStack color={"#805ad5"}>
              <Icon
                mr="1"
                fontSize={"20"}
                _groupHover={{ color: "black" }}
                as={BsBookFill}
              ></Icon>{" "}
               <Text fontWeight={"bold"} fontSize={"1.2rem"} mb="10px">
                  More Details
                </Text>
            </HStack>
               
                <SimpleGrid columns={{ base: 3, lg: 3, md: 2, sm: 2 }}>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Pages
                    </Text>
                    <Text color={"gray"} fontSize={"md"}>
                      {details.volumeInfo.pageCount != undefined
                        ? details.volumeInfo.pageCount
                        : "N/A"}
                    </Text>
                  </Box>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Publisher
                    </Text>

                    <Text color={"gray"} fontSize={"md"}>
                      {details.volumeInfo.publisher != undefined
                        ? details.volumeInfo.publisher
                        : "N/A"}
                    </Text>
                  </Box>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      PrintType
                    </Text>
                    <Text fontSize={"sm"} color={"gray"}>
                      {details.volumeInfo.printType != undefined
                        ? details.volumeInfo.printType
                        : "N/A"}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
            <Box boxShadow={"md"} rounded={"lg"} bg={"white"}>
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
               
                <SimpleGrid columns={{ base: 3, lg: 3, md: 2, sm: 2 }}>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Language
                    </Text>
                    <Text fontSize={"md"} color={"gray"}>
                      {details.volumeInfo.language != undefined
                        ? details.volumeInfo.language
                        : "N/A"}
                    </Text>
                  </Box>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Rating
                    </Text>
                    <Text fontSize={"md"} color={"gray"}>
                      {details.volumeInfo.maturityRating != undefined
                        ? details.volumeInfo.maturityRating
                        : "N/A"}
                    </Text>
                  </Box>
                  <Box p={"3"}>
                    <Text fontSize={"1rem"} fontWeight={"bold"}>
                      Format
                    </Text>
                    <Text fontSize={"md"} color={"gray"}>
                      {details.volumeInfo.dimensions.height != undefined
                        ? details.volumeInfo.dimensions.height
                        : "N/A"}{" "}
                      x{" "}
                      {details.volumeInfo.dimensions.width != undefined
                        ? details.volumeInfo.dimensions.width
                        : "N/A"}{" "}
                      x{" "}
                      {details.volumeInfo.dimensions.thickness != undefined
                        ? details.volumeInfo.dimensions.thickness
                        : "N/A"}
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          </SimpleGrid>
          <Box mt="3%">
            <Button
              colorScheme={"purple"}
              shadow="lg"
              height="65px"
              width={{base:"200px", lg:"200px", md:"100%", sm:"100%"}}
              size="lg"
              mb={{base:"0px", lg:"0px", md:"5px", sm:"5px"}}
              mr={{base:"2px", lg:"2px", md:"0px", sm:"0px"}}
            >
              <Icon
                mr="2"
                fontSize={"20"}
                _groupHover={{ color: "black" }}
                as={FiBook}
              ></Icon>
              Google Books
            </Button>
            <Button
              colorScheme={"purple"}
              shadow="lg"
              height="65px"
              width={{base:"200px", lg:"200px", md:"100%", sm:"100%"}}
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
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export const ExtraCardDetails = () => {};

export default BookInfo;
