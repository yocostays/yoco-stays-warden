import { Box, Grid } from '@mui/material'
import React from 'react'
import CustomCards from '../../../components/customComponents/CustomCard'
import { useTheme } from "@emotion/react";
import PersonIcon from "@mui/icons-material/Person";
import CustomChartBox from '../../../components/customComponents/CustomChartBox';

const data = [
    { label: "Parents", value: 500 },
    { label: "Visiting Faculty", value: 500 },
    { label: "Employees", value: 500 },
    { label: "Others", value: 500 },
  ];

const VisitorsCharts = () => {
    const theme = useTheme();
  return (
    <Box m={1}>
       <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                <CustomCards
                  title="This Month"
                  value="5"
                  buttonText="View Details"
                  backgroundColor="#D7E9FE"
                  textColor={theme.palette.text.primary}
                  borderColor="#4288D9"
                />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <CustomCards
                  title="Today"
                  value="12"
                  buttonText="View Details"
                  backgroundColor="#CFFFB2"
                  textColor={theme.palette.text.primary}
                  borderColor="#45B501"
                />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <CustomCards
                  title="Today"
                  value="1"
                  buttonText="View Users"
                  backgroundColor="#ECE0FF"
                  textColor={theme.palette.text.primary}
                  borderColor="#664DA0"
                />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <CustomCards
                  title="Custom"
                  value="20/150"
                  buttonText="Approve Requests"
                  backgroundColor="#FFF6E3"
                  textColor={theme.palette.text.primary}
                  borderColor="#D9A12B"
                />
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <CustomChartBox
            showReport
            showDownload
            showPieChartButton
            showTodayButton
            showPieChart2
            reportTitle ={"Visitors"}
            data={data}
          />
        </Grid>
       </Grid>
    </Box>
  )
}

export default VisitorsCharts
