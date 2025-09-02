import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const CustomDateRangeDialog = ({
  openDialog,
  setOpenDialog,
  handleApply,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {

  return (
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
      {/* Dialog Title */}
      <DialogTitle sx={{ fontSize: "12px", textTransform: "uppercase" }}>
        Date Range
      </DialogTitle>

      {/* Divider */}
      <Divider
        sx={{
          borderBottomWidth: "2px", // Adjust thickness as needed
        }}
      />

      {/* Dialog Content */}
      <DialogContent sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" alignItems="center" gap={2} sx={{ padding: 2 }}>
            {/* Start Date Picker */}
            <DatePicker
              label="Start Date"
              format="DD-MM-YYYY"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px", // Rounded corners
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                },
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            {/* Arrow Icon */}
            <Typography
              variant="h6"
              sx={{ color: "#674D9F", fontWeight: "bold" }}
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
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </LocalizationProvider>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions>
        <Button
          sx={{ fontSize: "12px" }}
          onClick={() => setOpenDialog(false)}
        >
          Cancel
        </Button>
        <Button
          sx={{ fontSize: "12px" }}
          onClick={() => {
            handleApply(); // Pass start and end dates to the handler
            setStartDate(null);
            setEndDate(null);
          }}
          color="primary"
          disabled={!startDate || !endDate} // Disable Apply button if dates are not selected
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDateRangeDialog;

CustomDateRangeDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  handleApply: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.object,
  setEndDate: PropTypes.func.isRequired,
};
