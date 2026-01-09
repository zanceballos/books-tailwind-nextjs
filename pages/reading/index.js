import React from "react";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { withProtected } from "../../hook/route";
import ReadingCard from "../../components/Reading/ReadingCard";
const Reading = () => {
  const books = [
    {
      id: 1,
      title: "The Half of the Tirns",
      author: "Stephen Riion",
      progress: 45,
      cover: "https://bit.ly/2Z4KKcF",
    },
    {
      id: 2,
      title: "Head of The World",
      author: "Juian Getser",
      progress: 80,
      cover: "https://bit.ly/2Z4KKcF",
    },
    {
      id: 3,
      title: "The Frogen's Brizes",
      author: "Eala Stumer",
      progress: 30,
      cover: "https://bit.ly/2Z4KKcF",
    },
    {
      id: 4,
      title: "How to Halton",
      author: "Xan Ceoal",
      progress: 20,
      cover: "https://bit.ly/2Z4KKcF",
    },
  ];

  // id, title, author, currentPage, totalpages, coverImage
  return (
    <>
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          My Reading List
        </Text>
        <Text mt={3}>
          Welcome to the reading section. Here you can find various articles and
          books to read.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {books.map((book) => (
            <ReadingCard
              key={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.cover}
              progress={book.progress}
              onContinue={() => console.log("Continue", book.id)}
              onRemove={() => console.log("Remove", book.id)}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default withProtected(Reading);
