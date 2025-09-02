import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeaveDataById } from "@features/leave/leaveSlice";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import {
  AssignmentOutlined,
  ArticleOutlined,
  EmojiEventsOutlined,
  EventOutlined,
} from "@mui/icons-material";
import TextField from "@mui/material/TextField";

const LeaveDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { moreMenuId } = location.state || {};
  const rowId = moreMenuId;
  const { leaveDataById } = useSelector((state) => state?.leave);

  const {
    uniqueId,
    Description,
    Reason,
    startDate,
    endDate,
    updateLogs,
    leaveType,
  } = leaveDataById;


  const wardenRemark = updateLogs?.find(
    (item) => item.approvalStatus === "warden"
  );

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
    { label: "Reason", value: (leaveType === "late coming" && Description )|| Reason , icon: <EmojiEventsOutlined /> },
    { label: "Description", value: Description, icon: <ArticleOutlined /> },
  ];

  useEffect(() => {
    dispatch(getLeaveDataById(rowId));
  }, [dispatch, rowId]);

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 290px)` },
        ml: { md: "290px", sm: 0 },
        marginBottom: "30px",
        p: 1,
      }}
    >
      <Card sx={{ padding: 4, borderRadius: 2 }}>
        <Box
          sx={{
            maxWidth: "600px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            {/* Avatar */}
            <Avatar
              src={row.avatarUrl}
              alt={row.name}
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#674D9F",
                fontSize: "24px",
                marginRight: "16px",
              }}
            >
              {!row.avatarUrl && row.name.charAt(0)}
            </Avatar>
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
                {row.name || "-"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#0E0031", fontWeight: 600, fontSize: "16px" }}
              >
                YOCO ID: Y123
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
              flexDirection: "row", // Main container as a row
              justifyContent: "space-between",
              alignItems: "flex-start", // Align items at the top for column alignment
              marginTop: "20px",
            }}
          >
            {/* Contact Number and Room Number in a Column */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "12px", // Space between Contact Number and Room Number
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
                    fontSize: "16px",
                  }}
                >
                  Contact Number :
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#0E0031", fontWeight: 600, fontSize: "16px" }}
                >
                  +91 9874567345
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
                    fontSize: "16px",
                  }}
                >
                  Room Number :
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#0E0031", fontWeight: 600, fontSize: "16px" }}
                >
                  23
                </Typography>
              </Box>
            </Box>
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
                  fontSize: "16px",
                }}
              >
                Leave Status :
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  marginTop: "8px",
                  borderColor: "#F5A623",
                  borderRadius: "30px",
                  color: "#F5A623",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                Pending
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#674D9F0D",
            maxWidth: "700px",
            padding: "20px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* User Information */}
          {userData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Column on small screens, row on larger
                mb: 2,
                ml: 6,
              }}
            >
              <Box
                sx={{
                  flex: { sm: "0 0 20%" }, // Similar to xs={4} for larger screens
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
                  {item.label}:
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: { sm: "0 0 67%" }, // Similar to xs={8} for larger screens
                }}
              >
                <Typography variant="body1" fontSize={14} fontWeight={500}>
                  <span style={{ marginLeft: "8px" }}>{item.value || "-"}</span>
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        {/* Room and Bed Request */}
        <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
          Leave Application Flow
        </Typography>
        <Box
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "2px solid #ccc",
            maxWidth: "700px",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Approval ID</TableCell>
                  <TableCell>Name</TableCell> {/* New column for Name */}
                  <TableCell>Approval Date</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updateLogs?.map((row) => (
                  <TableRow key={row.yocoId}>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {row.approvalStatus}
                    </TableCell>
                    <TableCell>{row?.name || "-"}</TableCell>
                    <TableCell>
                      {row?.date !== null
                        ? dayjs(row?.date).format("DD-MM-YYYY")
                        : "-"}
                    </TableCell>
                    <TableCell
                      sx={{
                        textTransform: "capitalize",
                        color:
                          row.leaveStatus === "approved"
                            ? "green"
                            : row.leaveStatus === "pending"
                            ? "orange"
                            : row.leaveStatus === "rejected"
                            ? "red"
                            : "black", // default color
                      }}
                    >
                      {row?.leaveStatus}
                    </TableCell>
                    <TableCell>{row?.remark || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <LeaveStatusChangeForm rowId={rowId} statusOptions={statusOptions} leaveStatus={leaveStatus} wardenRemark={wardenRemark?.remark} pagePermission={pagePermission} /> */}
        </Box>
        <Box display="flex" alignItems="center" gap={6} padding="60px">
          <TextField
            variant="outlined"
            placeholder="Add Remark"
            sx={{
              backgroundColor: "#FFF3CD", // Light yellow background
              color: "#9E9E9E", // Text color
              borderRadius: "10px", // Rounded edges
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove default border
                },
                height: "40px", // Smaller height
                padding: "0 12px", // Reduced internal padding
                fontSize: "12px", // Smaller font size
                fontWeight: 500, // Slightly lighter text
              },
              "& .MuiOutlinedInput-root:hover": {
                backgroundColor: "#FFEB3B", // Brighter yellow on hover
              },
              "& .MuiInputBase-input": {
                color: "#333", // Input text color
                padding: "4px 8px", // Input-specific padding
              },
            }}
          />
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              border: "3px solid #C3E6CB",
              color: "#155724",
              borderRadius: "60px",
              "&:hover": {
                backgroundColor: "#C3E6CB",
              },
            }}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              border: "3px solid #F5C6CB",
              color: "#721C24",
              borderRadius: "60px",
              "&:hover": {
                backgroundColor: "#F8D7DA",
              },
            }}
          >
            Reject
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LeaveDetails;

