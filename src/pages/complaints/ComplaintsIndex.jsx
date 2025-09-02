import { Box } from "@mui/material/";
import Grid from "@mui/material/Grid";
import ComplaintsCardOne from "./components/ComplaintsCardOne";
import ComplaintsCardTwo from "./components/ComplaintsCardTwo";
import ComplaintsTableTabs from "./components/complaintstabletabs/ComplaintsTableTabs";

const ComplaintsIndex = () => {
  return (
    <>
    <Box
      sx={{
        width: { xs: "100%", md: `calc(100% - 275px)` },
        ml: { md: "275px", xs: 0 },
        p: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#664DA033",
        marginTop:{xs:12,sm:0,md:0}
        
      }}
    >
      <Grid container spacing={2}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={7}>
          <ComplaintsCardOne />
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={5}>
          <ComplaintsCardTwo />
        </Grid>
      </Grid>
    </Box>
    <Box
  sx={{
    width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
      }}
>
  <ComplaintsTableTabs />
</Box>
      </>
  );
};

export default ComplaintsIndex;
