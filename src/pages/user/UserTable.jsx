import { useState, useEffect, useMemo } from "react";
import TableLoader from "@components/tableLoader/TableLoader";
import { useTheme } from "@emotion/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@components/table/Table";
import Edit from "@assets/images/edit_square.svg";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  Grid,
  Avatar,
  capitalize,
  // Table,
} from "@mui/material";
import CustomTableContainer from "../leave/components/table/CustomTableContainer";
import CustomTableHead from "../leave/components/table/CustomTableHead";
import TableCards from "./TableCards";
import UserTableRow from "./UserTableRow";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { exportUserReportAsync, getUsers, setStaffSelection, setSelectedTab, setSelectedAcademicOption, setSearch, setSortUserFilter, setStudentPagination } from "@features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getStaffAsync } from "@features/staff/staffService";
import {
  StaffSelection,
  StaffStatusEnum,
  StudentStatusEnum,
} from "@components/enums/usersListEnums";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import { downloadCSV } from "@utils/downloadCSV";
import { toast } from "react-toastify";
import moment from "moment";
import PersonIcon from '@mui/icons-material/Person';
import studentGray from "../../assets/images/studentGray.svg"
import studentBlue from "../../assets/images/studentBlue.svg"
import adminGray from "../../assets/images/adminGray.svg"
import adminBlue from "../../assets/images/adminBlue.svg"

function UserTable() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { studentPagination, users, loading, totalCount, staffSelection,
    selectedTab, selectedAcademicOption, sortUserFilter,
    searchUser } = useSelector((state) => state.users);

  const { permittedRoutes } = useSelector((state) => state?.permission);
  const { staffList, isLoading, totalStaffCount } = useSelector(
    (state) => state.staff
  );
  console.log(staffList, "staffList")
  const generateYears = (startYear) => {
    const currentYear = moment().year();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };
  const academicYears = generateYears(2021);



  const [academicAnchorE1, setAcademicAnchorE1] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0); // State for pagination page
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  // const [filter, setFilter] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [floor, setFloor] = useState("G"); // Default floor
  const [roomSearch, setRoomSearch] = useState(""); // Search text for rooms
  const [selectedRoom, setSelectedRoom] = useState(null); // Selected room number
  const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar
  const [openExport, setOpenExport] = useState(null);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [viewMode, setViewMode] = useState('table')



  const open = Boolean(anchorEl);
  const isRowSelected = (id) => selectedRows.includes(id);
  const totalDataCount =
    staffSelection === StaffSelection?.HOSTEL_STUDENT ? totalCount : totalStaffCount;

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleOpenMenu = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setDropdownAnchor(null);
  };

  const handleSelectOption = (option) => {
    dispatch(setStaffSelection(option))
    dispatch(setSelectedTab("all"))
    handleCloseMenu();
  };

  const handleOpeAcademicnMenu = (event) => {
    setAcademicAnchorE1(event.currentTarget);
  };

  const handleCloseAcademicMenu = () => {
    setAcademicAnchorE1(null);
  };
  const handleSelectAcademic = (option) => {
    dispatch(setSelectedAcademicOption(option));
    handleCloseAcademicMenu()
  }
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Opens the menu at the button's position
  };

  const handleClose = () => {
    setAnchorEl(null); // Closes the menu
  };

  const handleAcademicClick = (event) => {
    setAcademicAnchorE1(event.currentTarget); // Opens the menu at the button's position
  };

  const handleAcademicClose = () => {
    setAcademicAnchorE1(null); // Closes the menu
  };


  // Dummy data for room numbers
  const dummyRooms = ["01", "02", "03", "04", "05", "06", "07", "..."];
  // Handles floor selection
  const handleFloorChange = (newFloor) => {
    setFloor(newFloor);
  };

  // Handles room search
  const handleRoomSearchChange = (event) => {
    setRoomSearch(event.target.value);
  };

  // Filters room numbers based on the search input
  const filteredRooms = dummyRooms.filter((room) =>
    roomSearch ? room.includes(roomSearch) : false
  );

  const handleRoomSelect = (room) => {
    if (room === "...") {
      setShowSearchBar(!showSearchBar); // Toggle search bar
    } else {
      setSelectedRoom(room);
      setRoomSearch(""); // Clear the search input
      setShowSearchBar(false); // Hide search bar
      handleFilterMenuClose();
    }
  };

  const handleOpenExport = (event) => {
    setOpenExport(event.currentTarget);
  };

  const handleCloseExport = () => {
    setOpenExport(null);
  };

  // Update the tabs based on the selected option
  const tabs =
    staffSelection === StaffSelection?.HOSTEL_ADMINS || staffSelection === StaffSelection?.HOSTEL_STAFF
      ? StaffStatusEnum
      : StudentStatusEnum;
  console.log(tabs, "tabs")
  const handleChangePage = (event, newPage) => {
    dispatch(setStudentPagination(newPage))
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(setStudentPagination(0))
  };

  const [setDrawerOpen] = useState(false); // State to control drawer
  const [setSelectedRow] = useState(null); // Store the selected row's data

  const handleRowDetailsPage = (id) => {
    navigate(`/users/staff/details/${id}`);
    setSelectedRow(id); // Set the row data for the drawer
    setDrawerOpen(true); // Open the drawer
  };

  const handleStudentRowDetailsPage = (id) => {
    navigate(`/users/student/details/${id}`);
    setSelectedRow(id); // Set the row data for the drawer
    setDrawerOpen(true); // Open the drawer
  };

  const handleRowSelect = (event, rowId) => {
    if (event.target.checked) {
      // Add just the row ID to the selectedRows array
      setSelectedRows((prev) => [...prev, rowId]);
    } else {
      // Remove the row ID from the selectedRows array
      setSelectedRows((prev) => prev.filter((id) => id !== rowId));
    }
    setIsSelectedAll(false);
  };


  const onExportExcel = async () => {
    try {
      let payload;

      if (isSelectedAll) {
        // Export all data
        payload = { type: "all" };
        setIsSelectedAll(false); // Reset the selection state
      } else if (selectedRows?.length > 0) {
        // Export selected rows
        payload = {
          type: "individual",
          studentIds: selectedRows,
        };
      } else {
        console.warn("No data selected to export.");
        return;
      }

      // Dispatch the export action
      const response = await dispatch(exportUserReportAsync(payload));

      if (response?.payload) {
        const data = response?.payload;

        if (data) {
          downloadCSV(data, "Final Payroll");
          toast.success('File Exported Successfully.')
        }
      } else {
        console.error("Failed to export data:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const customColumns = [
    { label: "YOCO ID", align: "left" },
    { label: "Name", align: "center" },
    // { label: "Email", align: "left" },
    { label: "Contact No. ", align: "left" },
    { label: "Floor/Room", align: "left" },
    { label: "Joining", align: "center" },
    { label: "Status", align: "center" },
    { label: "Action", align: "center" },
  ];

  const handleToGetStaffDetails = () => {
    const payload = {
      page: studentPagination + 1,
      limit: rowsPerPage,
      search: searchUser,
      sort: sortUserFilter,
      status: selectedTab,
      academicYear: selectedAcademicOption
    };


    if (staffSelection === StaffSelection?.HOSTEL_STUDENT) dispatch(getUsers({ ...payload }));
    else {
      dispatch(
        getStaffAsync({
          ...payload,
          role: staffSelection === StaffSelection?.HOSTEL_ADMINS ? "admin" : "staff",
        })
      );
    }
  };

  useEffect(() => {
    handleToGetStaffDetails();
  }, [staffSelection, studentPagination, page, rowsPerPage, sortUserFilter, selectedAcademicOption]);

  useEffect(() => {
    dispatch(setStudentPagination(0))
    handleToGetStaffDetails();
  }, [selectedTab])

  useEffect(() => {
    dispatch(setStudentPagination(0))
    handleToGetStaffDetails();
  }, [searchUser])

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
  }, [permittedRoutes]);

  const columns = useMemo(
    () => [

      {
        accessorKey: 'uniqueId', //simple recommended way to define a column
        header: 'YOCO ID',
        minSize: 100, //min size enforced during resizing
        maxSize: 400, //max size enforced during resizing
        size: 120,
        align: "left"
      },
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        // grow:true,
        muiTableHeadCellProps: {
          align: "center"
        },
        muiTableBodyCellProps: {
          align: "left"
        },
        size: 150,
        Cell: ({ row }) => {
          return (
            <Box
              display="flex"
              alignItems="center"
            >
              <Avatar
                sx={{ width: 30, height: 30, marginRight: 1 }}
                alt={row?.original?.name}
                src={row?.original?.image}
              >
                {row?.original?.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="body2" color="text.primary">
                {row?.original?.name || "-"}
              </Typography>
            </Box>
          )
        }
      },
      {
        accessorKey: 'phone', //simple recommended way to define a column
        header: 'Contact No.',
        grow: true,
        minSize: 100, //min size enforced during resizing
        maxSize: 400, //max size enforced during resizing
        size: 100,
        muiTableBodyCellProps: {
          align: "center"
        },
        muiTableHeadCellProps: {
          align: "center"
        },
      },
      {
        accessorKey: 'Floor/Room',
        header: "Floor/Room",
        minSize: 100, //min size enforced during resizing
        maxSize: 400, //max size enforced during resizing
        size: 130,
        muiTableBodyCellProps: {
          align: "center"
        },
        muiTableHeadCellProps: {
          align: "center"
        },
        Cell: ({ row }) => {
          return (
            <span>{`${row?.original?.floorNumber}/${row?.original?.roomNumber}`}</span>
          )
        }
      },
      {
        accessorKey: 'joining',
        header: "Joining",
        // minSize: 100, //min size enforced during resizing
        // maxSize: 400, //max size enforced during resizing
        size: 100,
        muiTableHeadCellProps: {
          align: "center"
        },
        muiTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }) => {
          return (
            <span>{row?.original?.joiningDate
              ? moment.utc(row.joiningDate).format("DD MMM, YYYY")
              : "-"}</span>
          )
        }
      },
      {
        accessorKey: 'status',
        header: "Status",
        size: 100, // very small base size
        muiTableHeadCellProps: {
          align: "center"
        },
        muiTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }) => {
          return (
            <Button
              variant="outlined"
              size="small"
              sx={{
                padding: "2px",
                opacity: 1,
                gap: 4,
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: 20,
                border: `1px solid ${row?.original?.userStatus === "active"
                  ? "#008000"
                  : row.userStatus === "inactive"
                    ? "#D2C43B"
                    : "#9A2500"
                  }`,
                color:
                  row.original.userStatus === "active"
                    ? "#008000"
                    : row.userStatus === "inactive"
                      ? "#D2C43B"
                      : "#9A2500",
                bgcolor:
                  row.original.userStatus === "active"
                    ? "#AECAAA"
                    : row.original.userStatus === "inactive"
                      ? "#FDFAE1"
                      : "#FC8D62",
              }}
            >
              {row?.original?.userStatus}
            </Button>
          )
        }
      },
      {
        accessorKey: 'action',
        header: "Action",
        size: 50, // very small base size
        muiTableBodyCellProps: {
          align: "center"
        },
        Cell: ({ row }) => {
          return (
            <IconButton
            //  onClick={() => handleRowDetailsPage(row?._id)}
            >
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
          )
        }
      },
    ],
    [users.data],
  );


  // const staffData = staffList?.map((item)=>{
  //   console.log(item,"item")
  //   return (
  //      <Box key={item?.role}>
  //                      <Typography
  //                        variant="h6"
  //                        sx={{ fontWeight: "bold", marginBottom: 2 }}
  //                      >
  //                        {capitalize(item?.role)}
  //                      </Typography>
  //                      <Box
  //                        sx={{
  //                          display: "flex",
  //                          flexWrap: "wrap",
  //                          gap: 2,
  //                        }}
  //                      >
  //                        {item?.groupedStaff[role]?.map((card, index) => (
  //                          <Box
  //                            key={card.id}
  //                            sx={{
  //                              width: 200,
  //                              border: "1px solid #E0E0E0",
  //                              borderRadius: "20px",
  //                              textAlign: "center",
  //                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  //                              paddingBottom: 2,
  //                            }}
  //                          >
  //                            <Box
  //                              sx={{
  //                                display: "flex",
  //                                justifyContent: "space-between",
  //                                alignItems: "center",
  //                                borderBottom: "1px solid #E0E0E0",
  //                                paddingBottom: 0,
  //                                marginBottom: 2,
  //                                padding: 2,
  //                              }}
  //                            >
  //                              <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
  //                                {capitalize(item?.role)}{" "}
  //                                {index >= 0 && index <= 9
  //                                  ? `0${index + 1}`
  //                                  : `${index + 1}`}
  //                              </Typography>
  //                              {/* <IOSSwitch defaultChecked /> */}
  //                              <IOSSwitch
  //                                checked={item?.status[item?._id]}
  //                                onChange={() => handleToggle(item?._id)}
  //                              />
  //                            </Box>
  //                            <Avatar
  //                              sx={{
  //                                width: 64,
  //                                height: 64,
  //                                margin: "0 auto",
  //                                backgroundColor: "#674D9F",
  //                              }}
  //                              src={item?.image || undefined}
  //                            >
  //                              {item?.image
  //                                ? item?.image
  //                                : item?.name?.charAt(0).toUpperCase()}{" "}
  //                            </Avatar>
  //                            <Typography
  //                              sx={{
  //                                fontWeight: "bold",
  //                                fontSize: 16,
  //                                marginTop: 1,
  //                              }}
  //                            >
  //                              {item?.name}
  //                            </Typography>
  //                            <Typography sx={{ fontSize: 14, color: "#757575" }}>
  //                              {item?.code}
  //                            </Typography>
  //                            <Typography
  //                              sx={{
  //                                fontSize: 14,
  //                                color: "#757575",
  //                                marginBottom: 2,
  //                              }}
  //                            >
  //                              +91 {item?.card.phone}
  //                            </Typography>
  //                            <Button
  //                              variant="outlined"
  //                              sx={{
  //                                borderColor: "#674D9F",
  //                                borderRadius: "20px",
  //                                color: "#674D9F",
  //                                textTransform: "none",
  //                                fontWeight: "bold",
  //                                ":hover": {
  //                                  backgroundColor: "#f7f0ff",
  //                                  borderColor: "#674D9F",
  //                                },
  //                              }}
  //                              onClick={() => handleRowDetailsPage(item?._id)}
  //                            >
  //                              View Profile
  //                            </Button>
  //                          </Box>
  //                        ))}
  //                      </Box>
  //                    </Box>
  //   )
  // })
  const [staffRole, setStaffRole] = useState({})
  useEffect(() => {
    if (StaffSelection?.HOSTEL_STAFF === staffSelection && staffList) {
      const groupedByRole = staffList?.reduce((acc, curr) => {
        if (!acc[curr.role]) acc[curr.role] = [];
        acc[curr.role].push(curr);
        return acc;
      }, {});
      setStaffRole(groupedByRole)
    }


  }, [staffList])
  console.log(Object.entries(staffRole).map((item) => item[1]?.map((it) => it?.name)), "staffRole")

  const data =
    <>
      <Box sx={{ display: "flex", marginX: { xs: "auto", lg: "0" }, gap: 2, justifyContent: "center", alignItems: "center" }}>
        <Box>
          <Box
            onClick={() => { handleSelectOption(StaffSelection?.HOSTEL_ADMINS), setViewMode('card') }}
            sx={{
              cursor: "pointer",
              width: 40,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: StaffSelection?.HOSTEL_ADMINS !== staffSelection ? "#ACB5BD" : "#674D9F",
            }}
          >
            <img src={StaffSelection?.HOSTEL_ADMINS !== staffSelection ? adminGray : adminBlue} alt="admin" width={25} />
          </Box>
          <Box sx={{
            textAlign: "center",
            fontSize: "14.22px",
            fontWeight: "700",
            color: StaffSelection?.HOSTEL_ADMINS !== staffSelection ? "#ACB5BD" : "#674D9F"
          }}>
            Admin
          </Box>
        </Box>
        <Box>
          <Box
            onClick={() => { handleSelectOption(StaffSelection?.HOSTEL_STAFF), setViewMode('card') }}
            sx={{
              cursor: "pointer",
              width: 40,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: StaffSelection?.HOSTEL_STAFF !== staffSelection ? "#ACB5BD" : "#674D9F",
            }}
          >
            <PersonIcon sx={{ width: 30, height: 30 }} />

          </Box>
          <Box sx={{
            textAlign: "center",
            fontSize: "14.22px",
            fontWeight: "700",
            color: StaffSelection?.HOSTEL_STAFF !== staffSelection ? "#ACB5BD" : "#674D9F"
          }}>
            Staff
          </Box>
        </Box>
        <Box>
          <Box
            onClick={() => { handleSelectOption(StaffSelection?.HOSTEL_STUDENT), setViewMode('table') }}
            sx={{
              cursor: "pointer",
              width: 40,
              height: 30,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: StaffSelection?.HOSTEL_STUDENT !== staffSelection ? "#ACB5BD" : "#674D9F"
            }}
          >

            <img src={StaffSelection?.HOSTEL_STUDENT !== staffSelection ? studentGray : studentBlue} alt="admin" width={25} />
          </Box>
          <Box sx={{
            textAlign: "center",
            fontSize: "14.22px",
            fontWeight: "700",
            color: StaffSelection?.HOSTEL_STUDENT !== staffSelection ? "#ACB5BD" : "#674D9F"
          }}>

            Student
          </Box>
        </Box>
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
          flexWrap={isSmallScreen ? "wrap" : "nowrap"} // Enable wrapping for small screens
          flexDirection="row"
          gap={2} // Maintain consistent spacing
          alignItems="center" // Center align items
          justifyContent="center" // Center align tabs
          width="100%" // Ensure it spans the full width
        >
          {tabs?.map((tab) => (
            <Button
              key={tab?.value}
              variant="outlined"
              onClick={() => { dispatch(setSelectedTab(tab?.value)) }}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 1,
                padding: isSmallScreen ? "8px 16px" : "6px 12px", // Adjust padding for smaller screens
                borderWidth: "2px",
                borderStyle: "solid",
                boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                borderImage:
                  selectedTab === tab?.value
                    ? "none"
                    : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1",
                backgroundColor:
                  selectedTab === tab?.value ? "#6B52AE" : "#fff",
                color: selectedTab === tab?.value ? "#fff" : "#A9A9A9",
                width: isSmallScreen ? "100%" : "auto", // Full width for small screens
              }}
            >

              {tab?.label}
            </Button>

          ))}
          {staffSelection === StaffSelection?.HOSTEL_STUDENT && (
            <Box
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "50px",
                  ml: 2,
                  border: "2px solid",
                  textTransform: "none",
                  // borderColor: theme.palette.text.primary,
                }}
                onClick={handleOpeAcademicnMenu}
              >
                {selectedAcademicOption ? selectedAcademicOption : 'Academic Year'}

                <KeyboardArrowDownOutlinedIcon />
              </Button>

              <Menu
                anchorEl={academicAnchorE1}
                open={Boolean(academicAnchorE1)}
                onClose={handleAcademicClose}
              >
                {academicYears.map((year) => (
                  <MenuItem key={year} onClick={() => handleSelectAcademic(year)}>
                    {year}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          )}
          {/* </Box> */}
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
                  value={searchUser}
                  sx={{
                    width: 100,
                    transition: "width 0.3s ease-in-out",
                    "& .MuiInput-underline:before": { borderBottom: "none" },
                    "& .MuiInput-underline:after": { borderBottom: "none" },
                  }}
                  // onBlur={() => setShowSearch(false)}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                />
              )}
            </Box>
            {staffSelection === StaffSelection?.HOSTEL_STUDENT && (
              <>
                <IconButton
                  sx={{ color: open ? "#6B52AE" : "#A9A9A9", p: 0 }} // Purple when open, grey otherwise
                  onClick={handleClick}
                >
                  <SwapVertIcon />
                </IconButton>
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
                  <MenuItem
                    selected={sortUserFilter === "ascending"}
                    onClick={() => dispatch(setSortUserFilter("ascending"))}>
                    By Alphabet A-Z
                  </MenuItem>
                  <MenuItem
                    selected={sortUserFilter === "descending"}
                    onClick={() => dispatch(setSortUserFilter("descending"))}>
                    By Alphabet Z-A
                  </MenuItem>
                  <MenuItem
                    selected={sortUserFilter === "recent"}
                    onClick={() => dispatch(setSortUserFilter("recent"))}>
                    By Date (Recent)
                  </MenuItem>
                  <MenuItem
                    selected={sortUserFilter === "oldest"}
                    onClick={() => dispatch(setSortUserFilter("oldest"))}>
                    By Date (Oldest)
                  </MenuItem>
                </Menu>
                <Box sx={{ display: "flex" }}>
                  {/* Filter Icon */}
                  <IconButton
                    onClick={handleFilterMenuOpen}
                    sx={{ p: 0 }}>
                    <FilterListIcon />
                  </IconButton>

                  {/* Filter Menu */}

                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>

  const selectedRowData = <>
    <Box sx={{
      padding: 0
    }}>
      <span>Action: 4 Selected</span>
    </Box>
  </>

  console.log(Object.entries(staffRole), "staffRole")

  return (
    // <Box m={1} mb={11}>
    //   <Box
    //     display="flex"
    //     justifyContent="space-between"
    //     sx={{
    //       padding: "5px 16px",
    //       border: "2px solid #674D9F",
    //       flexWrap: "wrap",
    //       borderRadius: "20px 20px 0px 0px",
    //       marginTop: "20px",
    //     }}
    //   >
    //     <Box sx={{ display: "flex",marginX:{xs:"auto",lg:"0"}, gap: 2, justifyContent: "center", alignItems: "center" }}>
    //       <Box>
    //         <Box
    //           onClick={() => handleSelectOption(StaffSelection?.HOSTEL_ADMINS)}
    //           sx={{
    //             cursor: "pointer",
    //             width: 40,
    //              height: 30,
    //             borderRadius: '50%',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             color: StaffSelection?.HOSTEL_ADMINS !== staffSelection ? "#ACB5BD" : "#674D9F",
    //           }}
    //         >
    //           <img src={StaffSelection?.HOSTEL_ADMINS !== staffSelection ? adminGray : adminBlue} alt="admin" width={25} />
    //         </Box>
    //         <Box sx={{
    //           textAlign: "center",
    //           fontSize: "14.22px",
    //           fontWeight: "700",
    //           color: StaffSelection?.HOSTEL_ADMINS !== staffSelection ? "#ACB5BD" : "#674D9F"
    //         }}>
    //           Admin
    //         </Box>
    //       </Box>
    //       <Box>
    //         <Box
    //           onClick={() => handleSelectOption(StaffSelection?.HOSTEL_STAFF)}
    //           sx={{
    //             cursor: "pointer",
    //             width: 40,
    //             height: 30,
    //             borderRadius: '50%',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             color: StaffSelection?.HOSTEL_STAFF !== staffSelection ? "#ACB5BD" : "#674D9F",
    //           }}
    //         >
    //           <PersonIcon  sx={{ width: 30, height: 30 }}/>

    //         </Box>
    //         <Box sx={{
    //           textAlign: "center",
    //           fontSize: "14.22px",
    //           fontWeight: "700",
    //           color: StaffSelection?.HOSTEL_STAFF !== staffSelection ? "#ACB5BD" : "#674D9F"
    //         }}>
    //           Staff
    //         </Box>
    //       </Box>
    //       <Box>
    //         <Box
    //           onClick={() => handleSelectOption(StaffSelection?.HOSTEL_STUDENT)}
    //           sx={{
    //             cursor: "pointer",
    //             width: 40,
    //             height: 30,
    //             borderRadius: '50%',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             color: StaffSelection?.HOSTEL_STUDENT !== staffSelection ? "#ACB5BD" : "#674D9F"
    //           }}
    //         >

    //           <img src={StaffSelection?.HOSTEL_STUDENT !== staffSelection ? studentGray : studentBlue} alt="admin" width={25} />
    //         </Box>
    //         <Box sx={{
    //           textAlign: "center",
    //           fontSize: "14.22px",
    //           fontWeight: "700",
    //           color: StaffSelection?.HOSTEL_STUDENT !== staffSelection ? "#ACB5BD" : "#674D9F"
    //         }}>

    //           Student
    //         </Box>
    //       </Box>
    //     </Box>
    //     <Box
    //       display="flex"
    //       alignItems="center"
    //       justifyContent="space-between"
    //       p={1}
    //       borderRadius={2}
    //     >
    //       <Box
    //         display="flex"
    //         flexWrap={isSmallScreen ? "wrap" : "nowrap"} // Enable wrapping for small screens
    //         flexDirection="row"
    //         gap={2} // Maintain consistent spacing
    //         alignItems="center" // Center align items
    //         justifyContent="center" // Center align tabs
    //         width="100%" // Ensure it spans the full width
    //       >
    //         {tabs?.map((tab) => (
    //           <Button
    //             key={tab?.value}
    //             variant="outlined"
    //             onClick={() => dispatch(setSelectedTab(tab?.value))}
    //             sx={{
    //               textTransform: "none",
    //               fontWeight: 500,
    //               borderRadius: 1,
    //               padding: isSmallScreen ? "8px 16px" : "6px 12px", // Adjust padding for smaller screens
    //               borderWidth: "2px",
    //               borderStyle: "solid",
    //               boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
    //               borderImage:
    //                 selectedTab === tab?.value
    //                   ? "none"
    //                   : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1",
    //               backgroundColor:
    //                 selectedTab === tab?.value ? "#6B52AE" : "#fff",
    //               color: selectedTab === tab?.value ? "#fff" : "#A9A9A9",
    //               width: isSmallScreen ? "100%" : "auto", // Full width for small screens
    //             }}
    //           >

    //             {tab?.label}
    //           </Button>

    //         ))}
    //         {staffSelection === StaffSelection?.HOSTEL_STUDENT && (
    //           <Box
    //           >
    //             <Button
    //               variant="outlined"
    //               size="small"
    //               sx={{
    //                 bgcolor: "#fff",
    //                 borderRadius: "50px",
    //                 ml: 2,
    //                 border: "2px solid",
    //                 textTransform: "none",
    //                 // borderColor: theme.palette.text.primary,
    //               }}
    //               onClick={handleOpeAcademicnMenu}
    //             >
    //               {selectedAcademicOption ? selectedAcademicOption : 'Academic Year'}

    //               <KeyboardArrowDownOutlinedIcon />
    //             </Button>

    //             <Menu
    //               anchorEl={academicAnchorE1}
    //               open={Boolean(academicAnchorE1)}
    //               onClose={handleAcademicClose}
    //             >
    //               {academicYears.map((year) => (
    //                 <MenuItem key={year} onClick={() => handleSelectAcademic(year)}>
    //                   {year}
    //                 </MenuItem>
    //               ))}
    //             </Menu>
    //           </Box>

    //         )}
    //         {/* </Box> */}
    //         <Box display="flex" alignItems="center" gap={1}>



    //           <Box display="flex" alignItems="center">
    //             <IconButton
    //               sx={{ color: "#6B52AE", p: 0 }}
    //               onClick={handleSearchClick}
    //             >
    //               <SearchIcon />
    //             </IconButton>
    //             {showSearch && (
    //               <TextField
    //                 size="small"
    //                 placeholder="Type Search.."
    //                 variant="standard"
    //                 autoFocus
    //                 value={searchUser}
    //                 sx={{
    //                   width: 100,
    //                   transition: "width 0.3s ease-in-out",
    //                   "& .MuiInput-underline:before": { borderBottom: "none" },
    //                   "& .MuiInput-underline:after": { borderBottom: "none" },
    //                 }}
    //                 // onBlur={() => setShowSearch(false)}
    //                 onChange={(e) => dispatch(setSearch(e.target.value))}
    //               />
    //             )}
    //           </Box>
    //           {staffSelection === StaffSelection?.HOSTEL_STUDENT && (
    //             <>
    //               <IconButton
    //                 sx={{ color: open ? "#6B52AE" : "#A9A9A9", p: 0 }} // Purple when open, grey otherwise
    //                 onClick={handleClick}
    //               >
    //                 <SwapVertIcon />
    //               </IconButton>
    //               <Menu
    //                 anchorEl={anchorEl}
    //                 open={open}
    //                 onClose={handleClose}
    //                 PaperProps={{
    //                   sx: {
    //                     borderRadius: 2,
    //                     border: "2px solid #D3D3D3", // Light grey border
    //                     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    //                     "& .MuiMenuItem-root": {
    //                       fontFamily: "inherit",
    //                       fontSize: 14,
    //                       color: "#4C4C4C",
    //                     },
    //                   },
    //                 }}
    //                 transformOrigin={{ vertical: "top", horizontal: "center" }}
    //                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    //               >
    //                 <MenuItem
    //                   selected={sortUserFilter === "ascending"}
    //                   onClick={() => dispatch(setSortUserFilter("ascending"))}>
    //                   By Alphabet A-Z
    //                 </MenuItem>
    //                 <MenuItem
    //                   selected={sortUserFilter === "descending"}
    //                   onClick={() => dispatch(setSortUserFilter("descending"))}>
    //                   By Alphabet Z-A
    //                 </MenuItem>
    //                 <MenuItem
    //                   selected={sortUserFilter === "recent"}
    //                   onClick={() => dispatch(setSortUserFilter("recent"))}>
    //                   By Date (Recent)
    //                 </MenuItem>
    //                 <MenuItem
    //                   selected={sortUserFilter === "oldest"}
    //                   onClick={() => dispatch(setSortUserFilter("oldest"))}>
    //                   By Date (Oldest)
    //                 </MenuItem>
    //               </Menu>
    //               <Box sx={{ display: "flex" }}>
    //                 {/* Filter Icon */}
    //                 <IconButton onClick={handleFilterMenuOpen} sx={{ p: 0 }}>
    //                   <FilterListIcon />
    //                 </IconButton>

    //                 {/* Filter Menu */}
    //                 <Menu
    //                   anchorEl={filterMenuAnchorEl}
    //                   open={Boolean(filterMenuAnchorEl)}
    //                   onClose={handleFilterMenuClose} // Automatically closes when clicking outside
    //                 >
    //                   <Box
    //                     sx={{
    //                       p: 2,
    //                       width: 300,
    //                       // border: "1px solid #D3D3D3",  Grey border around the box
    //                       // borderRadius: "8px", Optional: to add rounded corners
    //                     }}
    //                   >
    //                     <Typography
    //                       variant="subtitle1"
    //                       sx={{
    //                         mb: 2,
    //                         fontWeight: "bold",
    //                         color: "#D3D3D3", // Match the color of text
    //                         borderBottom: "2px solid #D3D3D3", // Grey line below the FILTERS title
    //                         paddingBottom: "6px", // Add some space between title and the line
    //                       }}
    //                     >
    //                       FILTERS
    //                     </Typography>

    //                     {/* Floor Selection */}
    //                     <Typography
    //                       variant="subtitle1"
    //                       sx={{
    //                         fontWeight: "bold",
    //                         color: "#0E0031", // Match the color of text
    //                         mb: 2, // Add margin-bottom
    //                         textAlign: "left", // Align text
    //                       }}
    //                     >
    //                       Floor
    //                     </Typography>
    //                     <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
    //                       {["G", "F1", "F2", "F3"].map((f) => (
    //                         <Button
    //                           key={f}
    //                           variant={floor === f ? "contained" : "outlined"}
    //                           onClick={() => handleFloorChange(f)}
    //                           sx={{
    //                             width: 40, // Adjust width to match the image
    //                             height: 40, // Adjust height for a perfect circle
    //                             minWidth: "unset",
    //                             padding: 0,
    //                             borderRadius: "60%", // Ensure it's a circle
    //                             border: "1px solid #0E0031", // Add a border to match the style
    //                             color: floor === f ? "white" : "#674D9F", // Set text color based on selected state
    //                             backgroundColor:
    //                               floor === f ? "#674D9F" : "transparent", // Set background based on selected state
    //                           }}
    //                         >
    //                           {f}
    //                         </Button>
    //                       ))}
    //                     </Box>

    //                     {/* Room Number Selection */}
    //                     <Typography
    //                       variant="subtitle1"
    //                       sx={{
    //                         fontWeight: "bold",
    //                         color: "#0E0031", // Match the color of text
    //                         mb: 2, // Add margin-bottom
    //                         textAlign: "left", // Align text
    //                       }}
    //                     >
    //                       Room Number
    //                     </Typography>
    //                     <Grid
    //                       container
    //                       spacing={1}
    //                       sx={{ justifyContent: "space-between", mb: 2 }}
    //                     >
    //                       {dummyRooms.map((room) => (
    //                         <Grid item xs={3} key={room}>
    //                           {" "}
    //                           {/* Ensure room is defined here */}
    //                           <Button
    //                             variant={
    //                               selectedRoom === room
    //                                 ? "contained"
    //                                 : "outlined"
    //                             }
    //                             onClick={() => handleRoomSelect(room)}
    //                             sx={{
    //                               width: 40,
    //                               height: 40,
    //                               minWidth: "unset",
    //                               padding: 0,
    //                               borderRadius: "10px",
    //                               fontSize: "16px",
    //                               backgroundColor:
    //                                 selectedRoom === room
    //                                   ? "#674D9F"
    //                                   : "transparent",
    //                               color:
    //                                 selectedRoom === room ? "white" : "#674D9F",
    //                               border: "1px solid #0E0031",
    //                             }}
    //                           >
    //                             {room}
    //                           </Button>
    //                         </Grid>
    //                       ))}
    //                     </Grid>
    //                   </Box>
    //                   {showSearchBar && (
    //                     <Box
    //                       sx={{
    //                         p: 1,
    //                         m: 1,
    //                         borderRadius: 2,
    //                         border: "2px solid #D3D3D3",
    //                         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    //                       }}
    //                     >
    //                       <TextField
    //                         fullWidth
    //                         placeholder="Search Room"
    //                         value={roomSearch}
    //                         onChange={handleRoomSearchChange}
    //                         size="small"
    //                         variant="outlined"
    //                         sx={{
    //                           fontSize: "14px",
    //                           borderColor: "purple",
    //                         }}
    //                       />
    //                       <Grid
    //                         container
    //                         spacing={1}
    //                         sx={{ justifyContent: "space-between", my: 2 }}
    //                       >
    //                         {filteredRooms.map((room) => (
    //                           <Grid item xs={3} key={room}>
    //                             {" "}
    //                             {/* Ensure room is defined here */}
    //                             <Button
    //                               variant={
    //                                 selectedRoom === room
    //                                   ? "contained"
    //                                   : "outlined"
    //                               }
    //                               onClick={() => handleRoomSelect(room)}
    //                               sx={{
    //                                 width: 20,
    //                                 height: 40,
    //                                 borderRadius: "10px",
    //                                 fontSize: "16px",
    //                                 backgroundColor:
    //                                   selectedRoom === room
    //                                     ? "#674D9F"
    //                                     : "transparent",
    //                                 color:
    //                                   selectedRoom === room
    //                                     ? "white"
    //                                     : "#674D9F",
    //                                 border: "1px solid #0E0031",
    //                               }}
    //                             >
    //                               {room}
    //                             </Button>
    //                           </Grid>
    //                         ))}
    //                       </Grid>
    //                     </Box>
    //                   )}
    //                 </Menu>
    //               </Box>
    //             </>
    //           )}
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>

    //   {isLoading || loading ? (
    //     <TableLoader />
    //   ) : staffSelection === StaffSelection?.HOSTEL_ADMINS ||
    //     staffSelection === StaffSelection?.HOSTEL_STAFF ? (
    //     <TableCards
    //       staffList={staffList}
    //       selectedRows={selectedRows}
    //       handleRowSelect={handleRowSelect}
    //       handleRowDetailsPage={handleRowDetailsPage}
    //       handleToGetStaffDetails={handleToGetStaffDetails}
    //     />
    //   ) : staffSelection === StaffSelection?.HOSTEL_STUDENT ? (
    //     <>
    //       <CustomTableContainer>
    //         <Box
    //           sx={{
    //             maxHeight: "45vh",
    //             height: "100%",
    //             position: "relative",
    //             overflow: "auto", // Allow scrolling if needed
    //             // height: "400px",
    //             scrollbarWidth: "thin",
    //             // scrollbarColor: "transparent transparent",
    //             msOverflowStyle: "none",
    //             "&::-webkit-scrollbar": {
    //               width: "8px",
    //               height: "8px",
    //             },
    //             "&::-webkit-scrollbar-thumb": {
    //               backgroundColor: "rgba(0, 0, 0, 0.3)",
    //               borderRadius: "10px",
    //             },
    //             "&::-webkit-scrollbar-track": {
    //               backgroundColor: "rgba(0, 0, 0, 0.1)",
    //             },
    //           }}
    //         >
    //           <Table
    //             style={{
    //               width: "100%",
    //               tableLayout: "auto",
    //               borderCollapse: "collapse",
    //               borderRadius: "0 0 20px 20px",
    //             }}
    //           >
    //             <CustomTableHead
    //               columns={customColumns}
    //               selectAll={selectedRows.length === users?.data?.length}
    //               selectedRows={selectedRows}
    //               leaveManagementList={users?.data}
    //               handleSelectAll={(event) => {
    //                 setSelectedRows(
    //                   event.target.checked
    //                     ? users?.data.map((row) => row._id)
    //                     : []
    //                 );
    //                 setIsSelectedAll(true);
    //               }}
    //             />
    //             <UserTableRow
    //               leaveManagementList={users?.data}
    //               isRowSelected={isRowSelected}
    //               handleRowSelect={handleRowSelect}
    //               handleRowDetailsPage={handleStudentRowDetailsPage}
    //               selectedRows={selectedRows}
    //             />
    //           </Table>
    //         </Box>
    //       </CustomTableContainer>
    //     </>
    //   ) : null}

    //   <CustomPagination
    //     rowsPerPage={rowsPerPage}
    //     page={studentPagination}
    //     // count={users?.count?.allUserCount ?? staffList.length}
    //     count={totalDataCount}
    //     handleChangePage={handleChangePage}
    //     handleChangeRowsPerPage={handleChangeRowsPerPage}
    //     display={staffSelection === StaffSelection?.HOSTEL_STUDENT && "flex"}
    //     alignItems="center"
    //     justifyContent="space-between"
    //   >
    //     {staffSelection === StaffSelection?.HOSTEL_STUDENT && (
    //       <Box
    //         display="flex"
    //         justifyContent="space-between"
    //         alignItems="center"
    //       >
    //         {/* Display selected rows count */}
    //         <Typography variant="body1" mr={3} ml={1}>
    //           <span style={{ color: "#674D9F" }}>Action: </span>
    //           {selectedRows.length} Selected
    //         </Typography>

    //         {/* Center: Export dropdown */}
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           onClick={handleOpenExport}
    //           sx={{
    //             textTransform: "none",
    //             borderRadius: 2,
    //             fontWeight: "bold",
    //           }}
    //           endIcon={
    //             <Icon icon="mingcute:down-line" width="20" height="20" />
    //           }
    //         >
    //           Export
    //         </Button>
    //         <Menu
    //           anchorEl={openExport}
    //           open={Boolean(openExport)}
    //           onClose={handleCloseExport}
    //         >
    //           <MenuItem
    //             disabled={!isSelectedAll}
    //             onClick={() => onExportExcel()}
    //           >
    //             All Export
    //           </MenuItem>
    //           <MenuItem
    //             disabled={!selectedRows.length}
    //             onClick={() => onExportExcel()}
    //           >
    //             Export ({selectedRows.length})
    //           </MenuItem>
    //         </Menu>
    //       </Box>
    //     )}
    //   </CustomPagination>
    // </Box>
    // console.log(Object.entries(staffRole).map((item)=> item[1]?.map((it)=> it?.name)), "staffRole")
    <Table
      children={
        // Object.entries(staffRole)?.map((item) => {
        //   return (
        //     <Box >
        //       <Typography
        //         variant="h6"
        //         sx={{ fontWeight: "bold", marginBottom: 2 }}
        //       >
        //         {item[0]}
        //       </Typography>

        //     </Box>
        //   )
        // })
        <TableCards
          staffList={staffList}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleRowDetailsPage={handleRowDetailsPage}
          handleToGetStaffDetails={handleToGetStaffDetails}
        />
      }
      viewMode={viewMode}
      renderBottomToolbarCustomActions={() => selectedRowData}
      renderTopToolbarCustomActions={() => data}
      data={StaffSelection?.HOSTEL_STAFF === staffSelection ? staffList : StaffSelection?.HOSTEL_STUDENT === staffSelection ? users?.data : []}
      columns={columns} />
  );
}

export default UserTable;
