import * as React from "react";
import PropTypes from "prop-types";
import { Card, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createMessAPiAsync,
  getMessById,
  selectError,
  selectSubmitting,
  updateMessMealsAsync, // Import the update function from your slice or utils
} from "../../../../features/mess/messSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function FormMenu({ startDate, endDate, onReset, onReload }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [toDate, setToDate] = React.useState("DD-MM-YY");
  const [fromDate, setFromDate] = React.useState("DD-MM-YY");

  const [formData, setFormData] = React.useState({
    breakfast: "",
    lunch: "",
    snacks: "",
    dinner: "",
  });

  const [errors, setErrors] = React.useState({});
  const submitting = useSelector(selectSubmitting);
  const error = useSelector(selectError);
  const { messById } = useSelector((state) => state?.mess);

  // Fetch mess data if an ID is present
  React.useEffect(() => {
    if (id) {
      dispatch(getMessById(id));
    }
  }, [dispatch, id]);

  // Populate form data if mess data is available
  React.useEffect(() => {
    if (messById && id) {
      setFormData({
        breakfast: messById.breakfast || "",
        lunch: messById.lunch || "",
        snacks: messById.snacks || "",
        dinner: messById.dinner || "",
      });
      setFromDate(dayjs(messById.date).format("DD-MMM-YYYY"));
      setToDate(dayjs(messById.date).format("DD-MMM-YYYY"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messById]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.breakfast) tempErrors.breakfast = "Breakfast is required.";
    if (!formData.lunch) tempErrors.lunch = "Lunch is required.";
    if (!formData.snacks) tempErrors.snacks = "Snacks are required.";
    if (!formData.dinner) tempErrors.dinner = "Dinner is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (id) {
        // Update existing menu
        const updateData = {
          date: messById?.date,
          ...formData,
        };

        const resultAction = await dispatch(
          updateMessMealsAsync({ id, data: updateData })
        );

        if (updateMessMealsAsync.fulfilled.match(resultAction)) {
          toast.success(
            resultAction.payload.message || "Menu updated successfully!"
          );
          navigate(-1);
        } else {
          toast.error(resultAction.error.message || "Update failed!");
          console.error("Update error details:", resultAction.error);
        }
      } else {
        // Create new menu
        const newMessData = {
          fromDate: dayjs(startDate)
            .add(5, "hours")
            .add(30, "minutes")
            .toISOString(),
          toDate: dayjs(endDate)
            .add(5, "hours")
            .add(30, "minutes")
            .toISOString(),
          ...formData,
        };

        const resultAction = await dispatch(createMessAPiAsync(newMessData));

        if (createMessAPiAsync.fulfilled.match(resultAction)) {
          toast.success(
            resultAction.payload.message || "Menu added successfully!"
          );
          navigate(-1);
        } else {
          toast.error(resultAction.error.message || "Submission failed!");
        }
      }

      // Reset form after submission
      setFormData({
        breakfast: "",
        lunch: "",
        snacks: "",
        dinner: "",
      });
      setToDate("");
      setFromDate("");
      onReset?.();
      onReload?.();
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        id
          ? "An error occurred while updating the menu. Please try again."
          : "An error occurred while submitting the form."
      );
    }
  };

  React.useEffect(() => {
    if (startDate != null) {
      setFromDate(dayjs(startDate).format("DD-MMM-YYYY"));
    }
    if (endDate != null) {
      setToDate(dayjs(endDate).format("DD-MMM-YYYY"));
    }
  }, [endDate, startDate]);

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography sx={{ width: "100px", fontSize: "  14px" }}>
            Date
          </Typography>
          :
          <TextField
            size="small"
            fontSize={"14px"}
            value={`${fromDate} - ${toDate}`}
            disabled
            fullWidth
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography sx={{ width: "100px", fontSize: "14px" }}>
            Breakfast
          </Typography>
          :
          <TextField
            name="breakfast"
            value={formData.breakfast}
            onChange={handleChange}
            error={!!errors.breakfast}
            helperText={errors.breakfast}
            fullWidth
            size="small"
            fontSize={"14px"}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography sx={{ width: "100px", fontSize: "14px" }}>
            Lunch
          </Typography>
          :
          <TextField
            name="lunch"
            value={formData.lunch}
            onChange={handleChange}
            error={!!errors.lunch}
            helperText={errors.lunch}
            fullWidth
            size="small"
            fontSize={"14px"}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography sx={{ width: "100px", fontSize: "14px" }}>
            Snacks
          </Typography>
          :
          <TextField
            name="snacks"
            value={formData.snacks}
            onChange={handleChange}
            error={!!errors.snacks}
            helperText={errors.snacks}
            fullWidth
            size="small"
            fontSize={"14px"}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography sx={{ width: "100px", fontSize: "14px" }}>
            Dinner
          </Typography>
          :
          <TextField
            name="dinner"
            value={formData.dinner}
            onChange={handleChange}
            error={!!errors.dinner}
            helperText={errors.dinner}
            fullWidth
            size="small"
            fontSize={"14px"}
          />
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={submitting}
          >
            <Typography fontSize={"14px"}>
              {id ? "Update Menu" : "Add Menu"} {/* Conditional rendering */}
            </Typography>
          </LoadingButton>
        </Stack>

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Stack>
    </Card>
  );
}

FormMenu.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onReset: PropTypes.func,
  onReload: PropTypes.func,
};
