import React from "react";
import { TableContainer, Paper, Table, Box } from "@mui/material";

const CustomTableContainer = ({ children }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        background: "linear-gradient(180deg, #674D9F, #FDFAFF)",
        padding: "1.5px 2px 0px 2px ",
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          background: "white",
        //   borderRadius: "0px 0px 10px 10px",
          overflow: "auto",
        }}
      >
        <Table>{children}</Table>
      </Box>
    </TableContainer>
  );
};

export default CustomTableContainer;
