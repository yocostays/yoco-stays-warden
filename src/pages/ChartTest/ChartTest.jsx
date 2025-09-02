import { Box, Grid, Typography } from "@mui/material";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";
import Chart5 from "./Chart5";
import Chart6 from "./Chart6";
import Chart7 from "./Chart7";
import Chart8 from "./Chart8";
import Chart9 from "./Chart9";

const ChartTest = () => {
  return (
    <>
      <Box
        sx={{
          width: { md: `calc(100% - 270px)`, xs: "100%" },
          ml: { md: "270px", sm: 0 },
          mt: 2,
        }}
      >
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography>React-MUI</Typography>
              <Chart1 />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>echarts</Typography>
              <Chart2
                data={[
                  { value: 1048, name: "Search Engine" },
                  { value: 735, name: "Direct" },
                  { value: 580, name: "Email" },
                  { value: 484, name: "Union Ads" },
                  { value: 300, name: "Video Ads" },
                  { value: 200, name: "Social Media" },
                  { value: 150, name: "Referral" },
                  { value: 100, name: "Others" },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>visx</Typography>
              <Chart3 />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>echarts</Typography>
              <Chart4 xAxisData={days} seriesData={values} />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>visx</Typography>
              <Chart6 width={400} height={400} events={true} />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>React-MUI</Typography>
              <Chart7 />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>React-MUI</Typography>
              <Chart5 />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>echarts</Typography>
              <Chart8 />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Typography>nivo/bump</Typography>
              <div
                style={{ height: "300px", width: "100%", position: "relative" }}
              >
                <Chart9 data={data} />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ChartTest;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const values = [120, 200, 150, 80, 70, 110, 130];
const data = [
  {
    id: "Serie 1",
    data: [
      {
        x: "2000",
        y: 9,
      },
      {
        x: "2001",
        y: 10,
      },
      {
        x: "2002",
        y: 9,
      },
      {
        x: "2003",
        y: 9,
      },
      {
        x: "2004",
        y: 3,
      },
    ],
  },
  {
    id: "Serie 2",
    data: [
      {
        x: "2000",
        y: 11,
      },
      {
        x: "2001",
        y: 5,
      },
      {
        x: "2002",
        y: 4,
      },
      {
        x: "2003",
        y: 5,
      },
      {
        x: "2004",
        y: 7,
      },
    ],
  },
  {
    id: "Serie 3",
    data: [
      {
        x: "2000",
        y: 5,
      },
      {
        x: "2001",
        y: 8,
      },
      {
        x: "2002",
        y: 12,
      },
      {
        x: "2003",
        y: 2,
      },
      {
        x: "2004",
        y: 5,
      },
    ],
  },
  {
    id: "Serie 4",
    data: [
      {
        x: "2000",
        y: 4,
      },
      {
        x: "2001",
        y: 4,
      },
      {
        x: "2002",
        y: 2,
      },
      {
        x: "2003",
        y: 11,
      },
      {
        x: "2004",
        y: 6,
      },
    ],
  },
  {
    id: "Serie 5",
    data: [
      {
        x: "2000",
        y: 2,
      },
      {
        x: "2001",
        y: 11,
      },
      {
        x: "2002",
        y: 5,
      },
      {
        x: "2003",
        y: 6,
      },
      {
        x: "2004",
        y: 10,
      },
    ],
  },
];
