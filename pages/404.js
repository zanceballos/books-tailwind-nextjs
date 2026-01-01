import { Box, Heading, Text, Button, VStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaRobot } from "react-icons/fa";
const Custom404 = () => {

    const router = useRouter();
  return (
    <>
    <Box
      h="50vh"
      w="full"
      bg="alphaWhite.500" // Dark mode background
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >

        <VStack spacing={6} textAlign="center" px={4}>

            <Heading size="2xl" bgGradient="linear(to-r, purple.400, purple.400)" bgClip="text">
          404: Lost in the Dunes
        </Heading>
        
        <Text fontSize="lg" color="purple.400" maxW="lg">
          Utinni! The page you are looking for has been scavenged or does not exist.
        </Text>

        <Button
          colorScheme="purple"
          bg="purple.500"
          _hover={{ bg: "purple.600" }}
          onClick={() => router.push("/")}
        >
          Return to Base
        </Button>
        </VStack>
    </Box>
    </>
  )
}

export default Custom404