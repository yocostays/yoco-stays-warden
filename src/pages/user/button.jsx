import React, { useState } from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";

function UserButton() {
  // Existing state and functionality...

  // State for managing the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Export action
  const handleExport = (option) => {
    console.log(`Export option selected: ${option}`);
    handleClose(); // Close the menu after selection
  };

  return (
    <Box m={1}>
      {/* Your existing table and components */}

      {/* Footer Section with Export Dropdown */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Box>
          {/* Your other footer elements (if any) */}
        </Box>

        <Box>
          <Button
            variant="outlined"
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              color: "#0E0031", // Adjust color
              borderRadius: 1,
              padding: "5px 10px",
              textTransform: "none",
            }}
          >
            Export
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              },
            }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={() => handleExport("Total Export")}>Total Export</MenuItem>
            <MenuItem onClick={() => handleExport("Export")}>Export</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}

export default UserButton;
