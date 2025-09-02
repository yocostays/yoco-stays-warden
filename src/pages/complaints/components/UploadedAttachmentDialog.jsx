import { useState } from "react";
import { Avatar, Box, Dialog, DialogContent, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

const isVideo = (url) => {
  const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const MediaAvatar = ({ fileName }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (fileName) setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ position: "relative", display: "inline-block", cursor: "pointer" }} onClick={handleOpen}>
        <Avatar
          alt=""
          src={isVideo(fileName) ? "" : fileName}
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#674D9F",
            fontSize: "18px",
          }}
        >
          {!fileName && "?"}
        </Avatar>
        {isVideo(fileName) && (
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

      {/* Dialog for showing media */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent sx={{ position: "relative", p: 2 }}>
          <IconButton
            sx={{ position: "absolute", top: 10, right: 10 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          {isVideo(fileName) ? (
            <ReactPlayer url={fileName} controls width="100%" />
          ) : (
            <img src={fileName} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

MediaAvatar.propTypes = {
    fileName: PropTypes.string,
}

const MediaList = ({ fields }) => {
  return (
    <>
      {fields.length >= 1 &&
        fields.map(
          (items) =>
            items.fileName !== "" && <MediaAvatar key={items.fileName} fileName={items.fileName} />
        )}
    </>
  );
};

export default MediaList;

MediaList.propTypes = {
    fields: PropTypes.array,
}
