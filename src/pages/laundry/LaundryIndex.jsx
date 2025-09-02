import { Box, Grid } from "@mui/material";
import LaundryChart1 from "./components/LaundryChart1";
import LaundryChart2 from "./components/LaundryChart2";
import LaundryChart3 from "./components/LaundryChart3";
import LaundryChart4 from "./components/LaundryChart4";
import LaundryChart5 from "./components/LaundryChart5";
import LaundryTable from "./components/LaundryTable";

export default function LaundryIndex() {
  return (
    <>
      <Box
        sx={{
          width: { md: `calc(100% - 270px)`, xs: "100%" },
          ml: { md: "270px", sm: 0 },
          mt: 2,
          p: 1,
        }}
      >
        <Grid container spacing={3 } marginBottom={3}>
          <Grid item xs={12} md={5}>
            <LaundryChart1 />
          </Grid>
          <Grid item xs={12} md={7}>
            <LaundryChart2 />
          </Grid>         
        </Grid>
        <Grid container spacing={3} marginBottom={3}>
        <Grid item xs={12} md={3}>
            <LaundryChart3 />
          </Grid>
          <Grid item xs={12} md={6}>
            <LaundryChart4 />
          </Grid>
          <Grid item xs={12} md={3}>
            <LaundryChart5 />
          </Grid>
         
        </Grid>
        <Grid container spacing={3} >
        <Grid item xs={12} md={12}>
            <LaundryTable />
          </Grid>  
        </Grid>
      </Box>
    </>
  );
}
