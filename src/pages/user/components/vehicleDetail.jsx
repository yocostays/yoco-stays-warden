import { useState } from "react";
import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  useMediaQuery,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const VehicleForm = ({ vehicleDetails, setVehicleDetails, verified, id }) => {
  const [vechicleType, setvechicleType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [vechicleNumber, setvechicleNumber] = useState("");
  const [modelName, setmodelName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const { verifyUserName } = useSelector((state) => state.users);

  const [errors, setErrors] = useState({
    vechicleType: false,
    engineType: false,
    vechicleNumber: false,
    modelName: false,
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const validateFields = () => {
    const newErrors = {
      vechicleType: !vechicleType,
      engineType: vechicleType !== "bicycle" && !engineType,
      vechicleNumber: vechicleType !== "bicycle" && !vechicleNumber,
      modelName: !modelName,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleAddOrUpdateVehicle = () => {
    // Validate input fields
    if (!validateFields()) return;

    // Check for duplicate vehicleNumber
    const isDuplicate = vehicleDetails.some(
      (vehicle, index) =>
        vehicle.vechicleNumber.trim().toLowerCase() ===
          vechicleNumber.trim().toLowerCase() && index !== editIndex
    );

    if (isDuplicate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vechicleNumber: true,
      }));
      return;
    }

    // Check for alphanumeric vehicle number (including spaces)
    if (
      !/^[a-zA-Z0-9\s]+$/.test(vechicleNumber) &&
      vechicleType !== "bicycle"
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vechicleNumber: true,
      }));
      return;
    }

    if (vechicleNumber.trim().length < 10 && vechicleType !== "bicycle") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vechicleNumber: true,
      }));
      return;
    }

    const newVehicle = {
      vechicleType,
      engineType,
      vechicleNumber: vechicleNumber.trim(),
      modelName,
    };

    if (editIndex !== null) {
      // Update existing vehicle
      setVehicleDetails((prevVehicles) =>
        prevVehicles.map((vehicle, index) =>
          index === editIndex ? newVehicle : vehicle
        )
      );
    } else {
      // Add new vehicle
      setVehicleDetails((prevVehicles) => [...prevVehicles, newVehicle]);
    }

    resetForm();
  };

  const handleEditVehicle = (index) => {
    const vehicle = vehicleDetails[index];
    setvechicleType(vehicle.vechicleType);
    setEngineType(vehicle.engineType);
    setvechicleNumber(vehicle.vechicleNumber);
    setmodelName(vehicle.modelName);
    setEditIndex(index);
  };

  const handleDeleteVehicle = (index) => {
    setVehicleDetails((prevVehicles) =>
      prevVehicles.filter((_, i) => i !== index)
    );
  };

  const resetForm = () => {
    setvechicleType("");
    setEngineType("");
    setvechicleNumber("");
    setmodelName("");
    setEditIndex(null);
    setErrors({
      vechicleType: false,
      engineType: false,
      vechicleNumber: false,
      modelName: false,
    });
  };

  return (
    <Stack spacing={2} my={2}>
      <Card
        sx={{
          boxShadow: "none",
          bgcolor: "#674D9F0D",
          borderRadius: "20px",
          px: { sm: "35px", sx: "10px" },
          pt: "30px",
          mt: "50px",
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 3, textAlign: "left", color: "#5E2E8C" }}
            >
              Vehicle Details
            </Typography>
          }
        />
        <CardContent>
          <form>
            <Stack spacing={2}>
              {/* Vehicle Type Section */}
              <FormControl fullWidth error={errors.vechicleType}>
                <Stack
                  direction={isSmallScreen ? "column" : "row"}
                  alignItems={isSmallScreen ? "start" : "center"}
                  spacing={2}
                >
                  <FormLabel sx={{ minWidth: "120px", pt: "10px" }}>
                    Vehicle Type
                  </FormLabel>
                  <Box>
                    <RadioGroup
                      row
                      value={vechicleType}
                      onChange={(e) => {
                        setvechicleType(e.target.value);
                        setEngineType("");
                        setvechicleNumber("");
                        setmodelName("");
                      }}
                    >
                      <FormControlLabel
                        value="bicycle"
                        control={
                          <Radio
                            disabled={(!id && !verified) || verifyUserName}
                          />
                        }
                        label="Bicycle"
                      />
                      <FormControlLabel
                        value="bike"
                        control={
                          <Radio
                            disabled={(!id && !verified) || verifyUserName}
                          />
                        }
                        label="Bike"
                      />
                      <FormControlLabel
                        value="four wheeler"
                        control={
                          <Radio
                            disabled={(!id && !verified) || verifyUserName}
                          />
                        }
                        label="Car"
                      />
                    </RadioGroup>
                    {errors.vechicleType && (
                      <Typography fontSize="12px" color="error">
                        Vehicle Type is required
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </FormControl>

              {/* Engine Type Section */}
              {vechicleType !== "bicycle" && (
                <FormControl fullWidth error={errors.engineType}>
                  <Stack
                    direction={isSmallScreen ? "column" : "row"}
                    alignItems={isSmallScreen ? "start" : "center"}
                    spacing={2}
                  >
                    <FormLabel sx={{ minWidth: "120px", pt: "10px" }}>
                      Engine Type
                    </FormLabel>
                    <Box>
                      <RadioGroup
                        row
                        value={engineType}
                        onChange={(e) => setEngineType(e.target.value)}
                      >
                        <FormControlLabel
                          value="ev"
                          control={
                            <Radio
                              disabled={(!id && !verified) || verifyUserName}
                            />
                          }
                          label="EV"
                        />
                        <FormControlLabel
                          value="fuel"
                          control={
                            <Radio
                              disabled={(!id && !verified) || verifyUserName}
                            />
                          }
                          label="Fuel"
                        />
                      </RadioGroup>
                      {errors.engineType && (
                        <Typography fontSize="12px" color="error">
                          Engine Type is required
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </FormControl>
              )}

              {/* Vehicle Number */}
              {vechicleType !== "bicycle" && (
                <Stack
                  direction={isSmallScreen ? "column" : "row"}
                  spacing={2.5}
                >
                  <Typography sx={{ minWidth: "120px" }}>
                    Vehicle Number
                  </Typography>
                
                  <TextField
                    size="small"
                    value={vechicleNumber}
                    onChange={(e) => {
                      const input = e.target.value.slice(0, 10); // Limit input to 10 characters
                      setvechicleNumber(input);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        vechicleNumber: false,
                      }));
                    }}
                    error={errors.vechicleNumber}
                    disabled={(!id && !verified) || verifyUserName}
                    helperText={
                      errors.vechicleNumber &&
                      "Vehicle Number must be alphanumeric, unique, and can include spaces (max 10 characters)"
                    }
                  />
                </Stack>
              )}

              {/* Model/Company */}
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
                <Typography sx={{ minWidth: "120px" }}>
                  Model/Company
                </Typography>
                <TextField
                  size="small"
                  value={modelName}
                  onChange={(e) => setmodelName(e.target.value)}
                  error={errors.modelName}
                  helperText={errors.modelName && "Model/Company is required"}
                  disabled={(!id && !verified) || verifyUserName}
                />
              </Stack>

              {/* Add or Update Vehicle Button */}
              <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
                <Typography sx={{ minWidth: "120px" }}>Add More</Typography>
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateVehicle}
                  disabled={!verified || verifyUserName}
                  sx={{
                    mt: 2,
                    borderRadius: "10px",
                    textTransform: "none",
                  }}
                >
                  <AddIcon />
                  {editIndex !== null ? "Update Vehicle" : "Add Vehicle"}
                </Button>
              </Stack>

              {/* Vehicle Table */}
              {vehicleDetails && (
                <Box sx={{ overflowX: "auto", width: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Vehicle Type</TableCell>
                        <TableCell>Engine Type</TableCell>
                        <TableCell>Vehicle Number</TableCell>
                        <TableCell>Model/Company</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vehicleDetails.map((vehicle, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {(vehicle.vechicleType === "four wheeler"
                              ? "Car"
                              : vehicle.vechicleType) || "--"}
                          </TableCell>
                          <TableCell>{vehicle.engineType || "--"}</TableCell>
                          <TableCell>
                            {vehicle.vechicleNumber || "--"}
                          </TableCell>
                          <TableCell>{vehicle.modelName || "--"}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleEditVehicle(index)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteVehicle(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default VehicleForm;

VehicleForm.propTypes = {
  vehicleDetails: PropTypes.array.isRequired,
  setVehicleDetails: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
