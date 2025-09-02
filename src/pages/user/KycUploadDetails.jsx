import {
  Box,
  Fade,
  Grid,
  IconButton,
  Modal,
  Backdrop,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import aadhaar from "../../assets/blankImages/addhar_card.png";
import driving from "../../assets/blankImages/driving_licence.png";
import passport from "../../assets/blankImages/passport.png";
import pan from "../../assets/blankImages/pen_card.png";
import voter from "../../assets/blankImages/voter_id.png";
import { useState } from "react";

export default function KycUploadDetails({ kycDocuments }) {
  const documents = [
    {
      id: 1,
      name: "Aadhaar Card",
      image: kycDocuments?.aadhaarCard || aadhaar,
      isPresent: !!kycDocuments?.aadhaarCard,
    },
    {
      id: 2,
      name: "Voter Card",
      image: kycDocuments?.voterCard || voter,
      isPresent: !!kycDocuments?.voterCard,
    },
    {
      id: 3,
      name: "Passport",
      image: kycDocuments?.passport || passport,
      isPresent: !!kycDocuments?.passport,
    },
    {
      id: 4,
      name: "Driving License",
      image: kycDocuments?.drivingLicense || driving,
      isPresent: !!kycDocuments?.drivingLicense,
    },
    {
      id: 5,
      name: "PAN Card",
      image: kycDocuments?.panCard || pan,
      isPresent: !!kycDocuments?.panCard,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "10px",
          paddingTop: "90px",
          marginX: { xs: "10px", sm: "20px", md: "60px" }, // Adjust horizontal margin for small screens
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 3, textAlign: "left", ml: { xs: "8px", sm: "16px" } }}
        >
          Upload KYC Documents
        </Typography>
        <Grid container spacing={2}>
          {documents.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Box
                sx={{
                  border: "1px solid #674D9F0D",
                  borderRadius: "20px",
                  padding: "16px",
                  textAlign: "center",
                  position: "relative",
                  backgroundColor: "#674D9F0D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: { xs: "80px", sm: "100px" }, // Adjust height for small screens
                }}
              >
                <img
                  src={`${doc.image}`}
                  style={{
                    width: "100%",
                    maxWidth: "60px", // Reduce max width for small screens
                    height: "auto",
                    borderRadius: "4px",
                  }}
                  alt={doc.name}
                />
                <Box
                  sx={{
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      textAlign: "center",
                      fontSize: {
                        xs: "10px",
                        sm: "14px",
                        md: "16px",
                      },
                    }}
                  >
                    {doc.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#ACB5BD",
                      fontSize: {
                        xs: "9px",
                        sm: "12px",
                        md: "14px",
                      },
                    }}
                  >
                    png/jpg/jpeg
                  </Typography>
                </Box>
                {doc?.isPresent && 
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "8px",
                      top: { xs: "20px", sm: "30px" }, // Adjust position for small screens
                      color: "#ACB5BD",
                    }}
                    onClick={() => handleOpen(doc.image)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                }
              </Box>
            </Grid>
          ))}
        </Grid>
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
                // width: { xs: "90%", sm: "80%" }, // Adjust modal width for responsiveness
                maxHeight: "90vh", // Limit modal height
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                overflow: "auto", // Enable scrolling if needed
              }}
            >
              {selectedImage ? (
                <img
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
    </Box>
  );
}
