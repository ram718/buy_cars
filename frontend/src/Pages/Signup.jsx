import React, { useEffect } from "react";
import {
  Box,
  Text,
  Input,
  FormLabel,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import buyCars from "../Images/buyCars.jpg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const paylaod = { email, password };
    axios
      .post(`http://localhost:4500/register`, paylaod)
      .then((res) => {
        alert("User is registered succesfully");
        navigate("/login");
      })
      .catch((e) =>
        alert(
          "Something went wrong,please try again / User already exists,please login to continue"
        )
      );
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Box bgImage={buyCars} bgSize="cover">
      <Text my={"5%"} fontSize={"4xl"} fontWeight="bold">
        Signup
      </Text>
      <Box w="30%" margin={"auto"} py={"3%"}>
        <FormControl>
          <FormLabel color={"white"}>Email:</FormLabel>
          <Input
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <FormLabel color={"white"}>Password:</FormLabel>
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
