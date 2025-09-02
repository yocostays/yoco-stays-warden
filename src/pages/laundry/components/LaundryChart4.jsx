import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

export default function LaundryChart4() {

  const barData = {
    labels: ["Ironing", "Laundry", "Dry Clean", "Shoe Cleaning", "Bag Wash"],
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
    <Box>
      <Box sx={{ p: 1, borderRadius: "10px", border: "2px solid #B4B4B4" }}>
        <Typography textAlign="center">Inventory Value</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box sx={{ height: "300px", width: "100%" }}>
            <Bar data={barData} options={barOptions} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
