import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Chart4 = ({ xAxisData = [], seriesData = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }, // Highlight the bar on hover
          formatter: '{b}: {c}', // Display category (x-axis) and value (y-axis)
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLine: { show: false },
          axisLabel: { show: true },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { show: true },
          splitLine: { show: false },
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            barWidth: 40,
          },
        ],
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [xAxisData, seriesData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default Chart4;
