import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import TrackingTable from "./TrackingTable";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const EmergencyCharts = () => {
  const lineData = {
    labels: ["July", "August", "September"],
    datasets: [
      {
        label: "Suicidal emergencies",
        data: [30, 25, 20],
        borderColor: "#9A2500",
        fill: false,
        pointBackgroundColor: "#9A2500",
      },
      {
        label: "Medical emergenciesnits",
        data: [10, 12, 9],
        borderColor: "#F4BE30",
        fill: false,
        pointBackgroundColor: "#F4BE30",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow custom height
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Box m={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TrackingTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              height: "94%",
              width: { sm: "100%", xs: "100%" },
              border: "2px solid #B4B4B4",
              boxShadow: "none",
              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
                background: "#ECE0FF",
                width: "100%",
                p: 1,
                borderBottom: "2px solid #674D9F",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Medical and suicidal emergencies
              </Typography>
            </Box>
            <Box sx={{ height: 300, width: "100%" }}> 
              <Line data={lineData} options={lineOptions} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmergencyCharts;

