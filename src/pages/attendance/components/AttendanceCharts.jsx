import { Box, Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CustomCards from "../../../components/customComponents/CustomCard";
import CustomChartBox from "../../../components/customComponents/CustomChartBox";

const data = [
  { label: "Total Capacity", value: 500 },
  { label: "Students Present", value: 500 },
  { label: "Student On Leave", value: 500 },
  { label: "Late Coming", value: 500 },
  { label: "Day Out / Night Out", value: 500 },
  { label: "Absent", value: 500 },
];

const AttendanceCharts = () => {
  const theme = useTheme();
  return (
    <Box m={1}>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Total Students"
                value="150"
                backgroundColor="#ECE0FF"
                textColor={theme.palette.text.primary}
                borderColor="#664DA0"
                icon={<PeopleAltOutlinedIcon sx={{ fontSize: "28px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Today’s Attendance"
                value="20/150"
                backgroundColor="#FFF3E0"
                textColor={theme.palette.text.primary}
                borderColor="#D9A12B"
                icon={<DateRangeOutlinedIcon sx={{ fontSize: "28px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="At moment (Outside)"
                value="20"
                backgroundColor="#CBEFBF"
                textColor={theme.palette.text.primary}
                borderColor="#45B501"
                icon={<WbSunnyOutlinedIcon sx={{ fontSize: "28px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Day Out"
                value="50"
                backgroundColor="#BAE5F5"
                textColor={theme.palette.text.primary}
                borderColor="#4288D9"
                icon={<LogoutIcon sx={{ fontSize: "28px" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CustomCards
                title="Day Out"
                value="50"
                backgroundColor="#C1DEFF"
                textColor={theme.palette.text.primary}
                borderColor="#4288D9"
                icon={<LoginIcon sx={{ fontSize: "28px" }} />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <CustomChartBox
            showReport
            showDownload
            showPieChartButton
            showTodayButton
            showPieChart2
            reportTitle={"Report"}
            data={data}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceCharts;
