// src/components/Maintenance/MaintenanceHeader.js
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTheme } from "@emotion/react";

// eslint-disable-next-line react/prop-types
const MaintenanceHeader = ({ onTabClick }) => {
  const theme = useTheme();
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [floorSearch, setFloorSearch] = useState("");
  const [selectedFloors, setSelectedFloors] = useState([]);
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const filteredFloors = ["1st", "2nd", "3rd"].filter((floor) =>
    floor.toLowerCase().includes(floorSearch.toLowerCase())
  );

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };

  const handleAccordionToggle = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const handleFloorSearchChange = (event) => {
    setFloorSearch(event.target.value);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
    onTabClick(index);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        background: "#ECE0FF",
        border: "1px solid #674D9F",
        flexWrap: "wrap",
        borderRadius: "10px 10px 0px 0px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="h6">Maintenance</Typography>
        <IconButton onClick={handleFilterMenuOpen}>
          <FilterListIcon/>
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
                          setSelectedFloors((prev) =>
                            prev.includes(floor)
                              ? prev.filter((f) => f !== floor)
                              : [...prev, floor]
                          )
                        }
                      />
                      <Typography>{`Floor ${floor}`}</Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </MenuItem>
        </Menu>
          <IconButton>
            <CalendarTodayIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontSize: "18px", ml: 0.5, fontWeight: 500 }}>
              Date
            </Typography>
          </IconButton>
        <Tooltip title="Dates">
        </Tooltip>
      </Box>

      <Box display="flex" flexWrap="wrap" sx={{justifyContent:{xs:'space-between', sm:'flex-end'}}}>
        {["All", "Pending", "In Progress", "Escalated", "Resolved"].map(
          (category, index) => (
            <Button
              size="small"
              key={category}
              variant={selectedTab === index ? "contained" : "outlined"}
              sx={{
                m: 1,
                borderRadius: "20px",
                textTransform:'capitalize',
                bgcolor:
                  selectedTab === index ? theme.palette.primary.main : "white",
                color:
                  selectedTab === index
                    ? theme.palette.secondary.main
                    : theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
                "&:hover": {
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                  borderColor: theme.palette.primary.main,
                },
              }}
              onClick={() => handleTabClick(index)}
            >
              {category}
            </Button>
          )
        )}
      </Box>
    </Box>
  );
};

export default MaintenanceHeader;
