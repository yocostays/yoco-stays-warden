import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
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
} from "@mui/material";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link, useNavigate } from "react-router-dom";

const users = [
  {
    id: 1,
    ticket: "7645092",
    name: "John Doe",
    mobile: "123456789",
    clothes: "15",
    given: "15/07/2024",
    delivery: "15/07/2024",
    status: "In Laundry",
    border: "1px solid #F4BE30",
    bgcolor: "#FDFAE1",
    color: "#D2C43B",
  },
  {
    id: 1,
    ticket: "7645092",
    name: "John Doe",
    mobile: "123456789",
    clothes: "15",
    given: "15/07/2024",
    delivery: "15/07/2024",
    status: "In Laundry",
    border: "1px solid #F4BE30",
    bgcolor: "#FDFAE1",
    color: "#D2C43B",
  },
  {
    id: 1,
    ticket: "7645092",
    name: "John Doe",
    mobile: "123456789",
    clothes: "15",
    given: "15/07/2024",
    delivery: "15/07/2024",
    status: "In Laundry",
    border: "1px solid #F4BE30",
    bgcolor: "#FDFAE1",
    color: "#D2C43B",
  },
  // Add more user objects with unique IDs as needed
];

export default function LaundryTable() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleDateMenuClick = (event) => {
    setDateMenuAnchorEl(event.currentTarget);
  };

  const handleDateMenuClose = () => {
    setDateMenuAnchorEl(null);
  };

  const handleSelectAllClick = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const isAllSelected = selectedUsers.length === users.length;

  return (
    <Box sx={{border:"2px solid #674D9F", borderRadius:'10px'}}>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mb: { xs: 1, xl: 0 },
          }}
        >
          <Typography variant="h6">Laundry mannagement</Typography>
          <Button
            size="small"
            sx={{
              color: "#555",
              "&:hover": {
                color: "#674D9F",
              },
            }}
          >
            <FilterAltOutlinedIcon /> Filter
          </Button>
          <Button
            size="small"
            onClick={handleDateMenuClick}
            sx={{
              color: "#555",
              "&:hover": {
                color: "#674D9F",
              },
            }}
          >
            <CalendarTodayIcon /> Dates
          </Button>
          <Menu
            anchorEl={dateMenuAnchorEl}
            open={Boolean(dateMenuAnchorEl)}
            onClose={handleDateMenuClose}
          >
            {["Today", "Yesterday", "This Month", "Last Month", "Custom Date"].map((option) => (
              <MenuItem key={option} onClick={handleDateMenuClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box>
          {["All", "In Laundry", "Returned", "In Process"].map((butu) => (
            <Button
              key={butu}
              variant="outline"
              size="small"
              sx={{
                m: 1,
                borderRadius: "20px",
                border: "1px solid #555",
                bgcolor: "#fff",
                color: "#555",
                py: 0,
                px: 1.5,
                "&:hover": {
                  bgcolor: "#674D9F",
                  color: "#fff",
                  border: "1px solid #674D9F",
                },
                "&:active": {
                  bgcolor: "#674D9F",
                  color: "#fff",
                  border: "1px solid #674D9F",
                },
              }}
            >
              {butu}
            </Button>
          ))}
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{borderRadius:'0px 0px 10px 10px'}}>
        <Table aria-label="simple">
          <TableHead sx={{ borderBottom: "2px solid #674D9F",}}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{ color: "#674D9F80" }}
                  checked={isAllSelected}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {["Ticket No.", "Name", "Mobile No.", "Clothes", "Given Date", "Delivery Date", "Status", ""].map((head) => (
                <TableCell key={head} sx={{ py: 2, }}>
                  {head}
                </TableCell>
              ))}
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
                <TableCell>{user.ticket}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.clothes}</TableCell>
                <TableCell>{user.given}</TableCell>
                <TableCell>{user.delivery}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    sx={{
                      border: user.border,
                      bgcolor: user.bgcolor,
                      color: user.color,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }}>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <Link to={"/laundry/details"} style={{textDecoration:'none', color:'inherit'}}>
                    <MenuItem>
                      <ListIcon sx={{ mr: 1 }} />
                      Details
                    </MenuItem>
                    </Link>
                    <MenuItem onClick={""}>
                      <ArrowDownwardOutlinedIcon sx={{ mr: 1 }} />
                      Download Receipt
                    </MenuItem>
                    <MenuItem onClick={""}>
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
  );
}
