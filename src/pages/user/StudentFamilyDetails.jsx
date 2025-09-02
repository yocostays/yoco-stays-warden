import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

StudentFamilyDetails.propTypes = {
  studentDetail: PropTypes.object,
};

export default function StudentFamilyDetails({ studentDetail }) {

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
          Family Details
        </Typography>
        <Box sx={{ marginLeft: isSmallScreen ? "0" : "10px" }}>
          {/* <Box>
            <Box
              sx={{
                p: 3,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "#fff",
                maxWidth: "600px",
                ml: 0,
                bgcolor: "#674D9F0D",
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "100%",
                  padding: "15px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  [theme.breakpoints.down("sm")]: {
                    flexDirection: "column",
                    alignItems: "center",
                  },
                }}
              >
                <Avatar
                  alt={studentDetail.name}
                  src={studentDetail.image || ""}
                  sx={{ width: 56, height: 56, mr: isSmallScreen ? 0 : 2 }}
                />
                <Box
                  sx={{
                    textAlign: isSmallScreen ? "center" : "left",
                    mt: isSmallScreen ? 1 : 0,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {studentDetail.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    {studentDetail.uniqueId}
                    <Tooltip title="Copy User ID">
                      <IconButton
                        onClick={handleCopy}
                        size="small"
                        sx={{ marginLeft: "10px" }}
                      >
                        <ContentCopyIcon
                          fontSize="inherit"
                          sx={{ fontSize: "12px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Box>
                <IOSSwitch
                  checked={studentDetail.status}
                  sx={{
                    ml: isSmallScreen ? 0 : "auto",
                    marginTop: isSmallScreen ? "10px" : 0,
                  }}
                  inputProps={{ "aria-label": "Active status" }}
                />
              </Box>
            </Box>
          </Box> */}
          {/* <Box> */}
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
                  // {
                  //   icon: <PhoneIcon />,
                  //   label: "Phone No.",
                  //   value: studentDetail.phone,
                  // },
                  // {
                  //   icon: <EmailIcon />,
                  //   label: "Email ID",
                  //   value: studentDetail.email,
                  // },
                  {
                    icon: <Icon icon="weui:contacts-filled" width="24" height="24" />,
                    label: "Father Name",
                    value: studentDetail?.fatherName,
                  },
                  {
                    icon: <Icon icon="hugeicons:contact-01" width="24" height="24" />,
                    label: "Father Mobile No.",
                    value: studentDetail?.fatherNumber,
                  },
                  {
                    icon: <EmailIcon />,
                    label: "Father Email Id",
                    value: studentDetail?.fatherEmail,
                  },
                  {
                    icon: <BusinessCenterRoundedIcon />,
                    label: "Father Occupation",
                    value: studentDetail?.fatherEmail,
                  },
                  {
                    icon: <Icon icon="mdi:mother-nurse" width="24" height="24" />,
                    label: "Mother Name",
                    value: studentDetail?.motherName,
                  },
                  {
                    icon: <Icon icon="hugeicons:contact-01" width="24" height="24" />,
                    label: "Mother Mobile No.",
                    value: studentDetail?.motherNumber,
                  },
                  {
                    icon: <EmailIcon />,
                    label: "Mother Email Id",
                    value: studentDetail?.motherEmail,
                  },
                  {
                    icon: <Icon icon="garden:tray-user-group-26" width="24" height="24" />,
                    label: "Guardian Name",
                    value: studentDetail?.guardianName,
                  },
                  {
                    icon: <Icon icon="mdi:human-male-child" width="26" height="26" />,
                    label: "Relationship",
                    value: studentDetail.relationship,
                  },
                  {
                    icon: <BusinessCenterRoundedIcon />,
                    label: "Occupation",
                    value: studentDetail.occuption,
                  },
                  {
                    icon: <Icon icon="hugeicons:contact-01" width="24" height="24" />,
                    label: "Guardian Mobile No.",
                    value: studentDetail.guardianContactNo,
                  },
                  {
                    icon: <EmailIcon />,
                    label: "Guardian Email Id",
                    value: studentDetail.guardianEmail,
                  },
                  {
                    icon: <HomeWorkIcon />,
                    label: "Address",
                    value: studentDetail.address,
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
                  mt: 2,
                  backgroundColor: "#674D9F0D",
                  padding: "33px",
                  borderRadius: "4px",
                }}
              ></Box>
            </Box>
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
