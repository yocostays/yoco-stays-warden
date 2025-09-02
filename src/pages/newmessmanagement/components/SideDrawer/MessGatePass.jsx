import { Box, Checkbox, Typography } from "@mui/material";
import QR from "@assets/images/qr.png";
import images from "../../../../assets/images/studentAppIcon.png";
import vector1 from "@assets/images/vector1.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AssistantIcon from '@mui/icons-material/Assistant';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMessGatePassInfoAsync } from "@features/mess/messSlice";
import moment from "moment";
import PropTypes from "prop-types";

const MessGatePass = ({ bookMealId }) => {
  const dispatch = useDispatch();
  const { getMessGatePassInfo } = useSelector((state) => state.mess);

  useEffect(() => {
    if (bookMealId) dispatch(fetchMessGatePassInfoAsync({ bookMealId }));
  }, [bookMealId, dispatch]);

  const { bookedOn, uniqueId, name, mealStatus, mealType,bookMealNumber } = getMessGatePassInfo || {};

  const formattedDate = moment.utc(bookedOn).format("Do MMM, YYYY");
  const formattedTime = moment.utc(bookedOn).format("hh:mm A");

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#DAD4E8",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          gap: { sm: 5, xs: 1 },
          width: "100%",
          height: { sm: "150px", xs: "120px" },
        }}
      >
        <Box sx={{ padding: 1.5 }}>
          <img src={images} alt="icon" style={{ width: 60 }} />
        </Box>
        <Box>
          <img src={vector1} alt="Vector" style={{ height: 100 }} />
        </Box>
        <Box sx={{ paddingRight: { md: 10, xs: 0 } }}>
          <Typography sx={{ fontWeight: "bold", color: "#664DA0", mb: 1 }}>
            {name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#664DA0", fontSize: "12px",  mb: 1 }}>
            <BadgeRoundedIcon fontSize="small" />
            <Typography component="span" sx={{ fontSize: "12px", fontWeight: 500 }}>
              {uniqueId}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#664DA0", fontSize: "12px", mb: 1 }}>
            <AssistantIcon fontSize="small" />
            <Typography component="span" sx={{ fontSize: "12px", fontWeight: 500 }}>
              {mealStatus}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#664DA0", fontSize: "12px" }}>
            <CalendarMonthIcon fontSize="small" />
            <Typography component="span" sx={{ fontSize: "12px", fontWeight: 500 }}>
              {formattedDate}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#664DA0", fontSize: "12px", mt: 1 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography component="span" sx={{ fontSize: "12px", fontWeight: 500 }}>
              {formattedTime}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Gate Pass Section */}
      <Box
        sx={{
          backgroundColor: "#DAD4E8",
          position: "relative",
          borderRadius: 5,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 5, borderBottom: "2px dashed white" }}>
          <Box sx={{ padding: 3, borderRight: "2px dashed white" }}>
            <Typography sx={{ color: "#664DA0", fontWeight: "bold", fontSize: "12px" }}>Gate Pass No.</Typography>
            <Typography sx={{ fontWeight: "bold", color: "#664DA0" }}>{bookMealNumber || '00'}</Typography>
          </Box>
          <Box sx={{ paddingRight: 10 }}>
            <Typography sx={{ fontWeight: "bold", color: "#664DA0" }}>Meal Type:</Typography>
            <Typography sx={{ color: "#664DA0", fontSize: "12px" }}>{mealType}</Typography>
          </Box>
        </Box>

        {/* QR Code Section */}
        <Box sx={{ padding: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={QR} alt="qr" style={{ width: 200, objectFit: "contain" }} />
        </Box>

        {/* Approval Checkbox */}
        <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Checkbox
            checked
            sx={{
              color: "#664DA0",
              "&.Mui-checked": { color: "#664DA0" },
            }}
          />
          <Typography sx={{ fontWeight: "bold", color: "#664DA0", fontSize: "12px" }}>APPROVED</Typography>
        </Box>
      </Box>
    </Box>
  );
};

MessGatePass.propTypes = {
  bookMealId: PropTypes.string,
};

export default MessGatePass;
