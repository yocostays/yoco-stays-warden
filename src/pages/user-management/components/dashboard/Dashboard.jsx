/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/system";
import CustomCards from "../../../../components/customComponents/CustomCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getCardDetail,
  getUserReportSummary,
} from "../../../../features/users/userSlice";
import CustomPieChart from "../../../../components/customComponents/CustomPieChart";

const settings = {
  width: 150,
  height: 150,
  value: 60,
};

const CustomLinearProgress = styled(LinearProgress)(({ color }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: "#ffffff", // Set empty space color to white
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: color,
  },
}));

const AttendanceProgress = ({ label, value, total, color }) => {
  const progress = (value / total) * 100;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography
        sx={{ fontSize: "15px", fontWeight: 600 }}
      >{`${label} - ${value}`}</Typography>
      <CustomLinearProgress
        variant="determinate"
        value={progress}
        color={color}
        sx={{ width: "200px" }}
      />
    </Box>
  );
};

const Dashboard = ({ onTypeChange }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userReportSummary } = useSelector((state) => state.users);

  const [totalUser, setTotalUser] = useState(0);
  const [authorizeUser, setAuthorizeUser] = useState(0);
  const selectedUser = JSON.parse(localStorage.getItem("userData"));
  const [reportFilter, setReportFilter] = useState("today");

  const [authoizeUserData, setAuthorizeUserData] = useState("N/A");

  const handleOptionChange = (data) => {
    setReportFilter(data);
  };

  const exportUserReport = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/user-report/export?dateRange=${reportFilter}`,
        {
          method: "GET", // or 'POST' depending on your API
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to export user report");
      }

      const data = await response.blob(); // or response.json(), depending on the response type
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user-report.csv"); // adjust file name and extension if needed
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedUser?.isHostelAssigned !== false) {
      dispatch(getCardDetail({}))
        .unwrap()
        .then((res) => {
          setTotalUser(res?.data?.activeUserCount);
          setAuthorizeUser(res?.data?.authorizedUserCount);
          setAuthorizeUserData(`${authorizeUser} / ${totalUser}`);
        })
        .catch((error) => {
          console.error("Failed to fetch card details:", error);
          // Handle the error further if needed
        });
      const payload = {
        status: reportFilter,
      };
      dispatch(getUserReportSummary(payload));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorizeUser, dispatch, totalUser, reportFilter]);

  const [radius, setRadius] = useState({ inner: "85%", outer: "100%" });

  const updateRadius = () => {
    const width = window.innerWidth;
    if (width < 600) {
      setRadius({ inner: "80%", outer: "90%" }); // Adjust for small screens
    } else if (width < 900) {
      setRadius({ inner: "85%", outer: "100%" }); // Medium screens
    } else {
      setRadius({ inner: "95%", outer: "110%" }); // Large screens
    }
  };

  useEffect(() => {
    updateRadius();
    window.addEventListener("resize", updateRadius);

    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}
    >   
      <Box m={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <CustomCards
                  title="No. of Users"
                  value={totalUser}
                  buttonText={
                    <span style={{ fontSize: "10px" }}>View Users</span> // Increase the font size here
                  }
                  backgroundColor="#ECE0FF"
                  textColor={theme.palette.text.primary}
                  borderColor="#664DA0"
                  icon={<PersonIcon sx={{ fontSize: "30px" }} />}
                  onClick={() =>
                    onTypeChange({
                      type: "all",
                      tab: "All User",
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomCards
                  title="Authorized Users"
                  value={authoizeUserData}
                  buttonText={
                    <span style={{ fontSize: "10px" }}>Approve Requests</span> // Increase the font size here
                  }
                  backgroundColor="#FFF3E0"
                  textColor={theme.palette.text.primary}
                  borderColor="#D9A12B"
                  icon={<CreditCardIcon sx={{ fontSize: "30px" }} />}
                  onClick={() =>
                    onTypeChange({
                      type: "authorize",
                      tab: "Authorize User",
                    })
                  }
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: 0 }}>
              <Grid item xs={12}>
                <Grid item xs={12} sm={12} md={12}>
                  <Card
                    sx={{
                      backgroundColor: "#E8F9E6",
                      boxShadow: "none",
                      border: `2px solid #53AB46`,
                      maxWidth: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    <CardContent>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                        sx={{ flexWrap: "wrap" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: "16px", fontWeight: 500 }}
                          >
                            Attendance
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                          >
                            <AttendanceProgress
                              label="Present"
                              value={80}
                              total={150}
                              color="#d69d3e"
                              emptyColor="#ffffff" // Add this line for white empty space
                            />
                            <AttendanceProgress
                              label="Absent"
                              value={20}
                              total={150}
                              color="#5a3e8c"
                              emptyColor="#ffffff" // Add this line for white empty space
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Gauge
                            {...settings}
                            cornerRadius="50%"
                            sx={() => ({
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 0,
                              },
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: "#d69d3e",
                              },
                              [`& .${gaugeClasses.referenceArc}`]: {
                                fill: "#5a3e8c",
                              },
                            })}
                            innerRadius={radius.inner}
                            outerRadius={radius.outer}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "flex-end",
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: "white",
                                py: 2,
                                px: 1.3,
                                borderRadius: "8px",
                              }}
                            >
                              <AttachMoneyIcon sx={{ fontSize: "30px" }} />
                            </Box>
                            <Button
                              sx={{
                                // color: textColor,
                                fontWeight: "bold",
                                fontSize: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 1,
                                textTransform: "none",
                                // mt: 2,
                              }}
                            >
                              View Users
                              <ArrowForwardIosIcon fontSize="10px" />
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} sm={12} md={12} lg={6} mb={2}>
            <CustomPieChart
              data={userReportSummary}
              onExport={exportUserReport}
              pieHeight={300}
              pieWidth={450}
              marginRight={170}
              onOptionChange={handleOptionChange}
              isDownload={true}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
