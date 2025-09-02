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
    name: "Mohit",
    personalNo: "9876543210",
    parentsNo: "8765432190",
    roomNo: "65",
    vehicle: "Bike",
    parkingSlot: "D1",
    status: "InProcess",
    statusColor: "success",
  },
  {
    id: 2,
    ticketId: 7645092,
    name: "Mohit",
    personalNo: "9876543210",
    parentsNo: "8765432190",
    roomNo: "65",
    vehicle: "Bike",
    parkingSlot: "D1",
    status: "InProcess",
    statusColor: "success",
  },
  {
    id: 3,
    ticketId: 7645092,
    name: "Mohit",
    personalNo: "9876543210",
    parentsNo: "8765432190",
    roomNo: "65",
    vehicle: "Bike",
    parkingSlot: "D1",
    status: "InProcess",
    statusColor: "success",
  },
];

function EmergencyTable() {
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
          borderRadius: "10px 10px 0px 0px",
          mt:3
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems:'center' }}>
          <Typography variant="h6">Emergency Tickets</Typography>
          <IconButton onClick={handleFilterMenuOpen}>
            <FilterListIcon />
          </IconButton>

          <Menu
            anchorEl={filterMenuAnchorEl}
            open={Boolean(filterMenuAnchorEl)}
            onClose={handleFilterMenuClose}
            PaperProps={{
              sx: {
                maxHeight: "400px",
                overflowY: "auto",
                "::-webkit-scrollbar": { display: "none" },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              },
            }}
          >
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
                          onChange={() =>
                            setSelectedFloors([...selectedFloors, floor])
                          }
                        />
                        <ListItemText primary={`Floor ${floor}`} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </MenuItem>

            {/* Building Accordion */}
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
          <Tooltip title="Dates">
            <IconButton>
              <CalendarTodayIcon /> Date
            </IconButton>
          </Tooltip>
        </Box>

        <Box display="flex" flexWrap="wrap">
          {["Priority", "Returned", "In process"].map(
            (category) => (
              <Button
                key={category}
                variant="outlined"
                sx={{ textTransform:'none',
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
            )
          )}
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
          <TableHead sx={{ borderBottom: "2px solid #674D9F" }}>
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
              <TableCell>Ticket ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Personal No.</TableCell>
              <TableCell>Parents No.</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Parking slot</TableCell>
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
                <TableCell>{row.ticketId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.personalNo}</TableCell>
                <TableCell>{row.parentsNo}</TableCell>
                <TableCell>{row.roomNo}</TableCell>
                <TableCell>{row.vehicle}</TableCell>
                <TableCell>{row.parkingSlot}</TableCell>
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
                        border: `2px solid ${
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

export default EmergencyTable;
