import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomDonutChart from "@components/customComponents/CustomDonutChart";
import CustomAutocomplete from "@pages/leave/components/custom/CustomFilterAutoComplete";
import { allDurationEnum } from "@components/enums/allEnums";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDispatch, useSelector } from "react-redux";
import CustomDateRangeDialog from "@pages/leave/components/custom/CustomDateRangeDialog";
import { getAvgResolutionTimeAsync } from "@features/complaints/complaintsSlice";

const ComplaintsCardTwo = () => {
  dayjs.extend(utc);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { getAvgResolutionTime } = useSelector((state) => state.complaint);

  const modifiedResolutionData = getAvgResolutionTime?.map((items) => ({
    categoryType: items.categoryType,
    totalAmount: `${items.avgResolutionTimeInHours} / ${items.resolvedCount} Complaints `,
    resolvedCount: items?.resolvedCount,
  }));

  const [selectedDuration, setSelectedDuration] = useState(
    allDurationEnum[5] || null
  );

  const isoStartDate = startDate
    ? dayjs(startDate).utc(true).startOf("day").toISOString()
    : null;

  const isoEndDate = endDate
    ? dayjs(endDate).utc(true).startOf("day").toISOString()
    : null;

  // Handle Apply button click in the dialog
  const handleCustomApply = () => {
    setOpenDialog(false);

    // Add start and end dates if "Custom" is selected
    if (selectedDuration.label === "Custom") {
      let payload = {
        filter: selectedDuration.value,
      };

      payload.startDate = isoStartDate;
      payload.endDate = isoEndDate;
      handleSummaryAndCurrentlyOut(payload);
      setOpenDialog(false);
      setSelectedDuration(allDurationEnum[0]);
    }
  };

  // Create payload and hit API
  const handleFilters = (e, newValue) => {
    setSelectedDuration(newValue);
    if (newValue.value !== "custom") {
      let payload = {
        filter: newValue.value,
      };

      // Hit the API with the payload
      handleSummaryAndCurrentlyOut(payload);
    }
    if (newValue.value === "custom") {
      setOpenDialog(true);
    }
  };

  const handleSummaryAndCurrentlyOut = (requestData) => {
    dispatch(getAvgResolutionTimeAsync(requestData));
  };

  useEffect(() => {
    const payload = {
      filter: selectedDuration.value,
    };
    handleSummaryAndCurrentlyOut(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Starting angle for each slice

  return (
    <Box
      sx={{
        boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
        padding: "15px",
        borderRadius: "10px",
        height: "100%",
        backgroundColor: "#FFFFFF",
        py: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" px={2}>
        <Box>
          <Typography
            sx={{ fontSize: "21px", color: "#674D9F", fontWeight: "700" }}
          >
            Avg Resolution Time
          </Typography>
        </Box>

        <Box>
          <CustomAutocomplete
            options={allDurationEnum}
            value={selectedDuration}
            onChange={handleFilters}
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
      </Box>
      <Box>
        <Box sx={{ marginTop: { xs: 2, sm: 2, md: 2, lg: 0 } }}>
          <CustomDonutChart
            customData={modifiedResolutionData}
            showButton={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ComplaintsCardTwo;
