import { Box } from '@mui/material'
import React from 'react'
import MessCards from '../components/Main/MessCards'
import MessTable2 from '../../mess-details/components/MessManagment/Table2'
import LikeDislikeCharts from './LikeDislikeCharts'

const LikeDislike = () => {
  return (
    <Box  sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 1,
      }}>
        <MessCards/>
        <LikeDislikeCharts/>
        <MessTable2/>
        <MessTable2/>
    </Box>
  )
}

export default LikeDislike
