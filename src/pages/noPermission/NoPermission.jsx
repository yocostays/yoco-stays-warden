import { Typography, Box } from "@mui/material"

const NoPermission = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                    width: "100%",
                }}>
                <Typography variant="h4" fontWeight={600}>No permissions Provided</Typography>
            </Box>
        </>
    )
}

export default NoPermission
