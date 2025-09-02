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

const FeedBackDetails = () => {
  const userData = [
    { label: "Yoco id", value: "123456789" },
    { label: "Name", value: "Yoco" },
    { label: "Branch", value: "Surat" },
    { label: "Year", value: "2024" },
    { label: "Email", value: "admin@gmail.com" },
    { label: "Contact Number", value: "+91 1234567890" },

    { label: "Hostle", value: "" },
    { label: "Description", value: "" },
  ];

  const roomRequests = [
    {
      yocoId: "67890",
      name: "Pratap Mude",
      requestDate: "16th Feb, 2024",
      action: "Suggestion",
      remark: "Okay",
    },
    {
      yocoId: "67891",
      name: "Amit Mahajan",
      requestDate: "16th Feb, 2024",
      action: "Feedback",
      remark: "",
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

        {/* Room and Bed Request */}
        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Suggestion and feed back
        </Typography>
        <Box sx={{ maxWidth: "700px" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Approver Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomRequests.map((row) => (
                  <TableRow key={row.yocoId}>
                    <TableCell>{row.yocoId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.requestDate}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          textTransform: "none",
                          borderTop: 2,
                          borderRadius: "50px",
                          p: 1,
                          width: "120px",
                          boxShadow: 1,
                        }}
                      >
                        {" "}
                        {row.action}
                      </Button>
                    </TableCell>
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

export default FeedBackDetails;
