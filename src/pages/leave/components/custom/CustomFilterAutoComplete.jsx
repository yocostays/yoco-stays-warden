import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const CustomAutocomplete = ({ options, value, onChange, placeholder }) => {
  return (
    <Autocomplete
      size="small"
      disableClearable
      clearOnEscape={false}
      options={options}
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder || "Select"}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            readOnly: true,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              textTransform: "capitalize",
              fontWeight: 500,
              borderRadius: "3px",
              px: 1,
              borderWidth: "2px",
              borderStyle: "solid",
              boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.15)",
              borderImage: "linear-gradient(180deg, #674D9F, #FDFAFF) 1",
              backgroundColor: "#fff",
              fontSize: "14px",
              width: "160px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      )}
      ListboxProps={{
        sx: {
          fontSize: "13px", // Set font size for the options
          overflow: "hidden", // Remove scrollbar
          // minHeight: "325px", // Set a fixed height for the dropdown list
        },
      }}
      fullWidth
    />
  );
};

CustomAutocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CustomAutocomplete;
