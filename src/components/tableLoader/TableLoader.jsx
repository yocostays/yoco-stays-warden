import { Box, CircularProgress } from '@mui/material'

export default function TableLoader({height="328px",...rest}) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: height,
            rest
        }}>
            <CircularProgress />
        </Box>
    )
}
