import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

const VehicleGraph = () => {
  const [barThickness, setBarThickness] = useState(50); // Default bar thickness

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newThickness = width < 600 ? 50 : width < 900 ? 100 : 100; // Adjust based on screen size
      setBarThickness(newThickness);
    };

    window.addEventListener("resize", handleResize);

    // Call once to set the initial size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const barData = {
    labels: ["Students", "Visitors", "Staff"],
    datasets: [
      {
        label: "Percentage",
        data: [40, 50, 10],
        backgroundColor: "#6B44CE",
        barThickness: barThickness, // Dynamic bar thickness
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barPercentagePlugin = {
    id: "barPercentagePlugin",
    afterDatasetsDraw: (chart) => {
      const { ctx, data, scales: { x, y } } = chart;
      ctx.save();

      data.datasets[0].data.forEach((value, index) => {
        const barX = x.getPixelForValue(index);
        const barY = y.getPixelForValue(value);
        const barWidth = x.getPixelForValue(index + 1) - x.getPixelForValue(index);
        const barHeight = y.getPixelForValue(0) - barY;

        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textX = barX + barWidth / 28;
        const textY = barY + barHeight / 2;

        ctx.fillText(`${value}%`, textX, textY);
      });
      ctx.restore();
    },
  };

  Chart.register(barPercentagePlugin);

  return (
    <Box sx={{ p: 2, borderRadius: "10px", border: "2px solid #B4B4B4" }}>
      <Box sx={{ height: "130px" }}>
        <Bar data={barData} options={barOptions} />
      </Box>
    </Box>
  );
};

export default VehicleGraph;
