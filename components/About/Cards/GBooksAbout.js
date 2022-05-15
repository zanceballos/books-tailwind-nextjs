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
const GBooksAbout = () => {
  return (
    <>
      <Box
        bgColor={"#dcc5ff"}
        width="100%"
        height={{ lg: "550px", md: "750px", sm: "750px" }}
        textAlign={{sm:'center'}}
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
                  src="/firebase-new.svg"
                  alt="alt"
                  minWidth={"200px"}
                  maxWidth={"600px"}
                  maxHeight={"400px"}
                ></Image>
              </Center>
            </GridItem>

            <GridItem colSpan={{ lg: 2, md: 4, sm: 4 }} p="6">
              <Box mt={{ lg: "10%" }}>
                <Text fontWeight={"bold"} fontSize="4vh" color="white">
                  Powered by Google Firebase and Google Books API
                </Text>
                <Text fontWeight={"bold"} fontSize="1rem" color="white">
                  Google Firebase is used for the database usages and Google
                  Books API to retrieve all books information!
                </Text>
                <Box my="2%">
                  <Link href="https://firebase.google.com/" passHref>
                    <Button
                      variant={"solid"}
                      colorScheme="purple"
                      mr="10px"
                      width={{ lg: "200px" }}
                      height="60px"
                    >
                      About Firebase
                    </Button>
                  </Link>

                  <Link href="https://developers.google.com/books/docs/v1/using" passHref>
                    <Button
                      variant={"outline"}
                      colorScheme="purple"
                      width={{ lg: "200px" }}
                      height="60px"
                      my="1%"
                    >
                      About GBooks API
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

export default GBooksAbout;
