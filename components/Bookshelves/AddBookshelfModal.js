import React, {useState} from "react";
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
const AddBookshelfModal = ({
  isOpen,
  onClose,
  finalRef,
  initialRef,
  addBookshelve,
}) => {

    const [disabled, setDisabled] = useState(true);

    const checkEmpty = () => {
        // Check if input is empty
        if (initialRef.current.value.trim() === "") {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }


  return (
    <>
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Bookshelf</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Bookshelve name</FormLabel>
                <Input onChange={checkEmpty} ref={initialRef} placeholder="Name Your Bookshelve" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={() => {addBookshelve(); onClose();}} disabled={disabled}>
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
