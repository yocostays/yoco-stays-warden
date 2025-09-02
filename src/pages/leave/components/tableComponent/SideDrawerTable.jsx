import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
  IconButton,
} from "@mui/material";

import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import CustomPagination from "../table/customPagination/CustomPagination";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  changeLeaveStatusById,
  getLeaveManagementHistory,
} from "@features/leave/leaveSlice";
import { useDispatch, useSelector } from "react-redux";
import NoDataAvailable from "../table/NoDataAvailable";
import CancelLeaveDialog from "./ConfirmRemarkDialogBox";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const SideDrawerTable = ({ id }) => {
  const dispatch = useDispatch();
  const tabs = ["All", "Approved", "Rejected", "Pending", "Cancelled", "Today"];
  const tabs2 = [
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "This Year",
    "Custom",
  ];
  dayjs.extend(utc);
  const [selectedTab, setSelectedTab] = useState("All");
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [dropdownAn, setDropdownAn] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Leave Request"); // Default selected value
  const [selected, setSelected] = useState("Current Month");
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0); // State for pagination page
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRemarkDialog, setOpenRemarkDialog] = useState(false);
  const [rowId, setRowId] = useState("");
  const [remark, setRemark] = useState("");

  const { historyCount, historyData, isLeaveHistory } = useSelector(
    (state) => state?.leave
  );

  // Open the dropdown menu
  const handleOpenMenu = (event) => {
    setDropdownAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setDropdownAnchor(null);
  };

  // Handle menu item selection
  const handleSelectOption = (option) => {
    const updatedOption = option === "leave" ? "Leave Request" : option;

    setSelectedOption(updatedOption); // Update selected option
    handleCloseMenu(); // Close the menu
  };

  const handleOpenDropdown = (event) => {
    setDropdownAn(event.currentTarget);
  };

  const handleClose = () => {
    setDropdownAn(null);
  };

  const SelectOption = (option) => {
    // Update option if it matches "This Week", "This Month", or "This Year"
    let modifiedOption = option;
    if (["This Week", "This Month", "This Year"].includes(option)) {
      modifiedOption = option.replace("This", "Current");
    }

    setSelected(modifiedOption);

    if (modifiedOption === "Custom") {
      handleOpenDialog();
    }

    handleClose();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getLeaveManagementHistoryData = () => {
    const isCustom = selected.toLocaleLowerCase() === "custom";
    const isValidStartDate = startDate && dayjs(startDate).isValid();
    const isValidEndDate = endDate && dayjs(endDate).isValid();

    const IsoStartDate = isValidStartDate
      ? dayjs(startDate).utc(true).startOf("day").toISOString()
      : null;

    const isoEndDate = isValidEndDate
      ? dayjs(endDate).utc(true).startOf("day").toISOString()
      : null;

    const payload = {
      page: page + 1,
      limit: rowsPerPage,
      status: selectedOption === "Leave Request" ? "leave" : selectedOption,
      userId: id,
      leaveStatus: selectedTab.toLocaleLowerCase(),
      // search,
      durationType: selected.toLocaleLowerCase(),
      ...(isCustom &&
        isValidStartDate &&
        isValidEndDate && { startDate: IsoStartDate, endDate: isoEndDate }),
    };

    dispatch(getLeaveManagementHistory(payload));
  };

  const { filterTabsCheck, setFilterTabsCheck } = useState(false);

  const applyCustomDateFilter = () => {
    setOpenDialog(false);
    if (startDate && endDate) {
      setStartDate(null);
      setEndDate(null);
      getLeaveManagementHistoryData();
      setFilterTabsCheck(true);
    }
  };

  const handleRemarkDialogOpen = (index) => {
    setRowId(index);
    setOpenRemarkDialog(true);
  };

  const handleRemarkDialogClose = () => setOpenRemarkDialog(false);

  const handleKeepRemarkStatus = (status) => {
    console.log("status", status);
    const payload = {
      status,
      remark,
    };

    dispatch(changeLeaveStatusById({ data: payload, id: rowId })).then(
      (response) => {
        setOpenRemarkDialog(false);
        if (response?.meta?.requestStatus === "fulfilled") {
          toast.success(response.payload.message);
          getLeaveManagementHistoryData();
        } else if (response?.meta?.requestStatus === "rejected") {
          toast.error("Failed to update leave status.");
        }
      }
    );
  };

  useEffect(() => {
    if (id && selected !== "Custom") {
      getLeaveManagementHistoryData();
    }
    // else if(filterTabsCheck || selectedTab ) getLeaveManagementHistoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    page,
    rowsPerPage,
    selectedTab,
    selectedOption,
    id,
    // search,
    selected,
    filterTabsCheck,
  ]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1.5}
        sx={{
          border: "2px solid #674D9F",
          borderBottom: "none",
          borderRadius: "20px 20px 0px 0px",
          marginTop: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography
            sx={{
              fontSize: { md: "14px", sm: "13px", xs: "12px" }, // Font size for the text
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
              cursor: "pointer",
            }}
            onClick={handleOpenMenu}
          >
            {selectedOption}
            <KeyboardArrowDownIcon
              sx={{
                fontSize: { md: "20px", sm: "15px", xs: "15px" },
                //marginLeft: "6px",
                color: "#0E0031",
              }}
            />
          </Typography>
          <Menu
            anchorEl={dropdownAnchor}
            open={Boolean(dropdownAnchor)}
            onClose={handleCloseMenu}
            sx={{
              "& .MuiPaper-root": {
                padding: "6px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem
              onClick={() => handleSelectOption("leave")}
              sx={{ fontSize: "14px", fontWeight: "600" }}
            >
              Leave Requests
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectOption("late coming")}
              sx={{ fontSize: "14px", fontWeight: "600" }}
            >
              Late Coming
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectOption("day out")}
              sx={{ fontSize: "14px", fontWeight: "600" }}
            >
              Day/Night Out
            </MenuItem>
          </Menu>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          p={1}
          borderRadius={2}
          justifyContent="flex-end"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: { xs: 0.5, sm: 0.3, lg: 1.5 },
              flexWrap: "wrap",
            }}
          >
            {tabs.map((tab) => (
              <Box key={tab}>
                {tab === "Today" ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* Custom Menu for Date Range */}

                    <Button
                      variant="outlined"
                      onClick={handleOpenDropdown}
                      sx={{
                        minWidth: 38,
                        fontSize: { md: "14px", sm: "12px", xs: "9px" },
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: 1,
                        padding: { sm: "2px 4px", xs: "1px 3px" },
                        borderWidth: "2px",
                        borderStyle: "solid",
                        boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                        borderImage:
                          selectedTab === tab
                            ? "none"
                            : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1",
                        backgroundColor:
                          selectedTab === "Today" ? "#6B52AE" : "#fff",
                        color: selectedTab === "Today" ? "#fff" : "#A9A9A9",
                      }}
                    >
                      {selected.replace("Current", "This")}
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: { md: "17px", sm: "12px", xs: "9px" },
                          marginLeft: "6px",
                          color: selectedTab === "Today" ? "#fff" : "#A9A9A9",
                        }}
                      />
                    </Button>
                    <Menu
                      anchorEl={dropdownAn}
                      open={Boolean(dropdownAn)}
                      onClose={handleClose}
                      sx={{
                        "& .MuiPaper-root": {
                          border: "2px solid #ccc",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          width: "100px",
                          padding: 0,
                        },
                        "& .MuiMenu-list": {
                          padding: 0,
                        },
                      }}
                    >
                      {tabs2.map((tab, i) => (
                        <MenuItem
                          key={i}
                          onClick={() => SelectOption(tab)}
                          sx={{
                            paddingLeft: "5px",
                            paddingY: "5",
                            backgroundColor:
                              i % 2 === 0 ? "transparent" : "#f5f0ff",
                          }}
                        >
                          {tab}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedTab(tab)}
                    sx={{
                      minWidth: 38,
                      fontSize: { md: "14px", sm: "12px", xs: "9px" },
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 1,
                      //padding: "4px 8px",
                      padding: { sm: "2px 4px", xs: "1px 3px" },
                      borderWidth: "2px",
                      borderStyle: "solid",
                      boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                      borderImage:
                        selectedTab === tab
                          ? "none"
                          : "linear-gradient(180deg, #9B7BC6 , #FDFAFF ) 1",
                      backgroundColor: selectedTab === tab ? "#6B52AE" : "#fff",
                      color: selectedTab === tab ? "#fff" : "#A9A9A9",
                    }}
                  >
                    {tab}
                  </Button>
                )}
              </Box>
            ))}

            {/* Dialog for custom date range */}
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              sx={{
                "& .MuiPaper-root": {
                  zIndex: 1301, // Ensure dialog has a higher z-index than other elements
                  borderRadius: "16px",
                  border: "2px solid #ACB5BD",
                },
              }}
            >
              <DialogTitle
                sx={{ fontSize: "14px", textTransform: "uppercase" }}
              >
                Date Range
              </DialogTitle>
              <Divider sx={{ borderBottomWidth: "2px" }} />
              <DialogContent sx={{ maxHeight: "400px", overflowY: "auto" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{
                      padding: 2,
                      border: "1px solid #ccc",
                      borderRadius: "16px",
                    }}
                  >
                    {/* Start Date Picker */}
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue) => setStartDate(newValue)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "30px", // Rounded corners
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                        },
                      }}
                    />

                    {/* Arrow Icon */}
                    <Typography
                      variant="h6"
                      sx={{ color: "#555", fontWeight: "bold" }}
                    >
                      →
                    </Typography>

                    {/* End Date Picker */}
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      format="DD-MM-YYYY"
                      minDate={dayjs(startDate)}
                      onChange={(newValue) => setEndDate(newValue)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "30px", // Rounded corners
                        },
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ fontSize: "14px" }}
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ fontSize: "14px" }}
                  onClick={applyCustomDateFilter}
                  color="primary"
                  // disabled={!dateRange[0] || !dateRange[1]}
                >
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          background: "linear-gradient(180deg, #674D9F, #FDFAFF)",
          padding: "1.5px 2px 0px 2px ",
          borderRadius: 0,
          width: "100%",
          maxHeight: "500px", // Set fixed height for the table container
          overflowY: "auto", // Enable vertical scrolling when content exceeds height
        }}
      >
        <Box
          sx={{
            background: "white",
            overflow: "auto",
            width: "100%", 
          }}
        >
          <Table
            sx={{ width: "100%", tableLayout: "auto" }}
            aria-label="leave requests table"
          >
            <TableHead sx={{ borderBottom: "1px solid #674D9F" }}>
              <TableRow sx={{ borderBottom: "1px solid #674D9F" }}>
                {TableHeadData.map((column, index) => (
                  <TableCell key={index} align={column.align || "left"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ borderTop: "2px solid #674D9F" }}>
              {isLeaveHistory ? (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={{ height: 200 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {historyData && historyData.length > 0 ? (
                    historyData.map((row, index) => (
                      <TableRow
                        key={row._id}
                        hover
                        sx={{
                          transition: "box-shadow 0.3s, transform 0.3s",
                          "&:hover": {
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            transform: "scale(1.01)",
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row?.uniqueId || "-"}</TableCell>
                        <TableCell>{row?.ticketId || "-"}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              sx={{ width: 30, height: 30, marginRight: 1 }}
                              src={row?.image}
                              alt={row.name}
                            >
                              {!row?.image && row.name?.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" color="text.primary">
                              {row.name || "-"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ minWidth: "190px" }}>
                          {moment
                            .utc(row.startDate)
                            .format("DD MMM YYYY | hh:mm A") || "-"}
                        </TableCell>
                        <TableCell sx={{ minWidth: "190px" }}>
                          {moment
                            .utc(row.endDate)
                            .format("DD MMM YYYY | hh:mm A") || "-"}
                        </TableCell>
                        <TableCell align="left">{row.days} D</TableCell>
                        <TableCell>
                          <Tooltip title={row.description} arrow>
                            <Typography
                              variant="body2"
                              sx={{
                                maxWidth: 180,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {row.description || "-"}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={{ minWidth: 100 }}>{`${
                          row?.floorNumber || "-"
                        } | ${row?.roomNumber || "-"}`}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              textTransform: "capitalize",
                              borderRadius: 20,
                              border: `1px solid ${
                                row.leaveStatus === "pending"
                                  ? "#FFA500"
                                  : row.leaveStatus === "rejected" ||
                                    row.leaveStatus === "cancelled"
                                  ? "#FF0000"
                                  : "#008000"
                              }`,
                              color:
                                row.leaveStatus === "pending"
                                  ? "#FFA500"
                                  : row.leaveStatus === "rejected" ||
                                    row.leaveStatus === "cancelled"
                                  ? "#FF0000"
                                  : "#008000",
                            }}
                          >
                            {row.leaveStatus}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            disabled={!row.canEdit}
                            variant="contained"
                            sx={{ textTransform: "capitalize" }}
                            onClick={() => handleRemarkDialogOpen(row._id)}
                          >
                            <CancelOutlinedIcon color="#0E0031" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        <NoDataAvailable />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <CancelLeaveDialog
        remark={remark}
        setRemark={setRemark}
        open={openRemarkDialog}
        onClose={handleRemarkDialogClose}
        onStatusHandle={handleKeepRemarkStatus}
      />
      <CustomPagination
        rowsPerPage={rowsPerPage}
        page={page}
        count={historyCount}
        // selectedStatusCount={selectedStatusCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      ></CustomPagination>
    </Box>
  );
};

export default React.memo(SideDrawerTable);

SideDrawerTable.propTypes = {
  id: PropTypes.string.isRequired,
};

const TableHeadData = [
  { label: "S No.", align: "left" },
  { label: "YocoId", align: "left" },
  { label: "TicketId", align: "left" },
  { label: "Name", align: "left" },
  { label: "Check-Out", align: "left" },
  { label: "Check-In", align: "left" },
  { label: "Duration", align: "left" },
  { label: "Reason", align: "left" },
  { label: "Floor & Room", align: "left" },
  { label: "Status", align: "left" },
  { label: "", align: "center" },
];
