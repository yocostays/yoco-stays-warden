import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
  capitalize,
} from "@mui/material";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import PropTypes from "prop-types";

VehicleDetailTabel.propTypes = {
  vechicleDetails: PropTypes.object.isRequired,
};

export default function VehicleDetailTabel({ vechicleDetails }) {

  console.log('vechicleDetails', vechicleDetails)

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box
        sx={{
          padding: "16px",
          borderRadius: "12px",
          marginRight: "15px",
          paddingTop: "90px",
          marginLeft: { xs: "10px", sm: "55px" }, // Adjust for small screens
        }}
      >
        <Box
          sx={{
            borderBottom: "2px solid #674D9F",
            backgroundColor: "#f7f6fa",
            paddingTop: "20px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 3,
              textAlign: "left",
              marginLeft: "19px",
              paddingBottom: "4px",
              display: "inline-block",
            }}
          >
            Vehicle Details
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            backgroundColor: "#f7f6fa",
            overflowX: "auto", // Make the table scrollable on small screens
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderBottom: "2px solid #674D9F",
                }}
              >
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Sr No
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Vehicle Number
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Vehile Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Engine Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Model Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vechicleDetails?.length > 0 ? (
                vechicleDetails?.map((action, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f7f6fa" : "#FFFFFF", // Alternate row colors
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{action?.vechicleNumber || '--'}</TableCell>
                    <TableCell>
                      {action?.vechicleType
                        ? capitalize(action?.vechicleType)
                        : "--"}
                    </TableCell>
                    <TableCell>
                      {action?.engineType
                        ? capitalize(action?.engineType)
                        : "--"}
                    </TableCell>
                    <TableCell>
                      {action?.modelName ? capitalize(action?.modelName) : "--"}
                    </TableCell>
                   
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            mt: 3,
            backgroundColor: "#674D9F0D",
            padding: "33px",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
