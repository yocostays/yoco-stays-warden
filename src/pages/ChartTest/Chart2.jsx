/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Chart2 = ({ data = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Check if data is correctly received
    // console.log('Data received:', data);

    // Ensure the chart container is not null
    if (!chartRef.current) {
      console.error("Chart ref is null");
      return;
    }

    const myChart = echarts.init(chartRef.current);

    // Only proceed if data has items
    if (data.length === 0) {
      console.warn("No data available for the pie chart.");
      return; // Exit early if there's no data
    }

    const generateColorShades = (startColor, endColor, steps) => {
      const start = parseInt(startColor.slice(1), 16);
      const end = parseInt(endColor.slice(1), 16);
      const colors = [];

      for (let i = 0; i < steps; i++) {
        const r = Math.round((start >> 16) + ((end >> 16) - (start >> 16)) * (i / steps));
        const g = Math.round(((start >> 8) & 0x00FF) + (((end >> 8) & 0x00FF) - ((start >> 8) & 0x00FF)) * (i / steps));
        const b = Math.round((start & 0x0000FF) + (end & 0x0000FF - (start & 0x0000FF)) * (i / steps));
        colors.push('#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
      }
      return colors;
    };

    const colorPalette = generateColorShades('#BA9CFF', '#39216D', data.length);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      color: colorPalette,
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            show: false,
          },
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [data]);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '400px', 
        height: '200px', // Ensure height is set
        // maxHeight: '200px',
      }} 
    />
  );
};

export default Chart2;
