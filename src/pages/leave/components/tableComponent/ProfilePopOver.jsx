import PropTypes from "prop-types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePopOver = ({
  isPopoverOpen,
  row,
  profilePopoverAnchor,
  handleMouseLeave,
  hoveredRowId,
  profileView
}) => {
  const navigate = useNavigate();

  const anchorPosition = useMemo(() => {
    return profilePopoverAnchor?.getBoundingClientRect();
  }, [profilePopoverAnchor]);

  const handleViewProfile = () => {
    localStorage.setItem('profileView', profileView ?? "user");
    navigate(`/users/student/details/${row.userId}`);
  };

  return (
    <>
      {isPopoverOpen && hoveredRowId === row._id && anchorPosition && (
        <Box
          sx={{
            position: "absolute",
            left: "235px",
            zIndex: 100,
            backgroundColor: "white",
            border: "1px solid grey",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            padding: 2,
            width: "180px",
          }}
          onMouseLeave={handleMouseLeave} // Close popover on mouse leave
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={row.image}
              alt={row.name}
            >
              {!row?.image && row?.name?.charAt(0)}
            </Avatar>
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1" fontWeight="bold">
                {row.name || row.studentName || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {row.uniqueId || "Y12345"}
              </Typography>
            </Box>
          </Box>

          <Box textAlign="center" paddingBottom={3} pt={1}>
           {row.phone && <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <PhoneIcon fontSize="medium" />
              <Typography variant="body1">{row.phone || "-"}</Typography>
            </Box>}
            <Box paddingTop={2} marginBottom={-3}>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "20px",
                  borderColor: "#6A1B9A",
                  color: "#6A1B9A",
                  "&:hover": {
                    borderColor: "#9C4D97",
                    backgroundColor: "#F3E5F5",
                  },
                }}
                onClick={handleViewProfile} // Handle navigation on click
              >
                View Profile
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

ProfilePopOver.propTypes = {
  isPopoverOpen: PropTypes.bool.isRequired,
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string,
    name: PropTypes.string,
    studentName : PropTypes.string,
    image: PropTypes.string,
    uniqueId: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  profilePopoverAnchor: PropTypes.object,
  handleMouseLeave: PropTypes.func.isRequired,
  hoveredRowId: PropTypes.string,
  profileView: PropTypes.string,
};

export default ProfilePopOver;
