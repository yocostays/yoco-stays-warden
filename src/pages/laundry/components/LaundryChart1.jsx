import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import CustomCards from "../../../components/customComponents/CustomCard";
import { useTheme } from "@emotion/react";
export default function LaundryChart1() {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                bgcolor: "#E2D2FF",
                border: "2px solid #664DA0",
                maxWidth: "100%",
                borderRadius: "10px",
                maxHeight: "100%",
                color: "black",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontSize: { lg: "12px", md: "16px" },
                        fontWeight: "600",
                      }}
                    >
                      Most type of cloth use
                    </Typography>
                    <Box flexDirection={"row"} display={"flex"}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontSize: "13px" }}
                      >
                        1 . Shirt
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontSize: "13px" }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;2 . Pant
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontSize: "13px" }}
                    >
                      3 . Other
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCards
              title="Most request block"
              value="C block"
              backgroundColor="#FCE1AC"
              borderColor="#D9A12B"
              textColor={theme.palette.text.primary}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCards
              title="Average time to Deliver"
              value="1.5 Day"
              backgroundColor="#CBEFBF"
              borderColor="#45B501"
              textColor={theme.palette.text.primary}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomCards
              title="Most Assigning person"
              value="Ramu"
              backgroundColor="#BAE5F5"
              borderColor="#4288D9"
              textColor={theme.palette.text.primary}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
