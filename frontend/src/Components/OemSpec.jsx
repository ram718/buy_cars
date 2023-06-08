import React from "react";
import { Box, Text } from "@chakra-ui/react";

const OemSpec = ({ year, price, power, mileage, max_speed, colors }) => {
  return (
    <Box>
      <Text>
        Year: <span style={{ fontWeight: "bold" }}>{year}</span>
      </Text>
      <Text>
        Price: <span style={{ fontWeight: "bold" }}>{price} L</span>
      </Text>
      <Text>
        Power: <span style={{ fontWeight: "bold" }}>{power} BHP</span>
      </Text>
      <Text>
        Mileage: <span style={{ fontWeight: "bold" }}>{mileage} km/l</span>
      </Text>
      <Text>
        Top Speed: <span style={{ fontWeight: "bold" }}>{max_speed} km/hr</span>
      </Text>
      <Box>
        Colors:
        {colors.map((e) => {
          return (
            <Text textAlign={"center"}>
              <span style={{ fontWeight: "bold" }}>{e}</span>
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};

export default OemSpec;
