import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryGraph from "./InventoryGraph";
import InventoryTable from "./InventoryTable";
import CustomChartBox from "../../../components/customComponents/CustomChartBox";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import { CloseOutlined, Search } from "@mui/icons-material";

const data = [
  { items: "Bed", quantity: "10/20" },
  { items: "Chair", quantity: "20/100" },
  { items: "Pillow", quantity: "100/100" },
  { items: "Blanket", quantity: "50/50" },
  { items: "Stool", quantity: "30/50" },
];

const HostelInventory = () => {
  const theme = useTheme();
  const [manage, setManage] = useState("Hostel-C1");
  const [today, setToday] = useState("Today");
  const [hostel, setHostel] = useState("Hostel");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state
  const [rows, setRows] = useState([
    { item: "Chair", image: null, threshold: 100, qty: 20 },
    { item: "Blanket", image: null, threshold: 20, qty: 10 },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Handlers for Menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setManage(event.target.value);
  };
  const handleChangeToday = (event) => {
    setToday(event.target.value);
  };
  const handleChangeHostel = (event) => {
    setHostel(event.target.value);
  };

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const addRow = () => {
    setRows([...rows, { item: "", image: null, threshold: 0, qty: 0 }]);
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const incrementQty = (index) => {
    const newRows = [...rows];
    newRows[index].qty += 1;
    setRows(newRows);
  };

  const decrementQty = (index) => {
    const newRows = [...rows];
    if (newRows[index].qty > 0) {
      newRows[index].qty -= 1;
    }
    setRows(newRows);
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
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <InventoryGraph />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Box mt={3}>
                <InventoryTable />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12} sx={{ mt:{sm:3, xs:3, md:0}}}>
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
                sx={{
                  border: "2px solid #B4B4B4",
                  borderRadius: "10px",
                  mt: 3,
                }}
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
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="body2" fontWeight="500">
                    Inventory
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <FormControl>
                      <Select
                        value={hostel}
                        onChange={handleChangeHostel}
                        sx={{
                          borderRadius: "30px",
                          height: "25px",
                          background: "#fff",
                          width: "70px",
                          fontSize: "10px",
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
                          fontSize: "10px",
                        }}
                      >
                        <MenuItem value="Today">Today</MenuItem>
                        <MenuItem value="Yesterday">Yesterday</MenuItem>
                        <MenuItem value="Tomorrow">Tomorrow</MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton
                      sx={{
                        background: "#fff",
                        p: 0.5,
                        border: `1px solid ${theme.palette.primary.main}`,
                      }}
                    >
                      <Search sx={{ fontSize: "14px" }} />
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
                  <Typography
                    onClick={handleDialogOpen}
                    sx={{
                      cursor: "pointer",
                      m: 1,
                      color: `${theme.palette.text.secondary}`,
                    }}
                  >
                    Manage Inventory
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for managing inventory */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "20px",
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            background: `${theme.palette.secondary.main}`,
            borderRadius: "20px 20px 0px 0px",
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Manage</Typography>
          <FormControl>
            <Select
              value={manage}
              onChange={handleChange}
              sx={{ borderRadius: "30px", height: "40px", background: "#fff" }}
            >
              <MenuItem value="Hostel-C1">Hostel-C1</MenuItem>
              <MenuItem value="Hostel-C2">Hostel-C2</MenuItem>
              <MenuItem value="Hostel-C3">Hostel-C3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DialogContent>
          <>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <TableCell>Item</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Threshold</TableCell>
                  <TableCell>Receipt</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={row.item}
                        onChange={(e) =>
                          handleInputChange(index, "item", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="text" color="primary">
                        upload
                      </Button>
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        value={row.threshold}
                        onChange={(e) =>
                          handleInputChange(index, "threshold", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="text" color="primary">
                        add
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Button
                          onClick={() => decrementQty(index)}
                          sx={{ minWidth: "30px", padding: "4px" }}
                        >
                          -
                        </Button>
                        <Typography>{row.qty}</Typography>
                        <Button
                          onClick={() => incrementQty(index)}
                          sx={{ minWidth: "30px", padding: "4px" }}
                        >
                          +
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteRow(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <Link
                            to={"/inventory/manage-details"}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <ListItemIcon>
                              <ListIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Details</ListItemText>
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                          <ListItemIcon>
                            <CloseOutlined fontSize="small" color="error" />
                          </ListItemIcon>
                          <ListItemText sx={{ color: "red" }}>
                            Disable
                          </ListItemText>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
          <Button onClick={addRow} color="primary">
            add row
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HostelInventory;
