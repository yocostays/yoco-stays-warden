import { Box } from "@mui/material";
import FeeTable from "./components/FeeTable";
import Chart1 from "./components/Chart1";

export const FeeIndex = () => {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 2,
      }}
    >
      <Chart1 />
      <FeeTable />
    </Box>
  );
};
