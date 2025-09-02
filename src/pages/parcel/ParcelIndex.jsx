import { Box, Grid } from "@mui/material";
import ParcelTable from "./components/ParcelTable";
import ParcelChart1 from "./components/ParcelChart1";
import ParcelChart2 from "./components/ParcelChart2";

export default function ParcelIndex() {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ParcelChart1 />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ParcelChart2 />
        </Grid>
      </Grid>
      <Box marginY={5}>
        <ParcelTable />
      </Box>
    </Box>
  );
}
