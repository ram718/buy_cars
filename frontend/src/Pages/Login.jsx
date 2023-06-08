import {
  Box,
  Text,
  Input,
  FormLabel,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const paylaod = { email, password };
    axios
      .post(`http://localhost:4500/login`, paylaod)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        alert("Login succesfully");
        navigate("/dashboard");
      })
      .catch((e) =>
        alert("Something went wrong,please try again / Wrong Credentials")
      );
  };

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Box>
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
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Login;