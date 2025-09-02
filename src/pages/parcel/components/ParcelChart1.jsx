import { Box, Grid } from "@mui/material";
import CustomCards from "../../../components/customComponents/CustomCard";
import { useTheme } from "@emotion/react";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
export default function ParcelChart1() {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomCards
            title="Total Parcel Received"
            value="120"
            buttonText="View user"
            backgroundColor="#D7E9FE"
            textColor={theme.palette.text.primary}
            borderColor="#4288D9"
            icon={<DownloadForOfflineOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCards
            title="Total Parcel Delivered"
            value="20"
            buttonText="Approve Requests >"
            backgroundColor="#CFFFB2"
            textColor={theme.palette.text.primary}
            borderColor="#45B501"
            icon={<LocalShippingOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCards
            title="Total Parcel Pending"
            value="50"
            buttonText="View User"
            backgroundColor="#ECE0FF"
            textColor={theme.palette.text.primary}
            borderColor="#664DA0"
            icon={<AccessTimeOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomCards
            title="Total Parcel Misplaced"
            value="20"
            buttonText="View Details"
            backgroundColor="#FCE1AC"
            textColor={theme.palette.text.primary}
            borderColor="#D9A12B"
            icon={<HomeOutlinedIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
