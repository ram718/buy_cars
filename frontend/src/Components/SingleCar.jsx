import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import CarDetails from "./CarDetails";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import OemSpec from "./OemSpec";

const SingleCar = ({
  name,
  kms_on_odometer,
  original_paint,
  major_scratches,
  number_of_accidents,
  registration_place,
  number_of_previous_buyers,
}) => {
  const navigate = useNavigate();
  const [oemData, setOemData] = useState([]);

  const getOemData = () => {
    axios
      .get(`http://localhost:4500/oem?name=${name}`)
      .then((res) => setOemData(res.data.data))
      .catch((e) => console.log(e));
  };

  const handleClick = (name) => {
    localStorage.setItem("car_name", JSON.stringify(name));
    navigate("/cardetails");
  };

  useEffect(() => {
    getOemData();
  }, []);

  return (
    <Box
      textAlign={"left"}
      margin="auto"
      border={"1px solid black"}
      p="2%"
      height={"100%"}
    >
      <Text fontSize={"2xl"} fontWeight="semibold" textAlign={"center"}>
        {name}
      </Text>
      <Box display={"flex"} gap="20px">
        <Box>
          <Text>Dealer Specs</Text>
          <Text>Kms on odometer: {kms_on_odometer}</Text>
          <Text>Major scratches: {major_scratches}</Text>
          <Text>Original paint: {original_paint}</Text>
          <Text>Number of accidents: {number_of_accidents}</Text>
          <Text>Number of previous_buyers: {number_of_previous_buyers}</Text>
          <Text>Registration place: {registration_place}</Text>
        </Box>

        <Box>
          <Text>OEM Specs</Text>
          {oemData?.map((e) => {
            return <OemSpec key={e.name} {...e} />;
          })}
        </Box>
      </Box>

      <Box display="flex" justifyContent={"space-evenly"} marginTop="2%">
        <Button variant={"ghost"} onClick={() => handleClick(name)}>
          View Details
        </Button>
        <Button variant={"ghost"}>Edit</Button>
        <Button variant={"ghost"}>Delete</Button>
      </Box>
    </Box>
  );
};

export default SingleCar;
