import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SelectBox = ({
    placeholder = "Select...",
    onChange,
    value = "",
    error,
    select = [],
    name,
    register,
    ...rest
}) => {
    return (
        <>
            <TextField
                select
                name={name}
                value={value ?? ""} // prevent undefined
                onChange={(e) => {
                    onChange(e.target.value); // lift value up
                }}
                variant="outlined"
                size="small"
                {...register?.(name)}
                {...rest}
                sx={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "5px",
                        padding: "0px 6px",
                        "& input": {
                            padding: "6px 4px",
                        },
                        "& fieldset": {
                            borderColor: "#BDBDBD",
                        },
                        "&:hover fieldset": {
                            borderColor: "#674D9F",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#674D9F",
                            borderWidth: "2px",
                        },
                    },
                }}
            >
                <MenuItem value="Select" disabled>
                    {placeholder || "Select"}
                </MenuItem>
                {select.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {error && (
                <Box sx={{ fontSize: "12px", color: "red", marginTop: "7px", paddingTop: "5px" }}>
                    {error}
                </Box>
            )}
        </>
    );
};

export default SelectBox;
