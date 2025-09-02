import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";

const CancelLeaveDialog = ({ open, remark, setRemark, onStatusHandle, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position:'relative',
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#1F1F1F",
          paddingBottom: 0,
          mb: 2,
        }}
      >
        Are you sure you want to cancel your approved leave?
      </DialogTitle>
      <DialogContent sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            // gap: 2,
          }}>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            size="small"
            placeholder="Add Remark"
            fullWidth
            variant="outlined"
            onChange={(e) => setRemark(e.target.value)}
            sx={{
              maxWidth: "150px",
              borderRadius: "12px",
              border: "none",
              bgcolor: "#FDF6E3",
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-root:hover": {
                  borderColor: "#D3A875",
                },
                borderRadius: "12px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D3A875",
                },
              },
            }}
          />
          <Button
            onClick={() => onStatusHandle("cancelled")}
            disabled={!remark?.length > 0}
            sx={{
              color: "#D32F2F",
              border: `2px solid ${
                !remark?.length > 0 ? "lightgray" : "#D32F2F"
              }`,
              borderRadius: "50px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onStatusHandle("approved")}
            disabled={!remark?.length > 0}
            sx={{
              color: "#388E3C",
              border: `2px solid ${
                !remark?.length > 0 ? "lightgray" : "#388E3C"
              }`,
              borderRadius: "50px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Keep
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CancelLeaveDialog;

CancelLeaveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  remark: PropTypes.string.isRequired,
  onStatusHandle: PropTypes.func.isRequired,
  setRemark: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
