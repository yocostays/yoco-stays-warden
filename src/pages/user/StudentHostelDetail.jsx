import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BedIcon from '@mui/icons-material/Bed';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

StudentHostelDetails.propTypes = {
  studentDetail: PropTypes.object,
};

export default function StudentHostelDetails({ studentDetail }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box
        sx={{
          textAlign: "left",
          marginLeft: "55px",
          paddingTop: "59px",
          [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            paddingTop: "30px",
            paddingX: "16px",
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            textAlign: "left",
            marginLeft: "19px",
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
              marginLeft: "0",
            },
          }}
        >
          Hostel Details
        </Typography>

        <Box sx={{ marginLeft: isSmallScreen ? "0" : "10px" }}>
          <Box
            sx={{
              borderRadius: 1,
              backgroundColor: "#fff",
              maxWidth: "600px",
              ml: 0,
              [theme.breakpoints.down("sm")]: {
                maxWidth: "100%",
                marginBottom: "15px",
              },
            }}
          >
            <Box sx={{ mt: 3 }}>
              {[
                {
                  icon: <HomeWorkIcon />,
                  label: "Hostel Name",
                  value: studentDetail?.hostelName,
                },
                {
                  icon: <HomeWorkIcon />,
                  label: "Building/Wing",
                  value: studentDetail?.buildingNumber,
                },
                {
                  icon: <BedIcon />,
                  label: "Selected Bed Type",
                  value: studentDetail?.bedType,
                },
                {
                  icon: <HomeWorkIcon />,
                  label: "Floor Number",
                  value: studentDetail?.floorNumber,
                },
                {
                  icon: <MeetingRoomIcon />,
                  label: "Room Number",
                  value: studentDetail?.roomNumber,
                },
                {
                  icon: <BedIcon />,
                  label: "Bed Number",
                  value: studentDetail?.bedNumber?.name || "",
                },
                {
                  icon: <ReceiptLongIcon />,
                  label: "Billing Cycle",
                  value: studentDetail?.bedNumber?.name || "",
                },
                {
                  icon: <ApartmentIcon />,
                  label: "Room Mates",
                  value: studentDetail?.roomMatesData?.length > 0 ? (
                      studentDetail?.roomMatesData?.map((roommate) => (
                        <Box
                          key={roommate?.id}
                          position="relative"
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Avatar
                            src={roommate?.image}
                            sx={{
                              width: 40,
                              height: 40,
                              border: "2px solid rgb(169, 143, 196)",
                            }}
                           
                          />
                          
                          <Typography variant="caption">
                            {roommate?.name}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Box>
                        <Typography>No Roommates Yet!</Typography>
                      </Box>
                    ),
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: isSmallScreen
                      ? "40px auto"
                      : "40px 200px 10px 1fr",
                    alignItems: "center",
                    backgroundColor: index % 2 ? "#674D9F0D" : "transparent",
                    padding: "8px 16px",
                    gap: "8px",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>{item.icon}</Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                  {!isSmallScreen && (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" fontWeight="bold">
                        :
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                mt: 3,
                backgroundColor: "#674D9F0D",
                padding: "33px",
                borderRadius: "4px",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
