import { Box, Typography } from "@mui/material";
import React from "react";
import VehicleChart from "./components/VehicleChart";
import VehicleTable from "./components/VehicleTable";

const VehicleIndex = () => {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}
    >
      <VehicleChart/>
      <VehicleTable/>
    </Box>
  );
};

export default VehicleIndex;
