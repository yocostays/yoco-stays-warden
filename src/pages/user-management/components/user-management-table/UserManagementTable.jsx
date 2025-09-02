/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  Typography,
  Box,
  Avatar,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Autocomplete,
  TextField,
  InputLabel,
  Grid,
  SpeedDial,
  Chip,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@emotion/react";
import ListIcon from "@mui/icons-material/List";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector, useDispatch } from "react-redux";
import {
  getHostelBedDetails,
  getUsers,
  getHostelRoomDetails,
  getVacantRoomDetails,
  getRole,
  getStaffRole,
} from "../../../../features/users/userSlice";
import TableLoader from "../../../../components/tableLoader/TableLoader";
import { toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useLocation, useNavigate } from "react-router-dom";
import { assignStudentHostel } from "../../../../features/student/studentSlice";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Authorization } from "./details/Authorization";
import moment from "moment";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ActiveInactiveDialog from "./details/ActiveInactiveDialog";

const billingCycleOptions = [
  {
    label: "ANNUAL",
    value: "annual",
  },
  {
    label: "SEMI ANNUAL",
    value: "semi-annual",
  },
  {
    label: "QUARTERLY",
    value: "quarterly",
  },
  {
    label: "MONTHLY",
    value: "monthly",
  },
];

const allotmentSchema = Yup.object().shape({
  bedType: Yup.string().required("Bed Type is required"),
  roomNumber: Yup.string().required("Room Number is required"),
  bedNumber: Yup.string().required("Bed Number is required"),
  billingCycle: Yup.string().required("Billing Cycle is required"),
});

const AllotmentDefaultValues = {
  bedType: "",
  roomNumber: "",
  bedNumber: "",
  billingCycle: "",
};

const UserManagementTable = ({ tab, type, onTypeChange }) => {
  const hostelId = localStorage.getItem("hostelId");
  const loginData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0); // State for pagination page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const [tabStatus, setTabStatus] = useState("all");
  const [allocateHostel, setAllocateHostel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user
  const [menuAnchorEls, setMenuAnchorEls] = useState({}); // State to store menu anchors
  const { users, loading, count, tabsRole, staffList, staffCount } =
    useSelector((state) => state.users);
  const { submitting } = useSelector((state) => state?.student);
  const userData = users?.data;
  const [isAutocompleteDisabled, setAutocompleteDisabled] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All User");
  const [vacantCountValue, setVacantCountValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState("student");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedUserStatus, setSelectedUserStatus] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // const selectHostelList = useSelector((store) => store?.users);
  const selectedUserData = JSON.parse(localStorage.getItem("userData"));

  // permission access
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";
  const { permittedRoutes } = useSelector((state) => state?.permission);
  const [pagePermission, setPagePermission] = useState([]);
  useEffect(() => {
    if (permittedRoutes) {
      const path = location.pathname.substring(1); // Remove leading '/' to match the link
      const selectedRoute = permittedRoutes?.find(
        (route) => route?.link === path
      );

      if (selectedRoute) {
        setPagePermission(selectedRoute);
      }
    }
  }, [location.pathname, permittedRoutes]);

  const enumCategoryMap = {
    "All User": "all",
    "Active User": "active",
    "In Active User": "inActive",
    "Authorize User": "authorize",
    "New User": "new",
    "Left Out User": "left user",
  };

  const categoryToCountKey = {
    "All User": count?.allUserCount || 0,
    "Active User": count?.activeUserCount || 0,
    "In Active User": count?.inactiveUserCount || 0,
    "Authorize User": count?.authorizedUserCount || 0,
    "New User": count?.newUserCount || 0,
    "Left Out User": count?.leftCoverUserCount || 0,
  };

  const staffCategoryToCountKey = {
    "All User": staffCount?.allUserCount || 0,
    "Active User": staffCount?.activeUserCount || 0,
    "In Active User": staffCount?.inactiveUserCount || 0,
    "New User": staffCount?.newUserCount || 0,
  };

  // values set for another api hit
  const [bedType, setBedType] = useState(null);
  const [RoomNumber, setRoomNumber] = useState(null);

  // api options for hostel allotmemt
  const [bedDetail, setBedDetail] = useState([]);
  const [roomDetail, setRoomDetail] = useState([]);
  const [vacant, setVacant] = useState();
  const [bedNumberOptions, setBedNumberOptions] = useState([]);
  const [Total, setTotal] = useState("All User");

  // ----------- State for Authorization -------------------

  const [openAuthorize, setOpenAuthorize] = useState(false);
  // State for form errors
  // const [formErrors, setFormErrors] = useState({});

  // ----------- State for Authorization -------------------

  const bedTypeOptions = bedDetail?.map((items) => ({
    label: items?.bedType,
    value: items?.bedType,
  }));

  const roomNumber = roomDetail?.map((items) => ({
    label: items?.roomNumber,
    value: items?.roomNumber,
  }));

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (bedType > 0) {
        const data = { hostelId, bedType };

        try {
          // Dispatch the thunk and wait for the result
          const res = await dispatch(getHostelRoomDetails(data)).unwrap();
          setRoomDetail(res?.data);
          fetchVacantRoom();
        } catch (err) {
          console.error("Failed to fetch room details:", err);
        }
      }
    };

    const fetchVacantRoom = async () => {
      if (RoomNumber > 0) {
        const data = { hostelId, bedType, roomNumber: RoomNumber };

        try {
          // Dispatch the thunk and wait for the result
          const res = await dispatch(getVacantRoomDetails(data)).unwrap();
          setVacant(res?.data?.vacant);

          // Find the selected room details based on the selected RoomNumber
          const selectedRoomDetails = roomDetail.find(
            (room) => room.roomNumber === RoomNumber
          );

          if (selectedRoomDetails) {
            const options = selectedRoomDetails.bedNumber.map((bed) => ({
              label: bed,
              value: bed,
            }));
            setBedNumberOptions(options);
          } else {
            console.warn("Room details not found for the selected room number");
            setBedNumberOptions([]);
          }
        } catch (err) {
          console.error("Failed to fetch room details:", err);
        }
      }
    };

    if (vacant) {
      const [vacantCount] = vacant.split("/").map(Number); // Get the first number and convert to integer
      setAutocompleteDisabled(vacantCount === 0 ? true : false); // Disable if first number is 0
      setVacantCountValue(vacantCount);
    }

    fetchRoomDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RoomNumber, bedType, dispatch, hostelId, vacant]);

  const handleClick = (category) => {
    const enumValue = enumCategoryMap[category];
    setTabStatus(enumValue);
    setTotal(category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedUserData?.isHostelAssigned) {
      if (type) {
        onTypeChange(null);
        setTabStatus(type);
      }
      if (tab) {
        onTypeChange(null);
        // enumCategoryMap[tab]
        setTotal(tab);
        setSelectedCategory(tab);
      }
      {
        selectedTab === "student"
          ? dispatch(
              getUsers({
                page: page + 1,
                limit: rowsPerPage,
                status: tabStatus,
                ...(selectedDate ? { dateRange: selectedDate } : {}),
              })
            )
          : dispatch(
              getStaffRole({
                page: page + 1,
                limit: rowsPerPage,
                roles: selectedRole,
                status: tabStatus,
                ...(selectedDate ? { dateRange: selectedDate } : {}),
              })
            ); // Dispatch action with page and roleId
      }
      dispatch(getRole());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    onTypeChange,
    page,
    rowsPerPage,
    tab,
    tabStatus,
    type,
    selectedDate,
  ]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    AllotmentDefaultValues,
    resolver: yupResolver(allotmentSchema),
  });

  const onSubmit = (data) => {
    handleHit(data);
  };

  const handleHit = async (data) => {
    const payload = {
      hostelId: hostelId,
      studentId: selectedUser?._id,
      bedType: bedType,
      roomNumber: RoomNumber,
      bedNumber: data?.bedNumber,
      billingCycle: data?.billingCycle,
    };

    const resultAction = await dispatch(assignStudentHostel(payload));
    if (assignStudentHostel.fulfilled.match(resultAction)) {
      dispatch(getUsers({ page: page + 1, limit: rowsPerPage }));
      // Show success notification with response message
      handleCloseAllocateHostel();
      toast.success(
        resultAction?.payload?.message || "Form submitted successfully!"
      );
    } else {
      console.error("Submission failed", resultAction.error.message);
      toast.error(resultAction.error.message || "Submission failed!");
    }
  };

  const handleMenuClick = (event, userId) => {
    setMenuAnchorEls((prevState) => ({
      ...prevState,
      [userId]: event.currentTarget,
    }));
  };

  const handleTabClick = (category) => {
    setSelectedTab(category.name.toLowerCase()); // Update selected tab
    setSelectedCategory("All User");
    setTabStatus("all");
    setSelectedRole(category?._id);

    // Check if the category name is 'student'
    if (category.name.toLowerCase() === "student") {
      // Call getUsers API if category is 'student'
      dispatch(
        getUsers({
          page: page + 1,
          limit: rowsPerPage,
          status: tabStatus,
          ...(selectedDate ? { dateRange: selectedDate } : {}),
        })
      );
    } else {
      // Call getStaffRole API for other categories
      dispatch(
        getStaffRole({
          page: page + 1,
          limit: rowsPerPage,
          roles: category._id,
          status: tabStatus,
        })
      );
    }
  };

  const handleUpdateStatus = (user) => {
    setSelectedUserStatus(user);
    setStatusOpen(true);
  };

  const handleMenuClose = (userId) => {
    setMenuAnchorEls((prevState) => ({ ...prevState, [userId]: null }));
  };

  const handleAllocateHostel = async (user, userId) => {
    const data = {
      hostelId: hostelId,
    };
    const res = await dispatch(getHostelBedDetails(data));
    setBedDetail(res?.payload?.data);
    handleMenuClose(userId);
    setSelectedUser(user); // Set the selected user
    setAllocateHostel(true);
  };

  const handleDetailClick = (userId) => {
    // handle navigation with passing userID to new page
    navigate(`/user-management/details/${userId}`, {
      state: { pagePermission, selectedTab }, // Passing selectedRoute through state
    });
    handleMenuClose(userId);
  };

  const handleCloseAllocateHostel = () => {
    setAllocateHostel(false);
    setSelectedUser(null);
    setRoomNumber("");
    setBedType("");
    setVacant("");
    reset(AllotmentDefaultValues);
  };

  const DateRange = Object.freeze({
    Today: "today",
    Yesterday: "yesterday",
    "Current Week": "current week",
    "Last Week": "last week",
    "Past Two Weeks": "past two week",
    "Current Month": "current month",
    "Last Month": "last month",
    "Current Year": "current year",
    "Last Year": "last year",
  });

  const handleMenuItemClick = (day) => {
    const Day = DateRange[day] || day.toLowerCase();
    setSelectedDate(Day); // Store selected date in state
    handleClose();
  };

  const handleRouteSpeedDial = () => {
    navigate("/user-management/new-resident");
  };

  const handleEditStaffClick = (userId) => {
    navigate(`/user-management/edit-staff/${userId}`, {
      state: { staffEdit: true },
    });
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all users
    } else {
      setSelectedUsers(userData.map((user) => user._id)); // Select all users
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId)); // Deselect user
    } else {
      setSelectedUsers([...selectedUsers, userId]); // Select user
    }
    setSelectAll(selectedUsers.length + 1 === userData.length); // Update selectAll state
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Authorization Section
  // ----------- START ------------------

  const handleAuthorizeOpen = (user, userId) => {
    setOpenAuthorize(true);
    handleMenuClose(userId);
    setSelectedUser(user);
  };

  const handleAuthorizeClose = () => {
    setOpenAuthorize(false);
  };

  const handleUpdateStatusClose = () => {
    setStatusOpen(false);
  };

  const open = Boolean(anchorEl);

  // Handle button click to open menu
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(
      getUsers({
        page: page + 1,
        limit: rowsPerPage,
        status: tabStatus,
        ...(selectedDate ? { dateRange: selectedDate } : {}),
      })
    );
  }, [dispatch]);

  // ----------- FINISH -----------------

  return (
    <>
      <Box
        sx={{
          width: { md: `calc(100% - 270px)` },
          ml: { md: "270px", sm: 0 },
          marginBottom: "30px",
          mt: 2,
        }}
      >
        <Box m={1}>
          <Box
            sx={{
              border: "2px solid #B4B4B4",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#F2F2F2",
                // p: { xs: 1, sm: 3 },
                py: 3,
                px: 1,
                borderRadius: "10px 10px 0px 0px",
                borderBottom: "2px solid #B4B4B4",
              }}
            >
              <Box sx={{ display: "flex", px: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    maxWidth: "300px",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 500 }}
                    gutterBottom
                  >
                    User Management
                  </Typography>
                  <Button
                    size="small"
                    onClick={handleFilterClick}
                    sx={{
                      textTransform: "capitalize",
                      color: "#555",
                      "&:hover": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <FilterAltIcon /> Filter
                  </Button>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  {[
                    "Today",
                    "Yesterday",
                    "Current Week",
                    "Last Week",
                    "Past Two Weeks",
                    "Current Month",
                    "Last Month",
                    "Current Year",
                    "Last Year",
                  ].map((day) => (
                    <MenuItem
                      key={day}
                      onClick={() => handleMenuItemClick(day)}
                    >
                      {day}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {/* User category buttons */}

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: { xs: "space-between" },
                }}
              >
                {tabsRole.map((category) => (
                  <Button
                    size="small"
                    key={category.name}
                    variant="outlined"
                    onClick={() => handleTabClick(category)} // Use handleTabClick for dispatch
                    sx={{
                      m: 1,
                      borderRadius: "20px",
                      bgcolor:
                        selectedTab === category.name.toLowerCase()
                          ? theme.palette.secondary.main
                          : "white",
                      color:
                        selectedTab === category.name.toLowerCase()
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      borderColor:
                        selectedTab === category.name.toLowerCase()
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      textTransform: "capitalize",
                      "&:hover": {
                        bgcolor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "space-between", sm: "flex-end" },
                borderBottom: "2px solid #B4B4B4",
                py: 2,
                px: 1,
              }}
            >
              {[
                "All User",
                "Active User",
                "In Active User",
                ...(selectedTab === "student"
                  ? ["Authorize User", "Left Out User"]
                  : []),
                "New User",
              ].map((category) => (
                <Button
                  size="small"
                  key={category}
                  variant={
                    selectedCategory === category ? "contained" : "outlined"
                  }
                  onClick={() => handleClick(category)}
                  sx={{
                    m: 1,
                    borderRadius: "20px",
                    bgcolor:
                      selectedCategory === category
                        ? theme.palette.primary.main
                        : "white",
                    color:
                      selectedCategory === category
                        ? "white"
                        : theme.palette.text.primary,
                    borderColor: theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.secondary.main,
                      borderColor: theme.palette.primary.main,
                    },
                    textTransform: "none",
                    position: "relative",
                  }}
                >
                  {category}
                  {(selectedTab === "student"
                    ? categoryToCountKey[category]
                    : staffCategoryToCountKey[category]) >= 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-5px",
                        right: "-6px",
                        bgcolor: "red",
                        color: "white",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                      }}
                    >
                      {selectedTab === "student"
                        ? categoryToCountKey[category]
                        : staffCategoryToCountKey[category]}
                    </Box>
                  )}
                </Button>
              ))}
            </Box>

            {loading ? (
              <TableLoader />
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  fontSize: "50px",
                  borderRadius: "0px 0px 10px 10px",
                }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ borderBottom: "2px solid #B4B4B4" }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          sx={{
                            color: "#674D9F80",
                          }}
                          checked={selectAll}
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell>YOCO ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Room No.</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedTab !== "student" ? (
                      <>
                        {staffList &&
                        staffList?.filter((item) =>
                          Object.values(item).some((val) =>
                            String(val)
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                        )?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              No users available
                            </TableCell>
                          </TableRow>
                        ) : (
                          staffList
                            ?.filter((item) =>
                              Object.values(item).some((val) =>
                                String(val)
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              )
                            )
                            ?.map((user) => (
                              <TableRow
                                key={user?._id}
                                sx={{
                                  "&:nth-of-type(odd)": {
                                    bgcolor: "#FAFAFA",
                                  },
                                  "&:nth-of-type(even)": {
                                    bgcolor: "white",
                                  },
                                }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={selectedUsers.includes(user?._id)}
                                    onChange={() =>
                                      handleCheckboxChange(user?._id)
                                    }
                                    sx={{
                                      color: "#674D9F80",
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{user?.uniqueId || "N/A"}</TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      sx={{ mr: 2 }}
                                      alt={user?.name}
                                      src={user?.image}
                                    />
                                    <Typography>
                                      <Box
                                        sx={{
                                          maxWidth: 180, // Ensure it takes up full cell width
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          "& .comment-text": {
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxHeight: "3em", // Adjust based on line-height
                                            lineHeight: "1.5em", // Adjust line-height as needed
                                          },
                                        }}
                                      >
                                        <Typography
                                          variant="body2"
                                          className="comment-text"
                                        >
                                          <Tooltip title={user?.name} arrow>
                                            <span>{user?.name || "N/A"}</span>
                                          </Tooltip>
                                        </Typography>
                                      </Box>
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {user?.roomNumber || "N/A"}
                                </TableCell>
                                <TableCell>{user?.phone || "N/A"}</TableCell>
                                <TableCell>
                                  {moment
                                    .utc(user?.createdAt)
                                    .format("DD-MM-YYYY") || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => handleUpdateStatus(user)}
                                    sx={{
                                      textTransform: "capitalize",
                                      whiteSpace: "nowrap",
                                      borderRadius: "20px",
                                      color: `${
                                        user?.status === false
                                          ? "#FFA500"
                                          : "#008000"
                                      }`,
                                      borderColor: `${
                                        user?.status === false
                                          ? "#FFA500"
                                          : "#008000"
                                      }`,
                                    }}
                                  >
                                    {user?.status === false
                                      ? "In Active"
                                      : "Active"}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={(event) =>
                                      handleMenuClick(event, user?._id)
                                    }
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={menuAnchorEls[user?._id]}
                                    open={Boolean(menuAnchorEls[user?._id])}
                                    onClose={() => handleMenuClose(user?._id)}
                                  >
                                    <MenuItem
                                      onClick={() =>
                                        handleEditStaffClick(user?._id)
                                      }
                                    >
                                      <EditIcon
                                        sx={{
                                          mr: 1,
                                          color: "text.secondary",
                                          fontSize: "16px",
                                        }}
                                      />
                                      <Typography fontSize={"14px"}>
                                        Edit
                                      </Typography>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        handleDetailClick(user?._id)
                                      }
                                    >
                                      <ListIcon
                                        sx={{
                                          mr: 1,
                                          color: "text.secondary",
                                          fontSize: "16px",
                                        }}
                                      />
                                      <Typography fontSize={"14px"}>
                                        Details
                                      </Typography>{" "}
                                    </MenuItem>
                                  </Menu>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </>
                    ) : (
                      <>
                        {userData &&
                        userData?.filter((item) =>
                          Object.values(item).some((val) =>
                            String(val)
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                        )?.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              No users available
                            </TableCell>
                          </TableRow>
                        ) : (
                          userData
                            ?.filter((item) =>
                              Object.values(item).some((val) =>
                                String(val)
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              )
                            )
                            ?.map((user) => (
                              <TableRow
                                key={user?._id}
                                sx={{
                                  "&:nth-of-type(odd)": {
                                    bgcolor: "#FAFAFA",
                                  },
                                  "&:nth-of-type(even)": {
                                    bgcolor: "white",
                                  },
                                }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={selectedUsers.includes(user?._id)}
                                    onChange={() =>
                                      handleCheckboxChange(user?._id)
                                    }
                                    sx={{
                                      color: "#674D9F80",
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{user?.uniqueId || "N/A"}</TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      sx={{ mr: 2 }}
                                      alt={user?.name}
                                      src={user?.image}
                                    />
                                    <Typography>
                                      <Box
                                        sx={{
                                          maxWidth: 180, // Ensure it takes up full cell width
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          "& .comment-text": {
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxHeight: "3em", // Adjust based on line-height
                                            lineHeight: "1.5em", // Adjust line-height as needed
                                          },
                                        }}
                                      >
                                        <Typography
                                          variant="body2"
                                          className="comment-text"
                                        >
                                          <Tooltip title={user?.name} arrow>
                                            <span>{user?.name || "N/A"}</span>
                                          </Tooltip>
                                        </Typography>
                                      </Box>
                                    </Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  {user?.roomNumber || "N/A"}
                                </TableCell>
                                <TableCell>{user?.phone || "N/A"}</TableCell>
                                <TableCell>
                                  {moment
                                    .utc(user?.createdAt)
                                    .format("DD-MM-YYYY") || "N/A"}
                                </TableCell>
                                <TableCell>
                                  {user?.isVerified === false ? (
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        textTransform: "capitalize",
                                        borderRadius: "20px",
                                        bgcolor: "white",
                                        color: "#FFA500",
                                        borderColor: "#FFA500",
                                      }}
                                    >
                                      Pending
                                    </Button>
                                  ) : (
                                    <Button
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        textTransform: "capitalize",
                                        borderRadius: "20px",
                                        bgcolor: "white",
                                        color: "#008000",
                                        borderColor: "#008000",
                                      }}
                                    >
                                      Active
                                    </Button>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={(event) =>
                                      handleMenuClick(event, user?._id)
                                    }
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={menuAnchorEls[user?._id]}
                                    open={Boolean(menuAnchorEls[user?._id])}
                                    onClose={() => handleMenuClose(user?._id)}
                                  >
                                    <MenuItem
                                      onClick={() =>
                                        handleDetailClick(user?._id)
                                      }
                                    >
                                      <ListIcon
                                        sx={{
                                          mr: 1,
                                          color: "text.secondary",
                                          fontSize: "16px",
                                        }}
                                      />
                                      <Typography fontSize={"14px"}>
                                        Details
                                      </Typography>
                                    </MenuItem>
                                    {user?.isVerified === true && (
                                      <MenuItem
                                        onClick={() => {
                                          handleAuthorizeOpen(user, user?._id);
                                        }}
                                      >
                                        <LoginIcon
                                          sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                            fontSize: "16px",
                                          }}
                                        />
                                        <Typography fontSize={"14px"}>
                                          {user?.isAuthorized === true
                                            ? "Unautorize User"
                                            : "Authorize User"}
                                        </Typography>
                                      </MenuItem>
                                    )}
                                    {user?.isVerified === false && (
                                      <MenuItem
                                        onClick={() => {
                                          handleAllocateHostel(user, user?._id);
                                        }}
                                      >
                                        <AssignmentTurnedInIcon
                                          sx={{
                                            mr: 1,
                                            color: "text.secondary",
                                            fontSize: "16px",
                                          }}
                                        />
                                        <Typography fontSize={"14px"}>
                                          Allocate Hostel
                                        </Typography>
                                      </MenuItem>
                                    )}
                                    <MenuItem
                                      onClick={() => handleMenuClose(user?._id)}
                                    >
                                      <HighlightOffIcon
                                        sx={{
                                          mr: 1,
                                          color: "text.secondary",
                                          fontSize: "16px",
                                        }}
                                      />
                                      <Typography fontSize={"14px"}>
                                        Block User
                                      </Typography>
                                    </MenuItem>
                                  </Menu>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={`${
                    selectedTab !== "student"
                      ? staffCategoryToCountKey[Total]
                      : categoryToCountKey[Total]
                  }`}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .MuiTablePagination-actions button": {
                      borderRadius: "50%",
                      "&:hover": {
                        bgcolor: theme.palette.primary.main,
                        color: "white",
                      },
                    },
                  }}
                />
              </TableContainer>
            )}
          </Box>
        </Box>
      </Box>

      {/* Speed dial */}

      <Box
        sx={{
          display: `${loginData?.role === "admin" ? "flex" : "none"}`,
          justifyContent: "flex-end",
          my: 5,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          color="primary"
          sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}
          onClick={handleRouteSpeedDial}
          icon={<Icon icon="icon-park-outline:add-one" fontSize="32" />}
        />
      </Box>

      {/* Allocate Hostel Modal */}

      <Dialog
        open={allocateHostel}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>
          Allocate Hostel to -{" "}
          <Chip label={selectedUser?.name} size="medium" color="primary" />
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <InputLabel>Bed Type</InputLabel>
                  <Controller
                    name="bedType"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        value={
                          bedTypeOptions.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          field.onChange(newValue?.value || "");
                          setBedType(newValue?.value || "");
                          setRoomNumber("");
                          setVacant("");
                          setVacantCountValue(0);
                          setAutocompleteDisabled(true);
                        }}
                        options={bedTypeOptions}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Select Bed Type"
                            error={!!errors.bedType}
                            helperText={errors.bedType?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <InputLabel>Room Number</InputLabel>
                  <Controller
                    name="roomNumber"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        value={
                          roomNumber.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(event, newValue) => {
                          field.onChange(newValue?.value || "");
                          setRoomNumber(newValue?.value || "");
                        }}
                        options={roomNumber || []}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Select Room Number"
                            error={!!errors.roomNumber}
                            helperText={errors.roomNumber?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <Typography>
                    Vacant:{" "}
                    <Chip
                      label={vacant || "0/0"}
                      size="medium"
                      sx={{
                        backgroundColor: `${
                          vacantCountValue != 0
                            ? theme.palette.primary.main + "2A"
                            : theme.palette.error.main + "2A"
                        }`,
                        color: `${
                          vacantCountValue != 0
                            ? theme.palette.primary.main
                            : theme.palette.error.main
                        }`,
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}
                    />{" "}
                    (Free/Total)
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <InputLabel>Bed Number</InputLabel>
                  <Controller
                    name="bedNumber"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        value={
                          bedNumberOptions.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(event, newValue) =>
                          field.onChange(newValue?.value || "")
                        }
                        options={bedNumberOptions}
                        disabled={isAutocompleteDisabled}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Select Bed Number"
                            error={!!errors.bedNumber}
                            helperText={errors.bedNumber?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <InputLabel>Billing Cycle</InputLabel>
                  <Controller
                    name="billingCycle"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        value={
                          billingCycleOptions.find(
                            (option) => option.value === field.value
                          ) || null
                        }
                        onChange={(event, newValue) =>
                          field.onChange(newValue?.value || "")
                        }
                        options={billingCycleOptions}
                        disabled={isAutocompleteDisabled}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Select Billing Cycle"
                            error={!!errors.billingCycle}
                            helperText={errors.billingCycle?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Stack>
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                onClick={handleCloseAllocateHostel}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={submitting}
                color="primary"
                variant="contained"
              >
                Allocate
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Authorization Dialog */}

      <Authorization
        openAuthorize={openAuthorize}
        handleAuthorizeClose={handleAuthorizeClose}
        selectedUser={selectedUser}
        rowsPerPage={rowsPerPage}
        page={page}
        tabStatus={tabStatus}
      />
      <ActiveInactiveDialog
        open={statusOpen}
        handleUpdateStatusClose={handleUpdateStatusClose}
        selectedUserStatus={selectedUserStatus}
        page={page}
        limit={rowsPerPage}
        roles={selectedRole}
        tabStatus={tabStatus}
      />
    </>
  );
};

export default UserManagementTable;
