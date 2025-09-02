import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Rating from "@mui/material/Rating";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FoodWastageSideDrawerTab from "./FoodWastageSideDrawerTab";
import DonutChart from "./DonutChart";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFoodWastageReportAsync } from "@features/mess/messSlice";

const TabEnum = { Feedback: "Feedback", FoodWastage: "FoodWastage" };

const MessManagementCardsTwo = () => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState(TabEnum.Feedback);
  const [selectedDuration, setSelectedDuration] = useState(
    FileterEnum[0] || null
  );

  const { getFoodWastageReport } = useSelector((state) => state.mess);

  const toggleDrawer = (state) => () => {
    setOpenDrawer(state);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFilterChange = (event, newValue) => {
    setSelectedDuration(newValue);
  };

  useEffect(() => {
    const payload = {
      durationType: selectedDuration?.value,
    };
    dispatch(getFoodWastageReportAsync(payload));
  }, [selectedDuration, activeTab]);

  return (
    <Box
      sx={{
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "20px !important",
        borderImage: "linear-gradient(180deg, #9B7BC6, #FDFAFF) 1",
        boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
        px: 2,
        height:'100%'

      }}
    >
      {/* Tabs Section */}
      <Box
        sx={{
          borderBottom: "1px solid #ccc",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="primary"
            variant="scrollable"
            fullWidth
            sx={{
              ".Mui-selected": { fontWeight: "bold" },
            }}
          >
            <Tab
              sx={{ color: "#674D9F", fontSize: "12px" }}
              label="Feedback"
              value={TabEnum.Feedback}
            />
            <Tab
              sx={{ color: "#674D9F", fontSize: "12px" }}
              label="Food Wastage"
              value={TabEnum.FoodWastage}
            />
          </Tabs>
        </Box>
        <Box>
          <Autocomplete
            size="small"
            disableClearable // Disable the clear icon (cross icon)
            clearOnEscape={false}
            options={FileterEnum}
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
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            fullWidth
          />
        </Box>
      </Box>
      {/* Content Section */}
      {activeTab === TabEnum.Feedback && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          width="100%"
          gap={4}
          p={1.5}
          alignItems={{ xs: "left", md: "flex-start" }}
          justifyContent="space-between"
        >
          {/* Rating Tab Section */}
          <Box>
            <Typography sx={{ fontSize: "30px" }} fontWeight="bold">
              4.5
            </Typography>
            <Rating
              readOnly
              sx={{ color: "#674D9F" }}
              name="half-rating"
              defaultValue={3.8}
              precision={0.5}
            />
            <Typography
              fontSize="14px"
              fontWeight="bold"
              sx={{ color: "#ACB5BD", marginTop: "5px" }}
            >
              Based on 300 ratings
            </Typography>
            <Button
              onClick={toggleDrawer(true)}
              size="small"
              sx={{ color: "#ACB5BD", marginTop: "20px", textAlign: "center" }}
            >
              More details <KeyboardArrowDownIcon />
            </Button>
          </Box>
          <FoodWastageSideDrawerTab
            openDrawer={openDrawer}
            toggleDrawer={toggleDrawer}
          />

          {/* Progress Section */}
          <Box width={{ xs: "100%", md: "60%" }}>
            {[
              { label: "Best", value: 90, score: 4.1 },
              { label: "Better", value: 70, score: 4.1 },
              { label: "Good", value: 50, score: 3.5 },
              { label: "Poor", value: 30, score: 1.3 },
            ].map((item) => (
              <Box key={item.label} mb={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="14px" fontWeight="bold" color="#674D9F">
                    {item.label}
                  </Typography>
                  <Typography fontSize="14px" fontWeight="bold" color="#674D9F">
                    {item.score}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{
                    height: 8,
                    width: "100%",
                    borderRadius: 5,
                    backgroundColor: "#E0E0E0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        item.label === "Poor" ? "#F4BE30" : "#674D9F",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {/* Rating FoodWastage section */}
      {activeTab === TabEnum.FoodWastage && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          width="100%"
          alignItems={{ xs: "left", md: "center" }}
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <DonutChart getFoodWastageReport={getFoodWastageReport} />
        </Box>
      )}
    </Box>
  );
};
export default MessManagementCardsTwo;

const FileterEnum = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Current Week", value: "current week" },
  { label: "Last Week", value: "last week" },
  { label: "Past Two Week", value: "past two week" },
  { label: "Current Month", value: "current month" },
  { label: "Last Month", value: "last month" },
  { label: "Current Year", value: "current year" },
  { label: "Last Year", value: "last year" },
];
