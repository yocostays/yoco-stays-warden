import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PropTypes from 'prop-types';
import { Box, Button, TextField, Select, MenuItem, Typography, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { changeLeaveStatusById, getLeaveDataById } from "@features/leave/leaveSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

// Yup validation schema
const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  remark: Yup.string().required("Remark is required"),
});

const LeaveStatusChangeForm = ({ rowId, statusOptions, leaveStatus, wardenRemark, pagePermission }) => {

  const dispatch = useDispatch();

  const { handleSubmit, setValue, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema), // apply Yup validation schema
    defaultValues: {
      status: leaveStatus || "",
      remark: wardenRemark || "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    const payload = {
      status: data?.status,
      remark: data?.remark,
    };

    // Dispatch the thunk with both the payload and the rowId
    dispatch(changeLeaveStatusById({ data: payload, id: rowId }))
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          toast.success(response.payload.message);
          dispatch(getLeaveDataById(rowId))
        } else if (response?.meta?.requestStatus === "rejected") {
          console.error('Failed to update leave status:', response.error.message);
        }
      })
      .catch((error) => {
        console.error('Error during leave status update:', error);
      });
  };


  // Handle reset action
  const handleReset = () => {
    setValue('status', leaveStatus);
    setValue('remark', '');
    // reset(); // Reset the form to its default values
  };


  const getDisabledStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case statusOptions.PENDING:
        // When the status is "Pending", no options are disabled
        return [];

      case statusOptions.APPROVED:
        // When the status is "Approved", disable "Pending" and "Rejected"
        return [statusOptions.PENDING, statusOptions.REJECTED, statusOptions.CANCELLED];

      case statusOptions.REJECTED:
        // When the status is "Rejected", disable "Pending" and "Approved"
        return [statusOptions.PENDING, statusOptions.APPROVED, statusOptions.CANCELLED];

      case statusOptions.CANCELLED:
        // When the status is "Cancelled", disable "Pending" and "Approved"
        return [statusOptions.PENDING, statusOptions.APPROVED, statusOptions.REJECTED];

      default:
        // By default, no options are disabled
        return [];
    }
  };

  useEffect(() => {
    if (leaveStatus) {
      setValue('status', leaveStatus);
    }
    // Only set remark if wardenRemark is not empty
    if (wardenRemark) {
      setValue('remark', wardenRemark);
    } else {
      setValue('remark', ''); // Ensure remark is empty if no wardenRemark
    }
  }, [leaveStatus, wardenRemark, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          m: 2
        }}
      >

        <Stack sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: 'center', gap: 2, }}>
          <Typography fontSize="14px" sx={{ color: "#1C0D29", fontWeight: "bold" }}>
            Status :
          </Typography>

          <Box
            rowGap={3}
            columnGap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Stack >
              <Controller
                name="status"
                control={control}
                defaultValue="pending" // Set default to "Pending"
                render={({ field }) => {
                  const disabledOptions = leaveStatus && getDisabledStatusOptions(leaveStatus); // Get disabled options based on the current status

                  return (
                    <Select
                      {...field}
                      size="small"
                      fullWidth
                      sx={{
                        borderRadius: 20,
                        fontSize: 14,
                        border: "2px solid #E7E1B3",
                        color: 'warning',
                        backgroundColor: "#FDFAE1",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    >
                      {Object.keys(statusOptions).map((key) => {
                        const status = statusOptions[key];
                        const isDisabled = disabledOptions?.includes(status); // Disable the option if it's in the disabledOptions array

                        return (
                          <MenuItem sx={{fontSize:'14px'}} key={key} value={status} disabled={isDisabled}>
                            {status.charAt(0).toUpperCase() +
                              status.slice(1).replace(/_/g, " ")}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  );
                }}
              />

              {errors.status && (
                <span style={{ color: "red", fontSize: '12px', ml: 2 }}>{errors.status.message}</span>
              )}
            </Stack>

            <Controller
              name="remark"
              control={control}
              fontSize="14px"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Remark"
                  fontSize="14px"
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={!!errors.remark}
                  helperText={errors.remark ? errors.remark.message : ""}
                  sx={{
                    fontSize: 14,
                    backgroundColor: "#FDFAE1",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#E7E1B3",
                      },
                      "&:hover fieldset": {
                        borderColor: "#D2C43B",
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
        </Stack>



        {/* Submit and Reset buttons */}
        <Stack sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: 'center', gap: 2, }}>
          <Typography fontSize="14px" sx={{ color: "#1C0D29", fontWeight: "bold" }}>
            Action  :
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={leaveStatus === 'approved' || leaveStatus === 'rejected' || leaveStatus === 'cancelled' || pagePermission.edit === false}
              sx={{
                height: 30,
                backgroundColor: "#D6E4D4",
                color: "#000",
                borderRadius: "5px",
              }}
            >
              <Typography fontSize={'14px'}>Submit</Typography>
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              disabled={leaveStatus === 'approved' || leaveStatus === 'rejected' || leaveStatus === 'cancelled' || pagePermission?.edit === false}
              onClick={handleReset}
              sx={{
                height: 30,
                backgroundColor: "#EEDAD4",
                color: "#000",
                borderRadius: "5px",
              }}
            >
              <Typography fontSize={'14px'}>Reset</Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
    </form>
  );
};

export default LeaveStatusChangeForm;


LeaveStatusChangeForm.propTypes = {
  rowId: PropTypes.string,
  leaveStatus: PropTypes.string,
  wardenRemark: PropTypes.string,
  statusOptions: PropTypes.array,
  pagePermission: PropTypes.object,
};