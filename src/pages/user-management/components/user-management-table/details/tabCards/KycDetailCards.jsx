/* eslint-disable react/prop-types */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import * as React from 'react'
import GalleryPreview from '../GalleryPreview'

import uidai from "../../../../../../assets/blankImages/addhar_card.png";
import voter from "../../../../../../assets/blankImages/voter_id.png";
import driving from "../../../../../../assets/blankImages/driving_licence.png";
import panCard from "../../../../../../assets/blankImages/pen_card.png";
import passPort from "../../../../../../assets/blankImages/passport.png";
import { Icon } from "@iconify/react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const KycDetailCards = ({ documents, pagePermission, kycDocuments, onReload }) => {

    const [galleryOpen, setGalleryOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const [type, setType] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [error, setError] = React.useState("");
    const [dragOver, setDragOver] = React.useState(false);
    const authToken = localStorage.getItem("authToken");
    const student = localStorage.getItem("studentId");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && isValidImageFile(selectedFile)) {
            setFile(selectedFile);
            setError("");
        } else {
            setFile(null);
            setError("Please upload a valid image file (JPG or PNG).");
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setType(null);
        setFile(null);
    };

    // Validate file type
    const isValidImageFile = (file) => {
        const validImageTypes = ["image/jpeg", "image/png"];
        return validImageTypes.includes(file.type);
    };

    // Handle drag and drop events
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && isValidImageFile(droppedFile)) {
            setFile(droppedFile);
            setError("");
        } else {
            setError("Please upload a valid image file (JPG or PNG).");
        }
    };


    const handleUploadFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append("type", type); // Append type
            formData.append("file", file); // Append the file
            formData.append("studentId", student); // Append studentId

            // Implement your upload logic here
            // Example: Using fetch to send the FormData to an API
            const apiUrl = import.meta.env.VITE_API_BASE_URL;

            fetch(`${apiUrl}/api/user/upload-kyc-admin`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `${authToken}`, // Add your auth token here
                    // 'Accept': 'application/json' // Optional, add if your API expects this
                },
            })
                .then((response) => response.json())
                .then(() => {
                    onReload();
                    handleCloseDialog(); // Close dialog after successful upload
                })
                .catch((error) => {
                    console.error("Upload failed:", error);
                    setError("Upload failed. Please try again."); // Handle upload error
                });
        }
    };

    const handleGalleryClose = () => {
        setGalleryOpen(false);
        setSelectedImage(null);
    };

    const handleGalleryOpen = (data) => {
        setGalleryOpen(true);
        setSelectedImage(data);
    };

    const handleUpload = (docType) => {
        setType(docType);
        setDialogOpen(true);
    };

    const handleDownload = (data) => {
        try {
            // Create an anchor element
            const link = document.createElement("a");

            // Set the href to the image URL
            link.href = data;

            // Set the download attribute to trigger the download
            link.download = data.split("/").pop(); // This will set the filename to the image name (you can change this as needed)

            // Trigger the download
            link.click();
        } catch (error) {
            console.error("Error downloading the image:", error);
            alert("Failed to download the image. Please try again later.");
        }
    };

    const handleRemove = (docType) => {
        const formData = new FormData();
        formData.append("type", docType); // Append type
        formData.append("file", null); // Append the file
        formData.append("studentId", student); // Append studentId

        // Implement your upload logic here
        // Example: Using fetch to send the FormData to an API
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        fetch(`${apiUrl}/api/user/upload-kyc-admin`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `${authToken}`, // Add your auth token here
                // 'Accept': 'application/json' // Optional, add if your API expects this
            },
        })
            .then((response) => response.json())
            .then(() => {
                onReload();
                handleCloseDialog(); // Close dialog after successful upload
            })
            .catch((error) => {
                console.error("Upload failed:", error);
                setError("Upload failed. Please try again."); // Handle upload error
            });
    };


    return (
        <>
            <Grid item xs={12} spacing={3}>
                <Grid container spacing={3}>
                    <Grid item sm={12} lg={6}>
                        {/* Aadhar box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    documents?.aadhaarCard ||
                                    kycDocuments?.aadhaarCard ||
                                    uidai
                                }
                                onClick={() =>
                                    handleGalleryOpen(
                                        documents?.aadhaarCard ||
                                        kycDocuments?.aadhaarCard
                                    )
                                }
                                alt="aadhaarCard"
                                sx={{
                                    width: { xs: 150, sm: 180, md: 320 },
                                    height: { xs: 150, sm: 180, md: 200 },
                                    borderRadius: "8px",
                                    boxShadow: 3,
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                {documents?.aadhaarCard ||
                                    kycDocuments?.aadhaarCard ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography>Aadhar Card</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : "block"
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleRemove("aadhaarCard")
                                                }
                                            >
                                                Remove
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : ""
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleDownload(
                                                        documents?.aadhaarCard ||
                                                        kycDocuments?.aadhaarCard
                                                    )
                                                }
                                                startIcon={
                                                    <Icon icon="material-symbols:download" />
                                                }
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 3,
                                        }}
                                    >
                                        <Typography>Upload Aadhar card</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                display: `${pagePermission?.edit === false
                                                    ? "none"
                                                    : "block"
                                                    }`,
                                                textTransform: "capitalize",
                                            }}
                                            onClick={() =>
                                                handleUpload("aadhaarCard")
                                            }
                                        >
                                            Upload
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                        {/* Driving Licence ID Box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    documents?.drivingLicense ||
                                    kycDocuments?.drivingLicense ||
                                    driving
                                }
                                onClick={() =>
                                    handleGalleryOpen(
                                        documents?.drivingLicense ||
                                        kycDocuments?.drivingLicense
                                    )
                                }
                                alt="drivingLicense"
                                sx={{
                                    width: { xs: 150, sm: 180, md: 320 },
                                    height: { xs: 150, sm: 180, md: 200 },
                                    borderRadius: "8px",
                                    boxShadow: 3,
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                {documents?.drivingLicense ||
                                    kycDocuments?.drivingLicense ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography>Driving Licence</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : "block"
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleRemove("drivingLicense")
                                                }
                                            >
                                                Remove
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : ""
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleDownload(
                                                        documents?.drivingLicense ||
                                                        kycDocuments?.drivingLicense
                                                    )
                                                }
                                                startIcon={
                                                    <Icon icon="material-symbols:download" />
                                                }
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 3,
                                        }}
                                    >
                                        <Typography>
                                            Upload Driving Licence
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                display: `${pagePermission?.edit === false
                                                    ? "none"
                                                    : "block"
                                                    }`,
                                                textTransform: "capitalize",
                                            }}
                                            onClick={() =>
                                                handleUpload("drivingLicense")
                                            }
                                        >
                                            Upload
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                        {/* Pan Card Licence ID Box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    documents?.panCard ||
                                    kycDocuments?.panCard ||
                                    panCard
                                }
                                onClick={() =>
                                    handleGalleryOpen(
                                        documents?.panCard || kycDocuments?.panCard
                                    )
                                }
                                alt="panCard"
                                sx={{
                                    width: { xs: 150, sm: 180, md: 320 },
                                    height: { xs: 150, sm: 180, md: 200 },
                                    borderRadius: "8px",
                                    boxShadow: 3,
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                {documents?.panCard || kycDocuments?.panCard ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography>Pan Card</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : "block"
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() => handleRemove("panCard")}
                                            >
                                                Remove
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : ""
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleDownload(
                                                        documents?.panCard ||
                                                        kycDocuments?.panCard
                                                    )
                                                }
                                                startIcon={
                                                    <Icon icon="material-symbols:download" />
                                                }
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 3,
                                        }}
                                    >
                                        <Typography>Upload Pan Card</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                display: `${pagePermission?.edit === false
                                                    ? "none"
                                                    : "block"
                                                    }`,
                                                textTransform: "capitalize",
                                            }}
                                            onClick={() => handleUpload("panCard")}
                                        >
                                            Upload
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                        {/* Passport ID Box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    documents?.passport ||
                                    kycDocuments?.passport ||
                                    passPort
                                }
                                onClick={() =>
                                    handleGalleryOpen(
                                        documents?.passport ||
                                        kycDocuments?.passport
                                    )
                                }
                                alt="passport"
                                sx={{
                                    width: { xs: 150, sm: 180, md: 320 },
                                    height: { xs: 150, sm: 180, md: 200 },
                                    borderRadius: "8px",
                                    boxShadow: 3,
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                {documents?.passport ||
                                    kycDocuments?.passport ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography>Passport</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : "block"
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() => handleRemove("passport")}
                                            >
                                                Remove
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : ""
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleDownload(
                                                        documents?.passport ||
                                                        kycDocuments?.passport
                                                    )
                                                }
                                                startIcon={
                                                    <Icon icon="material-symbols:download" />
                                                }
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 3,
                                        }}
                                    >
                                        <Typography>Upload Passport</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                display: `${pagePermission?.edit === false
                                                    ? "none"
                                                    : "block"
                                                    }`,
                                                textTransform: "capitalize",
                                            }}
                                            onClick={() => handleUpload("passport")}
                                        >
                                            Upload
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item sm={12} lg={6}>
                        {/* Viter ID Box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    documents?.voterCard ||
                                    kycDocuments?.voterCard ||
                                    voter
                                }
                                onClick={() =>
                                    handleGalleryOpen(
                                        documents?.voterCard ||
                                        kycDocuments?.voterCard
                                    )
                                }
                                alt="voterCard"
                                sx={{
                                    width: { xs: 150, sm: 180, md: 320 },
                                    height: { xs: 150, sm: 180, md: 200 },
                                    borderRadius: "8px",
                                    boxShadow: 3,
                                    objectFit: "contain",
                                }}
                            />
                            <Box>
                                {documents?.voterCard ||
                                    kycDocuments?.voterCard ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <Typography>Voter Id Card</Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "flex-start",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : "block"
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleRemove("voterCard")
                                                }
                                            >
                                                Remove
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    display: `${pagePermission?.delete === false
                                                        ? "none"
                                                        : ""
                                                        }`,
                                                    textTransform: "capitalize",
                                                }}
                                                onClick={() =>
                                                    handleDownload(
                                                        documents?.voterCard ||
                                                        kycDocuments?.voterCard
                                                    )
                                                }
                                                startIcon={
                                                    <Icon icon="material-symbols:download" />
                                                }
                                            >
                                                Download
                                            </Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 3,
                                        }}
                                    >
                                        <Typography>
                                            Upload Voter Id Card
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                display: `${pagePermission?.edit === false
                                                    ? "none"
                                                    : "block"
                                                    }`,
                                                textTransform: "capitalize",
                                            }}
                                            onClick={() => handleUpload("voterCard")}
                                        >
                                            Upload
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            {/* Upload Dialog Box */}
            <Dialog open={dialogOpen} maxWidth="sm" fullWidth>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    {!file && (
                        <Box
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            sx={{
                                border: `2px dashed ${dragOver ? "#1976d2" : "#d3d3d3"
                                    }`,
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9",
                                padding: "20px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "border 0.3s",
                            }}
                        >
                            <CloudUploadIcon
                                sx={{
                                    fontSize: 50,
                                    color: dragOver ? "#1976d2" : "#9e9e9e",
                                }}
                            />
                            <Typography variant="h6" sx={{ marginTop: "16px" }}>
                                Drag and drop image files here
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ marginTop: "8px" }}
                            >
                                or
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ marginTop: "16px" }}
                            >
                                Browse files
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </Button>
                            {error && (
                                <Typography
                                    color="error"
                                    variant="body2"
                                    sx={{ marginTop: "16px" }}
                                >
                                    {error}
                                </Typography>
                            )}
                        </Box>
                    )}
                    {file && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: "16px",
                            }}
                        >
                            <Typography variant="body2">
                                Selected file: {file.name}
                            </Typography>
                            {/* Image preview */}
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                style={{
                                    marginTop: "16px",
                                    width: "100%",
                                    maxWidth: "200px",
                                    height: "auto",
                                    borderRadius: "8px",
                                }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleUploadFile}
                        variant="contained"
                        color="primary"
                        disabled={!file}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>

            <GalleryPreview
                open={galleryOpen}
                onClose={handleGalleryClose}
                data={selectedImage}
            />
        </>
    )
}

export default KycDetailCards
