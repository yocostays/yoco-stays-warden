import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/Logo.svg";
import FrameImg from "../../assets/images/login-frame.png";
import BgImg from "../../assets/images/login-background.png";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { getPermittedRoutesAsync } from "../../features/permissionRoutes/permissionApi";
import { Icon } from "@iconify/react";

const LoginIndex = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMessage("");
      localStorage.removeItem("permittedRoutes")

      try {
        const response = await dispatch(login(values));
        if (response?.payload?.statusCode === 200) {
          toast.success(response.payload.message || "Login Success!");
          dispatch(getPermittedRoutesAsync({})).then((response) => {
            // Handle any logic after successful dispatch
            const route = response?.payload?.data.find((item)=> item?.link ==="user")?.link
            navigate(`${route}`, {
              state: { successMessage: response },
            });
          });
        } else {
          toast.error(response?.payload || "Login Fail!");
        }

        // Show a toast with the message from the API
      } catch (error) {
        setErrorMessage(error.message || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage || "Password Reset Successfull");
      setSuccessMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
                    <Typography>Login as an admin user</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{ gap: 2, alignItems: "center" }}
                  >
                    <form
                      onSubmit={formik.handleSubmit}
                      style={{ width: "100%" }}
                    >
                      <TextField
                        label="Enter username"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        name="userName"
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.userName &&
                          Boolean(formik.errors.userName)
                        }
                        helperText={
                          formik.touched.userName && formik.errors.userName
                        }
                        InputProps={{
                          style: { borderRadius: "20px" },
                        }}
                        autoFocus
                      />
                      <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        sx={{ mb: 2 }}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        InputProps={{
                          style: { borderRadius: "20px" },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Icon icon="mdi:hide" />
                                ) : (
                                  <Icon icon="mdi:show" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errorMessage && (
                        <Typography color="error" variant="body2">
                          {errorMessage}
                        </Typography>
                      )}
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            width: "30%",
                            borderRadius: "20px",
                          }}
                        >
                          Login
                        </Button>
                      </Box>
                    </form>
                    <Typography
                      onClick={handleForgotPassword}
                      sx={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "grey",
                        cursor: "pointer",
                      }}
                    >
                      forgot password
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

        {/* Backdrop for loading state */}
        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      {/* // Render the no permission routes if provided */}
      {/* <NoPermissionDialog noPermissionDialog={noRoutePermission} onClose={handleCloseDialog} /> */}
    </>
  );
};

export default LoginIndex;
