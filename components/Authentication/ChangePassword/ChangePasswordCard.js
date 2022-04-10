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
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../../service/AuthService";
import { auth } from "../../../config/firebase";
const ChangePasswordCard = () => {
  const { login, currentUser, changePassword } = useAuth();
  const router = useRouter();

  const email = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeUserPassword = async () => {
    
    if(email.current.value === ""){
        return setError("Email Field Cannot Be Empty!")
    }

    try{
        setError("")
        setLoading(true)
        await changePassword(email.current.value);
        router.replace("/account/login");
    }catch {
        setLoading(false)
        setError("Something went wrong, please enter a valid email! ");
    }

  };

  return (
    <>
      <Container maxW={{ lg: "45%", md: "75%", sm: "100%" }} mt="5%">
        <Box p={"6"} width="100%" shadow={"lg"} rounded="lg">
          <Box p="4">
            <Text
              fontSize={{ lg: "2rem", md: "1.5rem", sm: "1.5rem" }}
              fontWeight="bold"
            >
              Change Your Password
            </Text>
            <Text
              fontSize={{ lg: "1rem", md: "1rem", sm: "1rem" }}
              color="gray"
              fontWeight="bold"
              mb="10px"
            >
              Enter new password to continue
            </Text>

            <FormControl>
              <Input
                my={"10px"}
                bg="gray.100"
                height={"50px"}
                placeholder="Enter Email Here"
                ref={email} 
                type="text"
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
                onClick={changeUserPassword}
              >
                Send Password Reset Email
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ChangePasswordCard;
