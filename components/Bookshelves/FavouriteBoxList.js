import {Box, Heading, Text, Flex, Spacer, Button, VStack, Image, useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";

const FavouriteBoxList = ({ favourites }) => {
  const woodLight = "#eebb88";
  const woodDark = "#a06842";
  const shadowColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)");

  return (
    <Box mt="5px" mb={"10px"}>
      <Heading
        size={{ base: "md", lg: "lg", md: "md", sm: "sm" }}
        mb={6}
        textTransform="capitalize"
        m="10px"
        fontWeight={"bold"}
      >
        Favourites
      </Heading>

      {/* Map through favourite books and display them here */}
      {favourites.length === 0 && (
        <Box textAlign={"center"}>
          <Text
            fontWeight={"bold"}
            color="gray"
            fontSize="1rem"
            mb="20px"
            textTransform={"capitalize"}
          >
            No favourites added yet...
          </Text>
        </Box>
      )}

      <Box position="relative" w="full">
        <Flex
          align={"flex-end"}
          gap="6"
          overflowX={"auto"}
          pb={0}
          css={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
          px={4}
          zIndex={2}
          position={"relative"}
        >
          {favourites.length !== 0 &&
            favourites.map((book, index) => (
              <>
                <VStack
                  key={index}
                  spacing={0}
                  as={NextLink}
                  href={`/books/details/${book.id}`}
                  cursor="pointer"
                  transition="transform 0.2s"
                  _hover={{ transform: "translateY(-8px) scale(1.02)" }}
                >
                  <Image
                    src={
                      book.volumeInfo?.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/150"
                    }
                    alt={book.volumeInfo?.title}
                    w="160px"
                    h="240px"
                    maxW="140px"
                    objectFit="cover"
                    shadow="xl"
                    rounded="md"
                    borderLeftRadius="md"
                    borderRightRadius="xs"
                    border="1px solid"
                    borderColor={"gray.200"}
                    boxShadow={`
      inset 10px 0px 15px -8px rgba(0,0,0,0.4), 
      4px 4px 0px rgba(0,0,0,0.2),
      8px 8px 15px rgba(0,0,0,0.3)
    `}
                    transition="all 0.3s ease"
                  />
                </VStack>
              </>
            ))}
        </Flex>

        <Box
          w="full"
          h="16px"
          mt="-2px"
          bgGradient={`linear(to-b, ${woodLight}, #c89666)`}
          position="relative"
          zIndex={1}
          _after={{
          
            content: '""',
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            height: "12px",
            bg: woodDark,
            borderBottomRadius: "md",
            boxShadow: `0px 15px 20px -5px ${shadowColor}`,
          }}
        />
      </Box>
    </Box>
  );
};

export default FavouriteBoxList;