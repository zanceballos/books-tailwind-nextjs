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
const NextIntro = () => {

    console.log(process.env.NODE_ENV === "production")
  return (
    <>
      <Box
        bgColor={"#B19CD1"}
        width="100%"
        height={{ lg: "500px", md: "700px", sm: "700px" }}
      >
        <Container maxW={{ lg: "85%", md: "100%", sm: "100%" }}>
          <Grid templateColumns={"repeat(4, 1fr)"}>
            <GridItem
              className="about-intros"
              colSpan={{ lg: 2, md: 4, sm: 4 }}
              p="6"
              mt={{ lg: "2%", md: "2%" }}
            >
              <Center>
                <Image
                  src="/nextjs-about.svg"
                  alt="alt"
                  minWidth={"400px"}
                  maxWidth={"600px"}
                ></Image>
              </Center>
            </GridItem>

            <GridItem colSpan={{ lg: 2, md: 4, sm: 4 }} p="6">
              <Box mt={{ lg: "10%" }}>
                <Text fontWeight={"bold"} fontSize="4vh" color="white">
                  Made with Next JS
                </Text>
                <Text fontWeight={"bold"} fontSize="1rem" color="white">
                  This Web Application is a side project for me to work on Next
                  JS as a way to further explore the framework and the
                  subsidiaries of React JS!
                </Text>
                <Box my="2%">
                  <Link href="https://nextjs.org/" passHref>
                    <Button
                      variant={"solid"}
                      colorScheme="purple"
                      mr="10px"
                      width={{ lg: "200px" }}
                      height="60px"
                    >
                      About Next JS
                    </Button>
                  </Link>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default NextIntro;
