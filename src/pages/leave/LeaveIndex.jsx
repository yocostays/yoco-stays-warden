import { useState } from "react";
import { Box } from "@mui/material";
import LeaveCharts from "./components/LeaveCharts";
import LeaveTable from "./components/LeaveTable";

const LeaveIndex = () => {
  const [type, setType] = useState(null); // State to manage type

  const onTypeChange = (newType) => {
    setType(newType?.type);
  };

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
      }}
    >
      <LeaveCharts onTypeChange={onTypeChange} />
      <LeaveTable type={type} onTypeChange={onTypeChange} />
    </Box>
  );
};

export default LeaveIndex;
