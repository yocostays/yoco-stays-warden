import React, { useState } from "react";
import DialogBox from "@components/dialogBox/custom-dialog";
import { RHFTextField } from "@components/hook-form";
import RHFCodes from "@components/hook-form/RHFCodes";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Grid, Stack, FormHelperText, Slide, Button } from "@mui/material";
import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { generateOtp, verifyOtp } from "@features/auth/authSlice";
import { toast } from "react-toastify";
import FormLabel from "@utils/FormLabel";

FamilyDetailsForm.propTypes = {
  methods: PropTypes.object.isRequired,
  verified: PropTypes.bool,
  setIsFathersNoVerified: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  isFathersNoVerified: PropTypes.bool,
  id: PropTypes.string,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FamilyDetailsForm({ methods, verified, setIsFathersNoVerified, open, setOpen, isFathersNoVerified, id }) {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = methods;

  const dispatch = useDispatch();
  const mobile = watch('phoneNumber');
  const [phone, setPhone] = useState(mobile || "")
  const { isSubmitting, isVerifying } = useSelector((state) => state?.auth);
  const inputs = ['fNumberOtp1', 'fNumberOtp2', 'fNumberOtp3', 'fNumberOtp4'];
  const [values, setValues] = useState(inputs.reduce((acc, input) => {
    acc[input] = ''; // Initialize each input's value to an empty string
    return acc;
  }, {}));

  const handleResendOtp = () => {
    if (!isFathersNoVerified) {
      dispatch(generateOtp({ phone })).then((response) => {
        if (response?.payload?.statusCode === 200) {
          toast.success(response?.payload?.message || "OTP Sent!");
          toast.success(response?.payload?.data);
        }
      })
    }
  };

  const handleOtpSubmit = () => {
    const otp = `${values.fNumberOtp1}${values.fNumberOtp2}${values.fNumberOtp3}${values.fNumberOtp4}`;
    const payload = { phone, otp: Number(otp) };
    dispatch(verifyOtp(payload)).then((response) => {
      if (response?.payload?.statusCode === 200) {
        toast.success(response?.payload?.message, {
          position: 'top-right',
        });
        setOpen(false);
        setIsFathersNoVerified(true)
        setValues(inputs.reduce((acc, input) => {
          acc[input] = ''; // Initialize each input's value to an empty string
          return acc;
        }, {}));
      }
      // setIsOtp(false);
    });
  };

  const handleVerifyClick = () => {
    if (!isFathersNoVerified) {
      dispatch(generateOtp({ phone, })).then((response) => {
        if (response?.payload?.statusCode === 200) {
          console.log(response, 'response');
          toast.success(response?.payload?.message || "OTP Sent!");
          toast.success(response?.payload?.data);
          setOpen(true)
        }
      })
    }
  }

  const handleClose = () => {
    setOpen(false);
    setValues(inputs.reduce((acc, input) => {
      acc[input] = ''; // Initialize each input's value to an empty string
      return acc;
    }, {}));
    reset();
  };

  return (
    <><Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        px: { sm: "35px", sx: "10px" },
        padding: "10px",
        mb: "150px",
        bgcolor: "#674D9F0D",
        py: "30px",
        paddingLeft: "16px",
        paddingRight: "16px",
        borderRadius: "20px",
      }}
    >
      {/* Header Section */}
      <Typography variant="h5" fontWeight="bold" color="#5E2E8C" mb={3}>
        Family Details
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit()}>
          <Grid container spacing={3} alignItems="center">
            {/* Father Name Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Father Name" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="fatherName"
                disabled={!id && !verified} />
            </Grid>

            {/* Father Mobile No. Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Father Mobile No." required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="fatherphoneNumber"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  setValue("fatherphoneNumber", value.slice(0, 10)); // Restrict to 10 digits
                  setPhone(value.slice(0, 10));
                  setIsFathersNoVerified(false)
                }}
                disabled={!id && !verified} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <LoadingButton variant="contained"
                sx={{ borderRadius: "50px" }} onClick={handleVerifyClick} loading={isSubmitting} disabled={!phone} endIcon={(id ? id && isFathersNoVerified : isFathersNoVerified) ? <Icon icon="hugeicons:tick-01" /> : <Icon icon="bitcoin-icons:cross-filled" />}>
                {(id ? id && isFathersNoVerified : isFathersNoVerified) ? 'Verified' : 'Send OTP'}
              </LoadingButton>
            </Grid>
            {!isFathersNoVerified && !id && (
              <Grid item xs={12} display='flex' justifyContent='center'>
                <Typography fontSize={14} color="red">Please fill above details to proceed</Typography>
              </Grid>
            )}

            {/* Father Email ID Section */}
            <Grid item xs={12} sm={3}>
                <FormLabel label="Father's Email ID" required/>
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="abc@gmail.com"
                size="small"
                name="fatherEmail"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Father Occupation Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Father Occupation" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="fatherOccupation"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Mother Name Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Mother Name" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="motherName"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Mother Mobile No. Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Mother Mobile No." required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="+91"
                size="small"
                name="motherphoneNumber"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  setValue("motherphoneNumber", value.slice(0, 10)); // Restrict to 10 digits
                }}
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Mother Email ID Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Mother Email ID" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="abc@gmail.com"
                size="small"
                name="motherEmail"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Guardian Name Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Guardian Name" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="guardianName"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Relationship Section */}
            <Grid item xs={12} sm={3}>
                <FormLabel label="Relationship" required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="relationship"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            <Grid item xs={12} sm={2}>
                <FormLabel label="Occupation" required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <RHFTextField
                placeholder="Type Here"
                size="small"
                name="occupation"
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Guardian Mobile No. Section */}
            <Grid item xs={12} sm={3}>
                <FormLabel label="Guardian Mobile No." required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="+91"
                size="small"
                name="guardianMobileNumber"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  setValue("guardianMobileNumber", value.slice(0, 10)); // Restrict to 10 digits
                }}
                disabled={!id && !isFathersNoVerified} />
            </Grid>

            {/* Email ID Section */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Email ID" required />

            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                placeholder="abc@gmail.com"
                size="small"
                name="emailId"
                disabled={!id && !isFathersNoVerified} />
            </Grid>
            <Grid item xs={12} sm={3}>
                            <FormLabel label="Address" required />

            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFTextField
                fullWidth
                placeholder="Type Here"
                size="small"
                name="familyAddress"
                disabled={!id && !isFathersNoVerified} />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
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
                  keyName="fNumberOtp"
                  inputs={inputs}
                  values={values}
                  setValues={setValues} />
                {(!!errors.code1 ||
                  !!errors.code2 ||
                  !!errors.code3 ||
                  !!errors.code4) && (
                    <FormHelperText error sx={{ px: 2, ml: 6 }}>
                      Code is required
                    </FormHelperText>
                  )}
              </Stack>
              <Stack sx={{ alignItems: 'center' }}>
                <Typography variant="body1" sx={{ alignItems: 'center', m2: 3 }}>
                  OTP not received? <Button onClick={handleResendOtp}>Resend OTP</Button>
                </Typography>

                <LoadingButton
                  variant="contained"
                  sx={{ mb: '5px', borderRadius: "50px" }}
                  loading={isVerifying}
                  onClick={handleOtpSubmit}
                >
                  Verify Otp
                </LoadingButton>
              </Stack>
            </Stack>
         
      </DialogBox>
    </>
  );
}
