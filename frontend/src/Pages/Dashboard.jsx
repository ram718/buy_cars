import React, { useEffect } from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import SingleCar from "../Components/SingleCar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [editData, setEditData] = useState([]);
  const [km, setKm] = useState("");
  const [scratches, setScratches] = useState("");
  const [paint, setPaint] = useState("");
  const [accidents, setAccidents] = useState("");
  const [buyers, setBuyers] = useState("");
  const [place, setPlace] = useState("");
  const [updateID, setUpdateID] = useState("");

  const getAllData = () => {
    axios
      .get(`http://localhost:4500/market`)
      .then((res) => setAllData(res.data))
      .catch((e) => console.log(e));
  };

  const handleClick = (name) => {
    localStorage.setItem("car_name", JSON.stringify(name));
    navigate("/cardetails");
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4500/market/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getAllData();
        alert(res.msg);
      })
      .catch((e) => alert("Invalid Request / Not Authorised to delete"));
  };

  const handleEdit = (id) => {
    const data = allData.filter((e) => e._id === id);
    setEditData(data);
    setUpdateID(id);
  };

  const handleUpdate = () => {
    const payload = {
      kms_on_odometer: km,
      major_scratches: scratches,
      original_paint: paint,
      number_of_accidents: accidents,
      number_of_previous_buyers: buyers,
      registration_place: place,
    };
    fetch(`http://localhost:4500/market/update/${updateID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        getAllData();
        setToggle(!toggle);
        setAccidents("");
        setBuyers("");
        setKm("");
        setPaint("");
        setPlace("");
        setScratches("");
        alert(res.msg);
      })
      .catch((e) => alert("Invalid Request"));
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Box p={"5%"}>
      <Text fontSize={"4xl"} fontWeight="bold" marginBottom="4%">
        Dashboard
      </Text>
      {toggle ? (
        <Box marginBottom={"5%"}>
          <Text my={"2%"} fontWeight="bold" fontSize={"xl"}>
            Edit Form
          </Text>
          <Box w={"35%"} margin="auto">
            <FormControl>
              <Text textAlign={"center"} fontWeight="semibold" fontSize={"lg"}>
                Title : {editData[0].name}
              </Text>
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
            <Button marginTop={"5%"} onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      ) : null}
      <Box
        style={{
          display: "Grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
        }}
      >
        {allData?.map((e) => {
          return (
            <Box
              textAlign={"left"}
              margin="auto"
              border={"1px solid black"}
              p="2%"
              height={"100%"}
            >
              <SingleCar key={e._id} {...e} />
              <Box
                display="flex"
                justifyContent={"space-evenly"}
                marginTop="5%"
              >
                <Button
                  variant={"ghost"}
                  onClick={() => handleClick(e.name)}
                  _hover={{ backgroundColor: "black", color: "white" }}
                >
                  View Details
                </Button>
                <Button
                  variant={"ghost"}
                  _hover={{ backgroundColor: "yellow", color: "black" }}
                  onClick={() => {
                    setToggle(!toggle);
                    handleEdit(e._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant={"ghost"}
                  _hover={{ backgroundColor: "red", color: "white" }}
                  onClick={() => handleDelete(e._id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
