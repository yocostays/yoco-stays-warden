import React from "react";
import {
  Card,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const RoomChangeRequestDetails = () => {
  const userData = [
    { label: "Yoco id", value: "123456789" },
    { label: "Name", value: "Yoco" },
    { label: "Email", value: "admin@gmail.com" },
    { label: "Contact Number", value: "+91 1234567890" },
    { label: "Year", value: "2024" },
    { label: "Branch", value: "Surat" },
    { label: "Hostel", value: "Yoco Hostel" },
    { label: "Floor Number", value: "1st" },
    { label: "Room No", value: "25" },
    { label: "Change Request To", value: "-" },
    { label: "Description", value: "" },
  ];

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 1,
      }}
    >
      <Card sx={{ padding: 4, borderRadius: 2 }}>
        {/* Edit Button */}
        <Grid container justifyContent="flex-end">
          <Button variant="outlined" sx={{ marginBottom: 2, border: "2px solid #000", borderRadius: "20px" }}>
            Edit
          </Button>
        </Grid>

        {/* User Information */}
        <Grid container spacing={2}>
          {userData.map((item, index) => (
            <>
              <Grid item xs={4} key={`label-${index}`}>
                <Typography variant="body1" sx={{ display: "flex", fontSize:{sm:'14px', xs:'12px'} }}>
                  <strong>{item.label}</strong>
                </Typography>
              </Grid>
              <Grid item xs={8} key={`value-${index}`}>
                {item.label === "Description" ? (
                  <TextField fullWidth variant="outlined" />
                ) : (
                  <Typography variant="body1" sx={{ display: "flex",fontSize:{sm:'14px', xs:'12px'} }}>
                    :
                    <span style={{ marginLeft: "8px" }}>{item.value || "-"}</span>
                  </Typography>
                )}
              </Grid>
            </>
          ))}
        </Grid>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link
        to={"/rooms-and-bed"}
        style={{ textDecoration: "none", color: "inherit", display:'flex', alignItems:'center', gap:10 }}
        >
        <Button variant="contained" sx={{ borderRadius: "20px" }}>Approval</Button>
        <Button variant="contained" sx={{ borderRadius: "20px" }}>Decline</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default RoomChangeRequestDetails;
