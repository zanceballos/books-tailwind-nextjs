import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
const Custom500 = () => {
  return (
    <>
      <Box
        h="100vh"
        w="full"
        bg="gray.900"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Heading color="red.400">500 - System Failure</Heading>
          <Text>
            The Sandcrawler has broken down. We are working on repairs.
          </Text>
          <Button
            onClick={() => window.location.reload()}
            colorScheme="red"
            variant="outline"
          >
            Try Again
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Custom500;
