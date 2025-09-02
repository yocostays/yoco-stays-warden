import {
  Box,
  Divider,
  LinearProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFrequentComplaintCategoriesAsync,
  getTotalComplaintOverviewAsync,
} from "@features/complaints/complaintsSlice";
import CustomAutocomplete from "@pages/leave/components/custom/CustomFilterAutoComplete";
import { allDurationEnum } from "@components/enums/allEnums";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import CustomDateRangeDialog from "@pages/leave/components/custom/CustomDateRangeDialog";
import ResponsiveBarChart from "@components/customComponents/CustromXYAxisBarChart";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";

const ComplaintsCardOne = () => {
  dayjs.extend(utc);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(
    allDurationEnum[2] || null
  );

  const { getFrequentComplaintCategories, getTotalComplaintOverview } =
    useSelector((state) => state.complaint);

  // Updated Bar Chart Data
  const modifiedGraphData = getFrequentComplaintCategories?.map((items) => ({
    name: items.categoryName,
    uv: items.complaintCount,
  }));

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
    dispatch(getFrequentComplaintCategoriesAsync(requestData));
    dispatch(getTotalComplaintOverviewAsync(requestData));
  };

  useEffect(() => {
    const payload = {
      filter: selectedDuration.value,
    };
    handleSummaryAndCurrentlyOut(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "center", md: "flex-start" },
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
        px: { xs: 2, sm: 2 },
        py: { xs: 2, sm: 2 },
        height: "100%",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Left Section - Frequent Complaint Categories */}
      <Box sx={{ width: { xs: "100%", md: "50%" } }}>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "18px", md: "21px" },
            color: "#674D9F",
            fontWeight: "700",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Frequent Complaint Categories
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Ensures vertical centering
            minHeight: "200px", // Helps in maintaining proper height
          }}
        >
          {getFrequentComplaintCategories.length > 0 ? (
            <ResponsiveBarChart modifiedGraphData={modifiedGraphData} />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                minHeight: "200px",
                width: "100%",
                textAlign: "center", // Ensures text stays centered
              }}
            >
              <NoDataAvailable
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "16px" }, // More readable at all sizes
                  transform: {
                    xs: "scale(0.8)",
                    sm: "scale(0.9)",
                    md: "scale(1)",
                  }, // Scales properly
                  maxWidth: "80%",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      {/* Divider for Medium+ Screens */}
      <Divider
        orientation={
          useMediaQuery(theme.breakpoints.down("md"))
            ? "horizontal"
            : "vertical"
        }
        flexItem
        sx={{
          backgroundColor: "#674D9F",
          width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "1px",
          height: useMediaQuery(theme.breakpoints.down("md")) ? "1px" : "auto",
          margin: useMediaQuery(theme.breakpoints.down("md"))
            ? "12px 0"
            : "0 12px",
        }}
      />
      {/* Right Section - Complaints Overview */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-around"
          gap={2}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "21px" },
              color: "#674D9F",
              fontWeight: "700",
            }}
          >
            Total Complaints -{" "}
            {getTotalComplaintOverview?.totalComplaints || "0"}
          </Typography>

          {/* Duration Filter */}
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

        {/* Complaint Progress Bars */}
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexWrap="wrap"
          sx={{ mt: { xs: 2, md: "30%" } }}
        >
          <Box sx={{ minWidth: "120px" }}>
            <Box display="flex" gap={1} alignItems="center">
              <CircleIcon sx={{ width: "10px", color: "#7E57C2" }} />
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "16px" }, fontWeight: "600" }}
              >
                Resolved - {getTotalComplaintOverview?.resolvedCount || "0"}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={83}
              sx={{ borderRadius: "10px" }}
            />
          </Box>

          <Box sx={{ minWidth: "120px" }}>
            <Box display="flex" gap={1} alignItems="center">
              <CircleIcon sx={{ width: "10px", color: "#fbc02d" }} />
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "16px" }, fontWeight: "600" }}
              >
                Pending - {getTotalComplaintOverview?.pendingCount || "0"}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={19}
              sx={{
                "& .MuiLinearProgress-bar": { backgroundColor: "#fbc02d" },
                borderRadius: "10px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComplaintsCardOne;
