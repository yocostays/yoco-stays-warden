import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import ListIcon from '@mui/icons-material/List';
import { Link } from "react-router-dom";

const rows = [
  {
    id: 1,
    yocoId: 7645092,
    name: "John Doe",
    email: "abc@gmail.com",
    roomNo: 124,
    checkIn: "10:30am",
    checkOut: "10:30am",
    phone: "8473628210",
    status: "Present",
    statusColor: "success",
  },
  {
    id: 2,
    yocoId: 7645092,
    name: "John Doe",
    email: "abc@gmail.com",
    roomNo: 124,
    checkIn: "10:30am",
    checkOut: "10:30am",
    phone: "8473628210",
    status: "Outside",
    statusColor: "error",
  },
  {
    id: 3,
    yocoId: 7645092,
    name: "John Doe",
    email: "abc@gmail.com",
    roomNo: 124,
    checkIn: "10:30am",
    checkOut: "10:30am",
    phone: "8473628210",
    status: "Present",
    statusColor: "success",
  },
  {
    id: 4,
    yocoId: 7645092,
    name: "John Doe",
    email: "abc@gmail.com",
    roomNo: 124,
    checkIn: "10:30am",
    checkOut: "10:30am",
    phone: "8473628210",
    status: "Outside",
    statusColor: "error",
  },
  {
    id: 5,
    yocoId: 7645092,
    name: "John Doe",
    email: "abc@gmail.com",
    roomNo: 124,
    checkIn: "10:30am",
    checkOut: "10:30am",
    phone: "8473628210",
    status: "Present",
    statusColor: "success",
  },
  {
    id: 6,
    yocoId: 7645092,
    name: "John Doe",
    email: "abc@gmail.com",
    roomNo: 124,
    checkIn: "10:30am",
    checkOut: "10:30am",
    phone: "8473628210",
    status: "Outside",
    statusColor: "error",
  },
];

function AttendanceTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  // State for the filter menu
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  // State for the MoreVertIcon menu
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [moreMenuId, setMoreMenuId] = useState(null);

  // State for the status button menu
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState(null);
  const [statusMenuId, setStatusMenuId] = useState(null);

  // Handlers for MoreVertIcon menu
  const handleMoreMenuOpen = (event, rowId) => {
    setMoreMenuAnchorEl(event.currentTarget);
    setMoreMenuId(rowId);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
    setMoreMenuId(null);
  };

  // Handlers for Filter icon menu
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };

  // Handlers for Status button menu
  const handleStatusMenuOpen = (event, row) => {
    if (row.status !== "Present") {
      setStatusMenuAnchorEl(event.currentTarget);
      setStatusMenuId(row.id);
    }
  };
  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setStatusMenuId(null);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = rows.map((row) => row.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((rowId) => rowId !== id)
      );
    }
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const isStatusMenuOpen = (id) => statusMenuId === id;

  return (
    <Box m={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            marginTop: "30px",
            background: "#ECE0FF",
            border: "2px solid #674D9F",
            flexWrap: "wrap",
            borderRadius:'10px 10px 0px 0px'
          }}
        >
          <Box sx={{ display: "flex",gap:1 }}>
            <Typography variant="h6">Attendance</Typography>
            <IconButton onClick={handleFilterMenuOpen}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={filterMenuAnchorEl}
                open={Boolean(filterMenuAnchorEl)}
                onClose={handleFilterMenuClose}
              >
                <MenuItem onClick={handleFilterMenuClose}>Floor wise</MenuItem>
                <MenuItem onClick={handleFilterMenuClose}>Building-wise</MenuItem>
                <MenuItem onClick={handleFilterMenuClose}>Hostel-wise</MenuItem>
              </Menu>
            <Tooltip title="Dates">
              <IconButton>
                <CalendarTodayIcon /> 
              </IconButton>
            </Tooltip>
          </Box>

          <Box display="flex" gap={1}>
            <IconButton sx={{ background: "#fff" }}>
              <SearchIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
              sx={{ borderRadius: "20px" }}
            >
              Export PDF
            </Button>
          </Box>
        </Box>
      <TableContainer
        component={Paper}
        sx={{
          borderLeft: "2px solid #674D9F",
          borderRight: "2px solid #674D9F",
          borderBottom: "2px solid #674D9F",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Table>
          <TableHead sx={{ borderBottom: "2px solid #674D9F",}}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < rows.length
                  }
                  checked={selectedRows.length === rows.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>YOCO ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Room No.</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row, index) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? "#F1F2FC" : "inherit",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.id)}
                    onChange={(event) => handleRowSelect(event, row.id)}
                  />
                </TableCell>
                <TableCell>{row.yocoId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.roomNo}</TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell>
                  <Button
                    onClick={(event) => handleStatusMenuOpen(event, row)}
                    variant="outlined"
                    size="small"
                    color={row.statusColor === "success" ? "warning" : "error"}
                    sx={{
                      borderRadius: 20,
                      border: `2px solid ${
                        row.statusColor === "success" ? "#9CB501" : "#f44336"
                      }`,
                      color:
                        row.statusColor === "success" ? "#9CB501" : "#f44336",
                      backgroundColor:
                        row.statusColor === "success"
                          ? "#FDFFB2"
                          : "rgba(255, 0, 0, 0.2)",
                    }}
                  >
                    {row.status}
                  </Button>

                  <Menu
                    anchorEl={statusMenuAnchorEl}
                    open={isStatusMenuOpen(row.id)}
                    onClose={handleStatusMenuClose}
                  >
                    <MenuItem>
                      <Typography>Notify</Typography>
                      <Switch />
                    </MenuItem>
                    <Typography sx={{ p: 1, width: "250px" }}>
                      Notify Student and parents when past curfew
                    </Typography>
                  </Menu>
                </TableCell>

                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleMoreMenuOpen(event, row.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={moreMenuAnchorEl}
                    open={moreMenuId === row.id}
                    onClose={handleMoreMenuClose}
                  >
                    <MenuItem>
                      <ListItemIcon>
                        <TaskAltIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText>Accept</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <CancelIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>Reject</ListItemText>
                    </MenuItem>
                    <MenuItem>
                    <Link 
                      to={"/attendance/details"}
                      style={{ textDecoration: "none", color: "inherit", display:'flex', alignItems:'center' }}
                      >
                      <ListItemIcon>
                        <ListIcon fontSize="small"  />
                      </ListItemIcon>
                      <ListItemText>Details</ListItemText>
                      </Link>
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
}

export default AttendanceTable;
