import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const adminData = [
  {
    type: "Yoco Id",
    info: "123456789",
  },
  {
    type: "Name",
    info: "yoco",
  },
  {
    type: "Branch",
    info: "admin@gmail.com",
  },
  {
    type: "Year",
    info: "+91 572 345 6789",
  },
  {
    type: "Hostel",
    info: "2024",
  },
  {
    type: "Room No",
    info: "Surat",
  },
];

const tableData = [
  {
    id: "6789",
    name: "Pratap Mude",
    date: "16th Feb ,2024",
    parcel: "-",
  },
  {
    id: "6749",
    name: "Amit Bave",
    date: "23rd Mar ,2024",
    parcel: "-",
  },
  {
    id: "2269",
    name: "Ansul Mukharjee",
    date: "27th May ,2024",
    parcel: "-",
  },
  {
    id: "3159",
    name: "Subham Jaiswal",
    date: "10th Jan ,2024",
    parcel: "-",
  },
  {
    id: "4749",
    name: "Atik Prasad",
    date: "15th Dec ,2023",
    parcel: "-",
  },
];

export default function ParcelForm() {
  return (
   <Box sx={{ width: { md: `calc(100% - 270px)` },
   ml: { md: "270px", sm: 0 },
   marginBottom: "30px",
   }}>
     <Box sx={{ border: "1px solid #B4B4B4",  borderRadius: "10px",p:2, m:1 }}>
      {adminData.map((data) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          columnGap={5}
          key={data}
        >
          <Typography sx={{ width: "200px", py: 2 }}>{data.type}</Typography>
          <Typography>:</Typography>
          <Typography>{data.info}</Typography>
        </Stack>
      ))}
      <Box>
        <Typography variant="h6" marginY={5}>
          Mess Management Operations
        </Typography>
        <TableContainer component={Paper} sx={{maxWidth:"700px"}}>
          <Table aria-label="simple">
            <TableHead>
              <TableRow>
                {["Approve ID", "Name", " Request Date", "Parcel"].map(
                  (head) => (
                    <TableCell key={head} sx={{ fontWeight: "bold" }}>
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((tb) => (
                <TableRow key={tb}>
                  <TableCell> {tb.id}</TableCell>
                  <TableCell> {tb.name}</TableCell>
                  <TableCell> {tb.date}</TableCell>
                  <TableCell> {tb.parcel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
   </Box>
  );
}
