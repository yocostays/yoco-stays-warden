import { Box } from '@mui/material'
import React from 'react'
import VisitorsCharts from './components/VisitorsCharts'
import VisitorsTable from './components/VisitorsTable'

const VisitorsIndex = () => {
  return (
    <Box  sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}>
        <VisitorsCharts/>
        <VisitorsTable/>
    </Box>
  )
}

export default VisitorsIndex
