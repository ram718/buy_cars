import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Link to={"/"}>Signup</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/dashboard"}>Dashboard</Link>
    </Box>
  );
};

export default Navbar;
