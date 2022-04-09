import React, { useState, useRef } from "react";
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
import { useAuth } from "../../../service/AuthService";
import { AiFillGoogleCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
const LoginCard = () => {
  const { login, currentUser } = useAuth();
  const router = useRouter();

  const username = useRef();
  const password = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginUser() {
    if (username.current.value === "" || password.current.value === "") {
      return setError("Please Fill up the form!");
    }

    try {
      setError("");
      setLoading(true);
      await login(username.current.value, password.current.value);
      router.replace("/");
    } catch {
      setLoading(false)
      setError("Username or Password is Incorrect");
    }
  }

  return (
    <>
      <Container maxW={{ lg: "45%", md: "75%", sm: "100%" }} mt="5%">
        <Box p={"6"} width="100%" shadow={"lg"} rounded="lg">
          <Box p="4">
            <Text
              fontSize={{ lg: "2rem", md: "1.5rem", sm: "1.5rem" }}
              fontWeight="bold"
            >
              Sign In to Bookify!
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
              <Input
                my={"10px"}
                bg="gray.100"
                height={"50px"}
                placeholder="Email"
                ref={username}
              ></Input>
              <Input
                my={"10px"}
                bg="gray.100"
                height={"50px"}
                placeholder="Password"
                ref={password}
                type="password"
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
                onClick= {loginUser}
              >
                Sign In
              </Button>
              <Button
                width="100%"
                height={"60px"}
                mb="10px"
                colorScheme="green"
                leftIcon={<AiFillGoogleCircle />}
              >
                Google Sign in
              </Button>
              <Link href="/account/register">
                <Button
                  colorScheme={"purple"}
                  width="100%"
                  variant="outline"
                  height={"60px"}
                >
                  Create New Account
                </Button>
              </Link>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginCard;
