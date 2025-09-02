import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PropTypes from "prop-types";
import Iconify from "@components/iconify/iconify";

StudentAcademicDetails.propTypes = {
  studentDetail: PropTypes.object.isRequired,
};

export default function StudentAcademicDetails({ studentDetail }) {


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box
        sx={{
          textAlign: "left",
          marginLeft: "55px",
          paddingTop: "59px",
          [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            paddingTop: "30px",
            paddingX: "16px",
          },
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            textAlign: "left",
            marginLeft: "19px",
            [theme.breakpoints.down("sm")]: {
              textAlign: "center",
              marginLeft: "0",
            },
          }}
        >
          Academic Details
        </Typography>
        <Box sx={{ marginLeft: isSmallScreen ? "0" : "10px" }}>
          <Box
            sx={{
              borderRadius: 1,
              backgroundColor: "#fff",
              maxWidth: "600px",
              ml: 0,
              [theme.breakpoints.down("sm")]: {
                maxWidth: "100%",
                marginBottom: "15px",
              },
            }}
          >
            <Box sx={{ mt: 3 }}>
              {[
                {
                  icon: <CalendarMonthIcon />,
                  label: "Academic Year",
                  value: studentDetail.academicYear,
                },
                {
                  icon: <EmailIcon />,
                  label: "College Name",
                  value: studentDetail.universityId?.name,
                },
                {
                  icon: <Iconify icon="fluent-mdl2:publish-course" width="24" height="24" />,
                  label: "Cource Name",
                  value: studentDetail?.courseId?.name,
                },
                {
                  icon: <HomeWorkIcon />,
                  label: "Semester",
                  value: studentDetail?.semester,
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: isSmallScreen
                      ? "40px auto"
                      : "40px 200px 10px 1fr",
                    alignItems: "center",
                    backgroundColor: index % 2 ? "#674D9F0D" : "transparent",
                    padding: "8px 16px",
                    gap: "8px",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>{item.icon}</Box>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                  {!isSmallScreen && (
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="body2" fontWeight="bold">
                        :
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                mt: 3,
                backgroundColor: "#674D9F0D",
                padding: "33px",
                borderRadius: "4px",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
