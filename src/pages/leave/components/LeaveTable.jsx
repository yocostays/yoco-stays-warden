/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TableLoader from "@components/tableLoader/TableLoader";
import { useTheme } from "@emotion/react";
import {
  exportLeaveReportAsync,
  getLeaveDataById,
  getLeaveManagementList,
  getReduxEndDate,
  getReduxStartDate,
} from "@features/leave/leaveSlice";
import {
  ArticleOutlined,
  AssignmentOutlined,
  EventOutlined,
} from "@mui/icons-material";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LeaveActionSection from "./LeaveActionSection";
import LeaveTableRow from "./LeaveTableRow";
import CustomPagination from "./table/customPagination/CustomPagination";
import CustomTableContainer from "./table/CustomTableContainer";
import CustomTableHead from "./table/CustomTableHead";
import SideDrawer from "./tableComponent/SideDrawer";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import moment from "moment";
import { downloadCSV } from "@utils/downloadCSV";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  getFloorNoByHostelIdAsync,
  getRoomNumberByFloorNumberAsync,
} from "@features/hostel/hostelApi";
import {
  // ClearSelectedFloorDetails,
  ClearSelectedRoomDetails,
} from "@features/hostel/hostelSlice";

function LeaveTable({ type, onTypeChange }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

  // permission access
  const location = useLocation();
  const {
    getFloorNoByHostelId,
    getRoomNumberByFloorNumber,
    isRoomLoading,
    isFloorLoading,
  } = useSelector((state) => state.hostel);

  const { permittedRoutes } = useSelector((state) => state?.permission);
  const {
    leaveManagementList,
    leaveDataById,
    count,
    isLeaveLoading,
    reduxStartDate,
    reduxEndDate,
  } = useSelector((state) => state?.leave);

  const tabs = ["All", "Approved", "Rejected", "Pending"];

  const leaveStatusEnum = [
    { status: "leave", statusCount: count?.leaveCount },
    { status: "day out", statusCount: count?.dayOutCount },
    { status: "late coming", statusCount: count?.lateComingCount },
  ];
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // States for paggination
  const [selectedTab, setSelectedTab] = useState("All");
  const [page, setPage] = useState(0); // State for pagination page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const [selectedRoom, setSelectedRoom] = useState(""); // Selected room number
  const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const openExport = Boolean(exportAnchorEl);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Leave Request");
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control drawer
  const [selectedRow, setSelectedRow] = useState(null);
  const [profilePopoverAnchor, setProfilePopoverAnchor] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [searchFloorNumber, setSearchFloorNumber] = useState("");
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(
    leaveStatusEnum[0]?.status || null
  );
  const [selectedStatusCount, setSelectedStatusCount] = useState(
    count?.leaveCount
  );

  // Custom Variables --------------------------------
  const selectedCount = selectedRows.length;
  const totalCount = leaveManagementList.length;
  const isAllSelected = selectedRows.length === leaveManagementList.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < leaveManagementList.length;

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
  // -----------------------------------

  // ----------------------- Filter Functions --------------------------------

  // Floor and Room Filter Functions --------------------------------
  const handleSearchFloorData = (event) => {
    setSearchFloorNumber(event.target.value);
  };

  // Filter data based on search text
  const filteredFloorData = getFloorNoByHostelId.filter((item) =>
    item.floorNumber.toString().includes(searchFloorNumber)
  );

  const handleExportOpen = (event) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null); // Closes the menu
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

  // Function to perform when a floor is selected              // Required Later
  // const performSelectFunction = (floor) => {
  //   console.log("Selected Floor:", floor.floorNumber);
  //   // Add your logic for when a floor is selected
  // };

  // Function to perform when a floor is unselected
  const performUnselectFunction = () => {
    dispatch(ClearSelectedRoomDetails());
    setSelectedRoom("");
    handleFilterMenuClose();
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

  const handleClearAllOptions = () => {
    // setSelectedRows([]);
    // setSearchText("");
    // setSearchFloorNumber("");
    setSelectedFloor("");
    setSortOption("");
    setCustomStartDate(null);
    setCustomEndDate(null);
    // setSelectedStatus(leaveStatusEnum[0]?.status);
    // setSelectedStatusCount(count?.leaveCount);
    // handleFilterMenuClose();
  };

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value); // Update the search text in real-time
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    handleClose();

    if (option === "custom") {
      setOpenDialog(true);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null); // Closes the menu
  };

  // Open the dropdown menu
  const handleOpenMenu = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  // Close the dropdown menu
  const handleCloseMenu = () => {
    setDropdownAnchor(null);
  };

  // Handle menu item selection
  const handleSelectOption = (option) => {
    const updatedOption = option === "leave" ? "Leave Request" : option;

    setSelectedOption(updatedOption); // Update selected option
    handleCloseMenu(); // Close the menu
  };

  const handleApplyCustomFilter = () => {
    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      status: selectedOption === "Leave Request" ? "leave" : selectedOption,
      leaveStatus: selectedTab.toLocaleLowerCase(),
      search: searchText,
    };

    if (sortOption !== "custom") payload.sort = sortOption;
    if (sortOption === "custom") payload.sort = "custom";
    if (sortOption === "custom") payload.startDate = IsoStartDate;
    if (sortOption === "custom") payload.endDate = IsoEndDate;
    dispatch(getLeaveManagementList(payload));
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setCustomStartDate(null);
    setCustomEndDate(null);
    setOpenDialog(false);
    handleClose();
  };

  // Handlers for Filter icon menu
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelecteStartDate = (date) => {
    setCustomStartDate(date);
    dispatch(getReduxStartDate(date));
  };

  const handleSelecteEndDate = (date) => {
    setCustomEndDate(date);
    dispatch(getReduxEndDate(date));
  };

  const handleRowDetailsPage = (row) => {
    dispatch(getLeaveDataById(row));
    setSelectedRow(row);
    setDrawerOpen(true); // Open the drawer
  };

  const handleExpandToFullPage = () => {
    setIsFullScreen((prev) => !prev); // Expand the drawer to fullscreen
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
    setSelectedRow(null); // Clear the selected row
    setIsFullScreen(false); // Reset fullscreen mode
  };

  const handleMouseEnter = (event, rowId) => {
    setHoveredRowId(rowId);
    setProfilePopoverAnchor(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setHoveredRowId(null);
    setProfilePopoverAnchor(null);
  };

  const onExportExcel = async (type) => {
    try {
      const payload = {
        type,
        leaveStatus: selectedTab.toLocaleLowerCase(),
        leaveType:
          selectedOption === "Leave Request" ? "leave" : selectedOption,
      };

      if (searchText) payload.search = searchText;
      if (selectedFloor) payload.floorNumber = selectedFloor;
      if (selectedRoom) payload.roomNumber = selectedRoom.roomNumber;
      if (selectedRows && type === "individual")
        payload.leaveIds = selectedRows;
      if (sortOption !== "custom") payload.sort = sortOption;
      if (sortOption === "custom") payload.sort = "custom";
      if (sortOption === "custom" && IsoStartDateForExport)
        payload.startDate = IsoStartDateForExport;
      if (sortOption === "custom" && IsoEndDateForExport)
        payload.endDate = IsoEndDateForExport;

      // Dispatch the export action
      const response = await dispatch(exportLeaveReportAsync(payload));

      if (response?.payload) {
        const data = response?.payload;

        if (data) {
          downloadCSV(data, "Leave Report");
          toast.success("File Exported Successfully.");
          setSelectedRows([]);
          handleExportClose();
          dispatch(getReduxStartDate(null));
          dispatch(getReduxEndDate(null));
          handleClearAllOptions();
        }
      } else {
        console.error("Failed to export data:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const { ticketId, description, categoryName, startDate, endDate, leaveType } =
    leaveDataById;

  const userData = [
    { label: "Leave ID", value: ticketId, icon: <AssignmentOutlined /> },
    {
      label: "Check-Out",
      value: moment(startDate).format("DD MMM YYYY | hh:mm A") || "-",
      icon: <EventOutlined />,
    },
    {
      label: "Check-In",
      value: moment(endDate).format("DD MMM YYYY | hh:mm A") || "-",
      icon: <EventOutlined />,
    },
    {
      label: "Reason",
      value: (leaveType === "late coming" && description) || categoryName,
      icon: <ExtensionOutlinedIcon />,
    },
    { label: "Description", value: description, icon: <ArticleOutlined /> },
  ];

  // Handle "Select All" checkbox toggle
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all row IDs
      setSelectedRows(leaveManagementList.map((row) => row._id));
    } else {
      // Deselect all
      setSelectedRows([]);
    }
  };

  // Handle individual row checkbox toggle
  const handleRowSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((rowId) => rowId !== id)
      );
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  // Clear selection function
  const handleClearSelection = () => {
    setSelectedRows([]);
  };

  const handlegetLeaveManagementList = () => {
    if (
      selectedUser?.isHostelAssigned ||
      sortOption !== "custom" ||
      selectedRoom
    ) {
      const payload = {
        page: page + 1,
        limit: rowsPerPage,
        status: selectedOption === "Leave Request" ? "leave" : selectedOption,
        leaveStatus: selectedTab.toLocaleLowerCase(),
        search: searchText,
      };

      if (sortOption !== "custom") payload.sort = sortOption;
      if (selectedFloor) payload.floorNumber = selectedFloor;
      if (selectedRoom) payload.roomNumber = selectedRoom.roomNumber;

      dispatch(getLeaveManagementList(payload));
    }
  };

  useEffect(() => {
    handlegetLeaveManagementList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    page,
    rowsPerPage,
    selectedStatus,
    selectedStatusCount,
    selectedUser?.isHostelAssigned,
    selectedTab,
    selectedOption,
    searchText,
    sortOption,
    selectedRoom,
  ]);

  useEffect(() => {
    if (permittedRoutes) {
      const path = location.pathname.substring(1);
      const selectedRoute = permittedRoutes?.find(
        (route) => route?.link === path
      );

      if (selectedRoute) {
        // setPagePermission(selectedRoute);
      }
    }
  }, [location.pathname, permittedRoutes]);

  useEffect(() => {
    if (type) {
      onTypeChange(null);
      setSelectedStatus(type);
      setSelectedStatusCount(
        leaveStatusEnum.find((item) => item.status === type)?.statusCount
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, onTypeChange]);

  const customColumns = [
    { label: "YocoId", align: "left" },
    { label: "Name", align: "left" },
    { label: "Created On", align: "left" },
    { label: "Check-Out", align: "left" },
    { label: "Check-In", align: "left" },
    { label: "Duration", align: "left" },
    { label: "Reason", align: "left" },
    { label: "Floor & Room", align: "left" },
    { label: "Status", align: "left" },
    { label: "Action", align: "left" },
  ];

  // Step 2: Filter the leaveManagementList to find matching entries
  const hasApprovedOrRejected = leaveManagementList.some(
    (entry) =>
      selectedRows.includes(entry._id) &&
      (entry.leaveStatus === "approved" || entry.leaveStatus === "rejected")
  );

  useEffect(() => {
    dispatch(getFloorNoByHostelIdAsync());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFloor) {
      dispatch(getRoomNumberByFloorNumberAsync({ floorNumber: selectedFloor }));
    }
  }, [dispatch, selectedFloor]);

  return (
    <Box m={1}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{
          border: "2px solid #674D9F",
          borderBottom: "none",
          flexWrap: "wrap",
          borderRadius: "20px 20px 0px 0px",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
          <Grid item xs={2} sm={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Text and Arrow */}
              <Typography
                sx={{
                  fontSize: { sm: "16px", xs: "10px" },
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
                onClick={handleOpenMenu}
              >
                {selectedOption}
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: "24px",
                    //marginLeft: "6px", // Space between text and arrow
                    color: "#0E0031", // Inherit text color
                  }}
                />
              </Typography>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={dropdownAnchor}
                open={Boolean(dropdownAnchor)}
                onClose={handleCloseMenu}
                sx={{
                  "& .MuiPaper-root": {
                    padding: "6px",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleSelectOption("leave")}
                  sx={{ fontSize: "14px", fontWeight: "600" }}
                >
                  Leave Requests
                </MenuItem>
                <MenuItem
                  onClick={() => handleSelectOption("late coming")}
                  sx={{ fontSize: "14px", fontWeight: "600" }}
                >
                  Late Coming
                </MenuItem>
                <MenuItem
                  onClick={() => handleSelectOption("day out")}
                  sx={{ fontSize: "14px", fontWeight: "600" }}
                >
                  Day/Night Out
                </MenuItem>
              </Menu>
            </Box>
          </Grid>

          <Grid item xs={10} sm={10}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              p={1}
              borderRadius={2}
            >
              {/* Tabs */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "flex-end",
                  gap: { xs: 0.3, sm: 0.3, lg: 1.5 },
                  flexWrap: "wrap",
                }}
              >
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="outlined"
                    onClick={() => setSelectedTab(tab)}
                    sx={{
                      minWidth: 40,
                      textTransform: "none",
                      fontSize: { sm: "14px", xs: "10px" },
                      fontWeight: 500,
                      borderRadius: 1, // Rounded corners
                      padding: { sm: "6px 16px", lg: "8px16px", xs: "2px 3px" },
                      borderWidth: "2px", // Thicker border
                      borderStyle: "solid",
                      boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                      borderImage:
                        selectedTab === tab
                          ? "none" // No gradient border when selected
                          : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1",
                      backgroundColor: selectedTab === tab ? "#6B52AE" : "#fff",
                      color: selectedTab === tab ? "#fff" : "#A9A9A9", // White text for selected, gray for unselected
                    }}
                  >
                    {tab}
                  </Button>
                ))}

                {/* Search Icon */}
                <IconButton
                  sx={{ color: "#6B52AE", p: 0 }}
                  onClick={handleSearchClick}
                >
                  <SearchIcon
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

                {/* Small Search Field */}
                {showSearch && (
                  <TextField
                    size="small"
                    placeholder="Type Search.."
                    variant="standard"
                    autoFocus
                    sx={{
                      width: 100,
                      transition: "width 0.3s ease-in-out",
                      "& .MuiInput-underline:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" },
                    }}
                    value={searchText}
                    onChange={handleSearchChange}
                  />
                )}

                <IconButton
                  sx={{ color: open ? "#6B52AE" : "#A9A9A9", p: 0 }} // Purple when open, grey otherwise
                  onClick={handleClick}
                >
                  <SwapVertIcon
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

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      border: "2px solid #D3D3D3", // Light grey border
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
                  <MenuItem onClick={() => handleSortChange("ascending")}>
                    By Alphabet A-Z
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange("recent")}>
                    By Date (Recent)
                  </MenuItem>
                  <MenuItem onClick={() => handleSortChange("oldest")}>
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
                          value={startDate}
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
                          value={customEndDate}
                          format="DD-MM-YYYY"
                          minDate={dayjs(customStartDate)}
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

                {/* File Export */}
                <Box sx={{ px: 1 }}>
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
                      // disabled={!isAllSelected}
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {isLeaveLoading ? (
        <TableLoader />
      ) : (
        <>
          <CustomTableContainer>
            <Box
              sx={{
                position: "relative",
                overflow: "auto", // Allow scrolling if needed
                scrollbaridth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar in WebKit browsers (Chrome, Safari, Edge)
                },
              }}
            >
              <Table
                style={{
                  width: "100%", // Table takes full width of the container
                  tableLayout: "auto", // Columns adjust based on content
                  borderCollapse: "collapse", // Remove space between table cells
                }}
              >
                <CustomTableHead
                  columns={customColumns}
                  isAllSelected={isAllSelected}
                  isIndeterminate={isIndeterminate}
                  selectedRows={selectedRows}
                  leaveManagementList={leaveManagementList}
                  handleSelectAll={handleSelectAll}
                  selectedCount={selectedCount}
                  totalCount={totalCount}
                />
                <LeaveTableRow
                  leaveManagementList={leaveManagementList}
                  isRowSelected={isRowSelected}
                  handleRowSelect={handleRowSelect}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  profilePopoverAnchor={profilePopoverAnchor}
                  hoveredRowId={hoveredRowId}
                  handleRowDetailsPage={handleRowDetailsPage}
                  selectedRows={selectedRows}
                />
              </Table>
            </Box>
          </CustomTableContainer>
          <CustomPagination
            rowsPerPage={rowsPerPage}
            page={page}
            count={count}
            selectedStatusCount={selectedStatusCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            display="flex"
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {selectedCount > 0 &&
                selectedRows.length > 0 &&
                !hasApprovedOrRejected && (
                  <LeaveActionSection
                    selectedCount={selectedCount}
                    selectedRows={selectedRows}
                    onClearSelection={handleClearSelection}
                    currentPage={page}
                    currentRowsPerPage={rowsPerPage}
                    currentSelectedOption={selectedOption}
                    currentSelectedTab={selectedTab}
                    currentSearchText={searchText}
                    currentSortOption={sortOption}
                    currentSelectedFloor={selectedFloor}
                    currentSelectedRoom={selectedRoom}
                    currentCustomStartDate={customStartDate}
                    currentCustomEndDate={customEndDate}
                  />
                )}
            </Box>
          </CustomPagination>
        </>
      )}

      {/* Drawer */}
      <SideDrawer
        leaveDataById={leaveDataById}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedRow={selectedRow}
        isFullScreen={isFullScreen} // Pass fullscreen state
        isSmallScreen={isSmallScreen}
        handleExpandToFullPage={handleExpandToFullPage}
        userData={userData}
        updateLogs={updateLogs}
        handleRowDetailsPage={handleRowDetailsPage}
        // Pass current filter parameters for API refresh
        currentPage={page}
        currentRowsPerPage={rowsPerPage}
        currentSelectedOption={selectedOption}
        currentSelectedTab={selectedTab}
        currentSearchText={searchText}
        currentSortOption={sortOption}
        currentSelectedFloor={selectedFloor}
        currentSelectedRoom={selectedRoom}
        currentCustomStartDate={customStartDate}
        currentCustomEndDate={customEndDate}
        onClearSelection={handleClearSelection}
      />
    </Box>
  );
}

export default LeaveTable;

const updateLogs = [
  {
    yocoId: "Y123",
    approvalStatus: "approved",
    name: "John Doe",
    date: "2024-12-15",
    leaveStatus: "approved",
    remark: "Approved by manager",
  },
  {
    yocoId: "Y124",
    approvalStatus: "pending",
    name: "Jane Smith",
    date: "2024-12-16",
    leaveStatus: "pending",
    remark: "Awaiting confirmation",
  },
  {
    yocoId: "Y125",
    approvalStatus: "rejected",
    name: "Bob Brown",
    date: "2024-12-17",
    leaveStatus: "rejected",
    remark: "Insufficient leave balance",
  },
  {
    yocoId: "Y126",
    approvalStatus: "approved",
    name: "Alice White",
    date: "2024-12-18",
    leaveStatus: "approved",
    remark: "Leave approved by HR",
  },
];
