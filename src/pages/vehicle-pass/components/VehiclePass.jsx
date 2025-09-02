import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const VehiclePass = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
  <Typography variant="h6">Vehicle Pass</Typography>

  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      alignItems:"center"
    }}
  >
    <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        sx={{
          borderRadius: "30px",
          border: "1px solid black",
          fontSize: "0.8rem",
          fontWeight: "600",
          width: "100px",
          height:"40px",
          bgcolor: "#FFFFFF",
          textTransform: "none",
        }}
      >
        Today
        <ExpandMoreOutlinedIcon sx={{ color: "black" }} />
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Today</MenuItem>
        <MenuItem onClick={handleClose}>Yesterday</MenuItem>
        <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
      </Menu>

    <Button
      sx={{
        padding: 1,       
        minWidth: 'auto',   
      }}
    >
      <SearchOutlinedIcon
        sx={{
          border: "1px solid black",  
          borderRadius: "50%",      
          padding: "4px",            
          fontSize: "30px",  
          bgcolor:'#FFFFFF'   
        }}
      />
    </Button>

  </Box>
</Box>

      {/* Card Content */}
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Vehicle Pass 
        </Typography>
       <Grid sx={{display:"flex",gap:2,alignItems:"center", mt:2}}>
       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
       <Box>
        <Typography sx={{color:"#0E0031",fontWeight:700,fontSize:"12px"}}>Harsh Jogi</Typography>
        <Typography sx={{color:"#0E0031",fontWeight:500,fontSize:"12px"}}>22nd Feb,2024 | Late Coming</Typography>
       </Box>
       </Grid>
       <Grid sx={{display:"flex",gap:2,alignItems:"center", mt:2}}>
<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
       <Box>
        <Typography sx={{color:"#0E0031",fontWeight:700,fontSize:"12px"}}>Harsh Jogi</Typography>
        <Typography sx={{color:"#0E0031",fontWeight:500,fontSize:"12px"}}>22nd Feb,2024 | Late Coming</Typography>
       </Box>
       </Grid>
       <Grid sx={{display:"flex",gap:2,alignItems:"center", mt:2}}>
<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
       <Box>
        <Typography sx={{color:"#0E0031",fontWeight:700,fontSize:"12px"}}>Harsh Jogi</Typography>
        <Typography sx={{color:"#0E0031",fontWeight:500,fontSize:"12px"}}>22nd Feb,2024 | Late Coming</Typography>
       </Box>
       </Grid>
      </CardContent>
    </Card>
  );
};

export default VehiclePass;
