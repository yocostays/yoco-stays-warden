import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Select,
  Typography,
  TablePagination,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TableFooterWithActions = ({
  selectedCount,
  totalRows,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSelectAllRows,
  handleExportSelected,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "#fff",
        border: "2px solid #674D9F",
        flexWrap: "wrap", // Makes it responsive by wrapping the content
      }}
    >
      {/* Action Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          justifyContent: { xs: "center", sm: "flex-start" }, // Center align on xs, left align on sm+
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          variant="body1"
          sx={{ marginRight: "16px", marginBottom: { xs: "8px", sm: "0" } }}
        >
          Action :{selectedCount} Selected
        </Typography>
        <Button
          variant="outlined"
          onClick={handleOpenMenu}
          aria-controls="export-menu"
          aria-haspopup="true"
          sx={{
            backgroundColor: "#674D9F", // Blue color
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#3d2e5e", // Darker blue on hover
            },
            marginRight: "16px",
            width: { xs: "100%", sm: "auto" }, // Full width on xs, auto width on sm+
            marginBottom: { xs: "8px", sm: "0" },
          }}
        >
          Export <KeyboardArrowUpIcon />
        </Button>
        <Menu
          id="export-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              handleSelectAllRows();
              handleCloseMenu();
            }}
          >
            Total Export
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExportSelected();
              handleCloseMenu();
            }}
          >
            Export ({selectedCount})
          </MenuItem>
        </Menu>
      </Box>

      {/* Rows Per Page and Pagination */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            marginRight: "8px",
            marginBottom: { xs: "8px", sm: 0 },
          }}
        >
          Rows per page:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          sx={{
            marginRight: "16px",
            width: "80px",
            border: "none", // Removes the border
            "& fieldset": {
              border: "none", // Removes the border for outlined variant
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none", // Prevents showing the border on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none", // Prevents showing the border when focused
            },
            marginBottom: { xs: "8px", sm: 0 },
          }}
        >
          {[5, 10, 25, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
          sx={{
            "& .MuiTablePagination-toolbar": { padding: 0 },
            "& .MuiTablePagination-spacer": { flex: "none" },
            flexGrow: 1, // Ensures pagination takes available space
            textAlign: "right", // Aligns pagination to the right
          }}
        />
      </Box>
    </Box>
  );
};

export default TableFooterWithActions;
