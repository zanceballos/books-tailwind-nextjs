import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import Link from "next/link";
import { BsBook, BsPlusCircle } from "react-icons/bs";
import {
  FiBell,
  FiChevronDown,
  FiCompass,
  FiHome,
  FiInfo,
  FiMenu,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import AccountModal from "./AccountModal";

const GuestItems = [
  { name: "Sign In", icon: IoIosLogIn, route: "/account/login" },
  { name: "Create Account", icon: BsPlusCircle, route: "/account/register" },
];
//mobile sidebar component
const MobileNav = ({
  onOpenDrawer,
  onCloseDrawer,
  changePassword,
  userInfo,
  logout,
  currentUser,
  ...rest
}) => {
  //For the modal only
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isUserReady = currentUser && userInfo && userInfo.username;
  return (
    <>
      <Flex
        className="mobile-nav"
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
          onClick={onOpenDrawer}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Bookify
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                {currentUser !== null && userInfo !== null ? (
                  <HStack>
                    <Avatar
                      size={"sm"}
                      name={userInfo?.username || "User"}
                      bgColor={"#805ad5"}
                      color="white"
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">
                        {userInfo?.username}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {userInfo?.role}
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                ) : (
                  <Button rightIcon={<FiChevronDown />}>Account</Button>
                )}
              </MenuButton>
              {currentUser ? (
                <MenuList>
                  <MenuItem onClick={onOpen}>Account</MenuItem>
                  <Link href={"/favourites"} passHref>
                    <MenuItem>Favourites</MenuItem>
                  </Link>

                  <MenuItem>Bookshelves</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <Link href="/account/login" passHref>
                    <MenuItem>Sign In</MenuItem>
                  </Link>

                  <Link href="/account/register" passHref>
                    <MenuItem>Create Account</MenuItem>
                  </Link>
                </MenuList>
              )}
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      {currentUser && isUserReady !== null && (
        <AccountModal
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
          userInfo={userInfo}
          changePassword={changePassword}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default MobileNav;
