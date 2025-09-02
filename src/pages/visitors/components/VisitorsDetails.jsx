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
  TextField,
} from "@mui/material";

const VisitorsDetails = () => {
  const userData = [
    { label: "Name", value: "Manish" },
    { label: "Contact Number", value: "+91 1234567890" },
    { label: "ID Proof", value: "Voter ID" },
    { label: "Description", value: "" },
    { label: "Gender", value: "Male" },
    { label: "Address", value: "Yoco Hostel" },
    { label: "File", value: "25" },
    { label: "Entry At", value: "" },
    { label: "Exit At ", value: "" },
    { label: "Room Number", value: "" },
    { label: "Purpose of visit", value: "" },
    { label: "Mobile Number", value: "" },
    { label: "Job Description", value: "" },
    { label: "Reason", value: "" },
  ];

  const roomRequests = [
    {
      approveId: "67890",
      name: "Pratap Mude",
      requestDate: "16th Feb, 2024",
      action: "Approve",
      remark: "Okay",
    },
    {
      approveId: "67891",
      name: "Amit Mahajan",
      requestDate: "16th Feb, 2024",
      action: "Pending",
      remark: "",
    },
    {
      approveId: "67826",
      name: "Anshul Gurnani",
      requestDate: "16th Feb, 2024",
      action: "Rejected",
      remark: "No need to come home",
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
          <Button
            variant="outlined"
            sx={{
              marginBottom: 2,
              border: "2px solid #000",
              borderRadius: "20px",
            }}
          >
            Edit
          </Button>
        </Grid>

        {/* User Information */}
        <Grid container spacing={2}>
          {userData.map((item, index) => (
            <>
              <Grid item xs={4} key={`label-${index}`}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  <strong>{item.label}</strong>
                </Typography>
              </Grid>
              <Grid item xs={8} key={`value-${index}`}>
              {item.label === "Reason" ? (
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


        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
        Visitor History
        </Typography>
        <Box >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Approve Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomRequests.map((row) => (
                  <TableRow key={row.approveId}>
                    <TableCell>{row.approveId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.requestDate}</TableCell>
                    <TableCell>
                      <Typography>
                        {row.action}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.remark}</TableCell>
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

export default VisitorsDetails;
