import { useState, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
export default function DragAndDropFile({ handleClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef();

  // Handle drag events
  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  // Handle file selection via input
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Trigger file input click
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!file) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${apiUrl}/api/mess/bulk-upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${authToken}`,
        },
      });
      const data = await response.json();

      if (data?.statusCode === 200) {
        toast.success(data?.message || "Submission success!");
        setFile(null);
        fileInputRef.current.value = null; // Reset file input
        handleClose();
      } else {
        toast.error(data?.message || "Submission failed!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("An error occurred while uploading.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed gray",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: dragActive ? "#f0f0f0" : "white",
          borderRadius: "8px",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleFileClick}
      >
        <input
          type="file"
          id="fileInput"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".xlsx, .csv"
        />
        {file ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              py: 4,
            }}
          >
            <Typography variant="h6">File: {file.name}</Typography>
          </Box>
        ) : (
          <>
            <Typography>
              <CloudUploadIcon fontSize="large" />
            </Typography>
            <Typography variant="h6">
              Drag and drop a XLSX and CSV file or
              <br />
              <Link to="#">Browse file</Link>
            </Typography>
          </>
        )}
      </Box>
      {file && (
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={submitting}
          >
            Upload
          </LoadingButton>
        </Stack>
      )}
    </>
  );
}
