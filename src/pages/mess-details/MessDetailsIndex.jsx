import * as React from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import FormMenu from "./components/MessManagment/FormMenu";
import CalendarBox from "../mess/components/Main/CalendarBox";
import DragAndDropFile from "./components/MessManagment/DragandDropFile";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import DownloadIcon from "@mui/icons-material/Download";
import { sampleFileDownloadAsync } from "../../features/users/userApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const MessDetailsIndex = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
  const [reset, setReset] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDownloadSampleFile = async () => {
    setLoader(true);
    try {
      const res = await dispatch(sampleFileDownloadAsync({ type: "meal" }));
      setLoader(false);
      if (res?.payload?.statusCode === 200) {
        // Create a link element
        const link = document.createElement("a");
        link.href = res.payload.data; // URL to the file
        link.setAttribute("download", "sampleFile");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        toast.success(res.payload.message);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error("Failed to download the file.");
    }
  };

  // Handle resetting the date and form data
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setReset(true);
  };

  React.useEffect(() => {
    if (reset) {
      setReset(false); // Reset the state to allow future resets
    }
    if (reload) {
      setReload(false);
    }
  }, [reload, reset]);

  const onReload = () => {
    setReload(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          // width: { md: `calc(100% - 290px)` },
          ml: { md: "270px", sm: 0 },
          marginBottom: "30px",
          p: 2,
        }}
      >
        <Grid container gap={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <LoadingButton
                size="small"
                startIcon={<DownloadIcon />}
                sx={{ borderRadius: "50px" }}
                variant="outlined"
                onClick={handleDownloadSampleFile}
                loading={loader}
              >
                Sample File
              </LoadingButton>

              <Button
                variant="contained"
                size="small"
                sx={{ borderRadius: "50px" }}
                onClick={handleClickOpen}
              >
                Bulk upload
              </Button>
            </Box>
          </Grid>
          {!id && (
            <Grid item xs={12} md={5}>
              <CalendarBox
                startDate={startDate}
                onStartDate={setStartDate}
                endDate={endDate}
                onEndDate={setEndDate}
                onReset={reset}
              />
            </Grid>
          )}
          <Grid item xs={12} md={id ? 12 : 6}>
            <FormMenu
              startDate={startDate}
              endDate={endDate}
              onReset={handleReset}
              onReload={onReload}
            />
          </Grid>
        </Grid>
      </Box>

      {/* bulupload download */}
      <Dialog
        open={open}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Bulk Upload
          <IconButton
            aria-label="close"
            onClick={() => handleClose()}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DragAndDropFile handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessDetailsIndex;
