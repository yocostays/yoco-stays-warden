/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  capitalize,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  // ListItemIcon,
  // ListItemText,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import theme from "@theme/Theme";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Edit from "@assets/images/edit_square.svg";
import ComplaintsSideDrawer from "../ComplaintsSideDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
  assignStaffAsync,
  bulkUpdateComplaintAsync,
  getComplaints,
  // getLeaveDataByIdAsync,
  getStaffListAsync,
} from "@features/complaints/complaintsSlice";
import dayjs from "dayjs";
import {
  complaintsEnums,
  ComplaintTypeOptions,
} from "@components/enums/complaintsEnums";
import { toast } from "react-toastify";
import ProfilePopOver from "@pages/leave/components/tableComponent/ProfilePopOver";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import { updateComplaintStatusThunk } from "@features/maintenance/maintenanceSlice";
import { LoadingButton } from "@mui/lab";
// import { getComplaintById } from "@features/maintenance/maintenanceSlice";

const ComplaintsTableContainer = ({
  filter,
  search,
  dateStart,
  dateEnd,
  categoryId,
  selectedTab,
  selectedRows,
  setSelectedRows,
  isSelectedAll,
  setIsSelectedAll,
  filterValues,
  setFilterValues,
  searchFloorNumber,
  floorNumber,
  roomNumber,
  handleChange
}) => {
  const getTableHead = (selectedTab) => {
    return selectedTab === "resolved"
      ? [
        { id: "ticketid", value: "Ticket ID" },
        { id: "name", value: "Name" },
        { id: "createddate", value: "Created Date" },
        { id: "resolveddate", value: "Resolved Date" },
        { id: "fixtime", value: "Fix Time" },
        { id: "typesofcomplaints", value: "Types Of Complaints" },
        { id: "complaintsreason", value: "Complaint Reason" },
        { id: "status", value: "Status" },
        { id: "action", value: "Action" },
      ]
      : [
        { id: "ticketid", value: "Ticket ID" },
        { id: "name", value: "Name" },
        { id: "createddate", value: "Created Date" },
        { id: "department", value: "Role" },
        { id: "typeofcomplaints", value: "Category" },
        { id: "complaintsreason", value: "Complaints Reason" },
        { id: "floorandroom", value: "Floor & Room" },
        { id: "assignto", value: "Assign To" },
        { id: "status", value: "Status" },
        { id: "action", value: "Action" },
      ];
  };

  const TABLE_HEAD = getTableHead(selectedTab);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedResolveOption, setSelectedResolveOption] =
    useState("resolved");
  const {
    complaintData,
    totalCount,
    staffList,
    isComplaintLoading,
    isGraphLoading,
    isLoading,
  } = useSelector((state) => state.complaint);

  const [user, setUser] = useState(
    staffList?.length > 0 ? staffList[0]?._id : ""
  );

  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState(ComplaintTypeOptions[0].value);
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [outerRemark, setOuterRemark] = useState("");
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [profilePopoverAnchor, setProfilePopoverAnchor] = useState(null);
  const defaultResolveOption = complaintsEnums[1]?.value; // Get first option as default
  const selectedOption = selectedResolveOption || defaultResolveOption; // Use selected or default
  const [isStaffAssigned, setIsStaffAssigned] = useState(null);
  const [isAssignStaffDialogOpen, setIsAssignStaffDialogOpen] = useState(false);

  const filteredComplaintsEnums = complaintsEnums.filter(
    (option) => option.value !== "pending"
  );

  const handleOpenAssignStaffDialog = () => {
    setIsAssignStaffDialogOpen(true);
  };

  const handleCloseAssignStaffDialog = () => {
    setIsAssignStaffDialogOpen(false);
  };

  const handleRemarkSubmit = () => {
    if (isStaffAssigned === null && !isStaffAssigned) {
      handleOpenAssignStaffDialog();
    } else {
      handleSubmit();
    }
  };

  // Handle mouse enter event to show popover
  const handleMouseEnter = (event, rowId) => {
    setProfilePopoverAnchor(event.currentTarget);
    setHoveredRowId(rowId);
  };

  // Handle mouse leave event to hide popover
  const handleMouseLeave = () => {
    setProfilePopoverAnchor(null);
    setHoveredRowId(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
    setSelectedRow(null); // Clear the selected row
    setIsFullScreen(false); // Reset fullscreen mode
    setId(null);
  };

  const handleExpandToFullPage = () => {
    setIsFullScreen((prev) => !prev); // Expand the drawer to fullscreen
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRows(complaintData.map((row) => row._id)); // Select all
      // setIsSelectedAll(true)
    } else {
      setSelectedRows([]); // Deselect all
      setOuterRemark("");
    }

    // setSelectAllChecked(event.target.checked);
    setIsSelectedAll(event.target.checked); // Update the "Select All" checkbox state
  };

  const handleSelectRow = (event, rowId) => {
    setSelectedRows((prev) => {
      let updatedSelection;

      if (event.target.checked) {
        updatedSelection = [...prev, rowId]; // Add row to selection
      } else {
        updatedSelection = prev.filter((id) => id !== rowId); // Remove row from selection
        setOuterRemark("");
        setSelectedResolveOption("resolved");
      }

      // ✅ Check if all rows are now selected
      // setSelectAllChecked(updatedSelection.length === complaintData.length);
      setIsSelectedAll(updatedSelection.length === complaintData.length);

      return updatedSelection;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowDetailsPage = (row) => {
    setId(row);
    setDrawerOpen(true);
    setSelectedRow(row);
  };

  // const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  // const handleMenuClose = () => {
  //   setMenuAnchorEl(null);
  // };

  const handleGetComplaintsData = () => {
    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      status: selectedTab || "",
      categoryId: categoryId || "",
      sort: filter || "",
      search: search || "",
      floorNumber: floorNumber,
      roomNumber: roomNumber?.roomNumber,
      ...(filter === "custom" && {
        startDate: dateStart || "",
        endDate: dateEnd || "",
      }),
    };
    dispatch(getComplaints(payload));
  };

  useEffect(() => {
    handleGetComplaintsData();
  }, [
    categoryId,
    dateEnd,
    dateStart,
    dispatch,
    filter,
    page,
    rowsPerPage,
    search,
    selectedTab,
    roomNumber,
  ]);

  useEffect(() => {
    // if (isDialogOpen && selectedRows.length > 0) {
    if (isDialogOpen) {
      const payload = {
        categoryType: role,
        compaintId: selectedRows[0],
      };

      dispatch(getStaffListAsync(payload));
    }
    // }
  }, [dispatch, role]);

  useEffect(() => {
    if (staffList?.length > 0) {
      setUser(staffList[0]?._id); // Reset user when staffList updates
    }
  }, [staffList]); // Separate effect to reset user only when staffList changes

  useEffect(() => {
    setSelectedRows([]);
    // setSelectAllChecked(false);
    setIsSelectedAll(false); // Reset selected rows when tab changes
  }, [selectedTab]);

  // ✅ Show dropdown menu
  const openDropdownMenu = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  // ✅ Close dropdown menu
  const closeDropdownMenu = () => {
    setDropdownAnchorEl(null);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: { bg: "#FDFAE1", text: "#F4BE30", border: "#F4BE30" },
      resolved: { bg: "#E9F8E6", text: "#4EDA57", border: "#4EDA57" },
      "on hold": { bg: "#FCE8EF", text: "#F683AC", border: "#F683AC" },
      "long term work": { bg: "#FDF4E3", text: "#F4BE30", border: "#F4BE30" },
      rejected: { bg: "#FCE8EF", text: "#F683AC", border: "#F683AC" },
      escalated: { bg: "#FDF4E3", text: "#F4BE30", border: "#F4BE30" },
    };

    return (
      statusColors[status?.toLowerCase()] || {
        bg: "#FFFFFF",
        text: "#000000",
        border: "#CCCCCC",
      }
    );
  };

  const statusColor = getStatusColor(selectedOption);

  const handleResolveOptionSelect = (option) => {
    setSelectedResolveOption(option); // Update selected option
    if (option === "escalated") {
      setIsDialogOpen(true); // Open dialog if "Escalated" is selected
    }
    closeDropdownMenu(); // Close dropdown after selection
  };

  const handleSubmit = () => {
    if (!selectedRows || selectedRows.length === 0) {
      toast.warn("Please select at least one complaint."); // Ensure complaints are selected
      return;
    }

    if (!outerRemark.length && !selectedResolveOption) {
      toast.warn("Please select a status."); // Ensure status is selected
      return;
    }

    if (!outerRemark?.trim()) {
      toast.warn("Please enter the remark");
      return;
    }

    const payload = {
      compaints: selectedRows.map((_id) => {
        const complaint = complaintData.find((c) => c._id === _id);
        return {
          complaintId: complaint?._id,
          status: selectedResolveOption,
          remark: outerRemark.trim(),
        };
      }),
    };

    dispatch(bulkUpdateComplaintAsync(payload))
      .then((res) => {
        if (res?.payload?.statusCode === 200) {
          setOuterRemark("");
          setSelectedResolveOption("");
          setSelectedRows([]);
          setIsSelectedAll(false);
          toast.success(res?.payload?.message);
          const payload = {
            page: page + 1,
            limit: rowsPerPage,
            status: selectedTab || "",
            categoryId: categoryId || "",
            sort: filter || "",
            startDate: dateStart || "",
            endDate: dateEnd || "",
            search: search || "",
          };
          dispatch(getComplaints(payload));
        } else {
          toast.error(res?.error.message);
        }
      })
      .catch((error) => {
        console.error("Error updating complaints:", error);
        toast.error(error.message);
      });
  };

  const handleAssign = async () => {
    const selectedComplaint = complaintData.find(
      (c) => c._id === selectedRows[0]
    );
    

    const payload = {
      complaintId: selectedComplaint?._id || "", // Ensure correct complaint ID
      staffId: user, // Selected staff ID
      remark: remark || "", // Include remark
    };

    const payloadForStatus = {
      complaintId: selectedComplaint?._id || "",
      remark: remark || "",
      // complainStatus: "escalated",
      complainStatus: selectedResolveOption,
      attachments: [],
    };

    dispatch(assignStaffAsync(payload))
      .then(async (res) => {
        if (res?.payload?.statusCode === 200) {
          toast.success("Complaint assigned successfully!");
          const res = await dispatch(
            updateComplaintStatusThunk(payloadForStatus)
          );
          if (res?.payload?.statusCode === 200) {
           handleGetComplaintsData() 
          dispatch(
              getComplaints({
                page: page + 1,
                limit: rowsPerPage,
                status: selectedTab || "",
                categoryId: categoryId || "",
                sort: filter || "",
                startDate: dateStart || "",
                endDate: dateEnd || "",
                search: search || "",
                floorNumber: floorNumber,
                roomNumber: roomNumber?.roomNumber,
                custom: searchFloorNumber,
              })
            );
          }
          setIsDialogOpen(false);
        } else {
          toast.error("Failed to assign complaint.");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleRemarkChange = (e) => {
    const value = e.target.value;

    if (value.length > 100) {
      setError("Remark must be at most 100 characters.");
      return;
    } else {
      setError("");
    }

    setOuterRemark(value);
  };

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "20px 0px 0px",
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
                  checked={isSelectedAll} // ✅ Controlled dynamically
                  indeterminate={
                    selectedRows?.length > 0 &&
                    selectedRows?.length < complaintData.length
                  } // ✅ Show intermediate state
                  onChange={handleSelectAll}
                />
              </TableCell>
              {TABLE_HEAD.map((item, index) => (
                <TableCell
                  sx={{
                    fontWeight: "600",
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
          {isComplaintLoading ? (
            <TableBody>
              <TableCell colSpan={10} align="center">
                <CircularProgress />
              </TableCell>
            </TableBody>
          ) : (
            <TableBody>
              {complaintData?.length === 0 ? (
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
                complaintData?.map((item, index) => (
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
                        checked={selectedRows?.includes(item._id)}
                        onChange={(event) => {
                          handleSelectRow(event, item._id);
                          setIsStaffAssigned(item.assignedStaff);
                        }}
                      />
                    </TableCell>
                    {selectedTab === "resolved" ? (
                      <>
                        <TableCell>{item.ticketId || "--"}</TableCell>
                        {/* <TableCell>{item.studentName || "--"}</TableCell> */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                            onMouseEnter={(event) =>
                              handleMouseEnter(event, item._id)
                            }
                            onMouseLeave={handleMouseLeave}
                          >
                            <Avatar
                              src={item?.image}
                              alt={item?.studentName}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                            <Typography variant="body2" color="text.primary">
                              {item?.studentName || "--"}
                            </Typography>

                            {/* ✅ Profile Popover Integration */}
                            <ProfilePopOver
                              profileView="complaints"
                              isPopoverOpen={Boolean(profilePopoverAnchor)}
                              row={item}
                              profilePopoverAnchor={profilePopoverAnchor}
                              handleMouseLeave={handleMouseLeave}
                              hoveredRowId={hoveredRowId}
                            />
                          </Box>
                        </TableCell>

                        <TableCell sx={{ minWidth: { sm: 190, xs: 150 } }}>
                          {(item.createdAt &&
                            `${dayjs(item.createdAt)
                              .utc()
                              .format("Do MMM, YYYY")} | ${dayjs(item.createdAt)
                                .utc()
                                .format("hh:mm A")}`) ||
                            "--"}
                        </TableCell>
                        <TableCell sx={{ minWidth: { sm: 190, xs: 150 } }}>
                          {(item.resolvedDate &&
                            `${dayjs(item.resolvedDate)
                              .utc()
                              .format("Do MMM, YYYY")} | ${dayjs(
                                item.resolvedDate
                              )
                                .utc()
                                .format("hh:mm A")}`) ||
                            "--"}
                        </TableCell>
                        <TableCell>{item.resolvedTime || "--"}</TableCell>
                        <TableCell>{item.category || "--"}</TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Tooltip title={item.subCategory || "--"} arrow>
                            <Typography
                              noWrap
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                              }}
                            >
                              {item.subCategory || "--"}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "none",
                              borderRadius: "50px",
                              padding: "5px 15px",
                              fontWeight: "bold",
                              minWidth: "auto",
                              backgroundColor: getStatusColor(
                                item.complainStatus
                              ).bg,
                              color: getStatusColor(item.complainStatus).text,
                              borderColor: getStatusColor(item.complainStatus)
                                .border,
                            }}
                          >
                            {capitalize(item.complainStatus) || "--"}
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{item.ticketId || "--"}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                            onMouseEnter={(event) =>
                              handleMouseEnter(event, item._id)
                            }
                            onMouseLeave={handleMouseLeave}
                          >
                            <Avatar
                              src={item?.image}
                              alt={item?.studentName}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                            <Typography variant="body2" color="text.primary">
                              {item?.studentName || "--"}
                            </Typography>

                            {/* ✅ Profile Popover Integration */}
                            <ProfilePopOver
                              profileView="complaints"
                              isPopoverOpen={Boolean(profilePopoverAnchor)}
                              row={item}
                              profilePopoverAnchor={profilePopoverAnchor}
                              handleMouseLeave={handleMouseLeave}
                              hoveredRowId={hoveredRowId}
                            />
                          </Box>
                        </TableCell>
                        <TableCell sx={{ minWidth: { sm: 190, xs: 150 } }}>
                          {(item.createdAt &&
                            `${dayjs(item.createdAt)
                              .utc()
                              .format("Do MMM, YYYY")} | ${dayjs(item.createdAt)
                                .utc()
                                .format("hh:mm A")}`) ||
                            "--"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>
                          {item.category || "--"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>
                          {item.categoryType || "--"}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                            maxWidth: 150,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Tooltip title={item.subCategory || "--"} arrow>
                            <Typography
                              noWrap
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                display: "block",
                              }}
                            >
                              {item.subCategory || "--"}
                            </Typography>
                          </Tooltip>
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                            minWidth: "100px",
                          }}
                        >
                          {item.floorNumber && item.roomNumber
                            ? `${item.floorNumber} / ${item.roomNumber}`
                            : "--"}
                        </TableCell>
                        <TableCell>
                          {/* Assignee Image */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              minWidth: "100px",
                            }}
                          >
                            <Avatar
                              src={item?.assignedStaffImage}
                              alt={item.assignedStaff}
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: 8,
                              }}
                            // onClick={() => setIsDialogOpen(true)}
                            />
                            <Typography>
                              {item.assignedStaff || "--"}
                            </Typography>
                          </Box>
                          {/* </Box> */}

                          {/* Dropdown Menu */}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="outlined"
                            sx={{
                              minWidth: "150px",
                              textTransform: "none",
                              borderRadius: "50px",
                              padding: "5px 15px",
                              fontWeight: "bold",
                              backgroundColor: getStatusColor(
                                item.complainStatus
                              ).bg,
                              color: getStatusColor(item.complainStatus).text,
                              borderColor: getStatusColor(item.complainStatus)
                                .border,
                            }}
                          >
                            {capitalize(item.complainStatus) || "--"}
                          </Button>
                        </TableCell>
                      </>
                    )}
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
          )}
        </Table>
      </TableContainer>
      <CustomPagination
        rowsPerPage={rowsPerPage}
        page={page}
        count={totalCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: "30px" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          {!["resolved", "escalated"].includes(selectedTab) && (
            <Box display="flex" flex={1}>
              {selectedRows?.length > 0 && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={3}
                >
                  {/* Display selected rows count */}
                  <Typography variant="body1" mr={3} ml={1}>
                    <span style={{ color: "#674D9F" }}>Action: </span>
                    {selectedRows.length} Selected
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    label="Add Remark"
                    variant="outlined"
                    value={outerRemark}
                    onChange={handleRemarkChange}
                    sx={{
                      backgroundColor: "#F4BE3033",
                      color: "#ACB5BD",
                      borderRadius: "6px",
                      minWidth: 50,
                    }}
                    error={!!error} // Show error state if error exists
                    helperText={error} // Display error message
                  />
                  {/* Center: Resolve dropdown */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: statusColor?.text || "#0E6100",
                        borderRadius: "20px",
                        px: 2,
                        border: `1px solid ${statusColor?.border || "#AECAAA"}`,
                        backgroundColor: statusColor?.bg || "transparent",
                        textTransform: "none", // Ensure text appears as it is
                      }}
                      onClick={openDropdownMenu}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {complaintsEnums.find(
                        (option) => option.value === selectedResolveOption
                      )?.label ??
                        complaintsEnums[1]?.label ?? // Default to the first label if no option is selected
                        "Resolve"}
                    </Button>
                  </Box>
                  <Box>
                    <LoadingButton
                      loading={isLoading}
                      variant="outlined"
                      sx={{
                        borderRadius: "20px",
                        px: 2,
                        border: "1px solid #AECAAA",
                      }}
                      onClick={handleRemarkSubmit}
                      disabled={!outerRemark.length || !selectedResolveOption}
                    >
                      Submit
                    </LoadingButton>
                  </Box>
                  {/* ✅ Dropdown Menu */}
                  <Menu
                    anchorEl={dropdownAnchorEl}
                    open={Boolean(dropdownAnchorEl)}
                    onClose={closeDropdownMenu}
                  >
                    {filteredComplaintsEnums.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={() => {
                          handleResolveOptionSelect(option.value);
                          closeDropdownMenu();
                        }}
                        disabled={
                          (selectedRows.length > 1 &&
                            option.value === "escalated") ||
                          selectedTab === option.value
                        }
                      // disabled={
                      //   complaintById?.complainStatus === option.value
                      // }
                      // disabled={
                      //   (selectedRows.length > 1 && option.value === "escalated") ||
                      //   (option.value === "escalated" && isStaffAssigned === null)
                      // }
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                  {/* ✅ Dialog Popup */}
                  <Dialog
                    open={isDialogOpen}
                    onClose={() => {
                      setIsDialogOpen(false);
                      setRole("");
                      setUser("");
                      setRemark("");
                    }}
                    maxWidth="sm"
                    fullWidth
                    sx={{
                      backdropFilter: "blur(5px)",
                      backgroundColor: "#674D9F4D",
                    }}
                  >
                    <DialogTitle
                      sx={{
                        textAlign: "start",
                        fontWeight: "700",
                        fontSize: "16px",
                      }}
                    >
                      Assign To
                    </DialogTitle>

                    <DialogContent>
                      <Box>
                        {/* Role Dropdown */}
                        <Box
                          display="flex"
                          justifyContent="space-around"
                          mb={2}
                          gap={4}
                        >
                          {/* Role Dropdown */}
                          <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{
                              width: "50%",
                              height: "40px",
                              fontSize: "12px",
                            }}
                          >
                            {ComplaintTypeOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>

                          {/* User Selection */}
                          <Select
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            sx={{
                              width: "50%",
                              height: "40px",
                              fontSize: "12px",
                            }}
                            displayEmpty
                          >
                            {staffList && staffList.length > 0 ? (
                              staffList.map((staff) => (
                                <MenuItem key={staff?._id} value={staff?._id}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <Avatar
                                      src={staff?.image}
                                      alt={staff?.name}
                                      sx={{ width: 24, height: 24 }}
                                    />
                                    <span style={{ textWrap: "wrap" }}>
                                      {staff?.name}
                                    </span>
                                  </Box>
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>No Staff Found</MenuItem>
                            )}
                          </Select>
                        </Box>

                        {/* Remark Input */}
                        <TextField
                          mt={4}
                          placeholder="Add Remark"
                          value={remark}
                          fullWidth
                          onChange={(e) => setRemark(e.target.value)}
                          size="small"
                          sx={{
                            backgroundColor: "#FFF5D1",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                      <LoadingButton
                        loading={isGraphLoading}
                        variant="outlined"
                        sx={{
                          color: "#0E6100",
                          borderRadius: "20px",
                          padding: "6px 8px",
                          fontSize: "16px",
                          border: "1px solid #AECAAA",
                        }}
                        onClick={() => handleAssign()}
                        disabled={!remark || !user || !role}
                      >
                        Assign
                      </LoadingButton>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={isAssignStaffDialogOpen}
                    onClose={handleCloseAssignStaffDialog}
                    maxWidth="sm"
                    fullWidth
                    sx={{
                      backdropFilter: "blur(5px)",
                      backgroundColor: "#674D9F4D",
                    }}
                  >
                    <DialogTitle
                      sx={{
                        textAlign: "start",
                        fontWeight: "700",
                        fontSize: "16px",
                      }}
                    >
                      No Staff Assigned
                    </DialogTitle>
                    <DialogContent>
                      <Typography>
                        There are some complaints are not assigned Staff. Please
                        Assign Staff.
                      </Typography>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                      {(!isSelectedAll || selectedRow.length === 1) && (
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: "20px",
                            padding: "4px 8px",
                            fontSize: "16px",
                            border: "2px solid #674D9F",
                            textTransform: "none",
                          }}
                          onClick={() => {
                            handleCloseAssignStaffDialog();
                            setIsDialogOpen(true);
                          }}
                        >
                          Assign Staff
                        </Button>
                      )}

                      <Button
                        variant="outlined"
                        sx={{
                          color: "red",
                          borderRadius: "20px",
                          padding: "4px 10px",
                          fontSize: "16px",
                          border: "2px solid red",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          handleCloseAssignStaffDialog();
                        }}
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </CustomPagination>
      <ComplaintsSideDrawer
        setFilterValues={setFilterValues}
        filterValues={filterValues}
        handleChange={handleChange}
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        isFullScreen={isFullScreen}
        isSmallScreen={isSmallScreen}
        selectedRow={selectedRow}
        handleExpandToFullPage={handleExpandToFullPage}
        id={id}
        handleRowDetailsPage={handleRowDetailsPage}
        handleGetComplaintsData={handleGetComplaintsData}
      />
    </Box>
  );
};

export default ComplaintsTableContainer;
