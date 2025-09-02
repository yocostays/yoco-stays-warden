import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  Menu,
  Switch,
  Tooltip,
} from "@mui/material";
import {
  getComplaint,
  getStaff,
  updateStaffThunk,
} from "../../../features/maintenance/maintenanceSlice";
import TableLoader from "../../../components/tableLoader/TableLoader";
import MaintenanceHeader from "./MaintenanceHeader";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListIcon from "@mui/icons-material/List";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function MaintenanceTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { complaint, loading, staff, count } = useSelector(
    (state) => state.maintenance
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [assignedStaff, setAssignedStaff] = useState({});
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState(null);
  const [moreMenuId, setMoreMenuId] = useState(null);
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

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

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = complaint.map((row) => row._id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const handleChangeStaff = async (rowId, event) => {
    const { value } = event.target;

    setAssignedStaff((prev) => ({
      ...prev,
      [rowId]: value,
    }));

    const payload = {
      staffId: value,
      complaintId: rowId,
    };

    try {
      const response = await dispatch(updateStaffThunk(payload)).unwrap();
      if (response.statusCode === 200) {
        toast.success(response.message || "Staff assigned successfully!");
        // Optionally, you can refresh the complaints list
        dispatch(
          getComplaint({
            page: page + 1,
            limit: rowsPerPage,
            status: selectedStatus,
          })
        );
      } else {
        toast.error("Failed to assign staff.");
      }
    } catch (err) {
      console.error("Failed to assign staff: ", err);
      toast.error(err.message || "An error occurred while assigning staff.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((rowId) => rowId !== id)
      );
    }
  };

  const handleDetailClick = (rowId) => {
    navigate(`/maintenance/details/${rowId}`, { state: { pagePermission } });
  };

  const handleTabClick = (index) => {
    const statusMap = [
      "all",
      "pending",
      "in progress",
      "escalated",
      "resolved",
    ];
    setSelectedStatus(statusMap[index]);
  };

  useEffect(() => {
    if (selectedUser?.isHostelAssigned) {
      dispatch(
        getComplaint({
          page: page + 1,
          limit: rowsPerPage,
          status: selectedStatus,
        })
      );
      dispatch(getStaff());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, rowsPerPage, selectedStatus]);

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  return (
    <Box m={1} mt={3}>
      <MaintenanceHeader onTabClick={handleTabClick} />
      {loading ? (
        <TableLoader />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderLeft: "1px solid #674D9F",
            borderRight: "1px solid #674D9F",
            borderBottom: "1px solid #674D9F",
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          <Table>
            <TableHead sx={{ borderBottom: "2px solid #674D9F" }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < complaint.length
                    }
                    checked={selectedRows?.length === complaint?.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Ticket ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Hostel</TableCell>
                <TableCell>Floor No.</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Time to Resolve</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Assign to</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaint &&
              complaint?.filter((item) =>
                Object.values(item).some((val) =>
                  String(val).toLowerCase().includes(searchQuery.toLowerCase())
                )
              ).length > 0 ? (
                complaint
                  ?.filter((item) =>
                    Object.values(item).some((val) =>
                      String(val)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                  )
                  .map((row, index) => (
                    <TableRow
                      key={row._id}
                      hover
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#F1F2FC" : "inherit",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(row._id)}
                          onChange={(event) => handleRowSelect(event, row._id)}
                        />
                      </TableCell>
                      <TableCell>{row.ticketId || "N/A"}</TableCell>
                      <TableCell>{row.studentName || "N/A"}</TableCell>
                      <TableCell>
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
                          <Typography variant="body2" className="comment-text">
                            <Tooltip title={row.hostelName} arrow>
                              <span>{row.hostelName || "--"}</span>
                            </Tooltip>
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.floorNumber || "N/A"}</TableCell>
                      <TableCell>
                        {/* {new Date(row.createdAt).toLocaleDateString("en-GB") ||
                      "N/A"} */}
                        {moment.utc(row.createdAt).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>{row.resolvedTime || "N/A"}</TableCell>
                      <TableCell>{row.category || "N/A"}</TableCell>
                      <TableCell>
                        <Select
                          value={assignedStaff[row._id] || ""}
                          onChange={(e) => handleChangeStaff(row._id, e)}
                          displayEmpty
                          size="small"
                          IconComponent={
                            assignedStaff[row._id]
                              ? ExpandLessIcon
                              : ExpandMoreIcon
                          }
                          sx={{
                            borderRadius: "20px",
                            fontWeight: "400",
                            fontSize: "14px", // Adjust font size
                            padding: "4px 8px", // Adjust padding for height
                            minWidth: "100px", // Set minimum width if needed
                            height: "35px",
                          }}
                        >
                          <MenuItem value="" disabled>
                            {complaint[index].assignedStaff || "Select Staff"}
                          </MenuItem>
                          {staff.map((staff) => (
                            <MenuItem key={staff._id} value={staff._id}>
                              {staff.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Box>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "12px",
                              borderRadius: 20,
                              whiteSpace: "nowrap",
                              border: `1px solid ${
                                row.complainStatus === "pending"
                                  ? "#FFA500" // Orange for "pending"
                                  : row.complainStatus === "escalated"
                                  ? "#FF69B4" // Pink for "escalated"
                                  : row.complainStatus === "in progress"
                                  ? "#1E90FF" // Blue for "in progress"
                                  : row.complainStatus === "resolved"
                                  ? "#008000" // Green for "resolved"
                                  : row.complainStatus === "cancelled"
                                  ? "#FF0000" // Red for "cancelled"
                                  : "#000000" // Default black
                              }`,
                              color:
                                row.complainStatus === "pending"
                                  ? "#FFA500" // Orange for "pending"
                                  : row.complainStatus === "escalated"
                                  ? "#FF69B4" // Pink for "escalated"
                                  : row.complainStatus === "in progress"
                                  ? "#1E90FF" // Blue for "in progress"
                                  : row.complainStatus === "resolved"
                                  ? "#008000" // Green for "resolved"
                                  : row.complainStatus === "cancelled"
                                  ? "#FF0000" // Red for "cancelled"
                                  : "#000000", // Default black
                            }}
                          >
                            {row.complainStatus}
                          </Button>
                        </Box>
                        <Menu
                          anchorEl={statusMenuAnchorEl}
                          open={Boolean(statusMenuAnchorEl)}
                          onClose={() => setStatusMenuAnchorEl(null)}
                        >
                          <MenuItem>
                            <Typography>Notify</Typography>
                            <Switch />
                          </MenuItem>
                          <Typography sx={{ p: 1, width: "250px" }}>
                            Notify Student and parents when past curfew
                          </Typography>
                        </Menu>
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={(event) => {
                            setMoreMenuAnchorEl(event.currentTarget);
                            setMoreMenuId(row._id);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={moreMenuAnchorEl}
                          open={moreMenuId === row?._id}
                          onClose={() => {
                            setMoreMenuAnchorEl(null);
                            setMoreMenuId(null);
                          }}
                        >
                          {/* <MenuItem>
                        <ListItemIcon>
                          <TaskAltIcon fontSize="small" color="success" />
                        </ListItemIcon>
                        <ListItemText>Accept</ListItemText>
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <CancelIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText>Reject</ListItemText>
                      </MenuItem> */}
                          <MenuItem onClick={() => handleDetailClick(row?._id)}>
                            <ListIcon
                              sx={{
                                mr: 1,
                                color: "text.secondary",
                                fontSize: "16px",
                              }}
                            />
                            <Typography fontSize={"14px"}>Details</Typography>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    <Typography variant="h6">No Data Available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={count || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
}

export default MaintenanceTable;
