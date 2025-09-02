/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Drawer,
  Checkbox,
  TablePagination,
  Tab,
  Divider,
} from "@mui/material";
import QR from "@assets/images/qr.png";
import images from "../../../../assets/images/studentAppIcon.png";
import vector1 from "@assets/images/vector1.png";
import dayjs from "dayjs";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SideDrawerTable from "./SideDrawerTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeLeaveStatusById, getPassInfo } from "@features/leave/leaveSlice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const SideDrawer = ({
  userData,
  drawerOpen,
  handleCloseDrawer,
  selectedRow,
  handleExpandToFullPage,
  isFullScreen,
  isSmallScreen,
  leaveDataById,
  handleRowDetailsPage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [value, setValue] = useState("history");
  const [isGatePassVisible, setIsGatePassVisible] = useState(false);
  const [remark, setRemark] = useState("");
  const { passInfo } = useSelector((state) => state?.leave);

  const {
    _id,
    startDate,
    endDate,
    leaveStatus,
    updateLogs,
    uniqueId,
    name,
    phone,
    image,
    userId,
    roomNumber,
    leaveType,
    nextLeaveId,
    previousLeaveId,
  } = leaveDataById;

  const formattedDate = `${moment
    .utc(startDate)
    .format("Do MMM, YYYY")} - ${moment.utc(endDate).format("Do MMM, YYYY")}`;
  const formattedTime = `${moment.utc(startDate).format("hh:mm A")} - ${moment
    .utc(endDate)
    .format("hh:mm A")}`;

  if (isGatePassVisible && !drawerOpen) {
    setIsGatePassVisible((prevState) => !prevState);
  }

  const handleViewProfile = () => {
    localStorage.setItem('profileView', 'leave'); 
    navigate(`/users/student/details/${userId}`);
  };
  

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (!isGatePassVisible) {
      dispatch(getPassInfo({ leaveId: _id }));
    }
    setIsGatePassVisible((prevState) => !prevState);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sliced rows based on current page and rows per page
  const paginatedRows = updateLogs?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAction = (status) => {
    const payload = {
      status,
      remark,
    };

    dispatch(changeLeaveStatusById({ data: payload, id: _id })).then(
      (response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          toast.success(response.payload.message);
        } else if (response?.meta?.requestStatus === "rejected") {
          toast.error("Failed to update leave status.");
        }
      }
    );
  };

  useEffect(() => {
    if (drawerOpen) {
      setValue("history");
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
            width: isSmallScreen ? "100%" : isFullScreen ? "100%" : "50%", // Handle xs screen and fullscreen mode
          },
        }}
      >
        <Box padding={{ lg: 6, md: 3, sm: 2, xs: 1 }}>
          {selectedRow ? (
            <>
              <IconButton
                onClick={handleCloseDrawer}
                sx={{
                  position: "absolute", // Position it at the top-left corner
                  top: 16, // Distance from the top
                  left: 16, // Distance from the left
                  zIndex: 2, // Ensure it is above other content
                }}
              >
                <KeyboardDoubleArrowRightIcon fontSize="24px" />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleExpandToFullPage();
                }}
                sx={{
                  position: "absolute", // Position it at the top-left corner
                  top: 16, // Distance from the top
                  left: 50, // Distance from the left
                  zIndex: 2, // Ensure it is above other content
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
                    border: "2px solid #7E57C2", // Purple border
                    color: "#7E57C2", // Purple color
                    borderRadius: "50%", // Circular button
                    width: "30px",
                    height: "30px",
                    "&:hover": {
                      backgroundColor: "rgba(126, 87, 194, 0.1)", // Light purple on hover
                    },
                  }}
                >
                  <ChevronLeftIcon
                    fontSize="large"
                    onClick={() => {
                      if (previousLeaveId) {
                        handleRowDetailsPage(previousLeaveId);
                      }
                    }}
                    style={{
                      cursor: previousLeaveId ? "pointer" : "not-allowed",
                      opacity: previousLeaveId ? 1 : 0.5,
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
                      nextLeaveId
                        ? () => handleRowDetailsPage(nextLeaveId)
                        : undefined
                    }
                    style={{
                      cursor: nextLeaveId ? "pointer" : "not-allowed",
                      opacity: nextLeaveId ? 1 : 0.5,
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
                    src={image} // Replace with the avatar image path
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
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#0E0031",
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      YOCO ID: {uniqueId}
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

                {/* Contact, Room, and Leave Status */}
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
                        {phone}
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
                        {roomNumber}
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
                      gap: "8px", // Space between label and chip
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
                      Leave Status :
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        marginTop: "8px",
                        borderColor:
                          leaveStatus === "approved"
                            ? "green"
                            : leaveStatus === "pending"
                            ? "orange"
                            : leaveStatus === "rejected"
                            ? "red"
                            : leaveStatus === "cancelled"
                            ? "red"
                            : "black",
                        borderRadius: "30px",
                        fontSize: { md: "13px", sm: "11px" },
                        marginBottom: "10px",
                        textTransform: "capitalize",
                        color:
                          leaveStatus === "approved"
                            ? "green"
                            : leaveStatus === "pending"
                            ? "orange"
                            : leaveStatus === "rejected"
                            ? "red"
                            : leaveStatus === "cancelled"
                            ? "red"
                            : "black",
                      }}
                    >
                      {leaveStatus}
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
                {userData
                  .filter(
                    (item) =>
                      !(
                        leaveType === "late coming" &&
                        item.label === "Description"
                      )
                  )
                  .map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        mb: 2,
                        ml: 3,
                      }}
                    >
                      <Box
                        sx={{
                          flex: { sm: "0 0 18%", xs: "0 0 45%" }, // Similar to xs={4} for larger screens
                          fontWeight: "bold",
                          mr: { sm: 2 }, // Margin between label and value on larger screens
                          display: "flex",
                          alignItems: "center",
                          gap: "8px", // Space between icon and label
                        }}
                      >
                        {item.icon}
                        <Typography
                          variant="body1"
                          fontSize={14}
                          sx={{ fontWeight: 700 }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: { sm: "0 0 5%", xs: "0 0 15%" }, // Similar to xs={8} for larger screens
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontSize={14}
                          fontWeight={500}
                        >
                          <span style={{ marginLeft: "8px" }}>:</span>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: { sm: "0 0 67%" }, // Similar to xs={8} for larger screens
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontSize={14}
                          fontWeight={500}
                        >
                          <span style={{ marginLeft: "8px" }}>
                            {item.value || "-"}
                          </span>
                        </Typography>
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
                Leave Application Flow
              </Typography>
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "2px solid #ccc",
                  maxWidth: "100%",
                }}
              >
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                      >
                        <TableCell>Name</TableCell>
                        <TableCell>Approval Date</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedRows?.map((row) => (
                        <TableRow
                          key={row.yocoId}
                          sx={{
                            "&:hover": {
                              backgroundColor: "rgba(126, 87, 194, 0.1)",
                              color: "#7E57C2",
                            },
                          }}
                        >
                          <TableCell
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 400,
                            }}
                          >
                            {row.name || '-'}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 400 }}>
                            {row?.date !== null
                              ? dayjs(row?.date).format("Do MMM, YYYY | hh:mm A")
                              : "-"}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 400,
                              textTransform: "capitalize",
                            }}
                          >
                            {row?.approvalStatus || '-'} :{" "}
                            <Typography
                              component="span"
                              sx={{
                                fontSize:'14px',
                                fontWeight: 400,
                                color:
                                  row.leaveStatus === "approved"
                                    ? "green"
                                    : row.leaveStatus === "pending"
                                    ? "orange"
                                    : (row.leaveStatus === "rejected" ||  row.leaveStatus === "cancelled")
                                    ? "red"
                                    : "black",
                              }}
                            >
                              {row?.leaveStatus || '-'}
                            </Typography>
                          </TableCell>

                          <TableCell sx={{ fontWeight: 400,  textTransform: "capitalize", maxWidth:220 }}>
                            {row?.remark || '-'}{" "}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                {updateLogs?.length > 4 && (
                  <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25]}
                    component="div"
                    count={updateLogs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      "& .MuiTablePagination-actions button": {
                        borderRadius: "50%",
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "white",
                        },
                      },
                    }}
                  />
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent='center'
                gap={2}
                py={"50px"}
                px={"5px"}
              >
                <TextField
                  variant="outlined"
                  placeholder="Add Remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  disabled={leaveStatus === "approved"} // Disable when leaveStatus is "approved"
                  sx={{
                    backgroundColor:
                      leaveStatus === "approved" ? "#E0E0E0" : "#FFF3CD", // Grey background if disabled
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
                        leaveStatus === "approved" ? "#E0E0E0" : "#FFEB3B",
                    },
                    "& .MuiInputBase-input": {
                      color: "#333",
                      padding: "4px 8px",
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleAction("approved")}
                  disabled={leaveStatus === "approved" || !remark?.length > 0} // Disable when leaveStatus is "approved"
                  sx={{
                    textTransform: "none",
                    border: "3px solid #C3E6CB",
                    color: leaveStatus === "approved" ? "#A1A1A1" : "#155724", // Grey text if disabled
                    borderRadius: "60px",
                    "&:hover": {
                      backgroundColor:
                        leaveStatus === "approved" ? "#E0E0E0" : "#C3E6CB",
                    },
                  }}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleAction("rejected")}
                  disabled={leaveStatus === "approved" || !remark?.length > 0} // Disable when leaveStatus is "approved"
                  sx={{
                    textTransform: "none",
                    border: "3px solid #F5C6CB",
                    color: leaveStatus === "approved" ? "#A1A1A1" : "#721C24", // Grey text if disabled
                    borderRadius: "60px",
                    "&:hover": {
                      backgroundColor:
                        leaveStatus === "approved" ? "#E0E0E0" : "#F8D7DA",
                    },
                  }}
                >
                  Reject
                </Button>
              </Box>

              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleTabChange}>
                    <Tab
                      label="History"
                      value="history"
                      sx={{ fontWeight: "bold" }}
                    />
                    <Tab
                      disabled={leaveStatus !== "approved"}
                      label={
                        <Typography
                          variant="subtitle2"
                          disabled={leaveStatus !== "approved"}
                          sx={{ fontWeight: "bold" }}
                        >
                          Gate Pass
                        </Typography>
                      }
                      value="gatePass"
                    />
                  </TabList>
                </Box>
                <TabPanel value="history">
                  <SideDrawerTable id={userId} />
                </TabPanel>
                <TabPanel value="gatePass">
                  {isGatePassVisible && (
                    <Box
                      sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#DAD4E8",
                          borderRadius: 5,
                          display: "flex",
                          alignItems: "center",
                          gap: { sm: 5, xs: 1 },
                          width: "100%",
                          height: { sm: "auto", xs: "120px" },
                        }}
                      >
                        <Box sx={{ padding: 1.5 }}>
                          <img src={images} alt="icon" style={{ width: 60 }} />
                        </Box>
                        <Box>
                          <img
                            src={vector1}
                            alt="Vector"
                            style={{
                              height: 100,
                              //                     '@media (max-width: 300px)': {
                              //   height:10, // Adjust the height when screen width is 300px or less
                              // }
                            }}
                          />
                        </Box>
                        <Box sx={{ paddingRight: { md: 10, xs: 0 } }}>
                          {/* Event Name */}
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#664DA0",
                              marginBottom: 1,
                            }}
                          >
                            {name}
                          </Typography>

                          {/* Formatted Date */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: "#664DA0",
                              fontSize: "12px",
                            }}
                          >
                            <CalendarMonthIcon fontSize="small" />
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "12px",
                                color: "#664DA0",
                                fontWeight: 500,
                              }}
                            >
                              {formattedDate}
                            </Typography>
                          </Box>

                          {/* Formatted Time */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              color: "#664DA0",
                              fontSize: "12px",
                              mt: 1,
                            }}
                          >
                            <AccessTimeIcon fontSize="small" />
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "12px",
                                color: "#664DA0",
                                fontWeight: 500,
                              }}
                            >
                              {formattedTime}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "#DAD4E8",
                          position: "relative",
                          borderRadius: 5,
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            borderBottom: "2px dashed white",
                          }}
                        >
                          <Box
                            sx={{ padding: 3, borderRight: "2px dashed white" }}
                          >
                            <Typography
                              sx={{
                                color: "#664DA0",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }}
                            >
                              Gate Pass No.
                            </Typography>
                            <Typography
                              sx={{ fontWeight: "bold", color: "#664DA0" }}
                            >
                              {passInfo?.gatepassNumber}
                            </Typography>
                          </Box>
                          <Box sx={{ paddingRight: 10 }}>
                            <Typography
                              sx={{ fontWeight: "bold", color: "#664DA0" }}
                            >
                              Going For ?
                            </Typography>
                            <Typography
                              sx={{ color: "#664DA0", fontSize: "12px" }}
                            >
                              Local Guardian
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            padding: 5,
                            alignSelf: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={QR}
                            alt="qr"
                            style={{ width: 200, objectFit: "contain" }}
                          />
                        </Box>

                        <Box
                          sx={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            checked
                            sx={{
                              color: "#664DA0", // Set the default color for the checkbox
                              "&.Mui-checked": {
                                color: "#664DA0", // Set the color when the checkbox is checked
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              color: "#664DA0",
                              fontSize: "12px",
                            }}
                          >
                            APPROVED
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </TabPanel>
              </TabContext>
            </>
          ) : (
            <Typography variant="body1">No Details Available</Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;
