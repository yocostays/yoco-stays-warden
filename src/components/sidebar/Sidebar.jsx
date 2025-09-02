import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  // PeopleOutlined as PeopleIcon,
  // BedOutlined as BedIcon,
  // AttachMoneyOutlined as AttachMoneyIcon,
  // AssignmentOutlined as AssignmentIcon,
  // ContentCopyOutlined as ContentCopyIcon,
  // Inventory2Outlined as InventoryIcon,
  // ChatOutlined as ChatIcon,
  // PersonOutlineOutlined as PersonOutlineIcon,
  // DescriptionOutlined as DescriptionIcon,
  // DryCleaningOutlined as DryCleaningIcon,
  // RestaurantOutlined as RestaurantIcon,
  // MailOutlined as MailIcon,
  // MedicalServicesOutlined as MedicalServicesIcon,
  // FeedbackOutlined as FeedbackIcon,
  // DirectionsCarOutlined as DirectionsCarIcon,
  // ExitToAppOutlined as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/images/Logo.svg";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation

import { dummyRoutes as menuItems } from "../../utils/dummyRoutes";

const drawerWidth = 280;

const Sidebar = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation(); // Use location to access current URL

  // Set the selected index based on the URL without showing query parameters
  useEffect(() => {
    const path = location.pathname;

    // Find the index of the menu item where the URL starts with the menu link
    const matchedIndex = menuItems.findIndex((item) =>
      path.startsWith(item.link)
    );

    if (matchedIndex !== -1) {
      setSelectedIndex(matchedIndex); // Set index based on the URL path
    }
  }, [location.pathname]); // Trigger when location.pathname changes

  const toggleDrawer = (status) => () => {
    setOpen(status);
  };

  const handleListItemClick = (index, link) => {
    setSelectedIndex(index);
    navigate(link, { replace: true }); // Navigate to the specified link without showing the index in the URL

    if (isSmallScreen) {
      setOpen(false); // Close the sidebar on small screens
    }
  };

  const drawerContent = (
    <Box
      sx={{
        // py: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            aria-label={item.text}
            onClick={() => handleListItemClick(index, item.link)}
            sx={{
              backgroundColor:
                selectedIndex === index ? "white" : "transparent",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow:
                selectedIndex === index
                  ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                  : "none",
              "&:hover": {
                backgroundColor:
                  selectedIndex === index
                    ? "white"
                    : theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  selectedIndex === index
                    ? theme.palette.primary.main
                    : theme.palette.text.light,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "16px",
                fontWeight: "600",
              }}
              sx={{
                color:
                  selectedIndex === index
                    ? theme.palette.primary.main
                    : theme.palette.text.light,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isSmallScreen ? (
        <>
          <Box sx={{ width: "100%", background: "#fff" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{
                position: "fixed",
                top: "10px",
                right: "10px",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                zIndex: "1200",
              }}
            >
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Box
              sx={{
                py: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={Logo} alt="Yoco Stays" className="logo-image" />
            </Box>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderTopLeftRadius: "25px",
                borderTopRightRadius: "25px",
                px: 4,
                py: 4,
              }}
            >
              {drawerContent}
            </Box>
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Box
            sx={{
              py: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="Yoco Stays" className="logo-image" />
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              px: 4,
              py: 4,
              height: "3000px",
            }}
          >
            {drawerContent}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
