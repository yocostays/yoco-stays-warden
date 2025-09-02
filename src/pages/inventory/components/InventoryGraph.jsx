import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

const InventoryGraph = () => {
  const [parameter, setParameter] = useState("Parameters");

  const barData = {
    labels: ["B1", "B2", "C1", "C2", "C3"],
    datasets: [
      {
        label: "Star",
        data: [3, 4, 1, 5, 4],
        backgroundColor: "#6B44CE",
        barThickness: 30,
        maxBarThickness: 50,
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
          text: "Days",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
        beginAtZero: true,
      },
    },
  };

  const handleChange = (event) => {
    setParameter(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ p: 2, borderRadius: "10px", border: "2px solid #B4B4B4" }}>
        <Typography textAlign="center">Inventory Value</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <FormControl sx={{ mb: 2 }}>
            <Select
              value={parameter}
              onChange={handleChange}
              sx={{ borderRadius: "30px", height: "40px" }}
            >
              <MenuItem value="Parameters">Parameters</MenuItem>
              <MenuItem value="Weight">Weight</MenuItem>
              <MenuItem value="Height">Height</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ height: "300px", width: "100%" }}>
            <Bar data={barData} options={barOptions} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InventoryGraph;
