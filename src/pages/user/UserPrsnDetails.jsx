import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Switch,
  Tooltip,
  IconButton,
  capitalize,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import WcIcon from "@mui/icons-material/Wc";
// import HomeWorkIcon from "@mui/icons-material/HomeWork";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import styled from "@emotion/styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  getStaffDetailById,
  updateStaffStatusAsync,
} from "@features/users/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 31, // Smaller width
  height: 12, // Smaller height
  padding: 0,
  overflow: "visible",
  "& .MuiSwitch-switchBase": {
    padding: 1, // Adjust padding
    margin: 1, // Adjust margin for better alignment
    top: -2, // Adjust position for smaller size
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(14px)", // Adjust to fit smaller size
      color: "#36F112",
      "& .MuiSwitch-thumb": {
        backgroundColor: "#36F112", // Green color for checked state
        width: 16, // Smaller thumb size
        height: 16,
      },
      "& + .MuiSwitch-track": {
        backgroundColor: "#DEDEDE",
        opacity: 1,
        boxShadow: "inset 0 2px 1px rgba(0, 0, 0, 0.2)", // Subtle shadow
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "4px solid #fff", // Reduced border size
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[200],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.5,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16, // Thumb size for default state
    height: 16,
    backgroundColor: "#f28c28",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    height: 17, // Track height
    backgroundColor: "#E0E0E0", // Default track color
    opacity: 1,
    boxShadow: "inset 0 2px 1px rgba(0, 0, 0, 0.2)",
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

UserPrsnDetails.propTypes = {
  staffDetail: PropTypes.object.isRequired,
  staffById: PropTypes.object.isRequired,
};

export default function UserPrsnDetails({ staffDetail, staffById }) {

  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [changeStaffStatus, setChangeStaffStatus] = useState(
    staffById?.status || []
  );

  useEffect(() => {
    setChangeStaffStatus(staffById?.status);
  }, [staffById]);

  // Handle toggle switch
  const handleToggle = () => {
    const payload = {
      staffId: staffById?._id,
    };

    dispatch(updateStaffStatusAsync(payload)).then((response) => {
      if (response.payload.statusCode === 200) {
        toast.success(response.payload.message);
        // handleToGetStaffDetails();
        dispatch(getStaffDetailById(staffDetail?._id));
      }
    });
  };


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
          paddingTop: "80px",
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
          {staffDetail?.role ? capitalize(staffDetail?.role) : "-"} Details
        </Typography>
        <Box sx={{ marginLeft: isSmallScreen ? "0" : "10px" }}>
          <Box>
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
                  alt={staffDetail.name}
                  src={staffDetail.image || ""}
                  sx={{ width: 56, height: 56, mr: isSmallScreen ? 0 : 2 }}
                />
                <Box
                  sx={{
                    textAlign: isSmallScreen ? "center" : "left",
                    mt: isSmallScreen ? 1 : 0,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {staffDetail.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                  >
                    {staffDetail.userName}
                    <Tooltip title="Copy User ID">
                      <IconButton
                        onClick={() => handleCopy(staffDetail.userName)}
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
                  sx={{
                    ml: isSmallScreen ? 0 : "auto",
                    marginTop: isSmallScreen ? "10px" : 0,
                  }}

                  checked={changeStaffStatus}
                  onChange={() => handleToggle()}
                />
              </Box>
            </Box>
          </Box>
          <Box>
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
                    icon: <PhoneIcon />,
                    label: "Phone No.",
                    value: `+91 ${staffDetail.phone}`,
                  },
                  {
                    icon: <EmailIcon />,
                    label: "Email ID",
                    value: staffDetail.email,
                  },
                  {
                    icon: <CalendarMonthIcon />,
                    label: "Date of Birth",
                    value: moment.utc(staffDetail.dob).format("DD-MM-YYYY"),
                  },
                  {
                    icon: <BloodtypeIcon />,
                    label: "Blood Group",
                    value: staffDetail.bloodGroup,
                  },
                  {
                    icon: <ManIcon />,
                    label: "Father Name",
                    value: staffDetail.fatherName,
                  },
                  {
                    icon: <WomanIcon />,
                    label: "Mother Name",
                    value: staffDetail.motherName,
                  },
                  {
                    icon: <WcIcon />,
                    label: "Spouse Name",
                    value: staffDetail.spouseName,
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
    </Box>
  );
}
