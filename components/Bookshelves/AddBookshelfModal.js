import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
const AddBookshelfModal = ({ isOpen, onClose, addBookshelve }) => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDesc("");
    }
  }, [isOpen]);

  const isInvalid = name.trim() === "" || desc.trim() == "";

  const handleSubmit = () => {
    addBookshelve(name, desc);
    onClose();
  };

  return (
    <>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Bookshelf</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Bookshelve name</FormLabel>
                <Input
                  placeholder="Name Your Bookshelve"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Describe Your Bookshelve"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={handleSubmit}
                disabled={isInvalid}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default AddBookshelfModal;
