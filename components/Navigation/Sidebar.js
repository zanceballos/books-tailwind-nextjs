import {
  Box,
  Drawer,
  DrawerContent, Spinner, Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { BsBook, BsPlusCircle } from "react-icons/bs";
import {
  FiCompass, FiHome, FiInfo, FiStar, FiTrendingUp
} from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { db } from "../../config/firebase";
import { useAuth } from "../../service/AuthService";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";


const Sidebar = ({ children }) => {
  //use state for close and open drawer mobile size
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState();

  //Auth states
  const { currentUser, changePassword, logout } = useAuth();

  useEffect(() => {
    if (currentUser !== null) {
      db.collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          setUserInfo(doc.data());
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <>
      {" "}
      {loading === false ? (
        <Box minH="100vh" className="parent-bar" overflowX="hidden">
          <SidebarContent
            onClose={() => onClose}
            display={{ base: "none", md: "block" }}
            currentUser={currentUser}
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
              <SidebarContent onClose={onClose} currentUser={currentUser} />
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav
            changePassword={changePassword}
            onOpenDrawer={onOpen}
            userInfo={userInfo}
            currentUser={currentUser}
            logout={logout}
          />
          <Box ml={{ base: 0, md: 72 }} p="4" maxW="100vw">
            {children}
          </Box>
        </Box>
      ) : (
        <>
          <Box textAlign={"center"} my={{ lg: "10%", md: "20%", sm: "25%" }}>
            <Text fontSize={"2rem"} fontWeight="bold" color={"#805ad5"}>
              Loading Bookify...
            </Text>
            <Spinner size="xl" my="1%" color="#805ad5"></Spinner>
          </Box>
        </>
      )}
    </>
  );
};




          

export default Sidebar;
