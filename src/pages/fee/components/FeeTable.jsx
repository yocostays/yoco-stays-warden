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

const FeeTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const theme = useTheme();

  const [branchAnchorEl, setBranchAnchorEl] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("Branch");

  const handleBranchClick = (event) => {
    setBranchAnchorEl(event.currentTarget);
  };

  const handleBranchClose = (branch) => {
    setBranchAnchorEl(null);
    if (branch) {
      setSelectedBranch(branch);
    }
  };

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
        marginTop: "30px",
      }}
    >
      <Box m={1}>
        <Box
          sx={{
            border: "2px solid #674D9F",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
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
                // flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                mb: { xs: 1, xl: 0 },
                alignItems: "center",
                flexWrap:'wrap',
                justifyContent:'space-evenly'
              }}
            >
              <Typography variant="h6" gutterBottom>
                Fee
              </Typography>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "50px",
                  ml: 2,
                  border: "2px solid",
                  textTransform: "none",
                  borderColor: theme.palette.text.primary,
                }}
                onClick={handleBranchClick}
              >
                {selectedBranch}
                <KeyboardArrowDownOutlinedIcon />
              </Button>
              <Menu
                anchorEl={branchAnchorEl}
                open={Boolean(branchAnchorEl)}
                onClose={() => handleBranchClose(null)}
              >
                <MenuItem onClick={() => handleBranchClose("Branch")}>
                  Branch
                </MenuItem>
                <MenuItem onClick={() => handleBranchClose("Branch 1")}>
                  Branch 1
                </MenuItem>
                <MenuItem onClick={() => handleBranchClose("Branch 2")}>
                  Branch 2
                </MenuItem>
              </Menu>
              <Button
                onClick={handleFilterClick}
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
                  borderColor: theme.palette.text.primary,
                  height:'33px'
                }}
              >
                <AccessTimeOutlinedIcon /> &nbsp; &nbsp; Reminder &nbsp;
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={handleFilterClose}>Floor-Wise</MenuItem>
                <MenuItem onClick={handleFilterClose}>Building-Wise</MenuItem>
                <MenuItem onClick={handleFilterClose}>Hostel-Wise</MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                // flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                justifyContent: "space-around",
                alignItems: "center",
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
              <Button
                variant="contained"
                sx={{
                  borderRadius: "50px",
                  padding: "2px 8px",
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  height: "30px",
                  ml:1
                }}
              >
                <AddCircleOutlineOutlinedIcon fontSize="small" />{" "}
                {/* Set icon size */}
                &nbsp; Add user
              </Button>
            </Box>
          </Box>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: "10px", fontSize: "50px" }}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ borderBottom: "2px solid #674D9F",}}>
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
                        <Link
                          to={"/fee/details"}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <MenuItem onClick={handleMenuClose}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <ListIcon sx={{ mr: 1 }} />
                              Details
                            </Box>
                          </MenuItem>
                        </Link>

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

export default FeeTable;
