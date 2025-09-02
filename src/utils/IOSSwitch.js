import styled from "@emotion/styled";
import { Switch } from "@mui/material";

export const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 30, // Smaller width
    height: 12, // Smaller height
    padding: 0,
    overflow: "visible",
    "& .MuiSwitch-switchBase": {
      padding: 1, // Adjust padding
      margin: 1, // Adjust margin for better alignment
      top: -2, // Adjust position for smaller size
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(14px)", // Adjust to fit smaller size
        color: "#36F112",
        "& .MuiSwitch-thumb": {
          backgroundColor: "#36F112", // Green color for checked state
          width: 16, // Smaller thumb size
          height: 16,
        },
        "& + .MuiSwitch-track": {
          backgroundColor: "#DEDEDE",
          opacity: 1,
          boxShadow: "inset 0 2px 1px rgba(0, 0, 0, 0.2)", // Subtle shadow
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "4px solid #fff", // Reduced border size
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[200],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 16, // Thumb size for default state
      height: 16,
      backgroundColor: "#f28c28",
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      height: 17, // Track height
      backgroundColor: "#E0E0E0", // Default track color
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
