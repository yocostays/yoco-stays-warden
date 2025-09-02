import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const lineData = {
  labels: ["Student", "Staff", "Meal", "Complain"],
  series: [
    {
      name: "pv",
      data: [2400, 1500, 1800, 900]
    },
    {
      name: "uv",
      data: [3000, 2000, 2500, 1000]
    }
  ]
};

const xLabels = lineData.labels;
const pData = lineData.series.find(serie => serie.name === 'pv').data;
const uData = lineData.series.find(serie => serie.name === 'uv').data;

export default function Chart5() {
  return (
    <LineChart
      width={400}
      height={300}
      series={[
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
