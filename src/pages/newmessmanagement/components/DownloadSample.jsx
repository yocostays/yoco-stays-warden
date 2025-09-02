import { sampleFileDownloadAsync } from "@features/users/userApi";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DownloadSample = () => {
  const dispatch = useDispatch();

  const handleDownloadSampleFile = async () => {
    try {
      const res = await dispatch(sampleFileDownloadAsync({ type: "meal" }));
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
      console.error(error);
      toast.error("Failed to download the file.");
    }
  };

  return (
    <div>
      <Button
        iconPosition="start"
        variant="contained"
        onClick={handleDownloadSampleFile}
        sx={{ borderRadius: "10px", textTransform: "none" }}
      >
        Generate
      </Button>
    </div>
  );
};

export default DownloadSample;
