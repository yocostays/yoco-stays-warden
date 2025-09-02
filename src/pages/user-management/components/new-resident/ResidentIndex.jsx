import * as React from "react";
import {
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import ResidentForm from "../new-resident/components/ResidentForm";
import StaffForm from "../new-resident/components/StaffForm";
import { useLocation } from "react-router-dom";

export default function ResidentIndex() {
  const [selection, setSelection] = React.useState("staff"); // Default selection can be "student" or "staff"
  const location = useLocation();
  const { staffEdit } = location.state || false;

  const handleChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 3,
      }}
    >
      {staffEdit != true && (
        <RadioGroup
          aria-label="role"
          name="role"
          value={selection}
          onChange={handleChange}
          sx={{ display: "flex", flexDirection: "row", gap: 2 }}
        >
          <FormControlLabel
            value="staff"
            control={<Radio sx={{ transform: "scale(0.9)" }} />}
            label={<Typography fontSize={14}>Staff</Typography>}
          />
          <FormControlLabel
            value="student"
            control={<Radio sx={{ transform: "scale(0.9)" }} />}
            label={<Typography fontSize={14}>Student</Typography>}
          />
        </RadioGroup>
      )}

      {/* // form selection based on the selected role */}
      {selection === "student" ? (
        <ResidentForm />
      ) : (
        <StaffForm isEdit={staffEdit} />
      )}
    </Box>
  );
}
