import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";

const CustomDonutChart = ({ customData }) => {
  if (!customData || customData.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "200px",
          textAlign: "center",
        }}
      >
        <NoDataAvailable />
      </Box>
    );
  }

  const colorMap = {
    warden: "#674D9F",
    security: "#50CA77",
    maintenance: "#F4BE30",
    mess: "#F683AC",
  };

  const transformedData = customData.map((item) => ({
    name:
      item.categoryType.charAt(0).toUpperCase() + item.categoryType.slice(1),
    value: item?.totalAmount ?? "0",
    resolvedCount: item.resolvedCount,
    color: colorMap[item.categoryType],
  }));

  const total = transformedData.reduce(
    (sum, item) => sum + item.resolvedCount,
    0
  );

  // Check if all complaints are 0
  const allComplaintsZero = transformedData.every(
    (item) => item.value === "0" || item.resolvedCount === 0
  );

  if (allComplaintsZero) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: "200px",
          textAlign: "center",
        }}
      >
        <NoDataAvailable />
      </Box>
    );
  }

  const calculatePath = (value, total, radius, thickness, startAngle) => {
    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = radius + radius * Math.cos(startRad);
    const y1 = radius + radius * Math.sin(startRad);
    const x2 = radius + radius * Math.cos(endRad);
    const y2 = radius + radius * Math.sin(endRad);

    const innerRadius = radius - thickness;
    const x3 = radius + innerRadius * Math.cos(endRad);
    const y3 = radius + innerRadius * Math.sin(endRad);
    const x4 = radius + innerRadius * Math.cos(startRad);
    const y4 = radius + innerRadius * Math.sin(startRad);

    return `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
  };

  const radius = 67;
  const thickness = 20;
  const innerCircleRadius = radius - thickness - 10;
  let startAngle = 0;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        minHeight: "200px",
      }}
    >
      {/* Legend */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box>
          {transformedData?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
                fontWeight: "600",
                gap: 5,
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  marginRight: "8px",
                }}
              ></div>
              <span style={{ fontSize: "14px" }}>
                {`${item.name} : ${item.value}`}
              </span>
            </div>
          ))}
        </Box>
      </Box>

      {/* Donut Chart */}
      <Box>
        <svg width={radius * 2} height={radius * 2}>
          {/* Filter for box shadow */}
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="3"
                floodColor="rgba(0, 0, 0, 0.2)"
              />
            </filter>
          </defs>

          {transformedData.map((item, index) => {
            const percentage = ((item.resolvedCount / total) * 100).toFixed(0);
            const angle = (item.resolvedCount / total) * 360;
            const midAngle = startAngle + angle / 2;
            const midRad = (midAngle * Math.PI) / 180;

            const labelX = radius + (radius - thickness / 2) * Math.cos(midRad);
            const labelY = radius + (radius - thickness / 2) * Math.sin(midRad);

            const path = calculatePath(
              item.resolvedCount,
              total,
              radius,
              thickness,
              startAngle
            );
            startAngle += angle;

            return (
              <g key={index}>
                {/* Donut segment */}
                <path
                  d={path}
                  fill={item?.color}
                  stroke="#fff"
                  strokeWidth="5"
                  style={{ transition: "stroke-width 0.5s ease" }}
                />
                {/* Percentage Label */}
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fill="#fff"
                  fontWeight="bold"
                >
                  {percentage}%
                </text>
              </g>
            );
          })}

          {/* Inner Circle */}
          <circle
            cx={radius}
            cy={radius}
            r={innerCircleRadius}
            fill="#fff"
            stroke="#e6e6e6"
            strokeWidth="1"
            filter="url(#shadow)"
          />

          {/* Center Text */}
          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#0E0031"
            style={{ fontWeight: "500" }}
          >
            <tspan x="50%" dy="-0.6em">Department</tspan>
            <tspan x="50%" dy="1.2em">wise resolved</tspan>
            <tspan x="50%" dy="1.2em">complaints</tspan>
            <tspan x="50%" dy="1.2em">in %</tspan>
          </text>
        </svg>
      </Box>
    </div>
  );
};

export default React.memo(CustomDonutChart);

CustomDonutChart.propTypes = {
  customData: PropTypes.array,
  showButton: PropTypes.bool,
};
