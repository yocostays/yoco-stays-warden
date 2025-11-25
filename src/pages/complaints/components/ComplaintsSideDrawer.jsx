import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Drawer,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  TextField,
  Menu,
  MenuItem,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  InputAdornment,
  capitalize,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PropTypes from "prop-types";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ComplaintsSideDrawerTable from "./ComplaintsSideDrawerTable";
import { useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import {
  getComplaint,
  getComplaintById,
  getIndividualComplaint,
  updateComplaintStatusThunk,
} from "@features/maintenance/maintenanceSlice";
import moment from "moment";
import { DurationEnum } from "@components/enums/messEnums";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { toast } from "react-toastify";
import AddRemarksModal from "./AddRemarksModal";
import { LoadingButton } from "@mui/lab";
import ComplaintsSideDrawerViewSection from "./ComplaintsSideDrawerViewSection";
import {
  complaintsEnums,
  ComplaintTypeOptions,
} from "@components/enums/complaintsEnums";
import {
  assignStaffAsync,
  getComplaints,
  getStaffListAsync,
} from "@features/complaints/complaintsSlice";
import Iconify from "@components/iconify/iconify";

const ComplaintsSideDrawer = ({
  id,
  drawerOpen,
  handleCloseDrawer,
  isFullScreen,
  handleExpandToFullPage,
  selectedRow,
  handleRowDetailsPage,
  handleGetComplaintsData,
  setFilterValues,
  filterValues,
  handleChange
}) => {
  const dispatch = useDispatch();
  const {
    complaintById,
    historyCount,
    individualComplaint,
    individualComplaintLoading,
  } = useSelector((state) => state.maintenance);

  const navigate = useNavigate();
  const theme = useTheme();
  const { staffList, isGraphLoading } = useSelector((state) => state.complaint);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { submitting } = useSelector((state) => state.maintenance);
  const [mediaType, setMediaType] = useState("");
  const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);
  const [role, setRole] = useState(ComplaintTypeOptions[0].value);
  const filteredComplaintsEnums = complaintsEnums.filter(
    (option) => option.value !== "pending"
  );
  const [fields, setFields] = useState([
    { id: Date.now(), fileType: null, fileName: "", isFileSelected: false },
  ]);

  const [remark, setRemark] = useState("");
  const [selectedResolveOption, setSelectedResolveOption] =
    useState("resolved");

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
  const isStaffAssigned = complaintById.assignedStaff ? true : false;
  const defaultResolveOption = complaintsEnums[1]?.value; // Get first option as default
  const selectedOption = selectedResolveOption || defaultResolveOption; // Use selected or default
  const statusColor = getStatusColor(selectedOption);
  const [showAttachments, setShowAttachments] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [user, setUser] = useState(
    staffList?.length > 0 ? staffList[0]?._id : ""
  );

  const [selectedDuration, setSelectedDuration] = useState(
    DurationEnum[3] || null
  );

  const [complaintAttached, setComplaintAttached] = useState("");

  const openDropdownMenu = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const closeDropdownMenu = () => {
    setDropdownAnchorEl(null);
  };

  const handleResolveOptionSelect = (option) => {
    setSelectedResolveOption(option); // Update selected option
    if (option === "escalated") {
      setIsDialogOpen(true); // Open dialog if "Escalated" is selected
    }
    closeDropdownMenu(); // Close dropdown after selection
  };

  const handleViewProfile = () => {
    localStorage.setItem("profileView", "complaints");
    navigate(`/users/student/details/${selectedRow?.userId}`);
  };



  const handleOpenAttachmentDrawer = (attached) => {
    setShowAttachments(true);
    setComplaintAttached(attached);
  };

  const handleAttachOpen = () => {
    if (
      complaintById?.complainStatus !== "resolved" &&
      complaintById?.complainStatus !== "rejected"
    ) {
      setAttachOpen(true);
    }
  };
  const handleAttachClose = () => setAttachOpen(false);

  const bookingDetails = [
    {
      label: "Created Date",
      value: moment.utc(complaintById?.createdAt).format("Do MMM, YYYY | LT"),
    },
    {
      label: "Reason",
      value:
        complaintById?.categoryName && capitalize(complaintById?.categoryName),
    },
    {
      label: "Types of Complaint",
      value:
        complaintById?.categoryType && capitalize(complaintById?.categoryType),
    },
    {
      label: "Description",
      value: complaintById?.description,
    },
    {
      label: "Assign to",
      value: (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={
              complaintById?.assignedStaffName
                ? complaintById?.assignedStaffImage || "public/9440456 1.png"
                : null
            }
            sx={{ width: 30, height: 30, marginRight: 1 }}
          />
          <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
            {complaintById?.assignedStaffName || "-"}
          </Typography>
        </Box>
      ),
    },
    complaintById?.audio?.trim() || complaintById?.image?.trim()
      ? {
        label: "Attachments",
        value: (
          // <Button variant="text" onClick={() => setShowAttachments(true)}>
          <Button
            variant="text"
            onClick={() => handleOpenAttachmentDrawer("pendingAttached")}
          >
            View
          </Button>
        ),
      }
      : null,
    (complaintById?.audio?.trim() || complaintById?.image?.trim()) &&
      complaintById?.complainStatus === "resolved"
      ? {
        label: "Resolved Attachments",
        value: (
          <Button
            variant="text"
            onClick={() => handleOpenAttachmentDrawer("resoledAttached")}
          >
            View
          </Button>
        ),
      }
      : null,
  ].filter(Boolean); // This removes `null` values from the array

  const handleSubmit = () => {
    // window.alert("call")
    if (remark.trim() !== "") {
      const payload = {
        complaintId: selectedRow?._id,
        remark,
        complainStatus: selectedOption,
      };
      if (fields.length > 0)
        (payload.attachments = fields?.map((item) => ({
          attachmentType: item?.fileType?.value,
          url: item?.fileName,
        }))),
          dispatch(updateComplaintStatusThunk(payload)).then((res) => {
            if (res?.payload?.statusCode === 200) {
              toast.success(res?.payload?.message);
              setFields([
                {
                  id: Date.now(),
                  fileType: null,
                  fileName: "",
                  isFileSelected: false,
                },
              ]);
              setRemark("");
              setDropdownAnchorEl(null);
              handleGetComplaintsData();
              dispatch(getComplaintById(complaintById?._id));
            }
          });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAssignStaffDialog = () => {
    setIsDialogOpen(true);
  };

  const handleAssign = async () => {
    const payload = {
      complaintId: selectedRow?._id || "", // Ensure correct complaint ID
      staffId: user, // Selected staff ID
      remark: remark || "", // Include remark
      userId: id?.userId
    };

    const payloadForStatus = {
      complaintId: selectedRow?._id || "",
      remark: remark || "",
      // complainStatus: "escalated",
      complainStatus: selectedOption,
      attachments: [],
      userId: id?.userId
    };
    dispatch(assignStaffAsync(payload))
      .then(async (res) => {
        if (res?.payload?.statusCode === 200) {
          toast.success("Complaint assigned successfully!");
          await dispatch(updateComplaintStatusThunk(payloadForStatus));
          handleGetComplaintsData()
          const payload = {
            page: page + 1,
            limit: rowsPerPage,
            status: selectedOption || "",
          };
          dispatch(getComplaint(payload));
          setIsDialogOpen(false);
          handleCloseDrawer()
        } else {
          toast.error("Failed to assign complaint.");
        }
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleRemarkSubmit = () => {
    // if (!isStaffAssigned) {
    //   handleOpenAssignStaffDialog();
    // } else {
      handleSubmit();
    // }
  };

  const payload = {
    limit: rowsPerPage,
    page: page + 1,
    filter: selectedDuration?.value,
  };
  useEffect(() => {
    if (selectedRow?.userId) {
      if (selectedDuration?.value === "custom" && (!startDate || !endDate)) {
        return;
      }

      const data = {
        ...payload,
        userId: selectedRow?.userId,
        ...(selectedDuration?.value === "custom" && { startDate, endDate }),
      };
      dispatch(getIndividualComplaint(data));
    } else if (id) {
      if (selectedDuration?.value === "custom" && (!startDate || !endDate)) {
        return;
      }

      const data = {
        ...payload,
        userId: id,
      };
      dispatch(getIndividualComplaint(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedRow,
    rowsPerPage,
    page,
    selectedDuration,
    id,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    if (selectedRow?._id) {
      dispatch(getComplaintById(selectedRow?._id));
      setRemark("");
    } else if (id) {
      dispatch(getComplaintById(id));
      setRemark("");
    }
  }, [dispatch, selectedRow, id]);

  useEffect(() => {
    if (isDialogOpen) {
      const payload = {
        categoryType: role,
        compaintId: selectedRow?._id,
        userId: id?.userId
      };
      dispatch(getStaffListAsync(payload));
    }
  }, [dispatch, role]);

  useEffect(() => {
    if (!drawerOpen) {
      setShowAttachments(false);
      setFields([
        {
          id: Date.now(),
          fileType: null,
          fileName: "",
          isFileSelected: false,
        },
      ]);
    }
  }, [drawerOpen]);

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100%" : isFullScreen ? "100%" : "50%",
          },
        }}
      >
        {showAttachments ? (
          <ComplaintsSideDrawerViewSection
            isFullScreen={isFullScreen}
            handleCloseDrawer={handleCloseDrawer}
            handleExpandToFullPage={handleExpandToFullPage}
            drawerOpen={drawerOpen}
            complaintById={complaintById}
            setShowAttachments={setShowAttachments}
            showAttachments={showAttachments}
            complaintAttached={complaintAttached}
          />
        ) : (
          <Box padding={{ lg: 6, md: 3, sm: 2, xs: 1 }}>
            {selectedRow ? (
              <>
                <IconButton
                  onClick={handleCloseDrawer}
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 2,
                  }}
                >
                  <KeyboardDoubleArrowRightIcon fontSize="24px" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleExpandToFullPage();
                  }}
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 50,
                    zIndex: 2,
                  }}
                >
                  {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>

                <Box
                  sx={{
                    position: "absolute",
                    top: "20px",
                    right: "40px",
                    display: "flex",
                    gap: "16px",
                    zIndex: 1000,
                  }}
                >
                  {/* Left Arrow */}
                  <IconButton
                    sx={{
                      border: "2px solid #7E57C2",
                      color: "#7E57C2",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      "&:hover": {
                        backgroundColor: "rgba(126, 87, 194, 0.1)",
                      },
                    }}
                  >
                    <ChevronLeftIcon
                      fontSize="large"
                      onClick={() => {
                        if (complaintById?.previousComplaintId) {
                          handleRowDetailsPage(
                            complaintById?.previousComplaintId
                          );
                        }
                      }}
                      style={{
                        cursor: complaintById?.previousComplaintId
                          ? "pointer"
                          : "not-allowed",
                      }}
                    />
                  </IconButton>
                  {/* Right Arrow */}
                  <IconButton
                    sx={{
                      border: "2px solid #7E57C2",
                      color: "#7E57C2",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      "&:hover": { backgroundColor: "rgba(126, 87, 194, 0.1)" },
                    }}
                  >
                    <ChevronRightIcon
                      fontSize="large"
                      onClick={
                        complaintById?.nextComplaintId
                          ? () =>
                            handleRowDetailsPage(
                              complaintById?.nextComplaintId
                            )
                          : undefined
                      }
                      style={{
                        cursor: complaintById?.nextComplaintId
                          ? "pointer"
                          : "not-allowed",
                        opacity: complaintById?.nextComplaintId ? 1 : 0.5,
                      }}
                    />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    maxWidth: "600px",
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "20px",
                    paddingTop: "50px",
                    textAlign: "start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "start",
                      paddingLeft: { lg: "30px", sm: "14px", xs: "5px" },
                    }}
                  >
                    {/* Avatar */}
                    <Avatar
                      alt="User Avatar"
                      src={complaintById?.userImage || "public/9440456 1.png"}
                      sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: "#674D9F",
                        fontSize: "24px",
                        marginRight: "16px",
                      }}
                    />
                    {/* User Info */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#0E0031",
                          marginBottom: "4px",
                          fontSize: "18px",
                        }}
                      >
                        {complaintById?.name || "-"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#0E0031",
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        YOCO ID: {complaintById?.uniqueId || "-"}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: "none",
                          marginTop: "8px",
                          borderColor: "#674D9F",
                          color: "#674D9F",
                          fontSize: "16px",
                          marginBottom: "20px",
                          borderRadius: "30px",
                        }}
                        onClick={handleViewProfile}
                      >
                        View Profile
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginTop: "20px",
                      paddingLeft: { lg: "30px", sm: "14px", xs: "5px" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {/* Contact Number */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#0E0031",
                            textAlign: "left",
                            fontSize: { md: "15px", sm: "13px" },
                          }}
                        >
                          Contact Number :
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#0E0031",
                            fontWeight: 600,
                            fontSize: { md: "15px", sm: "13px" },
                          }}
                        >
                          {complaintById?.phone || "-"}
                        </Typography>
                      </Box>

                      {/* Room Number */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#0E0031",
                            textAlign: "left",
                            fontSize: { md: "15px", sm: "13px" },
                          }}
                        >
                          Room Number :
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#0E0031",
                            fontWeight: 600,
                            fontSize: { md: "15px", sm: "13px" },
                          }}
                        >
                          {/* {`F${complaintById?.floorNumber || 0}/${complaintById?.roomNumber || 0}` ||
                            "-"} */}
                          {complaintById?.roomNumber
                            ? `${complaintById?.floorNumber
                              ? `F${complaintById.floorNumber}/`
                              : ""
                            } ${complaintById.roomNumber}`
                            : "-"}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ backgroundColor: "#ACB5BD", width: "2px" }}
                    />
                    {/* Leave Status in a Row */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#0E0031",
                          textAlign: "right",
                          fontSize: { md: "15px", sm: "13px" },
                        }}
                      >
                        Complaint Status :
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          marginTop: "8px",
                          borderColor:
                            complaintById?.complainStatus === "in progress"
                              ? "green"
                              : complaintById?.complainStatus === "pending"
                                ? "orange"
                                : complaintById?.complainStatus === "on hold"
                                  ? "orange"
                                  : complaintById?.complainStatus ===
                                    "long term work"
                                    ? "orange"
                                    : complaintById?.complainStatus === "escalated"
                                      ? "orange"
                                      : complaintById?.complainStatus === "rejected"
                                        ? "red"
                                        : complaintById?.complainStatus === "cancelled"
                                          ? "red"
                                          : complaintById?.complainStatus === "in progress"
                                            ? "green"
                                            : complaintById?.complainStatus ===
                                              "work completed"
                                              ? "green"
                                              : complaintById?.complainStatus === "resolved"
                                                ? "green"
                                                : "black",
                          borderRadius: "30px",
                          fontSize: { md: "13px", sm: "11px" },
                          marginBottom: "10px",
                          textTransform: "capitalize",
                          color:
                            complaintById?.complainStatus === "in progress"
                              ? "green"
                              : complaintById?.complainStatus === "pending"
                                ? "orange"
                                : complaintById?.complainStatus === "on hold"
                                  ? "orange"
                                  : complaintById?.complainStatus ===
                                    "long term work"
                                    ? "orange"
                                    : complaintById?.complainStatus === "escalated"
                                      ? "orange"
                                      : complaintById?.complainStatus === "rejected"
                                        ? "red"
                                        : complaintById?.complainStatus === "cancelled"
                                          ? "red"
                                          : complaintById?.complainStatus === "in progress"
                                            ? "green"
                                            : complaintById?.complainStatus ===
                                              "work completed"
                                              ? "green"
                                              : complaintById?.complainStatus === "resolved"
                                                ? "green"
                                                : "black",
                        }}
                      >
                        {complaintById?.complainStatus}
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#674D9F0D",
                    maxWidth: "100%",
                    padding: "15px",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  {/* User Information */}
                  {bookingDetails?.map((detail, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        ml: 3,
                        gap: "12px",
                        px: { xs: 0, sm: 0, md: 0, lg: 1.2 },
                      }}
                    >
                      {/* Label */}
                      <Box
                        sx={{
                          flex: { sm: "0 0 20%", xs: "0 0 35%" }, // Adjusts width dynamically
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                        >
                          {detail?.label}
                        </Typography>
                      </Box>

                      {/* Separator (colon `:`) */}
                      <Box sx={{ flex: "0 0 auto" }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            fontWeight: 500,
                          }}
                        >
                          :
                        </Typography>
                      </Box>

                      {/* Value */}
                      <Box
                        sx={{
                          flex: { sm: "0 0 75%", xs: "0 0 60%" }, // Takes remaining space
                          display: "flex",
                          alignItems: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {detail.label === "Assign to" ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {complaintById?.assignedStaffImage ? (
                              <Avatar
                                src={
                                  complaintById?.assignedStaffImage ||
                                  "public/9440456 1.png"
                                }
                                sx={{ width: 30, height: 30 }}
                              />
                            ) : (
                              "--"
                            )}
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: { xs: "12px", sm: "14px" },
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {complaintById?.assignedStaffName}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: { xs: "12px", sm: "14px" },
                              fontWeight: 500,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {detail?.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box
                  mt={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #D9D9D9"
                  sx={{ borderRadius: "20px" }}
                >
                  <TableContainer>
                    <Table
                      sx={{ width: "100%", tableLayout: "auto" }}
                      aria-label="leave requests table"
                    >
                      <TableHead sx={{ borderBottom: "1px solid #674D9F" }}>
                        <TableRow sx={{ borderBottom: "1px solid #674D9F" }}>
                          <TableCell>Name</TableCell>
                          <TableCell>Assign Date</TableCell>
                          <TableCell>Resolved Date</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {complaintById?.updateLogs?.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {row?.assignedStaffs?.length
                                ? row?.assignedStaffs
                                : "-"}
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {moment
                                .utc(row?.date)
                                .format("Do MMM, YYYY | hh:mm A")}
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "12px", fontWeight: "500" }}
                            >
                              {row?.complainStatus === "resolved"
                                ? moment
                                  .utc(row?.date)
                                  .format("Do MMM, YYYY | hh:mm A")
                                : "-"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="text"
                                sx={{
                                  fontSize: "12px",
                                  color:
                                    row?.complainStatus === "in progress"
                                      ? "green"
                                      : row?.complainStatus === "pending"
                                        ? "orange"
                                        : row?.complainStatus === "on hold"
                                          ? "orange"
                                          : row?.complainStatus === "long term work"
                                            ? "orange"
                                            : row?.complainStatus === "escalated"
                                              ? "orange"
                                              : row?.complainStatus === "rejected"
                                                ? "red"
                                                : row?.complainStatus === "cancelled"
                                                  ? "red"
                                                  : row?.complainStatus === "in progress"
                                                    ? "green"
                                                    : row?.complainStatus === "work completed"
                                                      ? "green"
                                                      : row?.complainStatus === "resolved"
                                                        ? "green"
                                                        : "black",
                                }}
                              >
                                {row?.complainStatus}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box
                  mt={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    py={"20px"}
                    px={"5px"}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <TextField
                        placeholder="Add Remark"
                        size="small"
                        disabled={
                          complaintById?.complainStatus === "resolved" ||
                          complaintById?.complainStatus === "rejected"
                        }
                        value={remark}
                        sx={{
                          backgroundColor:
                            complaintById?.complainStatus === "resolved" ||
                              complaintById?.complainStatus === "rejected"
                              ? "#E0E0E0"
                              : "#FFF3CD",
                          color: "#9E9E9E",
                          borderRadius: "10px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none",
                            },
                            height: "40px",
                            padding: "0 5px",
                            fontSize: "15px",
                            fontWeight: 500,
                          },
                          "& .MuiOutlinedInput-root:hover": {
                            backgroundColor:
                              complaintById?.complainStatus === "resolved" ||
                                complaintById?.complainStatus === "rejected"
                                ? "#E0E0E0"
                                : "#FFEB3B",
                          },
                          "& .MuiInputBase-input": {
                            color: "#333",
                            padding: "4px 8px",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              disabled={
                                complaintById?.complainStatus === "resolved" ||
                                complaintById?.complainStatus === "rejected"
                              }
                            >
                              {fields.length > 1 ||
                                fields[0]?.fileType?.value === "image" ||
                                fields[0]?.fileType?.value === "video" ? (
                                <IconButton
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                  onClick={handleAttachOpen}
                                >
                                  <Iconify
                                    icon="fa6-solid:file-pen"
                                    width="30"
                                    height="30"
                                  />
                                </IconButton>
                              ) : (
                                <AttachFileIcon
                                  disabled={
                                    complaintById?.complainStatus ===
                                    "resolved" ||
                                    complaintById?.complainStatus === "rejected"
                                  }
                                  sx={{
                                    color:
                                      complaintById?.complainStatus ===
                                        "resolved" ||
                                        complaintById?.complainStatus ===
                                        "rejected"
                                        ? "black"
                                        : "#674D9F",
                                    cursor: "pointer",
                                  }}
                                  onClick={handleAttachOpen}
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                      {(fields.length > 1 ||
                        fields[0]?.fileType?.value === "image" ||
                        fields[0]?.fileType?.value === "video") && (
                          <Typography
                            variant="caption"
                            sx={{ pl: 1 }}
                          >{`Total File Attached : ${fields.length} File`}</Typography>
                        )}
                    </Box>
                  </Box>

                  <Button
                    variant="outlined"
                    disabled={
                      complaintById?.complainStatus === "resolved" ||
                      complaintById?.complainStatus === "rejected"
                    }
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
                          complaintById?.complainStatus === option.value
                        }
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>

                  <Box
                    display="flex"
                    justifyContent="center"
                  // onClick={handleSubmit}
                  >
                    <LoadingButton
                      loading={submitting}
                      variant="contained"
                      onClick={handleRemarkSubmit}
                      disabled={
                        complaintById?.complainStatus === "resolved" ||
                        complaintById?.complainStatus === "rejected" ||
                        !remark ||
                        !selectedResolveOption
                      }
                    >
                      Submit
                    </LoadingButton>
                  </Box>
                </Box>


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

                <Box mt={4} sx={{ width: "100%", typography: "body1" }}>
                  <ComplaintsSideDrawerTable
                    drawerOpen={drawerOpen}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    count={historyCount}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                    individualComplaint={individualComplaint}
                    individualComplaintLoading={individualComplaintLoading}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    endDate={endDate}
                  />
                </Box>
              </>
            ) : (
              <Typography variant="body1">No Details Available</Typography>
            )}
          </Box>
        )}
      </Drawer>
      <AddRemarksModal
        handleAttachClose={handleAttachClose}
        attachOpen={attachOpen}
        handleSubmit={handleSubmit}
        setMediaType={setMediaType}
        mediaType={mediaType}
        isLoading={submitting}
        fields={fields}
        setFields={setFields}
      />
    </>
  );
};

export default ComplaintsSideDrawer;

ComplaintsSideDrawer.propTypes = {
  id: PropTypes.string,
  isFullScreen: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  handleCloseDrawer: PropTypes.func,
  handleExpandToFullPage: PropTypes.func,
  selectedRow: PropTypes.object,
  toggleViewDrawer: PropTypes.func,
  handleRowDetailsPage: PropTypes.func,
  handleGetComplaintsData: PropTypes.func,
};
