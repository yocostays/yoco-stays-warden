import { Box } from '@mui/material'
import React from 'react'
import EmergencyCharts from './components/EmergencyCharts'
import EmergencyTable from './components/EmergencyTable'

const EmergencyIndex = () => {
  return (
    <Box  sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}>
        <EmergencyCharts/>
        <EmergencyTable/>
    </Box>
  )
}

export default EmergencyIndex
