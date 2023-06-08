import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Buy_Car from "../Images/Buy_Car.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <Box
      display={"flex"}
      p="2%"
      marginBottom="1%"
      boxShadow={"10px 10px 5px lightblue"}
    >
      <Box w={"30%"}>
        <Image
          onClick={() => navigate("/dashboard")}
          paddingLeft={"5%"}
          src={Buy_Car}
          width="30%"
          _hover={{ cursor: "pointer" }}
        ></Image>
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "space-around" }}
        w="70%"
        paddingTop={"1%"}
      >
        <Button
          variant={"ghost"}
          _hover={{ backgroundColor: "black", color: "white" }}
        >
          <Link to={"/dashboard"}>Dashboard</Link>
        </Button>
        <Button
          variant={"ghost"}
          _hover={{ backgroundColor: "black", color: "white" }}
        >
          <Link to="/add">Add Car</Link>
        </Button>

        <Button
          variant={"ghost"}
          _hover={{ backgroundColor: "black", color: "white" }}
        >
          <Link to={"/"}>Signup</Link>
        </Button>
        {token ? (
          <Link to={"/login"}>
            <Button
              variant={"ghost"}
              _hover={{ backgroundColor: "black", color: "white" }}
            >
              Logout
            </Button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <Button
              variant={"ghost"}
              _hover={{ backgroundColor: "black", color: "white" }}
            >
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
