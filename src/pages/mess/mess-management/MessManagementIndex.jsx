import { Box } from '@mui/material'
import ManagementDetails from './components/ManagementDetails'
import ManagementCharts from './components/ManagementCharts'

const MessManagementIndex = () => {
  return (
    <Box  sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}>
        <ManagementCharts/>
        <ManagementDetails/>
    </Box>
  )
}

export default MessManagementIndex
