import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Autocomplete,
  Avatar,
  Dialog,
  DialogContent,
} from "@mui/material";
import PropTypes from "prop-types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
// import MediaList from "./UploadedAttachmentDialog";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";

const AddRemarksModal = ({
  attachOpen,
  handleAttachClose,
  mediaType,
  setMediaType,
  fields,
  setFields,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  // const [file,setFile] = useState("");

  const FileterEnum = [
    {
      label: "Images",
      value: "image",
      icon: <ImageOutlinedIcon sx={{ color: "#ACB5BD", marginRight: 1 }} />,
    },
    {
      label: "Video",
      value: "video",
      icon: <VideocamOutlinedIcon sx={{ color: "#ACB5BD", marginRight: 1 }} />,
    },
  ];

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  
  const handleOpen = (fileName) => {
    console.log('fileName', fileName)
    if (fileName) {
      setSelectedFile(fileName);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setOpen(false);
  };

  const handleAddField = () => {
    setFields([
      ...fields,
      { id: Date.now(), fileType: null, fileName: "", isFileSelected: false },
    ]);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const getAcceptValue = (fileType) => {
    switch (fileType?.value) {
      case "image":
        return ["image/jpeg", "image/png", "image/jpg"];
      case "video":
        return ["video/mp4", "video/avi", "video/wmv", "video/webm"];
      default:
        return [];
    }
  };

  const handleFileSelect = async (event, id) => {
    setIsLoading(true);
    const selectedFile = event.target.files[0]; // Get file directly from event

    if (!selectedFile) {
      toast.error("No file selected.");
      setIsLoading(false);
      return;
    }

    const selectedField = fields.find((field) => field?.id === id);
    if (!selectedField?.fileType) {
      toast.error("Please select a file type first.");
      setIsLoading(false);
      return;
    }

    // Validate file type
    const validTypes = getAcceptValue(selectedField.fileType);
    if (!validTypes.includes(selectedFile.type)) {
      toast.error(
        `Invalid file type. Please upload a valid ${selectedField.fileType.label}.`
      );
      setIsLoading(false);
      return;
    }

    // Create a local preview URL
    const previewURL = URL.createObjectURL(selectedFile);

    // // Update fields state to store local preview URL
    // setFields((prevFields) =>
    //   prevFields.map((field) =>
    //     field.id === id
    //       ? { ...field, fileName: previewURL, isFileSelected: true }
    //       : field
    //   )
    // );

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://yocoapi.evdtechnology.com/api/auth/upload-media",
        {
          method: "POST",
          headers: { Authorization: token },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData?.statusCode === 200) {
        setFields((prevFields) =>
          prevFields.map((field) =>
            field.id === id
              ? // ? { ...field, fileName: responseData?.data, isFileSelected: true }
                { ...field, fileName: previewURL, isFileSelected: true }
              : field
          )
        );
      } else {
        toast.error(responseData?.message || "Upload failed");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Choose a different file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileTypeChange = (event, newValue, id) => {
    setMediaType(newValue?.value);
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              fileType: newValue,
              fileName: "",
              isFileSelected: false,
            }
          : field
      )
    );
  };

  return (
    <Modal open={attachOpen} onClose={handleAttachClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", sm: "90vw", md: "80vw", lg: "60vw" },
          maxWidth: "700px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" textAlign="center">
          Upload File
        </Typography>

        {fields?.map((field) => (
          <Box
            key={field.id}
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            gap={2}
          >
            <Autocomplete
              size="small"
              disableClearable
              options={FileterEnum}
              getOptionLabel={(option) => option.label}
              value={field.fileType}
              onChange={(event, newValue) =>
                handleFileTypeChange(event, newValue, field.id)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="File Type"
                  variant="outlined"
                  fullWidth
                />
              )}
              sx={{ flex: 1, minWidth: "150px" }}
            />

            <Box
              display="flex"
              gap={1}
              width="100%"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <input
                type="file"
                id={`fileInput-${field.id}`}
                style={{ display: "none" }}
                onChange={(event) => handleFileSelect(event, field.id)}
                accept={getAcceptValue(field?.fileType).join(",")}
              />
              <LoadingButton
                loading={isLoading}
                variant="outlined"
                disabled={!mediaType}
                startIcon={<CloudUploadIcon />}
                onClick={() =>
                  document.getElementById(`fileInput-${field.id}`).click()
                }
              >
                Browse
              </LoadingButton>
              <TextField
                size="small"
                placeholder="Select File"
                disabled={!field.isFileSelected}
                value={field.fileName}
                sx={{ flex: 1, maxWidth: "180px" }}
              />

              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  cursor: field.fileName ? "pointer" : "default",
                }}
              >
                <Avatar
                  onClick={() => handleOpen(field.fileName)}
                  alt="Preview"
                  disabled={!field.fileName}
                  src={
                    field.fileName && !isVideo(field.fileName)
                      ? field.fileName
                      : ""
                  }
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#674D9F",
                    fontSize: "18px",
                  }}
                >
                  {!field.fileName ? (
                    "Img"
                  ) : isVideo(field.fileName) || field.fileType.value === 'video' ? (
                    <PlayCircleIcon />
                  ) : (
                    ""
                  )}
                </Avatar>
                {isVideo(field.fileName) && (
                  <PlayCircleIcon
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "24px",
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Dialog for showing media */}
            <Dialog
              open={open}
              onClose={handleClose}
              maxWidth="md"
              sx={{ zIndex: 9999 }}
            >
              <DialogContent sx={{ position: "relative", p: 2 }}>
                <IconButton
                  sx={{ position: "absolute", top: 10, right: 10, zIndex: 9 }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>

                {selectedFile && field.fileType.value === 'video' ? (
                  <ReactPlayer url={selectedFile} controls width="100%" style={{maxWidth:'600px'}} />
                ) : (
                  <img
                    src={selectedFile}
                    alt="Preview"
                    style={{ width: "100%", borderRadius: 8, maxWidth:'600px' }}
                  />
                )}
              </DialogContent>
            </Dialog>

            {fields.length > 1 && (
              <IconButton
                onClick={() => handleDeleteField(field.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddField}
              sx={{ width: { xs: "100%", sm: "100px" } }}
            >
              Add
            </Button>
          </Box>
        ))}

        <Box
          display="flex"
          justifyContent="center"
          mt={4}
          onClick={handleAttachClose}
        >
          <Button variant="contained" fullWidth={{ xs: true, sm: false }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddRemarksModal;

AddRemarksModal.propTypes = {
  attachOpen: PropTypes.bool,
  handleAttachClose: PropTypes.func,
  mediaType: PropTypes.string,
  setMediaType: PropTypes.func,
  fields: PropTypes.array,
  setFields: PropTypes.func,
};
