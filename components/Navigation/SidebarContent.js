import {
    Box,
    CloseButton,
    Flex, FormControl,
    Input, Text, useColorModeValue
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useRouter } from "next/router";
import { BsBook, BsPlusCircle } from "react-icons/bs";
import {
    FiCompass, FiHome, FiInfo, FiStar, FiTrendingUp
} from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import NavItem from "./NavItem";
const LinkItems = [
  { name: "Home", icon: FiHome, route: "/" },
  { name: "Trending", icon: FiTrendingUp, route: "/#new-releases" },
  { name: "Explore", icon: FiCompass, route: "/search/books/trending" },
  { name: "About", icon: FiInfo, route: "/About" },
];

const AccountItems = [
  { name: "Favourites", icon: FiStar, route: "/favourites" },
  { name: "BookShelves", icon: BsBook, route: "/bookshelves/all" },
];

const GuestItems = [
  { name: "Sign In", icon: IoIosLogIn, route: "/account/login" },
  { name: "Create Account", icon: BsPlusCircle, route: "/account/register" },
];

const SidebarContent = ({ onClose, currentUser, ...rest }) => {
    //useRefs for the search forms
    const [searchInput, setSearchInput] = useState("");
    const router = useRouter();
    console.log("Mobile nav load")
    //function of search
    const searchBooks = async (e) => {
      if (e.key === "Enter") {
        router.push(`/search/books/${searchInput}`);
      }
    };
  
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 72 }}
        pos="fixed"
        h="full"
        {...rest}
        className="sidebar-content"
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text color={"#805ad5"} fontSize="4xl" fontWeight="bold">
            Bookify
          </Text>
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>
  
        <Flex
          mt="10px"
          h="10"
          alignItems="center"
          mx="6"
          justifyContent="space-between"
        >
          <FormControl
            onKeyDown={searchBooks}
          >
            <Input
              onChange={(event) => setSearchInput(event.target.value)}
              id="search"
              type="text"
              placeholder="search"
              autoComplete="off"
              rounded={"full"}
              bg="gray.100"
              border={0}
            />
          </FormControl>
        </Flex>
  
        <Flex
          mt="30"
          h="10"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
        >
          <Text color="#ddd" fontSize="2xl" fontWeight="bold">
            Discover
          </Text>
        </Flex>
  
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            onClose={onClose}
            icon={link.icon}
            route={link.route}
          >
            {link.name}
          </NavItem>
        ))}
  
        <Flex
          mt="30"
          h="10"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
        >
          <Text color="#ddd" fontSize="2xl" fontWeight="bold">
            Your Account
          </Text>
        </Flex>
        {currentUser ? (
          <>
            {AccountItems.map((link) => (
              <NavItem
                key={link.name}
                onClose={onClose}
                icon={link.icon}
                route={link.route}
              >
                {link.name}
              </NavItem>
            ))}
          </>
        ) : (
          <>
            {GuestItems.map((link) => (
              <NavItem
                key={link.name}
                onClose={onClose}
                icon={link.icon}
                route={link.route}
              >
                {link.name}
              </NavItem>
            ))}
          </>
        )}
      </Box>
    );
}

export default SidebarContent