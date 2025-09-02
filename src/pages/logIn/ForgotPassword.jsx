import {
    Box,
    Card,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import logoImg from "../../assets/images/Logo.svg";
import FrameImg from "../../assets/images/login-frame.png";
import BgImg from "../../assets/images/login-background.png";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { getOtp, newPassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import OTPInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react'

const ForgotPassword = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [otpData, setOtpData] = useState('');
    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState(0);
    const [step, setStep] = useState(1);
    const [time, setTime] = useState(300); // 5 minutes = 300 seconds
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);

    // Validation schemas
    const emailValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, "Email must be valid")
            .required("Email is required"),
    });

    const passwordValidationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .max(15, "Password cannot exceed 15 characters")
            .required("Password is required"),
        cnfPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    // Initialize forms
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: emailErrors },
    } = useForm({
        resolver: yupResolver(emailValidationSchema),
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
    } = useForm({
        resolver: yupResolver(passwordValidationSchema),
    });

    const handleBack = () => {
        navigate("/")
    }

    // Handle forgot password
    const onSubmitEmail = async (data) => {
        setSubmitting(true);
        setEmail(data)
        try {
            const res = await dispatch(getOtp(data)).unwrap();
            if (res?.statusCode === 200) {
                setOtpData(res?.data?.otp);
                setSubmitting(false);
                setStep(2);
            } else {
                setSubmitting(false);
                toast.error("Failed to send OTP");
            }
        } catch (error) {
            setSubmitting(false);
            toast.error("An error occurred", error);
        }
    };

    const resendOTP = async () => {
        setTime(10)
        const res = await dispatch(getOtp(email)).unwrap();
        if (res?.statusCode === 200) {
            setOtpData(res?.data?.otp);
            setSubmitting(false);
            setStep(2);
        } else {
            setSubmitting(false);
            toast.error("Failed to send OTP");
        }
    }

    // Handle password reset
    const onSubmitPassword = async (data) => {
        setSubmitting(true);
        const payload = {
            "email": email?.email,
            "otp": Number(OTP),
            "password": data?.password
        };
        try {
            const res = await dispatch(newPassword(payload))
            if (res?.payload?.statusCode === 200) {
                toast.success(res?.payload?.message || "Password reset successful");
                setSubmitting(false);
                navigate("/", {
                    state: { successMessage: res?.payload?.message },
                });
            } else {
                toast.error(res?.payload || "Failed to reset password");
                setSubmitting(false);
            }
        } catch (error) {
            toast.error("An error occurred", error);
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (step === 2) {
            if (time > 0) {
                const timerId = setInterval(() => {
                    setTime(prevTime => prevTime - 1);
                }, 1000);

                return () => clearInterval(timerId);
            }
        }
    }, [step, time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            bgcolor="background.default"
            sx={{
                flexDirection: "column",
                backgroundImage: `url(${BgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
                minHeight: "100vh",
            }}
        >
            <Box mt={2} display="flex" justifyContent="center">
                <img
                    src={logoImg}
                    alt="Yoco Stays"
                    className="logo-image"
                    style={{ maxWidth: "70%", height: "auto" }}
                />
            </Box>

            <Box sx={{ p: { md: 8, sm: 2 } }}>
                <Card sx={{ boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            display="flex"
                            sx={{
                                flexDirection: { sm: "column", md: "row" },
                                justifyContent: "space-between",
                            }}
                        >
                            <Box p={4} display="flex" justifyContent="center">
                                <img
                                    src={FrameImg}
                                    alt="Yoco Frame"
                                    style={{ maxWidth: "100%", height: "auto" }}
                                />
                            </Box>
                            <Divider
                                orientation="vertical"
                                sx={{
                                    my: 2,
                                    thickness: 3,
                                    bgcolor: "black",
                                    height: "auto",
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <Box p={2}>
                                <Box m={1}>
                                    <HorizontalRuleIcon
                                        sx={{
                                            fontSize: "58px",
                                            transform: "scaleX(3)",
                                            color: theme.palette.primary.main,
                                            ml: 3,
                                        }}
                                    />
                                    <Typography>Forgot Password</Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    sx={{ gap: 2, alignItems: "center" }}
                                >
                                    {step === 1 && (
                                        <form onSubmit={handleSubmitEmail(onSubmitEmail)} style={{ width: '100%' }}>
                                            <TextField
                                                {...registerEmail("email")}
                                                label="Email"
                                                variant="outlined"
                                                fullWidth
                                                error={!!emailErrors.email}
                                                helperText={emailErrors.email ? emailErrors.email.message : ""}
                                                sx={{ mb: 2 }}
                                            />
                                            <LoadingButton
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                loading={submitting}
                                            >
                                                Send OTP
                                            </LoadingButton>
                                        </form>
                                    )}

                                    {step === 2 && (
                                        <>
                                            <Typography sx={{ textAlign: 'left' }}>
                                                OTP sent to - {email?.email}<br />
                                                Your One Time Password is - {otpData}
                                            </Typography>
                                            <OTPInput
                                                value={OTP}
                                                onChange={setOTP}
                                                autoFocus
                                                OTPLength={4}
                                                otpType="number"
                                                disabled={false}
                                                inputStyles={{
                                                    width: '2rem',
                                                    height: '2rem',
                                                    margin: '0 0.5rem',
                                                    fontSize: '1rem',
                                                    borderRadius: 4,
                                                    border: '1px solid rgba(0,0,0,0.3)',
                                                }}
                                            />
                                            {time != 0 ?
                                                <Typography>{formatTime(time)}</Typography>
                                                :
                                                <Typography sx={{ cursor: 'pointer' }} onClick={resendOTP}>Resend OTP</Typography>
                                            }
                                            <form onSubmit={handleSubmitPassword(onSubmitPassword)} style={{ width: '100%' }}>
                                                <TextField
                                                    {...registerPassword("password")}
                                                    label="Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    type={showPassword ? "text" : "password"}
                                                    inputProps={{  maxLength: 15 }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    edge="end"
                                                                >
                                                                    {showPassword ? <Icon icon="mdi:hide" /> : <Icon icon="mdi:show" />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    error={!!passwordErrors.password}
                                                    helperText={passwordErrors.password ? passwordErrors.password.message : ""}
                                                    sx={{ mb: 2 }}
                                                />
                                                <TextField
                                                    {...registerPassword("cnfPassword")}
                                                    label="Confirm Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    type={showCnfPassword ? "text" : "password"}
                                                    inputProps={{ maxLength: 15 }}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => setShowCnfPassword(!showCnfPassword)}
                                                                    edge="end"
                                                                >
                                                                    {showCnfPassword ? <Icon icon="mdi:hide" /> : <Icon icon="mdi:show" />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    error={!!passwordErrors.cnfPassword}
                                                    helperText={passwordErrors.cnfPassword ? passwordErrors.cnfPassword.message : ""}
                                                    sx={{ mb: 2 }}
                                                />
                                                <LoadingButton
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    loading={submitting}
                                                >
                                                    Reset Password
                                                </LoadingButton>
                                            </form>
                                        </>
                                    )}
                                    <Typography
                                        onClick={handleBack}
                                        sx={{
                                            fontWeight: "bold",
                                            color: theme.palette.primary.main,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Back To Login
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: "bold",
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        Get Help Signing In?
                                    </Typography>
                                    <br />
                                    <Typography sx={{ fontWeight: "500", color: "grey" }}>
                                        Terms of use Privacy Policy
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
          
        </Box>
    );
};

export default ForgotPassword;