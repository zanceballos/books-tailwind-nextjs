import {
  Text,
  SimpleGrid,
  Box,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import BookCardReleases from "../Cards/BookCardReleases";

const VolumesBooks = ({ header, volumes }) => {
  return (
    <div>
      <Text
        fontSize={{sm:"2xl", lg:"4xl"}}
        fontWeight="bold"
        style={{ paddingTop: "2rem", paddingBottom: "1rem" }}
      >
        {header}
      </Text>
      {volumes != null && (
        <Box
          w={"100%"} 
        >
          <HStack
            spacing={2}
            overflowX="auto"
            
            css={{
              "&::-webkit-scrollbar": { height: "4px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#00000014",
                borderRadius: "24px",
              },
            }}
            my="2"
          >
            {volumes.map((book) => (
              <Box
                key={book.id}
                mx={"2"}
                w={{lg:"300px", sm:"200px"}}
                flexShrink={0}
                display={"flex"}
                justifyContent={"center"}
                
              >
                <BookCardReleases details={book} />
              </Box>
            ))}
          </HStack>
        </Box>
      )}
    </div>
  );
};

export default VolumesBooks;
