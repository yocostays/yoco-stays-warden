/* eslint-disable react/prop-types */
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  Card,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import * as Yup from "yup";

const vehicleValidationSchema = Yup.object().shape({
  vechicleType: Yup.string().required("Vehicle type is required"),
  modelName: Yup.string().required("Vehicle model is required"),
  engineType: Yup.string().required("Fuel type is required"),
  vechicleNumber: Yup.string().required("Vehicle number is required"),
});

const vehicleTypeLabels = {
  bicycle: "Bicycle",
  bike: "Bike",
  "four wheeler": "Car",
};

const engineTypeLabels = {
  ev: "EV",
  fuel: "Fuel",
};

const VehicleAdd = ({ onVehiclesChange, currentData }) => {
  const defaultVechicle = currentData?.vechicleDetails;

  const defaultValues = {
    vechicleType: null,
    engineType: null,
    vechicleNumber: "",
    modelName: "",
  };

  const {
    control,
    formState: { errors },
    reset,
    trigger,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(vehicleValidationSchema),
    defaultValues,
  });

  const [vehicles, setVehicles] = React.useState(defaultVechicle || []);
  const [vechicleType, setVechicleType] = React.useState("");
  const [editIndex, setEditIndex] = React.useState(null);

  const onAddOrUpdateVehicle = (data) => {
    const filteredData = { ...data };
    if (data.vechicleType === "bicycle") {
      delete filteredData.engineType;
      delete filteredData.vechicleNumber;
    }

    if (editIndex !== null) {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle, index) =>
          index === editIndex ? filteredData : vehicle
        )
      );
      setEditIndex(null);
    } else {
      setVehicles((prevVehicles) => [...prevVehicles, filteredData]);
    }

    reset(defaultValues);
    setVechicleType("");
  };

  const handleDeleteVehicle = (index) => {
    setVehicles((prevVehicles) => prevVehicles.filter((_, i) => i !== index));
  };

  const handleEditVehicle = (index) => {
    const vehicle = vehicles[index];
    setEditIndex(index);
    setValue("vechicleType", vehicle.vechicleType);
    setValue("modelName", vehicle.modelName);
    setValue("engineType", vehicle.engineType);
    setValue("vechicleNumber", vehicle.vechicleNumber);
    setVechicleType(vehicle.vechicleType);
  };

  const onSubmit = async () => {
    const vechicleType = getValues("vechicleType");
    let isValid;

    if (vechicleType === "bicycle") {
      isValid = await trigger(["vechicleType", "modelName"]);
    } else {
      isValid = await trigger();
    }

    if (isValid) {
      const data = getValues();
      onAddOrUpdateVehicle(data);
    }
  };

  const handleVechicleTypeChange = (value) => {
    setVechicleType(value);
  };

  React.useEffect(() => {
    onVehiclesChange(vehicles);
  }, [vehicles, onVehiclesChange]);

  React.useEffect(() => {
    if (defaultVechicle) {
      setVehicles(defaultVechicle);
    }
  }, [defaultVechicle]);

  return (
    <Stack spacing={2} my={2}>
      <Card sx={{ boxShadow: 3, px: 2, border: "1px solid #B4B4B4" }}>
        <CardHeader
          title={
            <Typography sx={{ fontSize: "20px" }} gutterBottom>
              Vehicle Details
            </Typography>
          }
        />
        <form>
          <CardContent
            sx={{
              display: "grid",
              gridTemplateColumns: {
                lg: "repeat(2, 1fr)",
                sm: "repeat(1, 1fr)",
                xs: "1fr",
              },
              gap: 3,
            }}
          >
            <Stack spacing={2}>
              <Controller
                name="vechicleType"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.vechicleType}>
                    <FormLabel sx={{ fontSize: "14px" }}>
                      Vehicle Type
                    </FormLabel>
                    <RadioGroup
                      row
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleVechicleTypeChange(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="bicycle"
                        control={<Radio sx={{ transform: "scale(0.9)" }} />}
                        label={
                          <Typography sx={{ fontSize: "14px" }}>
                            Bicycle
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="bike"
                        control={<Radio sx={{ transform: "scale(0.9)" }} />}
                        label={
                          <Typography sx={{ fontSize: "14px" }}>
                            Bike
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="four wheeler"
                        control={<Radio sx={{ transform: "scale(0.9)" }} />}
                        label={
                          <Typography sx={{ fontSize: "14px" }}>Car</Typography>
                        }
                      />
                    </RadioGroup>
                    {errors.vechicleType && (
                      <Typography
                        color="error"
                        sx={{ fontSize: "12px", ml: 2 }}
                      >
                        {errors.vechicleType.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
            {vechicleType !== "bicycle" && (
              <Stack spacing={2}>
                <Controller
                  name="engineType"
                  control={control}
                  render={({ field }) => (
                    <FormControl error={!!errors.engineType}>
                      <FormLabel sx={{ fontSize: "14px" }}>
                        Engine Type
                      </FormLabel>
                      <RadioGroup row {...field} value={field.value}>
                        <FormControlLabel
                          value="ev"
                          control={<Radio sx={{ transform: "scale(0.9)" }} />}
                          label={
                            <Typography sx={{ fontSize: "14px" }}>
                              EV
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="fuel"
                          control={<Radio sx={{ transform: "scale(0.9)" }} />}
                          label={
                            <Typography sx={{ fontSize: "14px" }}>
                              Fuel
                            </Typography>
                          }
                        />
                      </RadioGroup>
                      {errors.engineType && (
                        <Typography
                          color="error"
                          sx={{ fontSize: "12px", ml: 2 }}
                        >
                          {errors.engineType.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            )}
            {vechicleType !== "bicycle" && (
              <Stack spacing={2}>
                <Typography sx={{ fontSize: "14px" }} gutterBottom>
                  Vehicle Number
                </Typography>
                <Controller
                  name="vechicleNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      error={!!errors.vechicleNumber}
                      helperText={errors.vechicleNumber?.message}
                    />
                  )}
                />
              </Stack>
            )}
            <Stack spacing={2}>
              <Typography sx={{ fontSize: "14px" }} gutterBottom>
                Model / Company
              </Typography>
              <Controller
                name="modelName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    error={!!errors.modelName}
                    helperText={errors.modelName?.message}
                  />
                )}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "50px" }}
              size="medium"
              onClick={onSubmit}
            >
              {editIndex !== null ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </CardActions>
        </form>
        <CardContent>
          <Typography sx={{ fontSize: "20px" }} gutterBottom>
            Vehicle List
          </Typography>
          <Table sx={{ border: "1px solid #B4B4B4" }}>
            <TableHead sx={{ bgcolor: "#674D9F", border: "1px solid #B4B4B4" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Vehicle Type</TableCell>
                <TableCell sx={{ color: "#fff" }}>Fuel Type</TableCell>
                <TableCell sx={{ color: "#fff" }}>Vehicle Number</TableCell>
                <TableCell sx={{ color: "#fff" }}>Model / Company</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {vehicleTypeLabels[vehicle.vechicleType] || `--`}
                    </TableCell>
                    <TableCell>
                      {engineTypeLabels[vehicle.engineType] || `--`}
                    </TableCell>
                    <TableCell>{vehicle.vechicleNumber || `--`}</TableCell>
                    <TableCell>{vehicle.modelName || `--`}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditVehicle(index)}
                      >
                        <Icon icon="mdi:pencil" size={1} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteVehicle(index)}
                      >
                        <Icon icon="mdi:delete" size={1} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
                    <Stack direction="column" alignItems="center" spacing={1}>
                      <Typography variant="h6" color="textSecondary">
                        No Data Found
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default VehicleAdd;
