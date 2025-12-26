import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaBook, FaChevronRight } from "react-icons/fa";
const AddToShelveModal = ({
  isOpen,
  onClose,
  finalRef,
  initialRef,
  shelfs,
  addBookToShelf,
}) => {
  return (
    <>
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size={"xl"}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Choose Bookshelve</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {shelfs.length === 0 ? (
                <Text
                  fontWeight={"bold"}
                  color="gray"
                  fontSize="1.5rem"
                  mt={"7%"}
                  mb="20px"
                  textTransform={"capitalize"}
                >
                  No bookshelves added yet...
                </Text>
              ) : (
                <VStack spacing={4}>
                  {shelfs.map((shelf) => (
                    <ShelfRow addBookToShelf={addBookToShelf} key={shelf.id} shelf={shelf} />
                  ))}
                </VStack>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                as={NextLink}
                href="/bookshelves/all"
                colorScheme="purple"
                mr={3}
                onClick={() => {
                  onClose();
                }}
              >
                Add More Bookshelve
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

const ShelfRow = ({ shelf, addBookToShelf }) => {
  // Design Hooks
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("purple.500", "purple.300");
  const iconBg = useColorModeValue("purple.50", "rgba(128, 90, 213, 0.2)");

  return (
    <Box
      onClick={() => addBookToShelf(shelf.id)}
      role="group"
      position="relative"
      w="full"
      bg={bg}
      p={4}
      rounded="xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="sm"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "md",
        borderColor: "purple.200",
      }}
    >
      <Flex align="center" gap={3}>
        <Flex
          justify="center"
          align="center"
          h="50px"
          w="50px"
          rounded="lg"
          bg={iconBg}
          color={iconColor}
          fontSize="xl"
          flexShrink={0}
        >
          <Icon as={FaBook} />
        </Flex>
        <VStack align="start" spacing={0} flex={1}>
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", lg: "lg", md: "md", sm: "sm" }}
            color={useColorModeValue("gray.800", "white")}
          >
            {shelf.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {shelf.bookCount || 0} books
          </Text>
        </VStack>
        <Spacer />
        <Icon as={FaChevronRight} color="gray.400" />
      </Flex>
    </Box>
  );
};
export default AddToShelveModal;
