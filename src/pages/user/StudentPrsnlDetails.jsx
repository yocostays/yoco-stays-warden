import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  IconButton,
  capitalize,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import WcRoundedIcon from "@mui/icons-material/WcRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import moment from "moment";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

StudentPrsnDetails.propTypes = {
  studentDetail: PropTypes.object,
};

export default function StudentPrsnDetails({ studentDetail }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCopy = (textToCopy) => {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    toast.success(`${textToCopy} copied successfully`);
  };

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
          Personal Details
        </Typography>
        <Box sx={{ marginLeft: isSmallScreen ? "0" : "10px" }}>
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
                      onClick={() => handleCopy(studentDetail.uniqueId)}
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
            </Box>
          </Box>
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
                  icon: <PersonIcon />,
                  label: "Student Name",
                  value: studentDetail.name,
                },
                {
                  icon: <PhoneIcon />,
                  label: "Phone No.",
                  value: studentDetail.phone,
                },
                {
                  icon:<PhoneIcon/>,
                  label: "Aadhar Number",
                  value : studentDetail?.documents?.aadhaarNumber
                },
                {
                  icon: <EmailIcon />,
                  label: "Email ID",
                  value: studentDetail.email,
                },
                {
                  icon: <CalendarMonthIcon />,
                  label: "Date of Birth",
                  value: studentDetail.dob
                    ? moment.utc(studentDetail.dob).format("DD-MM-YYYY")
                    : "",
                },
                {
                  icon: (
                    <Icon
                      icon="fluent-mdl2:open-enrollment"
                      width="24"
                      height="24"
                    />
                  ),
                  label: "Enroll. No.",
                  value: studentDetail.enrollmentNumber,
                },
                {
                  icon: <BloodtypeIcon />,
                  label: "Blood Group",
                  value: studentDetail.bloodGroup,
                },
                {
                  icon: <AccessibleForwardIcon />,
                  label: "Disabilities",
                  value: studentDetail.divyang === true ? "Yes" : "No",
                },
                {
                  icon: <WcRoundedIcon />,
                  label: "Gender",
                  value:
                    (studentDetail?.gender &&
                      capitalize(studentDetail?.gender)) ||
                    "",
                },
                {
                  icon: <FingerprintRoundedIcon />,
                  label: "Identification Mark",
                  value: studentDetail.identificationMark,
                },
                {
                  icon: (
                    <Icon
                      icon="game-icons:medical-drip"
                      width="26"
                      height="26"
                    />
                  ),
                  label: "Any Medical Issue",
                  value: studentDetail.medicalIssue,
                },
                {
                  icon: (
                    <Icon
                      icon="hugeicons:medical-mask"
                      width="22"
                      height="22"
                    />
                  ),
                  label: "Any Allergic problem",
                  value: studentDetail.allergyProblem,
                },
                {
                  icon: (
                    <Icon icon="gis:search-country" width="23" height="23" />
                  ),
                  label: "Nationality",
                  value: studentDetail.country?.name,
                },
                {
                  icon: <CategoryRoundedIcon />,
                  label: "Category",
                  value: studentDetail.category,
                },
                {
                  icon: <WorkspacesRoundedIcon />,
                  label: "Caste",
                  value: studentDetail.cast,
                },
                {
                  icon: <HomeWorkIcon />,
                  label: "Permanent Address",
                  value: studentDetail.permanentAddress,
                },
                {
                  icon: <HomeWorkIcon />,
                  label: "Current Address",
                  value: studentDetail.currentAddress,
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
                  <Box sx={{ textAlign: "center" }}>{item?.icon}</Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {item?.label}
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
                borderRadius: "0 0px 20px 20px",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
