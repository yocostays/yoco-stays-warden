import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  // TextField,
  Grid,
  // RadioGroup,
  // FormControlLabel,
  Radio,
  Avatar,
  Stack,
  FormHelperText,
  Button,
  Slide,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";
import {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFTextField,
} from "@components/hook-form";
import {
  bloodGroupOptions,
  categoryOptions,
} from "../../../components/enums/studenEnums";
import RHFDatePicker from "@components/hook-form/RHFDatePicker";
import axios from "axios";
import DialogBox from "@components/dialogBox/custom-dialog";
import RHFCodes from "@components/hook-form/RHFCodes";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { generateOtp, verifyOtp } from "@features/auth/authSlice";
import dayjs from "dayjs";
import FormLabel from "@utils/FormLabel";

CreateStudentForm.propTypes = {
  methods: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  verified: PropTypes.bool,
  setVerified: PropTypes.func,
  setImage: PropTypes.func,
  id: PropTypes.string,
  country: PropTypes.object,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
  selectedCountry: PropTypes.object,
  selectedState: PropTypes.object,
  selectedCity: PropTypes.object,
  setSelectedCountry: PropTypes.func,
  setSelectedState: PropTypes.func,
  setSelectedCity: PropTypes.func,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateStudentForm({
  methods,
  open,
  setOpen,
  verified,
  setVerified,
  setImage,
  id,
  isLoading,
  image,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
}) {
  const dispatch = useDispatch();

  const [allCountryData, setAllCountryData] = useState([]);
  const [allStateData, setAllStateData] = useState([]);
  const [allCityData, setAllCityData] = useState([]);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = methods;
  const permanentAddress = watch("permanentAddress");
  const [avatarPreview, setAvatarPreview] = useState(
    image || "/path-to-avatar.png"
  );

  const mobile = watch("phoneNumber");
  const [phone, setPhone] = useState(mobile || "");
  const [sameAdd, setSameAdd] = useState(false);
  const inputs = ["code1", "code2", "code3", "code4"];
  const [values, setValues] = useState(
    inputs.reduce((acc, input) => {
      acc[input] = ""; // Initialize each input's value to an empty string
      return acc;
    }, {})
  );

  const { isSubmitting, isVerifying } = useSelector((state) => state?.auth);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result; // Extract Base64 data
        setAvatarPreview(reader.result); // Preview the image
        setValue("avatar", base64String); // Update the form value
        setImage(base64String); // Store the Base64 string in state
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleResendOtp = () => {
    if (!verified) {
      dispatch(generateOtp({ phone })).then((response) => {
        if (response?.payload?.statusCode === 200) {
          toast.success(response?.payload?.message || "OTP Sent!");
          toast.success(response?.payload?.data);
        }
      });
    }
  };

  const handleOtpSubmit = () => {
    const otp = `${values.code1}${values.code2}${values.code3}${values.code4}`;
    const payload = { phone, otp: Number(otp) };
    dispatch(verifyOtp(payload)).then((response) => {
      if (response?.payload?.statusCode === 200) {
        toast.success(response?.payload?.message, {
          position: "top-right",
        });
        setOpen(false);
        setVerified(true);
        setValues(
          inputs.reduce((acc, input) => {
            acc[input] = ""; // Initialize each input's value to an empty string
            return acc;
          }, {})
        );
      }
    });
  };

  const handleVerifyClick = () => {
    if (!verified) {
      dispatch(generateOtp({ phone })).then((response) => {
        if (response?.payload?.statusCode === 200) {
          console.log(response, "response");
          toast.success(response?.payload?.message || "OTP Sent!");
          toast.success(response?.payload?.data);
          setOpen(true);
        }
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setValues(
      inputs.reduce((acc, input) => {
        acc[input] = ""; // Initialize each input's value to an empty string
        return acc;
      }, {})
    );
    reset();
  };

  const handleSameAddress = () => {
    // Toggle the state
    setSameAdd((prev) => {
      const newState = !prev;
      if (newState) {
        // If the radio button is checked, sync the address
        setValue("currentAddress", permanentAddress);
      } else {
        // If the radio button is unchecked, reset the current address
        setValue("currentAddress", "");
      }
      return newState;
    });
  };

  //   Fetch all countries on component mount
  const apiKey = "NnF1NWxKZm03bURIbHJmU3lyYnV3MXJoRk91UEZSb3FUNnRsbWdsQw==";


  //   Fetch all countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const config = {
          method: "get",
          url: "https://api.countrystatecity.in/v1/countries",
          headers: {
            "X-CSCAPI-KEY": apiKey,
          },
        };
        const response = await axios(config);
        setAllCountryData(response?.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  //   Fetch states when a country is selected
  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry?.iso2) {
        try {
          const config = {
            method: "get",
            url: `https://api.countrystatecity.in/v1/countries/${selectedCountry.iso2}/states`,
            headers: {
              "X-CSCAPI-KEY": apiKey,
            },
          };
          const response = await axios(config);
          setAllStateData(response?.data);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      } else {
        setAllStateData([]);
        setSelectedState(null);
        setAllCityData([]);
        setSelectedCity(null);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  //   Fetch cities when a state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState?.iso2) {
        try {
          const config = {
            method: "get",
            url: `https://api.countrystatecity.in/v1/countries/${selectedCountry?.iso2}/states/${selectedState?.iso2}/cities`,
            headers: {
              "X-CSCAPI-KEY": apiKey,
            },
          };
          const response = await axios(config);
          setAllCityData(response?.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setAllCityData([]);
        setSelectedCity(null);
      }
    };

    fetchCities();
  }, [selectedState, selectedCountry]);

  return (
    <>
      {isLoading ? (
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
            px: { sm: "35px", xs: "10px" },
            pb: "30px",
            mb: "150px",
            bgcolor: "#674D9F0D",
            pl: "16px",
            pr: "16px",
            borderRadius: "20px",
          }}
        >
          {/* Header Section */}
          <Box
            display="flex"
            alignItems="center"
            gap="16px"
            mb={3}
            justifyContent="space-between"
            pt={2}
          >
            <Typography variant="h5" fontWeight="bold" color="#5E2E8C">
              {id ? "Edit" : "Create"} Student
            </Typography>
            <Box position="relative">
              <Avatar
                sx={{ width: "80px", height: "80px", cursor: "pointer" }}
                alt="User Avatar"
                src={avatarPreview}
              />
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
                {...register("avatar")}
                onChange={handleAvatarChange}
              />

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

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit()}>
              {/* Form Fields */}
              <Grid container spacing={3} alignItems="center">
                {/* Student Name */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Student Name" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="studentName"
                  />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Phone Number" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    placeholder="+91"
                    size="small"
                    name="phoneNumber"
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                      setValue("phoneNumber", value.slice(0, 10)); // Restrict to 10 digits
                      setPhone(value.slice(0, 10));
                      setVerified(false);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <LoadingButton
                    variant="contained"
                    sx={{ borderRadius: "50px", fontSize: 12 }}
                    onClick={handleVerifyClick}
                    loading={isSubmitting}
                    disabled={!phone}
                    endIcon={
                      (id ? id && verified : verified) ? (
                        <Icon icon="hugeicons:tick-01" />
                      ) : (
                        <Icon icon="bitcoin-icons:cross-filled" />
                      )
                    }
                  >
                    {(id ? id && verified : verified)
                      ? "Verified"
                      : "Send OTP"}
                  </LoadingButton>
                </Grid>
                {!verified && !id && (
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Typography fontSize={14} color="red">
                      Please fill above details to proceed
                    </Typography>
                  </Grid>
                )}

                {/* E-mail ID */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="E-mail ID" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="studentEmail"
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Date of Birth Section */}
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1">Date of Birth</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFDatePicker
                    name="studentDob"
                    control={control}
                    size="small"
                    format="DD/MM/YYYY"
                    maxDate={dayjs()}
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Enrollment Section */}
                <Grid item xs={12} sm={2} textAlign="end">
                  <FormLabel label="Enroll. No." required />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="enrollNo"
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Blood Group */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Blood Group" required />

                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFAutocomplete
                    name="bloodGroup"
                    label="Select Blood Group"
                    size="small"
                    options={bloodGroupOptions}
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Disabilities Section */}
                <Grid item xs={12} sm={1.5} textAlign="end">
                  <Typography variant="body1">Disabilities</Typography>
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <RHFRadioGroup
                    name="disabilities"
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    row
                    spacing={2}
                    disabled={!id && !verified}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormLabel label="Gender" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFRadioGroup
                    name="gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                    row
                    spacing={2}
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Identification Mark Section */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Identification Mark" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="identificationMark"
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Identification Mark Section */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Any Medical Issue" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="medicalIssue"
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Identification Mark Section */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Any Allergy problem" required />

                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="allergyProblem"
                    disabled={!id && !verified}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormLabel label="Nationality" required />

                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFAutocomplete
                    size="small"
                    name="country"
                    label="Select Nationality"
                    value={selectedCountry}
                    options={allCountryData || []}
                    getOptionLabel={(option) => option.name || ""}
                    onChange={(_, newValue) => {
                      setSelectedCountry(newValue);
                      setValue("country", newValue); // Update form value
                      setSelectedState(null);
                      setSelectedCity(null);
                      setAllStateData([]);
                      setAllCityData([]);
                    }}
                    fullWidth
                    disabled={!id && !verified}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant="body1">State</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFAutocomplete
                    size="small"
                    name="state"
                    label="Select State"
                    value={selectedState}
                    options={allStateData || []} // Ensure options is always an array
                    getOptionLabel={(option) => option.name || ""} // Handle cases where option may not have a name
                    onChange={(_, newValue) => {
                      setSelectedState(newValue);
                      setSelectedCity(null);
                      setAllCityData([]);
                    }}
                    fullWidth
                    disabled={!selectedCountry || (!id && !verified)} // Disable if no country selected
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography variant="body1">City</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFAutocomplete
                    size="small"
                    name="city"
                    label="Select City"
                    value={selectedCity}
                    options={allCityData || []} // Ensure options is always an array
                    getOptionLabel={(option) => option.name || ""} // Handle cases where option may not have a name
                    onChange={(_, newValue) => setSelectedCity(newValue)}
                    fullWidth
                    disabled={!selectedState || (!id && !verified)} // Disable if no state selected
                  />
                </Grid>

                {/* Identification Mark Section */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Category" required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFAutocomplete
                    name="category"
                    label="Select Category"
                    size="small"
                    options={categoryOptions}
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Identification Mark Section */}
                <Grid item xs={12} sm={2} textAlign="end">
                  <FormLabel label="Caste" required />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <RHFTextField
                    placeholder="Type Here"
                    size="small"
                    name="caste"
                    disabled={!id && !verified}
                  />
                </Grid>

                {/* Permanent Address Section */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Permanent Address" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    name="permanentAddress"
                    placeholder="Type Here"
                    size="small"
                    disabled={!id && !verified}
                    multiline
                    rows={2}
                  />
                </Grid>

                {/* Current Address Section */}
                <Grid item xs={12} sm={3}>
                  <FormLabel label="Current Address" required />
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFTextField
                    name="currentAddress"
                    placeholder="Type Here"
                    size="small"
                    disabled={!id && !verified}
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={9}
                  sx={{
                    marginLeft: { sm: "25%", xs: "0" },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Radio Icon */}
                  <Radio
                    size="small"
                    sx={{
                      color: "#b0aeae", // default color
                      "&.Mui-checked": {
                        color: "#5E2E8C", // color when selected
                      },
                    }}
                    disabled={!id && !verified}
                    onClick={handleSameAddress}
                    checked={sameAdd}
                  />

                  <Typography variant="body2">
                    Same as Permanent Address
                  </Typography>

                </Grid>
              </Grid>
            </form>
          </FormProvider>
          <DialogBox
            title="OTP Verification"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <Stack spacing={5}>
              <Stack>
                <RHFCodes
                  keyName="code"
                  inputs={inputs}
                  values={values}
                  setValues={setValues}
                />
                {(!!errors.code1 ||
                  !!errors.code2 ||
                  !!errors.code3 ||
                  !!errors.code4) && (
                    <FormHelperText error sx={{ px: 2, ml: 6 }}>
                      Code is required
                    </FormHelperText>
                  )}
              </Stack>
              <Stack sx={{ alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{ alignItems: "center", m2: 3 }}
                >
                  OTP not received?{" "}
                  <Button onClick={handleResendOtp}>Resend OTP</Button>
                </Typography>

                <LoadingButton
                  variant="contained"
                  sx={{ mb: "5px", borderRadius: "50px" }}
                  loading={isVerifying}
                  onClick={handleOtpSubmit}
                >
                  Verify Otp
                </LoadingButton>
              </Stack>
            </Stack>
          </DialogBox>
        </Box>
      )}
    </>
  );
}
