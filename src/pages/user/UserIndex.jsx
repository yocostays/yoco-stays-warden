import { Box } from "@mui/material"; 
import UserCard from "./UserCard";
import UserTable from "./UserTable";
export default function UserIndex() {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
      }}
    >
      <UserCard/>
      <UserTable/>
      
    </Box>
  );
}
