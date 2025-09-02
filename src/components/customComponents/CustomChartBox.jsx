import { useState } from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts";



const CustomChartBox = ({
  showReport,
  showDownload,
  showPieChartButton,
  showTodayButton,
  showOccupancy,
  showPieChart,
  showPieChart1,
  showPieChart2,
  showPieChart3,
  showPieChart4,
  showPieChart5,

  reportTitle,
  liveOccupancyTitle,
  totalCapacity,
  occupiedText,
  vacantText,
  occupiedValue,
  vacantValue,
  pieChartTitle,
  pieChartCategories = [
    { label: "Category 1", color: "#6648A5" },
    { label: "Category 2", color: "#39216D" },
    { label: "Category 3", color: "#BA9CFF" },
  ],
  data,
  data1,
}) => {
  // Add state and toggle functions
  const [isPieChartOpen, setIsPieChartOpen] = useState(false);
  const [isTodayOpen, setIsTodayOpen] = useState(false);

  const togglePieChart = () => setIsPieChartOpen(!isPieChartOpen);
  const toggleToday = () => setIsTodayOpen(!isTodayOpen);
  return (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        height: "100%",
        width: { sm: "100%", xs: "100%" },
        border:'2px solid #B4B4B4',
        boxShadow:'none'
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          background: "#F2F2F2",
          width: "100%",
          p: 1,
          borderBottom: "1px solid grey",
        }}
      >
        {showReport && (
          <Typography variant="h6" gutterBottom>
            {reportTitle}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {showDownload && (
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: "20px",
                border: "1px solid black",
                fontSize: "0.6rem",
                fontWeight: "600",
                width: "90px",
                padding: 0,
              }}
            >
              Download
            </Button>
          )}

          {showPieChartButton && (
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: "20px",
                border: "1px solid black",
                fontSize: "0.6rem",
                fontWeight: "600",
                width: "90px",
                padding: 0,
              }}
              onClick={togglePieChart}
              endIcon={isPieChartOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              Pie chart
            </Button>
          )}

          {showTodayButton && (
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: "20px",
                border: "1px solid black",
                fontSize: "0.6rem",
                fontWeight: "600",
                width: "90px",
                padding: 0,
              }}
              onClick={toggleToday}
              endIcon={isTodayOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              Toady
            </Button>
          )}
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Grid container spacing={2}>
          {/* Occupancy Section */}
          {showOccupancy && (
            <Grid item xs={6}>
              <Box>
                <Typography variant="h6" textAlign={"center"}>
                  {liveOccupancyTitle}
                </Typography>
                <Typography textAlign={"center"}>{totalCapacity}</Typography>
                <Typography textAlign={"center"}>Total Capacity</Typography>
                <Box display="flex" justifyContent="center">
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1, md: 3 }}
                    justifyContent="center"
                  >
                    <Gauge
                      width={100}
                      height={100}
                      value={83}
                      cornerRadius="50%"
                      sx={{
                        [`& .gauge-valueText`]: { fontSize: 24 },
                        [`& .gauge-valueArc`]: { fill: "#674D9F" },
                        [`& .gauge-referenceArc`]: { fill: "#D9D9D9" },
                      }}
                    />
                  </Stack>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography>{occupiedValue}</Typography>
                    <Box
                      sx={{
                        background: "#674D9F",
                        color: "#fff",
                        p: 1,
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "10px" }}>
                        {occupiedText}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography>{vacantValue}</Typography>
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: "12px" }}>
                        {vacantText}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Pie Chart Section */}
          {showPieChart && (
            <Grid item xs={showOccupancy ? 6 : 12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">{pieChartTitle}</Typography>
                <Box display="flex" justifyContent="center">
                <PieChart
                  series={[
                    {
                      data: pieChartCategories.map((item, index) => ({
                        id: index,
                        value: item.value || 30,
                        color: item.color,
                      })),
                    },
                  ]}
                  width={200}
                  height={100}
                  sx={{marginLeft:'70px'}}
                />
                </Box>
                <Box sx={{ mt: 2 }}>
                  {pieChartCategories.map((item, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", justifyContent: "center", mb: 1 }}
                    >
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          backgroundColor: item.color,
                          mr: 1,
                        }}
                      />
                      <Box>{item.label}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          )}
          {showPieChart1 && (
            <Grid item xs={showOccupancy ? 6 : 12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">{pieChartTitle}</Typography>
                <Box display="flex" justifyContent="center">
                <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: 25,
                            label: "Category 1",
                            color: "#6648A5",
                          },
                          {
                            id: 1,
                            value: 35,
                            label: "Category 2",
                            color: "#39216D",
                          },
                          {
                            id: 2,
                            value: 40,
                            label: "Category 3",
                            color: "#BA9CFF",
                          },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                    />
                </Box>
              </Box>
            </Grid>
          )}
          {showPieChart2 && (
            <Grid item xs={showOccupancy ? 6 : 12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">{pieChartTitle}</Typography>
                <Box display="flex" justifyContent="center">
                <Grid
                container
                spacing={2}
                alignItems="center"
              >
                {/* Pie Chart Section */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: 25,
                              color: "#6648A5",
                            },
                            {
                              id: 1,
                              value: 35,
                              color: "#39216D",
                            },
                            {
                              id: 2,
                              value: 40,
                              color: "#BA9CFF",
                            },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                      sx={{
                        marginLeft: { lg: '90px', md: '70px', xs: '70px' },
                        '& svg': {
                          width: 'auto !important',
                          height: 'auto !important',
                        },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Information Section */}
                <Grid item xs={12} sm={6}>
                  {data.map((item, index) => (
                    <Typography variant="body1" key={index} textAlign="start">
                      <span style={{ color: "#e91e63", marginRight: "10px" }}>
                        ●
                      </span>{" "}
                      {item.label}: {item.value}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
                </Box>
              </Box>
            </Grid>
          )}
          {showPieChart3 && (
            <Grid item xs={showOccupancy ? 6 : 12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">{pieChartTitle}</Typography>
                <Box display="flex" justifyContent="center">
                <Grid
                container
                spacing={2}
                alignItems="center"
              >
                {/* Pie Chart Section */}
                <Grid item xs={12} >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: 25,
                              color: "#6648A5",
                            },
                            {
                              id: 1,
                              value: 35,
                              color: "#39216D",
                            },
                            {
                              id: 2,
                              value: 40,
                              color: "#BA9CFF",
                            },
                          ],
                        },
                      ]}
                      width={200}
                      height={100}
                      sx={{
                        marginLeft: { lg: '90px', md: '70px', xs: '70px' },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Information Section */}
                <Grid item xs={12} >
                  <Grid container spacing={2}>
                    {data.map((item, index) => (
                    <Grid item xs={12} sm={6} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant="h6" key={index} textAlign="start" sx={{fontSize:'12px', fontWeight:'600'}}>
                      <span style={{ color: "#e91e63", marginRight: "10px", fontSize:'14px' }}>
                        ●
                      </span>{" "}
                      {item.label}
                    </Typography>
                    <Typography variant="h6" key={index} textAlign="start" sx={{fontSize:'12px', fontWeight:'600'}}>
                    : {item.value}
                    </Typography>
                    </Grid>
                  ))}
                  </Grid>
                </Grid>
              </Grid>
                </Box>
              </Box>
            </Grid>
          )}
          {showPieChart4 && (
            <Grid item xs={showOccupancy ? 6 : 12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">{pieChartTitle}</Typography>
                <Box display="flex" justifyContent="center">
                <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: 25,
                            color: "#6648A5",
                          },
                          {
                            id: 1,
                            value: 35,
                            color: "#39216D",
                          },
                          {
                            id: 2,
                            value: 40,
                            color: "#BA9CFF",
                          },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                    sx={{marginLeft:'60px'}}
                    />
                </Box>
              </Box>
            </Grid>
          )}
          {showPieChart5 && (
            <Grid item xs={showOccupancy ? 6 : 12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">{pieChartTitle}</Typography>
                <Box display="flex" justifyContent="center">
                <Grid
                container
                spacing={2}
                alignItems="center"
              >
                {/* Pie Chart Section */}
                <Grid item xs={12} >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: 20,
                              color: "#6648A5",
                            },
                            {
                              id: 1,
                              value: 60,
                              color: "#39216D",
                            },
                            {
                              id: 2,
                              value: 20,
                              color: "#BA9CFF",
                            },
                          ],
                        },
                      ]}
                      width={200}
                      height={100}
                      sx={{
                        marginLeft: { lg: '70px', md: '50px', xs: '70px' },
                      }}
                    />
                  </Box>
                </Grid>

                {/* Information Section */}
                <Grid item xs={12} >
                  <Grid container spacing={0}>
                    {data1.map((item, index) => (
                    <Grid item xs={12}  sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant="h6" key={index} textAlign="start" sx={{fontSize:'12px', fontWeight:'600'}}>
                      <span style={{ color: "#e91e63", marginRight: "10px", fontSize:'14px' }}>
                        ●
                      </span>{" "}
                      {item.label}
                    </Typography>
                    <Typography variant="h6" key={index} textAlign="start" sx={{fontSize:'12px', fontWeight:'600'}}>
                    : {item.value}
                    </Typography>
                    </Grid>
                  ))}
                  </Grid>
                </Grid>
              </Grid>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomChartBox;
