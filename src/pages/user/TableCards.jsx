import styled from "@emotion/styled";
import { updateStaffStatusAsync } from "@features/users/userSlice";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Switch,
  capitalize,
  Stack,
} from "@mui/material";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 30, // Smaller width
  height: 12, // Smaller height
  padding: 0,
  overflow: "visible",
  "& .MuiSwitch-switchBase": {
    padding: 1, // Adjust padding
    margin: 1, // Adjust margin for better alignment
    top: -2, // Adjust position for smaller size
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(14px)", // Adjust to fit smaller size
      color: "#36F112",
      "& .MuiSwitch-thumb": {
        backgroundColor: "#36F112", // Green color for checked state
        width: 16, // Smaller thumb size
        height: 16,
      },
      "& + .MuiSwitch-track": {
        backgroundColor: "#DEDEDE",
        opacity: 1,
        boxShadow: "inset 0 2px 1px rgba(0, 0, 0, 0.2)", // Subtle shadow
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "4px solid #fff", // Reduced border size
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[200],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.5,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16, // Thumb size for default state
    height: 16,
    backgroundColor: "#f28c28",
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    height: 17, // Track height
    backgroundColor: "#E0E0E0", // Default track color
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

TableCards.propTypes = {
  staffList: PropTypes.arrayOf(PropTypes.object),
  handleRowDetailsPage: PropTypes.func,
  handleToGetStaffDetails: PropTypes.func,
};

export default function TableCards({
  staffList,
  handleRowDetailsPage,
  handleToGetStaffDetails,
}) {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    if (staffList?.length > 0) {
      const initialStatuses = staffList.reduce((acc, staff) => {
        acc[staff?._id] = !!staff.status; // Force the status to be a boolean
        return acc;
      }, {});
      setStatuses(initialStatuses);
    }
  }, [staffList]); // Update when staffList changes

  // Handle toggle switch
  const handleToggle = (id) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: !prevStatuses[id], // Toggle the boolean value
    }));

    const payload = {
      staffId: id,
    };

    dispatch(updateStaffStatusAsync(payload)).then((response) => {
      if (response.payload.statusCode === 200) {
        toast.success(response.payload.message);
        handleToGetStaffDetails();
      }
    });
  };

  const groupedStaff = staffList?.reduce((acc, card) => {
    if (!acc[card.role]) {
      acc[card.role] = [];
    }
    acc[card.role].push(card);
    return acc;
  }, {});

  return (
    <Box>
      {/* {staffList.length > 0 ? ( */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: 2,
          paddingBottom: "100px",
          borderBottom: "2px solid #E0E0E0",
          borderRadius: "0 0 8px 8px",
          position: "relative",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            width: "2px",
            background: "linear-gradient(to bottom, #674D9F, transparent)",
          },
          "&::before": {
            left: 0,
            top: 0,
            height: "100%",
          },
          "&::after": {
            right: 0,
            top: 0,
            height: "100%",
          },
        }}
      >
        {staffList.length > 0 ? (
          Object.keys(groupedStaff).map((role) => (
            <Box key={role}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {capitalize(role)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {groupedStaff[role]?.map((card, index) => (
                  <Box
                    key={card.id}
                    sx={{
                      width: 200,
                      border: "1px solid #E0E0E0",
                      borderRadius: "20px",
                      textAlign: "center",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      paddingBottom: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #E0E0E0",
                        paddingBottom: 0,
                        marginBottom: 2,
                        padding: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
                        {capitalize(card.role)}{" "}
                        {index >= 0 && index <= 9
                          ? `0${index + 1}`
                          : `${index + 1}`}
                      </Typography>
                      {/* <IOSSwitch defaultChecked /> */}
                      <IOSSwitch
                        checked={statuses[card?._id]}
                        onChange={() => handleToggle(card?._id)}
                      />
                    </Box>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        margin: "0 auto",
                        backgroundColor: "#674D9F",
                      }}
                      src={card?.image || undefined}
                    >
                      {card?.image
                        ? card?.image
                        : card?.name?.charAt(0).toUpperCase()}{" "}
                    </Avatar>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginTop: 1,
                      }}
                    >
                      {card.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "#757575" }}>
                      {card.code}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: "#757575",
                        marginBottom: 2,
                      }}
                    >
                      +91 {card.phone}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#674D9F",
                        borderRadius: "20px",
                        color: "#674D9F",
                        textTransform: "none",
                        fontWeight: "bold",
                        ":hover": {
                          backgroundColor: "#f7f0ff",
                          borderColor: "#674D9F",
                        },
                      }}
                      onClick={() => handleRowDetailsPage(card?._id)}
                    >
                      View Profile
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
          ))
        ) : (
          <Stack direction="column" alignItems="center" spacing={1} mt={8}>
            <Typography variant="h6" color="textSecondary">
              <NoDataAvailable />
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
