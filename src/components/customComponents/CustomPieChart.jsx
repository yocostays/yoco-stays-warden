import {
  Box,
  Card,
  Typography,
  Menu,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import CustomBarChart from "./CustomBarChart";
import CustomLineChart from "./CustomLineChart";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Custom Google PieChart component
const CustomPieChart = ({
  data,
  marginRight,
  onExport,
  onOptionChange,
  height,
  pieWidth,
  pieHeight,
  isDownload = false,
}) => {
  // State for controlling menu and selected menu item
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Pie Chart");
  const [todayAnchorEl, setTodayAnchorEl] = useState(null); // State for Today button menu
  const [selectedTodayOption, setSelectedTodayOption] = useState("Today");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const open = Boolean(anchorEl);
  const todayMenuOpen = Boolean(todayAnchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option); // Set selected option as the button label
    handleMenuClose();
  };

  const handleTodayMenuClick = (event) => {
    setTodayAnchorEl(event.currentTarget);
  };

  const handleTodayMenuClose = () => {
    setTodayAnchorEl(null);
  };

  const handleTodayMenuItemClick = (option) => {
    handleTodayMenuClose();
    setSelectedTodayOption(option?.label);
    onOptionChange(option?.value); // Set selected option for Today button
  };

  const menuItems = ["Pie Chart", "Bar Chart", "Line Chart"];
  const todayMenuItems = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Current Week", value: "current week" },
    { label: "Last Week", value: "last week" },
    { label: "Past Two Week", value: "past two week" },
    { label: "Current Month", value: "current month" },
    { label: "Last Month", value: "last month" },
    { label: "Current Year", value: "current year" },
    { label: "Last Year", value: "last year" },
  ];

  // Helper function to convert HEX to RGB
  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  // Helper function to interpolate between two RGB colors
  const interpolateColor = (color1, color2, factor) => {
    const result = color1.map((c, i) =>
      Math.round(c + factor * (color2[i] - c))
    );
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  };

  // Function to generate color shades for each value
  // Function to generate color shades for each value
  const generateColorShades = (values) => {
    const colorHigh = hexToRgb("#39216D"); // Dark purple
    const colorLow = hexToRgb("#BA9CFF"); // Light purple

    // Filter out negative values and find max and min values
    const filteredValues = values.filter((item) => item.value >= 0);
    const maxValue = Math.max(...filteredValues.map((item) => item.value), 0); // Ensure maxValue is at least 0
    const minValue = Math.min(...filteredValues.map((item) => item.value), 0); // Ensure minValue is at most 0

    // If all values are the same, assign distinct shades based on index
    if (maxValue === minValue) {
      const totalValues = filteredValues.length;
      return filteredValues.map((_, index) => {
        const factor = index / totalValues; // Use the index to vary the shade
        return interpolateColor(colorLow, colorHigh, factor);
      });
    }

    return filteredValues.map((item, index) => {
      // Calculate a factor (0 to 1) to interpolate between the colors
      const factor = (item.value - minValue) / (maxValue - minValue);

      // Add a small variation to the factor for identical values
      const variation = (index / filteredValues.length) * 0.5; // Small variation (adjustable)

      // Interpolate and clamp RGB values to be within 0-255
      const color = interpolateColor(
        colorLow,
        colorHigh,
        Math.min(Math.max(factor + variation, 0), 1)
      );

      // Ensure the color returned is in valid RGB range
      const rgbValues = color.match(/\d+/g).map(Number);
      const clampedColor = rgbValues.map((value) =>
        Math.min(Math.max(value, 0), 255)
      );

      return `rgb(${clampedColor[0]}, ${clampedColor[1]}, ${clampedColor[2]})`;
    });
  };

  const pieChartData2 = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: `${item.label} : ${item.value}`,
    color: generateColorShades(data)[index], // Assign color directly here
  }));

  // If data is empty, avoid generating colors
  const chartOptions = {
    is3D: false,
    sliceVisibilityThreshold: 0,
    colors: data.length > 0 ? generateColorShades(data) : [], // Dynamic gradient colors
  };

  return (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        height: { height },
        // width: { sm: "100%", xs: "100%" },
        border: "1px solid #B4B4B4",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          background: "#F2F2F2",
          width: "100%",
          py: 0.5,
          px: 2,
          borderBottom: "1px solid #674D9F",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Report
        </Typography>

        <Box
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            aria-controls={open ? "menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              maxWidth: 100,
              height: "30px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              border: "1px solid #000",
              background: "#fff",
              fontSize: "10px",
              color: "#000",
            }}
            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {selectedOption.length > 6
              ? `${selectedOption.slice(0, 6)}...`
              : selectedOption}
          </Button>

          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            {menuItems.map((item) => (
              <MenuItem
                sx={{ fontSize: "14px" }}
                key={item}
                onClick={() => handleMenuItemClick(item)}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
          {isDownload && (
            <Button
              variant="outlined"
              size="small"
              onClick={onExport}
              sx={{
                borderRadius: "30px",
                textTransform: "none",
                maxWidth: 100,
                height: "30px",
                border: "1px solid #000",
                background: "#fff",
                fontSize: "10px",
                color: "#000",
                px: 2,
              }}
            >
              Download
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            aria-controls={todayMenuOpen ? "today-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={todayMenuOpen ? "true" : undefined}
            onClick={handleTodayMenuClick}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              maxWidth: 100,
              height: "30px",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              border: "1px solid #000",
              background: "#fff",
              fontSize: "10px",
              color: "#000",
              px: 2,
            }}
            endIcon={todayMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {selectedTodayOption.length > 6
              ? `${selectedTodayOption.slice(0, 6)}...`
              : selectedTodayOption}
          </Button>

          <Menu
            id="today-menu"
            anchorEl={todayAnchorEl}
            open={todayMenuOpen}
            onClose={handleTodayMenuClose}
          >
            {/* {todayMenuItems.map((item) => (
              <MenuItem
                sx={{ fontSize: "14px" }}
                key={item}
                onClick={() => handleTodayMenuItemClick(item)}
              >
                {item}
              </MenuItem>
            ))} */}
            {todayMenuItems.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "14px" }}
                key={index}
                value={option.value}
                onClick={() => handleTodayMenuItemClick(option)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      {/* Conditional rendering based on selected option */}
      {selectedOption === "Pie Chart" && (
        <>
          <Box display="flex" flexDirection={isMobile ? "column" : "row"}>
            <PieChart
              width={isMobile ? pieWidth / 2 : pieWidth}
              height={pieHeight}
              series={[
                {
                  data: pieChartData2.map((item) => ({
                    id: item.id,
                    value: item.value,
                    color: item.color,
                    ...(isMobile
                      ? {}
                      : {
                          label: item.label,
                          labelStyle: { fontSize: "10px" }, // Customize label style here
                        }), // Conditionally include label on non-mobile
                  })),
                },
              ]}
              margin={{ right: isMobile ? 0 : marginRight }}
            />
            {isMobile && (
              <Box marginTop={1} marginLeft={0}>
                {pieChartData2.map((item) => (
                  <Box
                    key={item.id}
                    display="flex"
                    alignItems="center"
                    marginBottom={0.5}
                  >
                    <Box
                      width={16}
                      height={16}
                      bgcolor={item.color}
                      marginRight={0.5}
                    />
                    <Box>
                      <Typography sx={{ fontSize: "14px" }}>
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </>
      )}
      {selectedOption === "Bar Chart" && (
        <CustomBarChart data={pieChartData2} options={chartOptions} />
      )}
      {selectedOption === "Line Chart" && (
        <CustomLineChart data={pieChartData2} />
      )}
    </Card>
  );
};

// PropTypes for validation
CustomPieChart.propTypes = {
  data: PropTypes.array.isRequired, // Data must be a 2D array
  options: PropTypes.object, // Options for the chart
  pieWidth: PropTypes.string,
  pieHeight: PropTypes.string,
  marginRight: PropTypes.string,
  height: PropTypes.string,
  onExport: PropTypes.func,
  onOptionChange: PropTypes.func,
  isDownload: PropTypes.bool,
};

export default CustomPieChart;
