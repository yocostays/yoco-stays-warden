import { Box } from '@mui/material'
import MaintenanceCharts from './components/MaintenanceCharts'
import MaintenanceTable from './components/MaintenanceTable'


const MaintenanceIndex = () => {
    
  return (
    <Box  sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
      }}>
        <MaintenanceCharts/>
        <MaintenanceTable/>
       
    </Box>
  )
}

export default MaintenanceIndex
