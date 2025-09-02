// eslint-disable-next-line no-unused-vars
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
import { useTheme } from "@emotion/react";
import ListIcon from "@mui/icons-material/List";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

const MessTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const theme = useTheme();

  // Sample data
  const users = [
    {
      id: "7645092",
      name: "Theresa Webb",
      fee: "₹ 1000",
      phone: "8473628210",
      email: "abc.a@gmail.com",
      date: "17/05/2024",
      fee2: "₹1000",
      status: "Pending",
    },
    {
      id: "7645093",
      name: "Ronald Richards",
      fee: "₹ 1000",
      phone: "8473628211",
      email: "abc.b@gmail.com",
      date: "17/05/2024",
      fee2: "₹1000",
      status: "Pending",
    },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
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

  return (
    <Box
      sx={{
        marginBottom: "30px",
      }}
    >
      <Box>
        <Box
          sx={{
            border: "1px solid #674D9F",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { sm: "space-between", xs: "center" },
              bgcolor: "#ECE0FF",
              p: 4,
              borderRadius: "10px",
              border: "2px solid #674D9F",
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
              <Typography variant="h6" gutterBottom>
                Mess
              </Typography>

              <Button
                onClick={handleFilterClick}
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "50px",
                  ml: 2,
                  border: "2px solid",
                }}
              >
                Branch
                <KeyboardArrowDownOutlinedIcon />
              </Button>
              <Button
                size="small"
                sx={{
                  color: "#555",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <FilterAltIcon />
                Filter
              </Button>
              <Button
                onClick={""}
                size="small"
                sx={{
                  color: "#555",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <DateRangeOutlinedIcon />
                Date
              </Button>
              <Button
                size="small"
                onClick={""}
                variant="outlined"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "50px",
                  ml: 1,
                  border: "2px solid",
                  color: "#555",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <AccessTimeOutlinedIcon /> &nbsp; &nbsp; Reminder &nbsp;
              </Button>
            </Box>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={handleFilterClose}>Floor-Wise</MenuItem>
              <MenuItem onClick={handleFilterClose}>Building-Wise</MenuItem>
              <MenuItem onClick={handleFilterClose}>Hostel-Wise</MenuItem>
            </Menu>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                justifyContent: "center",
              }}
            >
              {["Fee", "paid", "Pendings", "Due"].map((category) => (
                <Button
                  key={category}
                  variant="outlined"
                  size="small"
                  sx={{
                    m: 1,
                    borderRadius: "20px",
                    border: "2px solid ",
                    bgcolor: "white",
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: "#fff",
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {category}
                </Button>
              ))}
              <Button variant="contained" sx={{ borderRadius: "50px" }}>
                {" "}
                <AddCircleOutlineOutlinedIcon />
                &nbsp; Add user
              </Button>
            </Box>
          </Box>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: "10px", fontSize: "50px" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    <Checkbox
                      sx={{
                        color: "#674D9F80",
                      }}
                      checked={selectAll}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    YOCO ID
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>

                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Fee / Sem
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Due Date
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Fee / Year
                  </TableCell>

                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      borderColor: "black",
                      borderBottom: 1,
                      paddingY: 2,
                      fontWeight: "bold",
                    }}
                  >
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        <ListIcon sx={{ mr: 1 }} /> Details
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
                        <HighlightOffIcon sx={{ mr: 1 }} /> Disable
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          color: "#674D9F80",
                        }}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography>{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.fee}</TableCell>
                    <TableCell>{user.date}</TableCell>
                    <TableCell>{user.fee2}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          bgcolor: "#FDFFB2",
                          color: theme.palette.text.primary,
                          width: "100%",
                          borderRadius: "15px",
                          border: "2px solid #9CB501",
                        }}
                      >
                        {user.status}
                      </Button>
                    </TableCell>
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
                            to={""}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <ListIcon sx={{ mr: 1 }} />
                              Details
                            </Box>
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={""}>
                          {" "}
                          <ArrowDownwardOutlinedIcon sx={{ mr: 1 }} />
                          DownLoad Recipt
                        </MenuItem>
                        <MenuItem onClick={""}>
                          {" "}
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

export default MessTable;
