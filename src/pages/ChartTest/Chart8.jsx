import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Dataset 1',
          data: [820, 632, 901, 934, 990, 1330, 1320],
          type: 'line',
          smooth: true,
        },
        {
          name: 'Dataset 2',
          data: [620, 732, 701, 734, 1090, 1130, 1120],
          type: 'line',
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Dataset 1', 'Dataset 2'],
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default LineChart;
