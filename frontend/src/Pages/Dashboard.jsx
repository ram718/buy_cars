import React, { useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import SingleCar from "../Components/SingleCar";

const Dashboard = () => {
  const [allData, setAllData] = useState([]);

  const getAllData = () => {
    axios
      .get(`http://localhost:4500/market`)
      .then((res) => setAllData(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Box>
      <Text fontSize={"4xl"} fontWeight="bold">
        Dashboard
      </Text>
      <Box
        style={{
          display: "Grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
        }}
      >
        {allData?.map((e) => {
          return <SingleCar key={e._id} {...e} />;
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
