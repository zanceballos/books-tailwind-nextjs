import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Center,
  Button,
  Container,
} from "@chakra-ui/react"; 
import Link from "next/link";
const ChakraAbout = () => {
  return (
    <>
      <Box
        bgColor={"#ceb3d7"}
        width="100%"
        height={{ lg: "500px", md: "700px", sm: "700px" }}
      >
        <Container maxW={{ lg: "85%", md: "100%", sm: "100%" }}>
          <Grid templateColumns={"repeat(4, 1fr)"}>
            <GridItem colSpan={{ lg: 2, md: 4, sm: 4 }} p="6">
              <Box mt={{ lg: "10%" }}>
                <Text fontWeight={"bold"} fontSize="4vh" color="white">
                  Designed with Chakra UI
                </Text>
                <Text fontWeight={"bold"} fontSize="1rem" color="white">
                  Implemented Chakra UI Framework. This is my first time
                  implementing this UI framework.
                </Text>
                <Box my="2%">
                  <Link href="https://chakra-ui.com/" passHref>
                    
                    <Button
                      variant={"solid"}
                      colorScheme="purple"
                      mr="10px"
                      width={{ lg: "200px" }}
                      height="60px"
                      my="1%"
                    >
                      About Chakra UI
                    </Button>
                  </Link>
                </Box>
              </Box>
            </GridItem>
            <GridItem
              className="about-intros"
              colSpan={{ lg: 2, md: 4, sm: 4 }}
              p="6"
              mt={{ lg: "2%", md: "2%" }}
            >
              <Center>
                <Image
                  src="/chakra-about.svg"
                  alt="alt"
                  minWidth={"400px"}
                  maxWidth={"600px"}
                ></Image>
              </Center>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ChakraAbout;
