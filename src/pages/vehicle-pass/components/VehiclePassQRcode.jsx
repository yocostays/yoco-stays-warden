import { Avatar, Box, Card, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { QRCodeSVG } from "qrcode.react";
import { CheckBox } from "@mui/icons-material";

const VehiclePassQRcode = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    
      }}
    >
      <Card
        sx={{
          border: 1,
          boxShadow: 2,
          borderRadius: 3,
          width: { xs: "100%", sm: "90%", md: "70%", lg: "30%" },
          maxWidth: "600px",
          p:5,
            height:"35%",
            ml:"100px"
        }}
      >
        <Grid container spacing={0.3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: 3, bgcolor: "#664DA033" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Box>
                  <Typography
                    sx={{ color: "#674D9F", fontWeight: 700, fontSize: "14px" }}
                  >
                    Harsh Jogi
                  </Typography>
                  <Typography
                    sx={{
                      color: "#674D9F",
                      fontWeight: 500,
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CalendarTodayOutlinedIcon color="#674D9F" />
                    &nbsp; 22nd Feb, 2024 - 22nd Feb, 2024
                  </Typography>
                  <Typography
                    sx={{
                      color: "#674D9F",
                      fontWeight: 500,
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccessTimeOutlinedIcon color="#674D9F" />
                    &nbsp; 10:30 AM - 11:30 PM
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, borderRadius: 3, bgcolor: "#664DA033" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  mb: 2,
                }}
              >
                <Grid>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 700, color: "#674D9F" }}
                  >
                    Gate Pass No.
                  </Typography>
                  <Typography
                    sx={{ fontSize: "21px", fontWeight: 700, color: "#674D9F" }}
                  >
                    129
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 700, color: "#674D9F" }}
                  >
                    Going for?
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 700, color: "#674D9F" }}
                  >
                    Local Guardian
                  </Typography>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <QRCodeSVG
                  value="https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Curvv/9578/1723033064164/front-left-side-47.jpg?tr=w-664"
                  size={150}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mt: 2,
                  color: "#674D9F",
                }}
              >
                <CheckBox /> APPROVED
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                p: 1,
              }}
            >
              <Box sx={{ textAlign: "center", mx: 1 }}>
                <ShareOutlinedIcon />
                <Typography sx={{ fontSize: "12px" }}>Share</Typography>
              </Box>
              <Box sx={{ textAlign: "center", mx: 1 }}>
                <FileDownloadOutlinedIcon />
                <Typography sx={{ fontSize: "12px" }}>Download</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default VehiclePassQRcode;
