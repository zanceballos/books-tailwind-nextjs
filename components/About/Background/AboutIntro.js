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
const AboutIntro = () => {
  return (
    <>
      <Box
        bgColor={"#ae8aff"}
        width="100%"
        height={{ lg: "500px", md: "700px", sm: "700px" }}
        textAlign={{sm:'center'}}
      >
        <Container maxW={{ lg: "85%", md: "100%", sm: "100%" }}>
          <Grid templateColumns={"repeat(4, 1fr)"}>
            <GridItem colSpan={{ lg: 2, md: 4, sm: 4 }} p="6">
              <Box mt={{ lg: "10%" }}>
                <Text fontWeight={"bold"} fontSize="4vh" color="white">
                  About this Web Application!
                </Text>
                <Text fontWeight={"bold"} fontSize="1rem" color="white">
                  Bookify is a simple Book Web Application made with NextJS,
                  ChakraUI, Firebase and Google Books Api
                </Text>
                <Box my="2%">
                  <Link href="mailto:izzan2234@outlook.com" passHref>
                    <Button
                      variant={"solid"}
                      colorScheme="purple"
                      mr="10px"
                      width={{ lg: "200px" }}
                      height="60px"
                      my="1%"
                    >
                      Contact Me
                    </Button>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/izzan-razak-0477581a9/"
                    passHref
                  >
                    <Button
                      variant={"outline"}
                      colorScheme="purple"
                      width={{ lg: "200px" }}
                      height="60px"
                      my="1%"
                    >
                      LinkedIn
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
                  src="/about-1.svg"
                  alt="alt"
                  minWidth={"200px"}
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

export default AboutIntro;
