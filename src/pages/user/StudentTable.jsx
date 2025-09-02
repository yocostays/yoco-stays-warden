/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import React from "react";
import TableLoader from "@components/tableLoader/TableLoader";
import { useTheme } from "@emotion/react";
import { getLeaveManagementList } from "@features/leave/leaveSlice";
import {
  ArticleOutlined,
  AssignmentOutlined,
  EmojiEventsOutlined,
  EventOutlined,
} from "@mui/icons-material";
// import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
// import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Box,
  Button,
  // Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CustomPagination from "../leave/components/table/customPagination/CustomPagination";
import CustomTableContainer from "../leave/components/table/CustomTableContainer";
import CustomTableHead from "../leave/components/table/CustomTableHead";
import SideDrawer from "../leave/components/tableComponent/SideDrawer";
import LeaveActionSection from "@pages/leave/components/LeaveActionSection";
import LeaveTableRow from "@pages/leave/components/LeaveTableRow";

function StudentTable({ type, onTypeChange }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

  // permission access
  const location = useLocation();
  // const searchQuery = location.state?.searchQuery || "";
  const { permittedRoutes } = useSelector((state) => state?.permission);
  // const [pagePermission, setPagePermission] = useState([]);

  // const [selectedTab, setSelectedTab] = useState("Tab1");
  const tabs = ["All", "Active", "In-Active","Authorize", "Left Out","New"];
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [floor, setFloor] = useState("G"); // Default floor
  // const [roomSearch, setRoomSearch] = useState(""); // Search text for rooms
  // const [selectedRoom, setSelectedRoom] = useState(null); // Selected room number
  // const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar
  const [selectedTab, setSelectedTab] = useState("All"); // Default tab
  // Define tabs for different options

  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  // // Dummy data for room numbers
  // const dummyRooms = ["01", "02", "03", "04", "05", "06", "07", "..."];
  // // Handles floor selection
  // const handleFloorChange = (newFloor) => {
  //   setFloor(newFloor);
  // };

  // // Handles room search
  // const handleRoomSearchChange = (event) => {
  //   setRoomSearch(event.target.value);
  // };

  // // Filters room numbers based on the search input
  // const filteredRooms = dummyRooms.filter((room) =>
  //   roomSearch ? room.includes(roomSearch) : false
  // );

  // const handleRoomSelect = (room) => {
  //   if (room === "...") {
  //     setShowSearchBar(!showSearchBar); // Toggle search bar
  //   } else {
  //     setSelectedRoom(room);
  //     setRoomSearch(""); // Clear the search input
  //     setShowSearchBar(false); // Hide search bar
  //     handleFilterMenuClose();
  //   }
  // };

  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget); // Opens the menu at the button's position
  // };

  // const handleClose = () => {
  //   setAnchorEl(null); // Closes the menu
  // };

  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Hostel Admins"); // Default selected value

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
    setSelectedOption(option); // Update selected option
        setSelectedTab("All"); // Reset tab to "All" when option changes

    handleCloseMenu(); // Close the menu
  };
  useEffect(() => {
    if (permittedRoutes) {
      const path = location.pathname.substring(1); // Remove leading '/' to match the link
      const selectedRoute = permittedRoutes?.find(
        (route) => route?.link === path
      );

      if (selectedRoute) {
        // setPagePermission(selectedRoute);
      }
    }
  }, [location.pathname, permittedRoutes]);

  const { leaveManagementList, count, isLeaveLoading } = useSelector(
    (state) => state?.leave
  );
  const leaveStatusEnum = [
    { status: "leave", statusCount: count?.leaveCount },
    { status: "day out", statusCount: count?.dayOutCount },
    { status: "late coming", statusCount: count?.lateComingCount },
  ];

  // const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState(
    leaveStatusEnum[0]?.status
  );
  const [selectedStatusCount, setSelectedStatusCount] = useState(
    count?.leaveCount
  );

  // States for paggination
  const [page, setPage] = useState(0); // State for pagination page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page

  // Handlers for Filter icon menu
  // const handleFilterMenuOpen = (event) => {
  //   setFilterMenuAnchorEl(event.currentTarget);
  // };

  // const handleFilterMenuClose = () => {
  //   setFilterMenuAnchorEl(null);
  // };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [drawerOpen, setDrawerOpen] = useState(false); // State to control drawer
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row's data

  const handleRowDetailsPage = (row) => {
    setSelectedRow(row); // Set the row data for the drawer
    // setIsFullPage(false); // Open in normal drawer mode initially
    setDrawerOpen(true); // Open the drawer
  };

  const handleExpandToFullPage = () => {
    // setIsFullPage(true); // Expand the drawer to full page
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
    setSelectedRow(null); // Clear the selected row
    // setIsFullPage(false); // Reset to normal drawer for next open
  };

  const [profilePopoverAnchor, setProfilePopoverAnchor] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  let timeoutId = null;

  const handleMouseEnter = (event, rowId) => {
    clearTimeout(timeoutId); // Clear the timeout if the mouse re-enters
    setHoveredRowId(rowId);
    setProfilePopoverAnchor(event.currentTarget);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setHoveredRowId(null);
      setProfilePopoverAnchor(null);
    }, 300);
  };

  const { leaveDataById } = useSelector((state) => state?.leave);

  const {
    uniqueId,

    // name, email, phone,
    Description,
    Reason,

    // hostelName, roomNumber,
    startDate,
    endDate,
    // updateLogs,

    // leaveStatus
  } = leaveDataById;

  const userData = [
    { label: "Leave ID", value: uniqueId, icon: <AssignmentOutlined /> },
    {
      label: "Check-In",
      value: dayjs(startDate).format("DD-MM-YYYY") || "-",
      icon: <EventOutlined />,
    },
    {
      label: "Check-Out",
      value: dayjs(endDate).format("DD-MM-YYYY") || "-",
      icon: <EventOutlined />,
    },
    { label: "Reason", value: Reason, icon: <EmojiEventsOutlined /> },
    { label: "Description", value: Description, icon: <ArticleOutlined /> },
  ];

  // selection
  const [selectedRows, setSelectedRows] = useState([]);
  const allSelected = selectedRows.length === leaveManagementList.length;

  // Handle "Select All" checkbox toggle
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(leaveManagementList.map((row) => row._id));
    } else {
      setSelectedRows([]);
    }
  };

  const selectedCount = selectedRows.length;
  const totalCount = leaveManagementList.length;

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

  useEffect(() => {
    if (selectedUser?.isHostelAssigned) {
      dispatch(
        getLeaveManagementList({
          page: page + 1,
          limit: rowsPerPage,
          status: selectedStatus,
        })
      );
    }
  }, [
    dispatch,
    page,
    rowsPerPage,
    selectedStatus,
    selectedStatusCount,
    selectedUser?.isHostelAssigned,
  ]);

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
    { label: "YOCO ID", align: "left" },
    { label: "Name", align: "left" },
    { label: "Floor & Room", align: "left" },
    { label: "Contact No. ", align: "left" },
    { label: "Joining Date", align: "left" },
    { label: "Status", align: "left" },
    { label: "Off/On", align: "left" },
  ];

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Text and Arrow */}
          <Typography
            sx={{
              fontSize: "20px", // Font size for the text
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize", // Capitalize the text
              cursor: "pointer", // Pointer cursor for interactivity
            }}
            onClick={handleOpenMenu} // Function to open the menu
          >
            {selectedOption}
            <KeyboardArrowDownIcon
              sx={{
                fontSize: "24px", // Arrow size
                marginLeft: "6px", // Space between text and arrow
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
                border: "2px solid #ccc", // Border for the menu
                borderRadius: "8px", // Rounded corners (optional)
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for a clean look
              },
            }}
          >
            <MenuItem
              onClick={() => handleSelectOption("Hostel Admins")}
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              Hostel Admins{" "}
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectOption("Hostel Staff")}
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              Hostel Staff{" "}
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectOption("Hostel Student")}
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              hostel Student{" "}
            </MenuItem>
          </Menu>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          borderRadius={2}
        >
          {/* Tabs */}
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "column" : "row"} // Switch direction on small screens
            gap={isSmallScreen ? 2 : 1} // Adjust gap for smaller screens
            alignItems={isSmallScreen ? "stretch" : "center"} // Full width alignment for small screens
          >
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="outlined"
                onClick={() => setSelectedTab(tab)}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: 1, // Rounded corners
                  padding: "6px 16px",
                  borderWidth: "2px", // Thicker border
                  borderStyle: "solid",
                  boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                  borderImage:
                    selectedTab === tab
                      ? "none" // No gradient border when selected
                      : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1", // Half purple, half white border
                  backgroundColor: selectedTab === tab ? "#6B52AE" : "#fff", // Purple background for selected
                  color: selectedTab === tab ? "#fff" : "#A9A9A9", // White text for selected, gray for unselected
                }}
              >
                {tab}
              </Button>
            ))}
          </Box>

          {/* Actions */}
          <Box display="flex" alignItems="center" gap={1}>
            <Box display="flex" alignItems="center">
              {/* Search Icon */}
              <IconButton sx={{ color: "#6B52AE" }} onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
              {/* Small Search Field */}
              {showSearch && (
                <TextField
                  size="small"
                  placeholder="Type Search.."
                  variant="standard"
                  autoFocus
                  sx={{
                    width: 100, // Adjust width as needed
                    transition: "width 0.3s ease-in-out", // Smooth open/close animation
                    "& .MuiInput-underline:before": { borderBottom: "none" }, // No underline
                    "& .MuiInput-underline:after": { borderBottom: "none" }, // No underline on focus
                  }}
                  onBlur={() => setShowSearch(false)} // Hide on losing focus
                />
              )}
            </Box>
            
          </Box>
        </Box>
      </Box>
      {isLeaveLoading ? (
        <TableLoader />
      ) : (
        <>
          <CustomTableContainer>
            <CustomTableHead
              columns={customColumns}
              allSelected={allSelected}
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
          </CustomTableContainer>
          <CustomPagination
            rowsPerPage={rowsPerPage}
            page={page}
            count={count}
            selectedStatusCount={selectedStatusCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          >
            {selectedCount > 0 && (
              <LeaveActionSection
                selectedCount={selectedCount}
                // onAddRemark={handleAddRemark}
                // onApprove={handleApprove}
                // onReject={handleReject}
              />
            )}
          </CustomPagination>
        </>
      )}
      {/* Drawer */}
      <SideDrawer
        leaveDataById={leaveDataById}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        selectedRow={selectedRow}
        handleExpandToFullPage={handleExpandToFullPage}
        userData={userData}
        updateLogs={updateLogs}
      />
    </Box>
  );
}

export default StudentTable;

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
