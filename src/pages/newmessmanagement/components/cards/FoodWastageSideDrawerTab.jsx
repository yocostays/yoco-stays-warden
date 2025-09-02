import { Drawer, IconButton, Box, Typography, Button, Menu, MenuItem, Card, CardContent, Rating,} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PropTypes from "prop-types";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const reviews = [
  {
    name: 'Suraj Raut',
    rating: 3.8,
    title: 'Best',
    review: 'Best Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
  },
  {
    name: 'Priya Sharma',
    rating: 4.5,
    title: 'Excellent',
    review: 'Amazing experience! The services provided were outstanding and beyond expectations.',
  },
  {
    name: 'Amit Verma',
    rating: 4.0,
    title: 'Good',
    review: 'Good quality and timely service. Would recommend it to others.',
  },
  {
    name: 'Amit Verma',
    rating: 4.0,
    title: 'Good',
    review: 'Good quality and timely service. Would recommend it to others.',
  },
  {
    name: 'Amit Verma',
    rating: 4.0,
    title: 'Good',
    review: 'Good quality and timely service. Would recommend it to others.',
  },
];

const FoodWastageSideDrawerTab = ({ openDrawer, toggleDrawer,isSmallScreen }) => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [anchorEl09, setAnchorEl09] = useState(null);
  const openDrawer09 = Boolean(anchorEl09);

  const handleExpandToFullPage = () => {
    setIsFullScreen((prev) => !prev);
  };
  
  const handleDetailsClick = (event) => {
    setAnchorEl09(event.currentTarget);
  };
  const handleDetailsClose = () => {
    setAnchorEl09(null);
  };

  return (
    <Drawer
             anchor="right"
             open={openDrawer}
             onClose={toggleDrawer(false)}
             PaperProps={{
               sx: {
                 width: isSmallScreen ? "100%" : isFullScreen ? "100%" : "30%",
                 borderRadius:"20px",
               },
             }}
           >
             <Box
               sx={{
                 height: '100vh',
                 padding: 2,
                 overflowY: 'auto',
               }}
               role="presentation"
             >
               <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                 <Box display="flex" alignItems="center" gap={1}>
                   <IconButton onClick={toggleDrawer(false)}>
                     <KeyboardDoubleArrowRightIcon />
                   </IconButton>
                   <IconButton
                onClick={handleExpandToFullPage}
              
              >
                {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
                   <Typography fontWeight="bold" variant="h6">
                     Reviews
                   </Typography>
                   <Typography fontWeight="light" variant="h6" sx={{ color: "#ACB5BD" }}>
                     {reviews.length}
                   </Typography>
                 </Box>
                 <Button
                   variant="outlined"
                   size="small"
                   aria-controls={openDrawer09 ? "menu" : undefined}
                   aria-haspopup="true"
                   aria-expanded={openDrawer09 ? "true" : undefined}
                   onClick={handleDetailsClick}
                   sx={{
                     textTransform: "none",
                     fontWeight: 500,
                     borderRadius: "3px",
                     px: 1,
                     borderWidth: "2px",
                     borderStyle: "solid",
                     boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                     borderImage: "linear-gradient(180deg, #674D9F, #FDFAFF) 1",
                     backgroundColor: "#fff",
                     color: "#A9A9A9",
                     fontSize: "14px",
                     width: "100px",
                   }}
                   endIcon={<ExpandMoreIcon />}
                 >
                   Todays
                 </Button>
                 <Menu
                   id="menu"
                   anchorEl={anchorEl09}
                   open={openDrawer09}
                   onClose={handleDetailsClose}
                   MenuListProps={{ "aria-labelledby": "button" }}
                 >
                   <MenuItem onClick={handleDetailsClose}>All Ratings</MenuItem>
                   <MenuItem onClick={handleDetailsClose}>Best</MenuItem>
                   <MenuItem onClick={handleDetailsClose}>Better</MenuItem>
                   <MenuItem onClick={handleDetailsClose}>Good</MenuItem>
                   <MenuItem onClick={handleDetailsClose}>Poor</MenuItem>
                   <MenuItem onClick={handleDetailsClose}>Monthly</MenuItem>
                 </Menu>
               </Box>
                   
               <Box>
               {reviews.map((item, index) => (
                
                 <Card
                  key={index}
                   sx={{
                     minWidth: 275,
                     marginTop: "20px",
                     borderWidth: "2px",
                     borderStyle: "solid",
                     borderRadius: "20px !important",
                     borderImage: "linear-gradient(180deg, #9B7BC6, #FDFAFF) 1",
                     boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                     px: 2,
                     pb: 4,
                   }}
                 >
                 <Box>
                   <CardContent>
                     <Typography textAlign="start" variant="h6" gutterBottom fontWeight="bold">
                       {item.name}
                     </Typography>
                     <Rating
                       sx={{ color: "#674D9F" }}
                       name={`half-rating-${index}`}
                       defaultValue={item.rating}
                       precision={0.5}
                       size="medium"
                       readOnly
                     />
                     <Typography textAlign="justify" variant="h6" fontWeight="bold">
                       {item.title}
                     </Typography>
                   </CardContent>
                   <Typography textAlign="justify" sx={{ px: 2, pb: 2 }}>
                     {item.review}
                   </Typography>
                   </Box>
                 </Card>
               ))}
               </Box>
             </Box>
           </Drawer>
  );
};

export default FoodWastageSideDrawerTab;

FoodWastageSideDrawerTab.propTypes = {
  openDrawer: PropTypes.bool,
  toggleDrawer: PropTypes.bool,
  isSmallScreen:PropTypes.bool,
}

