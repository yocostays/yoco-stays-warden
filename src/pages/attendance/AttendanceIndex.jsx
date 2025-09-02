import { Box } from '@mui/material'
import React from 'react'
import AttendanceCharts from './components/AttendanceCharts'
import AttendanceTable from './components/AttendanceTable'

const AttendanceIndex = () => {
  return (
    <Box 
    sx={{ width: { md: `calc(100% - 270px)` },
    ml: { md: "270px", sm: 0 },}}
    >
        <AttendanceCharts/>
        <AttendanceTable/>
    </Box>
  )
}

export default AttendanceIndex
