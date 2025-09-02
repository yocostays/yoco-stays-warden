import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";

const FeedBackTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Sample data
  const users = [
    {
      id: "7645092",
      name: "John",
      branch: "1222",
      year: "1",
      hostel: "15",
      roomNo: "12",
      Type: "Room",
    },
    {
      id: "7645092",
      name: "John",
      branch: "1222",
      year: "1",
      hostel: "15",
      roomNo: "12",
      Type: "Room",
    },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ marginBottom: "30px", marginTop: "30px" }}>
      <Box m={1}>
        <Box sx={{ border: "2px solid #674D9F", borderRadius: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { sm: "space-between", xs: "center" },
              bgcolor: "#ECE0FF",
              p: 2,
              borderRadius: "10px 10px 0px 0px",
              borderBottom: "2px solid #674D9F",
            }}
          >
            <Box sx={{ display: "inline-flex", alignItems: "center" }}>
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
              <Button
                size="small"
                onClick={handleFilterClick}
                sx={{
                  color: "#555",
                  textTransform: "none",
                  "&:hover": {
                    color: "#674D9F",
                  },
                  ml: 2,
                }}
              >
                <FilterAltIcon />
                Filter
              </Button>
              <Menu
                anchorEl={anchorElFilter}
                open={Boolean(anchorElFilter)}
                onClose={handleFilterClose}
                MenuListProps={{
                  "aria-labelledby": "filter-button",
                }}
              >
                <MenuItem onClick={handleFilterClose}>Option 1</MenuItem>
                <MenuItem onClick={handleFilterClose}>Option 2</MenuItem>
                <MenuItem onClick={handleFilterClose}>Option 3</MenuItem>
              </Menu>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{borderBottom: "2px solid #674D9F",}}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{ color: "#674D9F80" }}
                      checked={selectAll}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Ticket ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Hostel</TableCell>
                  <TableCell>Room No</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: "#674D9F80" }}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.branch}</TableCell>
                    <TableCell>{user.year}</TableCell>

                    <TableCell>{user.hostel}</TableCell>
                    <TableCell>{user.roomNo}</TableCell>
                    <TableCell>{user.Type}</TableCell>

                    <TableCell>
                      <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            to={"/feedbacks/details"}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <ListIcon sx={{ mr: 1 }} />
                              Details
                            </Box>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <ArrowDownwardOutlinedIcon sx={{ mr: 1 }} />
                          Download Receipt
                        </MenuItem>
                        <MenuItem>
                          <AccessTimeOutlinedIcon sx={{ mr: 1 }} />
                          Send Reminder
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedBackTable;
