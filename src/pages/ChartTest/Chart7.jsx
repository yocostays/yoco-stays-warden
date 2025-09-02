import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// Example API data
const barData = [
  { label: "Student", value: 3000,  },
  { label: "Staff", value: 2000,  },
  { label: "Meal", value: 2500,  },
  { label: "Complain", value: 1000,  },
];

// Transform API data for the chart
const xLabels = barData.map((item) => item.label);
const uData = barData.map((item) => item.value);

export default function Chart7() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: uData, label: "uv", id: "uvId" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
