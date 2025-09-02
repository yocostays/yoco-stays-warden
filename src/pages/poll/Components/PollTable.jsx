import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  TableHead,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

const PollTable = () => {
  const theme = useTheme();

  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElMore, setAnchorElMore] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPolls, setSelectedPolls] = useState([]); // Renamed state to reflect polls

  const openFilter = Boolean(anchorElFilter);
  const openMore = Boolean(anchorElMore);

  // Dummy poll data
  const pollData = [
    {
      id: 1,
      title: "Poll 1",
      createdDate: "2024-10-01",
      pollClosed: "No",
      studentsAnswered: 50,
    },
    {
      id: 2,
      title: "Poll 2",
      createdDate: "2024-10-02",
      pollClosed: "Yes",
      studentsAnswered: 120,
    },
    {
      id: 3,
      title: "Poll 3",
      createdDate: "2024-10-03",
      pollClosed: "No",
      studentsAnswered: 80,
    },
  ];

  // Handle filter button click
  const handleFilterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };

  // Handle more options button click
  const handleMoreClick = (event) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorElMore(null);
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedPolls([]);
    } else {
      setSelectedPolls(pollData.map((poll) => poll.id)); // Select all polls
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    if (selectedPolls.includes(id)) {
      setSelectedPolls(selectedPolls.filter((pollId) => pollId !== id));
    } else {
      setSelectedPolls([...selectedPolls, id]);
    }
  };

  return (
    <Box m={1}>
      <Box
        sx={{
          border: "2px solid #674D9F",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: { sm: "space-between", xs: "center" },
            bgcolor: "#ECE0FF",
            padding: "0px 10px",
            borderRadius: "10px 10px 0px 0px",
            borderBottom: "2px solid #674D9F",
          }}
        >
          {/* Title and Filter */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" },
              gap: 1,
              mb: { xs: 1, xl: 0 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Mess Management
            </Typography>

            <Button
              size="small"
              onClick={handleFilterClick}
              sx={{
                color: "#555",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
                textTransform: "none",
              }}
            >
              <FilterAltIcon />
              Filter
            </Button>
            <Menu
              anchorEl={anchorElFilter}
              open={openFilter}
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

          {/* Categories */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {["All", "Admin", "Authorised", "Ongoing Polls", "Polls Closed"].map(
              (category) => (
                <Grid item key={category} xs={12} sm={4} md={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
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
                      textTransform: "none",
                    }}
                  >
                    {category}
                  </Button>
                </Grid>
              )
            )}
          </Box>
        </Box>

        {/* Poll Table */}
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "10px", fontSize: "50px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ borderBottom: "2px solid #674D9F" }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={{ color: "#674D9F80" }}
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>

                <TableCell>Title</TableCell>
                <TableCell>Date/Poll Created</TableCell>
                <TableCell>Poll closed</TableCell>
                <TableCell>Students Answered</TableCell>
                <TableCell>
                  <IconButton onClick={handleMoreClick}>
                    <MoreVertOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElMore}
                    open={openMore}
                    onClose={handleMoreClose}
                  >
                    <MenuItem onClick={handleMoreClose}>
                      <ListItemIcon>
                        <TaskAltIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText>Accept</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMoreClose}>
                      <ListItemIcon>
                        <CancelIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>Reject</ListItemText>
                    </MenuItem>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/poll/details"}
                    >
                      <MenuItem onClick={handleMoreClose}>
                        <ListItemIcon>
                          <ListIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Details</ListItemText>
                      </MenuItem>
                    </Link>
                  </Menu>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pollData.map((poll) => (
                <TableRow key={poll.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{ color: "#674D9F80" }}
                      checked={selectedPolls.includes(poll.id)}
                      onChange={() => handleCheckboxChange(poll.id)}
                    />
                  </TableCell>
                  <TableCell>{poll.title}</TableCell>
                  <TableCell>{poll.createdDate}</TableCell>
                  <TableCell>{poll.pollClosed}</TableCell>
                  <TableCell>{poll.studentsAnswered}</TableCell>
                  <TableCell>
                  <IconButton onClick={handleMoreClick}>
                    <MoreVertOutlinedIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElMore}
                    open={openMore}
                    onClose={handleMoreClose}
                  >
                    <MenuItem onClick={handleMoreClose}>
                      <ListItemIcon>
                        <TaskAltIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText>Accept</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMoreClose}>
                      <ListItemIcon>
                        <CancelIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>Reject</ListItemText>
                    </MenuItem>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={"/poll/details"}
                    >
                      <MenuItem onClick={handleMoreClose}>
                        <ListItemIcon>
                          <ListIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Details</ListItemText>
                      </MenuItem>
                    </Link>
                  </Menu>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PollTable;
