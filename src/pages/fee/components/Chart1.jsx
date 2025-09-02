import { Box, Grid } from '@mui/material'
import React from 'react'
import CustomCards from '../../../components/customComponents/CustomCard'
import PersonIcon from "@mui/icons-material/GroupOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useTheme } from "@emotion/react";
import CustomChartBox from '../../../components/customComponents/CustomChartBox';

const data = [
  { label: "Hostel Fees", value: 500 },
  { label: "Event Fees", value: 500 },
  { label: "Fine", value: 500 },
];
const Chart1 = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <CustomCards
                  title="Total Students"
                  value="120/ 150"
                  buttonText="View Users"
                  backgroundColor="#ECE0FF"
                  textColor={theme.palette.text.primary}
                  borderColor="#664DA0"
                  icon={<PersonIcon sx={{ fontSize: "30px" }}/>}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <CustomCards
                  title="No.of Student paid fees"
                  value="20/ 150"
                  buttonText="Approve Requests"
                  backgroundColor="#FFF6E3"
                  textColor={theme.palette.text.primary}
                  borderColor="#D9A12B"
                  icon={<ArticleOutlinedIcon sx={{ fontSize: "30px" }}/>}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
            <CustomCards
                  title="Late fees"
                  value="20/ 150"
                  buttonText="View Users"
                  backgroundColor="#E8F9E6"
                  textColor={theme.palette.text.primary}
                  borderColor="#53AB46"
                  icon={<MonetizationOnOutlinedIcon sx={{ fontSize: "30px" }}/>}
                />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <CustomChartBox
            showReport
            showPieChartButton
            showTodayButton
            showPieChart2
            reportTitle ={"Fees"}
            data={data}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Chart1
