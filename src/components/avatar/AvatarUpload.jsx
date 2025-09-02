/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Box, Avatar, Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

const AvatarUpload = ({
  initialImage = null,
  onImageChange = () => {},
  onRemoveImage = () => {},
  avatarSize = 100,
  uploadButtonText = "Upload",
  removeButtonText = "Remove",
}) => {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result;
        setSelectedImage(imageSrc);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onRemoveImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          border: "2px solid #674D9F",
          cursor: "pointer",
          width: avatarSize + 16, // To account for padding
          height: avatarSize + 16, // To account for padding
          p: 2,
          backgroundColor: "#F5F5F5",
          color: "#674D9F",
          fontWeight: "bold",
          fontSize: 14,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
          "&:focus-visible": {
            outline: "none",
          },
          "&:focus-within": {
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            outline: "none",
          },
        }}
      >
        <Avatar
          src={selectedImage}
          sx={{ width: avatarSize, height: avatarSize }}
        />
      </Box>
      <input
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{
              border: "2px solid #6a11cb",
              boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s",
              "&:active": {
                transform: "translateY(0)",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {selectedImage && (
          <>
            <IconButton
              color="error"
              component="span"
              onClick={handleRemoveImage}
              sx={{
                border: "2px solid #ff512f",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:active": {
                  transform: "translateY(0)",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

AvatarUpload.propTypes = {
  initialImage: PropTypes.string,
  onImageChange: PropTypes.func,
  onRemoveImage: PropTypes.func,
  avatarSize: PropTypes.number,
  uploadButtonText: PropTypes.string,
  removeButtonText: PropTypes.string,
};

export default AvatarUpload;
