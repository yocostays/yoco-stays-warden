import { Box, CircularProgress } from '@mui/material'

export default function TableLoader() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '328px',
        }}>
            <CircularProgress />
        </Box>
    )
}
