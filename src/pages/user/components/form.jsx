import {
  Box,
  Typography,
  TextField,
  Grid,
  Avatar,
  Checkbox,
  Autocomplete,
  CardContent,
  Card,
  CircularProgress,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from "@components/hook-form";
import FormProvider from "@components/hook-form/FormProvider";
import { bloodGroupOptions } from "@components/enums/studenEnums";
import RHFDatePicker from "@components/hook-form/RHFDatePicker";
import { Controller } from "react-hook-form";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { checkUserNameAsync, clearUserName } from "@features/users/userSlice";
import debounce from "lodash.debounce";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useParams } from "react-router-dom";

CreateStaffForm.propTypes = {
  roleList: PropTypes.array.isRequired,
  methods: PropTypes.object.isRequired,
  hostelList: PropTypes.array.isRequired,
  startTime: PropTypes.object.isRequired,
  setStartTime: PropTypes.func.isRequired,
  endTime: PropTypes.object.isRequired,
  setEndTime: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  staffByIdLoading: PropTypes.bool.isRequired,
  categoryList: PropTypes.array.isRequired,
  currentData: PropTypes.object.isRequired,
  setRoleId: PropTypes.func.isRequired,
};

export default function CreateStaffForm({
  roleList,
  methods,
  hostelList,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  setImage,
  staffByIdLoading,
  categoryList,
  currentData,
  setRoleId
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const staffId = params.id;
  const [avatarPreview, setAvatarPreview] = useState("/path-to-avatar.png"); // Default avatar preview
  const { verifyUserName } = useSelector((state) => state.users);
  const authToken = localStorage.getItem("authToken");

  const {
    setValue,
    control,
    watch,
    formState: { errors },
  } = methods;

  const watchUserName = watch("userName");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setAvatarPreview(reader.result);
        setValue("avatar", base64String);
        setImage(base64String);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("type", "staff");
      formData.append("file", file);
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
          // setAvatarPreview(responseData?.data);
          // setValue("avatar", responseData?.data);
          setImage(responseData?.data);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          // setError("Upload failed. Please try again."); // Handle upload error
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedVerifyUserName = useCallback(
    debounce((value) => {
      if (value) {
        const payload = {
          userName: value,
        };
        dispatch(checkUserNameAsync(payload));
      }
    }, 500), // Adjust the delay in milliseconds as needed
    []
  );

  useEffect(() => {
    dispatch(clearUserName());
  }, [dispatch]);
  const selectedRole = watch("roleId");

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
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            px: { sm: "35px", sx: "10px" },
            pb: "30px",
            mb: "100px",
            bgcolor: "#674D9F0D",
            paddingLeft: "16px",
            paddingRight: "16px",
            borderRadius: "20px",
          }}
        >
          {/* Header Section */}
          <FormProvider methods={methods}>
            <Box
              display="flex"
              alignItems="center"
              gap="16px"
              mb={3}
              justifyContent="space-between"
              paddingTop={2}
            >
              <Typography variant="h5" fontWeight="bold" color="#5E2E8C">
                Create Staff
              </Typography>
              <Box position="relative" textAlign="center">
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    margin: "0 auto",
                  }}
                  alt="User Avatar"
                  src={avatarPreview}
                />
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                  onChange={handleAvatarChange}
                />
                {/* Edit Icon */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: "2px", // Position below the avatar
                    left: "85%",
                    transform: "translateX(-50%)",
                    bgcolor: "#5E2E8C",
                    color: "white",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // Programmatically trigger the file input
                    document.querySelector('input[type="file"]').click();
                  }}
                >
                  <EditIcon sx={{ fontSize: "16px" }} />
                </Box>
              </Box>
            </Box>

            <Grid container spacing={3} alignItems="center">
              {/* Your Role Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Your Role
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFAutocomplete
                  name="roleId"
                  label="Select Role"
                  size="small"
                  options={roleList || []}
                  onChange={(e, value) => {
                    setValue("roleId", value, { shouldValidate: true });
                    setRoleId(value?._id)
                    setValue("category", null); // Reset category when role changes
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">Complain Category</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFAutocomplete
                  name="category"
                  label="Select Category"
                  size="small"
                  options={categoryList || []}
                  onChange={(e, value) => {
                    setValue("category", value, { shouldValidate: true });
                  }}
                  disabled={!selectedRole} // Disable until a role is selected
                />
              </Grid>

              {/* Name Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  placeholder="Type Here"
                  size="small"
                  name="name"
                />
              </Grid>

              {/* User Name Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  User Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  placeholder="Type Here"
                  size="small"
                  name="userName"
                  onChange={(event) => {
                    const value = event.target.value;
                    setValue("userName", value);
                    debouncedVerifyUserName(value || "");
                  }}
                />
                {watchUserName?.length > 0 &&
                  (verifyUserName
                    ? (!staffId ||
                        (staffId &&
                          currentData?.userName !== watchUserName)) && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "red",
                            pl: 1,
                          }}
                        >
                          <CancelRoundedIcon
                            sx={{ fontSize: "20px", pr: 0.5 }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "13px" }}
                          >
                            Username is already taken.
                          </Typography>
                        </Box>
                      )
                    : (!staffId ||
                        (staffId &&
                          currentData?.userName !== watchUserName)) && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "green",
                            pl: 1,
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{ fontSize: "20px", pr: 0.5 }}
                          />
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "13px" }}
                          >
                            Username is available.
                          </Typography>
                        </Box>
                      ))}
              </Grid>

              {/* E-mail ID */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1">E-mail Id</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  disabled={verifyUserName}
                  placeholder="Type Here"
                  size="small"
                  name="email"
                />
              </Grid>

              {/* Phone Number Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  disabled={verifyUserName}
                  placeholder="+91"
                  size="small"
                  name="phone"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    setValue("phone", value.slice(0, 10));
                  }}
                />
              </Grid>

              {/* Date of Birth Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Date of Birth
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFDatePicker
                  disabled={verifyUserName}
                  name="dob"
                  control={control}
                  size="small"
                  format="DD/MM/YYYY"
                  maxDate={dayjs()}
                />
              </Grid>

              {/* Blood Group Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Blood Group
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFAutocomplete
                  disabled={verifyUserName}
                  name="bloodGroup"
                  label="Select Blood Group"
                  size="small"
                  options={bloodGroupOptions}
                />
              </Grid>

              {/* Joining Date Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Joining Date
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFDatePicker
                  disabled={verifyUserName}
                  name="joiningDate"
                  control={control}
                  size="small"
                  format="DD/MM/YYYY"
                  maxDate={dayjs()}
                />
              </Grid>

              {/* Gender Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Gender
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFRadioGroup
                  disabled={verifyUserName}
                  name="gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  row
                  spacing={2}
                />
              </Grid>

              {/* Father Name Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Father Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  disabled={verifyUserName}
                  placeholder="Type Here"
                  size="small"
                  name="fatherName"
                />
              </Grid>

              {/* Mother Name Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Mother Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  disabled={verifyUserName}
                  placeholder="Type Here"
                  size="small"
                  name="motherName"
                />
              </Grid>

              {/* Spouse Name Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Spouse Name
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RHFTextField
                  disabled={verifyUserName}
                  placeholder="Type Here"
                  size="small"
                  name="spouseName"
                />
              </Grid>

              {/* Assign Hostel Section */}
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontSize={"16px"}>
                  Assign Hostel
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Controller
                  name="assignedHostelIds"
                  control={control}
                  defaultValue={[]} // Ensure initial value is an array
                  render={({ field }) => (
                    <Autocomplete
                      disabled={verifyUserName}
                      multiple
                      size="small"
                      id="checkboxes-tags-demo"
                      sx={{ backgroundColor: "white" }}
                      options={hostelList || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option._id === value?._id
                      }
                      value={field.value || []} // Bind value to field.value
                      onChange={(event, newValue) => field.onChange(newValue)} // Update field on change
                      renderOption={(props, option, { selected }) => {
                        const { ...optionProps } = props;
                        return (
                          <li {...optionProps}>
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
                          placeholder="Assign Hostels..."
                          {...params}
                          error={!!errors.assignedHostelIds}
                          helperText={errors.assignedHostelIds?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Shift Time Section */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* Shift Time Section */}
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" fontSize={"16px"}>
                    Shift Time
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TimePicker
                    disabled={verifyUserName}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                        backgroundColor: "white",
                      },
                    }}
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(newValue) =>{ setStartTime(newValue)}}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={1}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography variant="body1" fontSize={"16px"}>
                    to
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TimePicker
                    disabled={verifyUserName}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "40px",
                        backgroundColor: "white",
                      },
                    }}
                    placeholder="End Time"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
          </FormProvider>
        </Box>
      )}
    </>
  );
}
