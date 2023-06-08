import React, { useState } from "react";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CarDetails = () => {
  const [data, setData] = useState([]);
  const name = JSON.parse(localStorage.getItem("car_name"));
  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`http://localhost:4500/carDetails?name=${name}`)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Text>{name} Details</Text>
      <Box>
        <Text>Description : {data.description}</Text>
        <Image src={data.image} width="100%"></Image>
      </Box>
      <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
    </Box>
  );
};

export default CarDetails;
