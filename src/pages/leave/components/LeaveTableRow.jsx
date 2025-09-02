import PropTypes from "prop-types";
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Box,
  Avatar,
  Typography,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import moment from "moment";
import ProfilePopOver from "./tableComponent/ProfilePopOver";
import Edit from "@assets/images/edit_square.svg";
import NoDataAvailable from "./table/NoDataAvailable";

const LeaveTableRow = ({
  leaveManagementList,
  isRowSelected,
  handleRowSelect,
  handleMouseEnter,
  handleMouseLeave,
  profilePopoverAnchor,
  hoveredRowId,
  handleRowDetailsPage,
}) => {
  return (
    <TableBody sx={{ borderTop: "2px solid #674D9F" }}>
      {leaveManagementList?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={9} align="center">
            <Typography variant="h6" color="textSecondary">
              <NoDataAvailable />
            </Typography>
          </TableCell>
        </TableRow>
      ) : (
        leaveManagementList?.map((row) => (
          <TableRow
            key={row?._id}
            hover
            sx={{
              transition: "box-shadow 0.4s, transform 0.4s",
              "&:hover": {
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transform: "scale(1)",
              },
            }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                checked={isRowSelected(row._id)}
                onChange={(event) => handleRowSelect(event, row?._id)}
                disabled={
                  row?.leaveStatus === "approved" ||
                  row?.leaveStatus === "rejected"
                }
              />
            </TableCell>

            <TableCell sx={{ minWidth: "110px" }}>
              {row?.uniqueId || "-"}
            </TableCell>
            <TableCell sx={{ minWidth: "180px" }}>
              <Box
                display="flex"
                alignItems="center"
                onMouseEnter={(event) => handleMouseEnter(event, row._id)}
                onMouseLeave={handleMouseLeave}
              >
                <Avatar
                  sx={{ width: 30, height: 30, marginRight: 1 }}
                  src={row?.image}
                  alt={row?.name}
                >
                  {!row?.image && row?.name.charAt(0)}
                </Avatar>
                <Typography variant="body2" color="text.primary">
                  {row?.name || "-"}
                </Typography>
                <ProfilePopOver
                  profileView="leave"
                  isPopoverOpen={Boolean(profilePopoverAnchor)}
                  row={row}
                  profilePopoverAnchor={profilePopoverAnchor}
                  handleMouseLeave={handleMouseLeave}
                  hoveredRowId={hoveredRowId}
                />
              </Box>
            </TableCell>
            <TableCell sx={{ minWidth: "200px" }}>
              {moment.utc(row?.createdAt).format("Do MMM YYYY | hh:mm A") ||
                "-"}
            </TableCell>
            <TableCell sx={{ minWidth: "200px" }}>
              {moment.utc(row?.startDate).format("Do MMM YYYY | hh:mm A") ||
                "-"}
            </TableCell>
            <TableCell sx={{ minWidth: "200px" }}>
              {moment.utc(row?.endDate).format("Do MMM YYYY | hh:mm A") || "-"}
            </TableCell>
            <TableCell align="left">{row.days} D</TableCell>
            <TableCell>
              <Tooltip title={row.categoryName} arrow>
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: 180,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  }}
                >
                  {row.categoryName || "-"}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell sx={{ minWidth: 130 }}>
              {row?.floorNumber && row?.roomNumber
                ? `${row.floorNumber}/${row.roomNumber}`
                : "-"}
            </TableCell>
            <TableCell>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  padding: "2",
                  textTransform: "capitalize",
                  borderRadius: 20,
                  border: `1px solid ${
                    row.leaveStatus === "approved"
                      ? "#008000"
                      : row.leaveStatus === "Pending"
                      ? "#D2C43B"
                      : "#9A2500"
                  }`,
                  color:
                    row.leaveStatus === "approved"
                      ? "#008000"
                      : row.leaveStatus === "Pending"
                      ? "#D2C43B"
                      : "#9A2500",
                  bgcolor:
                    row.leaveStatus === "approved"
                      ? "#AECAAA"
                      : row.leaveStatus === "Pending"
                      ? "#FDFAE1"
                      : "#FC8D62",
                }}
              >
                {row.leaveStatus}
              </Button>
            </TableCell>
            <TableCell align="right">
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
      )}
    </TableBody>
  );
};

LeaveTableRow.propTypes = {
  leaveManagementList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      reason: PropTypes.string,
      floorNumber: PropTypes.string,
      roomNumber: PropTypes.string,
      leaveStatus: PropTypes.oneOf(["Active", "Pending", "Rejected"])
        .isRequired,
    })
  ).isRequired,
  isRowSelected: PropTypes.func.isRequired,
  handleRowSelect: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  profilePopoverAnchor: PropTypes.object,
  hoveredRowId: PropTypes.string,
  handleRowDetailsPage: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LeaveTableRow;
