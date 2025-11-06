/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate, useParams } from "react-router-dom";
import KycUploadDetails from "./KycUploadDetails";
import DisciplinaryActionTable from "./DisciplinaryActionTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  getUsersAcademicDetail,
  getUsersFamilyDetail,
  getUsersHostelDetail,
  getUsersIndisciplinaryDetail,
  getUsersKycDetail,
  getUsersPersonalDetail,
  getUsersVehicleDetail,
} from "@features/users/userSlice";
import { toast } from "react-toastify";
import { updateStudentStatus } from '@features/student/studentSlice'
import StudentPrsnDetails from "./StudentPrsnlDetails";
import StudentFamilyDetails from "./StudentFamilyDetails";
import StudentHostelDetails from "./StudentHostelDetail";
import StudentAcademicDetails from "./AcademicDetails";
import VehicleDetailTabel from "./VehicleDetailTabel";
import axios from "axios";

export default function StudentDetails() {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [tabValue, setTabValue] = useState("personal");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const {
    studentDetail,
    staffByIdLoading,
    userPersonalDetail,
    userFamilyDetail,
    userHostelDetail,
    userAcademicDetail,
    userKycDetail,
    userVehicleDetail,
    userIndisciplinaryDetail,
  } = useSelector((state) => state?.users);

  const [statusName, setStatusName] = useState("")

  const personalDetailsRef = useRef(null);
  const familyDetailsRef = useRef(null);
  const hostelDetailsRef = useRef(null);
  const academicDetailsRef = useRef(null);
  const kycDocumentsRef = useRef(null);
  const vehicleDetailRef = useRef(null);
  const inDisciplinaryRef = useRef(null);

  const refs = [
    { ref: personalDetailsRef, value: "personal" },
    { ref: familyDetailsRef, value: "family" },
    { ref: hostelDetailsRef, value: "hostel" },
    { ref: academicDetailsRef, value: "academics" },
    { ref: kycDocumentsRef, value: "kyc" },
    { ref: vehicleDetailRef, value: "vehicle" },
    { ref: inDisciplinaryRef, value: "indisciplinary" },
  ];



  const scrollToRef = (value) => {
    const targetRef = refs.find((item) => item.value === value)?.ref;
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Ref for value "${value}" not found.`);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedRef = refs[newValue]?.ref;
    if (selectedRef?.current) {
      selectedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentTab = refs.find((r) => r.ref.current === entry.target);
          if (currentTab) {
            setTabValue(currentTab.value);
            setSelectedTab(refs.indexOf(currentTab));
          }
        }
      });
    }, observerOptions);

    refs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorStatusEl, setAnchorStatusEl] = useState(null)
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleStatusClick = (event) => {
    setAnchorStatusEl(event.currentTarget);
  };


  const handleStatusClose = () => {
    setAnchorStatusEl(null);
  };



  useEffect(() => {
    if (!studentDetail) return;

    const { status, isLeft, leftDate } = studentDetail;

    if (status === true) {
      setStatusName("Active");
    } else if (status === false && isLeft === false && leftDate === null) {
      setStatusName("In Active");
    } else if (status === false && isLeft === true && leftDate !== null) {
      setStatusName("Left User");
    }
  }, [studentDetail,]);

  // Status change handler
  const handleStatusChange = (newStatusLabel) => {

    if (statusName === newStatusLabel) {
      setAnchorStatusEl(null);
      return;
    }

    let statusValue;

    if (newStatusLabel === 'Active') {
      statusValue = 'active';
    } else if (newStatusLabel === 'Left User') {
      statusValue = 'left user';
    } else {
      statusValue = 'inActive';
    }

    const payload = {
      studentId: id,
      status: statusValue,
    };


    dispatch(updateStudentStatus(payload)).then((response) => {
      if (response.payload.statusCode === 200) {
        toast.success(response.payload.message);
        setAnchorStatusEl(null);
        setStatusName(newStatusLabel);
      } 
    })
      
  };



  const handleEditClick = () => {
    navigate(`/user/edit-student/${id}`, {
      state: { studentDetail, staffByIdLoading },
    });
  };


  const handleDownloadPDF = async () => {
    const url =
      `${import.meta.env.VITE_API_BASE_URL}/api/user-report/export-details`;
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authorization token found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        url,
        {
          type: tabValue, // Use the current tabType
          studentId: id, // Use the studentId from the path
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", // Expect a blob response (PDF)
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Instead of downloading, open the PDF in a new browser tab
      window.open(downloadUrl);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(
        "Error downloading the PDF:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (id && tabValue) {
      // dispatch(getUserDetails(id));
      switch (tabValue) {
        case "personal":
          dispatch(getUsersPersonalDetail({ studentId: id, type: "personal" }));
          break;
        case "family":
          dispatch(getUsersFamilyDetail({ studentId: id, type: "family" }));
          break;
        case "hostel":
          dispatch(getUsersHostelDetail({ studentId: id, type: "hostel" }));
          break;
        case "academics":
          dispatch(getUsersAcademicDetail({ studentId: id, type: "academic" }));
          break;
        case "kyc":
          dispatch(getUsersKycDetail({ studentId: id, type: "kyc" }));
          break;
        case "vehicle":
          dispatch(getUsersVehicleDetail({ studentId: id, type: "vehicle" }));
          break;
        case "indisciplinary":
          dispatch(
            getUsersIndisciplinaryDetail({
              studentId: id,
              type: "indisciplinary",
            })
          );
          break;
      }
    }
  }, [id, tabValue]);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [id, tabValue]);

  const handleNavigation = () => {
    navigate('/user')
    // const profileView = localStorage.getItem('profileView');

    // switch (profileView) {
    //   case 'leave':
    //     navigate('/leave');
    //     break;
    //   case 'mess':
    //     navigate('/newmessmanagement');
    //     break;
    //   case 'complaints':
    //     navigate('/complaints');
    //     break;
    //   default:
    //     navigate('/user');
    // }
  };


  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", xs: 0 },
        // marginBottom: "30px",
      }}
    >
      <Box>
        <Box
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            paddingLeft: { sm: "16px", xs: "8px" },
            marginX: { sm: "16px", xs: "8px" },
            position: "sticky",
            top: -21,
            zIndex: 1000,
            backgroundColor: "white",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                minWidth: "auto",
                textTransform: "none",
                fontSize: isSmallScreen ? "14px" : "16px",
                marginRight: isSmallScreen ? "12px" : "20px",
                color: "lightgrey",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingY: 3,
              },
              "& .Mui-selected": {
                color: "#5E2E8C",
              },
              "& .MuiTabs-indicator": {
                height: "6px",
                backgroundColor: "#5E2E8C",
              },
            }}
          >
            <Tab onClick={() => scrollToRef("personal")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <PersonOutlineIcon />
                  <Typography fontWeight="bold">Personal Details</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("family")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <FamilyRestroomIcon />
                  <Typography fontWeight="bold">Family Details</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("hostel")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <HolidayVillageIcon />
                  <Typography fontWeight="bold">Hostel Details</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("academics")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <SchoolIcon />
                  <Typography fontWeight="bold">Academic Details</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("kyc")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <InsertDriveFileOutlinedIcon />
                  <Typography fontWeight="bold">KYC Documents</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("vehicle")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <DirectionsCarIcon />
                  <Typography fontWeight="bold">Vehicle Details</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("indisciplinary")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <ReportProblemOutlinedIcon />
                  <Typography fontWeight="bold">In-disciplinary Actions</Typography>
                </Box>
              }
            />
          </Tabs>
        </Box>
        <Box>
          <Box
            display="flex"
            justifyContent={isSmallScreen ? "center" : "space-between"}
            alignItems="center"
            flexWrap="wrap"
            p={2}
            sx={{
              border: "2px solid #674D9F",
              borderRadius: "20px 20px 0px 0px",
              margin: "20px",
              backgroundColor: "#fff",
              gap: isSmallScreen ? "12px" : "0",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{ gap: "8px", flex: isSmallScreen ? "1 1 100%" : "none" }}
              onClick={handleNavigation}
            >
              <IconButton sx={{ color: "#674D9F" }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                sx={{ fontWeight: "bold", color: "#674D9F", cursor: "pointer" }}
              >
                Back
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                gap: "12px",
                flex: isSmallScreen ? "1 1 100%" : "none",
                justifyContent: isSmallScreen ? "center" : "flex-end",
                flexDirection: isSmallScreen ? "column" : "row",
              }}
            >

              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#674D9F",
                  color: "#674D9F",
                  width: isSmallScreen ? "100%" : "auto",
                }}
                onClick={handleStatusClick}
              >
                {statusName}
              </Button>
              <Menu
                anchorEl={anchorStatusEl}
                open={Boolean(anchorStatusEl)}
                onClose={handleStatusClose}
                PaperProps={{
                  sx: {
                    border: "1px solid #674D9F",
                    borderRadius: "8px",
                    mt: 1,
                  },
                }}
              >
                <MenuItem onClick={() => handleStatusChange("Active")}>Active</MenuItem>
                <MenuItem onClick={() => handleStatusChange("In Active")}>Inactive</MenuItem>
                <MenuItem onClick={() => handleStatusChange('Left User')}>Left User</MenuItem>
              </Menu>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#674D9F",
                  color: "#674D9F",
                  width: isSmallScreen ? "100%" : "auto",
                }}
                onClick={handleEditClick}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#674D9F",
                  color: "#674D9F",
                  width: isSmallScreen ? "100%" : "auto",
                }}
                onClick={handleMenuClick}
              >
                Export
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    border: "1px solid #674D9F",
                    borderRadius: "8px",
                    mt: 1,
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose}>Excel</MenuItem>
                <MenuItem onClick={handleDownloadPDF}>PDF</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingBottom: "100px",
            borderBottom: "2px solid #E0E0E0", // Bottom border with specified color
            borderRadius: "0 0 8px 8px", // Rounded bottom corners
            position: "relative", // Required for pseudo-elements
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-30px",
            display: "flex", // Enables flexbox
            flexDirection: "column", // Stacks child elements vertically
            justifyContent: "center", // Centers child elements horizontally
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: "2px", // Border width
              background: "linear-gradient(to bottom, #674D9F, transparent)", // Gradient for fading effect
              height: "100%", // Full height of the container
            },
            "&::before": {
              left: 0, // Align to the left edge
              top: 0, // Start from the top
            },
            "&::after": {
              right: 0, // Align to the right edge
              top: 0, // Start from the top
            },
          }}
        >
          <Box ref={personalDetailsRef} sx={{ minHeight: "80vh", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <StudentPrsnDetails studentDetail={studentDetail} />
          </Box>
          <Box ref={familyDetailsRef} sx={{ minHeight: "80vh", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <StudentFamilyDetails studentDetail={studentDetail?.familiyDetails} />
          </Box>
          <Box ref={hostelDetailsRef} sx={{ minHeight: "80vh", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <StudentHostelDetails studentDetail={userHostelDetail} />
          </Box>
          <Box ref={academicDetailsRef} sx={{ minHeight: "80vh", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <StudentAcademicDetails studentDetail={userAcademicDetail} />
            </Typography>
          </Box>
          <Box ref={kycDocumentsRef} sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <KycUploadDetails kycDocuments={userKycDetail?.documents} />
            </Typography>
          </Box>
          <Box ref={vehicleDetailRef} sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <VehicleDetailTabel
                vechicleDetails={userVehicleDetail?.vechicleDetails}
              />
            </Typography>
          </Box>
          <Box ref={inDisciplinaryRef} sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <DisciplinaryActionTable
                data={userIndisciplinaryDetail?.indisciplinaryActions}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
