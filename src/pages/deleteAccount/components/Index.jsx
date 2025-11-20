
import {
    Box,
    Button,
    Typography,
    Paper,
    Link,
    Divider,
    FormHelperText,
    List,
    ListItem,
    Grid,
} from "@mui/material";
import Logo from '../../../assets/images/Logo.svg'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Input from "@components/customComponents/InputFields";
import DeleteAccounthooks from "./useSynchooks.jsx/DeleteAccounthooks";
import { MuiOtpInput } from 'mui-one-time-password-input'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DeleteuserAccount() {


    const validationSchema = yup.object().shape({
        email: yup.string().email().required("Email is required")
    })


    const {
        handleSubmit,
        formState: { errors },
        setValue,
        register,
        watch,
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onTouched",           // Show error only after touching & leaving field
        reValidateMode: "onChange",
        defaultValues: {
            email: ""
        }
    });

    const { control, reset: otpReset, handleSubmit: otphandleSubmit } = useForm({
        defaultValues: {
            otp: ""
        }
    });

    //custom hooks
    const { onSubmit, open, loader, user, onSubmitOtp, setOpen, ...rest } = DeleteAccounthooks({
        email: watch('email'), reset, otpReset
    })
    const minutes = Math.floor(rest?.timer / 60);
    const seconds = rest?.timer % 60;
    return (
        <>
            <Box
                sx={{
                    height: { sm: "100vh", xs: "100%" },
                    width: "100%",
                    position: "relative",
                }}
            >
                <Box>
                    <Box
                        sx={{
                            height: "15vh",
                            background: "#674d9f",
                            display: "flex",
                            position: "sticky",
                            top: "0",
                            zIndex: "10",
                        }}
                    >
                        <Box
                            sx={{
                                background: "white",
                                width: "18vw",
                                textAlign: "center"
                            }}
                        >
                            <img src={Logo} width={"80"} height={"80"} alt="Yoco Stays" className="logo-image" />
                        </Box>
                    </Box>
                    {/* Main content */}
                    <Box sx={{ display: { xs: "block", sm: "flex" }, height: { sm: "75vh", xs: "100%" }, }}>
                        <Box sx={{
                            width: { sm: "60vw", xs: "100vw" },
                            overflow: "auto",
                            border: "1px solid #dfdbe8",
                            borderRadius: "13px",
                        }}>
                            <Box sx={{ p: 3 }}>
                                {/* Title */}
                                <Typography fontSize={"18px"} fontWeight={600} gutterBottom>
                                    Request Account Deletion
                                </Typography>

                                {/* Description */}
                                <Typography variant="body1" fontSize={"14px"} color="text.secondary" mb={3}>
                                    Your privacy and control over your data are important to us.
                                    <br />
                                    This page allows you to submit an official request to delete your Yoco
                                    Stays account.
                                </Typography>

                                {/* How Process Works */}
                                <Typography variant="subtitle1" fontSize={"16px"} fontWeight={600} gutterBottom>
                                    How the Deletion Request Process Works
                                </Typography>

                                <Typography variant="body1" fontSize={"14px"} color="text.secondary" mb={2}>
                                    Account deletion is not instant. To protect your data and prevent
                                    unauthorized requests, we follow a secure verification process.
                                    <br />
                                    Please follow the <strong>STEPS</strong> carefully to ensure smooth
                                    processing of your request.
                                </Typography>

                                {/* Steps Box */}
                                <Box
                                    sx={{
                                        backgroundColor: "#d1cae2",
                                        p: 0.5,
                                        borderRadius: 2,
                                        mb: 3,
                                    }}
                                >
                                    <List sx={{ listStyleType: "disc", pl: 3, fontSize: "14px" }}>
                                        <ListItem sx={{ display: "list-item" }}>
                                            Enter your registered email ID to begin the deletion request.
                                        </ListItem>

                                        <ListItem sx={{ display: "list-item" }}>
                                            Enter the OTP sent to your email to verify your identity.
                                        </ListItem>

                                        <ListItem sx={{ display: "list-item" }}>
                                            Once the OTP is verified, your Yoco ID and Name will appear
                                            automatically.
                                        </ListItem>

                                        <ListItem sx={{ display: "list-item" }}>
                                            Submit the request, and our team will process your account deletion
                                            within 7 to 10 working days.
                                        </ListItem>
                                    </List>
                                </Box>

                                {/* What Happens After */}
                                <Typography variant="subtitle1" fontSize={"16px"} fontWeight={600} gutterBottom>
                                    What Happens After Your Account Is Deleted
                                </Typography>

                                <List sx={{ listStyleType: "disc", pl: 3, fontSize: "14px" }}>
                                    <ListItem sx={{ display: "list-item" }}>
                                        You will permanently lose access to all services on the YOCO Stays app.
                                    </ListItem>

                                    <ListItem sx={{ display: "list-item" }}>
                                        All personal details linked to your account (name, email, phone number,
                                        ID proofs, profile information, and communication history) will be
                                        removed from our active systems.
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        Your account cannot be restored once deletion is completed.
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        In accordance with Indian laws, IT regulations, tax requirements, and Google Play policies, certain data may continue to be stored even after your account is deleted.This includes:
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        Financial and transaction records (for audit, taxation, and regulatory compliance)
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        Security logs retained for a limited period
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        Information related to fraud prevention or misuse
                                    </ListItem>
                                    <ListItem sx={{ display: "list-item" }}>
                                        Anonymised historical data, which no longer identifies you personally   All retained data is handled strictly as per our Privacy Policy and used only   for lawful and legitimate business purposes.
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                        <Box sx={{
                            bordeer: "1px",
                            height: "75vh",
                            width: { sm: "40vw", xs: "100vw" },
                        }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: "12px",
                                    border: "1px solid #E1D9F7",
                                    p: 4,
                                    width: "100%",
                                    height: "75vh"
                                }}
                            >
                                {/* Email */}
                                {
                                    !open && (
                                        <>
                                            <Typography mb={1} fontSize={"16px"} fontWeight={500}>
                                                Registered Email ID
                                            </Typography>

                                            <Box sx={{
                                                mb: 2
                                            }}>
                                                <Input
                                                    error={errors?.email?.message}
                                                    value={watch('email')}
                                                    placeholder="Email" register={register}
                                                    name="email"
                                                    disable={loader}
                                                    onChange={(e) => {
                                                        let value
                                                        value = e?.target?.value.replace(/^\s+/, "");
                                                        setValue('email', value, { shouldValidate: true })
                                                    }
                                                    }
                                                />
                                                <Box textAlign="center" mt={2}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: 164,
                                                            height: 43,
                                                            borderRadius: "25px",
                                                            backgroundColor: "#674d9f",
                                                            color: "#FFFF",
                                                            textTransform: "none",
                                                            fontSize: "16px",
                                                            "&:disabled": {
                                                                backgroundColor: "#E0E0E0",
                                                                color: "#A9A9A9",
                                                            },
                                                        }}
                                                        disabled={loader}
                                                        onClick={handleSubmit(onSubmit)}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Box>
                                            </Box>

                                        </>
                                    )
                                }

                                {
                                    open && <>
                                        {/* OTP */}
                                        {
                                            !rest?.requestSent && (
                                                <>
                                                    <Typography mb={2} fontWeight={500}>
                                                        Enter OTP ({watch('email')})
                                                    </Typography>

                                                    <Grid container spacing={1} mb={2}>
                                                        <>
                                                            <Controller
                                                                name="otp"
                                                                control={control}
                                                                rules={{
                                                                    required: "OTP is required",
                                                                    pattern: {
                                                                        value: /^[0-9]{6}$/,
                                                                        message: "OTP must be a 6-digit number",
                                                                    },
                                                                }}
                                                                render={({ field, fieldState }) => (
                                                                    <Box>
                                                                        <MuiOtpInput
                                                                            {...field}
                                                                            length={6}
                                                                            // disabled={loader || rest?.otpVerified}
                                                                            TextFieldsProps={{
                                                                                disabled: loader || rest?.otpVerified,        // <-- MUST BE HERE
                                                                            }}
                                                                            sx={{ gap: 1 }}
                                                                            onChange={(val) => {
                                                                                // Only digits allowed
                                                                                const clean = val.replace(/\D/g, "");
                                                                                field.onChange(clean);

                                                                                // Auto-submit when 6 digits
                                                                                if (clean.length === 6) {
                                                                                    otphandleSubmit(onSubmitOtp)()
                                                                                    // handleSubmit(onSubmitOtp)();

                                                                                }
                                                                            }}
                                                                        />

                                                                        {fieldState.error && (
                                                                            <FormHelperText error>{fieldState.error.message}</FormHelperText>
                                                                        )}
                                                                    </Box>
                                                                )}
                                                            />

                                                        </>
                                                    </Grid>

                                                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                                                        <Box sx={{ display: "flex", gap: 2 }}>
                                                            <Box sx={{ display: "flex", gap: 2 }}>
                                                                <Button
                                                                    variant="contained"
                                                                    sx={{
                                                                        borderRadius: "20px",
                                                                        backgroundColor: "#674d9f",
                                                                        color: "#FFFF",
                                                                        textTransform: "none",
                                                                        "&:disabled": {
                                                                            backgroundColor: "#D0D0D0",
                                                                            color: "#666",
                                                                        },
                                                                    }}
                                                                    onClick={() => rest?.cancelRequest()}
                                                                >
                                                                    Cancel
                                                                </Button>

                                                                {!rest?.otpVerified && (
                                                                    <Button
                                                                        variant="contained"
                                                                        disabled={rest?.timer !== 0 || loader}
                                                                        sx={{
                                                                            borderRadius: "20px",
                                                                            backgroundColor: "#674d9f",
                                                                            color: "#FFFF",
                                                                            textTransform: "none",
                                                                            "&:disabled": {
                                                                                backgroundColor: "#D0D0D0",
                                                                                color: "#666",
                                                                            },
                                                                        }}
                                                                        onClick={handleSubmit(onSubmit)}

                                                                    >
                                                                        Resend OTP
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                            {!rest?.otpVerified && (
                                                                <Typography marginY={"auto"}>
                                                                    {minutes}:{seconds.toString().padStart(2, "0")}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        {rest?.otpVerified && (
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 1,
                                                                    backgroundColor: "#E8F5E9", // light green
                                                                    color: "#2E7D32", // green text
                                                                    padding: "8px 12px",
                                                                    borderRadius: "8px",
                                                                    // mt: 1
                                                                }}
                                                            >
                                                                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                                                                <Typography fontWeight={500}>OTP Verified</Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </>
                                            )
                                        }

                                        {/* Yoco ID */}
                                        <Typography color="text.secondary" mb={1}>
                                            Yoco ID :  <Box
                                                component="span"
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    display: "inline"
                                                }}
                                            >
                                                {user?.userId}
                                            </Box>
                                        </Typography>

                                        <Typography color="text.secondary" mb={3}>
                                            Name :  <Box
                                                component="span"
                                                sx={{
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    display: "inline"
                                                }}
                                            >
                                                {user?.name}
                                            </Box>
                                        </Typography>
                                        {rest?.requestSent && (
                                            <Box sx={{ textAlign: "center", my: 3, height:"5vh" }}>
                                                <Typography color="text.secondary" mb={3}>
                                                    <Box
                                                        component="span"

                                                        sx={{
                                                            fontSize: "16px",
                                                            fontWeight: 500,
                                                            display: "inline",
                                                            alignItems: "center",
                                                            gap: 1,
                                                            backgroundColor: "#E8F5E9", // light green
                                                            color: "#2E7D32", // green text
                                                            padding: "8px 12px",
                                                            borderRadius: "8px",
                                                        }}
                                                    >
                                                        {rest?.requestMessage}
                                                    </Box>
                                                </Typography>
                                            </Box>

                                        )}

                                        <Box textAlign="center">
                                            <Button
                                                variant="contained"
                                                disabled={loader || !rest?.otpVerified || rest?.requestSent}
                                                onClick={rest?.onSubmitRequest}
                                                sx={{
                                                    width: 220,
                                                    height: 48,
                                                    borderRadius: "25px",
                                                    backgroundColor: "#674d9f",
                                                    color: "#FFFF",
                                                    textTransform: "none",
                                                    fontSize: "16px",
                                                    "&:disabled": {
                                                        backgroundColor: "#E0E0E0",
                                                        color: "#A9A9A9",
                                                    },
                                                }}
                                            >
                                                Submit Request
                                            </Button>
                                        </Box>


                                    </>
                                }


                            </Paper>
                        </Box>
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            width: "100%",
                            borderTop: "1px solid #ddd",
                            display: { xs: "block", sm: "flex" },
                            justifyContent: "space-between", // left & right ends
                            alignItems: "center",
                            py: 2,
                            px: 5,
                            textAlign: { xs: "center", sm: "left" }
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            Need help?{" "}
                            <Link href="mailto:support@yocostays.com" underline="hover">
                                support@yocostays.com
                            </Link>
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 1 }}>
                            <Link href="/terms" underline="hover" variant="body2">
                                Terms & Conditions
                            </Link>
                            <Link href="/privacy" underline="hover" variant="body2">
                                Privacy Policy
                            </Link>
                        </Box>

                    </Box>
                </Box>

            </Box>
        </>

    );
}
