import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import PropTypes from "prop-types";

DisciplinaryActionTable.propTypes = {
  disciplinaryData: PropTypes.arrayOf(
    PropTypes.shape({
      reason: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function DisciplinaryActionTable({ disciplinaryData }) {
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
            In-disciplinary Actions
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
                  Reason
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5C5470" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {disciplinaryData?.length > 0 ? (
                disciplinaryData?.map((action, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f7f6fa" : "#FFFFFF", // Alternate row colors
                    }}
                  >
                    <TableCell>{action.reason}</TableCell>
                    <TableCell>{action.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor:
                            action.status === "Resolved"
                              ? "#D4EDDA"
                              : "#F8D7DA",
                          color:
                            action.status === "Resolved"
                              ? "#155724"
                              : "#721C24",
                          fontSize: "12px",
                          padding: "4px 8px",
                          textTransform: "none",
                          borderRadius: "12px",
                        }}
                      >
                        {action.status}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: "center" }}>
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
