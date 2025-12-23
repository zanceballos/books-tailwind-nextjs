import React from 'react'
import { Box, Spinner, Text, Center, VStack } from "@chakra-ui/react";
const Overlay = () => {
  return (
   <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="9999"
      bg="blackAlpha.600" 
      backdropFilter="blur(5px)" 
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center>
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500" 
            size="xl"
          />
          <Text color="white" fontWeight="bold" fontSize="lg">
            Loading...
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}

export default Overlay