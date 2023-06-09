import React, { useEffect } from "react";
import {
  Box,
  Text,
  Input,
  FormLabel,
  Button,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import buyCars from "../Images/buyCars.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignup = () => {
    const paylaod = { email, password };
    axios
      .post(`http://localhost:4500/register`, paylaod)
      .then((res) => {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          position: "top-right",
          duration: 6000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((e) =>
        toast({
          title: "Invalid Request",
          description: "Something went wrong.",
          status: "error",
          position: "top-right",
          duration: 6000,
          isClosable: true,
        })
      );
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Box padding={"1% 0 10% 0"} bgColor={"lightcyan"}>
      <Text my={"5%"} fontSize={"4xl"} fontWeight="bold">
        Signup
      </Text>
      <Box w="30%" margin={"auto"} py={"3%"}>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <FormLabel>Password:</FormLabel>
          <Input
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </FormControl>
        <Button
          style={{ marginTop: "5%" }}
          variant="ghost"
          onClick={handleSignup}
          _hover={{ backgroundColor: "Black", color: "white" }}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
