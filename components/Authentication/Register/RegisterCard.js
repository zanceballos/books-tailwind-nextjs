import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Input,
  Text,
  SimpleGrid,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../../service/AuthService";
const RegisterCard = () => {
  const { signup, currentUser } = useAuth();
  const router = useRouter();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser() {
    console.log(email.current.value, )
    if (password.current.value != confirmPassword.current.value) {
      return setError("Password does not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        username.current.value,
        email.current.value,
        password.current.value
      );
      router.replace("/");
    } catch {
      setError("Failed to create an account!");
    }
  }

  return (
    <>
      <Container maxW={{ lg: "55%", md: "75%", sm: "100%" }} mt="5%">
        <Box p={"6"} width="100%" shadow={"lg"} rounded="lg">
          <Box p="4">
            <Text
              fontSize={{ lg: "2rem", md: "1.5rem", sm: "1.5rem" }}
              fontWeight="bold"
            >
              Register Account
            </Text>
            <Text
              fontSize={{ lg: "1rem", md: "1rem", sm: "1rem" }}
              color="gray"
              fontWeight="bold"
              mb="10px"
            >
              Enter Your Credentials to Continue
            </Text>
            <FormControl>
              <SimpleGrid columns="2" spacing={"5"}>
                <Input
                  my={"10px"}
                  bg="gray.100"
                  height={"50px"}
                  placeholder="Username"
                  ref={username}
                ></Input>
                <Input
                  my={"10px"}
                  bg="gray.100"
                  height={"50px"}
                  placeholder="Email"
                  ref={email}
                ></Input>
              </SimpleGrid>
              <Input
                my={"10px"}
                bg="gray.100"
                height={"50px"}
                type="password"
                placeholder="Password"
                ref={password}
              ></Input>
              <Input
                my={"10px"}
                bg="gray.100"
                height={"50px"}
                type="password"
                placeholder="Confirm Password"
                ref={confirmPassword}
              ></Input>
              {error && (
                <Alert my="1%" rounded="lg" height={"80px"} status="error">
                  <AlertIcon />
                  <AlertTitle mr={2}>Something went wrong!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
             
                </Alert>
              )}
              <Button
                colorScheme={"purple"}
                width="100%"
                mb="10px"
                height={"60px"}
                isLoading={loading ? true : false}
                onClick={registerUser}
              >
                Sign Up
              </Button>
           
              <Link href="/account/login" passHref>
                <Button
                  colorScheme={"purple"}
                  width="100%"
                  variant="outline"
                  height={"60px"}
                >
                  Sign In To Existing Account
                </Button>
              </Link>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default RegisterCard;
