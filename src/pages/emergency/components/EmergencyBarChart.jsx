import { Box, Typography } from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";

const EmergencyBarChart = () => {
  const barData = {
    labels: [
      ["Sports", "injury"],
      ["Bleeding"],
      ["Breathing", "Difficulty"],
      ["Collapsing"],
      ["Seizures"],
    ],
    datasets: [
      {
        label: "Star",
        data: [2, 1.5, 0.5, 5, 1],
        backgroundColor: "#6B44CE",
        barThickness: 20,
        maxBarThickness: 40,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
        },
        grid: {
          display: false, // Remove grid lines for the x-axis
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines for the y-axis
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <Box>
      <Box sx={{ p: 2, borderRadius: "10px", border: "2px solid #B4B4B4" }}>
        <Typography textAlign="center">Top 5 Reasons Graph:</Typography>
        <Box sx={{ height: "230px", width: "100%", mt: 3 }}>
          <Bar data={barData} options={barOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default EmergencyBarChart;
