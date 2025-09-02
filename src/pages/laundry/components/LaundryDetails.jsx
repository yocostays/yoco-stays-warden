import React, { useState } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";

const LaundryDetails = () => {
  const userData = [
    { label: "Yoco id", value: "123456789" },
    { label: "Name", value: "Yoco" },
    { label: "Branch", value: "Surat" },
    { label: "Year", value: "2024" },
    { label: "Hostel", value: "admin@gmail.com" },
    { label: "Room No", value: "25" },
    { label: "Date of Submission", value: "+91 1234567890" },
    { label: "Date of Delivery", value: "2nd" },
    { label: "Ticket Number", value: "" },
  ];

  const initialLaundryDetails = [
    {
      yocoId: "67890",
      date: "Pratap Mude",
      dateOfDelivery: "16th Feb, 2024",
      amount: "Rs 1000",
      roomNo: "10",
      shirt: "",
      jeans: "",
      bedsheet: "",
      pillowCover: "",
      towel: "",
      other: "",
      assignTo: "L1",
    },
    {
      yocoId: "67891",
      date: "Amit Mahajan",
      dateOfDelivery: "16th Feb, 2024",
      amount: "Rs 1000",
      roomNo: "10",
      shirt: "",
      jeans: "",
      bedsheet: "",
      pillowCover: "",
      towel: "",
      other: "",
      assignTo: "L1",
    },
    {
      yocoId: "67826",
      date: "Anshul Gurnani",
      dateOfDelivery: "16th Feb, 2024",
      amount: "Rs 1000",
      roomNo: "10",
      shirt: "",
      jeans: "",
      bedsheet: "",
      pillowCover: "",
      towel: "",
      other: "",
      assignTo: "L1",
    },
  ];

  const [laundryDetails, setLaundryDetails] = useState(initialLaundryDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const handleClick = (event, row) => {
    if (anchorEl && selectedRow === row) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleMenuItemClick = (newStatus) => {
    setLaundryDetails((prevRequests) =>
      prevRequests.map((request) =>
        request === selectedRow ? { ...request, assignTo: newStatus } : request
      )
    );
    handleClose();
  };

  // Handle filter button interactions
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterMenuItemClick = (filter) => {
    setSelectedFilter(filter);
    handleFilterClose();
  };

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
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  <strong>{item.label}:</strong>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" sx={{ display: "flex" }}>
                  :
                  <span style={{ marginLeft: "8px" }}>{item.value || "-"}</span>
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

       <Box sx={{display:'flex', flexWrap:'wrap', alignItems:'baseline', justifyContent:'space-between'}}>
       <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Laundry History
        </Typography>
        <Box sx={{display:'flex', gap: 1, marginBottom:2}}>
            <Button
              variant="outlined"
              onClick={handleFilterClick}
              endIcon={<ArrowDropDown />}
              sx={{ borderRadius: "20px" }}
            >
              {selectedFilter}
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={() => handleFilterMenuItemClick("Filter 1")}>
                Filter 1
              </MenuItem>
              <MenuItem onClick={() => handleFilterMenuItemClick("Filter 2")}>
                Filter 2
              </MenuItem>
              <MenuItem onClick={() => handleFilterMenuItemClick("Filter 3")}>
                Filter 3
              </MenuItem>
            </Menu>
            <Button variant="outlined" sx={{borderRadius:'20px'}}>Send Invoice</Button>
        </Box>
       </Box>

        <Box>
          <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Yoco Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Date of Delivery</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Room No</TableCell>
                  <TableCell>Shirt/T-shirt</TableCell>
                  <TableCell>Trouser/Jeans</TableCell>
                  <TableCell>Bedsheers</TableCell>
                  <TableCell>Pillow Cover</TableCell>
                  <TableCell>Towel</TableCell>
                  <TableCell>Other</TableCell>
                  <TableCell>Assign To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laundryDetails.map((row) => (
                  <TableRow key={row.yocoId}>
                    <TableCell>{row.yocoId}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.dateOfDelivery}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.roomNo}</TableCell>
                    <TableCell>{row.shirt}</TableCell>
                    <TableCell>{row.jeans}</TableCell>
                    <TableCell>{row.bedsheet}</TableCell>
                    <TableCell>{row.pillowCover}</TableCell>
                    <TableCell>{row.towel}</TableCell>
                    <TableCell>{row.other}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={(event) => handleClick(event, row)}
                        endIcon={
                          selectedRow === row && Boolean(anchorEl) ? (
                            <ArrowDropUp />
                          ) : (
                            <ArrowDropDown />
                          )
                        }
                        sx={{ borderRadius: "20px" }}
                      >
                        {row.assignTo}
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={selectedRow === row && Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleMenuItemClick("L1")}>
                          L1
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("L2")}>
                          L2
                        </MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick("L3")}>
                          L3
                        </MenuItem>
                      </Menu>
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

export default LaundryDetails;
