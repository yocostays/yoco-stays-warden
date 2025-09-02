import { Box, Grid } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import CustomCards from "../../../components/customComponents/CustomCard";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PollManagement from "./PollManagement";

const PollCharts = () => {
  const theme = useTheme();
  return (
    <Box m={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Total Parcel Received"
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
                title="Total Parcel Delivered"
                value="20"
                backgroundColor="#FFF3E0"
                textColor={theme.palette.text.primary}
                borderColor="#D9A12B"
                icon={<LocalShippingOutlinedIcon sx={{ fontSize: "28px" }} />}
                buttonText="Approve Requests >"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Total Parcel Pending"
                value="50"
                backgroundColor="#CBEFBF"
                textColor={theme.palette.text.primary}
                borderColor="#45B501"
                icon={<AccessTimeRoundedIcon sx={{ fontSize: "28px" }} />}
                buttonText="View Users >"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Total Parcel Misplaced"
                value="20"
                backgroundColor="#BAE5F5"
                textColor={theme.palette.text.primary}
                borderColor="#4288D9"
                icon={<HomeOutlinedIcon sx={{ fontSize: "28px" }} />}
                buttonText="Approve Requests >"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <PollManagement />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PollCharts;
