import { Box } from "@mui/material";
import React from "react";
import FeedBackTable from "./components/FeedBackTable";

const FeedBackIndex = () => {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}
    >
      <FeedBackTable />
    </Box>
  );
};

export default FeedBackIndex;
