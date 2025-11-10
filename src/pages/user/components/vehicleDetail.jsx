import { useEffect, useState } from "react";
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
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@components/customComponents/InputFields";
import RadioButton from "@components/customComponents/CustomRadio";
import { deleteVehicleDetails, removeVehicleData, setVehicleData, updateVehicleData } from "@features/users/userSlice";

const VehicleForm = ({ vehicleDetails, setVehicleDetails, verified, id }) => {

  const [editVehicle, setEditVehicle] = useState(false)
  const { verifyUserName, vehicleData } = useSelector((state) => state.users);

  const dispatch = useDispatch()


  const validationSchema = yup.object({
    vehicleType: yup.string().nullable(),
    vechicleNumber: yup
      .string()
      .transform((value) => value?.trim().toUpperCase() || "") // trims and capitalizes
      .when("vehicleType", {
        is: (val) => val !== "bicycle",
        then: (schema) =>
          schema
            .required("Vehicle Number is required.")
            .matches(
              /^[A-Za-z0-9\s]+$/,
              "Vehicle Number must contain only letters, numbers, and spaces."
            )
            .min(6, "Vehicle Number must be at least 6 characters long.")
            .max(10, "Vehicle Number cannot be more than 10 characters long."),
        otherwise: (schema) => schema.notRequired(),
      }),

    modelNumber: yup.string().when("vehicleType", {
      is: (val) => {
        return val;
      },
      then: (schema) => schema.required("Model Number is required."),
      otherwise: (schema) => schema.notRequired(),
    }),
    engineType: yup.string().when('vehicleType', {
      is: (val) => val !== 'bicycle',
      then: (schema) => schema.required('Engine Type is required.'),
      otherwise: (schema) => schema.notRequired()
    }),

  })


  const { register, clearErrors, setValue, watch, setError, handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm(
    {
      resolver: yupResolver(validationSchema),
      mode: "onTouched",           // Show error only after touching & leaving field
      reValidateMode: "onChange",
      defaultValues: {
        vechicleNumber: "",
        modelNumber: "",
        engineType: "",
        vechicleType: ""
      },
    })


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit = async (values) => {

    const isDuplicate = vehicleData?.some((vehicle) => {
      const existingNumber = String(vehicle?.vechicleNumber || "").trim().toLowerCase();
      const currentNumber = String(values?.vechicleNumber || "").trim().toLowerCase();
      if (!existingNumber || !currentNumber) return false;
      return existingNumber === currentNumber;
    });

    if (isDuplicate) {
      setError("vechicleNumber", {
        type: "custom", message: "Vehicle Number already exist"
      })
      return;
    }

    let newVehicle = {
      vechicleType: values?.vehicleType,
      engineType: values?.vehicleType !== "bicycle" ? values?.engineType : "",
      vechicleNumber: values?.vechicleNumber.trim(),
      modelName: values?.modelNumber,
    };
    if (editVehicle) {
      newVehicle.index = values?.index
      dispatch(updateVehicleData(newVehicle))
      setEditVehicle(false)
    } else {
      dispatch(setVehicleData(newVehicle));
    }
    if (values?.vehicleType === "bicycle") {
      resetField("engineType")
    }
    resetField("modelNumber")
    resetField("vechicleNumber")

  }


  const handleEditVehicle = (index, vehicle) => {
    setValue('index', index)
    setValue('engineType', vehicle?.engineType)
    setValue('modelNumber', vehicle?.modelName)
    setValue('vechicleNumber', vehicle?.vechicleNumber)
    setValue('vehicleType', vehicle?.vechicleType)
    setEditVehicle(true)
  };

  const handleDeleteVehicle = (index) => {
    dispatch(removeVehicleData(index))

  };


  useEffect(() => {
    if (editVehicle && watch('vehicleType') === 'bicycle') {
      setValue('engineType', "")
      setValue('vechicleNumber', "")
    }
  }, [watch('vehicleType')])

  // useEffect(() => {
  //   console.log(vehicleDetails?.length,"lengthhhhhhhhhhhhhhh")
  //   if (vehicleDetails && vehicleDetails.length > 0 && id) {
  //     vehicleDetails.forEach((item) => {
  //       console.log(item,"itemmmmmmmmmmmmmmmmm")
  //       dispatch(setVehicleData(item));
  //     });
  //   }
  // }, [vehicleDetails]);

  useEffect(() => {
    return () => {
      dispatch(deleteVehicleDetails())
    }
  }, [dispatch])


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
          <Stack spacing={2}>
            {/* Vehicle Type */}
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              alignItems={isSmallScreen ? "start" : "center"}
              spacing={2}
            >

              <FormLabel sx={{ minWidth: "120px", pt: "10px" }}>
                Vehicle Type
              </FormLabel>
              <RadioButton
                error={errors?.vehicleType?.message}
                checked={watch('vehicleType')}
                value={watch('vehicleType') || ''}
                {...register('vehicleType')}
                onChange={(e) => {
                  clearErrors()
                  setValue('vehicleType', e?.target?.value, { shouldValidate: true })

                }}
                data={[
                  { value: "bicycle", label: "Bicycle" },
                  { value: "bike", label: "Bike" },
                  { value: "car", label: "Car" },
                ]} />

            </Stack>
            {watch('vehicleType') !== 'bicycle' && (
              <Stack
                direction={isSmallScreen ? "column" : "row"}
                alignItems={isSmallScreen ? "start" : "center"}
                spacing={2}
              >

                <FormLabel sx={{ minWidth: "120px", pt: "10px" }}>
                  Engine Type
                </FormLabel>
                <RadioButton
                  error={errors?.engineType?.message}
                  checked={watch('engineType')}
                  value={watch('engineType')}
                  {...register('engineType')}
                  onChange={(e) => {
                    setValue('engineType', e?.target?.value,
                      { shouldValidate: true })
                  }}
                  data={[
                    { value: "ev", label: "EV" },
                    { value: "fuel", label: "Fuel" },
                  ]} />

              </Stack>
            )}
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              alignItems={isSmallScreen ? "start" : "center"}
              spacing={2}
            >
              {watch('vehicleType') !== 'bicycle' && (
                <>
                  <FormLabel sx={{ minWidth: "120px", pt: "10px" }}>
                    Vehicle Number
                  </FormLabel>
                  <Box>
                    <Input error={errors?.vechicleNumber?.message}
                      placeholder="Vehicle Number"
                      register={register} name={"vechicleNumber"}
                      onChange={(e) => {
                        const value = e?.target?.value.replace(/^\s+/, "");
                        setValue('vechicleNumber', value.toUpperCase(), { shouldValidate: true })
                      }
                      }
                    />
                  </Box>
                </>
              )}


            </Stack>
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              alignItems={isSmallScreen ? "start" : "center"}
              spacing={2}
            >

              <FormLabel sx={{ minWidth: "120px", pt: "10px" }}>
                Model/Company
              </FormLabel>
              <Box>
                <Input
                  error={errors?.modelNumber?.message}
                  placeholder="Model/Company"
                  register={register} name={"modelNumber"}
                  onChange={(e) => {
                    const value = e?.target?.value.replace(/^\s+/, "");
                    setValue('modelNumber', value.toUpperCase(), { shouldValidate: true })
                  }
                  }
                />
              </Box>

            </Stack>
            <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
              <Typography sx={{ minWidth: "120px" }}>Add More</Typography>


              <Button
                disabled={!watch('vehicleType')}
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                // disabled={!verified || verifyUserName}
                sx={{
                  mt: 2,
                  borderRadius: "10px",
                  textTransform: "none",
                }}
              >
                <AddIcon />
                {editVehicle ? "Update Vehicle" : "Add Vehicle"}
              </Button>
              {editVehicle && (
                <Button
                  disabled={!watch('vehicleType')}
                  variant="contained"
                  // onClick={handleAddOrUpdateVehicle}
                  onClick={() => { reset(); setEditVehicle(false) }}
                  // disabled={!verified || verifyUserName}
                  sx={{
                    mt: 2,
                    borderRadius: "10px",
                    textTransform: "none",
                  }}
                >
                  {/* <AddIcon /> */}
                  {"Cancel"}
                </Button>
              )}



            </Stack>
            <Stack>
              {vehicleData?.length && vehicleData ? (
                <Box sx={{ overflowX: "auto", width: "100%", height: "100", maxHeight: "70vh" }}>
                  <Table>
                    <TableHead sx={{
                      position: "sticky", top: "0", zIndex: 9999, background: "#f7f6fa"
                    }}>
                      <TableRow>
                        <TableCell>Vehicle Type</TableCell>
                        <TableCell>Engine Type</TableCell>
                        <TableCell>Vehicle Number</TableCell>
                        <TableCell>Model/Company</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vehicleData.map((vehicle, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {(vehicle.vechicleType === "four wheeler"
                              ? "Car"
                              : vehicle.vechicleType) || "--"}
                          </TableCell>
                          <TableCell>{vehicle.engineType === "not required" ? "--" : vehicle.engineType || "--"}</TableCell>
                          <TableCell>
                            {vehicle.vechicleNumber || "--"}
                          </TableCell>
                          <TableCell>{vehicle.modelName || "--"}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleEditVehicle(index, vehicle)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              disabled={editVehicle}
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
              ) : ""}

            </Stack>
          </Stack>
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
