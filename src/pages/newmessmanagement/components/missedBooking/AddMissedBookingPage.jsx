import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddMissedBookingTable from "./AddMissedBookingTable";
import MissedBookingForm from "./MissedBookingForm";

const AddMissedBookingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        p: 1,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: 2,
        zIndex: "-1",
      }}
    >
      <Box
        sx={{
          border: "1px solid #7E57C2",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ borderBottom: "1px solid #7E57C2" }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ borderRadius: "none" }}
          >
            <Button startIcon={<ArrowBackIosIcon />}>Back</Button>
          </IconButton>
        </Box>
        <Box sx={{width: { xs: "100%", sm: "100%"},}}>
          <MissedBookingForm />
        </Box>
        <Box
          sx={{
            borderRadius: "20px",
          }}
        >
          <AddMissedBookingTable />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AddMissedBookingPage);
