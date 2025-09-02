import { Box, Button } from "@mui/material";

const buttons = Array.from({ length: 105 }, (_, index) => index + 1);

export default function RoomForm() {
  const handleButtonClick = (number) => {
    console.log(`Button ${number} clicked`);
  };

  return (
    <>
      <Box>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 2 }}>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: "50px" }}
            >
              Bulk upload
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{ borderRadius: "50px" }}
            >
              Create
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", textAlign: "justify" }}>
            {buttons.map((number) => (
              <Button
                key={number}
                variant="contained"
                onClick={() => handleButtonClick(number)}
                sx={{
                  p: 1,
                  m: 1,
                  borderRadius: "50px",
                  bgcolor: "#ECE0FF",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "#674D9F",
                    color: "#fff",
                  },
                }}
              >
                {number}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
