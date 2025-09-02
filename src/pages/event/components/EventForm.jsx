import { Button, Grid, ImageList, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function EventForm() {
  const [price, setPrice] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <Grid
      sx={{
        width: { xs: "90%", sm: "80%", md: `calc(100% - 270px)` },
        maxWidth: { xs: "350px", sm: "100%", md: "calc(100% - 270px)" },
        ml: { md: "270px", },
        mt: 2,
        mx: "auto",
      }}
    >
      <Grid
        sx={{
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          mx: { xs: 0, sm: 2, md: 3 },
          my: 3,
        }}
      >
        <Grid
          sx={{
            backgroundColor: "#ECE0FF",
            textAlign: "center",
            marginBottom: "2rem",
            padding: "1rem",
            borderBottom: "2px solid #674D9F",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <Typography variant="h6" component="h1" gutterBottom>
            Create Event
          </Typography>
        </Grid>

        <Grid p={2}>
          <Typography variant="h6" component="h2" gutterBottom>
            Event Details
          </Typography>
          <TextField
            fullWidth
            type="text"
            label="Enter event name"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />
        </Grid>

        <Grid
          p={2}
          sx={{
            marginBottom: "2rem",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "1rem",
          }}
        >
          <TextField fullWidth type="date" label=" " variant="outlined" />
          <TextField fullWidth type="time" label=" " variant="outlined" />
        </Grid>

        <Grid p={2} sx={{backgroundColor:"gray"}}>
          <Typography variant="body2" gutterBottom>
            Upload Banner
          </Typography>
          <ImageList
            sx={{
              width: "100%",
              height: 450,
              border: "1px solid black",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
            }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          />
        </Grid>
        <Grid p={2}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ marginTop: "1rem" }}
          >
            About
          </Typography>
          <TextField
            fullWidth
            type="text"
            label="Location"
            variant="outlined"
            sx={{ marginBottom: "2rem" }}
          />
          <TextField
            fullWidth
            type="text"
            label="Description"
            variant="outlined"
          />
        </Grid>

        <Grid p={2} sx={{ marginBottom: "1rem" }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Ticket Price
          </Typography>
          <Grid
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "1rem",
            }}
          >
            <TextField
              fullWidth
              type="tel"
              label="Price"
              variant="outlined"
              value={price}
              onChange={handleChange}
              inputProps={{
                inputMode: "numeric",
              }}
            />

            <TextField
              fullWidth
              type="text"
              label="Commission"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid px={2}>
          <Typography
            sx={{
              marginBottom: "2rem",
              color: "text.disabled",
              borderBottom: "2px solid",
              width: "fit-content",
            }}
          >
            Upload Highlight Images
          </Typography>
        </Grid>
      </Grid>

      <Grid
        sx={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "20px",
            paddingX: "2rem",
            textAlign: "center",
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
