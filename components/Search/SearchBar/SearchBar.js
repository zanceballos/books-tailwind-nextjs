import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  FormControl,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { server } from "../../../config";
import { useRouter } from "next/router";
const SearchBar = () => {
  //router
  const router = useRouter();

  //category url usestates
  const [categoryLabel, setCategoryLabel] = useState("Category");
  const [categorySearch, setCategorySearch] = useState("");

  //title url usestate
  const [searchInput, setSearchInput] = useState("");
  const handleCategory = (e) => {
    //set the state
    setCategoryLabel(e);
    //set the search url
    setCategorySearch(`insubject:${e}`);
  };

  const handleSearch = (e) => {
    if (categorySearch != "") {
      router.replace(`/search/books/${searchInput}+${categorySearch}`);
    } else {
      router.replace(`/search/books/${searchInput}`);
    }
  };

  const handleSearchOnEnter = async () => {
    if (e.key === "Enter") {
      if (categorySearch != "") {
        router.replace(`/search/books/${searchInput}+${categorySearch}`);
      } else {
        router.replace(`/search/books/${searchInput}`);
      }
    }
  };
  return (
    <>
      <Center>
        <Box
          rounded={"lg"}
          textAlign={"center"}
          p={"6"}
          width="100%"
          height={{ base: "200px", lg: "250px", md: "150px", sm: "150px" }}
          bgGradient="linear(to-r,purple.400 , #805ad5 )"
          backgroundRepeat="no-repeat"
          backgroundPosition={"center"}
          alignItems="center"
        >
          <Text
            color={"white"}
            fontWeight={"bold"}
            fontSize={{ base: "3rem", lg: "3rem", md: "2rem", sm: "2rem" }}
          >
            Search For Books
          </Text>
          <Text color={"white"} fontSize="1rem">
            Powered by Google Books
          </Text>
          <Grid templateColumns="repeat(4, 1fr)">
            <GridItem colSpan={{ lg: 1, md: 0, sm: 0 }}></GridItem>
            <GridItem colSpan={{ lg: 2, md: 4, sm: 4 }}>
              {" "}
              <FormControl
                width={{ lg: "100%", md: "100%", sm: "100%" }}
                height={{ base: "70px" }}
                shadow={"lg"}
                bg="white"
                padding={"4"}
                rounded="lg"
             
              >
                <Box>
                  <Flex>
                    {" "}
                    <Box width={"70%"} mx="5px">
                      <Input
                        border={"0px"}
                        outlineColor=""
                        placeholder="Search for Books"
                        focusBorderColor="white"
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                        }}
                        onKeyDown={() => handleSearchOnEnter}
                      />
                    </Box>
                    <Box mx="5px">
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
                          >
                            <MenuItemOption value="fantasy">
                              Fantasy
                            </MenuItemOption>
                            <MenuItemOption value="thriller">
                              Thriller
                            </MenuItemOption>
                            <MenuItemOption value="romance">
                              Romance
                            </MenuItemOption>
                            <MenuItemOption value="sci-fi">
                              Science Fiction
                            </MenuItemOption>
                            <MenuItemOption value="fiction">
                              Fiction
                            </MenuItemOption>
                            <MenuItemOption value="adventure">
                              Adventure
                            </MenuItemOption>
                          </MenuOptionGroup>
                        </MenuList>
                      </Menu>
                    </Box>
                    <Box mx="5px">
                      <Button
                        colorScheme={"purple"}
                        rounded="full"
                        width={"100%"}
                        onClick={() => handleSearch()}
                      >
                        Search
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ lg: 1, md: 0, sm: 0 }}></GridItem>
          </Grid>
        </Box>
      </Center>
    </>
  );
};

export default SearchBar;
