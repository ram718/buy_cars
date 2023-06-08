import React, { useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

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
      {allData?.map((e) => {
        return (
          <Box>
            <Text>{e.name}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default Dashboard;
