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
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/images/Logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { dummyRoutes } from "../../utils/dummyRoutes";

const drawerWidth = 280;

const PermittedSidebar = () => {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const { permittedRoutes } = useSelector((state) => state?.permission);
  const permissionRoute =
    JSON.parse(localStorage.getItem("permittedRoutes")) || permittedRoutes;

  // Memoized permitted routes menu
  const permittedRoutesMenu = permissionRoute?.length
    ? dummyRoutes
      .map((dummyRoute) => {
        const matchedRoute = permissionRoute.find(
          (permRoute) => permRoute.title === dummyRoute.title
        );
        if (matchedRoute) {
          return {
            ...dummyRoute,
            link: matchedRoute.link || dummyRoute.link,
          };
        }
        return null;
      })
      .filter(Boolean)
    : [];

  useEffect(() => {
    if (!permissionRoute || permissionRoute.length === 0) {
      navigate("/no-permission");
      return;
    }

    const path = location.pathname.substring(1);
    const matchedIndex = permittedRoutesMenu.findIndex((item) =>
      path.startsWith(item.link)
    );

    if (matchedIndex !== -1) {
      setSelectedIndex(matchedIndex);
    } else {
      navigate("/page-not-found");
    }

    // Update localStorage with new permissions
    if (permittedRoutes?.length > 0) {
      localStorage.setItem("permittedRoutes", JSON.stringify(permittedRoutes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, permittedRoutes, permissionRoute, navigate]);

  const toggleDrawer = (status) => () => {
    setOpen(status);
  };

  const handleListItemClick = (index, link) => {
    setSelectedIndex(index);
    if (link) {
      navigate(link, { replace: true });
    }
    if (isSmallScreen) {
      setOpen(false);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "79.63vh",
      }}
    >
      <List>
        {permittedRoutesMenu.map((item, index) => (
          <ListItem
            button
            key={index}
            aria-label={item.title}
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
              <Icon icon={item.icon} fontSize={23} />
            </ListItemIcon>
            <ListItemText
              sx={{
                color:
                  selectedIndex === index
                    ? theme.palette.primary.main
                    : theme.palette.text.light,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                {item.title}
              </Typography>
            </ListItemText>
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
                top: { sm: "30px", xs: "10px" },
                right: "10px",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
                zIndex: "1200",
              }}
            >
              <MenuIcon
                sx={{
                  color: "#fff",
                  "&:hover": {
                    color: "#000",
                  },
                }}
              />
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
                position: "sticky",
                top: "0%",
                background: "white",
                zIndex: "9999"
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
              overflowY: "auto", // Allow scrolling
              scrollbarWidth: "none", // Hide scrollbar for Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar for WebKit browsers
              },
            },
          }}
        >
          <Box
            sx={{
              py: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "sticky",
              top: "0%",
              background: "white",
              zIndex: "9999"
            }}
          >
            <img src={Logo} alt="Yoco Stays" className="logo-image" />
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              py: 4,
            }}
          >
            {drawerContent}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default PermittedSidebar;
