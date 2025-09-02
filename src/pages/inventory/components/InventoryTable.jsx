import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { FilterList } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const initialRoomRequestsData = [
  {
    yocoId: "7645092",
    name: "John Doe",
    type: "245",
    qty: "100",
    item: "Bed",
    orderDate: "21/08/2024",
    status: "Approve",
    statusColor: "success",
  },
  {
    yocoId: "8320931",
    name: "Jane Smith",
    type: "302",
    qty: "100",
    item: "Table",
    orderDate: "18/07/2024",
    status: "Pending",
    statusColor: "warning",
  },
  {
    yocoId: "9645092",
    name: "John Doe",
    type: "245",
    qty: "100",
    item: "Bed",
    orderDate: "21/08/2024",
    status: "Approve",
    statusColor: "success",
  },
  {
    yocoId: "3520931",
    name: "Jane Smith",
    type: "302",
    qty: "100",
    item: "Table",
    orderDate: "18/07/2024",
    status: "Pending",
    statusColor: "warning",
  },
  {
    yocoId: "1235092",
    name: "John Doe",
    type: "245",
    qty: "100",
    item: "Bed",
    orderDate: "21/08/2024",
    status: "Approve",
    statusColor: "success",
  },
  {
    yocoId: "7650931",
    name: "Jane Smith",
    type: "302",
    qty: "100",
    item: "Table",
    orderDate: "18/07/2024",
    status: "Pending",
    statusColor: "warning",
  },
  {
    yocoId: "8765092",
    name: "John Doe",
    type: "245",
    qty: "100",
    item: "Bed",
    orderDate: "21/08/2024",
    status: "Approve",
    statusColor: "success",
  },
  {
    yocoId: "4560931",
    name: "Jane Smith",
    type: "302",
    qty: "100",
    item: "Table",
    orderDate: "18/07/2024",
    status: "Pending",
    statusColor: "warning",
  },
];

const InventoryTable = () => {
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [roomRequests, setRoomRequests] = useState(initialRoomRequestsData);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [floorSearch, setFloorSearch] = useState("");
  const [selectedFloors, setSelectedFloors] = useState([]);
  
  // Sample filtered data
  const filteredFloors = ["1", "2", "3"]; // You can make this dynamic based on the data

  // Open/close filter menu
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setFilterMenuAnchorEl(null);
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleFloorSearchChange = (event) => {
    setFloorSearch(event.target.value);
    // You can add filter logic here to filter based on floor search
  };

  const handleSelect = (yocoId) => {
    setSelected((prevSelected) =>
      prevSelected.includes(yocoId)
        ? prevSelected.filter((id) => id !== yocoId)
        : [...prevSelected, yocoId]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === roomRequests.length) {
      setSelected([]); // Unselect all
    } else {
      setSelected(roomRequests.map((request) => request.yocoId)); // Select all
    }
  };

  const isSelected = (yocoId) => selected.includes(yocoId);

  const handleStatusChange = (yocoId, newStatus) => {
    setRoomRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.yocoId === yocoId
          ? {
              ...request,
              status: newStatus,
              statusColor: newStatus === "Approve" ? "success" : "error",
            }
          : request
      )
    );
    handleMenuClose(); // Close the menu after selection
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  

  return (
    <Box>
      {/* Table */}
      <Box 
        sx={{
          borderTop: "2px solid #674D9F",
          borderRight: "2px solid #674D9F",
          borderLeft: "2px solid #674D9F",
          borderRadius:'10px 10px 0px 0px',
          background: "#ECE0FF",
          p: 2,
        }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ background: "#ECE0FF" , borderRadius:'10px 0 0 0'}}
        >
          <Grid item xs={12} md={2}>
            <Box sx={{display:'flex',}}>
              <Typography variant="h6">Inventory</Typography>
              <IconButton onClick={handleFilterMenuOpen} sx={{mr:2}}>
                <FilterList />
              </IconButton>

              {/* Filter Dropdown Menu */}
              <Menu
                anchorEl={filterMenuAnchorEl}
                open={Boolean(filterMenuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    maxHeight: "400px",
                    overflowY: "auto",
                    "::-webkit-scrollbar": {
                      display: "none", // Hides the scrollbar in WebKit browsers
                    },
                    msOverflowStyle: "none", // Hides the scrollbar in Internet Explorer and Edge
                    scrollbarWidth: "none", // Hides the scrollbar in Firefox
                  },
                }}
              >
                {/* Floor Accordion */}
                <MenuItem sx={{ width: "300px" }}>
                  <Accordion
                    expanded={isAccordionOpen}
                    onChange={handleAccordionToggle}
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      width: "100%",
                    }} 
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="floor-content"
                      id="floor-header"
                    >
                      <Box sx={{ fontWeight: "bold" }}>Floor</Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        label="Search Floor"
                        variant="outlined"
                        size="small"
                        value={floorSearch}
                        onChange={handleFloorSearchChange}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <List>
                        {filteredFloors.map((floor) => (
                          <ListItem key={floor}>
                            <Checkbox
                              checked={selectedFloors.includes(floor)}
                              onChange={() => setSelectedFloors(prev => prev.includes(floor) ? prev.filter(f => f !== floor) : [...prev, floor])}
                            />
                            <ListItemText primary={`Floor ${floor}`} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>
                <MenuItem sx={{ width: "300px" }}>
                  {" "}
                  {/* Same width here */}
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      width: "100%",
                    }} // Uniform width for all
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="building-content"
                      id="building-header"
                    >
                      <Box sx={{ fontWeight: "bold" }}>Building</Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {["Building A", "Building B", "Building C"].map(
                          (building) => (
                            <ListItem key={building}>
                              <Checkbox />
                              <ListItemText primary={building} />
                            </ListItem>
                          )
                        )}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>
                <MenuItem sx={{ width: "300px" }}>
                  {" "}
                  {/* Same width here */}
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      width: "100%",
                    }} // Uniform width for all
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="hostel-content"
                      id="hostel-header"
                    >
                      <Box sx={{ fontWeight: "bold" }}>Hostel</Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {["Hostel X", "Hostel Y", "Hostel Z"].map((hostel) => (
                          <ListItem key={hostel}>
                            <Checkbox />
                            <ListItemText primary={hostel} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
          {/* Status buttons */}
          <Grid
            item
            xs={12}
            md={10}
            container
            justifyContent="flex-end"
            spacing={1}
            sx={{ gap: 1 }}
          >
            {["Resolved", "Pending", "Escalated", "In Process"].map(
              (status, index) => (
                <Button
                  key={index}
                  variant={status === "Resolved" ? "contained" : "outlined"}
                  color={status === "Resolved" ? "primary" : "default"}
                  sx={{ borderRadius: 20  , fontSize:'10px' }}
                >
                  {status}
                </Button>
              )
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "0px 0px 10px 10px",border: "2px solid #674D9F", }}>
        <Table>
          <TableHead sx={{ borderBottom: "2px solid #674D9F",}}>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < roomRequests.length
                  }
                  checked={selected.length === roomRequests.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>YOCO ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={isSelected(request.yocoId)}
                    onChange={() => handleSelect(request.yocoId)}
                  />
                </TableCell>
                <TableCell>{request.yocoId}</TableCell>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.qty}</TableCell>
                <TableCell>{request.item}</TableCell>
                <TableCell>{request.orderDate}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={request.statusColor}
                    size="small"
                    sx={{ borderRadius: 20 }}
                  >
                    {request.status}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, request.yocoId)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuId === request.yocoId}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => handleStatusChange(request.yocoId, "Approve")}
                    >
                      <Link 
                      to={"/inventory/details"}
                      style={{ textDecoration: "none", color: "inherit", display:'flex', alignItems:'center' }}
                      >
                      <ListItemIcon>
                        <FormatListBulletedIcon fontSize="small"/>
                      </ListItemIcon>
                      <ListItemText>Details</ListItemText>
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleStatusChange(request.yocoId, "Rejected")}
                    >
                      <ListItemIcon>
                        <CancelIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText sx={{color:'red'}}>Reject</ListItemText>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InventoryTable;
