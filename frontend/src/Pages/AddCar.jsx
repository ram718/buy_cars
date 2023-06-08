import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [km, setKm] = useState("");
  const [scratches, setScratches] = useState("");
  const [paint, setPaint] = useState("");
  const [accidents, setAccidents] = useState("");
  const [buyers, setBuyers] = useState("");
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    const payload = {
      name,
      kms_on_odometer: km,
      major_scratches: scratches,
      original_paint: paint,
      number_of_accidents: accidents,
      number_of_previous_buyers: buyers,
      registration_place: place,
    };
    fetch(`http://localhost:4500/market/add`, {
      method: "POST",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.msg);
        setAccidents("");
        setBuyers("");
        setKm("");
        setName("");
        setPaint("");
        setPlace("");
        setScratches("");
      })
      .catch((e) => alert("Invalid Request"));
  };

  return (
    <Box my={"5%"}>
      <Text fontSize={"4xl"} fontWeight="bold">
        Add Car
      </Text>
      <Button
        variant={"ghost"}
        _hover={{ backgroundColor: "black", color: "white" }}
        margin="-5% 0 0 90%"
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </Button>
      <Box w={"40%"} margin="auto" py={"2%"}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <FormLabel>Kms on odometer</FormLabel>
          <Input
            type={"number"}
            value={km}
            onChange={(e) => setKm(e.target.value)}
          ></Input>
          <FormLabel>Major scratches</FormLabel>
          <Input
            type={"number"}
            value={scratches}
            onChange={(e) => setScratches(e.target.value)}
          ></Input>
          <FormLabel>Original paint</FormLabel>
          <Input
            type={"text"}
            value={paint}
            onChange={(e) => setPaint(e.target.value)}
          ></Input>
          <FormLabel>Number of accidents</FormLabel>
          <Input
            type={"number"}
            value={accidents}
            onChange={(e) => setAccidents(e.target.value)}
          ></Input>
          <FormLabel>Number of previous buyers</FormLabel>
          <Input
            type={"number"}
            value={buyers}
            onChange={(e) => setBuyers(e.target.value)}
          ></Input>
          <FormLabel>Registration place</FormLabel>
          <Input
            type={"text"}
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          ></Input>
        </FormControl>
        <Button
          marginTop="5%"
          variant={"ghost"}
          _hover={{ backgroundColor: "black", color: "white" }}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddCar;
