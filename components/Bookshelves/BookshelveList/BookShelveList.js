import React, { useState, useEffect } from "react";
import { useAuth } from "../../../service/AuthService";
import { db } from "../../../config/firebase";
import {
  Box,
  SkeletonCircle,
  SkeletonText,
  SimpleGrid,
  Text,
  Button,
  Grid,
  Flex,
  Spacer,
  VStack,
  Stack,
  useColorModeValue,
  Heading,
  Image,
  Icon,
  Avatar,
  AvatarGroup,
  Tooltip,
  HStack,
  IconButton,
  Skeleton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  FaBook,
  FaEdit,
  FaTrash,
  FaChevronRight,
  FaBookReader,
  FaPlusCircle,
} from "react-icons/fa";
import NextLink from "next/link";
import FavouriteBoxList from "../FavouriteBoxList";
import AddBookshelfModal from "../AddBookshelfModal";
import EditBookshelfModal from "../EditBookshelfModal";
const BookShelveList = () => {
  // Declare the states
  const [favlist, setFavList] = useState([]);
  const [shelfList, setShelfList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState(null);

  //Current Usser
  const { currentUser } = useAuth();

  //Colors
  const emptyBorderColor = useColorModeValue("gray.300", "gray.600");
  const emptyBg = useColorModeValue("gray.50", "gray.800");

  //Modal States
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  // Modal B: Edit Shelf
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const toast = useToast();

  const finalRef = React.useRef(null);

  useEffect(() => {
    //Get the list from Firebase Firestore
    async function getBookshelveList() {
      setIsLoaded(true);
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .get()
        .then((results) => {
          results.docs.forEach((item) => {
            console.log(item.id);
            setShelfList((list) => [...list, { id: item.id, ...item.data() }]);
            //setShelfList(mockShelves); // Using mock data for now
          });
        })
        .then(() => {
          setLoading(false);
        });
    }

    async function getFavourites() {
      setIsLoaded(true);
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("favourites")
        .get()
        .then((results) => {
          results.docs.forEach((item) => {
            setFavList((list) => [...list, { id: item.id, ...item.data() }]);
          });
        })
        .then(() => {
          setLoading(false);
        });
    }
    if (!isLoaded) {
      getFavourites();
      getBookshelveList();
    }
  }, [favlist, BookShelveList]);

  function addBookshelve(name, desc) {
    //setIsLoaded(true);

    // Function to add a new bookshelve to Firestore
    if (name.length === 0 || desc.length === 0) {
      toast({
        title: "Add Bookshelve Failed",
        description: "Bookshelve name cannot be empty.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return; // Do not add if the input is empty
    }
    console.log("Add Bookshelve function called");
    const nameBookshelve = name;
    db.collection("users")
      .doc(currentUser.uid)
      .collection("bookshelves")
      .add({
        coverImage: "default",
        name: nameBookshelve,
        desc: desc,
        createdAt: new Date(),
        bookCount: 0,
        previewImages: [],
      })
      .then((data) => {
        setShelfList([
          ...shelfList,
          {
            id: data.id,
            coverImage: "default",
            name: nameBookshelve,
            desc: desc,
            createdAt: new Date(),
            bookCount: 0,
            previewImages: [],
          },
        ]);
        toast({
          title: "Bookshelve Added",
          description: `Bookshelve "${nameBookshelve}" has been added successfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        console.log("Bookshelve added");
        //setIsLoaded(false)
      });
  }

  function deleteBookshelve(id, name) {
    // Function to delete a bookshelve from Firestore
    console.log("Delete Bookshelve function called for id:", id);
    db.collection("users")
      .doc(currentUser.uid)
      .collection("bookshelves")
      .doc(id)
      .delete()
      .then(() => {
        setShelfList([...shelfList.filter((shelf) => shelf.id !== id)]);
        console.log("Bookshelve deleted");
        toast({
          title: "Bookshelve Deleted",
          description: `Bookshelve: ${name} has been deleted successfully.`,
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  const handleEditClick = (shelf) => {
    setSelectedShelf(shelf);
    onEditOpen();
  };

  const updateBookshelve = async (shelfId, updatedData) => {
    try {
      // Update Firestore
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .doc(shelfId)
        .update(updatedData)
        .then(() => {
          setShelfList((prevList) =>
            prevList.map((shelf) =>
              shelf.id === shelfId ? { ...shelf, ...updatedData } : shelf
            )
          );
        });

      toast({
        title: "Shelf Updated",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      toast({ title: "Error updating shelf", status: "error" });
    }
  };

  return (
    <>
      {loading === true ? (
        <>
          <Stack spacing={4} mt={10}>
            <Skeleton height="40px" width="200px" />
            <Skeleton height="200px" />
            <Skeleton height="40px" width="150px" mt={10} />
            <Skeleton height="80px" />
            <Skeleton height="80px" />
          </Stack>
        </>
      ) : (
        <>
          <Flex  mb={4}>
            <Box>
              <Text
                fontSize={{ base: "2xl", lg: "4xl", md: "2xl", sm: "1xl" }}
                fontWeight="bold"
                
              >
                My Bookshelves
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Button
               
                bgColor={"black"}
                color={"white"}
                rounded="full"
                size={{ base: "md", lg: "md", md: "sm", sm: "sm" }}
                onClick={onAddOpen}
                leftIcon={<FaPlusCircle />}
              >
                Create Shelve
              </Button>
            </Box>
          </Flex>
          <Box>
            <FavouriteBoxList favourites={favlist} />
          </Box>
          <Box mt="30px" mb={"10px"}>
            <Heading
              size={{ base: "2xl", lg: "lg", md: "md", sm: "md" }}
              mb={6}
              textTransform="capitalize"
              m="10px"
              fontWeight={"bold"}
              fontFamily={"inherit"}
            >
              Bookshelves
            </Heading>
            {!loading && shelfList.length === 0 ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                h="300px"
                border="2px dashed"
                borderColor={emptyBorderColor}
                rounded="lg"
                bg={emptyBg}
              >
                <Icon as={FaBookReader} boxSize={12} color="gray.400" mb={4} />
                <Text fontSize="lg" color="gray.500">
                  No Bookshelves! Start adding one!
                </Text>
                {BookShelveList.length === 0 && (
                  <Button
                    m={"20px"}
                    bgColor={"black"}
                    color={"white"}
                    rounded="full"
                    size={{ base: "md", lg: "md", md: "sm", sm: "sm" }}
                    onClick={onAddOpen}
                    leftIcon={<FaPlusCircle />}
                  >
                    Create Shelve
                  </Button>
                )}
              </Flex>
            ) : (
              <div>
                {shelfList.length !== 0 && (
                  <VStack spacing={4} align="stretch">
                    {shelfList.map((shelf) => (
                      <ShelfRow
                        deleteBookshelve={deleteBookshelve}
                        key={shelf.id}
                        shelf={shelf}
                        onEdit={() => handleEditClick(shelf)}
                      />
                    ))}
                  </VStack>
                )}
              </div>
            )}
          </Box>
          <AddBookshelfModal
            isOpen={isAddOpen}
            onOpen={onAddOpen}
            onClose={onAddClose}
            addBookshelve={addBookshelve}
          />
          <EditBookshelfModal
            isOpen={isEditOpen}
            onOpen={onEditOpen}
            onClose={onEditClose}
            updateBookshelve={updateBookshelve}
            currentShelf={selectedShelf}
          />
        </>
      )}
    </>
  );
};

const ShelfRow = ({ shelf, deleteBookshelve, onEdit }) => {
  // Design Hooks
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const iconColor = useColorModeValue("purple.500", "purple.300");
  const iconBg = useColorModeValue("purple.50", "rgba(128, 90, 213, 0.2)");

  const formatDate = (dateProp) => {
    if (!dateProp) return "Unknown date";
    // Check if it is a Firestore Timestamp (has .toDate() method)
    if (dateProp.toDate) {
      return dateProp.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return new Date(dateProp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <>
      <Box
        as={NextLink}
        href={`/bookshelves/shelve/${shelf.id}`}
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

          <Text fontSize="xs" fontWeight="light" display={{sm:"none"}} color="gray.600" mt="2px">
            Added on: {formatDate(shelf.createdAt)}
          </Text>
          {shelf.previewImages && (
            <Box display={{ base: "none", md: "block" }} ml={4}>
              <AvatarGroup size="sm" max={3}>
                {shelf.previewImages.map((img, i) => (
                  <Avatar
                    key={i}
                    src={img}
                    name="Book"
                    border="2px solid white"
                  />
                ))}
              </AvatarGroup>
            </Box>
          )}
          <Spacer />
          <HStack
            spacing={2}
            opacity={{ base: 1, md: 0 }}
            _groupHover={{ opacity: 1 }}
            transition="opacity 0.2s"
            mr={4}
            onClick={(e) => e.preventDefault()}
            display={{sm:"none"}}
          >
            <Tooltip label="Edit Shelf">
              <IconButton
                icon={<FaEdit />}
                size="sm"
                variant="ghost"
                colorScheme="blue"
                aria-label="Edit"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
              />
            </Tooltip>
            <Tooltip label="Delete Shelf">
              <IconButton
                icon={<FaTrash />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                aria-label="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Delete clicked for", shelf.id);
                  deleteBookshelve(shelf.id, shelf.name);
                }}
              />
            </Tooltip>
          </HStack>
          <Icon as={FaChevronRight} color="gray.400" />
        </Flex>
      </Box>
    </>
  );
};
export default BookShelveList;
