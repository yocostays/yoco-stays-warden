import { Box, Card, FormControl, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import InventoryTable from "./InventoryTable";
import CustomChartBox from "../../../components/customComponents/CustomChartBox";
import { useTheme } from "@mui/material/styles";
import { Search } from "@mui/icons-material";

const data = [
    { items: "Bed", quantity: "10/20" },
    { items: "Chair", quantity: "20/100" },
    { items: "Blanket", quantity: "10/15" },
    { items: "Stool", quantity: "30/50" },
  ];

const MessInventory = () => {
    const theme = useTheme();

    const [hostel, setHostel] = useState("Hostel"); // Initialize state for hostel
  const [today, setToday] = useState("Today");

    const handleChangeToday = (event) => {
        setToday(event.target.value);
      };
      const handleChangeHostel = (event) => {
        setHostel(event.target.value);
      };

    const getColorStyles = (quantity) => {
        const [available, total] = quantity.split("/").map(Number);
        const ratio = available / total;
        if (ratio === 1) {
          return { color: "#45B501", backgroundColor: "#CBEFBF" };
        } else if (ratio < 0.5) {
          return { color: "#F03D3E", backgroundColor: "#FEECEC" };
        } else {
          return { color: "#000", backgroundColor: "transparent" };
        }
      };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <InventoryTable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12}>
            <CustomChartBox
            showReport
            showPieChartButton
            showTodayButton
            showPieChart4
            reportTitle={"Fees"}
          />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
            <Card
            sx={{ border: "2px solid #B4B4B4", borderRadius: "10px", mt: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                background: `${theme.palette.secondary.main}`,
                width: "100%",
                p: 1.5,
                borderBottom: "1px solid grey",
                flexWrap:'wrap'
              }}
            >
              <Typography variant="body2" fontWeight="500" >
                Inventory
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5,  }}>
                <FormControl>
                  <Select
                    value={hostel}
                    onChange={handleChangeHostel}
                    sx={{
                      borderRadius: "30px",
                      height: "25px",
                      background: "#fff",
                      width: "70px",
                      fontSize:'10px'
                    }}
                  >
                    <MenuItem value="Hostel">Hostel</MenuItem>
                    <MenuItem value="Hostel-1">Hostel-1</MenuItem>
                    <MenuItem value="Hostel-2">Hostel-2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <Select
                    value={today}
                    onChange={handleChangeToday}
                    sx={{
                      borderRadius: "30px",
                      height: "25px",
                      background: "#fff",
                      width: "70px",
                      fontSize:'10px'
                    }}
                  >
                    <MenuItem value="Today">Today</MenuItem>
                    <MenuItem value="Yesterday">Yesterday</MenuItem>
                    <MenuItem value="Tomorrow">Tomorrow</MenuItem>
                  </Select>
                </FormControl>
                <IconButton sx={{background:'#fff', p:0.5, border:`1px solid ${theme.palette.primary.main}`}}>
                    <Search sx={{fontSize:'14px'}}/>
                </IconButton>
              </Box>
            </Box>
            <Box>
              <Box
                p={1.5}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">Items</Typography>
                <Typography variant="h6">Quantity</Typography>
              </Box>
              {data.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: getColorStyles(item.quantity)
                      .backgroundColor,
                    p: 1.5,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: getColorStyles(item.quantity).color }}
                  >
                    {item.items}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: getColorStyles(item.quantity).color }}
                  >
                    {item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessInventory;
