import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import * as yup from "yup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateStudentForm from "../studentForm";
import FamilyDetailsForm from "../familyDetail";
import HostelDetailsForm from "../hostelDetails";
import KycUpload from "../kycUpload";
import VehicleForm from "../vehicleDetail";
import AcademicDetailsForm from "../academicDetails";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addStudentValidations,
  addStudentValidationsUpdate,
} from "@components/validations/user/addStudentValidations";
import FileUpload from "@pages/user-management/components/new-resident/components/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import {
  createResidentAsync,
  getHostelListAsync,
  updateResidentAsync,
} from "@features/hostel/hostelApi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

export default function StudentIndex() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const currentData = location?.state?.studentDetail;
  const isLoading = location?.state?.staffByIdLoading;

  const [open, setOpen] = useState(false);
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [openFatherOtpModal, setOpenFatherOtpModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [vehicleDetails, setVehicleDetails] = useState(
    currentData?.vechicleDetails || []
  );

  const [verified, setVerified] = useState(false);
  const [isFathersNoVerified, setIsFathersNoVerified] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [image, setImage] = useState(currentData?.image || "");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { hostelList, isSubmitting } = useSelector((state) => state.hostel);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const sections = [
    { label: "Personal Details", ref: sectionRefs[0] },
    { label: "Family Details", ref: sectionRefs[1] },
    { label: "Hostel Details", ref: sectionRefs[2] },
    { label: "Academic Details", ref: sectionRefs[3] },
    { label: "KYC Documents", ref: sectionRefs[4] },
    { label: "Vehicle Details", ref: sectionRefs[5] },
  ];

  const validationSchema = id
    ? yup.object().shape(addStudentValidationsUpdate)
    : yup.object().shape(addStudentValidations);

  const methods = useForm(
    {
      resolver: yupResolver(validationSchema),
      defaultValues: {
        studentName: currentData?.name || "",
        userName: currentData?.userName || "",
        phoneNumber: currentData?.phone || "",
        studentEmail: currentData?.email || "",
        studentDob: (currentData?.dob && moment.utc(currentData?.dob)) || null,
        enrollNo: currentData?.enrollmentNumber || "",
        bloodGroup: currentData?.bloodGroup
          ? { label: currentData.bloodGroup, value: currentData.bloodGroup }
          : null,
        gender: currentData?.gender || "",
        disabilities: (currentData?.divyang === true ? "yes" : "no") || "",
        identificationMark: currentData?.identificationMark || "",
        medicalIssue: currentData?.medicalIssue || "",
        allergyProblem: currentData?.allergyProblem || "",
        country: currentData?.country || null,
        state: currentData?.state || null,
        city: currentData?.city || null,
        category: currentData?.category
          ? { label: currentData?.category, value: currentData?.category }
          : null,
        caste: currentData?.cast || "",
        permanentAddress: currentData?.permanentAddress || "",
        currentAddress: currentData?.currentAddress || "",

        // Family Details
        fatherName: currentData?.familiyDetails?.fatherName || "",
        fatherphoneNumber: currentData?.familiyDetails?.fatherNumber || "",
        fatherEmail: currentData?.familiyDetails?.fatherEmail || "",
        fatherOccupation: currentData?.familiyDetails?.fatherOccuption || "",
        motherName: currentData?.familiyDetails?.motherName || "",
        motherphoneNumber: currentData?.familiyDetails?.motherNumber || "",
        motherEmail: currentData?.familiyDetails?.motherEmail || "",
        guardianName: currentData?.familiyDetails?.guardianName || "",
        relationship: currentData?.familiyDetails?.relationship || "",
        occupation: currentData?.familiyDetails?.occuption || "",
        guardianMobileNumber:
          currentData?.familiyDetails?.guardianContactNo || "",
        emailId: currentData?.familiyDetails?.guardianEmail || "",
        familyAddress: currentData?.familiyDetails?.address || "",

        // Hostel Details
        hostel: currentData?.hostelId || null,
        selectWing: currentData?.hostelId || null,
        roomNumber: currentData?.hostelId?.roomNumber || "",
        bedType: null,
        bedNumber: null,

        // Acadmic Details
        academicYear: currentData?.academicDetails?.academicYear || null,
        college: currentData?.academicDetails?.universityId || null,
        course: currentData?.academicDetails?.courseId || null,
        semester: currentData?.academicDetails?.semester
          ? {
              label: String(currentData?.academicDetails?.semester),
              value: String(currentData?.academicDetails?.semester),
            }
          : null,

        // KYC Update
        aadhaar: currentData?.documents?.aadhaarCard || "",
        voterId: currentData?.documents?.voterCard || "",
        passport: currentData?.documents?.passport || "",
        drivingLicense: currentData?.documents?.drivingLicense || "",
        pancard: currentData?.documents?.panCard || "",
      },
    },
    [currentData]
  );

  const {
    handleSubmit,
    // formState: { errors },
  } = methods;
  const handleTabChange = (index) => {
    setSelectedTab(index); // Select the clicked tab
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the selected section
  };

  const onSubmit = (values) => {
    if (openOtpModal === false || openFatherOtpModal === false) {
      const vehicles = vehicleDetails.map((item) => ({
        vechicleType: item?.vechicleType,
        engineType: item?.engineType ? item.engineType : null,
        vechicleNumber: item?.vechicleNumber,
        modelName: item?.modelName ? item.modelName : null,
      }));

      const payload = {
        name: values.studentName,
        image,
        phone: Number(values.phoneNumber),
        email: values.studentEmail,
        dob: moment.utc(values.studentDob).toISOString(),
        enrollmentNumber: values.enrollNo,
        bloodGroup: values.bloodGroup.value,
        gender: values.gender,
        divyang: values.disabilities === "no" ? false : true,
        identificationMark: values.identificationMark,
        medicalIssue: values.medicalIssue,
        allergyProblem: values.allergyProblem,
        country: {
          name: selectedCountry?.name,
          iso2: selectedCountry?.iso2,
          countryId: selectedCountry?.id,
        },
        state: {
          stateId: selectedState?.id,
          name: selectedState?.name,
          iso2: selectedState?.iso2,
        },
        city: {
          cityId: selectedCity?.id,
          name: selectedCity?.name,
        },
        cast: values.caste,
        category: values.category.value,
        permanentAddress: values.permanentAddress,
        currentAddress: values.currentAddress,
        familiyDetails: {
          fatherName: values.fatherName,
          fatherNumber: Number(values.fatherphoneNumber),
          fatherEmail: values.fatherEmail,
          fatherOccuption: values.fatherOccupation,
          motherName: values.motherName,
          motherNumber: Number(values.motherphoneNumber),
          motherEmail: values.motherEmail,
          guardianName: values.guardianName,
          guardianContactNo: Number(values.guardianMobileNumber),
          relationship: values.relationship,
          occuption: values.occupation,
          guardianEmail: values.emailId,
          address: values.familyAddress,
        },
        academicDetails: {
          universityId: values.college?._id,
          courseId: values.course?._id,
          academicYear: values?.academicYear,
          semester: values.semester.value,
        },
        documents: {
          aadhaarCard: values?.aadhaar,
          drivingLicense: values?.drivingLicense
            ? values?.drivingLicense
            : null,
          panCard: values?.pancard ? values?.pancard : null,
          passport: values?.passport,
          voterCard: values?.voterId ? values?.voterId : null,
        },
        vechicleDetails: vehicles,
      };

      id
        ? dispatch(updateResidentAsync({ id, data: payload })).then((res) => {
            if (res?.payload?.statusCode === 200) {
              toast.success(res?.payload?.message);
              navigate("/user");
            } else {
              toast.error(res?.payload);
            }
          })
        : dispatch(
            createResidentAsync({
              ...payload,
              hostelId: values?.hostel?._id,
              bedType: values?.bedType?.bedType,
              buildingNumber: values?.selectWing,
              floorNumber: selectedFloor?.floorNumber,
              roomNumber: selectedRoom?.roomNumber || values?.roomNumber,
              bedNumber: values?.bedNumber?._id,
              billingCycle: values?.billingCycle?.value,
            })
          ).then((res) => {
            if (res?.payload?.statusCode === 200) {
              toast.success(res?.payload?.message);
              navigate("/user");
            } else {
              toast.error(res?.payload);
            }
          });
    }
  };

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex(
            (section) => section.ref.current === entry.target
          );
          if (index !== -1) {
            // Only set the selected tab when the current section is at least partially visible
            setSelectedTab(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3, // Set threshold to 30% visibility to allow tab change when section is partially visible
    });

    sectionRefs.forEach((ref) => ref.current && observer.observe(ref.current));

    return () => {
      sectionRefs.forEach(
        (ref) => ref.current && observer.unobserve(ref.current)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getHostelListAsync());
  }, [dispatch]);

  useEffect(() => {
    if (id && currentData) {
      setVehicleDetails(currentData?.vechicleDetails);
      setVerified(true);
      setIsFathersNoVerified(true);

      // Set location fields
      setSelectedCountry({
        name: currentData?.country?.name,
        iso2: currentData?.country?.iso2,
        countryId: currentData?.country?.countryId,
      });

      setSelectedState({
        stateId: currentData?.state?.stateId,
        name: currentData?.state?.name,
        iso2: currentData?.state?.iso2,
      });

      setSelectedCity({
        cityId: currentData?.city?.cityId,
        name: currentData?.city?.name,
      });
  
    }
  }, [id, currentData]);

  return (
    <>
      <Box
        sx={{
          width: { md: `calc(100% - 270px)`, xs: "100%" },
          ml: { md: "270px", xs: 0 },
          marginBottom: "30px",
          paddingLeft: { sm: "20px", xs: "0" }, // Add some left padding to avoid content touching the edge
          paddingRight: { sm: "20px", xs: "0" }, // Add some right padding
        }}
      >
        <Box
          sx={{
            padding: "16px",
            cursor: "pointer",
            color: "#674D9F",
            fontWeight: "bold",
            border: "2px solid #674D9F",
            borderRadius: "20px 20px 0px 0px",
            mx: "20px",
            mt: { md: "10px", sm: "60px", xs: "120px" },
            mb: "30px",
            backgroundColor: "#fff",
            gap: isSmallScreen ? "12px" : "8px",
          }}
        >
          {/* Back Button */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              onClick={() =>
                id
                  ? navigate(`/users/student/details/${id}`)
                  : navigate("/user")
              }
            >
              <ArrowBackIcon />
              <Typography>Back</Typography>
            </Box>
            {!id && (
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: "50px" }}
                  type="button"
                  onClick={() => setOpen(true)}
                >
                  Bulk upload
                </Button>
              </Box>
            )}
          </Box>

          {/**step section */}
          <Box
            sx={{
              overflowX: "auto", // Ensure horizontal scrolling for tabs
              display: { xs: "block", md: "none" },
              marginBottom: "-10px",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={(event, newValue) => handleTabChange(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: "#5E2E8C", // Active tab indicator color
                },
              }}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "500",
                  padding: "0px 16px",
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  color: "#000",
                  "&.Mui-selected": {
                    color: "#5E2E8C",
                    fontWeight: "bold",
                  },
                },
              }}
            >
              {sections.map((section, index) => (
                <Tab
                  key={index}
                  label={section.label}
                  icon={
                    selectedTab > index ? (
                      <CheckCircleIcon
                        sx={{ fontSize: "16px", color: "#5E2E8C" }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={{ fontSize: "16px", color: "#E0E0E0" }}
                      />
                    )
                  }
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        <Box
          sx={{
            paddingBottom: "100px",
            borderRadius: "0 0 8px 8px",
            position: "relative",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-30px",
            overflowY: "scroll", // Enable scroll
            maxHeight: "calc(100vh - 100px)", // Set max height of container
            borderBottom: "2px solid #674D9F",
            borderRight: "2px solid #674D9F",
            borderLeft: "2px solid #674D9F",
            "&::-webkit-scrollbar": {
              width: "8px", // Set the width of the scrollbar
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#674D9F", // Set the color of the scrollbar thumb
              borderRadius: "8px",
            },
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: "2px",
              height: "100%",
            },
            "&::before": {
              left: 0,
              top: 0,
            },
            "&::after": {
              right: 0,
              top: 0,
            },
          }}
        >
          <Grid container spacing={3} sx={{ padding: "0 16px" }}>
            {/* Steps Section */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: { xs: "none", md: "block" }, // Hide on small screens
                position: { xs: "relative", md: "sticky" },
                top: "16px",
                alignSelf: "flex-start",
                overflowY: "auto",
                height: { xs: "auto", md: "calc(100vh - 150px)" },
                paddingRight: "16px", // Add padding to prevent overlap
              }}
            >
              <List sx={{ overflowY: "auto", position: "relative" }}>
                {sections.map((section, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      button
                      onClick={() => handleTabChange(index)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "1px 0",
                        borderRadius: "5px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "auto",
                          marginRight: "16px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor:
                            selectedTab === index ? "#5E2E8C" : "#fff",
                          color: selectedTab === index ? "#FFF" : "#5E2E8C",
                          fontWeight: "bold",
                        }}
                      >
                        {selectedTab > index ? (
                          <CheckCircleIcon sx={{ fontSize: "16px" }} />
                        ) : (
                          <RadioButtonUncheckedIcon sx={{ fontSize: "16px" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={section.label}
                        primaryTypographyProps={{
                          fontSize: "16px",
                          color: selectedTab === index ? "#5E2E8C" : "#000",
                          fontWeight: selectedTab === index ? "bold" : "600",
                        }}
                      />
                    </ListItem>
                    {index < sections.length - 1 && (
                      <Box
                        sx={{
                          width: "2px",
                          height: "24px",
                          backgroundColor:
                            selectedTab > index ? "#5E2E8C" : "#E0E0E0",
                          marginLeft: "10px",
                        }}
                      ></Box>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Grid>

            {/* Content Section */}
            <Grid item xs={12} md={9}>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    sx={{ marginTop: "16px", padding: { sm: "20px", xs: "0" } }}
                  >
                    {sections.map((section, index) => (
                      <Box key={index} ref={section.ref}>
                        {index === 0 && !isLoading && (
                          <CreateStudentForm
                            id={currentData?._id || null}
                            country={currentData?.country || null}
                            methods={methods}
                            open={openOtpModal}
                            setOpen={setOpenOtpModal}
                            verified={verified}
                            setVerified={setVerified}
                            setImage={setImage}
                            isLoading={isLoading}
                            image={image}
                            setSelectedCity={setSelectedCity}
                            setSelectedState={setSelectedState}
                            setSelectedCountry={setSelectedCountry}
                            selectedCity={selectedCity}
                            selectedState={selectedState}
                            selectedCountry={selectedCountry}
                          />
                        )}
                        {index === 1 && (
                          <FamilyDetailsForm
                            id={currentData?._id || null}
                            methods={methods}
                            verified={verified}
                            isFathersNoVerified={isFathersNoVerified}
                            setIsFathersNoVerified={setIsFathersNoVerified}
                            open={openFatherOtpModal}
                            setOpen={setOpenFatherOtpModal}
                          />
                        )}
                        {!id && index === 2 && (
                          <HostelDetailsForm
                            id={currentData?._id || null}
                            methods={methods}
                            verified={isFathersNoVerified}
                            hostelList={hostelList}
                            setSelectedFloor={setSelectedFloor}
                            selectedFloor={selectedFloor}
                            selectedRoom={selectedRoom}
                            setSelectedRoom={setSelectedRoom}
                          />
                        )}
                        {index === 3 && (
                          <AcademicDetailsForm
                            id={currentData?._id || null}
                            methods={methods}
                            verified={isFathersNoVerified}
                          />
                        )}
                        {index === 4 && (
                          <KycUpload
                            id={currentData?._id || null}
                            methods={methods}
                            verified={isFathersNoVerified}
                            isKycFrom={"student"}
                          />
                        )}
                        {index === 5 && (
                          <>
                            <VehicleForm
                              methods={methods}
                              id={currentData?._id || null}
                              vehicleDetails={vehicleDetails}
                              setVehicleDetails={setVehicleDetails}
                              verified={isFathersNoVerified}
                            />
                            <Box
                              sx={{
                                display: "flex", // Flexbox layout
                                justifyContent: "center", // Center horizontally
                                alignItems: "center", // Center vertically (if needed)
                                marginTop: "16px", // Add margin for spacing
                              }}
                            >
                              <LoadingButton
                                variant="contained"
                                color="primary"
                                loading={isSubmitting}
                                onClick={handleSubmit(onSubmit)}
                                sx={{
                                  padding: "10px 20px",
                                  borderRadius: "10px",
                                }} // Adjust padding for better appearance
                              >
                                Submit
                              </LoadingButton>
                            </Box>
                          </>
                        )}
                      </Box>
                    ))}
                  </Box>
                </form>
              </FormProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Bulk Upload
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <FileUpload setOpen={setOpen} />
      </Dialog>
    </>
  );
}
