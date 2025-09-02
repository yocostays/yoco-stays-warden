import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import CustomCards from "../../../components/customComponents/CustomCard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import CustomChartBox from "../../../components/customComponents/CustomChartBox";

const floors = [
  { floor: 1, rooms: [true, false, true, true] }, // true = available, false = unavailable
  { floor: 2, rooms: [true, false, true, true, true, true, true, true] },
];

const RoomChart = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Today's");
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (date) => {
    setSelectedDate(date);
    setAnchorEl(null);
  };


  return (
    <Box m={1}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Box p={1}>
            <CustomCards
              title="Total Rooms"
              value="120"
              backgroundColor="#ECE0FF"
              textColor={theme.palette.text.primary}
              borderColor="#664DA0"
              icon={<HomeOutlinedIcon sx={{ fontSize: "28px" }} />}
            />
          </Box>
          <Box p={1}>
            <CustomCards
              title="Vacant Rooms"
              value="20/ 120"
              backgroundColor="#E8F9E6"
              textColor={theme.palette.text.primary}
              borderColor="#53AB46"
              icon={<HotelOutlinedIcon sx={{ fontSize: "28px" }} />}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={5}>
          <CustomChartBox
            showReport
            showDownload
            showPieChartButton
            showTodayButton
            showOccupancy
            showPieChart
            reportTitle ={"Report"}
            liveOccupancyTitle ={"Live Occupancy Status"}
            totalCapacity ={"12,000"}
            occupiedText ={"Occupied"}
            vacantText ={"Vacant"}
            occupiedValue ={"10000"}
            vacantValue ={"2000"}
            pieChartTitle = {"Report"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Box
            sx={{
              border: "2px solid #5a31b0",
              borderRadius: "16px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                borderBottom: "2px solid #5a31b0",
                padding: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight="bold"
              >
                Room Availability
              </Typography>
              <Box>
                <Button
                  onClick={handleMenuClick}
                  variant="outlined"
                  sx={{ marginRight: 1, borderRadius: "50px" }}
                >
                  {selectedDate}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => handleClose(selectedDate)}
                >
                  <MenuItem onClick={() => handleClose("Today's")}>
                    Today's
                  </MenuItem>
                  <MenuItem onClick={() => handleClose("Tomorrow")}>
                    Tomorrow
                  </MenuItem>
                </Menu>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ padding: 1}}>
              <Typography
                variant="subtitle1"
                mt={2}
                mb={1}
                fontWeight="bold"
                color="text.primary"
              >
                Room Available
              </Typography>

              <Typography variant="body1" fontWeight="bold">
                Floor Number
              </Typography>
              <Box
                display="flex"
                gap={0.5}
                // my={1}
                sx={{ flexWrap: "wrap",  alignItems:'center'  }}
              >
                {floors[0].rooms.map((isAvailable, idx) => (
                  <Button
                    key={idx}
                    variant="contained"
                    sx={{
                      backgroundColor: isAvailable ? "lightgreen" : "red",
                      borderRadius: "20px",
                      width: 30,
                      height: 30,
                      color: isAvailable ? "black" : "white",
                      my: 1,
                    }}
                  >
                    {`0${idx + 1}`}
                  </Button>
                ))}
              </Box>

              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ marginTop: 3 }}
              >
                Room Number
              </Typography>
              <Box
                display="flex"
                gap={0.5}
                // my={1}
                // mx={0.5}
                sx={{ flexWrap: "wrap",   alignItems:'center' }}
              >
                {floors[1].rooms.map((isAvailable, idx) => (
                  <Button
                  key={idx}
                  variant="contained"
                  sx={{
                    backgroundColor: isAvailable ? "lightgray" : "red",
                    borderRadius: "20px",
                    width: 30,  
                    height: 30, 
                    color: isAvailable ? "black" : "white",
                    my: 1,
                    // mx: 0.5,
                  }}
                >
                  {`0${idx + 1}`}
                </Button>
                
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomChart;
