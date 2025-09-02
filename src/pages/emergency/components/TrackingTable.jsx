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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import ListIcon from "@mui/icons-material/List";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const rows = [
  {
    id: 1,
    ticketId: 7645092,
    name: "John Doe",
    sentBy: "SMS",
    date: "15/07/2024",
    status: "InProcess",
    statusColor: "success",
  },
  {
    id: 2,
    ticketId: 7645092,
    name: "John Doe",
    sentBy: "SMS",
    date: "15/07/2024",
    status: "InProcess",
    statusColor: "success",
  },
  {
    id: 3,
    ticketId: 7645092,
    name: "John Doe",
    sentBy: "SMS",
    date: "15/07/2024",
    status: "InProcess",
    statusColor: "success",
  },
  {
    id: 4,
    ticketId: 7645092,
    name: "John Doe",
    sentBy: "SMS",
    date: "15/07/2024",
    status: "InProcess",
    statusColor: "success",
  },
];

function TrackingTable() {
  const theme = useTheme();

  const [selectedRows, setSelectedRows] = useState([]);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [moreMenuId, setMoreMenuId] = useState(null);
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState(null);
  const [statusMenuId, setStatusMenuId] = useState(null);

  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [floorSearch, setFloorSearch] = useState("");
  const [selectedFloors, setSelectedFloors] = useState([]);
  const filteredFloors = ["1st", "2nd", "3rd"].filter((floor) =>
    floor.toLowerCase().includes(floorSearch.toLowerCase())
  );

  const handleMoreMenuOpen = (event, rowId) => {
    setMoreMenuAnchorEl(event.currentTarget);
    setMoreMenuId(rowId);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
    setMoreMenuId(null);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };

  const handleStatusMenuOpen = (event, row) => {
    if (row.status !== "InProcess") {
      setStatusMenuAnchorEl(event.currentTarget);
      setStatusMenuId(row.id);
    }
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchorEl(null);
    setStatusMenuId(null);
  };

  const handleAccordionToggle = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const handleFloorSearchChange = (event) => {
    setFloorSearch(event.target.value);
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

  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const toggleAssign = () => setIsAssignOpen(!isAssignOpen);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        sx={{
          background: "#ECE0FF",
          border: "2px solid #B4B4B4",
          flexWrap: "wrap",
          borderRadius: "10px 10px 0px 0px",
          mt:3
        }}
      >
        <Box >
          <Typography variant="h6">Call and SMS Tracking:</Typography>
        </Box>
      </Box>
      <TableContainer
        // component={Paper}
        sx={{
          borderLeft: "2px solid #B4B4B4",
          borderRight: "2px solid #B4B4B4",
          borderBottom: "2px solid #B4B4B4",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Table>
          <TableHead sx={{ borderBottom: "2px solid #B4B4B4" }}>
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
              <TableCell>Sent By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.id)}
                    onChange={(event) => handleRowSelect(event, row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.sentBy}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      onClick={(event) => handleStatusMenuOpen(event, row)}
                      variant="outlined"
                      size="small"
                      color={
                        row.statusColor === "success" ? "warning" : "error"
                      }
                      sx={{
                        // padding:1,
                        borderRadius: 20,
                        border: `1px solid ${
                          row.statusColor === "success" ? "#F4BE30" : "#f44336"
                        }`,
                        color:
                          row.statusColor === "success" ? "#F4BE30" : "#f44336",
                        backgroundColor:
                          row.statusColor === "success"
                            ? "#FDFAE1"
                            : "rgba(255, 0, 0, 0.2)",
                      }}
                    >
                      {row.status}
                    </Button>
                  </Box>

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
                        to={"/emergency/details"}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ListItemIcon>
                          <ListIcon fontSize="small" />
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

export default TrackingTable;
