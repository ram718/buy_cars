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
  const [oem, setOem] = useState("");
  const [oemData, setOemData] = useState([]);
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [sortData, setSortData] = useState([]);

  const getOemData = () => {
    axios
      .get(`http://localhost:4500/oem`)
      .then((res) => {
        setOem(res.data.length);
        setOemData(res.data.data);
      })
      .catch((e) => console.log(e));
  };

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
    if (toggle === false) {
      alert("Fill out the form on top to update the car details");
    }
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

  const handlePrice = () => {
    const data = oemData.filter((e) => {
      return e.price <= price;
    });
    if (data.length > 0) {
      setAllData(data);
    }
  };

  const handleMileage = () => {
    const data = oemData.filter((e) => {
      return e.mileage >= mileage;
    });
    if (data.length > 0) {
      setAllData(data);
    }
  };

  const handleColor = () => {
    axios
      .get(`http://localhost:4500/oem?color=${color}`)
      .then((res) => setAllData(res.data))
      .catch((e) => console.log(e));
  };

  const handleReset = () => {
    setColor("");
    setPrice("");
    setMileage("");
    getAllData();
  };

  useEffect(() => {
    getAllData();
    getOemData();
  }, []);

  return (
    <Box p={"5%"}>
      <Text fontSize={"4xl"} fontWeight="bold">
        Dashboard
      </Text>
      <Text
        fontSize={"2xl"}
        fontWeight="semibold"
        marginBottom="2%"
        textAlign={"left"}
      >
        Total OEM spec cars - {oem}
      </Text>

      <Button
        variant={"ghost"}
        _hover={{ backgroundColor: "black", color: "white" }}
        onClick={() => navigate("/add")}
        margin={"-5% 0 0 90%"}
      >
        Add car
      </Button>

      <Box marginBottom={"3%"} display="flex" justifyContent={"space-around"}>
        <Box w={"30%"}>
          <Input
            type={"number"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="search by price. Enter in lakhs"
          ></Input>
          <Button
            variant={"ghost"}
            _hover={{ backgroundColor: "black", color: "white" }}
            onClick={handlePrice}
          >
            Search Price
          </Button>
        </Box>
        <Box w={"30%"}>
          <Input
            type={"number"}
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="search by mileage. Enter in km/l"
          ></Input>
          <Button
            variant={"ghost"}
            _hover={{ backgroundColor: "black", color: "white" }}
            onClick={handleMileage}
          >
            Search Mileage
          </Button>
        </Box>
        <Box w={"30%"}>
          <Input
            type={"text"}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="search by color"
          ></Input>
          <Button
            variant={"ghost"}
            _hover={{ backgroundColor: "black", color: "white" }}
            onClick={handleColor}
          >
            Search by Color
          </Button>
        </Box>
        <Button
          variant={"ghost"}
          _hover={{ backgroundColor: "black", color: "white" }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>

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
              boxShadow={"5px 5px 5px gray"}
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
