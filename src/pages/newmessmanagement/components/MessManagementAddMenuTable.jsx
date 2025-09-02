import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import theme from "@theme/Theme";
import {
  exportMessMenuReportAsync,
  getMessListAsync,
  getReduxEndDate,
  getReduxStartDate,
} from "@features/mess/messSlice";
import { useDispatch, useSelector } from "react-redux";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { MealTabs } from "@components/enums/messEnums";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import { downloadCSV } from "@utils/downloadCSV";
import { toast } from "react-toastify";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TABLE_HEAD = [
  { id: "menuId", value: "Menu Id" },
  { id: "date", value: "Date" },
  { id: "breakfast", value: "BreakFast" },
  { id: "lunch", value: "Lunch" },
  { id: "snacks", value: "Snacks" },
  { id: "dinner", value: "Dinner" },
  { id: "booking", value: "Bookings" },
  { id: "cancellations", value: "Cancellations" },
  { id: "totalConsume", value: "Total Consume" },
  { id: "action", value: "Action" },
];

const MessManagementAddMenuTable = ({
  handleGetDataById,
  // handleDeleteDataById,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  console.log("filter", filter);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  const open = Boolean(anchorEl);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const openExport = Boolean(exportAnchorEl);

  // ISO Date Format --------------------------------
  const IsoStartDate = customStartDate
    ? dayjs(customStartDate).utc(true).startOf("day").toISOString()
    : null;

  const IsoEndDate = customEndDate
    ? dayjs(customEndDate).utc(true).startOf("day").toISOString()
    : null;

  // const IsoStartDateForExport = reduxStartDate
  //   ? dayjs(reduxStartDate).utc(true).startOf("day").toISOString()
  //   : null;
  // const IsoEndDateForExport = reduxEndDate
  //   ? dayjs(reduxEndDate).utc(true).startOf("day").toISOString()
  //   : null;

  const { getMessList, totalCount, isLoading } = useSelector(
    (state) => state.mess
  );

  const isAllSelected = selectedRows.length === getMessList.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < getMessList.length;

  const handleSortChange = (option) => {
    setFilter(option);
    handleClose();

    if (option === "custom") {
      setOpenDialog(true);
    }
  };

  const handleExportOpen = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null); // Closes the menu
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelecteStartDate = (date) => {
    setCustomStartDate(date);
    dispatch(getReduxStartDate(date));
  };

  const handleSelecteEndDate = (date) => {
    setCustomEndDate(date);
    dispatch(getReduxEndDate(date));
  };

  // const handleFilterMenuOpen = (event) => {
  //   setFilterMenuAnchorEl(event.currentTarget);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectAll = (event) => {
    setSelectedRows(
      event.target.checked ? getMessList?.map((row) => row._id) : []
    );
  };

  const handleSelectRow = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prev) => [...prev, rowId]); // Add row ID to selectedRows
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== rowId)); // Remove row ID from selectedRows
    }
  };

  const handleCloseDialog = () => {
    setCustomStartDate(null);
    setCustomEndDate(null);
    setOpenDialog(false);
    handleClose();
  };

  const handleApplyCustomFilter = () => {
    handleGetAllMessList();
    handleCloseDialog();
  };

  const onExportExcel = async (selectedType) => {
    try {
      const payload = {
        type: selectedType,
        mealType: selectedMeal.toLowerCase(),
      };
      if (selectedType === "individual") payload.bookMealIds = selectedRows;
      if (filter !== "custom" && !IsoEndDate && filter) payload.sort = filter;
      if (filter === "custom" && IsoEndDate && filter) payload.sort = filter;
      if (filter === "custom" && IsoEndDate) payload.startDate = IsoStartDate;
      if (filter === "custom" && IsoEndDate) payload.endDate = IsoEndDate;

      // Dispatch the export action
      const response = await dispatch(exportMessMenuReportAsync(payload));

      if (response?.payload) {
        const data = response?.payload;

        if (data) {
          downloadCSV(data, "Menu History Report");
          toast.success("File Exported Successfully.");
          setSelectedRows([]);
          handleExportClose();
        }
      } else {
        console.error("Failed to export data:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const handleGetAllMessList = () => {
    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      mealType: selectedMeal.toLowerCase(),
      // sort: filter,
    };
    if (filter !== "custom" && !IsoEndDate && filter) payload.sort = filter;
    if (filter === "custom" && IsoEndDate && filter) payload.sort = filter;
    if (filter === "custom" && IsoEndDate) payload.startDate = IsoStartDate;
    if (filter === "custom" && IsoEndDate) payload.endDate = IsoEndDate;
    dispatch(getMessListAsync(payload));
  };

  useEffect(() => {
    handleGetAllMessList();
  }, [dispatch, page, rowsPerPage, filter, selectedMeal]);

  return (
    <>
      <Box width="100%">
        <Box
          id="add_menu"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={1}
          sx={{
            border: "2px solid #674D9F",
            borderBottom: "none",
            flexWrap: "wrap",
            borderRadius: "20px 20px 0px 0px",
            // marginTop: "20px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
                cursor: "pointer",
              }}
            >
              Menu History
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
            borderRadius={2}
          >
            <Box
              display="flex"
              flexWrap={isSmallScreen ? "wrap" : "nowrap"}
              flexDirection="row"
              gap={2}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <Box display="flex" gap={2} flexWrap="wrap">
                {MealTabs.map((tab) => (
                  <Button
                    key={tab.value}
                    variant={
                      selectedMeal === tab.value ? "contained" : "outlined"
                    }
                    onClick={() => setSelectedMeal(tab.value)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 1,
                      padding: "6px 12px",
                      borderWidth: "2px",
                      // borderStyle: "solid",
                      boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                      borderImage:
                        selectedMeal === tab.value
                          ? "none"
                          : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1",
                      backgroundColor:
                        selectedMeal === tab.value ? "#6B52AE" : "#fff",
                      color: selectedMeal === tab.value ? "#fff" : "#A9A9A9",
                    }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Box>
              {/* </Box> */}
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  sx={{ color: open ? "#6B52AE" : "#A9A9A9", p: 0 }}
                  onClick={handleClick}
                >
                  <SwapVertIcon />
                </IconButton>
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      border: "2px solid #D3D3D3",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      "& .MuiMenuItem-root": {
                        fontFamily: "inherit",
                        fontSize: 14,
                        color: "#4C4C4C",
                      },
                    },
                  }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  {/* <MenuItem onClick={() => setFilter("ascending")}>
                    By Alphabet A-Z
                  </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      setFilter("recent");
                      handleClose();
                    }}
                  >
                    By Date (Recent)
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFilter("oldest");
                      handleClose();
                    }}
                  >
                    By Date (Oldest)
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange("custom")}>
                    Custom
                  </MenuItem>
                </Menu>

                {/* Dialog for custom date range */}
                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  sx={{
                    "& .MuiPaper-root": {
                      zIndex: 1301, // Ensure dialog has a higher z-index than other elements
                      borderRadius: "16px",
                      border: "2px solid #ACB5BD",
                    },
                  }}
                >
                  <DialogTitle
                    sx={{ fontSize: "14px", textTransform: "uppercase" }}
                  >
                    Date Range
                  </DialogTitle>
                  <Divider sx={{ borderBottomWidth: "2px" }} />
                  <DialogContent sx={{ maxHeight: "400px", overflowY: "auto" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        sx={{
                          padding: 2,
                          border: "1px solid #ccc",
                          borderRadius: "16px",
                        }}
                      >
                        {/* Start Date Picker */}
                        <DatePicker
                          label="Start Date"
                          value={customStartDate}
                          format="DD-MM-YYYY"
                          // onChange={(newValue) => setCustomStartDate(newValue)}
                          onChange={(newValue) =>
                            handleSelecteStartDate(newValue)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px", // Rounded corners
                            },
                            "& .MuiInputBase-input": {
                              fontSize: "14px",
                            },
                          }}
                        />

                        {/* Arrow Icon */}
                        <Typography
                          variant="h6"
                          sx={{ color: "#555", fontWeight: "bold" }}
                        >
                          →
                        </Typography>

                        {/* End Date Picker */}
                        <DatePicker
                          label="End Date"
                          value={customEndDate}
                          format="DD-MM-YYYY"
                          minDate={dayjs(customStartDate)}
                          // onChange={(newValue) => setCustomEndDate(newValue)}
                          onChange={(newValue) =>
                            handleSelecteEndDate(newValue)
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "30px", // Rounded corners
                            },
                            "& .MuiInputBase-input": {
                              fontSize: "14px",
                            },
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      sx={{ fontSize: "14px" }}
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{ fontSize: "14px" }}
                      onClick={handleApplyCustomFilter}
                      color="primary"
                    >
                      Apply
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Box>
          </Box>
        </Box>
        <TableContainer
          sx={{
            width: "100%",
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "20px", // Applies 20px radius to all corners
            borderImage: "linear-gradient(180deg, #9B7BC6, #FDFAFF) 1",
            boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ borderBottom: "2px solid #947dc6" }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={{ color: "#674D9F80" }}
                    checked={isAllSelected}
                    indeterminate={isIndeterminate} // Indeterminate state when not all rows are selected
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {TABLE_HEAD.map((item, index) => (
                  <TableCell sx={{ fontSize: "16px" }} key={index} align="left">
                    {item.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                // Loading State
                <TableRow>
                  <TableCell colSpan={TABLE_HEAD.length + 1}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "300px",
                        width: "100%",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : getMessList?.length === 0 ? (
                // No Data State
                <TableRow>
                  <TableCell colSpan={TABLE_HEAD.length + 1}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "300px",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6" color="textSecondary">
                        No data available
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                getMessList.map((item, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      transition: "box-shadow 0.4s, transform 0.4s",
                      "&:hover": {
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        transform: "scale(1)",
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: "#674D9F80" }}
                        checked={selectedRows.includes(item._id)}
                        onChange={(event) => handleSelectRow(event, item._id)}
                      />
                    </TableCell>
                    <TableCell>{item.uniqueId}</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      {dayjs(item.date).format("Do MMM YYYY")}
                    </TableCell>
                    <TableCell>{item.breakfast || "--"}</TableCell>
                    <TableCell>{item.lunch || "--"}</TableCell>
                    <TableCell>{item.snacks || "--"}</TableCell>
                    <TableCell>{item.dinner || "--"}</TableCell>
                    <TableCell>{item.totalBooking || "0"}</TableCell>
                    <TableCell>{item.totalCancelled || "0"}</TableCell>
                    <TableCell>{item.totalConsumed || "0"}</TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <IconButton onClick={() => handleGetDataById(item?._id)}>
                        <EditRoundedIcon />
                      </IconButton>

                      {/* <IconButton onClick={() => handleDeleteDataById(item?._id)}>
                        <DeleteRoundedIcon />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))
              )}

              <TableRow>
                <TableCell sx={{ p: 0, m: 0 }} colSpan={TABLE_HEAD.length + 1}>
                  <CustomPagination
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={totalCount}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {/* Display selected rows count */}
                      <Typography variant="body1" mr={3} ml={1}>
                        <span style={{ color: "#674D9F" }}>Action: </span>
                        {selectedRows.length} Selected
                      </Typography>

                      {/* Center: Export dropdown */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExportOpen}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          fontWeight: "bold",
                        }}
                        endIcon={
                          <KeyboardArrowDownRoundedIcon
                            style={{ color: "white" }}
                          />
                        }
                      >
                        Export
                      </Button>
                      <Menu
                        anchorEl={exportAnchorEl}
                        open={Boolean(openExport)}
                        onClose={handleExportClose}
                      >
                        <MenuItem
                          disabled={!isAllSelected || selectedRows.length === 0}
                          onClick={() => onExportExcel("all")}
                        >
                          All Export
                        </MenuItem>
                        <MenuItem
                          disabled={!selectedRows.length}
                          onClick={() => onExportExcel("individual")}
                        >
                          Export ({selectedRows.length})
                        </MenuItem>
                      </Menu>
                    </Box>
                  </CustomPagination>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MessManagementAddMenuTable;

MessManagementAddMenuTable.propTypes = {
  handleGetDataById: PropTypes.func.isRequired,
  handleDeleteDataById: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};
