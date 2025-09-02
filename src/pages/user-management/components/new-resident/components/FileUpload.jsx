import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomFileUpload from "../../../../../components/customComponents/CustomFileUpload";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUniversityList } from "@features/university/universitySlice";
import PropTypes from "prop-types";

const FileUpload = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [universityId, setUniversityId] = useState("");
  const { universityList } = useSelector((state) => state.university);

  const handleFileSelect = (file) => {
    setFileData(file);
  };

  const handleBulkUpload = async () => {
    if (!fileData) {
      toast.error("Please select file");
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    const file = fileData;
    data.append("file", file);
    data.append("universityId", universityId?._id);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/bulk-upload`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `${localStorage?.getItem("authToken")}`,
          },
        }
      );
      if (response?.data?.statusCode === 200) {
        toast.success(response?.data?.message);
        setIsLoading(false);
        setOpen(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getUniversityList());
  }, [dispatch]);

  return (
    <Box paddingX={5} paddingY={2} sx={{ display:'flex' , flexDirection:'column', gap: 2}}>
      <Autocomplete
        size="small"
        value={universityId}
        options={universityList}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option._id === value?._id}
        onChange={(e, value) => {
          setUniversityId(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select a University" />
        )}
      />

      <CustomFileUpload
        onFileSelect={handleFileSelect}
        accept=".xls,.xlsx,.doc,.docx,.csv"
      />
      <Box paddingY={2} display="flex" justifyContent="flex-end">
        <LoadingButton
          loading={isLoading}
          onClick={() => handleBulkUpload()}
          variant="contained"
          size="small"
        >
          Upload
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default FileUpload;

FileUpload.propTypes={
  setOpen: PropTypes.func.isRequired,
}