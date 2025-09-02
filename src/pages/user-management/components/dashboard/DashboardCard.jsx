/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";

const DashboardCard = ({
  title,
  value,
  buttonText,
  backgroundColor,
  textColor,
  borderColor,
}) => {
  return (
    <Card
      sx={{
        backgroundColor,
        color: textColor,
        boxShadow: "none",
        border: `1px solid ${borderColor}`,
        maxWidth:'100%',
        // maxHeight:'126px'
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
          <Box>
            <Typography variant="subtitle2">{title}</Typography>

            <Typography variant="h4" gutterBottom>
              {value}
            </Typography>
          </Box>

          <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
           <Box sx={{bgcolor:"white", py:2, px:1, borderRadius:"8px"}}><PersonIcon sx={{ color: textColor, fontSize:"30px" }} /></Box>
          <Button
          sx={{
            color: textColor,
            fontWeight: "bold",
            fontSize: "8px",
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          {buttonText}
          <ArrowForwardIosIcon fontSize="10px" />
        </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
