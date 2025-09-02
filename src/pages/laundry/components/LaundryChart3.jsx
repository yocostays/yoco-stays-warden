import { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function LaundryChart3() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#ECE0FF",
          p: 2,
          borderRadius: "10px 10px 0px 0px",
          border: "2px solid #674D9F",
          mb: 2,
          maxWidth: { xs: "100%" },
          margin: "auto",
        }}
      >
        <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
          Overdue List
        </Typography>
      </Box>
      <Box sx={{ overflow: "hidden", borderRadius: "0px 0px 10px 10px", borderBottom: 2, borderRight: 2, borderLeft: 2, borderColor: "rgba(3,3,3,0.2)" }}>
        <Table
          aria-label="laundry table"
          sx={{
            width: "100%",
            tableLayout: "auto",
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <TableBody>
            {[
              { id: "1. 1150593", buttonLabel: "Ready" },
              { id: "2. 6565123", buttonLabel: "Ready" },
            ].map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: "none" }}>{item.id}</TableCell>
                <TableCell
                  sx={{ border: "none", textAlign: "right", px: 0, my: "auto" }}
                >
                  <Button variant="text" sx={{ color: "#45B501" }}>
                    {item.buttonLabel}
                  </Button>
                </TableCell>
                <TableCell sx={{ border: "none", textAlign: "right", px: 0 }}>
                  <IconButton
                    aria-label="MoreVert"
                    onClick={(event) => handleClick(event, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Deliver</MenuItem>
        <MenuItem onClick={handleClose}>Details</MenuItem>
      </Menu>
    </>
  );
}
