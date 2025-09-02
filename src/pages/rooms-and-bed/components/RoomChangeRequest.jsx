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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";

const initialRoomRequestsData = [
  {
    yocoId: "7645092",
    name: "John Doe",
    avatar: "https://via.placeholder.com/40",
    roomNo: "245",
    phoneNo: "8473628210",
    email: "admin@gmail.com",
    floor: "2",
    status: "Approve",
    statusColor: "success",
  },
  {
    yocoId: "8320931",
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/40",
    roomNo: "302",
    phoneNo: "9237482938",
    email: "jane.smith@example.com",
    floor: "3",
    status: "Pending",
    statusColor: "warning",
  },
  // Add more requests as needed
];

const RoomChangeRequest = () => {
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [roomRequests, setRoomRequests] = useState(initialRoomRequestsData);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
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

  return (
    <Box m={1}>
      {/* Table */}
        <Box 
        sx={{
          borderTop: "2px solid #A3A3A3",
           borderRight: "2px solid #A3A3A3",
           borderLeft: "2px solid #A3A3A3",
           borderRadius:'10px 10px 0px 0px',
           background: "#ECE0FF",
           p:2,
           mt: 3
          
        }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ background: "#ECE0FF" , borderRadius:'10px 0 0 0'}}
        >
          <Grid item xs={12} md={5}>
            <Typography variant="h6">Room Change Requests</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            container
            justifyContent="flex-end"
            spacing={1}
            sx={{ gap: 2 }}
          >
            {["Resolved", "Pending", "Escalated", "In Process"].map(
              (status, index) => (
                <Button
                  key={index}
                  variant={status === "Resolved" ? "contained" : "outlined"}
                  color={status === "Resolved" ? "primary" : "default"}
                  sx={{ borderRadius: 20, mx: 0.5 }}
                >
                  {status}
                </Button>
              )
            )}
          </Grid>
        </Grid>
        </Box>
      <TableContainer component={Paper}  sx={{ borderRadius: "0px 0px 10px 10px",border: "2px solid #A3A3A3", }}>
        <Table>
          <TableHead sx={{borderBottom:  "2px solid #A3A3A3"}}>
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
              <TableCell>Room no.</TableCell>
              <TableCell>Phone no.</TableCell>
              <TableCell>Floor</TableCell>
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
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar alt={request.name} src={request.avatar} sx={{ mr: 1 }} />
                    {request.name}
                  </Box>
                </TableCell>
                <TableCell>{request.roomNo}</TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    justifyContent="left"
                    flexDirection="column"
                    gap={1}
                  >
                    <Box display="flex" alignItems="center">
                      <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {request.phoneNo}
                    </Box>
                    <Box sx={{ mx: 1 }}>
                      <Box display="flex" alignItems="center">
                        <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {request.email}
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{request.floor}</TableCell>
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
                      to={"/rooms-and-bed/room-change-request"}
                      style={{ textDecoration: "none", color: "inherit", display:'flex', alignItems:'center' }}
                      >
                      <ListItemIcon>
                        <TaskAltIcon fontSize="small" color="success"/>
                      </ListItemIcon>
                      <ListItemText>Accept</ListItemText>
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

export default RoomChangeRequest;
