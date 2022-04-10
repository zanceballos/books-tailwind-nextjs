import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  Image,
  Center,
  Spinner
} from "@chakra-ui/react";

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiInfo,
} from "react-icons/fi";
import account_logo from "../../public/account_male.svg";
import { IoIosLogIn } from "react-icons/io";
import Link from "next/link";
import { BsBook, BsPlusCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuth } from "../../service/AuthService";
import { auth, db } from "../../config/firebase";
const LinkItems = [
  { name: "Home", icon: FiHome, route: "/" },
  { name: "Trending", icon: FiTrendingUp, route: "/#new-releases" },
  { name: "Explore", icon: FiCompass, route: "/search/books/trending" },
  { name: "About", icon: FiInfo, route: "/About" },
];

const AccountItems = [
  { name: "Favourites", icon: FiStar, route: "/favourites" },
  { name: "BookShelves", icon: BsBook, route: "/About" },
];

const GuestItems = [
  { name: "Sign In", icon: IoIosLogIn, route: "/account/login" },
  { name: "Create Account", icon: BsPlusCircle, route: "/account/register" },
];

const Sidebar = ({ children }) => {
  //use state for close and open drawer mobile size
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState();

  //Auth states
  const { currentUser, changePassword } = useAuth();

  useEffect(() => {

    if (currentUser !== null ) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setUserInfo(doc.data());
          console.log(doc.data());
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {" "}
      {loading === false ? (
        <Box minH="100vh" className="parent-bar">
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
          />
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav changePassword={changePassword} onOpenDrawer={onOpen} userInfo={userInfo} />
          <Box ml={{ base: 0, md: 72 }} p="4">
            {children}
          </Box>
        </Box>
      ) :  <>
        <Box textAlign={"center"} my={{lg:"10%", md:"20%" , sm:"25%"}}>
          <Text fontSize={"2rem"} fontWeight="bold" color={"#805ad5"}>Loading Bookify...</Text>
          <Spinner size='xl' my="1%" color="#805ad5"></Spinner>
        </Box>
      </>}
    </>
  );
};

//Sidebar component
const SidebarContent = ({ onClose, ...rest }) => {
  //useRefs for the search forms
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const { currentUser, logout } = useAuth();

  //functions to open and close the state from true to false and vice-versa

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
        <FormControl onKeyDown={searchBooks}>
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
};

//nav item
const NavItem = ({ icon, children, onClose, route, ...rest }) => {
  return (
    <Link
      href={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      className="nav-items-bar"
      passHref
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        onClick={onClose}
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

//mobile sidebar component
const MobileNav = ({ onOpenDrawer, onCloseDrawer, changePassword, userInfo, ...rest }) => {
  console.log(userInfo);
  const { logout, currentUser } = useAuth();

  //For the modal only
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [openModal, setOpenModal] = useState(false);

  const openAccountModal = () => {
    setOpenModal(!openModal);
  };

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
                {currentUser !== null ? (
                  <HStack>
                    <Avatar
                      size={"sm"}
                      name={userInfo.username}
                      bgColor={"#805ad5"}
                      color="white"
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">{userInfo.username}</Text>
                      <Text fontSize="xs" color="gray.600">
                        {userInfo.role}
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
      {currentUser !== null && <AccountModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        userInfo={userInfo}
        changePassword={changePassword}
        currentUser={currentUser}
      />}
    </>
  );
};

const AccountModal = ({ isOpen, onClose, userInfo, currentUser, changePassword }) => {

  const changeUserPassword = async () => {
    await changePassword(currentUser.email)
  }

  return (
    <>
     {userInfo !== null && <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image alt="alt" src="/account_male.svg" width={"200px"}></Image>
            </Center>

            <Box rounded={"lg"} my={"4%"}>
              <SimpleGrid columns={3} spacing="10px" p="3">
                <Box>
                  <Text fontWeight={"bold"} fontSize="0.8rem" color={"gray"}>
                    Username
                  </Text>
                  <Text fontWeight={"bold"} fontSize="1.2rem">
                    {userInfo.username}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight={"bold"} fontSize="0.8rem" color={"gray"}>
                    Provider
                  </Text>
                  <Text fontWeight={"bold"} fontSize="1.2rem" noOfLines={1}>
                    {userInfo.AuthProvider}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight={"bold"} fontSize="0.8rem" color={"gray"}>
                    Role
                  </Text>
                  <Text fontWeight={"bold"} fontSize="1.2rem" noOfLines={1}>
                    {userInfo.role}
                  </Text>
                </Box>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing="10px" p="3">
                <Box>
                  <Text fontWeight={"bold"} fontSize="0.8rem" color={"gray"}>
                    Email
                  </Text>
                  <Text fontWeight={"bold"} fontSize="1.2rem" noOfLines={1}>
                    {userInfo.email}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight={"bold"} fontSize="0.8rem" color={"gray"}>
                    Date Registered
                  </Text>
                  <Text fontWeight={"bold"} fontSize="1.2rem" noOfLines={1}>
                    {userInfo.dateRegistered}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
          </ModalBody>

          <ModalFooter>
            {userInfo.AuthProvider === "password" && (
              <Button onClick={changeUserPassword} variant="ghost">
                Change Password
              </Button>
            )}
            <Button onClick={onClose} colorScheme={"red"}>
              Delete Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>}
    </>
  );
};

export default Sidebar;
