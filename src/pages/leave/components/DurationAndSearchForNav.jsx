import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { ReportDropDownOptions } from "@components/enums/leaveEnum";
import {
  getCurrentlyOutInfo,
  getLeaveReportSummary,
} from "@features/leave/leaveSlice";
import { useDispatch } from "react-redux";
import CustomDateRangeDialog from "./custom/CustomDateRangeDialog";
import CustomAutocomplete from "./custom/CustomFilterAutoComplete";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

const DurationAndSearchForNav = () => {
  dayjs.extend(utc);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isoStartDate = startDate
    ? dayjs(startDate).utc(true).startOf("day").toISOString()
    : null;

  const isoEndDate = endDate
    ? dayjs(endDate).utc(true).startOf("day").toISOString()
    : null;

  // Retrieve selectedDuration from localStorage on component mount
  const [selectedDuration, setSelectedDuration] = useState(() => {
    const storedDuration = localStorage.getItem("selectedDuration");
    return storedDuration
      ? JSON.parse(storedDuration)
      : ReportDropDownOptions[0] || null;
  });

  // Save selectedDuration to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedDuration", JSON.stringify(selectedDuration));
  }, [selectedDuration]);

  // Handle Apply button click in the dialog
  const handleCustomApply = () => {
    setOpenDialog(false);

    // Add start and end dates if "Custom" is selected
    if (selectedDuration.label === "Custom") {
      let payload = {
        durationType: selectedDuration.value,
      };

      payload.startDate = isoStartDate;
      payload.endDate = isoEndDate;
      handleSummaryAndCurrentlyOut(payload);
      setOpenDialog(false);
      setSelectedDuration(ReportDropDownOptions[0])
    }
  };

  const handleSummaryAndCurrentlyOut = (requestData) => {
    dispatch(getLeaveReportSummary(requestData));
    dispatch(getCurrentlyOutInfo(requestData));
  };

  // Create payload and hit API
  const handleApplyFilters = (e, newValue) => {
    setSelectedDuration(newValue);
    if (newValue.value !== "custom") {
      let payload = {
        durationType: newValue.value,
      };

      // Hit the API with the payload
      handleSummaryAndCurrentlyOut(payload);
    }
    if (newValue.value === "custom") {
      setOpenDialog(true);
    }
  };

  return (
    <div>
      {/* Duration Dropdown */}
      <Box>
        <CustomAutocomplete
          options={ReportDropDownOptions}
          value={selectedDuration}
          onChange={handleApplyFilters}
          placeholder="Select Duration"
        />
      </Box>

      {/* Dialog for custom date range */}
      <CustomDateRangeDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleApply={handleCustomApply}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </div>
  );
};

export default DurationAndSearchForNav;
