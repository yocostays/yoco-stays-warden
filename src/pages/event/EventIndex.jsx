import { Box } from "@mui/material";
import EventTable from "./components/EventTable";
// import EventForm from "./components/EventForm";

export default function EventIndex() {
  return (
    <>
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p:1
      }}
    >
          <EventTable/>
       
    </Box>
  
    </>
  )
}
