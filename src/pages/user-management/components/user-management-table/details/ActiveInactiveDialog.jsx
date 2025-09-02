import {
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getStaffRole,
  updateStaffStatusAsync,
} from "../../../../../features/users/userSlice"; // Ensure this is a valid action
const ActiveInactiveDialog = ({
  open,
  handleUpdateStatusClose,
  selectedUserStatus,
  roles,
  limit,
  page,
  tabStatus,
}) => {
  const dispatch = useDispatch();
  const { submitting } = useSelector((state) => state?.users);

  const handleSubmit = async () => {
    console.log("Submit button clicked"); // Debugging line
    try {
      const id = selectedUserStatus?._id;
      const payload = {
        staffId: id,
        // Any additional data you want to pass
      };

      // Dispatch action with the payload
      const res = await dispatch(updateStaffStatusAsync(payload)).unwrap();

      console.log("res", res);

      if (res?.statusCode === 200) {
        toast.success(res?.message || "Form submitted successfully!");
        dispatch(
          getStaffRole({
            page: page + 1,
            limit: limit,
            roles: roles,
            status: tabStatus,
          })
        );
        handleUpdateStatusClose();
      } else {
        console.error("Submission failed", res?.error?.message);
        toast.error(res?.error?.message || "Submission failed!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred during submission!");
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Change Status"}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          Do you want to change status to{" "}
          {selectedUserStatus?.status === false ? "Active" : "In Active"} of the
          account of{" "}
          <Chip
            label={selectedUserStatus?.name}
            size="medium"
            sx={{
              backgroundColor: (theme) => `${theme.palette.primary.main}20`,
              color: (theme) => theme.palette.primary.main,
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          sx={{ borderRadius: 15 }}
          onClick={handleUpdateStatusClose}
        >
          Disagree
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 15 }}
          onClick={handleSubmit}
          autoFocus
        >
          {submitting ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Agree"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ActiveInactiveDialog.propTypes = {
  open: PropTypes.bool,
  handleUpdateStatusClose: PropTypes.func,
  selectedUserStatus: PropTypes.object,
  roles: PropTypes.object,
  tabStatus: PropTypes.string,
  page: PropTypes.string,
  limit: PropTypes.string,
};

export default ActiveInactiveDialog;
