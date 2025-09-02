/* eslint-disable no-constant-binary-expression */
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
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import PropTypes from "prop-types";
import { DurationEnum } from "@components/enums/messEnums";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import moment from "moment";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ComplaintsSideDrawerTable = ({
  rowsPerPage,
  page,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  setSelectedDuration,
  selectedDuration,
  individualComplaint,
  individualComplaintLoading,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  // setFilterTabsCheck,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);

  useEffect(() => {
    if (selectedDuration?.value === "custom") {
      setOpenDialog(true);
    }
  }, [selectedDuration]);

  const handleFilterChange = (_, newValue) => {
    if (newValue?.value === "custom") {
      setSelectedDuration((prev) => ({
        ...newValue,
        forceUpdate: !prev?.forceUpdate,
      }));
    } else {
      setSelectedDuration(newValue);
    }
  };

  const handleCustomDateFilter = () => {
    setOpenDialog(false);
    setStartDate(tempStartDate); // Update only when Apply is clicked
    setEndDate(tempEndDate);
  };

  useEffect(() => {
    if (selectedDuration?.value === "custom") {
      setOpenDialog(true);
      setTempStartDate(startDate); // Reset temp values when dialog opens
      setTempEndDate(endDate);
    }
  }, [selectedDuration]);

  return (
    <>
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
              <Typography fontWeight="bold">Complaints History</Typography>
            </Box>
            <Box>
              <Autocomplete
                size="small"
                disableClearable // Disable the clear icon (cross icon)
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        textTransform: "capitalize",
                        fontWeight: 500,
                        borderRadius: "3px",
                        px: 1,
                        borderWidth: "2px",
                        borderStyle: "solid",
                        boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.15)",
                        borderImage:
                          "linear-gradient(180deg, #674D9F, #FDFAFF) 1",
                        backgroundColor: "#fff",
                        fontSize: "14px",
                        width: "150px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    inputProps={{
                    ...params.inputProps,
                    readOnly: true, // Disables typing
                  }}
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                fullWidth
              />
            </Box>
          </Box>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            background: "linear-gradient(180deg, #674D9F, #FDFAFF)",
            padding: "1.5px 2px 0px 2px",
            borderRadius: 0,
            width: "100%",
          }}
        >
          <Box
            sx={{
              background: "white",
              overflowX: "auto", // Allow horizontal scrolling if needed
            }}
          >
            <Table stickyHeader aria-label="leave management table">
              <TableHead>
                <TableRow>
                  {TableHeadData?.map((column) => (
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
                {individualComplaint?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="h6" color="textSecondary">
                        <NoDataAvailable />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : individualComplaintLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ height: 200 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  individualComplaint?.map((row, index) => (
                    <TableRow key={index}>
                      {/* Serial Number Column */}
                      <TableCell align="center">
                        <Typography fontSize="12px" fontWeight="400">
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize="12px" fontWeight="400">
                          {row?.uniqueId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={row?.userImage}
                            alt={row?.name}
                            sx={{ width: 30, height: 30, marginRight: 1 }}
                          >
                            {row?.name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography fontSize="12px" fontWeight="400">
                            {row?.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{minWidth: "170px"}}>
                        <Typography fontSize="12px" fontWeight="400">
                          {moment
                            .utc(row?.createdAt)
                            .format("Do MMM, YYYY | hh:mm A")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize="12px" fontWeight="400">
                          {row?.subCategoryName || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize="12px" fontWeight="400">
                          {row?.categoryType || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize="12px" fontWeight="400">
                          {row?.categoryName || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize="12px" fontWeight="400">
                          {row?.roomNumber ? `${row?.floorNumber}/${row?.roomNumber}` : "-/-"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
        <CustomPagination
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          // selectedStatusCount={selectedStatusCount}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        ></CustomPagination>
      </Box>
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
                value={startDate}
                format="DD-MM-YYYY"
                onChange={(newValue) => setTempStartDate(newValue)}
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
                minDate={dayjs(tempStartDate)}
                onChange={(newValue) => setTempEndDate(newValue)}
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
            onClick={handleCustomDateFilter}
            color="primary"
            // disabled={!dateRange[0] || !dateRange[1]}
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ComplaintsSideDrawerTable;

ComplaintsSideDrawerTable.propTypes = {
  studentId: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  rowsPerPage: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  setSelectedDuration: PropTypes.func.isRequired,
  selectedDuration: PropTypes.string.isRequired,
  individualComplaint: PropTypes.array.isRequired,
  individualComplaintLoading: PropTypes.boolean,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
};

const TableHeadData = [
  { label: "S No.", value: "serialNumber", align: "center" }, // Added Serial Number Column
  { label: "YOCO ID", value: "yocoid", align: "left", id: "YOCOID" },
  { label: "Name", value: "name", align: "left" },
  { label: "Created Date", value: "createddate", align: "left" },
  { label: "Complaint Reason", value: "complaintreason", align: "left" },
  { label: "Type", value: "typeofcomplaint", align: "left" },
  { label: "Reason", value: "reason", align: "left" },
  { label: "Floor & Room", value: "floorandroom", align: "left" },
];
