import { Box, Typography } from "@mui/material";
import { Info } from "@mui/icons-material";

const NoDataAvailable = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        padding: 3,
        width: "100%",
      }}
    >
      <Info sx={{ fontSize: 40, color: "#6B52AE" }} />
      <Typography variant="h6" sx={{ color: "#888", marginTop: 1 }}>
        No Data Available
      </Typography>
    </Box>
  );
};

export default NoDataAvailable;
