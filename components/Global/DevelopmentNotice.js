import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaHardHat } from "react-icons/fa";
import { useRouter } from "next/router";
const DevelopmentNotice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Check if user has seen this message before
    const hasSeenNotice = sessionStorage.getItem("hasSeenDevNotice");

    if (!hasSeenNotice) {
      // If not, show the modal
      onOpen();
    }
  }, [onOpen]);

  const handleClose = () => {
    // Save to local storage so it doesn't pop up again
    sessionStorage.setItem("hasSeenDevNotice", "true");
    onClose();
  };

  const handleGoToDetails = () => {
    handleClose(); // Close modal
    router.replace("/About"); // CHANGE THIS to your specific page route
  };

  // Avoid hydration mismatch by not rendering until mounted
  if (!isMounted) return null;
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        closeOnOverlayClick={false} // Force them to read/click a button
        size="md"
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
        <ModalContent
          borderRadius="xl"
          border="1px solid"
          borderColor="purple.200"
        >
          <ModalHeader textAlign="center" pt={6}>
            <VStack spacing={3}>
              <Icon as={FaHardHat} w={10} h={10} color="orange.400" />
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                Work in Progress
              </Text>
            </VStack>
          </ModalHeader>

          <ModalBody textAlign="center">
            <Text fontSize="md" color="gray.600" mb={4}>
              Welcome to <strong>Bookify</strong>!
            </Text>
            <Text fontSize="sm" color="gray.500">
              This website is currently under active development. Some features
              may be unstable or change without notice.
            </Text>
            <Text mt={4} fontSize="sm" fontWeight="medium">
              Want to see the technical details or roadmap?
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="center" gap={3} pb={6}>
            <Button colorScheme="purple" onClick={handleGoToDetails} px={6}>
              View Details
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DevelopmentNotice;
