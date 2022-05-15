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
const NetlifyAbout = () => {
  return (
    <>
      <Box
        bgColor={"#ae8aff"}
        width="100%"
        height={{ lg: "550px", md: "750px", sm: "750px" }}
        textAlign={{sm:'center'}}
      >
        <Container maxW={{ lg: "85%", md: "100%", sm: "100%" }}>
          <Grid templateColumns={"repeat(4, 1fr)"}>
            <GridItem colSpan={{ lg: 2, md: 4, sm: 4 }} p="6">
              <Box mt={{ lg: "10%" }}>
                <Text fontWeight={"bold"} fontSize="4vh" color="white">
                  Published with Netlify
                </Text>
                <Text fontWeight={"bold"} fontSize="1rem" color="white">
                  This web application is continously deployed to Netlify as the
                  web server for this Next JS project which is linked via a
                  Github Repository!
                </Text>
                <Box my="2%">
                  <Link href="https://www.netlify.com/" passHref>
                    <Button
                      variant={"solid"}
                      colorScheme="purple"
                      mr="10px"
                      width={{ lg: "200px" }}
                      height="60px"
                      my="1%"
                    >
                      Find Out More
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
                  src="/firebase-about.svg"
                  alt="alt"
                  minWidth={"200px"}
                  maxWidth={"600px"}
                  maxH={"400px"}
                ></Image>
              </Center>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NetlifyAbout;
