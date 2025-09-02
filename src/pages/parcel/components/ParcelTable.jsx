import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ListIcon from "@mui/icons-material/List";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { Link, useNavigate } from "react-router-dom";
import ParcelForm from "./ParcelForm";

const users = [
  {
    id: 4654816182,
    type: "Food Item",
    name: "John Doe",
    from: "amazon",
    amount: "420",
    method: "UPI",
    to: "Atul Singh",
    Status: "Resolved",
    border: "1px solid #FC8D62",
    bgcolor: "#FFF3ED",
    color: "#FC8D62",
  },
  {
    id: 4654818182,
    type: "Food Item",
    name: "John Doe",
    from: "amazon",
    amount: "420",
    method: "UPI",
    to: "Atul Singh",
    Status: "Resolved",
    border: "1px solid #FC8D62",
    bgcolor: "#FFF3ED",
    color: "#FC8D62",
  },
  {
    id: 4654851182,
    type: "Food Item",
    name: "John Doe",
    from: "amazon",
    amount: "420",
    method: "UPI",
    to: "Atul Singh",
    Status: "In-progress",
    border: "1px solid #F4BE30",
    bgcolor: "#FDFAE1",
    color: "#F4BE30",
  },
  {
    id: 4564816182,
    type: "Food Item",
    name: "John Doe",
    from: "amazon",
    amount: "420",
    method: "UPI",
    to: "Atul Singh",
    Status: "In-progress",
    border: "1px solid #F4BE30",
    bgcolor: "#FDFAE1",
    color: "#F4BE30",
  },
];

export default function ParcelTable() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: { sm: "space-between", xs: "center" },
          bgcolor: "#ECE0FF",
          p: 2,
          borderRadius: "10px 10px 0px 0px",
          border: "2px solid #674D9F",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            mb: { xs: 1, xl: 0 },
          }}
        >
          <Typography>Maintenance</Typography>
          <Button
            size="small"
            sx={{
              color: "#555",
              "&:hover": {
                color: "#674D9F",
              },
            }}
          >
            <FilterAltOutlinedIcon /> Filter
          </Button>
        </Box>
        <Box>
          {[
            "All",
            "Today",
            "Yesterday",
            "This month",
            "Previous month",
            "Date",
            "Others",
            "Type",
          ].map((butu) => (
            <Button
              key={butu}
              variant="outline"
              size="small"
              sx={{
                m: 1,
                borderRadius: "20px",
                border: "1px solid #555",
                bgcolor: "#fff",
                color: "#555",
                py: 0,
                px: 1.5,
                "&:hover": {
                  bgcolor: "#674D9F",
                  color: "#fff",
                  border: "1px solid #674D9F",
                },
                "&:active": {
                  bgcolor: "#674D9F",
                  color: "#fff",
                  border: "1px solid #674D9F",
                },
              }}
            >
              {butu}
            </Button>
          ))}
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderBottom: "2px solid #674D9F",
          borderLeft: "2px solid #674D9F",
          borderRight: "2px solid #674D9F",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Table aria-label="simple">
          <TableHead sx={{ borderBottom: "2px solid #674D9F",}}>
            <TableRow>
              <TableCell
                padding="checkbox"
                sx={{
                  borderColor: "black",
                  borderBottom: 1,
                  py: 2,
                  fontWeight: "bold",
                }}
              >
                <Checkbox
                  sx={{
                    color: "#674D9F80",
                  }}
                  checked={selectAll}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {[
                "Parcel Type",
                "Name",
                "Number",
                "Parcel From",
                "Amount",
                "Payment Mode",
                "Handed Over",
                "Status",
                "",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    borderColor: "black",
                    borderBottom: 1,
                    py: 2,
                    fontWeight: "bold",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={{
                      color: "#674D9F80",
                    }}
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.from}</TableCell>
                <TableCell>{user.amount}</TableCell>
                <TableCell>{user.method}</TableCell>
                <TableCell>{user.to}</TableCell>
                <TableCell sx={{ px: 0 }}>
                  <Chip
                    label={user.Status}
                    sx={{
                      border: `${user.border}`,
                      bgcolor: `${user.bgcolor}`,
                      color: `${user.color}`,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ m: 0, p: 0 }}>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <Link to="/parcel/form" style={{textDecoration:'none'}}>
                      <MenuItem>
                        <ListIcon sx={{ mr: 1 }} />
                        Details
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={""}>
                      <ArrowDownwardOutlinedIcon sx={{ mr: 1 }} />
                      DownLoad Receipt
                    </MenuItem>
                    <MenuItem onClick={""}>
                      <AccessTimeOutlinedIcon sx={{ mr: 1 }} />
                      Send Reminder
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
