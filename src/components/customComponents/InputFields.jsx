import { Box, TextField, InputAdornment, MenuItem } from '@mui/material'
import react from 'react'


const Input = ({
    placeholder = "Enter text...",
    phoneCode,
    type,
    onChange,
    register,
    name,
    error,
    ...rest 
}) => {

    return (
        <>
            <TextField
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                variant="outlined"
                size="small"
                {...register?.(name)}
                {...rest}
                InputProps={
                    phoneCode
                        ? {
                            startAdornment: (
                                <InputAdornment position="start">
                                    {phoneCode}
                                </InputAdornment>
                            ),
                        }
                        : {}
                }
                sx={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "5px",
                    // outline:error ? "1px solid red" : "",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "5px",
                        padding: "0px 6px", // ✅ Compact Padding
                        "& input": {
                            padding: "6px 4px", // ✅ Smaller inner padding
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

            />
            {error && <Box sx={{
                fontSize: "12px",
                color: "red",
                margintTop: "7px",
                paddingTop: "5px"
            }} >{error}</Box>}

        </>
    )
}

export default Input