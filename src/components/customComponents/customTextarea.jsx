import { Box, TextareaAutosize } from '@mui/material'
import react from 'react'


const TextArea = ({
    errors,
    placeholder,
    register,
    name,
    onChange,
    value,
    ...rest
}) => {
    return (
        <>
            <TextareaAutosize
                // value={value}
                maxRows={4}
                aria-label="maximum height"
                placeholder={placeholder}
                {...register(name)}
                onChange={onChange}
                style={{
                    width: "100%",
                    height: "60px", // ✅ Set fixed height manually
                    resize: "none", // ✅ Disable user resizing
                    overflowY: "auto",     // ✅ Enable vertical scroll
                    overflowX: "hidden",   // 🔒 Prevent horizontal scroll
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                }}
                {...rest}
            />
            {errors && <Box sx={{
                fontSize: "12px",
                color: "red",
                margintTop: "7px",
                paddingTop: "5px"
            }} >{errors}</Box>}
        </>

    )
}

export default TextArea