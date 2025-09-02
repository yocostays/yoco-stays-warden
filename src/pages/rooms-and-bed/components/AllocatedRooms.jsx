import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Checkbox,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { MoreVert, Search, FilterList, ExpandMore } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from "react-router-dom";

const AllocatedRooms = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      yocoId: "7645092",
      avatar: "JD",
      name: "John Doe",
      hostelBuilding: "H2",
      floor: 0,
      roomNo: 32,
      bedNumber: "8473628210",
      roomType: "AC - 2 bed",
      status: "Active",
      isChecked: false,
    },
    {
      id: 2,
      yocoId: "7464673",
      avatar: "MB",
      name: "Mukesh Bhai",
      hostelBuilding: "H4",
      floor: 1,
      roomNo: 182,
      bedNumber: "8623237273",
      roomType: "Non-AC 3 bed",
      status: "Active",
      isChecked: false,
    },
    {
      id: 3,
      yocoId: "5363643",
      avatar: "JS",
      name: "Johny Sins",
      hostelBuilding: "H3",
      floor: 2,
      roomNo: 292,
      bedNumber: "9876543210",
      roomType: "AC - 4 bed",
      status: "Maintenance",
      isChecked: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [moreVertMenuAnchorEl, setMoreVertMenuAnchorEl] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [floorSearch, setFloorSearch] = useState("");
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setRows(rows.map((row) => ({ ...row, isChecked })));
  };

  const handleRowCheckboxChange = (id) => (event) => {
    const isChecked = event.target.checked;
    setRows(rows.map((row) => (row.id === id ? { ...row, isChecked } : row)));
    setSelectAll(rows.every((row) => row.isChecked || row.id === id));
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleMoreVertMenuOpen = (event) => {
    setMoreVertMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setFilterMenuAnchorEl(null);
    setMoreVertMenuAnchorEl(null);
  };

  const handleAccordionToggle = () => {
    setIsAccordionOpen((prevOpen) => !prevOpen);
  };

  const handleFloorSearchChange = (event) => {
    setFloorSearch(event.target.value);
  };

  const handleFloorCheckboxChange = (floor) => {
    setSelectedFloors((prev) =>
      prev.includes(floor) ? prev.filter((f) => f !== floor) : [...prev, floor]
    );
  };

  const filteredFloors = [1, 2, 3, 4, 5].filter((floor) =>
    floor.toString().includes(floorSearch)
  );

  const getStatusChip = (status) => {
    switch (status) {
      case "Active":
        return <Chip label="Active" color="success" variant="outlined" />;
      case "Maintenance":
        return <Chip label="Maintenance" color="warning" variant="outlined" />;
      default:
        return null;
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.roomNo.toString().includes(searchQuery) ||
      row.yocoId.includes(searchQuery)
    );
  });

  return (
    <Box m={1}>
        <Box 
        sx={{
           borderTop: "2px solid #A3A3A3",
           borderRight: "2px solid #A3A3A3",
           borderLeft: "2px solid #A3A3A3",
           borderRadius:'10px 10px 0px 0px',
            background: "#F2F2F2" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ padding: 2 }}
          >
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Allocated Rooms
              </Box>
              <IconButton onClick={handleFilterMenuOpen}>
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
                  {" "}
                  {/* Set same width here */}
                  <Accordion
                    expanded={isAccordionOpen}
                    onChange={handleAccordionToggle}
                    sx={{
                      boxShadow: "none",
                      "&:before": { display: "none" },
                      width: "100%",
                    }} // Uniform width for all
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
                              onChange={() => handleFloorCheckboxChange(floor)}
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

                {/* Hostel Accordion */}
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
            </Grid>

            <Grid item>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: <Search />,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      <TableContainer component={Paper} sx={{ borderRadius: "0px 0px 10px 10px",border: "2px solid #A3A3A3", }}>

        <Table>
          <TableHead sx={{ borderBottom:"2px solid #A3A3A3"}}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Yoco ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Hostel Building</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Room No</TableCell>
              <TableCell>Bed Number</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={row.isChecked}
                    onChange={handleRowCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>
                  <Avatar>{row.avatar}</Avatar>
                </TableCell>
                <TableCell>{row.yocoId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.hostelBuilding}</TableCell>
                <TableCell>{row.floor}</TableCell>
                <TableCell>{row.roomNo}</TableCell>
                <TableCell>{row.bedNumber}</TableCell>
                <TableCell>{row.roomType}</TableCell>
                <TableCell>{getStatusChip(row.status)}</TableCell>
                <TableCell>
                  <IconButton onClick={handleMoreVertMenuOpen}>
                    <MoreVert />
                  </IconButton>

                  {/* MoreVert Dropdown Menu */}
                  <Menu
                    anchorEl={moreVertMenuAnchorEl}
                    open={Boolean(moreVertMenuAnchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        maxHeight: "200px",
                        overflowY: "auto",
                        "::-webkit-scrollbar": {
                          display: "none",
                        },
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      },
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <Link 
                      to={"/rooms-and-bed/details"}
                      style={{ textDecoration: "none", color: "inherit", display:'flex', alignItems:'center' }}
                      >
                      <ListItemIcon>
                        <ListIcon fontSize="small"  />
                      </ListItemIcon>
                      <ListItemText>Details</ListItemText>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <ListItemIcon>
                        <HighlightOffIcon fontSize="small"  color="error"/>
                      </ListItemIcon>
                      <ListItemText sx={{color:'red'}}>Disable</ListItemText>
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

export default AllocatedRooms;
