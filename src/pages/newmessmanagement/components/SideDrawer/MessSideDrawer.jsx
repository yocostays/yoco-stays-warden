import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Drawer,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
  Tab,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PropTypes from "prop-types";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MessSideDrawerTable from "./MessSideDrawerTable";
import { useDispatch, useSelector } from "react-redux";
import { getMessDetailsByIdAsync } from "@features/mess/messSlice";
import dayjs from "dayjs";
import MessGatePass from "./MessGatePass";
import { useNavigate } from "react-router-dom";

const MessSideDrawer = ({
  drawerOpen,
  handleCloseDrawer,
  isFullScreen,
  handleExpandToFullPage,
  selectedRow,
  handleRowDetailsPage,
}) => {
  const dispatch = useDispatch();
  const { getMessDetailsById } = useSelector((state) => state.mess);

  const {
    _id,
    mealStatus,
    studentId,
    uniqueId,
    image,
    name,
    phone,
    bookedOn,
    duration,
    mealType,
    roomNumber,
    nextMealId,
    previousMealId,
  } = getMessDetailsById;

  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const formattedBookedDate = dayjs(bookedOn).format("Do MMM, YYYY | hh:mm A");
  const formattedDurationDate = dayjs(duration).format(
    "Do MMM, YYYY | hh:mm A"
  );

  const [value, setValue] = useState("history");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewProfile = () => {
    localStorage.setItem("profileView", "mess");
    navigate(`/users/student/details/${studentId}`);
  };

  useEffect(() => {
    if (selectedRow?._id) {
      dispatch(getMessDetailsByIdAsync(selectedRow?._id));
    }
  }, [dispatch, selectedRow]);

  useEffect(() => {
    if (drawerOpen) {
      setValue("history");
    }
  }, [drawerOpen]);

  const bookingDetails = [
    {
      label: "Booked On",
      value: formattedBookedDate,
    },
    {
      label: "Duration",
      value: formattedDurationDate,
    },
    {
      label: "Meal Type",
      value: mealType,
    },
    // {                               // Required later
    //   label: "Description",
    //   value:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    // },
  ];

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleCloseDrawer}
      PaperProps={{
        sx: {
          width: isFullScreen
            ? "100vw"
            : isSmallScreen
            ? "100%"
            : isMediumScreen
            ? "60%"
            : "50%",
          overflow: "auto",
          transition: "width 0.3s ease, height 0.3s ease",
        },
      }}
    >
      <Box p={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handleCloseDrawer}>
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
            <IconButton
              onClick={handleExpandToFullPage}
              sx={{
                position: "absolute",
                top: 16,
                left: 50,
                zIndex: 2,
              }}
            >
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <ArrowBackIosNewOutlinedIcon
              sx={{
                borderRadius: "100%",
                padding: "5px",
                border: "2px solid #674D9F",
                width: "30px",
                height: "30px",
                cursor: previousMealId ? "pointer" : "not-allowed",
                opacity: previousMealId ? 1 : 0.5,
              }}
              onClick={() => {
                if (previousMealId) {
                  handleRowDetailsPage(previousMealId);
                }
              }}
            />
            <ArrowForwardIosOutlinedIcon
              sx={{
                borderRadius: "100%",
                padding: "5px",
                border: "2px solid #674D9F",
                width: "30px",
                height: "30px",
                cursor: nextMealId ? "pointer" : "not-allowed",
                opacity: nextMealId ? 1 : 0.5,
              }}
              onClick={
                nextMealId ? () => handleRowDetailsPage(nextMealId) : undefined
              }
            />
          </Stack>
        </Stack>

        {/* Profile Section */}
        <Box
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 4,
            px: {
              xl: isFullScreen ? 2 : "22%",
              lg: isFullScreen ? 4 : "18%",
              md: 5,
            },
          }}
        >
          <img
            src={image}
            alt="Profile Image"
            style={{
              borderRadius: "100%",
              backgroundColor: "#674D9F",
              width: "90px",
              height: "90px",
            }}
          />
          <Box textAlign={{ xs: "center", sm: "left" }} pl="16px">
            <Typography fontWeight="medium" fontSize="16px">
              {name}
            </Typography>
            <Typography fontWeight="medium" fontSize="16px">
              YOCO ID : {uniqueId}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={handleViewProfile}
              sx={{ borderRadius: "50px", mt: 1 }}
            >
              View Profile
            </Button>
          </Box>
        </Box>

        {/* Contact Details */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: {
              sm: isFullScreen ? "start" : "center",
              xs: "start",
            },
            alignItems: "center",
            mt: 4,
            px: 4,
          }}
        >
          <Box textAlign={{ xs: "center", sm: "left" }}>
            <Typography fontWeight="bold" fontSize="16px">
              Contact Number: {phone}
            </Typography>
            <Typography fontWeight="bold" fontSize="16px" mt={2}>
              Room Number: {roomNumber}
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: { xs: "none", sm: "block" },
              backgroundColor: "#ACB5BD",
              width: "2px",
            }}
          />

          <Box textAlign={{ xs: "center", sm: "left" }}>
            <Typography fontWeight="bold" fontSize="16px">
              Meal Status:
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{
                marginTop: "8px",
                borderColor:
                  mealStatus === "booked"
                    ? "green"
                    : mealStatus === "skipped"
                    ? "orange"
                    : mealStatus === "cancelled"
                    ? "red"
                    : mealStatus === "cancelled"
                    ? "red"
                    : "black",
                borderRadius: "30px",
                fontSize: { md: "13px", sm: "11px" },
                marginBottom: "10px",
                textTransform: "capitalize",
                color:
                  mealStatus === "booked"
                    ? "green"
                    : mealStatus === "skipped"
                    ? "orange"
                    : mealStatus === "cancelled"
                    ? "red"
                    : mealStatus === "cancelled"
                    ? "red"
                    : "black",
              }}
            >
              {mealStatus}
            </Button>
          </Box>
        </Stack>

        {/* Booking Details */}
        <Box width="100%" px={{ xs: 2, md: 1 }} mt={4}>
          <Box
            display="flex"
            alignItems="center"
            // justifyContent={{ md: "center", sm: "center", xs: "start" }}
            justifyContent={{
              sm: isFullScreen ? "start" : "center",
              xs: "start",
            }}
            width="100%"
            bgcolor="#674D9F0D"
            py={4}
            px={2}
            // gap={5}
            sx={{ borderRadius: "20px" }}
          >
            <Stack
              spacing={2}
              sx={{
                maxWidth: "450px",
              }}
            >
              {bookingDetails.map((detail, index) => (
                <Stack direction="row" spacing={1} key={index}>
                  <Typography fontWeight="bold" sx={{ minWidth: "120px" }}>
                    {detail.label}
                  </Typography>
                  <Typography fontWeight="bold"> : </Typography>
                  <Typography fontSize="16px" pl={4} fontWeight="bold">
                    {detail.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
        <Box mt={4} sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="History" value="history" />
                <Tab
                  disabled={
                    mealStatus === "cancelled" ||
                    mealStatus === "skipped" ||
                    mealStatus === "not booked"
                  }
                  label="Gate Pass"
                  value="gatePass"
                />
              </TabList>
            </Box>
            <TabPanel value="history">
              <MessSideDrawerTable
                studentId={studentId}
                drawerOpen={drawerOpen}
              />
            </TabPanel>
            <TabPanel value="gatePass">
              <MessGatePass bookMealId={_id} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MessSideDrawer;

MessSideDrawer.propTypes = {
  isFullScreen: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  handleCloseDrawer: PropTypes.func,
  handleExpandToFullPage: PropTypes.func,
  selectedRow: PropTypes.object,
  handleRowDetailsPage: PropTypes.func,
};
