import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useTheme } from "@mui/material/styles";
import {
  appLogout,
  logout,
  refreshAuthToken,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAssignedHostelList } from "../../features/users/userSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import DownloadSample from "@pages/newmessmanagement/components/DownloadSample";
import DurationAndSearchForNav from "@pages/leave/components/DurationAndSearchForNav";

let debounceTimeout;

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [hostelAnchorEl, setHostelAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const open = Boolean(anchorEl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);

  // const handleDropdownClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleDropdownMenuClick = (event) => {
    setDropdownAnchorEl(event.currentTarget); // Open the dropdown menu
  };

  const handleDropdownMenuClose = () => {
    setDropdownAnchorEl(null); // Close the dropdown menu
  };

  const handleAddStaff = () => {
    navigate("/user/create-staff"); // Redirect to "Add Staff" page
    handleDropdownMenuClose();
  };

  const handleAddStudent = () => {
    navigate("/user/create-student"); // Redirect to "Add Student" page (replace with actual path)
    handleDropdownMenuClose();
  };

  const handleClick = () => {
    navigate("/newmessmanagement/addmenu");
  };

  // -------------------------------- local search testing start --------------------------------

  const handleKeyUp = (e) => {
    const value = e.target.value;

    // Clear the previous timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout to update the search query after 1 second
    debounceTimeout = setTimeout(() => {
      setSearchQuery(value);

      // Pass search query to the current route's state
      navigate(location.pathname, {
        state: { searchQuery: value },
      });
    }, 1000);
  };

  // Clear searchQuery on URL change
  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  // -------------------------------- local search testing end ----------------------------------

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectHostelList = useSelector((store) => store?.users);
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

  const hostelOptions = selectHostelList?.hostelList?.map((hostel) => ({
    name: hostel?.name,
    id: hostel?._id,
    activeHostel: hostel?.activeHostel,
    address: hostel?.address,
  }));

  const [selectedHostel, setSelectedHostel] = useState("");
  const [selectedHostelAddress, setSelectedHostelAddress] = useState("");
  const [isHostelInitiallyLoaded, setIsHostelInitiallyLoaded] = useState(false);

  useEffect(() => {
    // Set the active hostel only on the initial load
    if (hostelOptions?.length > 0) {
      const activeHostel = hostelOptions?.find(
        (hostel) => hostel?.activeHostel === true
      );
      localStorage.setItem("hostelId", activeHostel?.id);
      if (activeHostel) {
        setSelectedHostel(activeHostel?.name);
        setSelectedHostelAddress(activeHostel?.address);
      }
      setIsHostelInitiallyLoaded(true); // Mark as loaded
    }
  }, [hostelOptions, isHostelInitiallyLoaded]); // Only trigger once

  const handleHostelSelect = async (hostel) => {
    setSelectedHostel(hostel.name);
    setSelectedHostelAddress(hostel.address);
    const HostelId = hostel.id;
    handleHostelMenuClose();
    try {
      // Create payload with hostelId as a key
      const payload = { hostelId: HostelId };

      // Dispatch the token refresh action with the payload
      const result = await dispatch(refreshAuthToken(payload)).unwrap();

      // Check the result structure (adjust based on your API response)
      if (result?.statusCode === 200) {
        console.log("Token refreshed successfully");
      } else {
        console.error("Unexpected status code or result structure", result);
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  };

  const handleHostelMenuClick = (event) => {
    setMenuOpen(true);
    setHostelAnchorEl(event.currentTarget); // Set the anchor for the hostel menu
  };

  // Handle closing the hostel menu
  const handleHostelMenuClose = () => {
    setHostelAnchorEl(null);
    setMenuOpen(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUserData(JSON.parse(data)); // Parse JSON data and set it to state
    }
    dispatch(getAssignedHostelList());
  }, [dispatch]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await dispatch(appLogout()); // Dispatch the async thunk for logout
      dispatch(logout()); // Call the synchronous logout reducer to clear state
      localStorage.removeItem("hostelId");
      localStorage.removeItem("permittedRoutes");
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const pageTitle = {
    "/user-management": "User Management",
    "/user": "User",
    "/rooms-and-bed": "Room and Bed",
    "/rooms-and-bed/details": "Room and Bed",
    "/rooms-and-bed/room-change-request": "Room Change Requests",
    "/fees": "Fee Revenue",
    "/fees/details": "Fee Revenue",
    "/attendance": "Attendance",
    "/attendance/details": "Attendance",
    "/maintenance": "Maintenance Management",
    "/maintenance/details": "Maintenance Management",
    "/visitors": "Visitor Management",
    "/visitors/details": "Visitor Details",
    "/laundry": "Laundry management",
    "/laundry/details": "Laundry management",
    "/mess": "Mess Management",
    "/mess/details": "Mess Management",
    "/mess/mess-management": "Mess Management",
    "/mess/like-dislike": "Mess Management",
    "/newmessmanagement": "New Mess Management",
    "/inventory": "Inventory Management",
    "/inventory/details": "Inventory Management",
    "/inventory/manage-details": "Inventory Management",
    "/leave": "Leave Management",
    "/leave/details": "Leave",
    "/emergency": "Emergency",
    "/emergency/details": "Emergency",
    "/parcel": "Parcel Management",
    "/feedbacks": "Suggestions",
    "/event": "Event Management",
    "/vehicle-pass": "Vehicle Pass",
    "/poll": "Parcel management",
    "/user-management/new-resident": "Create New Resident",
    "/no-permission": " ",
    "/chart-test": "Chart Test Page",
    "/user-management/edit-staff/:id": "Edit Staff",
    "/complaints": "Complaints",
  };

  const currentTitle = (() => {
    if (location.pathname.includes("/rooms-and-bed/")) {
      return "Rooms and Bed";
    } else if (location.pathname.includes("/fees/")) {
      return "Fee Revenue";
    } else if (location.pathname.includes("/attendance/")) {
      return "Attendance";
    } else if (location.pathname.includes("/maintenance/")) {
      return "Maintenance Management";
    } else if (location.pathname.includes("/visitors/")) {
      return "Visitor Management";
    } else if (location.pathname.includes("/laundry/")) {
      return "Laundry Management";
    } else if (location.pathname.includes("/mess/")) {
      return "Mess Management";
    } else if (location.pathname.includes("/newmessmanagement/")) {
      return "New Mess Management";
    } else if (location.pathname.includes("/inventory/")) {
      return "Inventory Management";
    } else if (location.pathname.includes("/leave/")) {
      return "Leave Management";
    } else if (location.pathname.includes("/emergency/")) {
      return "Emergency";
    } else if (location.pathname.includes("/parcel/")) {
      return "Parcel Management";
    } else if (location.pathname.includes("/feedbacks/")) {
      return "Suggestions";
    } else if (location.pathname.includes("/event/")) {
      return "Event Management";
    } else if (location.pathname.includes("/vehicle-pass/")) {
      return "Vehicle Pass";
    } else if (location.pathname.includes("/poll/")) {
      return "Parcel management";
    } else if (location.pathname.includes("/user-management/edit-staff/")) {
      return "Edit Staff";
    } else if (location.pathname.includes("/complaints/")) {
      return "Complaints";
    } else {
      return pageTitle[location.pathname] || "User Management";
    }
  })();

  useEffect(() => {
    // Check if there is a success message in the state
    if (location.state?.successMessage) {
      // Show the toast notification
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  return (
    <Box
      sx={{
        // marginTop: { md: 0, sm: 6, xs: 8 },
        marginTop: 0,
        ml: { md: "270px", sm: 0 },
      }}
    >
      <Box m={1}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              "@media (max-width: 500px)": {
                flexWrap: "wrap",
              },
            }}
          >
            {selectedUser?.isHostelAssigned !== false && (
              <Box
                sx={{
                  display: "flex",
                  // flexGrow: 1,
                  //flexDirection: "column",
                  //justifyContent: "flex-start",
                }}
              >
                <Box
                  sx={{
                    maxWidth: 300,
                    // padding: 1,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "start",
                  }}
                  onClick={handleHostelMenuClick}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{
                        color: theme.palette.text.primary,
                        marginLeft: 1,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "200px", // Set a reasonable width
                        "&:hover": {
                          whiteSpace: "normal",
                          overflow: "visible",
                        },
                        fontSize: "16px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                      // title={selectedHostel} // Tooltip to show the full address on hover
                    >
                      {selectedHostel.split(" ").slice(0, 3).join(" ") +
                        (selectedHostel.split(" ").length > 3 ? "..." : "")}
                    </Typography>
                    <Typography
                      component="div"
                      sx={{
                        color: theme.palette.text.secondary,
                        marginLeft: 1,
                        textTransform: "capitalize",
                        textWrap: "wrap",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "200px", // Set a reasonable width
                        "&:hover": {
                          whiteSpace: "normal",
                          overflow: "visible",
                        },
                        fontSize: "14px",
                      }}
                      title={selectedHostelAddress} // Tooltip to show the full address on hover
                    >
                      {selectedHostelAddress.split(" ").slice(0, 3).join(" ") +
                        (selectedHostelAddress.split(" ").length > 3
                          ? "..."
                          : "")}
                    </Typography>
                  </Box>
                  <Box>
                    {menuOpen ? (
                      <ArrowDropUpIcon
                        fontSize="large"
                        style={{ color: "#000" }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        fontSize="large"
                        style={{ color: "#000" }}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            <Box
              sx={{
                width: { xs: "100%", md: "auto" },
                marginTop: { xs: 2, md: 0 },
                display: "flex",
                justifyContent: { md: "flex-end", xs: "flex-start" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#F4BE3033",
                  borderRadius: "8px",
                  width: { xs: "100%", sm: "90%", md: "250px", xl: "550px" },
                  border: "1px solid #ddd",
                }}
              >
                <IconButton sx={{ padding: "8px" }}>
                  <SearchIcon />
                </IconButton>
                <InputBase
                  placeholder="Search"
                  value={searchQuery} // Bind the value to searchQuery state
                  onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
                  onKeyUp={handleKeyUp} // Trigger the debounce logic
                  sx={{ width: { md: "100%", sm: "50%", xs: "100%" } }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: { xs: 2, md: 0 },
                marginBottom: { xs: 2, md: 0 },
                paddingRight: { md: "24px", sm: "60px" },
              }}
            >
              <IconButton>
                <NotificationsNoneOutlinedIcon />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "16px",
                  cursor: "pointer",
                  position: "relative",
                  gap: 0.5,
                }}
                onClick={handleMenuClick}
              >
                <Box>
                  <Avatar
                    alt={userData?.name}
                    src={userData?.image}
                    sx={{ marginRight: "8px" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: { lg: 0, md: 4, sm: 0, xs: 0 },
                      left: 30,
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      backgroundColor: "#66FF00",
                      border: `2px solid ${theme.palette.background.paper}`,
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color={theme.palette.text.secondary}
                  >
                    {userData?.name || "John Doe"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.text.secondary}
                  >
                    {userData?.role || "Software Engineer"}
                  </Typography>
                </Box>
                {/* <ExpandMoreIcon
                  sx={{
                    marginLeft: "8px",
                    color: theme.palette.text.secondary,
                  }}
                /> */}
              </Box>
            </Box>
          </Toolbar>
          <Divider
            sx={{
              backgroundColor: "#6B52AE", // Sets the color of the divider
              height: 1, // Optional: Thickness of the divider
              //width:"100%"
            }}
          />

          <Toolbar
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ px: 1 }}>
              <Typography
                variant="body1"
                noWrap
                component="div"
                sx={{ color: "#674D9F", fontWeight: "700" }}
              >
                {currentTitle}
              </Typography>
              <Typography
                variant="body1"
                noWrap
                component="div"
                fontSize={{ sm: "14px", xs: "12px" }}
                sx={{ color: "#ACB5BD", fontWeight: "600" }}
              >
                Hi, Welcome to {currentTitle}
              </Typography>
            </Box>

            {currentTitle === "New Mess Management" &&
              location.pathname !== "/newmessmanagement/addWastage" &&
              location.pathname !== "/newmessmanagement/addmenu" && (
                <>
                  <Button
                    iconPosition="start"
                    variant="contained"
                    onClick={handleClick}
                    sx={{ borderRadius: "10px", textTransform: "none" }}
                  >
                    <AddIcon />
                    Add Menu
                  </Button>
                </>
              )}
            {currentTitle === "New Mess Management" &&
              location.pathname === "/newmessmanagement/addmenu" && (
                <>
                  <DownloadSample />
                </>
              )}

            {(currentTitle === "Leave Management" ||
              currentTitle === "Leave" ||
              location.pathname === "/leave" ||
              location.pathname === "/leave/") && (
              <>
                <DurationAndSearchForNav />
              </>
            )}

            {/* Conditionally render Add User dropdown */}
            {currentTitle === "User" ? (
              <Box sx={{ px: 1 }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    padding: "8px 16px",
                  }}
                  onClick={handleDropdownMenuClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Add User
                </Button>
                <Menu
                  anchorEl={dropdownAnchorEl}
                  open={Boolean(dropdownAnchorEl)}
                  onClose={handleDropdownMenuClose}
                  PaperProps={{
                    sx: {
                      width: "130px",
                      maxWidth: "calc(100% - 32px)",
                      mt: 1,
                    },
                  }}
                >
                  <MenuItem onClick={handleAddStaff}>Add Staff</MenuItem>
                  <MenuItem onClick={handleAddStudent}>Add Student</MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: "200px",
              maxWidth: "calc(100% - 32px)",
              mt: 2,
            },
          }}
        >
          <MenuItem disabled onClick={handleMenuClose}>
            Profile
          </MenuItem>
          <MenuItem disabled onClick={handleMenuClose}>
            Account Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Menu
          anchorEl={hostelAnchorEl}
          open={Boolean(hostelAnchorEl)}
          onClose={handleHostelMenuClose}
          PaperProps={{
            sx: {
              width: "300px",
              maxWidth: "calc(100% - 32px)",
              px: 2,
            },
          }}
        >
          {hostelOptions?.map((hostel) => (
            <MenuItem
              key={hostel.id}
              onClick={() => handleHostelSelect(hostel)}
              selected={selectedHostel === hostel.name}
            >
              {hostel.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
