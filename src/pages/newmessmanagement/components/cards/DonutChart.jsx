import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";

const DonutChart = ({ getFoodWastageReport }) => {
  const Navigate = useNavigate();
  const handleAddWastage = () => {
    Navigate("/newmessmanagement/addWastage");
  };

  const colorMap = {
    breakfast: "#674D9F",
    lunch: "#50CA77",
    dinner: "#F4BE30",
    snacks: "#F683AC",
  };


  const transformedData = getFoodWastageReport.map((item) => {
    // Check if the meal is "hi-tea", then set the meal to "snacks"
    const mealName = item.meal === "hi-tea" ? "snacks" : item.meal;
  
    return {
      name: mealName.charAt(0).toUpperCase() + mealName.slice(1), // Capitalize the meal name
      value: item.totalAmount, 
      unit: item.unit, 
      color: colorMap[mealName], // Map the meal to its color
    };
  });
  

  const total = transformedData.reduce((sum, item) => sum + item.value, 0);

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

  const radius = 65;
  const thickness = 20;
  const innerCircleRadius = radius - thickness - 10;
  let startAngle = 0; // Starting angle for each slice

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        minHeight: "200px",
      }}
    >
      {/* Legend */}
      <div>
        {transformedData.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              fontWeight: "600",
              gap: 4,
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
            <span>{`${item.name} : ${item.value} ${item.unit}`}</span>
          </div>
        ))}
      </div>

      {/* Donut Chart */}
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
          const path = calculatePath(
            item.value,
            total,
            radius,
            thickness,
            startAngle
          );
          startAngle += (item.value / total) * 360;

          return (
            <path
              key={index}
              d={path}
              fill={item?.color}
              stroke="#fff"
              strokeWidth="5"
              style={{ transition: "stroke-width 0.5s ease" }}
            />
          );
        })}

        {/* Inner Circle with Shadow */}
        <circle
          cx={radius}
          cy={radius}
          r={innerCircleRadius}
          fill="#fff"
          stroke="#e6e6e6"
          strokeWidth="2"
          filter="url(#shadow)"
        />

        {/* Center Text */}
        <text
          x="50%"
          y="42%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fill="#0E0031"
          style={{ fontWeight: "500" }}
        >
          <tspan x="50%" dy="-0.6em">
            Food
          </tspan>
          <tspan x="50%" dy="1.2em">
            Wastage
          </tspan>
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="15"
          fontWeight="bold"
        >
          {total} kg
        </text>
      </svg>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          alignItems: { xs: 0, lg: "center", md: "center", sm: "center" },
        }}
      >
         <IconButton
              variant="contained"
              sx={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                backgroundColor: "#674D9F",
                '&:hover':{
                  backgroundColor: "#6B52BF",
                  color: "#fff",
                },
                color: "#fff",
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: { xs: 0, sm: 0, md: "0px" }, // Removed `!important`, proper usage
                marginTop: { xs: 0, sm: 0, md: 0, lg: "80px" },
                marginBottom: { xs: 0, sm: "20px", md: "10px", lg: "10px" }, // 150px for md, 0 for all others
              }}
              onClick={() => handleAddWastage()}
            >
              <AddIcon fontSize="small" />
            </IconButton>
      </Box>
    </div>
  );
};

export default React.memo(DonutChart);

DonutChart.propTypes = {
  getFoodWastageReport: PropTypes.func,
};
