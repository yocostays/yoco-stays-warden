/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Icon } from "@iconify/react";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createStaffAsync,
  getAllHostelAsync,
  getBedTypeAsync,
  getRoleListAsync,
  getRoomNoAsync,
} from "../../../../../features/hostel/hostelApi";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { clearRoomDetails } from "../../../../../features/hostel/hostelSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStaffDetailById,
  getVacantRoomDetails,
  updateStaffDetailById,
} from "../../../../../features/users/userSlice";
import VehicleAdd from "./staffTableComponents/VehicleAdd";
import KYCUpload from "./staffTableComponents/KYCUpload";
import AvatarUpload from "../../../../../components/avatar/AvatarUpload";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const bloodGroups = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export default function StaffForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { allHostel, isSubmitting } = useSelector((state) => state?.hostel);

  const { bedType, roomNo, loading } = useSelector((state) => state?.hostel);

  const { staffById, staffByIdLoading } = useSelector((state) => state?.users);
  // const { hostelList } = useSelector((state) => state?.users);
  const { roleList } = useSelector((state) => state?.hostel);
  const [bedNumber, setBedNo] = useState([]);
  const [room, setRoom] = useState();
  const [roleDetails, setRoleDetails] = useState(null);
  const [vacantRoom, setVacantRoom] = useState("0/0");
  const [isVacant, setIsVacant] = useState(false);
  const [imageData, setImageData] = useState(userId ? staffById?.image : null);
  const authToken = localStorage.getItem("authToken");
  const [currentStaff, setCurrentStaff] = useState([]);
  const [edit, setEdit] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    dob: Yup.date().required("Date of birth is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Gender is required"),
    roleId: Yup.object()
      .shape({
        name: Yup.string(),
        _id: Yup.string(),
      })
      .required("Role is required"),
    password: userId
      ? Yup.string()
      : Yup.string()
          .min(8, "Password must be minimum 8 characters")
          .required("Password is required"),
    joiningDate: Yup.string().required("Joining date is required"),
    fatherName: Yup.string().required("Father's name is required"),
    motherName: Yup.string().required("Mother's name is required"),
    spouseName: Yup.string(),
    startTime: userId
      ? Yup.string()
      : Yup.string().required("Start time is required"),
    // endTime: Yup.string().required("End time is required"),
    assignedHostelIds: Yup.array()
      .min(1, "Please select at least one option") // Requires at least one selection
      .required("This field is required"),
    // for sceurity Guard
    // gateNumber: Yup.string().required("Gate Number is required"),
    // for warden
    // hostelId: Yup.string().required("Hostel ID is required"),
    // bedType: Yup.number()
    //   .oneOf([1, 2], "Invalid bed type")
    //   .required("Bed type is required"),
    // roomNumber: Yup.number().required("Room number is required"),
    // bedNumber: Yup.string().required("Bed number is required"),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentStaff?.name || "",
      userName: currentStaff?.userName || "",
      image: imageData || "",
      email: currentStaff?.email || "",
      phone: currentStaff?.phone || "",
      dob: currentStaff && currentStaff?.dob || null,
      bloodGroup: currentStaff?.bloodGroup || "",
      gender: currentStaff?.gender || null,
      roleId: currentStaff?.roleId || null,
      password: "",
      joiningDate: currentStaff?.joiningDate || null,
      fatherName: currentStaff?.fatherName || "",
      motherName: currentStaff?.motherName || "",
      spouseName: currentStaff?.spouseName || "",
      startTime: "",
      endTime: "",
      assignedHostelIds: currentStaff?.hostelIds || [],
      kycDocuments: currentStaff?.kycDocuments || [],
      vechicleDetails: currentStaff?.vechicleDetails || [],
      // Specific fields for roles
      gateNumber: currentStaff?.gateNumber || "", // For security guard
      hostelId: currentStaff?.hostelAllocationDetails?.hostelId || null, // For warden
      bedType: currentStaff?.hostelAllocationDetails || null, // For warden
      roomNumber: currentStaff?.hostelAllocationDetails?.roomNumber || null, // For warden
      bedNumber: currentStaff?.hostelAllocationDetails?.bedNumber || [], // For warden
    }),
    [currentStaff]
  );

  // parse time
  const parseTime = (timeString) => {
    if (!timeString) {
      console.error("Time string is null or undefined");
      return null; // Handle the error as needed
    }

    // Try to parse the time string with dayjs using custom format
    const parsedTime = dayjs(timeString, ["hh:mm A", "h:mm A"], true);

    // Check if the parsing was successful
    if (!parsedTime.isValid()) {
      console.error("Invalid time string format:", timeString);
      return null; // Handle the error as needed
    }

    // Return the parsed time with hour and minute set
    return parsedTime.second(0);
  };

  // avatar upload
  const handleImageChange = (imageSrc) => {
    if (imageSrc) {
      const formData = new FormData();
      formData.append("type", "staff");
      formData.append("file", imageSrc); // Append the file

      // Implement your upload logic here
      // Example: Using fetch to send the FormData to an API
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      fetch(`${apiUrl}/api/auth/upload-media`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${authToken}`, // Add your auth token here
          // 'Accept': 'application/json' // Optional, add if your API expects this
        },
      })
        .then(async (response) => {
          const responseData = await response.json();

          setImageData(responseData?.data);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          // setError("Upload failed. Please try again."); // Handle upload error
        });
    }
  };

  const handleRemoveImage = () => {
    setImageData(null);
  };

  // start and end time

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // components data
  const [vehicles, setVehicles] = useState([]);
  const [kycDocuments, setKycDocuments] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [joiningDate, setJoiningDate] = useState(null);
  const hostelId = watch("hostelId")?._id;

  const getBedType = watch("bedType");

  const handleRoleChange = (value) => {
    console.log("value", value);
    setRoleDetails(value);
  };

  const securityGuardRegex = /security guard/i;

  const handleVehiclesChange = (updatedVehicles) => {
    setVehicles(updatedVehicles);
  };

  const handleDocumentsChange = (updatedDocuments) => {
    setKycDocuments(updatedDocuments);
  };

  const onSubmit = async (data) => {
    // Example role matching regex for security guard
    const securityGuardRegex = /security guard/i;

    const createPayload = (
      data,
      imageData,
      vehicles,
      kycDocuments,
      startTime,
      endTime,
      room,
      roleDetails
    ) => {
      const basePayload = {
        name: data?.name,
        userName: data?.userName,
        image: imageData,
        email: data?.email,
        phone: Number(data?.phone),
        dob: dayjs(data?.dob).add(5, "hours").add(30, "minutes").toISOString(),
        bloodGroup: data?.bloodGroup,
        gender: data?.gender,
        roleId: roleDetails?._id,
        vechicles: [...vehicles],
        kycDocuments: { ...kycDocuments },
        joiningDate: dayjs(data?.joiningDate)
          .add(5, "hours")
          .add(30, "minutes")
          .toISOString(),
        fatherName: data?.fatherName,
        motherName: data?.motherName,
        spouseName: data?.spouseName,
        shiftStartTime: dayjs(startTime).format("hh:mm A"),
        shiftEndTime: dayjs(endTime).format("hh:mm A"),
        assignedHostelIds: data?.assignedHostelIds?.map(
          (hostel) => hostel?._id
        ),
      };

      if (!userId) {
        return {
          ...basePayload,
          password: "123456789",
        };
      }

      if (securityGuardRegex.test(roleDetails?.name)) {
        return {
          ...basePayload,
          gateNumber: data?.gateNumber,
        };
      }

      if (roleDetails?.name === "warden") {
        return {
          ...basePayload,
          hostelId: data?.hostelId?._id,
          bedType: data?.bedType?.bedType,
          roomNumber: room,
          bedNumber: data?.bedNumber,
        };
      }

      return basePayload;
    };

    // Usage example:
    const payload = createPayload(
      data,
      imageData,
      vehicles,
      kycDocuments,
      startTime,
      endTime,
      room,
      roleDetails
    );

    if (userId) {
      const id = userId;

      const resultAction = await dispatch(
        updateStaffDetailById({ id, data: payload })
      );

      if (updateStaffDetailById.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload.message || "Menu updated successfully!"
        );
        navigate("/user-management");
      } else {
        toast.error(resultAction.error.message || "Update failed!");
        console.error("Update error details:", resultAction.error);
        // dispatch(getStaffDetailById(userId));
      }
    } else {
      dispatch(createStaffAsync(payload)).then((res) => {
        if (res?.payload?.statusCode === 200) {
          toast.success(res?.payload?.message);
          navigate("/user-management");
          // reset(defaultValues);
        } else {
          toast.error(res?.payload || "An unexpected error occurred.");
        }
      });
    }
  };

  const handleButtonClick = (number) => {
    setRoom(number?.roomNumber);
    setBedNo(number?.bedNumber);
    setValue("bedNumber", "");
  };

  useEffect(() => {
    if (hostelId) {
      dispatch(getBedTypeAsync({ hostelId }));
    }
  }, [hostelId]);

  useEffect(() => {
    const data = {
      hostelId,
      bedType: getBedType?.bedType,
    };
    if (getBedType) {
      dispatch(getRoomNoAsync(data)).then((res) => {
        if (res?.payload?.statusCode === 200) {
          if (!res?.payload?.data) {
            toast?.error("Room not available , Select different bed Type");
          }
        }
      });
    }
  }, [getBedType]);

  useEffect(() => {
    if (room && staffById?.stayInHostel === false) {
      dispatch(
        getVacantRoomDetails({
          hostelId: hostelId,
          bedType: getBedType?.bedType,
          roomNumber: room,
        })
      ).then((res) => {
        if (res?.payload?.statusCode === 200) {
          const [numerator] = res?.payload?.data?.vacant?.split("/");
          setVacantRoom(res?.payload?.data?.vacant);
          if (numerator !== "0") {
            setIsVacant(true);
          } else {
            {
              !staffById?.stayInHostel &&
                toast.error("Selected room is not vacant !", {
                  variant: "error",
                });
            }
          }
        }
      });
    }
  }, [room]);

  useEffect(() => {
    setCurrentStaff([]);
    dispatch(getRoleListAsync({}));
    dispatch(getAllHostelAsync({}));
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getStaffDetailById(userId));
      setEdit(true);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    setImageData(staffById?.image);
    if (userId) {
      reset(defaultValues); // Reset form with default values
      setCurrentStaff(staffById);
      setRoleDetails(staffById?.roleId);
      setRoom(staffById?.hostelAllocationDetails?.roomNumber);
      setSelectedDate(dayjs(staffById?.dob));
      setJoiningDate(dayjs(staffById?.joiningDate));
      setValue("assignedHostelIds", staffById?.hostelIds);
      setStartTime(parseTime(staffById?.shiftStartTime));
      setEndTime(parseTime(staffById?.shiftEndTime));
    }
  }, [userId, staffById, reset, defaultValues]);

  return (
    <>
      {staffByIdLoading ? (
        <Card>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
              }}
            >
              <CircularProgress />
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Stack>
                <AvatarUpload
                  initialImage={imageData}
                  onImageChange={handleImageChange}
                  onRemoveImage={handleRemoveImage}
                  avatarSize={120}
                  uploadButtonText="Upload Image"
                  // removeButtonText="Delete"
                />
              </Stack>
              <Stack
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "repeat(3, 1fr)",
                    md: "repeat(2, 1fr)",
                    xs: "1fr",
                  },
                  gap: 3,
                  my: 3,
                }}
              >
                <Stack>
                  <FormControl fullWidth>
                    <Typography fontSize={"14px"} gutterBottom>
                      Role
                    </Typography>
                    <Controller
                      name="roleId"
                      control={control}
                      disabled={edit}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          size="small"
                          options={roleList}
                          getOptionLabel={(options) => options?.name}
                          isOptionEqualToValue={(options, value) =>
                            options?._id === value?._id
                          }
                          onChange={(evemt, value) => {
                            field.onChange(value);
                            handleRoleChange(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={!edit && !!errors.roleId}
                            />
                          )}
                        />
                      )}
                    />
                  </FormControl>
                  {errors.roleId && (
                    <Typography
                      fontSize={"14px"}
                      mt={1}
                      color="error"
                      sx={{ fontSize: "12px", ml: 2 }}
                    >
                      {errors.roleId.message}
                    </Typography>
                  )}
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    Staff Name{" "}
                  </Typography>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    User Name{" "}
                  </Typography>
                  <Controller
                    name="userName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors.userName}
                        helperText={errors.userName?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    Phone Number{" "}
                  </Typography>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        size="small"
                        type="text" // Change to text to remove arrows
                        error={!!error}
                        fullWidth
                        helperText={error?.phone?.message}
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/\D/g, "");
                          if (inputValue?.length <= 10) {
                            field.onChange(inputValue);
                          } else {
                            field.onChange(inputValue.slice(0, 10));
                          }
                        }}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    E mail{" "}
                  </Typography>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    Date Of Birth{" "}
                  </Typography>
                  <Stack>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            // maxDate={dayjs()}
                            format="DD-MM-YYYY"
                            value={selectedDate}
                            onChange={(newValue) => {
                              setSelectedDate(dayjs(newValue));
                              field.onChange(newValue);
                            }}
                            slotProps={{
                              textField: {
                                size: "small",
                              },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                fullWidth
                                error={!!errors.dob}
                                helperText={errors.dob?.message}
                              />
                            )}
                          />
                          {error && (
                            <Typography
                              fontSize={"14px"}
                              mt={1}
                              color="error"
                              sx={{ fontSize: "12px", ml: 2 }}
                            >
                              {error.message}
                            </Typography>
                          )}
                        </LocalizationProvider>
                      )}
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <FormControl fullWidth>
                    <Typography fontSize={"14px"} gutterBottom>
                      {" "}
                      Blood Group{" "}
                    </Typography>
                    <Controller
                      name="bloodGroup"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          size="small"
                          labelId="blood-group-label"
                          id="blood-group-select"
                          defaultValue=""
                          error={!!errors.bloodGroup}
                        >
                          {bloodGroups.map((group) => (
                            <MenuItem key={group.value} value={group.value}>
                              {group.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  {errors.bloodGroup && (
                    <Typography
                      fontSize={"14px"}
                      mt={1}
                      color="error"
                      sx={{ fontSize: "12px", ml: 2 }}
                    >
                      {errors.bloodGroup.message}
                    </Typography>
                  )}
                </Stack>
                {/* Gender */}
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl error={!!error}>
                      <FormLabel sx={{ fontSize: "14px" }} id="gender">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="gender"
                        {...field} // Spread field props for proper form handling
                        size="small"
                        value={field.value} // Bind value to field value
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio sx={{ transform: "scale(0.9)" }} />}
                          label={
                            <Typography fontSize={"14px"}>Female</Typography>
                          }
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio sx={{ transform: "scale(0.9)" }} />}
                          label={
                            <Typography fontSize={"14px"}>Male</Typography>
                          }
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio sx={{ transform: "scale(0.9)" }} />}
                          label={
                            <Typography fontSize={"14px"}>Other</Typography>
                          }
                        />
                      </RadioGroup>
                      {/* Display error message */}
                      {error && (
                        <Typography
                          fontSize={"14px"}
                          color="error"
                          sx={{ fontSize: "12px", ml: 2 }}
                        >
                          {error.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Stack
                  sx={{
                    width: "100%",
                    display: `${userId ? "none" : ""}`,
                  }}
                >
                  <Typography fontSize={"14px"} gutterBottom>
                    Password
                  </Typography>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleShowPassword}
                                edge="end"
                              >
                                <Icon
                                  icon={showPassword ? "mdi:hide" : "mdi:show"}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    Joining Date{" "}
                  </Typography>
                  <Stack>
                    <Controller
                      name="joiningDate"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            size="small"
                            maxDate={dayjs()}
                            format="DD-MM-YYYY"
                            value={joiningDate}
                            onChange={(newValue) => {
                              setJoiningDate(dayjs(newValue));
                              field.onChange(newValue);
                            }}
                            slotProps={{
                              textField: {
                                size: "small",
                              },
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                fullWidth
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth?.message}
                              />
                            )}
                          />
                          {error && (
                            <Typography
                              fontSize={"14px"}
                              mt={1}
                              color="error"
                              sx={{ fontSize: "12px", ml: 2 }}
                            >
                              {error.message}
                            </Typography>
                          )}
                        </LocalizationProvider>
                      )}
                    />
                  </Stack>
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    Father&apos;s Name{" "}
                  </Typography>
                  <Controller
                    name="fatherName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors.fatherName}
                        helperText={errors.fatherName?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    Mother&apos;s Name{" "}
                  </Typography>
                  <Controller
                    name="motherName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors.motherName}
                        helperText={errors.motherName?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    {" "}
                    Spouse&apos;s Name{" "}
                  </Typography>
                  <Controller
                    name="spouseName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        error={!!errors.spouseName}
                        helperText={errors.spouseName?.message}
                      />
                    )}
                  />
                </Stack>
                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    Shift Time
                  </Typography>
                  <Stack>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Controller
                            name="startTime"
                            control={control}
                            defaultValue={startTime}
                            render={({ field }) => (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  {...field}
                                  ampm={true} // Enables AM/PM and clock interface
                                  label="Start Time"
                                  value={startTime}
                                  onChange={(newValue) => {
                                    setStartTime(dayjs(newValue));
                                    setValue("startTime", newValue); // Update form value
                                  }}
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                    },
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      size="small"
                                      fullWidth
                                      error={!!errors.startTime}
                                      helperText={errors.startTime?.message}
                                      sx={{ cursor: "pointer" }}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            )}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Controller
                            name="endTime"
                            control={control}
                            defaultValue={endTime}
                            render={({ field }) => (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  {...field}
                                  ampm={true} // Enables AM/PM and clock interface
                                  label="End Time"
                                  value={endTime}
                                  onChange={(newValue) => {
                                    setEndTime(dayjs(newValue));
                                    setValue("endTime", newValue); // Update form value
                                  }}
                                  slotProps={{
                                    textField: {
                                      size: "small",
                                    },
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      fullWidth
                                      error={!!errors.endTime}
                                      helperText={errors.endTime?.message}
                                      sx={{ cursor: "pointer" }}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </Stack>
                {securityGuardRegex.test(roleDetails) && (
                  <Stack sx={{ width: "100%" }}>
                    <Typography fontSize={"14px"} gutterBottom>
                      Gate Number{" "}
                    </Typography>
                    <Controller
                      name="gateNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          error={!!errors.gateNumber}
                          helperText={errors.gateNumber?.message}
                        />
                      )}
                    />
                  </Stack>
                )}

                {/* Hostel Selection */}

                <Stack sx={{ width: "100%" }}>
                  <Typography fontSize={"14px"} gutterBottom>
                    Assign Hostels
                  </Typography>
                  <Controller
                    name="assignedHostelIds"
                    control={control}
                    defaultValue={[]} // Ensure initial value is an array
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        size="small"
                        id="checkboxes-tags-demo"
                        options={allHostel}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                          option._id === value?._id
                        }
                        value={field.value || []} // Bind value to field.value
                        onChange={(event, newValue) => field.onChange(newValue)} // Update field on change
                        renderOption={(props, option, { selected }) => {
                          const { key, ...optionProps } = props;
                          return (
                            <li key={key} {...optionProps}>
                              <Checkbox
                                icon={
                                  <CheckBoxOutlineBlankIcon fontSize="small" />
                                }
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.name}
                            </li>
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.assignedHostelIds}
                            helperText={errors.assignedHostelIds?.message}
                          />
                        )}
                      />
                    )}
                  />
                </Stack>

                {roleDetails?.name === "warden" ? (
                  <>
                    <Stack sx={{ width: "100%" }}>
                      <Typography fontSize={"14px"} gutterBottom>
                        Select Hostel
                      </Typography>
                      {userId && staffById?.stayInHostel === true ? (
                        <Controller
                          name="hostelId"
                          control={control}
                          render={() => (
                            <TextField
                              value={
                                staffById?.hostelAllocationDetails?.hostelId
                                  ?.name
                              }
                              error={!!errors.name}
                              disabled={staffById?.stayInHostel}
                              helperText={errors.name?.message}
                            />
                          )}
                        />
                      ) : (
                        <Controller
                          name="hostelId"
                          control={control}
                          disabled={staffById?.stayInHostel}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              options={allHostel}
                              getOptionLabel={(option) => option?.name}
                              isOptionEqualToValue={(option, value) =>
                                option?._id === value?._id
                              }
                              onChange={(_, data) => {
                                field.onChange(data);
                                setValue("bedType", null);
                                setValue("bedNumber", "");
                                dispatch(clearRoomDetails());
                                setRoom("");
                                setIsVacant(false);
                                setVacantRoom("0/0");
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.hostelId}
                                  helperText={errors.hostelId?.message}
                                />
                              )}
                            />
                          )}
                        />
                      )}
                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                      <Typography fontSize={"14px"} gutterBottom>
                        Select Bed Type
                      </Typography>
                      {userId && staffById?.stayInHostel === true ? (
                        <Controller
                          name="bedType"
                          control={control}
                          render={() => (
                            <TextField
                              value={
                                staffById?.hostelAllocationDetails?.bedType
                              }
                              error={!!errors.name}
                              disabled={staffById?.stayInHostel}
                              helperText={errors.name?.message}
                            />
                          )}
                        />
                      ) : (
                        <Controller
                          name="bedType"
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              options={bedType ?? []}
                              getOptionLabel={(option) => option.bedType}
                              isOptionEqualToValue={(option, value) =>
                                option._id === value?._id
                              }
                              onChange={(_, data) => {
                                field.onChange(data);
                                setValue("bedNumber", "");
                                setRoom("");
                                setIsVacant(false);
                                setVacantRoom("0/0");
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={!!errors.bedType}
                                  helperText={errors.bedType?.message}
                                />
                              )}
                            />
                          )}
                        />
                      )}
                    </Stack>
                  </>
                ) : null}
              </Stack>
            </Box>

            {roleDetails?.name === "warden" && (
              <>
                {loading ? (
                  <Box padding={2} display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                ) : roomNo?.length > 0 ? (
                  <Stack>
                    <Typography fontSize={"14px"} gutterBottom>
                      Select Room No.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        textAlign: "justify",
                      }}
                    >
                      {/* {roomNo?.map((number, index) => (
                        <Button
                          key={index}
                          variant="contained"
                          onClick={() => handleButtonClick(number)}
                          sx={{
                            p: 1,
                            m: 1,
                            borderRadius: "50px",
                            bgcolor:
                              room === number?.roomNumber
                                ? "#674D9F"
                                : "#ECE0FF",
                            color:
                              room === number?.roomNumber ? "#fff" : "#000",
                          }}
                        >
                          {number?.roomNumber}
                        </Button>
                      ))} */}
                      {!staffById?.stayInHostel ? (
                        <>
                          {roomNo?.map((number, index) => (
                            <Button
                              key={index}
                              variant="contained"
                              onClick={() => handleButtonClick(number)}
                              sx={{
                                p: 1,
                                m: 1,
                                borderRadius: "50px",
                                bgcolor:
                                  room === number?.roomNumber
                                    ? "#674D9F"
                                    : "#ECE0FF",
                                color:
                                  room === number?.roomNumber ? "#fff" : "#000",
                              }}
                            >
                              {number?.roomNumber}
                            </Button>
                          ))}
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            p: 1,
                            m: 1,
                            borderRadius: "50px",
                            bgcolor: currentStaff?.hostelAllocationDetails
                              ?.roomNumber
                              ? "#674D9F"
                              : "#ECE0FF",
                            color: currentStaff?.hostelAllocationDetails
                              ?.roomNumber
                              ? "#fff"
                              : "#000",
                          }}
                        >
                          {currentStaff?.hostelAllocationDetails?.roomNumber}
                        </Button>
                      )}
                    </Box>
                  </Stack>
                ) : null}
                <Stack spacing={2} mt={3}>
                  <Typography
                    fontSize={"14px"}
                    sx={{
                      display: staffById?.stayInHostel === true ? "none" : "",
                    }}
                  >
                    Vacant:{" "}
                    <Chip
                      label={vacantRoom}
                      size="medium"
                      sx={{
                        // backgroundColor: `${vacantCountValue != 0 ? theme.palette.primary.main + '2A' : theme.palette.error.main + '2A'}`,
                        // color: `${vacantCountValue != 0 ? theme.palette.primary.main : theme.palette.error.main}`,
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}
                    />{" "}
                    (Free/Total)
                  </Typography>
                  {(!getBedType?.bedType && !isVacant) ||
                    (userId && staffById?.stayInHostel ? (
                      <Controller
                        name="bedNumber"
                        control={control}
                        render={() => (
                          <TextField
                            value={
                              staffById?.hostelAllocationDetails?.bedNumber
                            }
                            error={!!errors.name}
                            disabled={staffById?.stayInHostel}
                            helperText={errors.name?.message}
                          />
                        )}
                      />
                    ) : (
                      <Stack
                        gap={3}
                        direction={{ xs: "column", sm: "row" }}
                        sx={{ py: 3 }}
                      >
                        <Stack sx={{ width: "100%" }}>
                          <Typography fontSize={"14px"} gutterBottom>
                            Select Bed Number
                          </Typography>
                          <Controller
                            name="bedNumber"
                            control={control}
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                options={bedNumber ?? []}
                                getOptionLabel={(option) => option}
                                isOptionEqualToValue={(option, value) =>
                                  option === value
                                }
                                onChange={(_, data) => field.onChange(data)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={!!errors.bedNumber}
                                    helperText={errors.bedNumber?.message}
                                  />
                                )}
                              />
                            )}
                          />
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </>
            )}
            <VehicleAdd
              onVehiclesChange={handleVehiclesChange}
              currentData={userId ? currentStaff : []}
            />

            <KYCUpload
              onDocumentsChange={handleDocumentsChange}
              currentData={userId ? currentStaff : {}}
              userId={userId}
            />

            <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 2 }}>
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                size="medium"
                disabled={!imageData}
                sx={{ borderRadius: "50px" }}
                type="submit"
              >
                {userId ? "Update" : "Create"}
              </LoadingButton>
            </Box>
          </form>
        </>
      )}
    </>
  );
}
