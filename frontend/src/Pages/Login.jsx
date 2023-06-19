import {
  Box,
  Text,
  Input,
  FormLabel,
  Button,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = () => {
    const paylaod = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, paylaod)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        toast({
          title: "Logged in",
          description: "Login is successful",
          status: "success",
          position: "top-right",
          duration: 6000,
          isClosable: true,
        });
        navigate("/dashboard");
      })
      .catch((e) =>
        toast({
          title: "Invalid",
          description: "Wrong credentials / Something went wrong.",
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
        Login
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
          onClick={handleLogin}
          _hover={{ backgroundColor: "Black", color: "white" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
