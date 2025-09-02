import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateStaffForm from "../form";
import KycUpload from "../kycUpload";
import VehicleForm from "../vehicleDetail";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createStaffAsync,
  getHostelListAsync,
  getRoleListAsync,
  updateStaffAsync,
} from "@features/hostel/hostelApi";
import FormProvider from "@components/hook-form/FormProvider";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { getCategoryAsync } from "@features/category/categoryService";
import dayjs from "dayjs";
import HostelForm from "../hostelFormStaff";



export default function StaffIndex() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const currentData = location?.state?.staffById;
  const staffByIdLoading = location?.state?.staffByIdLoading;

  const [selectedTab, setSelectedTab] = useState(0);
  const [personalDetails, setPersonalDetails] = useState({});
  const [kycDetails, setKycDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState(
    currentData?.vechicleDetails || []
  );
  const [hostelDetails, setHostelDetails] = useState(
    currentData?.hostelDetail || []
  );

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [startTime, setStartTime] = useState( (id && dayjs(currentData?.shiftStartTime, "HH:mm")) || null);
  const [endTime, setEndTime] = useState( (id && dayjs(currentData?.shiftEndTime, "HH:mm")) || null);
  const [image, setImage] = useState(currentData?.image || "");

  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  const { roleList, hostelList, isSubmitting } = useSelector((state) => state?.hostel);
  // const { isSubmitting } = useSelector((state) => state.staff);
  const { categoryList } = useSelector((state) => state.category);
  const [roleId,setRoleId] = useState("");

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    aadhaar: yup.string().required("Aadhaar is required."),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    passport: yup.string().required("Passport is required."),
    userName: yup.string().required("Username is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    dob: yup.date().required("Date of birth is required"),
    bloodGroup: yup.object().nullable().required("Blood group is required"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Gender is required"),
    roleId: yup
      .object()
      .shape({
        name: yup.string(),
        _id: yup.string(),
      })
      .required("Role is required"),
    category: yup
      .object()
      .when("roleId.name", {
        is: "maintenance", // Ensures category is required only when role is 'maintenance'
        then: (schema) => schema.required("Category is required."),
        otherwise: (schema) => schema.notRequired(),
      }),
    joiningDate: yup.date().nullable().required("Joining date is required"),
    fatherName: yup.string().required("Father's name is required"),
    motherName: yup.string().required("Mother's name is required"),
    spouseName: yup.string(),
    assignedHostelIds: yup
      .array()
      .min(1, "Please select at least one option") // Requires at least one selection
      .required("This field is required"),
  });

  const methods = useForm(
    {
      resolver: yupResolver(validationSchema),
      defaultValues: {
        aadhaar: currentData?.kycDocuments?.aadhaarCard || "",
        voterId: currentData?.kycDocuments?.voterCard || "",
        passport: currentData?.kycDocuments?.passport || "",
        drivingLicense: currentData?.kycDocuments?.drivingLicense || "",
        pancard: currentData?.kycDocuments?.panCard || "",
        userName: currentData?.userName || "",
        name: currentData?.name || "",
        email: currentData?.email || "",
        image: currentData?.image || "",
        phone: currentData?.phone || "",
        dob: currentData?.dob ? moment.utc(currentData?.dob) : null,
        bloodGroup: currentData?.bloodGroup
          ? { label: currentData?.bloodGroup, value: currentData?.bloodGroup }
          : null,
        gender: currentData?.gender || null,
        roleId: currentData?.roleId || null,
        joiningDate: currentData?.joiningDate
          ? moment.utc(currentData?.joiningDate)
          : null,
        fatherName: currentData?.fatherName || "",
        motherName: currentData?.motherName || "",
        spouseName: currentData?.spouseName || "",
        startTime: currentData?.shiftStartTime || null,
        endTime: currentData?.shiftEndTime || null,
        assignedHostelIds: currentData?.hostelIds || [],
        category: currentData?.categoryId || null,
        kycDocuments: [],
        vechicleDetails: [],
      },
    },
    [currentData]
  );

  const {
    handleSubmit,
    // formState: { errors },
  } = methods;

  const sections = [
    { label: "Personal Details", ref: sectionRefs[0] },
    { label: "Hostel Details", ref: sectionRefs[1] },
    { label: "KYC Documents", ref: sectionRefs[2] },
    { label: "Vehicle Details", ref: sectionRefs[3] },
  ];

  const handleTabChange = (index) => {
    setSelectedTab(index);
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (values) => {
    const vehicles = vehicleDetails?.map((item) => ({
      vechicleType: item?.vechicleType,
      engineType: item?.engineType ? item?.engineType : null,
      vechicleNumber: item?.vechicleNumber ? item?.vechicleNumber : null,
      modelName: item?.modelName,
    }));
    
    const hostel = hostelDetails?.map((item) => ({
      hostelId: item?.hostelId?._id,
      floorNumber: item?.floorNumber,
      roomNumber: item?.roomNumber,
    }));

    const payload = {
      roleId: values?.roleId?._id,
      name: values?.name,
      userName: values?.userName,
      email: values?.email,
      image,
      phone: Number(values?.phone),
      dob: moment.utc(values?.dob).toISOString(),
      bloodGroup: values?.bloodGroup?.value,
      joiningDate: moment.utc(values?.joiningDate).toISOString(),
      gender: values?.gender,
      fatherName: values?.fatherName,
      motherName: values?.motherName,
      spouseName: values?.spouseName,
      shiftStartTime: dayjs(startTime).format('HH:mm'),
      shiftEndTime: dayjs(endTime).format('HH:mm'),
      vechicles: vehicles,
      kycDocuments: {
        aadhaarCard: values?.aadhaar,
        drivingLicense: values?.drivingLicense ? values?.drivingLicense : null,
        panCard: values?.pancard ? values?.pancard : null,
        passport: values?.passport,
        voterCard: values?.voterId ? values?.voterId : null,
      },
      assignedHostelIds: values?.assignedHostelIds?.map(
        (hostel) => hostel?._id
      ),
      categoryId: values?.category?._id,
      hostelDetails: hostel,
    };

    id
      ? dispatch(updateStaffAsync({ id, updateData: payload })).then((res) => {
          // setIsSubmitting(false);
          if (res?.payload?.statusCode === 200) {
            toast.success(res?.payload?.message);
            navigate("/user");
          } else {
            toast.error(res?.payload);
          }
        })
      : dispatch(createStaffAsync(payload)).then((res) => {
          // setIsSubmitting(false);
          if (res?.payload?.statusCode === 200) {
            toast.success(res?.payload?.message);
            navigate("/user");
          } else {
            toast.error(res?.payload);
          }
        });
    // Add your API call or other logic here to handle the submission
  };

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.findIndex(
            (section) => section.ref.current === entry.target
          );
          if (index !== -1) setSelectedTab(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1, // Trigger when 10% of the section is visible
      rootMargin: "0px 0px -100px 0px", // Start detecting 100px before the section fully enters the view
    });

    sectionRefs.forEach((ref) => ref.current && observer.observe(ref.current));

    return () => {
      sectionRefs.forEach(
        (ref) => ref?.current && observer.unobserve(ref?.current)
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRefs]);

  useEffect(() => {
    dispatch(getRoleListAsync({}));
    dispatch(getHostelListAsync());
    // dispatch(getCategoryAsync());
  }, [dispatch]);

  useEffect(()=>{
    console.log('roleId', roleId)
    if(roleId){
    dispatch(getCategoryAsync({roleId}))
    }
  },[dispatch, roleId])

  useEffect(() => {
    if (id) {
      setVehicleDetails(currentData?.vechicleDetails || []);
      if(currentData?.hostelDetails){
        setHostelDetails(currentData?.hostelDetails || []);
      }
    }
  }, [id, currentData]);

  return (
    <>
      <Box
        sx={{
          width: { md: `calc(100% - 270px)`, xs: "100%" },
          ml: { md: "270px", xs: 0 },
          marginBottom: "30px",
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
                id ? navigate(`/users/staff/details/${id}`) : navigate("/user")
              }
            >
              <ArrowBackIcon />
              <Typography>Back</Typography>
            </Box>
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

        {/* Main Container */}
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
              display: "none", // Hide the scrollbar in Webkit browsers (Chrome, Safari)
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
                        padding: "8px 0",
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
                          fontWeight: selectedTab === index ? "bold" : "normal",
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
              <FormProvider {...methods} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ margin: "16px 0", backgroundColor: "#fff" }}>
                  {sections.map((section, index) => (
                    <Box key={index} ref={section.ref}>
                      {index === 0 && !staffByIdLoading && (
                        <CreateStaffForm
                        roleId={roleId}
                        setRoleId={setRoleId}
                          hostelList={hostelList}
                          methods={methods}
                          roleList={roleList}
                          data={personalDetails || {}}
                          setData={setPersonalDetails}
                          startTime={startTime}
                          setStartTime={setStartTime}
                          endTime={endTime}
                          setEndTime={setEndTime}
                          setImage={setImage}
                          currentData={currentData}
                          staffByIdLoading={staffByIdLoading}
                          categoryList={categoryList}
                        />
                      )}
                      {index === 1 && (
                        <HostelForm
                          methods={methods}
                          hostelDetails={hostelDetails}
                          setHostelDetails={setHostelDetails}
                          verified={true}
                          currentData={currentData}
                          hostelList={hostelList}
                        />
                      )}
                      {index === 2 && (
                        <KycUpload
                          data={kycDetails}
                          setData={setKycDetails}
                          methods={methods}
                          verified={true}
                          currentData={currentData}
                          isKycFrom={"staff"}
                        />
                      )}
                      {index === 3 && (
                        <VehicleForm
                          methods={methods}
                          vehicleDetails={vehicleDetails}
                          setVehicleDetails={setVehicleDetails}
                          verified={true}
                          currentData={currentData}
                        />
                      )}
                    </Box>
                  ))}

                  {/* Submit Button */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "24px",
                    }}
                  >
                    <LoadingButton
                      loading={isSubmitting}
                      variant="contained"
                      color="primary"
                      sx={{
                        padding: "8px 24px",
                        fontSize: isSmallScreen ? "14px" : "16px",
                        borderRadius: "20px",
                      }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Submit
                    </LoadingButton>
                  </Box>
                </Box>
              </FormProvider>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
