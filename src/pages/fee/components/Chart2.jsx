import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function Chart2() {
  return (
    <Box>
      <Card
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: 2,
          boxShadow: 3,
          height: "100%",
          width: { sm: "100%", xs: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            marginBottom: 2,
            background: "#ECE0FF",
            width: "100%",
            p: 1,
            borderBottom: "1px solid #674D9F",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fees
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50px",
                px: 3,
                border: "2px solid",
              }}
            >
              cl <KeyboardArrowDownOutlinedIcon />
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50px",
                px: 2,
                border: "2px solid",
              }}
            >
              Today <KeyboardArrowDownOutlinedIcon />
            </Button>
          </Box>
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: 25,
                      label: "Hostel Fee: 500",
                      color: "#6648A5",
                    },
                    {
                      id: 1,
                      value: 35,
                      label: "Event Fee: 500",
                      color: "#39216D",
                    },
                    {
                      id: 2,
                      value: 40,
                      label: "Fine: 500",
                      color: "#BA9CFF",
                    },
                  ],
                },
              ]}
              width={600}
              height={200}
            //   sx={{ height: { xs: "100%", sm: "30%" } }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
