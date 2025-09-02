import PropTypes from "prop-types"; // Import PropTypes
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";

const CustomLineChart = ({ data, height }) => {
  // Function to wrap labels by inserting line breaks manually based on word length
  const wrapLabel = (label) => {
    const maxLength = 10; // Adjust max length per line as needed
    const words = label.split(" ");
    let wrappedLabel = "";
    let line = "";

    words.forEach((word) => {
      if ((line + word).length > maxLength) {
        wrappedLabel += line + "\n";
        line = "";
      }
      line += (line.length > 0 ? " " : "") + word;
    });

    wrappedLabel += line;
    return wrappedLabel;
  };

  const xLabels = data.map((item) => wrapLabel(item.label)); // Apply wrapping function to labels
  const uData = data.map((item) => item.value);
  const shouldEnableScroll = xLabels.length > 2; // Enable scroll if more than 2 labels

  return (
    <Box style={{ minHeight: `${height}`, marginBottom: "20px" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: shouldEnableScroll ? "100%" : 700,
          overflowX: shouldEnableScroll ? "auto" : "visible", // Enable horizontal scroll when there are more than 2 labels
          paddingBottom: shouldEnableScroll ? 1 : 0, // Add padding when scroll is enabled
        }}
      >
        <LineChart
          width={shouldEnableScroll ? xLabels.length * 100 : 400} // Adjust width based on the number of labels
          height={250}
          series={[{ data: uData }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </Box>
    </Box>
  );
};

// Define prop types
CustomLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired, // Data should contain label and value properties
  height: PropTypes.string, // Set the chart height
};

CustomLineChart.defaultProps = {
  height: "300px", // Default height if not provided
};

export default CustomLineChart;
