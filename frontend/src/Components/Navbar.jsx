import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Buy_Car from "../Images/Buy_Car.jpeg";

const Navbar = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <Box
      display={{ md: "flex", lg: "flex" }}
      p="2%"
      marginBottom={"1%"}
      boxShadow={{
        base: "5px 5px 5px lightblue",
        md: "10px 10px 5px lightblue",
        lg: "10px 10px 5px lightblue",
      }}
    >
      <Box w={{ lg: "30%" }}>
        <Image
          onClick={() => navigate("/dashboard")}
          paddingLeft={{ lg: "5%" }}
          src={Buy_Car}
          margin={{ base: "auto" }}
          width={{ base: "50%", lg: "30%" }}
          _hover={{ cursor: "pointer" }}
        ></Image>
      </Box>
      <Box
        display={{ md: "flex", lg: "flex" }}
        justifyContent={{ md: "space-evenly", lg: "space-evenly" }}
        w={{ base: "100%", lg: "70%" }}
        paddingTop={{ base: "5%", md: "1%", lg: "1%" }}
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
              onClick={() => localStorage.removeItem("token")}
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
