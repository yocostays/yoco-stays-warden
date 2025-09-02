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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import ListIcon from '@mui/icons-material/List';
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {QRCodeSVG} from 'qrcode.react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


const rows = [
  {
    id: 1,
    name: "John Doe",
    contact: "+911234567890 abc@gmail.com",
    roomNo: 124,
    description: "1st",
    gender: "male",
    entryAt: "15/07/2024",
    exitAt: "15/07/2024",
    purpose: "Type One",
    qrcode: "https://en.wikipedia.org/wiki/",
    statusColor: "success",
  },
  {
    id: 2,
    name: "John Doe",
    contact: "+911234567890 abc@gmail.com",
    roomNo: 124,
    description: "1st",
    gender: "male",
    entryAt: "15/07/2024",
    exitAt: "15/07/2024",
    purpose: "Type One",
    qrcode: "https://en.wikipedia.org/wiki/",
    statusColor: "error",
  },
  {
    id: 3,
    name: "John Doe",
    contact: "+911234567890 abc@gmail.com",
    roomNo: 124,
    description: "1st",
    gender: "male",
    entryAt: "15/07/2024",
    exitAt: "15/07/2024",
    purpose: "Type One",
    qrcode: "https://en.wikipedia.org/wiki/",
    statusColor: "error",
  },
  {
    id: 4,
    name: "John Doe",
    contact: "+911234567890 abc@gmail.com",
    roomNo: 124,
    description: "1st",
    gender: "male",
    entryAt: "15/07/2024",
    exitAt: "15/07/2024",
    purpose: "Type One",
    qrcode: "https://en.wikipedia.org/wiki/",
    statusColor: "error",
  },
];

function VisitorsTable() {
    const theme = useTheme();
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
            background: "#ECE0FF",
            border: "2px solid #674D9F",
            flexWrap: "wrap",
            borderRadius:'10px 10px 0px 0px',
            marginTop:'30px'
          }}
        >
          <Box sx={{ display: "flex",gap:1, flexWrap:'wrap', alignItems:'center' }}>
            <Typography variant="h6">Visitor Management</Typography>
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
              <IconButton>
                <CalendarTodayIcon/> Dates
              </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {[
                "All",
                "Paying Guest",
                "Guest House",
                "Hostel",
              ].map((category) => (
                <Button
                  key={category}
                  variant="outlined"
                  sx={{
                    m: 1,
                    borderRadius: "20px",
                    bgcolor: "white",
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.secondary.main,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {category}
                </Button>
              ))}
            <IconButton>
            <SettingsOutlinedIcon/>
            </IconButton>
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
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Room No.</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Entry At</TableCell>
              <TableCell>Exit At</TableCell>
              <TableCell>Purpose</TableCell>
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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.roomNo}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.entryAt}</TableCell>
                <TableCell>{row.exitAt}</TableCell>
                <TableCell>{row.purpose}</TableCell>
                <TableCell>
                <TableCell>
                <QRCodeSVG value={row.qrcode} size={24} />
                </TableCell>

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
                      to={"/visitors/details"}
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

export default VisitorsTable;
