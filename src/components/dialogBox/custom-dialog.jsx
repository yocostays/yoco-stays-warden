import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import PropTypes from 'prop-types';

export default function DialogBox({
  title,
  content,
  action,
  open,
  onClose,
  children,
  ...other
}) {
  DialogBox.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    action: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    // ... add other prop types if needed
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      {...other}
      disableBackdropClick
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontWeight: 800,
              fontSize: "20px",
            }}
          >
            {title}
          </Typography>
          <IconButton color="primary" size="large" onClick={onClose}>
          <Icon icon="carbon:close-filled" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent> {children}</DialogContent>
    </Dialog>
  );
}
