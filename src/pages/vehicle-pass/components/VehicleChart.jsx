import React from 'react'
import { Box, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
import CustomCards from "../../../components/customComponents/CustomCard";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import VehicleGraph from './VehicleGraph';
import VehiclePass from './VehiclePass';

const VehicleChart = () => {
  const theme = useTheme()
  return (
    <Box m={1}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomCards
              title="Most use parking slot"
              value="120"
              backgroundColor="#ECE0FF"
              textColor={theme.palette.text.primary}
              borderColor="#664DA0"
              icon={<ArrowCircleDownRoundedIcon sx={{ fontSize: "28px" }} />}
              buttonText="View Users >"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCards
              title="Most used vehicle"
              value="20"
              backgroundColor="#FFF3E0"
              textColor={theme.palette.text.primary}
              borderColor="#D9A12B"
              icon={<LocalShippingOutlinedIcon sx={{ fontSize: "28px" }} />}
              buttonText="Approve Requests >"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
           <VehicleGraph/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4}>
      <VehiclePass/>
      </Grid>
    </Grid>
  </Box>
  )
}

export default VehicleChart
