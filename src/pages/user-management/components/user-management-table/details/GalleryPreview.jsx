/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const GalleryPreview = ({ open, onClose, data }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Box
          component="img"
          src={data}
          sx={{
            objectFit: "contain",
          }}
        />
      </Box>
    </Modal>
  );
};

export default GalleryPreview;