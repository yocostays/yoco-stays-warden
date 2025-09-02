import { useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, LabelList } from "recharts";

export default function ResponsiveBarChart({ modifiedGraphData }) {
  const [data, setData] = useState([]);

  // Detect screen sizes
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Small screen
  const isMediumScreen = useMediaQuery("(max-width:900px)"); // Medium screen
  const isLargeScreen = useMediaQuery("(max-width:1440px)"); // Medium screen

  useEffect(() => {
    // Fetch data from the API and set it
    const getData = async () => {
      setData(modifiedGraphData); // Update the state with API data
    };

    getData();
  }, [modifiedGraphData]);

  // Set font size based on screen size
  let fontSize = "30px"; // Default for larger screens
  if (isSmallScreen) {
    fontSize = "30px"; // Small screens
  } else if (isMediumScreen) {
    fontSize = "30px"; // Medium screens
  }
  if (isLargeScreen) {
    fontSize = "30px";
  }

  return (
    <BarChart
      width={1200}
      height={250}
      data={data}
      margin={{
        top: 20,
        right: 150,
        bottom: 5,
      }}
      barCategoryGap="25%" // Gap between the bars
    >
      {/* Hide X axis and Y axis ticks */}
      <XAxis dataKey="name" tick={false} axisLine={false} />
      <YAxis tick={false} axisLine={false} />
      <Bar
      barSize={90}
        dataKey="uv"
        label={{ position: "top", fontSize: "30px", offset: 10, fill: "grey" }}
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill="#674D9F" />
        ))}
        <LabelList
          dataKey="name"
          position="bottom"
          offset={30}
          fill="black"
          style={{
            color: "black", // Set label color to black
            fontSize: fontSize, // Apply dynamic font size
            textAlign: "center", // Center the text
            fontWeight: "600",
          }}
        />
      </Bar>
    </BarChart>
  );
}

ResponsiveBarChart.propTypes = {
  modifiedGraphData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uv: PropTypes.number,
    })
  ).isRequired,
};
