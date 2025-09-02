import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Tabs,
  Typography,
  Button,
  Popover,
  MenuList,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Tab } from "@mui/material";
// import CalendarBox from "./CalendarBox";
import CustomPieChart from "../../../../components/customComponents/CustomPieChart";
import { useDispatch, useSelector } from "react-redux";
import { getConsumedMeals } from "../../../../features/mess/messSlice";

const TabEnum = {
  CONSUMPTION: "consumption",
  DEFAULTER: "defaulter",
  CANCELED: "cancelled",
};

const ReportDropDownTypes = [
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

const messData = [
  { label: "Total Meals Served", value: 230 },
  { label: "Complaints", value: 50 },
  { label: "Late Meal Requests", value: 30 },
  { label: "Special Requests", value: 20 },
  { label: "Wastage", value: 100 },
];

// Function to map the selected period to the display label
const getPeriodLabel = (selectedPeriod) => {
  switch (selectedPeriod) {
    case "today":
      return "Daily";
    case "yesterday":
      return "Yesterday's Report";
    case "current week":
      return "Weekly";
    case "last week":
      return "Last Week's Report";
    case "past two week":
      return "Past Two Weeks";
    case "current month":
      return "Monthly";
    case "last month":
      return "Last Month's Report";
    case "current year":
      return "Yearly";
    case "last year":
      return "Last Year's Report";
    default:
      return "Daily";
  }
};

export const Chart1 = () => {
  const dispatch = useDispatch();
  const { consumedMeals } = useSelector((state) => state.mess);
  const [activeTab, setActiveTab] = useState(TabEnum.CONSUMPTION);
  const [selectedPeriod, setSelectedPeriod] = useState(
    ReportDropDownTypes[0].value
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  // Determine if the popover is open
  const open = Boolean(anchorEl);
  const id = open ? "menu-popover" : undefined;
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

  // eslint-disable-next-line no-unused-vars
  const [reportFilter, setReportFilter] = useState("today");

  const handleOptionChange = (data) => {
    setReportFilter(data);
  };

  // Extract users from the consumedMeals state
  const users = consumedMeals || [];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDropdownChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  // Handle button click to open the popover
  const onExport = () => {
    // setAnchorEl(event.currentTarget);
    downloadFile({ activeTab, selectedPeriod });
  };

  // Close the popover
  const handleClose = () => {
    setAnchorEl(null);
    downloadFile({ activeTab, selectedPeriod, selectedOption });
  };

  // Handle menu item selection
  const handleMenuSelect = (option) => {
    setSelectedOption(option); // Save the selected option
    handleClose(); // Close the popover after selection
  };

  const downloadFile = async (format) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${baseURL}/api/mess-report/consumed-meals/export`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            consumedType: format?.activeTab,
            durationType: format?.selectedPeriod,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Failed to fetch file");
      }

      const contentType = response.headers.get("Content-Type");
      console.log("Content-Type:", contentType);

      if (
        contentType !== "application/pdf" &&
        format?.selectedOption === "pdf"
      ) {
        throw new Error("The server did not return a PDF file");
      }

      const blob = await response.blob();
      const fileType =
        format?.selectedOption === "pdf" ? "application/pdf" : "text/csv";
      const fileURL = window.URL.createObjectURL(
        new Blob([blob], { type: fileType })
      );

      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `consumed_meals.csv`);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    const payload = {
      consumedType: activeTab,
      durationType: selectedPeriod,
    };
    if (selectedUser?.isHostelAssigned) {
      dispatch(getConsumedMeals(payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedPeriod, dispatch]);

  return (
    <>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={2}>
            {/* <CalendarBox /> */}
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
                border: "2px solid #B4B4B4",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  justifyContent: "space-between",
                  gap: 1,
                  background: "#ECE0FF",
                  width: "100%",
                  px: 1,
                  py: 0.3,
                  borderBottom: "2px solid #674D9F",
                  // minHeight:'55px'
                }}
              >
                <Box sx={{ width: { xs: "100%", lg: "60%" } }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="primary"
                    sx={{
                      fontSize: { xs: "10px", md: "12px" },
                      ".Mui-selected": {
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <Tab label="CONSUMPTION" value={TabEnum.CONSUMPTION} />
                    <Tab label="CANCELED" value={TabEnum.CANCELED} />
                    <Tab label="NOT BOOKED" value={TabEnum.DEFAULTER} />
                  </Tabs>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={onExport}
                      sx={{
                        borderRadius: "30px",
                        textTransform: "none",
                        maxWidth: 100,
                        height: "30px",
                        border: "1px solid #000",
                        background: "#fff",
                        fontSize: "10px",
                        color: "#000",
                        px: 2,
                      }}
                    >
                      Download
                    </Button>
                  </Box>
                  <Box>
                    <Select
                      value={selectedPeriod}
                      onChange={handleDropdownChange}
                      size="small"
                      sx={{
                        fontSize: { xs: "0.6rem", md: "0.7rem" },
                        borderRadius: "20px",
                        border: "1px solid black",
                        px: 0.5,
                        py: 0.5,
                        backgroundColor: "#fff",
                        // width: { xs: "30%", },
                        height: "30px",
                      }}
                    >
                      {ReportDropDownTypes.map((option, index) => (
                        <MenuItem
                          sx={{ fontSize: "14px" }}
                          key={index}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
              </Box>

              <CardContent
                sx={{
                  height: "300px",
                  overflow: users.length > 0 ? "auto" : "hidden", // Conditionally set overflow
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  msOverflowStyle: "none", // Internet Explorer and Edge
                  scrollbarWidth: "none",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "left" }}>
                  <Typography fontWeight={"bold"}>
                    {getPeriodLabel(selectedPeriod)}
                  </Typography>
                </Box>

                {/* Show user data or no data message */}
                {users.length > 0 ? (
                  <Box>
                    {users.map((user, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        my={1}
                      >
                        <Avatar src={user.image} sx={{ mr: 2, scale: 1 }} />
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={"bold"}
                            sx={{ fontSize: "12px" }}
                          >
                            {user.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ fontSize: "12px" }}
                          >
                            ID: {user.uniqueId}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  // No data available block
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      textAlign: "center",
                      color: "#555",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      No Data Available
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <CustomPieChart
              data={messData}
              pieWidth={500}
              pieHeight={300}
              marginRight={240}
              height={"100%"}
              onOptionChange={handleOptionChange}
            />
          </Grid>
        </Grid>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => handleMenuSelect("pdf")}>
            <Typography fontSize={14}>Download PDF</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleMenuSelect("csv")}>
            <Typography fontSize={14}>Download CSV</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};
