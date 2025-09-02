/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getComplaintById,
  updateComplaintStatusThunk,
} from "../../../features/maintenance/maintenanceSlice";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MaintenanceDetails = () => {
  const statusOptions = {
    PENDING: "pending",
    IN_PROGRESS: "in progress",
    ESCALATED: "escalated",
    RESOLVED: "resolved",
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const [status, setStatus] = useState(statusOptions.PENDING);
  const [remark, setRemark] = useState("");
  const [remarkError, setRemarkError] = useState("");
  const { complaintById } = useSelector((state) => state?.complaint);
  
  const location = useLocation();
  const { pagePermission } = location.state || {};
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(pagePermission?.edit === false || false);

  const imageUrl = complaintById.image;
  const audioUrl = complaintById.audio;

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month
      }/${year}`;

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedDate},  ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const userData = [
    { label: "Yoco id", value: complaintById?.uniqueId ?? "N/A" },
    { label: "Name", value: complaintById?.name ?? "N/A" },
    { label: "Email", value: complaintById?.email ?? "N/A" },
    { label: "Contact Number", value: complaintById?.phone ?? "N/A" },
    { label: "Year", value: complaintById?.academicYear || "N/A" },
    // eslint-disable-next-line no-constant-binary-expression
    { label: "Branch", value: "" || "N/A" },
    { label: "Hostel", value: complaintById?.hostelName ?? "N/A" },
    { label: "Floor No", value: complaintById?.floorNumber ?? "N/A" },
    { label: "Room No", value: complaintById?.roomNumber },
    { label: "Ticket No", value: complaintById?.ticketId ?? "N/A" },
    { label: "Type", value: complaintById?.categoryName ?? "N/A" },
    { label: "Created At", value: formatDateTime(complaintById?.createdAt) },
    {
      label: "Time to resolve",
      value: complaintById?.resolvedTime ?? "N/A",
    }, // Format Time to resolve
  ];

  const roomRequests =
    complaintById?.updateLogs?.map((log) => ({
      date: log.date ? new Date(log.date).toLocaleDateString() : "N/A",
      action: log.complainStatus ?? "N/A",
      remark: log.remark ?? "N/A",
    })) || [];
  

  const updateStatusToLastRequest = () => {
    if (roomRequests.length > 0) {
      const lastRequest = roomRequests[roomRequests.length - 1].action;
      setStatus(lastRequest); // Ensure status is in lowercase
    }
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  const handleSubmit = () => {
    if (!remark.trim()) {
      setRemarkError("Remark is required"); // Set error message
      return; // Prevent submission
    }

    const payload = {
      complaintId: id,
      remark,
      complainStatus: status,
    };
    dispatch(updateComplaintStatusThunk(payload))
      .unwrap() // Use unwrap to handle the promise
      .then(() => {
        toast.success("Complaint status updated successfully!"); // Show success toast
        dispatch(getComplaintById(id));
        setStatus("");
        setRemark("");
        setRemarkError("");
      })
      .catch((error) => {
        toast.error("Failed to update complaint status: " + error.message); // Show error toast
      });
  };

  const handleReset = () => {
    // setStatus("");
    updateStatusToLastRequest();
    setRemark("");
    setRemarkError("");
  };

  useEffect(() => {
    dispatch(getComplaintById(id));
  }, [dispatch, id]);

  useEffect(() => {
    updateStatusToLastRequest(); // Update status based on the last room request

  }, [complaintById]);

  useEffect(() => {
    // Check if the last action in roomRequests is "resolved" to disable buttons
    const lastAction = roomRequests.length > 0 ? roomRequests[roomRequests.length - 1].action : "";
    setAreButtonsDisabled(lastAction === statusOptions.RESOLVED || status === 'cancelled');
  }, [roomRequests]);

  const getDisabledStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case statusOptions.PENDING:
        return [statusOptions.ESCALATED, statusOptions.RESOLVED]; // Only in progress is enabled
      case statusOptions.IN_PROGRESS:
        return [statusOptions.PENDING]; // Only pending is disabled, escalated and resolved are enabled
      case statusOptions.ESCALATED:
        return [statusOptions.PENDING, statusOptions.IN_PROGRESS]; // Only resolved is enabled
      case statusOptions.RESOLVED:
        return [
          statusOptions.PENDING,
          statusOptions.IN_PROGRESS,
          statusOptions.ESCALATED,
        ]; // All are enabled
      default:
        return [];
    }
  };

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 1,
      }}
    >
      <Card sx={{ padding: 2, borderRadius: 2 }}>
        {/* User Information */}
        <Grid container spacing={2}>
          {/* User Data Section */}
          <Grid item xs={12} sm={12} md={7}>
            <Grid container spacing={2}>
              {userData.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={3.3}>
                    <Typography variant="body1" fontSize={'14px'} sx={{ display: "flex", justifyContent:'space-between' }}>
                      <strong>{item.label}</strong>
                      <strong>:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8.7}>
                    <Typography variant="body1" fontSize={'14px'} sx={{ display: "flex" }}>
                      <span style={{ marginLeft: "8px" }}>
                        {item.value || "-"}
                      </span>
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>

          {/* Image and Audio Side by Side */}
          <Grid item xs={12} sm={12} md={4}>
            <Grid container spacing={2}>
              {imageUrl && (
                <Grid item xs={12}>
                  <Box m={1}>
                    <img
                      src={imageUrl}
                      alt="User"
                      style={{ width: "100%", maxWidth: "250px" }}
                    />
                  </Box>
                </Grid>
              )}
              {audioUrl && (
                <Grid item xs={12}>
                  <Box m={1}>
                    <audio
                      controls
                      // controlsList="nodownload"
                      style={{ width: "100%" }}
                    >
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* Room and Bed Request */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            maxWidth: "700px",
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 6, marginBottom: 2 }}>
            Maintenance History
          </Typography>
        </Box>
        <Box sx={{ maxWidth: "700px" }}>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Complain Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomRequests.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            row.action === "resolved"
                              ? "#008000" // Green for "resolved"
                              : row.action === "pending"
                                ? "#FFA500" // Orange for "pending"
                                : row.action === "in progress"
                                  ? "#1E90FF" // Blue for "in progress"
                                  : row.action === "escalated"
                                    ? "#FF0000" // Red for "escalated"
                                    : "black", // Default black for any other case
                          textTransform: "capitalize", // Capitalize text
                          fontSize: "14px",
                        }}
                      >
                        {row.action}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontSize={'14px'}>{row?.date || "N/A"}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography fontSize={'14px'}>{row?.remark || "N/A"}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              m: 2,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography sx={{ color: "#1C0D29", fontWeight: "bold" }}>
                Status :
              </Typography>
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <Stack>
                  <Select
                    value={status}
                    onChange={handleStatusChange}
                    disabled={areButtonsDisabled}
                    size="small"
                    sx={{
                      fontSize:'14px',
                      borderRadius: 20,
                      border: "2px solid #E7E1B3",
                      color: "#D2C43B",
                      backgroundColor: "#FDFAE1",
                      width: "100%", // Ensure it takes up full width of its grid cell
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                  >
                    {Object.keys(statusOptions).map((key) => (
                      <MenuItem
                        sx={{fontSize: '14px'}}
                        key={key}
                        value={statusOptions[key]}
                        disabled={getDisabledStatusOptions(status).includes(
                          statusOptions[key]
                        )}
                      >
                        {statusOptions[key].charAt(0).toUpperCase() +
                          statusOptions[key].slice(1).replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <>
                  <TextField
                    label="Remark"
                    variant="outlined"
                    size="small"
                    fontSize="14px"
                    value={remark}
                    error={!!remarkError}
                    helperText={remarkError}
                    onChange={handleRemarkChange}
                    disabled={areButtonsDisabled}
                    sx={{
                      width: "100%",
                      backgroundColor: "#FDFAE1",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#E7E1B3",
                        },
                        "&:hover fieldset": {
                          borderColor: "#D2C43B",
                        },
                      },
                    }}
                  />
                </>
              </Box>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography sx={{ color: "#1C0D29", fontWeight: "bold" }}>
                Action :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={areButtonsDisabled}
                  sx={{
                    height: 30,
                    backgroundColor: "#D6E4D4",
                    color: "#000",
                    borderRadius: "5px",
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReset}
                  disabled={areButtonsDisabled}
                  sx={{
                    height: 30,
                    backgroundColor: "#EEDAD4",
                    color: "#000",
                    borderRadius: "5px",
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MaintenanceDetails;
