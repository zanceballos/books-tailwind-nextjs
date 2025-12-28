import React, { useState, useEffect, useRef } from "react";
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
  Image,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";

import { uploadToCloudinary } from "../../config/uploadShelveImg";

const EditBookshelfModal = ({
  isOpen,
  onClose,
  currentShelf,
  updateBookshelve,
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  //Image handling
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(""); // Shows current OR new image
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen && currentShelf) {
      setName(currentShelf.name || "");
      setDesc(currentShelf.description || "");
      setPreviewUrl(currentShelf.coverImage || ""); // Show existing image
      setSelectedFile(null); // Reset file selection
    }
  }, [isOpen, currentShelf]);

  //Handle Image Selection & Preview
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a local URL just for previewing immediately (fast UX)
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const isInvalid = name.trim() === "" || desc.trim() === "";

  const handleSubmit = async () => {
    setIsUploading(true);

    try {
      let finalImageUrl = currentShelf.coverImage || null; // Default to old image

      // Only upload if the user actually picked a NEW file
      if (selectedFile) {
        const uploadedUrl = await uploadToCloudinary(selectedFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        }
      }

      // Call the parent update function
      await updateBookshelve(currentShelf.id, {
        name: name,
        description: desc,
        coverImage: finalImageUrl,
      });

      onClose();
    } catch (error) {
      console.error("Failed to update shelf", error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bookshelf</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Name Input */}
          <FormControl isRequired>
            <FormLabel>Bookshelf Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Late Night Thrillers"
            />
          </FormControl>

          {/* Description Input */}
          <FormControl mt={4} isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What is this bookshelve about?"
            />
          </FormControl>

          {/* Image Upload Section */}
          <FormControl mt={4}>
            <FormLabel>Cover Image</FormLabel>

            {/* Image Preview Box */}
            {previewUrl && (
              <Box
                mb={3}
                borderRadius="md"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.200"
                w="100px"
                h="100px"
              >
                <Image
                  src={previewUrl}
                  alt="Shelf Preview"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              p={1}
              variant="unstyled" // Makes it look cleaner
            />
            <Text fontSize="xs" color="gray.500" mt={1}>
              Leave empty to keep the current cover.
            </Text>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            onClick={handleSubmit}
            isLoading={isUploading}
            isDisabled={isInvalid}
            loadingText="Saving..."
          >
            Save Changes
          </Button>
          <Button onClick={onClose} isDisabled={isUploading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditBookshelfModal;
