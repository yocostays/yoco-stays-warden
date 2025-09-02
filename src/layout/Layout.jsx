
import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { appLogout, logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getStaffDetailById } from "../features/users/userSlice";
import PermittedSidebar from "../components/sidebar/PermittedSidebar";
import Header from "../components/header/Header";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staffById } = useSelector((state) => state?.users);
  

  const handleClose = () => {
    if (staffById?.isHostelAssigned === true) {
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(appLogout()); // Dispatch the async thunk for logout
      dispatch(logout()); // Call the synchronous logout reducer to clear state
      localStorage.removeItem("hostelId");
      localStorage.removeItem("permittedRoutes");
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  React.useEffect(() => {
    if (userData?.isHostelAssigned === false) {
      dispatch(getStaffDetailById(userData?._id));
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* Fixed Header */}
        <Box
          component="header"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            //zIndex: 1000,
            //backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginLeft:'10px',
            //mt:'-8px',
            //mb:"-8px"
          }}
        >
          <Header/>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            marginTop: "150px", // Adjust based on the Header height (default MUI AppBar height is 64px)
            overflow: "hidden",
          }}
        >
          {/* Sidebar */}
          <PermittedSidebar />

          {/* Children Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "calc(100vh - 64px)", // Full height minus header height
              overflowY: "auto", // Add vertical scrolling for long content
              padding: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>

      {/* Warning Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Icon icon="ic:twotone-warning" fontSize={30} color="F3C623" />
            <Typography variant="h6" fontWeight={"bold"}>
              Warning - You don&apos;t have any Hostel Assigned!
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Typography fontWeight={"bold"}>
              Your account does not have any hostel assigned. Please contact
              Admin to get your hostel assigned.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 4, py: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
