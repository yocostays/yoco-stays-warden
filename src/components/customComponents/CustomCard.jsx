import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomCards = ({
  title,
  value,
  variant,
  fontSize,
  fontWeight,
  backgroundColor = "#ffffff",
  buttonText,
  textColor = "#000000",
  borderColor = "#000000",
  icon,
  list,
  dropdownOptions = [], // Default to empty array
  dropbutton = false,
  onClick,
  onDropdownChange,
}) => {
  // Initialize with first option's value or empty string
  const [selectedPeriod, setSelectedPeriod] = useState(
    dropdownOptions.length > 0 ? dropdownOptions[0].value : ""
  );

  useEffect(() => {
    // If dropdownOptions change and selectedPeriod is not in new options, reset it
    if (
      dropdownOptions.length > 0 &&
      !dropdownOptions.some((opt) => opt.value === selectedPeriod)
    ) {
      const newSelected = dropdownOptions[0].value;
      setSelectedPeriod(newSelected);
      if (onDropdownChange) {
        onDropdownChange(newSelected);
      }
    } else if (dropdownOptions.length === 0) {
      setSelectedPeriod("");
      if (onDropdownChange) {
        onDropdownChange("");
      }
    }
  }, [dropdownOptions, selectedPeriod, onDropdownChange]);

  const handleDropdownChange = (event) => {
    const newValue = event.target.value;
    setSelectedPeriod(newValue);
    if (onDropdownChange) {
      onDropdownChange(newValue); // Call the callback with the new value
    }
  };

  return (
    <Card
      sx={{
        backgroundColor,
        color: textColor,
        boxShadow: "none",
        border: `2px solid ${borderColor}`,
        maxWidth: "100%",
        borderRadius: "10px",
        height: "100%",
      }}
    >
      <CardContent sx={{ '&:last-child': { pb: 1 } }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box >
            <Typography
              // variant={variant || "subtitle2"}
              fontSize={fontSize || '16px'}
              fontWeight={fontWeight || "500"}
              sx={{ fontSize:'16px' }}
            >
              {title}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ fontSize: "24px", fontWeight: 600, mt: 2 }}>
              {value}
            </Typography>

            {/* Map through the list array */}
            {Array.isArray(list) && list.length > 0 && (
              <Box>
                {list.map((listItem, index) => (
                  <Typography
                    key={index}
                    // variant="body1"
                    sx={{ fontWeight: "600", lineHeight: "32px", fontSize:'15px' }}
                  >
                    {listItem.item}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {dropbutton && dropdownOptions.length > 0 && (
              <Select
                value={selectedPeriod}
                onChange={handleDropdownChange}
                size="small"
                sx={{
                  fontSize: "0.6rem",
                  borderRadius: "20px",
                  border: "1px solid black",
                  px: 1,
                  backgroundColor: "#fff",
                  width: "100px", // Adjust the width as needed
                }}
              >
                {dropdownOptions.map((option, index) => (
                  <MenuItem sx={{fontSize: '14px'}} key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
            {icon && (
              <Box
                sx={{
                  bgcolor: "white",
                  py: 2,
                  px: 1.3,
                  borderRadius: "8px",
                  mt: 1,
                }}
              >
                {icon}
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {buttonText && (
            <Button
              onClick={onClick}
              sx={{
                color: textColor,
                fontWeight: "bold",
                fontSize: "10px",
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                maxWidth: "200px",
              }}
            >
              {buttonText}
              <ArrowForwardIosIcon sx={{ fontSize: "10px" }} />
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

// Define PropTypes for better type checking
CustomCards.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string,
  fontWeight: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  backgroundColor: PropTypes.string,
  buttonText: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.element,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
    })
  ),
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  dropbutton: PropTypes.bool,
  isButtonOpen: PropTypes.bool,
  onDropdownChange: PropTypes.func,
  onClick: PropTypes.func,
};

// No need for defaultProps since we handled defaults in destructuring

export default CustomCards;
