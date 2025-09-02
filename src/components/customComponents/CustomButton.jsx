import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  startIcon: PropTypes.node, // Use node for React components or elements
  endIcon: PropTypes.node,
};

export default function CustomButton({ onClick, startIcon, endIcon }) {
  return (
    <Box
      display="flex"
      sx={{ justifyContent: { xs: "center", sm: "flex-end" } }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        startIcon={startIcon ? startIcon : null} // Directly pass the prop without wrapping in JSX
        endIcon={endIcon ? endIcon : null} // Directly pass the prop without wrapping in JS
      >
        Add Menu
      </Button>
    </Box>
  );
}

