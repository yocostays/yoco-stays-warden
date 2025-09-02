import { Box } from '@mui/material'
import React from 'react'
import InventoryTabs from './components/InventoryTabs'

const InventoryIndex = () => {
  return (
    <Box  sx={{
        width: { md: `calc(100% - 270px)`, xs: "100%" },
        ml: { md: "270px", sm: 0 },
        mt: 2,
      }}>
        <InventoryTabs/>
    </Box>
  )
}

export default InventoryIndex
