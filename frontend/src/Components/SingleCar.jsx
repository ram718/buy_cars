import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
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
  const [oemData, setOemData] = useState([]);

  const getOemData = () => {
    axios
      .get(`http://localhost:4500/oem?name=${name}`)
      .then((res) => setOemData(res.data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getOemData();
  }, []);

  return (
    <Box>
      <Text fontSize={"2xl"} fontWeight="semibold" textAlign={"center"}>
        {name}
      </Text>
      <Box display={"flex"} gap="20px">
        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight="semibold">
            Dealer Specs
          </Text>
          <Text>
            Kms on odometer:{" "}
            <span style={{ fontWeight: "bold" }}>{kms_on_odometer} Kms</span>
          </Text>
          <Text>
            Major scratches:{" "}
            <span style={{ fontWeight: "bold" }}>{major_scratches}</span>
          </Text>
          <Text>
            Original paint:{" "}
            <span style={{ fontWeight: "bold" }}>{original_paint}</span>
          </Text>
          <Text>
            Number of accidents:{" "}
            <span style={{ fontWeight: "bold" }}>{number_of_accidents}</span>
          </Text>
          <Text>
            Number of previous buyers:{" "}
            <span style={{ fontWeight: "bold" }}>
              {number_of_previous_buyers}
            </span>
          </Text>
          <Text>
            Registration place:{" "}
            <span style={{ fontWeight: "bold" }}>{registration_place}</span>
          </Text>
        </Box>

        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight="semibold">
            OEM Specs
          </Text>
          {oemData?.map((e) => {
            return <OemSpec key={e.year} {...e} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleCar;
