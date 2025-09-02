import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const RHFDatePicker = ({
  name,
  control,
  minDate = null, // Default to null if not provided
  maxDate = null, // Default to null if not provided
  label = "",
  defaultValue = null,
  format = "DD/MM/YYYY",
  sx = {},
  size = "small",
  disabled = false,
}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            label={label}
            format="DD-MM-YYYY"
            views={['year', 'month', 'day']}
            value={field.value ? dayjs(field.value) : null} // Convert to Dayjs format
            onChange={(date) => field.onChange(date ? date.toISOString() : null)} // Handle null values
            inputFormat={format}
            disabled={disabled}
            minDate={minDate ? dayjs(minDate) : undefined}
            maxDate={maxDate ? dayjs(maxDate) : undefined} 
            sx={{ "& .MuiInputBase-root": { height: "40px", backgroundColor: "white" }, width:'100%'}}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size={size}
                sx={{
                  ...sx,
                  "& .MuiInputBase-root": { height: "40px", backgroundColor: "white" },
                }}
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};

// Prop Validation
RHFDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  format: PropTypes.string,
  sx: PropTypes.object,
  size: PropTypes.string,
  disabled: PropTypes.bool, // Corrected to `bool`
};

// Default Props
RHFDatePicker.defaultProps = {
  label: "",
  defaultValue: null,
  format: "DD/MM/YYYY",
  sx: {},
  size: "small",
  disabled: false,
};

export default RHFDatePicker;
