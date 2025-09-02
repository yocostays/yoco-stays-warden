/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Box,
  Button,
  capitalize,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createResidentAsync,
  getBedTypeAsync,
  getRoomNoAsync,
} from "../../../../../features/hostel/hostelApi";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { clearRoomDetails } from "../../../../../features/hostel/hostelSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FileUpload from "./FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { sampleFileDownloadAsync } from "../../../../../features/users/userApi";
import { getVacantRoomDetails } from "../../../../../features/users/userSlice";

const bloodGroups = [
  { value: "", label: "Select Blood Group" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

// Yup validation schema
const schema = yup.object().shape({
  studentName: yup.string().required("Student Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .length(10, "Must be exactly 10 digit"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  enrollmentNumber: yup.string().required("Enrollment Number is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  fathersName: yup.string().required("Father's Name is required"),
  fatherEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  fathersNo: yup
    .string()
    .required("Father's Number is required")
    .length(10, "Must be exactly 10 digit"),
  mothersName: yup.string().required("Mother's Name is required"),
  motherEmail: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  mothersNo: yup
    .string()
    .required("Mother's Number is required")
    .length(10, "Must be exactly 10 digit"),
  idNumber: yup.string().required("Aadhar / Passport No. is required"),
  bloodGroup: yup.string().required("Blood Group is required"),
  courseName: yup.string().required("Course Name is required"),
  academicYear: yup
    .string()
    .required("Academic Year is required")
    .length(4, "Must be exactly 4 digit"),
  semester: yup.string().required("Semester is required"),
  guardianContact: yup.string().required("Guardian Contact No. is required"),
  category: yup.string().required("Category is required"),
  permanentAddress: yup.string().required("Permanent Address is required"),
  hostel: yup.object().required("Hostel selection is required"),
  bedType: yup.object().required("Bed Type selection is required"),
  divyang: yup.string().required("Divyang is required"),
  billingCycle: yup.string().required("Billing Cycle is required"),
  bedNo: yup.string().required("Bed Number is required"),
  gender: yup.string().required("Gender is required"),
});

export default function ResidentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loader, setLoader] = useState(false);

  const { bedType, roomNo, loading } = useSelector((state) => state?.hostel);

  const { hostelList } = useSelector((state) => state?.users);
  const [bedNo, setBedNo] = useState([]);
  const [room, setRoom] = useState();
  const [open, setOpen] = useState(false);
  const [vacantRoom, setVacantRoom] = useState("0/0");
  const [isVacant, setIsVacant] = useState(false);

  const defaultValues = useMemo(
    () => ({
      hostel: null,
      bedType: null,
      bedNo: "",
    }),
    []
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const hostelId = watch("hostel")?._id;
  const getBedType = watch("bedType");

  const handleDownloadSampleFile = async () => {
    setLoader(true);
    try {
      const res = await dispatch(sampleFileDownloadAsync({ type: "user" }));
      setLoader(false);
      if (res?.payload?.statusCode === 200) {
        // Create a link element
        const link = document.createElement("a");
        link.href = res.payload.data; // URL to the file
        link.setAttribute("download", "sampleFile");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        toast.success(res.payload.message);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error("Failed to download the file.");
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const payload = {
      gender: data?.gender,
      bedNumber: data?.bedNo,
      billingCycle: data?.billingCycle,
      divyang: data?.divyang === "true" ? true : false,
      bedType: data?.bedType?.bedType,
      hostelId: data?.hostel?._id,
      address: data?.permanentAddress,
      category: data?.category,
      guardianContactNo: Number(data?.guardianContact),
      semester: Number(data?.semester),
      academicYear: Number(data?.academicYear),
      courseName: data?.courseName,
      bloodGroup: data?.bloodGroup,
      adharNumber: Number(data?.idNumber),
      motherNumber: Number(data?.mothersNo),
      motherName: data?.mothersName,
      motherEmail: data?.mothersEmail,
      fatherNumber: Number(data?.fathersNo),
      fatherName: data?.fathersName,
      fatherEmail: data?.fatherEmail,
      dob: dayjs(data?.dateOfBirth).add(5, "hours").add(30, "minutes"),
      enrollmentNumber: Number(data?.enrollmentNumber),
      email: data?.email,
      phone: Number(data?.phoneNumber),
      name: data?.studentName,
      roomNumber: room,
    };

    dispatch(createResidentAsync(payload))
      .then((res) => {
        setIsSubmitting(false);
        if (res?.payload?.statusCode === 200) {
          toast.success(res?.payload?.message);
          navigate("/user-management");
        } else {
          toast.error(res?.payload?.message);
        }
      })
      .catch(() => setIsSubmitting(false));
  };
  const handleButtonClick = (number) => {
    setRoom(number?.roomNumber);
    setBedNo(number?.bedNumber);
    setValue("bedNo", "");
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
    if (room) {
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
            toast.error("Selected room is not vacant !", { variant: "error" });
          }
        }
      });
    }
  }, [room]);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 2 }}>
        <LoadingButton
          loading={loader}
          size="small"
          startIcon={<DownloadIcon />}
          sx={{ borderRadius: "50px" }}
          variant="outlined"
          onClick={handleDownloadSampleFile}
        >
          Sample File
        </LoadingButton>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
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
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Student Name{" "}
              </Typography>
              <Controller
                name="studentName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.studentName}
                    helperText={errors.studentName?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                Phone Number{" "}
              </Typography>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    size="small"
                    type="text" // Change to text to remove arrows
                    error={!!error}
                    fullWidth
                    helperText={error?.message}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\D/g, "");
                      if (inputValue.length <= 10) {
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
                Enrollment No. / Reg. No.{" "}
              </Typography>
              <Controller
                name="enrollmentNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.enrollmentNumber}
                    helperText={errors.enrollmentNumber?.message}
                    inputProps={{
                      maxLength: 30,
                    }}
                    onChange={(e) => {
                      // const inputValue = e.target.value.replace(/\D/g, "");

                      field.onChange(e.target.value);
                    }}
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
                  name="dateOfBirth"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        maxDate={dayjs()}
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
                name="fathersName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.fathersName}
                    helperText={errors.fathersName?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Father&apos;s Number{" "}
              </Typography>
              <Controller
                name="fathersNo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.fathersNo}
                    helperText={errors.fathersNo?.message}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\D/g, "");
                      if (inputValue.length <= 10) {
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
                Father&apos;s E mail{" "}
              </Typography>
              <Controller
                name="fatherEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    type="email"
                    error={!!errors.fatherEmail}
                    helperText={errors.fatherEmail?.message}
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
                name="mothersName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.mothersName}
                    helperText={errors.mothersName?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Mother&apos;s Number{" "}
              </Typography>
              <Controller
                name="mothersNo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.mothersNo}
                    helperText={errors.mothersNo?.message}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\D/g, "");
                      if (inputValue.length <= 10) {
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
                Mother&apos;s E mail{" "}
              </Typography>
              <Controller
                name="motherEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    type="email"
                    error={!!errors.motherEmail}
                    helperText={errors.motherEmail?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Aadhar No.{" "}
              </Typography>
              <Controller
                name="idNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.idNumber}
                    helperText={errors.idNumber?.message}
                  />
                )}
              />
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
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Course Name{" "}
              </Typography>
              <Controller
                name="courseName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.courseName}
                    helperText={errors.courseName?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Academic Year{" "}
              </Typography>
              <Controller
                name="academicYear"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.academicYear}
                    helperText={errors.academicYear?.message}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\D/g, "");
                      if (inputValue.length <= 4) {
                        field.onChange(inputValue);
                      } else {
                        field.onChange(inputValue.slice(0, 4));
                      }
                    }}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Semester{" "}
              </Typography>
              <Controller
                name="semester"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.semester}
                    helperText={errors.semester?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Guardian Contact No.{" "}
              </Typography>
              <Controller
                name="guardianContact"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.guardianContact}
                    helperText={errors.guardianContact?.message}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/\D/g, "");
                      if (inputValue.length <= 10) {
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
                {" "}
                Category{" "}
              </Typography>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                {" "}
                Permanent Address{" "}
              </Typography>
              <Controller
                name="permanentAddress"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.permanentAddress}
                    helperText={errors.permanentAddress?.message}
                  />
                )}
              />
            </Stack>

            <Controller
              name="gender"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error}>
                  <FormLabel sx={{fontSize: 14}} id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    {...field} // Spread field props for proper form handling
                    value={field.value} // Bind value to field value
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio sx={{ transform: "scale(0.9)" }} />}
                      label={
                        <Typography fontSize={14}>
                          Female
                        </Typography>                          
                      }
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio sx={{ transform: "scale(0.9)" }} />}
                      label={
                        <Typography fontSize={14}>
                          Male
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio sx={{ transform: "scale(0.9)" }} />}
                      label={
                        <Typography fontSize={14}>
                          Other
                        </Typography>
                      }
                    />
                  </RadioGroup>
                  {/* Display error message */}
                  {error && (
                    <Typography
                      fontSize={"12px"}
                      color="error"
                      sx={{ fontSize: "12px", ml: 2 }}
                    >
                      {error.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="divyang"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error}>
                  <FormLabel sx={{fontSize: 14}} id="divyang">Divyang</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="divyang"
                    {...field}
                    value={field.value}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio sx={{ transform: "scale(0.9)" }} />}
                      label={
                        <Typography fontSize={14}>
                          Yes
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio sx={{ transform: "scale(0.9)" }} />}
                      label={
                        <Typography fontSize={14}>
                          No
                        </Typography>
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

            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                Select Hostel
              </Typography>
              <Controller
                name="hostel"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    size="small"
                    options={hostelList}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value?._id
                    }
                    onChange={(_, data) => {
                      field.onChange(data);
                      setValue("bedType", null);
                      setValue("bedNo", "");
                      dispatch(clearRoomDetails());
                      setRoom("");
                      setIsVacant(false);
                      setVacantRoom("0/0");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.hostel}
                        helperText={errors.hostel?.message}
                      />
                    )}
                  />
                )}
              />
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Typography fontSize={"14px"} gutterBottom>
                Select Bed Type
              </Typography>
              <Controller
                name="bedType"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    size="small"
                    options={bedType ?? []}
                    getOptionLabel={(option) => option.bedType}
                    isOptionEqualToValue={(option, value) =>
                      option._id === value?._id
                    }
                    onChange={(_, data) => {
                      field.onChange(data);
                      setValue("bedNo", "");
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
            </Stack>
          </Stack>
        </Box>

        {loading ? (
          <Box padding={2} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : roomNo?.length ? (
          <Stack>
            <Typography fontSize={"14px"} gutterBottom>
              Select Room No.
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", textAlign: "justify" }}
            >
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
                      room === number?.roomNumber ? "#674D9F" : "#ECE0FF",
                    color: room === number?.roomNumber ? "#fff" : "#000",
                  }}
                >
                  {number?.roomNumber}
                </Button>
              ))}
            </Box>
          </Stack>
        ) : null}
        <Stack spacing={2} mt={3}>
          <Typography fontSize={"14px"}>
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
          {getBedType?.bedType && isVacant && (
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
                  name="bedNo"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      options={bedNo ?? []}
                      getOptionLabel={(option) => option}
                      isOptionEqualToValue={(option, value) => option === value}
                      onChange={(_, data) => field.onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.bedNo}
                          helperText={errors.bedNo?.message}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              <Stack sx={{ width: "100%" }}>
                <Typography fontSize={"14px"} gutterBottom>
                  Billing Cycle
                </Typography>
                <Controller
                  name="billingCycle"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      size="small"
                      options={cycle}
                      getOptionLabel={(option) => capitalize(option)}
                      isOptionEqualToValue={(option, value) => option === value}
                      onChange={(_, data) => field.onChange(data)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.billingCycle}
                          helperText={errors.billingCycle?.message}
                        />
                      )}
                    />
                  )}
                />
              </Stack>
            </Stack>
          )}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 2 }}>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            size="medium"
            sx={{ borderRadius: "50px" }}
            type="submit"
          >
            Create
          </LoadingButton>
        </Box>
      </form>
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

const cycle = ["quarterly", "monthly", "semi-annual", "annual"];
