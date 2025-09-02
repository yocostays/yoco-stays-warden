/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
  IconButton,
  CardContent,
} from "@mui/material";
import TableLoader from "../../../../../components/tableLoader/TableLoader";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import VehicleDetailCard from "./tabCards/VehicleDetailCard";
import HostelDetailCard from "./tabCards/HostelDetailCard";
import FamilyDetailsCard from "./tabCards/FamilyDetailsCard";
import IndisciplinaryDetailsCard from "./tabCards/IndisciplinaryDetailsCard";
import KycDetailCards from "./tabCards/KycDetailCards";

const HostelDetails = ({
  profileData,
  // onEdit,
  // onDelete,
  onDownload,
  title,
  isLoading,
  tabType,
  onReload,
  pagePermission,
  selectedTab,
}) => {
  const {
    image,
    name,
    email,
    documents,
    vechicleDetails,
    indisciplinaryActions = [],
    kycDocuments,
  } = profileData;

  const navigate = useNavigate();



  const handleBack = () => {
    navigate("/user-management");
  };

  return (
    <>
      <Card sx={{ borderRadius: 3 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: `${tabType === "hostel" ? "#907FD5" : "#ECE0FF"}`,
            p: 2,
            borderRadius: "8px 8px 0 0",
            border: `${tabType !== "hostel" ? "2px solid #907FD5" : "none"}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              gap: 3,
            }}
          >
            <IconButton
              color="primary"
              sx={{ color: `${tabType === "hostel" ? "#ECE0FF" : "#000"}` }}
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              fontSize={"18px"}
              fontWeight="bold"
              color={tabType === "hostel" ? "#ECE0FF" : "#000"}
              my={"auto"}
            >
              {title}
            </Typography>
          </Box>
          {/* <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "30px", display: `${pagePermission?.edit === false ? 'none': 'block'}` }}
          >
            Edit
          </Button> */}
        </Box>
        <CardContent
          sx={{
            borderRadius: "0 0 8px 8px",
            borderBottom: "2px solid #B4B4B4",
            borderLeft: "2px solid #B4B4B4",
            borderRight: "2px solid #B4B4B4",
          }}
        >
          <>
            {isLoading ? (
              <TableLoader />
            ) : (
              <>
                {/* Profile Details */}
                <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mr: 2 }}
                    alt={name}
                    src={image}
                  />
                  <Box>
                    <Typography
                      fontSize={"16px"}
                      textTransform={"capitalize"}
                      fontWeight={700}
                    >
                      {name}
                    </Typography>
                    <Typography fontSize={13} color="textSecondary">
                      {email}
                    </Typography>
                  </Box>
                </Box>

                {/* Information Grid */}
                <Grid container spacing={2} sx={{ p: 2 }}>
                  {tabType === "hostel" ? (
                    <HostelDetailCard
                      profileData={profileData}
                      selectedTab={selectedTab}
                    />
                  ) : tabType === "family" ? (
                    <FamilyDetailsCard
                      profileData={profileData}
                      selectedTab={selectedTab}
                    />
                  ) : tabType === "kyc" ? (
                    <KycDetailCards
                      pagePermission={pagePermission}
                      kycDocuments={kycDocuments}
                      documents={documents}
                      onReload={onReload}
                    />
                  ) : tabType === "indisciplinary" ? (
                    <IndisciplinaryDetailsCard
                      indisciplinaryActions={indisciplinaryActions}
                      pagePermission={pagePermission}
                      onReload={onReload}
                    />
                  ) : (
                    <Box paddingX={3}>
                      <VehicleDetailCard vechicleDetails={vechicleDetails} />
                    </Box>
                  )}
                </Grid>

                {/* Download Button */}
                <Box
                  sx={{ p: 2, display: `${tabType === "kyc" ? "none" : ""}` }}
                >
                  <Button
                    variant="contained"
                    onClick={onDownload}
                    sx={{
                      backgroundColor: "#673D9F",
                      "&:hover": {
                        backgroundColor: "#533c80", // Optional: Adjust hover color if desired
                      },
                      borderRadius: "30px",
                      textTransform: "none",
                    }}
                  >
                    Download PDF
                  </Button>
                </Box>
              </>
            )}
          </>
        </CardContent>
      </Card>
    </>
  );
};

export default HostelDetails;
