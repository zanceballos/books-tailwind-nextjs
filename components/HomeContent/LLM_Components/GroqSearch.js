import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SiGooglegemini } from "react-icons/si";
const GroqSearch = () => {
  const [categoryLabel, setCategoryLabel] = useState("Category");

  const handleCategory = (e) => {
    //set the state
    setCategoryLabel(e);
    //set the search url
    setCategorySearch(`insubject:${e}`);
  };

  return (
    <>
      <Card
        my="4"
        border="1px solid"
        borderColor="whiteAlpha.400"
        borderRadius="md"
        bgGradient="linear(to-br, purple.600, purple.800, blue.800)"
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
            <Box mx="5px" display={{ lg: "flex", md: "none", sm: "none" }}>
              <Menu width={"100%"}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  rounded={"full"}
                >
                  {categoryLabel}
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    onChange={(e) => {
                      handleCategory(e);
                    }}
                    textColor={"black"}
                    fontWeight={"bold"}
                  >
                    <MenuItemOption value="fantasy">Fantasy</MenuItemOption>
                    <MenuItemOption value="thriller">Thriller</MenuItemOption>
                    <MenuItemOption value="romance">Romance</MenuItemOption>
                    <MenuItemOption value="sci-fi">
                      Science Fiction
                    </MenuItemOption>
                    <MenuItemOption value="fiction">Fiction</MenuItemOption>
                    <MenuItemOption value="adventure">Adventure</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
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
         
        </Box>
      </Card>
    </>
  );
};

export default GroqSearch;
