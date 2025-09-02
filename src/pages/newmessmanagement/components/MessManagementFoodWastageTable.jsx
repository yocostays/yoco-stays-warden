import {
  Box,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Table,
  CircularProgress,
  IconButton,
  MenuItem,
  Checkbox,
  Menu,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import { downloadCSV } from "@utils/downloadCSV";
import { toast } from "react-toastify";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  exportFoodWastageReportAsync,
  getReduxEndDate,
  getReduxStartDate,
} from "@features/mess/messSlice";
import { MealTabs } from "@components/enums/messEnums";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MessManagementFoodWastageTable = ({
  handleGetDataById,
  handleDelete,
  fetchMealBookingHistory, page, setPage, rowsPerPage,
  setRowsPerPage, selectedMeal, setSelectedMeal,
}) => {
  const dispatch = useDispatch();
  const { getFoodWastageDeatilList, isWastageLoading, totalFoodWastageCount, reduxStartDate,
    reduxEndDate, } =
    useSelector((state) => state.mess);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const mealTypeValue = selectedMeal.toLocaleLowerCase();
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const openExport = Boolean(exportAnchorEl);
  const [sortOption, setSortOption] = useState("");

  // ISO Date Format --------------------------------
  const IsoStartDate = customStartDate
    ? dayjs(customStartDate).utc(true).startOf("day").toISOString()
    : null;
  const IsoEndDate = customEndDate
    ? dayjs(customEndDate).utc(true).startOf("day").toISOString()
    : null;

  const IsoStartDateForExport = reduxStartDate
    ? dayjs(reduxStartDate).utc(true).startOf("day").toISOString()
    : null;
  const IsoEndDateForExport = reduxEndDate
    ? dayjs(reduxEndDate).utc(true).startOf("day").toISOString()
    : null;

  const isAllSelected = selectedRows.length === getFoodWastageDeatilList.length;
  const isIndeterminate =
    selectedRows.length > 0 &&
    selectedRows.length < getFoodWastageDeatilList.length;

  const handleExportOpen = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null); // Closes the menu
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseDate = () => {
    setAnchorEl(null);
  };

  const handleCloseMenuFilter = () => {
    setAnchorEl(null);
    handleCloseDate();
  };

  const handleCloseDialog = () => {
    setCustomStartDate(null);
    setCustomEndDate(null);
    setOpenDialog(false);
    // handleClose();
  };

  const handleOpenMenuFilter = (event) => {
    setAnchorEl(event.currentTarget); // Opens the menu at the button's position
  };

  // const handleCustomClick = (event) => {
  //   setCustomAnchorEl(event.currentTarget); // Open popover on "Custom" click
  // };

  const handleSelectAll = (event) => {
    setSelectedRows(
      event.target.checked
        ? getFoodWastageDeatilList?.map((row) => row._id)
        : []
    );
    setIsSelectedAll(true);
  };

  // const handleFilterMenuOpen = (event) => {
  //   setFilterMenuAnchorEl(event.currentTarget);
  // };

  // const handleFilterMenuClose = () => {
  //   setFilterMenuAnchorEl(null);
  // };

  const handleSelectRow = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prev) => [...prev, rowId]); // Add row ID to selectedRows
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== rowId)); // Remove row ID from selectedRows
    }
  };

  const handleFliterChange = (newValue) => {
    console.log("newValue", newValue);
    setSortOption(newValue);
    handleCloseMenuFilter();
    if (newValue === "custom") {
      setOpenDialog(true);
    }
  };

  const handleSelecteStartDate = (date) => {
    setCustomStartDate(date);
    dispatch(getReduxStartDate(date));
  };

  const handleSelecteEndDate = (date) => {
    setCustomEndDate(date);
    dispatch(getReduxEndDate(date));
  };

  const handleApplyCustomFilter = () => {
    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      mealType: selectedMeal.toLocaleLowerCase(),
    };

    if (sortOption !== "custom" && sortOption) payload.sort = sortOption;
    if (sortOption === "custom" && IsoEndDate) payload.sort = "custom";
    if (sortOption === "custom") payload.startDate = IsoStartDate;
    if (sortOption === "custom") payload.endDate = IsoEndDate;
    fetchMealBookingHistory(payload);
    handleCloseDialog();
  };

  const onExportExcel = async (selectedTab) => {
    try {
      const payload = {
        type: selectedTab,
        mealType: selectedMeal.toLocaleLowerCase(),
      };

      if (selectedRows && selectedTab === 'individual') payload.foodWastageIds = selectedRows;

      if (sortOption !== "custom" && sortOption) payload.sort = sortOption;
      if (sortOption === "custom" && IsoEndDate) payload.sort = "custom";
      if (sortOption === "custom" && IsoStartDateForExport) payload.startDate = IsoStartDateForExport;
      if (sortOption === "custom" && IsoEndDateForExport) payload.endDate = IsoEndDateForExport;


      // Dispatch the export action
      const response = await dispatch(exportFoodWastageReportAsync(payload));

      if (response?.payload) {
        const data = response?.payload;

        if (data) {
          downloadCSV(data, "Food Wastage Report");
          toast.success("File Exported Successfully.");
          setIsSelectedAll(false);
          setSelectedRows([]);
          handleExportClose();
          // handleGetAllMessList();
        }
      } else {
        console.error("Failed to export data:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  useEffect(() => {
    if (customStartDate && customEndDate) {
      setSortOption("custom");
    }
  }, [customStartDate, customEndDate]);

  useEffect(() => {
    const requestData = {
      page: page + 1,
      limit: rowsPerPage,
      mealType: selectedMeal.toLocaleLowerCase(),
    };

    // Conditionally add properties only if they have values
    if (sortOption !== "custom" && sortOption) requestData.sort = sortOption;
    if (sortOption === "custom" && IsoEndDate) requestData.sort = "custom";
    if (sortOption === "custom" && IsoStartDate)
      requestData.startDate = IsoStartDate;
    if (sortOption === "custom" && IsoEndDate) requestData.endDate = IsoEndDate;

    fetchMealBookingHistory(requestData); // Fetch history on drawer open
    handleCloseMenuFilter();
  }, [mealTypeValue, page, rowsPerPage, sortOption]);

  return (
    <Box p={2}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        width="100%"
        sx={{
          border: "2px solid #947dc6",
          borderBottom: "none",
          flexWrap: "wrap",
          borderRadius: "20px 20px 0px 0px",
          marginTop: "20px",
        }}
      >
        <Typography fontWeight="bold" id='food_wastage' color="#0E0031">
          Food Wastage History
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          borderRadius={2}
        >
          <Box
            display="flex"
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
                    mealTypeValue === tab.value ? "contained" : "outlined"
                  }
                  // onClick={() => handleMealTabChange(tab.value)}
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
                      mealTypeValue === tab.value
                        ? "none"
                        : "linear-gradient(180deg, #674D9F , #FDFAFF ) 1",
                    backgroundColor:
                      mealTypeValue === tab.value ? "#6B52AE" : "#fff",
                    color: mealTypeValue === tab.value ? "#fff" : "#A9A9A9",
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
                onClick={handleOpenMenuFilter}
              >
                <SwapVertIcon />
              </IconButton>
              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenuFilter}
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
                <MenuItem onClick={() => handleFliterChange("ascending")}>
                  By Alphabet A-Z
                </MenuItem>
                <MenuItem onClick={() => handleFliterChange("recent")}>
                  By Date (Recent)
                </MenuItem>
                <MenuItem onClick={() => handleFliterChange("oldest")}>
                  By Date (Oldest)
                </MenuItem>
                <MenuItem onClick={() => handleFliterChange("custom")}>
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
                        onChange={(newValue) => handleSelecteEndDate(newValue)}
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
        {/* </Box> */}
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          background: "linear-gradient(180deg, #674D9F, #FDFAFF)",
          padding: "1.5px 2px 0px 2px",
          borderRadius: 0,
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "white",
            overflowX: "auto",
            minHeight: "200px",
            display: "flex",
            justifyContent: isWastageLoading ? "center" : "initial",
            alignItems: isWastageLoading ? "center" : "initial",
          }}
        >
          <Table stickyHeader aria-label="leave management table">
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{ borderBottom: "2px solid #947dc6" }}
                >
                  <Checkbox
                    sx={{ color: "#674D9F80" }}
                    checked={isAllSelected}
                    indeterminate={isIndeterminate} // Indeterminate state when not all rows are selected
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {TABLE_HEAD.map((item, index) => (
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      color: "#0E0031",
                      borderBottom: "2px solid #947dc6",
                    }}
                    key={index}
                    align={item.align}
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isWastageLoading ? (
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
              ) : getFoodWastageDeatilList?.length === 0 ? (
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
                      <NoDataAvailable />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                getFoodWastageDeatilList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: "#674D9F80" }}
                        checked={selectedRows.includes(row._id)}
                        onChange={(event) => handleSelectRow(event, row._id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {row?.foodWastageNumber || "--"}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(row?.startDate).format("Do MMM, YYYY") || "--"}
                    </TableCell>
                    <TableCell align="center">{row?.breakfast}</TableCell>
                    <TableCell align="center">{row?.lunch}</TableCell>
                    <TableCell align="center">{row?.snacks}</TableCell>
                    <TableCell align="center">{row?.dinner}</TableCell>
                    <TableCell align="center">
                      {row?.feedback === 0 ? "0" : row?.feedback || "--"}
                    </TableCell>
                    <TableCell align="center">
                      {`${row?.totalWastage} ${row?.totalUnit}`}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={() => handleGetDataById(row)}
                        aria-label="edit"
                      >
                        <ModeEditOutlineRoundedIcon
                        // onClick={() => handleScrollToTop()}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row)}
                        aria-label="delete"
                      >
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>

        <CustomPagination
          rowsPerPage={rowsPerPage}
          page={page}
          count={totalFoodWastageCount}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          display={"flex"}
          alignItems="center"
          backgroundColor="white"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
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
                <KeyboardArrowDownRoundedIcon style={{ color: "white" }} />
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
                disabled={!isSelectedAll}
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
      </TableContainer>
    </Box>
  );
};

export default MessManagementFoodWastageTable;

MessManagementFoodWastageTable.propTypes = {
  handleGetDataById: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  fetchMealBookingHistory: PropTypes.func.isRequired,
  page: PropTypes.any,
  setPage: PropTypes.any,
  rowsPerPage: PropTypes.any,
  setRowsPerPage: PropTypes.any,
  selectedMeal: PropTypes.any,
  setSelectedMeal: PropTypes.any
};


const TABLE_HEAD = [
  { label: "Menu Id", align: "center" },
  { label: "Date", align: "center" },
  { label: "Breakfast", align: "center" },
  { label: "Lunch", align: "center" },
  { label: "Snacks", align: "center" },
  { label: "Dinner", align: "center" },
  { label: "Feedback", align: "center" },
  { label: "Food Wastage", align: "center" },
  { label: "Action", align: "center" },
];
