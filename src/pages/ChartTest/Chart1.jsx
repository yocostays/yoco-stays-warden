import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';

export default function Chart1() {
  return (
    <Box>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: `Moni: 10` },
              { id: 1, value: 15, label: `Value: 15` },
              { id: 2, value: 20, label: `Value: 20` },
            ],
          },
        ]}
        width={400}
        height={200}
        legend={true} // Disable the legend
      />
    </Box>
  );
}
