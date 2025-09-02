import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const FormLabel = ({ label, required = false }) => {
  return (
    <Typography variant="body1" fontSize="16px">
      {label}
      {required && <span style={{ color: "red" }}>*</span>}
    </Typography>
  );
};

FormLabel.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default FormLabel;