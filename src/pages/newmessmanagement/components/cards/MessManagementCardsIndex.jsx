import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MessManagementCards from "./MessManagementCards";
import MessManagementCardsTwo from "./MessManagementCardsTwo";
import MessManagementTable from "../MessManagementTable";

const MessManagementCardsIndex = () => {
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: `calc(100% - 270px)` },
          ml: { md: "270px", sm: 0 },
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: "-1",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={7}>
            <MessManagementCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <MessManagementCardsTwo />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 1 }}>
        <MessManagementTable />
      </Box>
    </>
  );
};

export default MessManagementCardsIndex;
