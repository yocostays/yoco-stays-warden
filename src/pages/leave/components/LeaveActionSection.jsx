import PropTypes from "prop-types";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  bulkUpdateStatus,
  getLeaveManagementList,
} from "@features/leave/leaveSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const LeaveActionSection = ({
  selectedCount,
  remarkPlaceholder = "Add Remark",
  selectedRows,
  onClearSelection,
  currentPage,
  currentRowsPerPage,
  currentSelectedOption,
  currentSelectedTab,
  currentSearchText,
  currentSortOption,
  currentSelectedFloor,
  currentSelectedRoom,
  currentCustomStartDate,
  currentCustomEndDate,
}) => {
  const dispatch = useDispatch();
  const [remark, setRemark] = useState("");

  const checkRemark = !remark?.length > 0;

  const onAddRemark = (e) => {
    setRemark(e.target.value);
  };

  const handleAction = (status) => {
    if (!selectedRows || selectedRows.length === 0) {
      console.error("No rows selected.");
      return;
    }

    const payload = {
      leaves: selectedRows.map((leaveId) => ({
        leaveId,
        status,
        remark,
      })),
    };

    dispatch(bulkUpdateStatus({ data: payload })).then((response) => {
      if (response?.meta?.requestStatus === "fulfilled") {
        toast.success(response.payload.message);
        // Clear the selection
        if (onClearSelection) {
          onClearSelection();
        }
        // Call the leave-management API to refresh the data
        console.log("Calling leave-management API for bulk update");
        const refreshPayload = {
          page: currentPage + 1,
          limit: currentRowsPerPage,
          status: currentSelectedOption === "Leave Request" ? "leave" : currentSelectedOption,
          leaveStatus: currentSelectedTab.toLowerCase(),
          search: currentSearchText,
        };

        // Add optional parameters if they exist
        if (currentSortOption && currentSortOption !== "custom") {
          refreshPayload.sort = currentSortOption;
        }
        if (currentSortOption === "custom") {
          refreshPayload.sort = "custom";
          if (currentCustomStartDate) {
            refreshPayload.startDate = dayjs(currentCustomStartDate).utc(true).startOf("day").toISOString();
          }
          if (currentCustomEndDate) {
            refreshPayload.endDate = dayjs(currentCustomEndDate).utc(true).startOf("day").toISOString();
          }
        }
        if (currentSelectedFloor) {
          refreshPayload.floorNumber = currentSelectedFloor;
        }
        if (currentSelectedRoom) {
          refreshPayload.roomNumber = currentSelectedRoom.roomNumber;
        }

        dispatch(getLeaveManagementList(refreshPayload));
      } else if (response?.meta?.requestStatus === "rejected") {
        console.error(
          "Failed to update leave status:",
          response.payload.message
        );
        toast.error("Failed to update leave status.");
      }
    });
  };

  return (
    <Box display="flex" alignItems="center" gap={2} marginLeft="4">
      <Typography variant="body2">Action: {selectedCount} Selected</Typography>
      <TextField
        variant="outlined"
        placeholder={remarkPlaceholder}
        sx={{
          backgroundColor: "#FFF3CD",
          color: "#9E9E9E",
          borderRadius: "10px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { border: "none" },
            height: "40px",
            padding: "0 12px",
            fontSize: "12px",
            fontWeight: 500,
          },
          "& .MuiOutlinedInput-root:hover": {
            backgroundColor: "#FFEB3B",
          },
          "& .MuiInputBase-input": {
            color: "#333",
            padding: "4px 8px",
          },
        }}
        onChange={onAddRemark}
      />
      <Button
        disabled={checkRemark}
        variant="outlined"
        sx={{
          textTransform: "none",
          border: "3px solid #C3E6CB",
          color: "#155724",
          borderRadius: "60px",
          "&:hover": { backgroundColor: "#C3E6CB" },
        }}
        onClick={() => handleAction("approved")}
      >
        Approve
      </Button>
      <Button
        disabled={checkRemark}
        variant="outlined"
        sx={{
          textTransform: "none",
          border: "3px solid #F5C6CB",
          color: "#721C24",
          borderRadius: "60px",
          "&:hover": { backgroundColor: "#F8D7DA" },
        }}
        onClick={() => handleAction("rejected")}
      >
        Reject
      </Button>
    </Box>
  );
};

// PropTypes for validation
LeaveActionSection.propTypes = {
  selectedCount: PropTypes.number.isRequired, // Number of selected items
  remarkPlaceholder: PropTypes.string, // Placeholder for the remark field
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired, // Array of selected row IDs
};

export default LeaveActionSection;
