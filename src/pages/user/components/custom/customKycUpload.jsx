import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useRef, useState } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";

function KycUploadCard({
  name,
  register,
  image,
  imageName,
  control,
  rules,
  verified,
  id,
  isKycFrom,
}) {
  const fileInputRef = useRef(null);
  const authToken = localStorage.getItem("authToken");
  const { verifyUserName } = useSelector((state) => state.users);

  const checkVerifyUserName = verifyUserName && isKycFrom === "staff";

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result); // Update the form state with the base64 image
    };

    if (file) {
      reader.readAsDataURL(file);

      if (isKycFrom === "staff") {
        // Additional functionality for staff
        const formData = new FormData();
        formData.append("type", "staff");
        formData.append("file", file);

        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        fetch(`${apiUrl}/api/auth/upload-media`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `${authToken}`, // Add your auth token here
          },
        })
          .then(async (response) => {
            const responseData = await response.json();
            onChange(responseData?.data); // Update form state with API response data
          })
          .catch((error) => {
            console.error("Upload failed:", error);
          });
      }
    }
  };

  const handleDeleteImage = () => {
    onChange(null); // Clear the uploaded image by setting value to null
  };

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box
      sx={{
        border: "1px solid #674D9F0D",
        borderRadius: "20px",
        padding: "14px",
        textAlign: "center",
        position: "relative",
        backgroundColor: "#674D9F0D",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: { xs: "80px", sm: "100px" },
      }}
    >
      <img
        src={value || image}
        style={{
          width: "100%",
          maxWidth: "60px",
          height: "auto",
          borderRadius: "4px",
        }}
        alt={imageName}
      // disabled={(!id && !verified) || checkVerifyUserName}
      />
      <Box
        sx={{
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            fontSize: { xs: "10px", sm: "14px", md: "16px" },
          }}
        >
          {imageName}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#ACB5BD",
            fontSize: { xs: "9px", sm: "12px", md: "14px" },
          }}
        >
          png/jpg/jpeg
        </Typography>
      </Box>

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e.target.files[0])}
      // disabled={(!id && !verified) || checkVerifyUserName}
      />
      {error && !value && (
        <IconButton
          sx={{
            position: "absolute",
            right: "8px",
            top: { xs: "20px", sm: "30px" },
            color: "#ACB5BD",
          }}
          onClick={triggerFileInput}
        // disabled={(!id && !verified) || checkVerifyUserName}
        >
          <WarningIcon />
        </IconButton>
      )}
      {!value && !error && (
        <IconButton
          sx={{
            position: "absolute",
            right: "8px",
            top: { xs: "20px", sm: "30px" },
            color: "#ACB5BD",
          }}
          onClick={triggerFileInput}
        // disabled={(!id && !verified) || checkVerifyUserName}
        >
          <FileUploadIcon />
        </IconButton>
      )}

      {value && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              right: "8px",
              top: { xs: "20px", sm: "30px" },
              color: "#ACB5BD",
            }}
            onClick={handleDeleteImage}
            // disabled={!verified}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              right: "40px",
              top: { xs: "20px", sm: "30px" },
              color: "#ACB5BD",
            }}
            onClick={() => handleOpen(value)}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      )}
      {error && (
        <Typography
          variant="caption"
          sx={{
            color: "red",
            position: "absolute",
            bottom: "-20px",
          }}
        >
          {error.message}
        </Typography>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxHeight: "90vh", // Limit modal height
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              overflow: "auto", // Enable scrolling if needed
            }}
          >
            {selectedImage ? (
              <img
                {...register("kyc")}
                src={`${selectedImage}`}
                alt="Document"
                style={{
                  width: "100%", // Take up the modal's width
                  height: "auto", // Maintain aspect ratio
                  maxHeight: "80vh", // Ensure the image doesn't exceed the modal height
                  objectFit: "contain", // Ensure the full document is visible
                }}
              />
            ) : null}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

KycUploadCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageName: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  verified: PropTypes.bool,
  id: PropTypes.string,
  isKycFrom: PropTypes.string,
};

export default KycUploadCard;
