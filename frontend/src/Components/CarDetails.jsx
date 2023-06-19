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
      .get(`${process.env.REACT_APP_API_URL}/carDetails?name=${name}`)
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Text fontSize={"3xl"} fontWeight="bold">
        {name} Details
      </Text>
      <Box>
        {data.description?.map((e) => {
          return <Text key={e}>◻︎ {e}</Text>;
        })}
      </Box>
      <Image src={data.image} width="100%"></Image>
      <Button
        variant={"ghost"}
        _hover={{ backgroundColor: "black", color: "white" }}
        marginTop="2%"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </Button>
    </Box>
  );
};

export default CarDetails;
