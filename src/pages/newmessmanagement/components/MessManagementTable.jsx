import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Grid,
  useMediaQuery,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TableCell,
  TableBody,
  CircularProgress,
  Avatar,
  DialogActions,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
} from "@mui/material";

import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import theme from "@theme/Theme";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Edit from "@assets/images/edit_square.svg";
import dayjs from "dayjs";
import MessSideDrawer from "./SideDrawer/MessSideDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
  exportBookedMealReportAsync,
  getAllMessListAsync,
  getMessDetailsByIdAsync,
  getReduxEndDate,
  getReduxStartDate,
} from "@features/mess/messSlice";
import { downloadCSV } from "@utils/downloadCSV";
import { toast } from "react-toastify";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import { mealBookoptions, MealTabs } from "@components/enums/messEnums";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ProfilePopOver from "@pages/leave/components/tableComponent/ProfilePopOver";
import {
  getFloorNoByHostelIdAsync,
  getRoomNumberByFloorNumberAsync,
} from "@features/hostel/hostelApi";
import { ClearSelectedRoomDetails } from "@features/hostel/hostelSlice";

// Dummy data for room numbers

const TABLE_HEAD = [
  { id: "sr.no", value: "Sr. No." },
  { id: "yocoId", value: "YOCO ID " },
  { id: "name", value: "Name" },
  { id: "bookedOn", value: "Booked On" },
  { id: "roomNumber", value: "Duration" },
  { id: "mealtype", value: "Meal Type" },
  { id: "floor", value: "Floor & Room" },
  { id: "action", value: "Actions" },
];

const MessManagementTable = () => {
  const dispatch = useDispatch();
  const {
    getAllMessList,
    totalDataCount,
    isMessLoading,
    reduxStartDate,
    reduxEndDate,
  } = useSelector((state) => state.mess);
  const {
    getFloorNoByHostelId,
    getRoomNumberByFloorNumber,
    isRoomLoading,
    isFloorLoading,
  } = useSelector((state) => state.hostel);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("all");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [filter, setFilter] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("booked");
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [profilePopoverAnchor, setProfilePopoverAnchor] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const openExport = Boolean(exportAnchorEl);
  const [searchFloorNumber, setSearchFloorNumber] = useState("");
  const [selectedFloor, setSelectedFloor] = useState(null);

  const isAllSelected = selectedRows.length === getAllMessList.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < getAllMessList.length;

  const IsoStartDate = dateStart
    ? dayjs(dateStart).utc(true).startOf("day").toISOString()
    : null;

  const IsoEndDate = dateEnd
    ? dayjs(dateEnd).utc(true).startOf("day").toISOString()
    : null;

  const IsoStartDateForExport = reduxStartDate
    ? dayjs(reduxStartDate).utc(true).startOf("day").toISOString()
    : null;
  const IsoEndDateForExport = reduxEndDate
    ? dayjs(reduxEndDate).utc(true).startOf("day").toISOString()
    : null;

  // Handle search input change
  const handleSearchFloorData = (event) => {
    setSearchFloorNumber(event.target.value);
  };

  // Filter data based on search text
  const filteredFloorData = getFloorNoByHostelId.filter((item) =>
    item.floorNumber.toString().includes(searchFloorNumber)
  );

  // Function to perform when a floor is unselected
  const performUnselectFunction = () => {
    dispatch(ClearSelectedRoomDetails());
    setSelectedRoom("");
    handleFilterMenuClose();
  };

  // Handle floor button click
  const handleFloorChange = (floor) => {
    if (selectedFloor === floor.floorNumber) {
      setSelectedFloor(null);
      performUnselectFunction(); // Call the function for unselecting
    } else {
      setSelectedFloor(floor.floorNumber);
      // performSelectFunction(floor); // Call the function for selecting
    }
  };

  const handleExportOpen = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null); // Closes the menu
  };

  const handleSelecteStartDate = (date) => {
    setDateStart(date);
    dispatch(getReduxStartDate(date));
  };

  const handleSelecteEndDate = (date) => {
    setDateEnd(date);
    dispatch(getReduxEndDate(date));
  };

  const handleCloseDate = () => {
    setAnchorEl(null);
    setDateEnd(null);
    setDateStart(null);
    setOpenDialog(false);
  };

  // State to control drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
    setSelectedRow(null); // Clear the selected row
    setIsFullScreen(false); // Reset fullscreen mode
  };

  const handleRowDetailsPage = (row) => {
    if (drawerOpen && row) {
      dispatch(getMessDetailsByIdAsync(row));
    }
    setDrawerOpen(true); // Open the drawer
    setSelectedRow(row); // Set the row data for the drawer
  };

  const handleExpandToFullPage = () => {
    setIsFullScreen((prev) => !prev); // Expand the drawer to fullscreen
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectSortOptions = (options) => {
    if (options !== "custom") setFilter(options);
    handleClose(); // Reset the page to the first page
    // if (options !== "custom" && options) setFilter(options); // Update the filter options
    if (options === "custom" && options) {
      setOpenDialog(true);
      // setFilter(options);
    }
  };

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev); // Toggle the search field
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option); // Update selected option
    handleCloseMenu();
  };

  // Handles floor selection
  // const handleFloorChange = (newFloor) => {
  //   setFloor(newFloor.floorNumber);
  // };

  const handleOpenMenu = (event) => {
    setDropdownAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setDropdownAnchor(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Opens the menu at the button's position
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
    handleCloseDate();
  };

  const handleRoomSelect = (room) => {
    if (room === "...") {
      setShowSearchBar(!showSearchBar); // Toggle search bar
    } else {
      setSelectedRoom(room);
      // setRoomSearch(""); // Clear the search input
      setShowSearchBar(false); // Hide search bar
      handleFilterMenuClose();
    }
  };

  const handleSelectAll = (event) => {
    setSelectedRows(
      event.target.checked ? getAllMessList?.map((row) => row._id) : []
    );
    // setIsSelectedAll(true);
  };

  const handleSelectRow = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prev) => [...prev, rowId]); // Add row ID to selectedRows
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== rowId)); // Remove row ID from selectedRows
    }
  };

  const handleMouseEnter = (event, rowId) => {
    setHoveredRowId(rowId);
    setProfilePopoverAnchor(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setHoveredRowId(null);
    setProfilePopoverAnchor(null);
  };

  const handleGetAllMessList = (payload) => {
    dispatch(getAllMessListAsync(payload));
  };

  // const hanldeSelectMealTab = (meal) => {
  //   setSelectedMeal(meal);
  //   const payload = {
  //     page: page + 1,
  //     limit: rowsPerPage,
  //     status:
  //       selectedOption === "Meal Booked"
  //         ? "booked"
  //         : selectedOption.toLowerCase(),
  //     mealType: meal.toLowerCase(),
  //     sort: "custom",
  //     startDate: IsoStartDate ? IsoStartDate : IsoStartDateForExport,
  //     endDate: IsoEndDate ? IsoEndDate : IsoEndDateForExport,
  //   };
  //   if (search) payload.search = search;
  //   if (selectedFloor) payload.floorNumber = selectedFloor;
  //   if (selectedRoom) payload.roomNumber = selectedRoom.roomNumber;
  //   handleGetAllMessList(payload);
  // };

  const handleApplyCustomFilter = () => {
    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      status:
        selectedOption === "Meal Booked"
          ? "booked"
          : selectedOption.toLowerCase(),
      mealType: selectedMeal.toLowerCase(),
      sort: "custom",
      startDate: IsoStartDate ? IsoStartDate : IsoStartDateForExport,
      endDate: IsoEndDate ? IsoEndDate : IsoEndDateForExport,
    };
    if (search) payload.search = search;
    if (selectedFloor) payload.floorNumber = selectedFloor;
    if (selectedRoom) payload.roomNumber = selectedRoom.roomNumber;

    handleFilterMenuClose();
    handleGetAllMessList(payload);
  };

  const onExportExcel = async (selectedType) => {
    try {
      const payload = {
        type: selectedType,
        status:
          selectedOption === "Meal Booked"
            ? "booked"
            : selectedOption.toLowerCase(),
        mealType: selectedMeal,
      };

      if (search) payload.search = search;
      if (selectedType === "individual") payload.bookMealIds = selectedRows;
      if (filter !== "custom" && filter) payload.sort = filter;
      if (filter === "custom" && filter) payload.sort = filter;
      if (filter === "custom") payload.startDate = IsoStartDateForExport;
      if (filter === "custom") payload.endDate = IsoEndDateForExport;
      if (selectedFloor) payload.floorNumber = selectedFloor;
      if (selectedRoom) payload.roomNumber = selectedRoom.roomNumber;

      // Dispatch the export action
      const response = await dispatch(exportBookedMealReportAsync(payload));

      if (response?.payload) {
        const data = response?.payload;

        if (data) {
          downloadCSV(data, "Final Payroll");
          toast.success("File Exported Successfully.");
          setSelectedRows([]);
          setFilterMenuAnchorEl(false);
          handleExportClose();
        }
      } else {
        console.error("Failed to export data:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  useEffect(() => {
    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      status:
        selectedOption === "Meal Booked"
          ? "booked"
          : selectedOption.toLowerCase(),
      mealType: selectedMeal.toLowerCase(),
    };
    if (filter) payload.sort = filter;
    if (search) payload.search = search;
    if (selectedFloor) payload.floorNumber = selectedFloor;
    if (selectedRoom) payload.roomNumber = selectedRoom.roomNumber;
    if (filter !== "custom" && filter && !IsoEndDateForExport) payload.sort = filter;
    if ((filter === "custom" && filter) || (filter === "custom" && filter && selectedMeal) ) payload.sort = filter;
    if (filter === "custom" && IsoStartDateForExport) payload.startDate = IsoStartDateForExport;
    if (filter === "custom" && IsoEndDateForExport) payload.endDate = IsoEndDateForExport;
    handleGetAllMessList(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMeal, filter, selectedOption, search, page, selectedRoom]);

  useEffect(() => {
    if (filterMenuAnchorEl) dispatch(getFloorNoByHostelIdAsync());
  }, [dispatch, filterMenuAnchorEl]);

  useEffect(() => {
    if (selectedFloor) {
      dispatch(getRoomNumberByFloorNumberAsync({ floorNumber: selectedFloor }));
    }
  }, [dispatch, selectedFloor]);

  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: "calc(100% - 270px)" },
          ml: { md: "270px", sm: 0 },
          p: 1,
          display: "flex",
          flexDirection: "column",
          zIndex: "-1",
        }}
      >
        <Box
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
                color: "#0E0031",
              }}
              onClick={handleOpenMenu}
            >
              {(selectedOption === "booked" && "Meal Booked") ||
                (selectedOption === "cancelled" && "Meal Cancelled") ||
                (selectedOption === "skipped" && "Meal Skipped") ||
                (selectedOption === "not booked" && "Non-Booked")}
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: "24px",
                  marginLeft: "6px",
                  color: "#0E0031",
                }}
              />
            </Typography>
            <Menu
              anchorEl={dropdownAnchor}
              open={Boolean(dropdownAnchor)}
              onClose={handleCloseMenu}
            >
              {mealBookoptions.map((option) => (
                <MenuItem
                  sx={{ color: "#0E0031", fontWeight: "700", fontSize: "14px" }}
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
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
                      boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                      borderImage:
                        selectedMeal === tab.value
                          ? "none"
                          : "linear-gradient(180deg, #674D9F , #FDFAFF ) 1",
                      backgroundColor:
                        selectedMeal === tab.value ? "#6B52AE" : "#fff",
                      color: selectedMeal === tab.value ? "#fff" : "#A9A9A9",
                    }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center">
                  <IconButton
                    sx={{ color: "#6B52AE", p: 0 }}
                    onClick={handleSearchClick}
                  >
                    <SearchIcon />
                  </IconButton>
                  {showSearch && (
                    <TextField
                      size="small"
                      placeholder="Type Search.."
                      variant="standard"
                      autoFocus
                      sx={{
                        width: 100,
                        transition: "width 0.3s ease-in-out",
                        "& .MuiInput-underline:before": {
                          borderBottom: "none",
                        },
                        "& .MuiInput-underline:after": { borderBottom: "none" },
                      }}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  )}
                </Box>

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
                  <MenuItem
                    onClick={() => handleSelectSortOptions("ascending")}
                  >
                    By Alphabet A-Z
                  </MenuItem>
                  <MenuItem onClick={() => handleSelectSortOptions("recent")}>
                    By Date (Recent)
                  </MenuItem>
                  <MenuItem onClick={() => handleSelectSortOptions("oldest")}>
                    By Date (Oldest)
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleSelectSortOptions("custom")}
                    // onClick={() => setOpenDialog(true)}
                  >
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
                          value={dateStart}
                          format="DD-MM-YYYY"
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
                          value={dateEnd}
                          format="DD-MM-YYYY"
                          minDate={dayjs(dateStart)}
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
                      disabled={!(dateStart && dateEnd)}
                      onClick={handleApplyCustomFilter}
                      color="primary"
                    >
                      Apply
                    </Button>
                  </DialogActions>
                </Dialog>

                <Box sx={{ display: "flex" }}>
                  {/* Filter Icon */}
                  <IconButton onClick={handleFilterMenuOpen} sx={{ p: 0 }}>
                    <FilterListIcon
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "20px",
                          md: "22px",
                          lg: "24px",
                        },
                      }}
                    />
                  </IconButton>

                  {/* Floor & Room Filter */}
                  <Menu
                    anchorEl={filterMenuAnchorEl}
                    open={Boolean(filterMenuAnchorEl)}
                    onClose={handleFilterMenuClose}
                  >
                    <Box
                      sx={{
                        p: 2,
                        width: 300,
                      }}
                    >
                      <TextField
                        sx={{ height: "40px", mb: 1, mt: -1 }}
                        size="small"
                        fullWidth
                        variant="standard"
                        label="FILTERS"
                        onChange={handleSearchFloorData}
                      />

                      {/* Floor Selection */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: "#0E0031",
                          mb: 1,
                          textAlign: "left",
                        }}
                      >
                        Floor
                      </Typography>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "repeat(5, 1fr)",
                            lg: "repeat(6, 1fr)",
                          },
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {isFloorLoading ? (
                          <Box sx={{ width: "100%", height: "100%" }}>
                            <CircularProgress />
                          </Box>
                        ) : filteredFloorData.length === 0 ? (
                          <Box
                            sx={{
                              width: "300px",
                              height: "100%",
                              textAlign: "center",
                            }}
                          >
                            <Typography>No floors are available!</Typography>
                          </Box>
                        ) : (
                          filteredFloorData?.map((f) => (
                            <Button
                              key={f.floorNumber}
                              variant={
                                selectedFloor === f.floorNumber
                                  ? "contained"
                                  : "outlined"
                              }
                              // onClick={() => handleFloorChange(f)}
                              onClick={() => handleFloorChange(f)}
                              sx={{
                                width: 35,
                                height: 35,
                                borderRadius: "60%",
                                minWidth: "unset",
                                fontSize: "14px",
                                padding: 0, // Remove padding
                                border: "1px solid #0E0031", // Add a border to match the style
                                color:
                                  selectedFloor === f.floorNumber
                                    ? "white"
                                    : "#674D9F", // Set text color based on selected state
                                backgroundColor:
                                  selectedFloor === f.floorNumber
                                    ? "#674D9F"
                                    : "transparent", // Set background based on selected state
                              }}
                            >
                              {f.floorNumber}
                            </Button>
                          ))
                        )}
                      </Box>

                      {/* Room Number Selection */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mt: 1.5,
                          fontWeight: "bold",
                          color: "#0E0031", // Match the color of text
                          mb: 1, // Add margin-bottom
                          textAlign: "left", // Align text
                        }}
                      >
                        Room Number
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "repeat(5, 1fr)",
                            lg: "repeat(6, 1fr)",
                          },
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {isRoomLoading ? (
                          <Box sx={{ width: "100%", height: "100%" }}>
                            <CircularProgress />
                          </Box>
                        ) : getRoomNumberByFloorNumber.length === 0 ||
                          filteredFloorData.length === 0 ? (
                          <Box
                            sx={{
                              width: "300px",
                              height: "100%",
                              textAlign: "center",
                            }}
                          >
                            <Typography>No rooms are available !</Typography>
                          </Box>
                        ) : (
                          getRoomNumberByFloorNumber?.map((room) => (
                            // filteredRoomData?.map((room) => (
                            <Grid item xs={3} key={room}>
                              <Button
                                variant={
                                  selectedRoom.roomNumber === room?.roomNumber
                                    ? "contained"
                                    : "outlined"
                                }
                                onClick={() => handleRoomSelect(room)}
                                sx={{
                                  width: 35,
                                  height: 35,
                                  minWidth: "unset", // Remove default minWidth
                                  padding: 0, // Remove padding
                                  borderRadius: "10px",
                                  fontSize: "14px",
                                  backgroundColor:
                                    selectedRoom.roomNumber === room?.roomNumber
                                      ? "#674D9F"
                                      : "transparent",
                                  color:
                                    selectedRoom.roomNumber === room?.roomNumber
                                      ? "white"
                                      : "#674D9F",
                                  border: "1px solid #0E0031",
                                }}
                              >
                                {room?.roomNumber}
                              </Button>
                            </Grid>
                          ))
                        )}
                      </Box>
                    </Box>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Table container */}
        <TableContainer
          sx={{
            width: "100%",
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "20px", // Applies 20px radius to all corners
            borderImage: "linear-gradient(180deg, #9B7BC6, #FDFAFF) 1",
            boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
            marginBottom: "80px",
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
                  <TableCell
                    sx={{
                      fontWeight: "500",
                      fontSize: "16px",
                      color: "#0E0031",
                    }}
                    key={index}
                    align="left"
                  >
                    {item.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isMessLoading ? (
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
              ) : getAllMessList?.length === 0 ? (
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
                // Data Available State
                getAllMessList?.map((item, index) => (
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
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      {item.uniqueId || "--"}
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>
                      <Box
                        display="flex"
                        alignItems="center"
                        onMouseEnter={(event) =>
                          handleMouseEnter(event, item._id)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            marginRight: 1,
                            zIndex: -2,
                          }}
                          src={item?.image || undefined}
                          alt={item?.name}
                        >
                          {item?.image
                            ? null
                            : item?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" color="text.primary">
                          {item?.name || "-"}
                        </Typography>
                        <ProfilePopOver
                          profileView="mess"
                          isPopoverOpen={Boolean(profilePopoverAnchor)}
                          row={item}
                          profilePopoverAnchor={profilePopoverAnchor}
                          handleMouseLeave={handleMouseLeave}
                          hoveredRowId={hoveredRowId}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ minWidth: { sm: 190, xs: 150 } }}>
                      {(item.bookedOn &&
                        `${dayjs(item.bookedOn)
                          .utc()
                          .format("Do MMM, YYYY")} | ${dayjs(item.bookedOn)
                          .utc()
                          .format("hh:mm A")}`) ||
                        "--"}
                    </TableCell>
                    <TableCell sx={{ minWidth: { sm: 190, xs: 150 } }}>
                      {(item.date &&
                        `${dayjs(item.date)
                          .utc()
                          .format("Do MMM, YYYY")} | ${dayjs(item.date)
                          .utc()
                          .format("hh:mm A")}`) ||
                        "--"}
                    </TableCell>
                    {/* <TableCell>{item.roomNumber || "--"}</TableCell> */}
                    <TableCell sx={{ minWidth: 150 }}>
                      {item.mealType || "--"}
                    </TableCell>
                    <TableCell sx={{ minWidth: 80 }}>{`${
                      item.floorNumber || "--"
                    } / ${item.roomNumber || "--"}`}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRowDetailsPage(item)}>
                        <Box
                          component="img"
                          src={Edit}
                          alt="Edit"
                          sx={{
                            width: 20,
                            height: 20,
                            objectFit: "cover",
                          }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <CustomPagination
            rowsPerPage={rowsPerPage}
            page={page}
            count={totalDataCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            minWidth="100%"
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
                  disabled={!isAllSelected || getAllMessList.length === 0}
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
        <MessSideDrawer
          drawerOpen={drawerOpen}
          handleCloseDrawer={handleCloseDrawer}
          isFullScreen={isFullScreen}
          isSmallScreen={isSmallScreen}
          selectedRow={selectedRow}
          handleExpandToFullPage={handleExpandToFullPage}
          handleRowDetailsPage={handleRowDetailsPage}
        />
      </Box>
    </>
  );
};

export default MessManagementTable;
