import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import HostelDetails from "./HostelDetails.jsx";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStaffDetails,
  getUsersDetail,
} from "../../../../../features/users/userSlice.jsx";
import axios from "axios";

const FetchUserTypes = {
  "Hostel Details": "hostel",
  "Family/Personal Details": "family",
  "Upload KYC Documents": "kyc",
  "Report of Indisciplinary Actions": "indisciplinary",
  "Vehicle Detail": "vehicle",
};

const Details = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { userId } = useParams(); // Student ID from the path
  const dispatch = useDispatch();
  const { userDetail, loading, error, staffDetails } = useSelector((state) => state?.users); // Catch error in state if possible
  const [tabType, setTabType] = useState(FetchUserTypes["Hostel Details"]);
  const [reload, setReload] = useState(false);

  const location = useLocation();
  const { pagePermission, selectedTab } = location.state || {};

  localStorage.setItem("studentId", userId);

  const handleReload = () => {
    setReload(true);
  };

  const handleTabChange = (index, label) => {
    setActiveTab(index);
    const enumValue = FetchUserTypes[label];
    setTabType(enumValue);
  };

  const handleEdit = () => {
    alert("Edit button clicked");
  };

  // const handleDelete = () => {
  //   alert("Delete button clicked");
  // };

  const handleDownload = async () => {
    const url =
      `${import.meta.env.VITE_API_BASE_URL}/api/user-report/export-details`;
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authorization token found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        url,
        {
          type: tabType, // Use the current tabType
          studentId: userId, // Use the studentId from the path
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", // Expect a blob response (PDF)
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Instead of downloading, open the PDF in a new browser tab
      window.open(downloadUrl);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error(
        "Error downloading the PDF:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          type: tabType, // Use the current tabType
          studentId: userId, // Use the studentId from the path
        };
        await dispatch(getUsersDetail(data)); // Dispatch request for user details
        if (reload) {
          await dispatch(getUsersDetail(data)); // Refetch on reload
          setReload(false);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    const fetchStaff = async () => {
      try {
        const data = {
          type: tabType, // Use the current tabType
          staffId: userId, // Use the studentId from the path
        };
        await dispatch(getStaffDetails(data)); // Dispatch request for user details
        if (reload) {
          await dispatch(getStaffDetails(data)); // Refetch on reload
          setReload(false);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    
    if (selectedTab === "student") {
      fetchData();
    } else {
      fetchStaff();
    }
  }, [dispatch, reload, tabType, userId, selectedTab]);

  // Add loading state and error handling UI here if necessary
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        mt: 2,
      }}
    >
      <Box m={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {[
            "Hostel Details",
            "Family/Personal Details",
            "Upload KYC Documents",
            "Report of Indisciplinary Actions",
            "Vehicle Detail",
          ].map((label, index) => (
            <Button
              key={index}
              variant={activeTab === index ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleTabChange(index, label)}
              sx={{
                flexGrow: 1,
                fontSize: "12px",
                p: 2,
                textTransform: "none",
                width: {lg: "18%", sm: "30%"},
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Box>
          {error && <p>Error fetching data: {error.message}</p>}
          {[0, 1, 2, 3, 4].map(
            (tab, index) =>
              activeTab === index && (
                <HostelDetails
                  key={index}
                  title={Object.keys(FetchUserTypes)[index]}
                  profileData={selectedTab === 'student' ? userDetail : staffDetails}
                  onEdit={handleEdit}
                  // onDelete={handleDelete}
                  onDownload={handleDownload}
                  isLoading={loading}
                  tabType={tabType}
                  onReload={handleReload}
                  pagePermission={pagePermission}
                  selectedTab={selectedTab}
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
