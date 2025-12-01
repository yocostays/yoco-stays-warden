import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Edit from "@assets/images/edit_square.svg";
import moment from "moment";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import PropTypes from "prop-types";



const UserTableRow = ({
  leaveManagementList,
  isRowSelected,
  handleRowSelect,
  handleRowDetailsPage,
}) => {
  return (
    <TableBody
      sx={{
        borderTop: "2px solid #674D9F",
        width: "100%", // Ensure the table takes full width on large screens
        maxWidth: "100vw", // Prevent overflow on very large screens
      }}
    >
      {leaveManagementList?.length > 0 ? (
        leaveManagementList?.map((row) => (
          <TableRow
            key={row?.uniqueId}
            hover
            sx={{
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transform: "translateZ(0)", // Prevent layout shifts
              },
            }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                checked={isRowSelected(row?._id)}
                onChange={(event) => handleRowSelect(event, row._id)} // Trigger row select/deselect
              />
            </TableCell>
            <TableCell
              sx={{
                width: "fit-content",
                whiteSpace: "nowrap", // Optional: prevents text wrapping
                padding: "8px" // Optional: adjust padding as needed
              }}
            >{row.uniqueId || "-"}</TableCell>
            <TableCell
              sx={{
                alignContent: "center",
                width:"12rem",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
              >
                <Avatar
                  sx={{ width: 30, height: 30, marginRight: 1 }}
                  alt={row.name}
                  src={row.image}
                >
                  {row?.name?.charAt(0) || 'U'}
                </Avatar>
                <Typography variant="body2" color="text.primary">
                  {row.name || "-"}
                </Typography>
              </Box>
            </TableCell>
            {/* <TableCell>{row.email || "-"}</TableCell> */}
            <TableCell
              align="center"
            >{row.phone || "-"}</TableCell>
            <TableCell
              sx={{
                textAlign: "center"
              }}
            >{`${row.floorNumber || 0}/${row.roomNumber || 0}`}</TableCell>
             <TableCell
              align="center"
            >{row.bedNumber || "-"}</TableCell>
            <TableCell 
           align="center"
            >
              {row.joiningDate
                ? moment.utc(row.joiningDate).format("DD MMM, YYYY")
                : "-"}
            </TableCell>
            <TableCell 
            align="center"
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  padding: "2",
                  textTransform: "capitalize",
                  borderRadius: 20,
                  border: `1px solid ${row.userStatus === "active"
                    ? "#008000"
                    : row.userStatus === "inactive"
                      ? "#D2C43B"
                      : "#9A2500"
                    }`,
                  color:
                    row.userStatus === "active"
                      ? "#008000"
                      : row.userStatus === "inactive"
                        ? "#D2C43B"
                        : "#9A2500",
                  bgcolor:
                    row.userStatus === "active"
                      ? "#AECAAA"
                      : row.userStatus === "inactive"
                        ? "#FDFAE1"
                        : "#FC8D62",
                }}
              >
                {row.userStatus}
              </Button>
            </TableCell>
            <TableCell align="center">
              <IconButton onClick={() => handleRowDetailsPage(row?._id)}>
                <Box
                  component="img"
                  src={Edit}
                  alt="Edit"
                  sx={{
                    width: 20,
                    height: 20,
                    objectFit: "cover",
                  }}
                />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={9} align="center">
            <Typography variant="h6" color="textSecondary">
              <NoDataAvailable />
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default UserTableRow;

UserTableRow.propTypes = {
  leaveManagementList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRowSelected: PropTypes.func.isRequired,
  handleRowSelect: PropTypes.func.isRequired,
  handleRowDetailsPage: PropTypes.func.isRequired,
};
