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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
        bgGradient="linear(to-r,purple.400 , #805ad5 )"
      >
        <Box
        
          p="8"
          textAlign={"center"}
          alignItems={"center"}
        >
          <Text
            textColor={"whiteAlpha.900"}
            fontWeight="bold"
            fontSize={{
              base: "1.5rem",
              md: "1.7rem",
              lg: "1.9rem",
              xl: "2rem",
            }}
          >
            Jawa Search
          </Text>
          <Text
            fontWeight="bold"
            fontSize={{
              base: "0.8rem",
              md: "1rem",
              lg: "1.2rem",
              xl: "1.4rem",
            }}
            textColor={"whiteAlpha.700"}
          >
            Uttini! Get an AI-Powered recommendation for your next read.
          </Text>
          <Flex
            mt="4"
            justifyContent={"between"}
            alignItems={"center"}
            shadow={"lg"}
            bg="white"
            padding={"4"}
            rounded="lg"
          >
            <Box width={"90%"}>
              <Input
                border={"0px"}
                outlineColor=""
                placeholder="What are you looking for?"
                focusBorderColor="white"
                bg="white"
                color="black"
                fontWeight={"bold"}
              />
            </Box>
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
                colorScheme={"purple"}
                rounded="lg"
                width={"100%"}
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
