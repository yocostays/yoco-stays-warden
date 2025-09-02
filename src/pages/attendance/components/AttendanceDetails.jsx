import { useState } from 'react';
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
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const AttendanceDetails = () => {

  const [dateRange, setDateRange] = useState([null, null]); 

  const handleRefresh = () => {
    setDateRange([null, null]); 
  };
  const userData = [
    { label: "Yoco id", value: "123456789" },
    { label: "Name", value: "Yoco" },
    { label: "Email", value: "admin@gmail.com" },
    { label: "Hostel", value: "Yoco Hostel" },
    { label: "Room No", value: "32" },
    { label: "Branch", value: "Surat" },
    { label: "Year", value: "2024" },
    { label: "Attendance Status", value: "Present" },
  ];

  const roomRequests = [
    {
      date: "16th Feb, 2024",
      day: "Monday",
      checkIn: "12:00 PM",
      checkOut: "12:00 AM",
    },
    {
      date: "16th Feb, 2024",
      day: "Monday",
      checkIn: "12:00 PM",
      checkOut: "12:00 AM",
    },
    {
      date: "16th Feb, 2024",
      day: "Monday",
      checkIn: "12:00 PM",
      checkOut: "12:00 AM",
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
        <Grid container spacing={2}>
          {userData.map((item, index) => (
            <>
              <Grid item xs={6} sm={4} key={`label-${index}`}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  <strong>{item.label}:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={8} key={`value-${index}`}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  :
                  <span style={{ marginLeft: "8px" }}>{item.value || "-"}</span>
                </Typography>
              </Grid>
            </>
          ))}
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ display: "flex" }}>
              <strong>For The Period</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateRangePicker"]}>
                    <DateRangePicker
                      value={dateRange}
                      onChange={(newValue) => setDateRange(newValue)} 
                      localeText={{ start: "Check-in", end: "Check-out" }}
                      slotProps={{
                        textField: {
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px", 
                            },
                          },
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
              </Grid>
              <Grid item xs={12} sm={6} mt={1}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "30px", height:'50px',px:4 }}
                  onClick={handleRefresh} 
                >
                  Refresh
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Attendance History
        </Typography>
        <Box sx={{ width: "100%" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Day</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomRequests.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.day}</TableCell>
                    <TableCell>{row.checkIn}</TableCell>
                    <TableCell>{row.checkOut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center', m:2}}>
          <Button variant='outlined' sx={{borderRadius:'30px'}}>Download</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default AttendanceDetails;
