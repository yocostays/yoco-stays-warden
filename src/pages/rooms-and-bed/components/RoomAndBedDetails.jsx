import React from "react";
import {
  Card,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const RoomAndBedDetails = () => {
    
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
    { label: "Ticket No", value: "123456789" },
    { label: "Type", value: "" },
  ];

  const roomRequests = [
    {
      yocoId: "67890",
      name: "Pratap Mude",
      requestDate: "16th Feb, 2024",
      roomNo: "21",
      roomNoRequested: "16th Feb, 2024",
    },
    {
      yocoId: "67891",
      name: "Amit Mahajan",
      requestDate: "16th Feb, 2024",
      roomNo: "20",
      roomNoRequested: "16th Feb, 2024",
    },
    {
      yocoId: "67826",
      name: "Anshul Gurnani",
      requestDate: "16th Feb, 2024",
      roomNo: "21",
      roomNoRequested: "16th Feb, 2024",
    },
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
          <Button variant="outlined" sx={{ marginBottom: 2 , border:'2px solid #000', borderRadius:'20px'}}>
            Edit
          </Button>
        </Grid>

        {/* User Information */}
        <Grid container spacing={2}>
          {userData.map((item, index) => (
            <>
              <Grid item xs={4} key={`label-${index}`}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  <strong>{item.label}:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8} key={`value-${index}`}>
                <Typography variant="body1" sx={{ display: "flex" }}>:
                  <span style={{ marginLeft: "8px" }}>{item.value || "-"}</span>
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>

        {/* Room and Bed Request */}
        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Room and Bed Request
        </Typography>
       <Box sx={{maxWidth:'700px'}}>
       <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Yoco Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Room No</TableCell>
                <TableCell>Room No Requested</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomRequests.map((row) => (
                <TableRow key={row.yocoId}>
                  <TableCell>{row.yocoId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.requestDate}</TableCell>
                  <TableCell>{row.roomNo}</TableCell>
                  <TableCell>{row.roomNoRequested}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       </Box>
      </Card>
    </Box>
  );
};

export default RoomAndBedDetails;
