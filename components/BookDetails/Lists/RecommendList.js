import React from "react";
import { Box, Text } from "@chakra-ui/react";
const RecommendList = ({details}) => {
  console.log("SUMIDa")
  return (
    <>
      <Box my="8%">
        <Text fontWeight={"bold"} fontSize={"2rem"} colorScheme={"purple"}>
            More Like {details.volumeInfo.authors[0]}
        </Text>
      </Box>
    </>
  );
};

export default RecommendList;
