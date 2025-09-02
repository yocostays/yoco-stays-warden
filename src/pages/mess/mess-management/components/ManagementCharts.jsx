import { useState } from "react";
import {
  Grid,
  Box,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const ManagementCharts = () => {
  const [parameter, setParameter] = useState("Parameters");

  // Data for the Line Chart
  const lineData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Yesterday", "Today"],
    datasets: [
      {
        label: "Kg",
        data: [10, 15, 12, 14, 15],
        borderColor: "#6B44CE",
        fill: false,
        pointBackgroundColor: "#6B44CE",
      },
    ],
  };

  // Options for the Line Chart
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Kg",
        },
        beginAtZero: true,
      },
    },
  };

  // Data for the Bar Chart
  const barData = {
    labels: ["B1", "B2", "C1", "C2", "C3"],
    datasets: [
      {
        label: "Star",
        data: [3, 4, 1, 5, 4],
        backgroundColor: "#6B44CE",
      },
    ],
  };

  // Options for the Bar Chart
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
        //   text: "Day",
        },
      },
      y: {
        title: {
          display: true,
        //   text: "Star",
        },
        beginAtZero: true,
      },
    },
  };

  // Handle dropdown selection change
  const handleChange = (event) => {
    setParameter(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, borderRadius: "20px", border:'2px solid #B4B4B4' }}>
            <Typography textAlign="center">Parameters</Typography>
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <FormControl sx={{ mb: 2 }}>
                <Select
                  value={parameter}
                  onChange={handleChange}
                  size="small"
                  sx={{ borderRadius: "30px", fontSize:'14px' }}
                >
                  <MenuItem sx={{fontSize: '14px'}} value="Parameters">Parameters</MenuItem>
                  <MenuItem sx={{fontSize: '14px'}} value="Weight">Weight</MenuItem>
                  <MenuItem sx={{fontSize: '14px'}} value="Height">Height</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box style={{ height: "200px" }}>
              <Line data={lineData} options={lineOptions} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, borderRadius: "20px", border:'2px solid #B4B4B4' }}>
            <Box style={{ height: "300px" }}>
                <Typography textAlign="center">Feedback</Typography>
              <Bar data={barData} options={barOptions} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagementCharts;
