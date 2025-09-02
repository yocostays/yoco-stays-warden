import { Box } from '@mui/material'
import React from 'react'
import RoomChart from './components/RoomChart'
import AllocatedRooms from './components/AllocatedRooms'
import RoomChangeRequest from './components/RoomChangeRequest'

const RoomsBedIndex = () => {
  return (
    <Box sx={{ width: { md: `calc(100% - 270px)` },
    ml: { md: "270px", sm: 0 },}}>
      <RoomChart/>
      <AllocatedRooms/>
      <RoomChangeRequest/>
    </Box>
  )
}

export default RoomsBedIndex
