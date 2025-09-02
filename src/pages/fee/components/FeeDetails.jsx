import React, { useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Image from "../../../assets/images/FeeDetails.png";

const FeeDetails = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editedRows, setEditedRows] = useState([]);

  const userData = [
    { label: "Yoco id", value: "123456789" },
    { label: "Name", value: "Yoco" },
    { label: "Email", value: "admin@gmail.com" },
    { label: "Contact Number", value: "+91 1234567890" },
    { label: "Fee Per Sem", value: "2024" },
    { label: "Fee Per Year", value: "Surat" },
    { label: "Due Date", value: "Yoco Hostel" },
    { label: "Late Date", value: "2nd" },
  ];

  const initialFeeDetails = [
    {
      recieptNo: "67890",
      type: "Cash",
      name: "Pratap Mude",
      dueDate: "16th Feb, 2024",
      submission: "20th Feb 2024",
      status: "Completed",
    },
    {
      recieptNo: "67891",
      type: "Cash",
      name: "Amit Mahajan",
      dueDate: "16th Feb, 2024",
      submission: "20th Feb 2024",
      status: "Delay",
    },
    {
      recieptNo: "67826",
      type: "Cash",
      name: "Anshul Gurnani",
      dueDate: "16th Feb, 2024",
      submission: "20th Feb 2024",
      status: "Pending",
    },
  ];

  const buttonsData = ["Fee", "Send Invoice", "Add Discount", "Filter"];

  const [buttonVariants, setButtonVariants] = useState(
    buttonsData.reduce((acc, curr) => ({ ...acc, [curr]: "outlined" }), {})
  );

  const handleButtonClick = (buttonName) => {
    setButtonVariants(
      buttonsData.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: curr === buttonName ? "contained" : "outlined",
        }),
        {}
      )
    );
  };

  const [feeDetails, setFeeDetails] = useState(initialFeeDetails);

  const handleEditClick = () => {
    setEditedRows([...feeDetails]);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...editedRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setEditedRows(updatedRows);
  };

  const handleSaveChanges = () => {
    setFeeDetails(editedRows);
    setOpenDialog(false);
  };


  return (
    <Box
      sx={{
        width: { md: `calc(100% - 270px)` },
        ml: { md: "270px", sm: 0 },
        marginBottom: "30px",
        p: 1,
      }}
    >
      <Card sx={{ padding: 2, borderRadius: 2 }}>
        {/* Edit Button */}
        <Grid container justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{
              marginBottom: 2,
              border: "2px solid #000",
              borderRadius: "20px",
              textTransform: "none",
            }}
          >
            Edit
          </Button>
        </Grid>

        {/* User Information */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <Grid container spacing={2}>
              {userData.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ display: "flex" }}>
                      <strong>{item.label}:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" sx={{ display: "flex" }}>
                      :
                      <span style={{ marginLeft: "8px" }}>
                        {item.value || "-"}
                      </span>
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Box m={1}>
              <img src={Image} style={{ width: "100%", height: "auto" }} />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ marginTop: 4, marginBottom: 2 }}>
            Maintenance Request
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2, md: 3 },
              flexWrap: "wrap",
            }}
          >
            {buttonsData.map((button) => (
              <Button
                key={button}
                variant={buttonVariants[button]}
                sx={{ borderRadius: "30px", textTransform: 'none' }}
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </Button>
            ))}
          </Box>
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reciept No.</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Payment Submission</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feeDetails.map((row) => (
                  <TableRow key={row.recieptNo}>
                    <TableCell>{row.recieptNo}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.dueDate}</TableCell>
                    <TableCell>{row.submission}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            row.status === "Completed"
                              ? "green"
                              : row.status === "Pending"
                                ? "orange"
                                : row.status === "Delay"
                                  ? "red"
                                  : "black",
                        }}
                      >
                        {row.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button onClick={handleEditClick} sx={{ textTransform: "none" }}>
            Edit
          </Button>
        </Box>
        {/* Edit Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>Edit Table Entries</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reciept No.</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Payment Submission</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editedRows.map((row, index) => (
                    <TableRow key={row.recieptNo}>
                      <TableCell>
                        <TextField
                          sx={{ minWidth: '100px' }}
                          value={row.recieptNo}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "recieptNo",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          sx={{ minWidth: '100px' }}
                          value={row.type}
                          onChange={(e) =>
                            handleInputChange(index, "type", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          sx={{ minWidth: '100px' }}
                          value={row.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          sx={{ minWidth: '100px' }}
                          value={row.dueDate}
                          onChange={(e) =>
                            handleInputChange(index, "dueDate", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          sx={{ minWidth: '100px' }}
                          value={row.submission}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "submission",
                              e.target.value
                            )
                          }
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          sx={{ minWidth: '100px' }}
                          value={row.status}
                          onChange={(e) =>
                            handleInputChange(index, "status", e.target.value)
                          }
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
};

export default FeeDetails;
