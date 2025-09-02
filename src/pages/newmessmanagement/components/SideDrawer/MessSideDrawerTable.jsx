import {
  Box,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Table,
  Autocomplete,
  TextField,
  Avatar,
  DialogActions,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import { DurationEnum } from "@components/enums/messEnums";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import utc from "dayjs/plugin/utc";
import { getMealBookingHistoryListAsync } from "@features/mess/messSlice";

const MessSideDrawerTable = ({ studentId, drawerOpen }) => {
  dayjs.extend(utc);
  const dispatch = useDispatch();
  const { getMealBookingHistoryList } = useSelector((state) => state.mess);

  const [selectedDuration, setSelectedDuration] = useState(DurationEnum[0] || null);
  const [openCustomDialog, setOpenCustomDialog] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  const IsoStartDate = customStartDate
    ? dayjs(customStartDate).utc(true).startOf("day").toISOString()
    : null;

  const IsoEndDate = customEndDate
    ? dayjs(customEndDate).utc(true).startOf("day").toISOString()
    : null;

  // Close the custom date range dialog
  const handleCustomDialogClose = () => {
    setOpenCustomDialog(false);
    setCustomStartDate(null);
    setCustomEndDate(null);
  };

  // Handle Apply button in the custom date range dialog
  const handleApplyCustomFilter = () => {
    if (!studentId) return; // Do not proceed if studentId is missing

    const payload = {
      durationType: selectedDuration.value,
      startDate: IsoStartDate,
      endDate: IsoEndDate,
    };

    fetchMealBookingHistory(payload);
    handleCustomDialogClose();
  };

  // Fetch meal booking history
  const fetchMealBookingHistory = (values) => {
    if (!studentId) return; // Do not proceed if studentId is missing

    const params = {
      studentId,
      durationType: values.durationType,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    dispatch(getMealBookingHistoryListAsync(params));
  };

  // Handle filter change (non-custom and custom)
  const handleFilterChange = (event, newValue) => {
    if (!studentId) return; // Do not proceed if studentId is missing

    setSelectedDuration(newValue);

    if (newValue.value !== "custom") {
      // For non-custom options, fetch data immediately
      const payload = {
        durationType: newValue.value,
      };
      fetchMealBookingHistory(payload);
    } else {
      // For custom option, open the dialog (do not fetch data yet)
      setOpenCustomDialog(true);
    }
  };

  // Fetch data when the drawer opens or the selected duration changes
  useEffect(() => {
    if (!studentId) return; // Do not proceed if studentId is missing

    if (drawerOpen && selectedDuration && selectedDuration.value !== "custom") {
      const payload = {
        durationType: 'today',
      };
      fetchMealBookingHistory(payload);
    }
  }, [drawerOpen, studentId]);

  return (
    <Box p={2}>
      {/* User Profile */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        sx={{
          border: "2px solid #674D9F",
          borderBottom: "none",
          flexWrap: "wrap",
          borderRadius: "20px 20px 0px 0px",
          marginTop: "20px",
        }}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography fontWeight="bold">Meal Booking History</Typography>
          </Box>
          <Box>
            <Autocomplete
              size="small"
              disableClearable
              clearOnEscape={false}
              options={DurationEnum}
              getOptionLabel={(option) => option.label}
              value={selectedDuration}
              onChange={handleFilterChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Meal Type"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      textTransform: "capitalize",
                      fontWeight: 500,
                      borderRadius: "3px",
                      px: 1,
                      borderWidth: "2px",
                      borderStyle: "solid",
                      boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.15)",
                      borderImage: "linear-gradient(180deg, #674D9F, #FDFAFF) 1",
                      backgroundColor: "#fff",
                      fontSize: "14px",
                      width: "150px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              )}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              fullWidth
            />
          </Box>

          {/* Dialog for custom date range */}
          <Dialog
            open={openCustomDialog}
            onClose={handleCustomDialogClose}
            sx={{
              "& .MuiPaper-root": {
                zIndex: 1301,
                borderRadius: "16px",
                border: "2px solid #ACB5BD",
              },
            }}
          >
            <DialogTitle sx={{ fontSize: "14px", textTransform: "uppercase" }}>
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
                    value={customStartDate}
                    format="DD-MM-YYYY"
                    onChange={(newValue) => setCustomStartDate(newValue)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                    }}
                  />

                  {/* Arrow Icon */}
                  <Typography variant="h6" sx={{ color: "#555", fontWeight: "bold" }}>
                    →
                  </Typography>

                  {/* End Date Picker */}
                  <DatePicker
                    label="End Date"
                    value={customEndDate}
                    format="DD-MM-YYYY"
                    minDate={dayjs(customStartDate)}
                    onChange={(newValue) => setCustomEndDate(newValue)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "30px",
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
              <Button sx={{ fontSize: "14px" }} onClick={handleCustomDialogClose}>
                Cancel
              </Button>
              <Button
                sx={{ fontSize: "14px" }}
                disabled={!(customStartDate && customEndDate)}
                onClick={handleApplyCustomFilter}
                color="primary"
              >
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          background: "linear-gradient(180deg, #674D9F, #FDFAFF)",
          padding: "1.5px 2px 0px 2px",
          borderRadius: 0,
          width: "100%",
        }}
      >
        <Box sx={{ background: "white", overflowX: "auto" }}>
          <Table stickyHeader aria-label="leave management table">
            <TableHead>
              <TableRow>
                {TableHeadData.map((column) => (
                  <TableCell
                    key={column.label}
                    align={column.align}
                    sx={{
                      padding: { xs: "8px", sm: "12px" },
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getMealBookingHistoryList.length ? (
                getMealBookingHistoryList?.map((row, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center" sx={{ padding: { xs: "8px", sm: "12px" }, textAlign: "center", whiteSpace: "nowrap" }}>
                      <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </TableCell>
                    <TableCell align="center" sx={{ padding: { xs: "8px", sm: "12px" } }}>
                      {row.uniqueId}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} src={row?.image || undefined} alt={row?.studentName}>
                          {row?.image ? null : row?.studentName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" color="text.primary">
                          {row?.studentName || "-"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ padding: { xs: "8px", sm: "12px" } }}>
                      {(row.bookedOn && `${dayjs(row.bookedOn).format("DD MMM, YYYY")} | ${dayjs(row.bookedOn).format("HH:mm a")}`) || "--"}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: { xs: "8px", sm: "12px" } }}>
                      {(row.duration && `${dayjs(row.duration).format("DD MMM, YYYY")} | ${dayjs(row.duration).format("HH:mm a")}`) || "--"}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: { xs: "8px", sm: "12px" } }}>
                      {row.mealType}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default MessSideDrawerTable;

MessSideDrawerTable.propTypes = {
  studentId: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
};

const TableHeadData = [
  { label: "", align: "right" },
  { label: "YOCO ID", align: "left", id: "YOCOID" },
  { label: "Name", align: "left" },
  { label: "BOOKED ON", align: "left" },
  { label: "DURATION", align: "left" },
  { label: "MEAL TYPE", align: "left" },
];