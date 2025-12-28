import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Image,
  Button,
  VStack,
  HStack,
  Icon,
  IconButton,
  Spacer,
  useColorModeValue,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Badge,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  FaPlay,
  FaPen,
  FaTrash,
  FaClock,
  FaEllipsisH,
  FaBookOpen,
  FaArrowLeft,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import NextLink from "next/link";
import { db } from "../../config/firebase";
import { useAuth } from "../../service/AuthService";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import EditBookshelfModal from "./EditBookshelfModal";
import { useDisclosure } from "@chakra-ui/react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Bookshelve = () => {
  //color mode values
  const tableBg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const emptyBorderColor = useColorModeValue("gray.300", "gray.600");
  const emptyBg = useColorModeValue("gray.50", "gray.800");

  const [shelfData, setShelfData] = useState(null);
  const [shelveBooks, setShelveBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, SetShowSearch] = useState(false);

  const params = useParams();
  const shelveid = params.shelveid;
  const { currentUser } = useAuth();

  const toast = useToast();

  const router = useRouter();

  const hoverCard = useColorModeValue("gray.50", "whiteAlpha.50");

  // Modal B: Edit Shelf
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Placeholder
  const DEFAULT_COVER = "https://www.biotrop.org/images/default-book.png";

  const shelfCover = shelfData?.coverImage || DEFAULT_COVER;

  useEffect(() => {
    // Fetch shelf data from database using shelf ID
    db.collection("users")
      .doc(currentUser.uid)
      .collection("bookshelves")
      .doc(shelveid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setShelfData({ id: doc.id, ...doc.data() });
          console.log("Shelf Data:", doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    // Fetch books in the shelf
    db.collection("users")
      .doc(currentUser.uid)
      .collection("bookshelves")
      .doc(shelveid)
      .collection("books")
      .get()
      .then((querySnapshot) => {
        const books = [];
        querySnapshot.forEach((doc) => {
          books.push({ bookid: doc.id, ...doc.data() });
        });
        setShelveBooks(books);
        console.log("Books in Shelf:", books);
      });
  }, []);

  //Edit Shelve Data
  const updateBookshelve = async (shelfId, updatedData) => {
    console.log(shelfId, updatedData);
    try {
      // Update Firestore
      await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .doc(shelfId)
        .update(updatedData)
        .then(() => {
          // Get updated data
          setShelfData((prev) => ({
            ...prev,
            ...updatedData,
          }));
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

  //Remove Book from Shelve
  const removeBook = async (bookid) => {
    console.log(bookid);
    try {
      //Update Firestore
      const booktoRemove = shelveBooks.find((b) => b.bookid === bookid);
      const bookTitle = booktoRemove?.volumeInfo?.title || "Book";

      const bookRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .doc(shelveid)
        .collection("books")
        .doc(bookid); // Using .doc(bookid) is faster than .where()

      await bookRef.delete();

      db.collection("users")
        .doc(currentUser.uid)
        .collection("bookshelves")
        .doc(shelveid)
        .update({
          bookCount: firebase.firestore.FieldValue.increment(-1),
        });

      toast({
        title: "Removed!",
        description: `${bookTitle} has been removed from your bookshelf.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setShelveBooks((prevBooks) =>
        prevBooks.filter((b) => b.bookid !== bookid)
      );
    } catch (error) {
      toast({
        title: `ERROR`,
        description: `${error}`,
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  //Delete Functionlity
  const deleteShelf = async () => {
    const deleteRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("bookshelves")
      .doc(shelfData.id);

    await deleteRef
      .delete()
      .then(() => {
        toast({
          title: `Bookshelve Deteled`,
          description: `Bookshelve has been deleted`,
          status: "warning",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => {
        router.back();
      });
  };

  //Search Book Functionality - get the list and filter accordingly
  const booksDisplay = shelveBooks.filter((book) => {
    if (!searchQuery) return true;
    const title = book.volumeInfo.title || "";

    return title.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  });

  return (
    <Box width={"full"} minH={"100vh"} pb="100px">
      <Box
        position="relative"
        w="full"
        h={{ base: "auto", md: "400px" }}
        overflow="hidden"
        bg="gray.900"
        rounded={"2xl"}
        shadow={"2xl"}
      >
        <IconButton
          icon={<FaArrowLeft />}
          aria-label="Back"
          position="absolute"
          top={{ base: 4, md: 8 }}
          left={{ base: 4, md: 8 }}
          zIndex={10}
          onClick={() => router.back()}
          variant="solid"
          bg="blackAlpha.600"
          color="white"
          rounded="full"
          _hover={{ bg: "blackAlpha.800", transform: "scale(1.1)" }}
        />
        <Box
          position="absolute"
          top={-50}
          left={-50}
          right={-50}
          bottom={-50}
          zIndex={0}
          backgroundImage={`url(${shelfCover})`}
          backgroundSize="cover"
          backgroundPosition="center"
          filter="blur(60px) brightness(0.6)"
          opacity={0.8}
        />

        <Flex
          position="relative"
          zIndex={1}
          h="full"
          align="center"
          p={{ base: 6, md: 10 }}
          direction={{ base: "column", md: "row" }}
          gap={8}
          bgGradient="linear(to-b, transparent 0%, rgba(0,0,0,0.4) 100%)"
        >
          <Box
            boxShadow="3xl"
            rounded="lg"
            overflow="hidden"
            w={{ base: "200px", md: "200px" }}
            h={{ base: "200px", md: "300px" }}
          >
            <Image
              src={shelfCover}
              alt={shelfData?.name || "Bookshelf"}
              w="full"
              h="full"
              objectFit="cover"
              fallbackSrc={DEFAULT_COVER}
            />
          </Box>
          <VStack align="start" spacing={1} pb={2} flex={1}>
            <Text
              color="whiteAlpha.800"
              fontWeight="bold"
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Bookshelf
            </Text>
            <Heading
              color="white"
              fontSize={{ base: "3xl", md: "5xl", lg: "7xl" }}
              fontWeight="900"
              lineHeight="1"
              mb={4}
            >
              {shelfData?.name || "Loading..."}
            </Heading>
            <Text
              color="whiteAlpha.800"
              fontSize={{ base: "sm", md: "md" }}
              noOfLines={2}
            >
              {shelfData?.description || "No description provided."}
            </Text>
            <HStack
              mt={4}
              spacing={2}
              color="white"
              fontWeight="medium"
              fontSize="sm"
            >
              <Avatar size="xs" name={currentUser?.displayName} />
              <Text fontWeight="bold">{currentUser?.displayName}</Text>
              <Text>•</Text>
              <Text>{shelveBooks.length} books</Text>
              <Text>•</Text>
              <Text color="whiteAlpha.700">
                Created on{" "}
                {shelfData?.createdAt.toDate
                  ? shelfData?.createdAt.toDate().toLocaleDateString()
                  : "Unknown"}
              </Text>
            </HStack>
          </VStack>
        </Flex>
      </Box>

      <Box bg={tableBg} px={{ base: 6, md: 10 }} py={6}>
        <Flex align="center" gap={6}>
          <Tooltip label="Start Reading (Random Book)">
            <IconButton
              icon={<FaPlay pl="1" />}
              size="lg"
              isRound
              colorScheme="green"
              aria-label="Start Reading"
              boxShadow="lg"
              _hover={{ transform: "scale(1.05)" }}
              transition="all 0.2s"
            />
          </Tooltip>

          <HStack spacing={4}>
            <Tooltip label="Edit Shelf">
              <IconButton
                variant="ghost"
                icon={<FaPen />}
                fontSize="xl"
                color="gray.400"
                aria-label="Edit"
                onClick={onEditOpen}
              />
            </Tooltip>
            <Tooltip label="Delete Shelf">
              <IconButton
                variant="ghost"
                icon={<FaTrash />}
                fontSize="xl"
                color="gray.400"
                aria-label="Delete"
                onClick={deleteShelf}
              />
            </Tooltip>
            <IconButton
              variant="ghost"
              icon={<FaEllipsisH />}
              fontSize="xl"
              color="gray.400"
              aria-label="More"
            />
          </HStack>

          <Spacer />

          <HStack
            color="gray.400"
            cursor="pointer"
            display={{ base: "none", md: "flex" }}
          >
            {showSearch ? (
              <Input
                size={"lg"}
                placeholder="Search Books"
                borderRadius={"full"}
                bg="gray.50"
                shadow={"lg"}
                border="1px solid"
                focusBorderColor="purple.500"
                _placeholder={{ color: "gray.400" }}
                _hover={{
                  borderColor: "gray.300",
                  bg: "white",
                }}
                transition="all 0.2s"
                value={searchQuery}
                onBlur={() => {
                  SetShowSearch(false);
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></Input>
            ) : (
              <Text
                fontSize="sm"
                fontWeight="bold"
                onClick={() => {
                  SetShowSearch(true);
                }}
              >
                Search
              </Text>
            )}
            <Icon as={FiSearch} />
          </HStack>
        </Flex>
      </Box>

      <Box>
        <Input
          width={"100%"}
          size={"lg"}
          placeholder="Search Books"
          display={{ base: "flex", md: "none" }}
          bg="gray.50"
          shadow={"lg"}
          focusBorderColor="purple.500"
          _placeholder={{ color: "gray.400" }}
          _hover={{
            borderColor: "gray.300",
            bg: "white",
          }}
          transition="all 0.2s"
          value={searchQuery}
          onBlur={() => {
            SetShowSearch(false);
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></Input>
      </Box>

      <Box px={{ base: 4, md: 10 }} mt={4}>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th w="50px">#</Th>
              <Th>Title</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Date Added</Th>
              <Th isNumeric>
                <Icon as={FaClock} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {booksDisplay.map((book, index) => (
              <Tr
                key={book.id}
                _hover={{ bg: hoverCard }}
                transition="background 0.2s"
                group="true"
              >
                {/* Index / Play Icon on Hover */}
                <Td color={textColor} w="50px">
                  <Box w="20px" textAlign="center">
                    <Text
                      className="index"
                      display="block"
                      _groupHover={{ display: "none" }}
                    >
                      {index + 1}
                    </Text>
                    <Icon
                      as={FaPlay}
                      display="none"
                      fontSize="xs"
                      _groupHover={{ display: "block" }}
                    />
                  </Box>
                </Td>

                {/* Title & Cover */}
                <Td>
                  <Flex align="center" gap={4}>
                    <Image
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      boxSize="40px"
                      objectFit="cover"
                      rounded="md"
                      alt="cover"
                      fallbackSrc="https://via.placeholder.com/40"
                    />
                    <Box>
                      <Text fontWeight="bold" color={"white"}>
                        {book.volumeInfo.title}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {book.volumeInfo.authors?.[0]}
                      </Text>
                    </Box>
                  </Flex>
                </Td>

                <Td
                  color="gray.500"
                  fontSize="sm"
                  display={{ base: "none", md: "table-cell" }}
                >
                  {book?.addedAt?.toDate
                    ? book.addedAt.toDate().toLocaleDateString()
                    : "Unknown"}
                </Td>

                {/* Duration/Action placeholder */}
                <Td isNumeric color="gray.500" fontSize="sm">
                  <Tooltip label="Remove from shelf">
                    <IconButton
                      icon={<FaTrash />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => removeBook(book.bookid)}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
            {shelveBooks.length === 0 && (
              <Tr>
                <Td colSpan={4} textAlign="center" py={10}>
                  {emptyShelve()}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <EditBookshelfModal
        isOpen={isEditOpen}
        onOpen={onEditOpen}
        onClose={onEditClose}
        updateBookshelve={updateBookshelve}
        currentShelf={shelfData}
      />
    </Box>
  );
};

const emptyShelve = () => {
  
  return (
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
      <Icon as={FaBookOpen} boxSize={12} color="gray.400" mb={4} />
      <Text fontSize="lg" color="gray.500">
        This shelf is empty. Start adding some books!
      </Text>
    </Flex>
  );
};

export default Bookshelve;
