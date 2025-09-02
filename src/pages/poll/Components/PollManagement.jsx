import React from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

const PollManagement = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        boxShadow: 3,
        height: "100%",
        width: { sm: "100%", xs: "100%" },
        border: "2px solid #B4B4B4"
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          marginBottom: 2,
          background: "#ECE0FF",
          width: "100%",
          p: 1,
          borderBottom: "1px solid grey",
        }}
      >
        <Typography variant="h6">Poll Management</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
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
              bgcolor:'#FFFFFF',
              textTransform:"none"
            }}
          >
            Leader
            <ExpandMoreOutlinedIcon sx={{color:"black"}}/>
          </Button>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Poll Management
        </Typography>
        <form>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "column"}}
          >
            <Grid item xs={12}>
              <TextField
                name="question"
                value="Question..."
                type="text"
                variant="outlined"
                sx={{ mt: 1, color: "#373737", borderRadius: "10%" }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                type="text"
                value="A..."
                variant="outlined"
              
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                variant="outlined"
            
                // value="+"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  border: "1px solid transparent",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  width: "90px",
                  height: "35px",
                  padding: 0,
                  textTransform:"none"
                }}
              >
          
                Upload
            
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PollManagement;
