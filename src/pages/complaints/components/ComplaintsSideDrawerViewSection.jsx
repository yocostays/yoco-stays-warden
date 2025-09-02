import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MicIcon from "@mui/icons-material/Mic";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ReactPlayer from "react-player";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";

const ComplaintsSideDrawerViewSection = ({
  showAttachments,
  setShowAttachments,
  handleCloseDrawer,
  isFullScreen,
  isSmallScreen,
  isMediumScreen,
  handleExpandToFullPage,
  toggleViewDrawer,
  complaintById,
  complaintAttached,
}) => {
  const [selectedFilter, setSelectedFilter] = useState({
    label: "Images",
    value: "image",
    icon: {
      type: {
        type: {},
        compare: null,
      },
      key: null,
      ref: null,
      props: {
        sx: {
          color: "#ACB5BD",
          marginRight: 1,
        },
      },
      _owner: null,
      _store: {},
    },
  });

  const audioRef = useRef(null);
  const [mediaType, setMediaType] = useState("image");

  // Function to update media preview
  const handleMediaPreview = (type) => {
    setMediaType(type);
  };

  const handleGoBack = () => setShowAttachments(false);

  // Filter complaints with status 'pending'
  const pendingComplaintsImage = complaintById?.image;
  const pendingComplaintsAudio = complaintById?.audio;
  const pendingComplaintsVideo = complaintById?.video;
  // ?.filter((complaint) => complaint?.complainStatus === "pending")
  // .map((item) => item?.attachments);

  // Filter complaints with status 'resolved'
  const resolvedImages = complaintById?.updateLogs
    ?.filter((complaint) => complaint?.complainStatus === "resolved")
    .map((item) => item?.attachments);

  return (
    <Box>
      {/* Side Drawer */}
      <Box
        anchor="right"
        open={showAttachments}
        onClose={toggleViewDrawer}
        PaperProps={{
          sx: {
            width: isFullScreen
              ? "100vw"
              : isSmallScreen
              ? "100%"
              : isMediumScreen
              ? "60%"
              : "35%",
            overflow: "auto",
            transition: "width 0.3s ease, height 0.3s ease",
          },
        }}
      >
        <Box p={2}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={5}>
              <IconButton onClick={handleGoBack} >
                <ArrowBackIosIcon fontSize="small" sx={{ color: "#0E0031" }} />
                <Typography
                  sx={{ color: "#0E0031", fontSize: "16px", fontWeight: "600" }}
                >
                  Back
                </Typography>
              </IconButton>
              <IconButton onClick={handleCloseDrawer}>
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
              <IconButton
                onClick={handleExpandToFullPage}
                sx={{ position: "absolute", top: 16, left: 50, zIndex: 2 }}
              >
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Stack>

            {/* Autocomplete Dropdown */}
            <Autocomplete
              size="small"
              disableClearable
              options={FileterEnum}
              getOptionLabel={(option) => option.label}
              value={selectedFilter}
              onChange={(event, newValue) => {
                setSelectedFilter(newValue);
                handleMediaPreview(newValue.value);
                setMediaType(newValue.value);
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  display="flex"
                  alignItems="center"
                  
                >
                  {option.icon}
                  <Typography sx={{ cursor: "pointer" }}>
                    {option.label}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select"
                  variant="outlined"
                  component='button'
                  inputProps={{
                    ...params.inputProps,
                    readOnly: true, // Disables typing
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      textTransform: "capitalize",
                      fontWeight: 500,
                      borderRadius: "3px",
                      cursor: "pointer",
                      px: 1,
                      borderWidth: "2px",
                      borderStyle: "solid",
                      boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.15)",
                      borderImage:
                        "linear-gradient(180deg, #674D9F, #FDFAFF) 1",
                      backgroundColor: "#fff",
                      fontSize: "14px",
                      width: "150px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    color: "#0E0031",
                  }}
                />
              )}
            />
          </Stack>
        </Box>

        <Box sx={{ px: 2 }}>
          <Typography variant="h6" fontWeight={600} px={1.5} textTransform={"capitalize"}>
            {complaintAttached === "resoledAttached"
              ? `Resolved Complaints : ${mediaType}`
              : `Attachments : ${mediaType}`}
          </Typography>
          <Box
            sx={{
              py: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              m: 1,
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {complaintAttached === "resoledAttached" ? (
              resolvedImages[0]?.map((image) => (
                <Box
                  key={image?._id}
                  // sx={{
                  //   width: { lg: "550px", sm: "400px", xs: "300px" },
                  //   height: { lg: "380px", md: "300px", xs: "250px" },
                  // }}
                >
                  {mediaType === "image" && image?.url ? (
                    <Box
                      component="img"
                      src={image?.url}
                      alt="Pending Complaint"
                      sx={{
                        // width: "100%",
                        width: { lg: "550px", sm: "400px", xs: "300px" },
                        height: { lg: "380px", md: "300px", xs: "250px" },
                        objectFit: "cover",
                        borderRadius: "10px",
                        my: 1,
                      }}
                    />
                  ) : mediaType === "video" && image?.video ? (
                    <ReactPlayer
                      disabled={!image?.video}
                      url={image?.url}
                      controls
                      width="100%"
                      height="300px"
                    />
                  ) : mediaType === "voice" && image?.audio ? (
                    <audio controls>
                      <source src={image?.audio} type="audio/mp3" />
                    </audio>
                  ) : (
                    <NoDataAvailable message="No audio available" />
                  )}
                </Box>
              ))
            ) : (
              <Box
              // sx={{
              //   width: { lg: "550px", sm: "400px", xs: "300px" },
              //   height: { lg: "380px", md: "300px", xs: "250px" },
              // }}
              >
                {mediaType === "image" && pendingComplaintsImage ? (
                  <Box
                    component="img"
                    src={pendingComplaintsImage}
                    alt="Pending Complaint"
                    sx={{
                      width: { lg: "550px", sm: "400px", xs: "300px" },
                      height: { lg: "380px", md: "300px", xs: "250px" },
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                ) : mediaType === "video" && pendingComplaintsVideo ? (
                  <ReactPlayer
                    url={pendingComplaintsImage}
                    controls
                    width="100%"
                    height="300px"
                  />
                ) : mediaType === "voice" && pendingComplaintsAudio ? (
                  <audio ref={audioRef} controls>
                    <source src={pendingComplaintsAudio} type="audio/mp3" />
                  </audio>
                ) : (
                  <NoDataAvailable message="No audio available" />
                )}
              </Box>
            )}
          </Box>
        </Box>
        {/* </> */}
        {/* )} */}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

const FileterEnum = [
  {
    label: "Images",
    value: "image",
    icon: <ImageOutlinedIcon sx={{ color: "#ACB5BD", marginRight: 1 }} />,
  },
  {
    label: "Voice",
    value: "voice",
    icon: <MicIcon sx={{ color: "#ACB5BD", marginRight: 1 }} />,
  },
  {
    label: "Video",
    value: "video",
    icon: <VideocamOutlinedIcon sx={{ color: "#ACB5BD", marginRight: 1 }} />,
  },
];

export default ComplaintsSideDrawerViewSection;

ComplaintsSideDrawerViewSection.propTypes = {
  isFullScreen: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  handleCloseDrawer: PropTypes.func,
  handleExpandToFullPage: PropTypes.func,
  selectedRow: PropTypes.object,
  toggleViewDrawer: PropTypes.func,
  isMediumScreen: PropTypes.bool,
  isSmallScreen: PropTypes.bool,
  showAttachments: PropTypes.bool,
  setShowAttachments: PropTypes.func,
  complaintById: PropTypes.object,
  complaintAttached: PropTypes.string,
};
