import { Box } from "@mui/material";
import React from "react";
import PollCharts from "./Components/PollCharts";
import PollTable from "./Components/PollTable";

const PollIndex = () => {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}
    >
      <PollCharts />
      <PollTable/>
    </Box>
  );
};

export default PollIndex;
