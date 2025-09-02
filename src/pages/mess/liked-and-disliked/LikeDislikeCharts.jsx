import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Bar } from "react-chartjs-2";

const items = [
  "1. Chicken Curry",
  "2. Biryani",
  "3. Manchurian",
  "4. Egg Curry",
  "5. Chinese Bhel",
  "6. Chicken Curry",
  "7. Biryani",
  "8. Manchurian",
  "9. Egg Curry",
  "10. Chinese Bhel",
];

const LikeDislikeCharts = () => {

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

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ border: "2px solid #B4B4B4", borderRadius: "10px" }}>
                <Box
                  sx={{
                    backgroundColor: "#CFFFB2",
                    borderRadius: "10px 10px 0px 0px",
                    p: 1,
                    borderBottom: "2px solid #45B501",
                  }}
                >
                  <Typography variant="h6">Most Liked</Typography>
                </Box>
                {items.map((item, index) => (
                  <Box key={index} p={1}>
                    <Typography>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ border: "2px solid #B4B4B4", borderRadius: "10px" }}>
                <Box
                  sx={{
                    backgroundColor: "#FCE1AC",
                    borderRadius: "10px 10px 0px 0px",
                    p: 1,
                    borderBottom: "2px solid #D9A12B",
                  }}
                >
                  <Typography variant="h6">Most Liked</Typography>
                </Box>
                {items.map((item, index) => (
                  <Box key={index} p={1}>
                    <Typography>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <Box sx={{ p: 2, borderRadius: "20px", border:'2px solid #B4B4B4' }}>
            <Box style={{ height: "400px" }}>
                <Typography textAlign="center">Food Wastage</Typography>
              <Bar data={barData} options={barOptions} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LikeDislikeCharts;
