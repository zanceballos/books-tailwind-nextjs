import {
    Box, Button, Center, Image, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text
} from "@chakra-ui/react";
import React from "react";

const AccountModal = ({
    isOpen,
    onClose,
    userInfo,
    currentUser,
    changePassword,
  }) => {
    const changeUserPassword = async () => {
      await changePassword(currentUser.email);
    };
  
    return (
      <>
        {userInfo !== null && (
          <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Account Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Center>
                  <Image
                    alt="alt"
                    src="/account_male.svg"
                    width={"200px"}
                  ></Image>
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
          </Modal>
        )}
      </>
    );
  };
export default AccountModal