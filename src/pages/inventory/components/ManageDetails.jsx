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

const ManageDetails = () => {
  const userData = [
    { label: "Item", value: "123456789" },
    { label: "Image", value: "Yoco" },
    { label: "Receiper", value: "admin@gmail.com" },
    { label: "Threshold", value: "+91 1234567890" },
    { label: "Storage Location", value: "2024" },
    { label: "Current Quantity", value: "Surat" },
    { label: "Item Code", value: "2nd" },
  ];

  const roomRequests = [
    {
      yocoId: "67890",
      name: "Pratap Mude",
      requestDate: "16th Feb, 2024",
      action: "Approve",
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
                  <strong>{item.label}:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8} key={`value-${index}`}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  :
                  <span style={{ marginLeft: "8px" }}>{item.value || "-"}</span>
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Inventory Order
        </Typography>
        <Box sx={{ maxWidth: "700px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Yoco Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomRequests.map((row) => (
                  <TableRow key={row.yocoId}>
                    <TableCell>{row.yocoId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.requestDate}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            row.action === "Approve"
                              ? "green"
                              : row.action === "Pending"
                              ? "orange"
                              : row.action === "Rejected"
                              ? "red"
                              : "black", // default color
                        }}
                      >
                        {row.action}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={4}>
                <Typography>Status</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography>: <Button
                    variant="outlined"
                    size="small"
                    color="warning"
                    sx={{
                      borderRadius: 20,
                      border: "2px solid #9CB501",
                      color:"#9CB501",
                      backgroundColor:"#FDFFB2",
                      ml:2
                    }}
                  >
                    Pending
                  </Button></Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default ManageDetails;
