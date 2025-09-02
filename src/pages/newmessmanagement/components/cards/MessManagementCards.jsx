import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Gauge } from "@mui/x-charts";
import { useDispatch, useSelector } from "react-redux";
import { getMessReportSummaryAsync } from "@features/mess/messSlice";
import {
  Autocomplete,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "@theme/Theme";

const TabEnum = {
  TotalBooking: "booked",
  TotalCancellation: "cancelled",
  NonBooking: "not booked",
  GuestBooking: "guest booked",
};

const MessManagementCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(TabEnum.TotalBooking);
  const [selectedDuration, setSelectedDuration] = useState(
    FileterEnum[0] || null
  );

  const { createMessReportSummary } = useSelector((slice) => slice.mess);

  const { totalCount, breakfastCount, dinnerCount, lunchCount, snacksCount } =
    createMessReportSummary;

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleChange = (event, newValue) => {
    setSelectedDuration(newValue);
  };

  useEffect(() => {
    const payload = {
      status: selectedDuration?.value,
      type: activeTab,
    };
    dispatch(getMessReportSummaryAsync(payload));
  }, [selectedDuration, activeTab]);

  const mealData = [
    { label: "Breakfast", value: breakfastCount },
    { label: "Lunch", value: lunchCount },
    { label: "Snacks", value: snacksCount },
    { label: "Dinner", value: dinnerCount },
  ];

  return (
    <Box
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "20px",
        borderImage: "linear-gradient(180deg, #9B7BC6, #FDFAFF) 1",
        boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #674D9F",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          py: { xs: "5px", sm: "0" },
          px: { xs: "5px", sm: "0" },
        }}
      >
        <Box
          sx={{
            flexWrap: "wrap",
            gap: { xs: "10px", md: "none" },
          }}
        >
          {Object.entries(TabEnum).map(([key, value]) => (
            <Button
              key={key}
              variant={activeTab === value ? "contained" : "text"}
              onClick={() => handleTabChange(value)}
              disabled={key === "GuestBooking"} // Disable the GuestBooking button
              sx={{
                fontSize: { xs: "9px", md: "12px" },
                fontWeight: activeTab === value ? "bold" : "bold",
                textTransform: "none",
                borderRadius: "20px",
                transition: "none",
                padding: "15px 12px",
              }}
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
            </Button>
          ))}
        </Box>

        <Box>
          <Autocomplete
            size="small"
            disableClearable // Disable the clear icon (cross icon)
            clearOnEscape={false}
            options={FileterEnum}
            getOptionLabel={(option) => option.label}
            value={selectedDuration}
            onChange={handleChange}
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
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            fullWidth
          />
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        gap={2}
        px={2}
        sx={{ height: "100%" }}
        position="relative"
      >
        <Box
          sx={{
            position: "absolute",
            top: "15px",
            right: { xs: "25px", sm: "15px" },
          }}
        >
          {activeTab === "not booked" && (
            <Box
              sx={{
                display: !isSmallScreen ? "none" : "flex",
                justifyContent: { md: "center", xs: "flex-end" },
                height: "100%",
                width: "100%",
                ml: 2,
              }}
            >
              <IconButton
                variant="contained"
                sx={{
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  backgroundColor: "#674D9F",
                  "&:hover": {
                    backgroundColor: "#6B52BF",
                    color: "#fff",
                  },
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginRight: { xs: 0, sm: 2, md: "0px" },
                }}
                onClick={() => navigate("/newmessmanagement/addmissedbooking")}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>

        <Stack spacing={2} alignItems="center">
          <Gauge
            width={200}
            height={200}
            value={totalCount || 0}
            cornerRadius="50%"
            sx={{
              width: { xs: "100%", sm: "80%" },
              "& .gauge-valueText": { fontSize: 12 },
              "& .gauge-valueArc": { fill: "#674D9F" },
              "& .gauge-referenceArc": { fill: "#D9D9D9" },
              fontSize: "45px",
            }}
          />
        </Stack>

        <Box width="100%">
          {mealData.map((meal, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                fontWeight="medium"
                sx={{ width: { xs: "100%", sm: "45%", md: "30%" } }}
              >
                {meal?.label}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ color: "#6B52AE" }}
              >
                {meal?.value}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={meal?.value}
                sx={{
                  width: { xs: "100%", sm: "80%" },
                  height: 8,
                  borderRadius: 5,
                }}
              />
            </Box>
          ))}
        </Box>

        {activeTab === "not booked" && (
          <Box
            sx={{
              display: isSmallScreen ? "none" : "flex",
              justifyContent: { md: "center", xs: "flex-end" },
              flexWrap: "wrap",
              height: "100%",
              // width: "100%",
              alignItems: "flex-end",
              ml: 2,
            }}
          >
            <IconButton
              variant="contained"
              sx={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                backgroundColor: "#674D9F",
                "&:hover": {
                  backgroundColor: "#6B52BF",
                  color: "#fff",
                },
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: { xs: 0, sm: 2, md: "0px" }, // Removed `!important`, proper usage
                marginTop: { xs: 0, sm: 0, md: 0, lg: "80px" },
                marginBottom: { xs: 0, sm: "20px", md: "10px", lg: "10px" }, // 150px for md, 0 for all others
              }}
              onClick={() => navigate("/newmessmanagement/addmissedbooking")}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(MessManagementCards);

const FileterEnum = [
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Current Week", value: "current week" },
  { label: "Current Month", value: "current month" },
  { label: "Current Year", value: "current year" },
];
