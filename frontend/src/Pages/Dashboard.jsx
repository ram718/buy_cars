import React, { useEffect } from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
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
  const toast = useToast();

  const getOemData = () => {
    axios
      .get(`https://agile-jeans-toad.cyclic.app/oem`)
      .then((res) => {
        setOem(res.data.length);
        setOemData(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const getAllData = () => {
    axios
      .get(`https://agile-jeans-toad.cyclic.app/market`)
      .then((res) => setAllData(res.data))
      .catch((e) => console.log(e));
  };

  const handleClick = (name) => {
    localStorage.setItem("car_name", JSON.stringify(name));
    navigate("/cardetails");
  };

  const handleDelete = (id) => {
    fetch(`https://agile-jeans-toad.cyclic.app/market/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        getAllData();
        toast({
          title: res.msg,
          status: res.msg === "Not authorised" ? "error" : "success",
          position: "top",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch((e) =>
        toast({
          title: "Not authorised",
          status: "error",
          position: "top",
          duration: 6000,
          isClosable: true,
        })
      );
  };

  const handleEdit = (id) => {
    const data = allData.filter((e) => e._id === id);
    setEditData(data);
    setUpdateID(id);
    if (toggle === false) {
      toast({
        title: "Fill out the form on top to update the car details",
        status: "warning",
        position: "top",
        duration: 6000,
        isClosable: true,
      });
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
    fetch(`https://agile-jeans-toad.cyclic.app/market/update/${updateID}`, {
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
        toast({
          title: res.msg,
          status: "info",
          position: "top",
          duration: 6000,
          isClosable: true,
        });
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
    toast({
      title: `Showing cars of price with equal or under ${price} lakhs`,
      status: "info",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleMileage = () => {
    const data = oemData.filter((e) => {
      return e.mileage >= mileage;
    });
    if (data.length > 0) {
      setAllData(data);
    }
    toast({
      title: `Showing cars of mileage with equal or above ${mileage} km/l`,
      status: "info",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleColor = () => {
    axios
      .get(`https://agile-jeans-toad.cyclic.app/oem?color=${color}`)
      .then((res) => {
        setAllData(res.data);
        toast({
          title: `Showing cars with ${color} color`,
          status: "info",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((e) => console.log(e));
  };

  const handleReset = () => {
    setColor("");
    setPrice("");
    setMileage("");
    getAllData();
    toast({
      title: `Filters have been removed`,
      status: "info",
      position: "top-right",
      duration: 3000,
      isClosable: true,
    });
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
        textAlign={{ base: "center", lg: "left" }}
      >
        Total OEM Spec cars - {oem}
      </Text>

      <Button
        variant={"ghost"}
        _hover={{ backgroundColor: "black", color: "white" }}
        onClick={() => navigate("/add")}
        margin={{ base: "auto", md: "-5% 0 0 70%", lg: "-5% 0 0 90%" }}
      >
        Add car
      </Button>

      <Box
        marginBottom={"3%"}
        display={{ md: "flex", lg: "flex" }}
        justifyContent={{ lg: "space-around" }}
        gap="20px"
      >
        <Box w={"30%"} margin={{ base: "auto" }}>
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
        <Box w={"30%"} margin={{ base: "auto" }}>
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
        <Box w={"30%"} margin={{ base: "auto" }}>
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
          w={{ base: "30%", md: "20%", lg: "10%" }}
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
        display={"grid"}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(2,1fr)",
        }}
        gap="20px"
      >
        {allData?.map((e) => {
          return (
            <Box
              textAlign={"left"}
              margin="auto"
              boxShadow={"5px 5px 5px gray"}
              p="2%"
              height={"100%"}
              key={e._id}
            >
              <SingleCar {...e} />
              <Box
                display="flex"
                justifyContent={"space-evenly"}
                marginTop="5%"
                w={"100%"}
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
