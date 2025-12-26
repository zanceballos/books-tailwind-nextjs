import { Text, SimpleGrid, Box } from "@chakra-ui/react";
import BookCardReleases from "../Cards/BookCardReleases";

const VolumesBooks = ({ header, volumes }) => {
  return (
    <div>
      <Text
        fontSize="4xl"
        fontWeight="bold"
        style={{ paddingTop: "4rem", paddingBottom: "1.5rem" }}
      >
        {header}
      </Text>
      {volumes != null && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} w="full" spacing="40px">
          {volumes
            .map((book) => (
              <Box key={book.id} mx={"auto"} w="full" display={"flex"} justifyContent={"center"}>
                <BookCardReleases details={book} />
              </Box>
            ))
            .slice(0, 6)}
        </SimpleGrid>
      )}
    </div>
  );
};

export default VolumesBooks;
