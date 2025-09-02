import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import HostelInventory from './HostelInventory';
import MessInventory from './MessInventory';

const tabLabels = ['Hostel', 'Mess', 'Housekeeping', 'Other'];

function ButtonTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleButtonClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', p: 1 }}>
      {/* Button Tabs */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {tabLabels.map((label, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                variant={activeTab === index ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick(index)}
                sx={{ marginRight: 1, width: '100%', height: '40px' }}
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <HostelInventory />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <MessInventory />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <HostelInventory />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <MessInventory />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`button-tabpanel-${index}`}
      aria-labelledby={`button-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0, m: 0 }}>{children}</Box>}
    </Box>
  );
}

export default ButtonTabs;
