import React from "react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { Group } from "@visx/group";
import { Card, CardContent, Typography, Box } from "@mui/material";

// Static data
const data = [
  { label: "Chrome", usage: 45 },
  { label: "Safari", usage: 25 },
  { label: "Firefox", usage: 15 },
  { label: "Edge", usage: 10 },
  { label: "Other", usage: 5 },
];

// Accessor function
const usage = (d) => d.usage;

// Color scale (you can adjust colors as needed)
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
const getColor = (index) => colors[index % colors.length];

// Default margin
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export default function Chart3({
  width = 300,
  height = 200,
  margin = defaultMargin,
}) {
  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  return (
    <Card
      sx={{
        maxWidth: width,
        // margin: "auto",
        // padding: 2,
        background: "#f5f5f5",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg width={width} height={height}>
            <Group top={centerY + margin.top} left={centerX + margin.left}>
              <Pie
                data={data}
                pieValue={usage}
                outerRadius={radius}
                cornerRadius={3}
                padAngle={0.005}
              >
                {(pie) =>
                  pie.arcs.map((arc, index) => (
                    <g key={`arc-${index}`}>
                      <path
                        d={pie.path(arc)}
                        fill={getColor(index)}
                      />
                      <text
                        fill="white"
                        x={pie.path.centroid(arc)[0]}
                        y={pie.path.centroid(arc)[1]}
                        dy=".33em"
                        fontSize={9}
                        textAnchor="middle"
                      >
                        {arc.data.label}
                      </text>
                    </g>
                  ))
                }
              </Pie>
            </Group>
          </svg>
        </Box>
      </CardContent>
    </Card>
  );
}
