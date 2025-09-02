import React, { useState } from "react";
import { useTheme } from "@mui/material/styles"; // Corrected import
import CustomCards from "../../../components/customComponents/CustomCard";
import {
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableContainer,
  TableRow,
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
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

const PollDetails = () => {
  const theme = useTheme();

  // State for Filter Menu
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const openFilter = Boolean(anchorElFilter);
  const handleFilterClick = (event) => setAnchorElFilter(event.currentTarget);
  const handleFilterClose = () => setAnchorElFilter(null);

  // State for More Menu
  const [anchorElMore, setAnchorElMore] = useState(null);
  const openMore = Boolean(anchorElMore);
  const handleMoreClick = (event) => setAnchorElMore(event.currentTarget);
  const handleMoreClose = () => setAnchorElMore(null);

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
        p:1
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CustomCards
            title="A.."
            value="120"
            backgroundColor="#ECE0FF"
            textColor={theme.palette.text.primary}
            borderColor="#664DA0"
            buttonText="View Users >"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomCards
            title="B.."
            value="20"
            backgroundColor="#FFF3E0"
            textColor={theme.palette.text.primary}
            borderColor="#D9A12B"
            buttonText="Approve Requests >"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomCards
            title="C.."
            value="50"
            backgroundColor="#CBEFBF"
            textColor={theme.palette.text.primary}
            borderColor="#45B501"
            buttonText="View Users >"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          border: "1px solid #674D9F",
          borderRadius: "10px",
          width: "100%",
          mt: 2,
        }}
      >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" },
              gap: 1,
              mb: { xs: 1, xl: 0 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Food Poll
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
        </Box>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: "10px", fontSize: "50px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={{
                      color: "#674D9F80",
                    }}
                  />
                </TableCell>

                <TableCell>Yoco ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Voted for</TableCell>
                <TableCell>Poll Closed</TableCell>
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
                    <MenuItem component={Link} to="/poll/details" onClick={handleMoreClose}>
                      <ListItemIcon>
                        <ListIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Details</ListItemText>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PollDetails;
