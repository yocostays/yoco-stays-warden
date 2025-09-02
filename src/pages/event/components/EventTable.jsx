import {
  Box,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    event: "New Year Party",
    date: "31st December",
    time: "10:30pm",
    duration: "8 hours",
    attendees: "100",
    emanager: "Atul Singh",
    guests: "20",
  },
  {
    id: 2,
    event: "Janmashtami",
    date: "26 Aug",
    time: "10:00am",
    duration: "3 hours",
    attendees: "60",
    emanager: "Atul Singh",
    guests: "3",
  },
];

export default function EventTable() {
  const [checkedItems, setCheckedItems] = useState(
    new Array(data.length).fill(false)
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectAll = (event) => {
    const newChecked = event.target.checked;
    setCheckedItems(new Array(data.length).fill(newChecked));
  };

  const handleIndividualCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    console.log(`${action} clicked for event:`, data[selectedEvent]);
    handleMenuClose();
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#ECE0FF",
          p: 2,
          borderRadius: "10px 10px 0px 0px",
          border: "2px solid #674D9F",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Events
            </Typography>
            <Button
              size="small"
              sx={{
                ml: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <FilterAltIcon sx={{ mr: 0.5 }} />
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderBottom: "2px solid #674D9F",
          borderLeft: "2px solid #674D9F",
          borderRight: "2px solid #674D9F",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Table
          aria-label="event table"
          sx={{
            minWidth: 650,
          }}
        >
          <TableHead sx={{ backgroundColor: "#F5F5F5", fontWeight: "bold" }}>
            <TableRow sx={{borderBottom: "2px solid #674D9F",}}>
              <TableCell>
                <Checkbox
                  checked={checkedItems.every(Boolean)}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>Event Manager</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((event, index) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Checkbox
                    checked={checkedItems[index]}
                    onChange={() => handleIndividualCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.duration}</TableCell>
                <TableCell>{event.attendees}</TableCell>
                <TableCell>{event.emanager}</TableCell>
                <TableCell>{event.guests}</TableCell>
                <TableCell>
                  <Button onClick={(event) => handleMenuClick(event, index)}>
                    <MoreVertIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/event/form"
        >
          <MenuItem onClick={() => handleMenuItemClick("Detail")}>
          <ListIcon sx={{ mr: 1 }}/>
            Details
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleMenuItemClick("Reject")}>
        <CancelIcon fontSize="small" color="error" sx={{mr: 1}}/>
          Reject
        </MenuItem>
      </Menu>
    </Box>
  );
}
