import { Box } from "@mui/material";
import { Chart1 } from "./components/Main/Chart1";
import MessTable2 from "../mess-details/components/MessManagment/Table2";
import MessCards from "./components/Main/MessCards";

export default function MessIndex() {
  return (
    <>
      <Box
        sx={{
          width: { md: `calc(100% - 270px)` },
          ml: { md: "270px", sm: 0 },
          marginBottom: "30px",
          p: 1,
        }}
      >
        <MessCards />
        <Chart1 />
        <MessTable2 />
      </Box>
    </>
  );
}
