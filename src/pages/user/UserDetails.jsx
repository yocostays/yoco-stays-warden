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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate, useParams } from "react-router-dom";
import UserPrsnDetails from "./UserPrsnDetails";
import KycUploadDetails from "./KycUploadDetails";
import DisciplinaryActionTable from "./DisciplinaryActionTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getStaffDetailById,
  getStaffFamilyDetails,
  getStaffIndisiplinaryDetails,
  getStaffKycDetails,
  getStaffVehicleDetails,
  updateStaffStatusAsync,
} from "@features/users/userSlice";
import VehicleDetailTabel from "./VehicleDetailTabel";
import { toast } from "react-toastify";
import Iconify from "@components/iconify/iconify";

export default function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("");
  const {
    // staffDetails,
    staffById,
    staffFamilyDetails,
    staffVehicleDetails,
    staffKycDetails,
    staffIndDetails,
    staffByIdLoading,
  } = useSelector((state) => state?.users); // Catch error in state if possible
  const adminDetailsRef = useRef(null);
  const vehicleDetailsRef = useRef(null);
  const kycDocumentsRef = useRef(null);
  const inDisciplinaryRef = useRef(null);

  const refs = [
    { ref: adminDetailsRef, value: "family" },
    { ref: kycDocumentsRef, value: "kyc" },
    { ref: vehicleDetailsRef, value: "vehicle" },
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedRef = refs[newValue]?.ref;
    if (selectedRef?.current) {
      selectedRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditClick = () => {
    navigate(`/user/edit-staff/${id}`, {
      state: { staffById, staffByIdLoading },
    });
  };

  const handleInactiveClick = () => {
    const payload = {
      staffId: staffById?._id,
    };

    dispatch(updateStaffStatusAsync(payload)).then((response) => {
      if (response.payload.statusCode === 200) {
        toast.success(response.payload.message);
        dispatch(getStaffDetailById(staffById?._id));
      }
    });
  };

  useEffect(() => {
    // dispatch(getStaffDetailById(id));
    if (id && tabValue) {
      switch (tabValue) {
        case "family":
          dispatch(getStaffFamilyDetails({ staffId: id, type: "family" }));
          break;
        case "vehicle":
          dispatch(getStaffVehicleDetails({ staffId: id, type: "vehicle" }));
          break;
        case "kyc":
          dispatch(getStaffKycDetails({ staffId: id, type: "kyc" }));
          break;
        case "indisciplinary":
          dispatch(
            getStaffIndisiplinaryDetails({
              staffId: id,
              type: "indisciplinary",
            })
          );
          break;
      }
    }
  }, [id, tabValue]);

  useEffect(() => {
    if (id) {
      dispatch(getStaffDetailById(id));
    }
  }, [id,dispatch]);

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
  }, []);

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
                height: "6px", // Adjust the thickness of the indicator
                backgroundColor: "#5E2E8C", // Customize the color of the indicator
              },
            }}
          >
            <Tab onClick={() => scrollToRef("family")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <PersonOutlineIcon />
                  <Typography fontWeight="bold">Personal/Family Details</Typography>
                </Box>
              }
            />
            <Tab onClick={() => scrollToRef("kyc")}
              label={
                <Box display="flex" alignItems="center" gap="8px">
                  <InsertDriveFileOutlinedIcon />
                  <Typography fontWeight="bold">Upload KYC Documents</Typography>
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
              onClick={() => navigate("/user")}
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
                startIcon={
                  <Iconify
                    icon={
                      staffById?.status === false
                        ? "material-symbols-light:offline-pin-outline-rounded"
                        : "material-symbols-light:offline-pin-off-outline-rounded"
                    }
                    width="24"
                    height="24"
                  />
                }
                onClick={handleInactiveClick}
                sx={{
                  textTransform: "none",
                  borderColor: "#674D9F",
                  color: "#674D9F",
                  width: isSmallScreen ? "100%" : "auto",
                }}
              >
                {staffById?.status === false ? "Active" : "Inactive"}
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
                <MenuItem onClick={handleMenuClose}>PDF</MenuItem>
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
          <Box ref={adminDetailsRef} sx={{ minHeight: "80vh", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <UserPrsnDetails
              staffDetail={staffFamilyDetails}
              staffById={staffById}
            />
          </Box>
          <Box ref={kycDocumentsRef} sx={{ minHeight: "80vh", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <KycUploadDetails kycDocuments={staffKycDetails?.kycDocuments} />
            </Typography>
          </Box>
          <Box ref={vehicleDetailsRef} sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <VehicleDetailTabel vechicleDetails={staffVehicleDetails?.vechicleDetails} />
            </Typography>
          </Box>
          <Box ref={inDisciplinaryRef} sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h5">
              <DisciplinaryActionTable
                disciplinaryData={staffIndDetails?.indisciplinaryActions}
              />
            </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
}
