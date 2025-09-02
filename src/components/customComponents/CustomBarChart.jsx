import PropTypes from "prop-types";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";

export default function CustomBarChart({ data }) {
  // Function to wrap labels by inserting line breaks manually based on word length
  const wrapLabel = (label) => {
    const maxLength = 8; // Adjust max length per line as needed
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

  const labels = data.map((item) => wrapLabel(item.label));
  const values = data.map((item) => item.value);
  const colors = data.map((item) => item.color);

  // Enable scroll if there are more than 2 labels
  const shouldEnableScroll = labels.length > 2;

  return (
    <Box>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: shouldEnableScroll ? "100%" : 700,
          overflowX: shouldEnableScroll ? "auto" : "visible", // Enable horizontal scroll when there are more than 2 labels
          paddingBottom: shouldEnableScroll ? 1 : 0, // Add padding when scroll is enabled
        }}
      >
        <BarChart
          width={shouldEnableScroll ? labels.length * 100 : 400} // Adjust width based on the number of labels
          height={300}
          series={[
            {
              data: values,
              color: colors,
            },
          ]}
          xAxis={[{ data: labels, scaleType: "band" }]}
        />
      </Box>
    </Box>
  );
}

CustomBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

CustomBarChart.defaultProps = {
  data: [],
};
 