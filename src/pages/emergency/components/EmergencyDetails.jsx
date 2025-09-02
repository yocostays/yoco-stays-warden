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
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const EmergencyDetails = () => {
  const userData = [
    { label: "Yoco id", value: "123456789" },
    { label: "Name", value: "Yoco" },
    { label: "Branch", value: "Surat" },
    { label: "Year", value: "2024" },
    { label: "Hostel", value: "Yoco Hostel" },
    { label: "Room No", value: "25" },
    { label: "Emergency Type", value: "" },
    { label: "Report To", value: "" },
    { label: "Description", value: "" },
  ];

  const roomRequests = [
    {
      yocoId: "67890",
      name: "Pratap Mude",
      requestDate: "16th Feb, 2024",
      action: "Approve",
      remark: "Okay",
    },
    {
      yocoId: "67891",
      name: "Amit Mahajan",
      requestDate: "16th Feb, 2024",
      action: "Pending",
      remark: "",
    },
    {
      yocoId: "67826",
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
        Emergency history
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
                    <TableCell>{row.remark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={4}>
                <Typography>Status</Typography>
                <Typography mt={3}>Action</Typography>
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
                <Typography sx={{display:'flex', gap:2, mt: 2}}>: 
                    <Box sx={{height:30, width:30, background:'#D6E4D4', border:'2px solid #AECAAA', borderRadius:'5px'}}><DoneIcon color="success"/></Box>
                    <Box sx={{height:30, width:30, background:'#EEDAD4', border:'2px solid #DDB6AA', borderRadius:'5px'}}><ClearIcon color="error"/></Box>
                </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
};

export default EmergencyDetails;
