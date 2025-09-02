import { useEffect, useState } from "react";
import {
  Stack,
  Card,
  CardHeader,
  CardContent,
  Button,
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
  Autocomplete,
  Checkbox,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { RHFAutocomplete } from "@components/hook-form";
import { Controller, FormProvider } from "react-hook-form";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  getFloorNoByHostelIdAsync,
  getRoomsByMultipleFloorsAsync,
} from "@features/hostel/hostelApi";
import { toast } from "react-toastify";

const HostelForm = ({
  hostelDetails,
  setHostelDetails,
  verified,
  id,
  hostelList,
  methods,
}) => {
  const dispatch = useDispatch();

  const { getFloorNoByHostelId, getRoomNumberByFloorNumber } = useSelector(
    (state) => state.hostel
  );

  const [editIndex, setEditIndex] = useState(null);

  const { verifyUserName } = useSelector((state) => state.users);

  const [errors, setErrors] = useState({
    hostel: "",
    floors: [],
    rooms: [],
  });
  const { setValue, control, watch } = methods;
  const [hostle, setHostle] = useState({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const hostel = watch("hostel");
  const floors = watch("floors");
  const rooms = watch("rooms");
  const floorNumbers = floors?.map((item) => item?.floorNumber);

  const validateFields = () => {
    const newErrors = {
      hostel: !hostel,
      floors: floors?.length <= 0,
      rooms: rooms?.length <= 0,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleAddOrUpdateVehicle = () => {
    // Validate input fields
    if (!validateFields()) return;

    const existingIndex = hostelDetails?.findIndex(
      (item) => item?.hostelId?._id === hostle?._id
    );
    if (existingIndex !== -1 && editIndex ===  null) {
      toast.error('Hostel already exists! Please update the existing hostel');
    } else{      
          const floorNumber = floors?.map((item) => Number(item?.floorNumber)) || [];
          const roomNumber = rooms?.map((item) => Number(item?.roomNumber)) || [];    
      
          const newHostel = {
            hostelId: hostel,
            floorNumber,
            roomNumber,
          };
      
          if (editIndex !== null) {
            // Update existing vehicle
            setHostelDetails((prevHostel) =>
              prevHostel?.map((vehicle, index) =>
                index === editIndex ? newHostel : vehicle
              )
            );
          } else {
            // Add new vehicle
            setHostelDetails((prevHostel = []) => [...prevHostel, newHostel]);
          }
          resetForm();
          setValue("hostel", null);
    }
  };

  const handleEditVehicle = (index) => {
    const hostel = hostelDetails[index];

    setHostle(hostel.hostelId);
    setValue("hostel", hostel.hostelId);

    const formattedFloors = hostel?.floorNumber?.map((num) => ({
      floorNumber: num,
    }));
    const formattedRooms = hostel?.roomNumber?.map((num) => ({
      roomNumber: num,
    }));
  
    setValue("floors", formattedFloors); // Set floors
    setValue("rooms", formattedRooms); // Set rooms
    setEditIndex(index);
  };

  const handleDeleteVehicle = (index) => {
    setHostelDetails((prevVehicles) =>
      prevVehicles.filter((_, i) => i !== index)
    );
  };

  const resetForm = () => {
    setEditIndex(null);
    setErrors({
      hostel: false,
      floors: false,
      rooms: false,
    });
    setValue("hostel", {});
    setValue("floors", []);
    setValue("rooms", []);
    setHostle(null);
  };

  useEffect(() => {
    if (hostel) {
      dispatch(getFloorNoByHostelIdAsync({ hostelId : hostel?._id}));
    }
  }, [dispatch, hostel]);

  useEffect(() => {
    if (hostel && floorNumbers?.length > 0) {
      dispatch(getRoomsByMultipleFloorsAsync({ hostelId: hostel?._id, floorNumbers }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostel, JSON.stringify(floorNumbers), dispatch]);

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
              Hostel Details
            </Typography>
          }
        />
        <CardContent>
          <FormProvider {...methods}>
            <form>
              <Stack spacing={2}>
                {/* Hostel Name */}
                <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
                  <Typography sx={{ minWidth: "120px" }}>
                    Hostel Name
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    {/* <RHFAutocomplete
                      name="hostel"
                      label="Select Hostel"
                      size="small"
                      options={hostelList || []}
                      disabled={!id && !verified}
                      onChange={(e, value) => {
                        setValue("hostel", value, { shouldValidate: true });
                        setValue("floors", [], {
                          shouldValidate: true,
                        });
                        setHostle(value);
                        setHostelId(value?._id);
                        setValue("rooms", [], { shouldValidate: true });
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          hostel: false,
                        }));
                      }}
                      value={hostle}
                    /> */}
                    <RHFAutocomplete
                      name="hostel"
                      label="Select Hostel"
                      size="small"
                      options={hostelList.filter(
                        (hostel) =>
                          !hostelDetails?.some(
                            (item) => item?.hostel?._id === hostel?._id
                          )
                      )}
                      disabled={!id && !verified}
                      onChange={(e, value) => {
                        setValue("hostel", value, { shouldValidate: true });
                        setValue("floors", [], { shouldValidate: true });
                        setHostle(value);
                        setValue("rooms", [], { shouldValidate: true });
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          hostel: false,
                        }));
                      }}
                      value={hostle}
                    />
                  </Box>
                </Stack>
                <Stack
                  direction={isSmallScreen ? "column" : "row"}
                  spacing={2}
                  sx={{ width: "100%" }} // Ensure full width
                >
                  <Typography sx={{ minWidth: "120px", flexShrink: 0 }}>
                    floors
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    {" "}
                    {/* This makes the field take all remaining space */}
                    <Controller
                      name="floors"
                      control={control}
                      defaultValue={[]} // Ensure initial value is an array
                      render={({ field }) => (
                        <Autocomplete
                          disabled={verifyUserName}
                          multiple
                          size="small"
                          id="checkboxes-tags-demo"
                          sx={{ backgroundColor: "white", width: "100%" }} // Ensure full width
                          options={getFloorNoByHostelId || []}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.floorNumber}
                          isOptionEqualToValue={(option, value) =>
                            option.floorNumber === value?.floorNumber
                          }
                          value={field.value || []} // Bind value to field.value
                          onChange={(event, newValue) => {
                            field.onChange(newValue);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              floors: false,
                            }));
                            setValue("rooms", [], { shouldValidate: true });
                          }} // Update field on change
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={
                                  <CheckBoxOutlineBlankIcon fontSize="small" />
                                }
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.floorNumber}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              placeholder="Floors"
                              {...params}
                              error={!!errors.hostel}
                              helperText={errors.hostel?.message}
                              sx={{ width: "100%" }} // Make sure input takes full width
                            />
                          )}
                        />
                      )}
                    />
                  </Box>
                </Stack>

                <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
                  <Typography sx={{ minWidth: "120px" }}>Rooms</Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Controller
                      name="rooms"
                      control={control}
                      defaultValue={[]} // Ensure initial value is an array
                      render={({ field }) => (
                        <Autocomplete
                          disabled={verifyUserName}
                          multiple
                          size="small"
                          id="checkboxes-tags-demo"
                          sx={{ backgroundColor: "white" }}
                          options={getRoomNumberByFloorNumber || []}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.roomNumber}
                          isOptionEqualToValue={(option, value) =>
                            option.roomNumber === value?.roomNumber
                          }
                          value={field.value || []} // Bind value to field.value
                          onChange={(event, newValue) => {
                            field.onChange(newValue),
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                rooms: false,
                              }));
                          }} // Update field on change
                          renderOption={(props, option, { selected }) => {
                            const { ...optionProps } = props;
                            return (
                              <li {...optionProps}>
                                <Checkbox
                                  icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                  }
                                  checkedIcon={
                                    <CheckBoxIcon fontSize="small" />
                                  }
                                  style={{ marginRight: 8 }}
                                  checked={selected}
                                />
                                {option.roomNumber}
                              </li>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              placeholder="Rooms"
                              {...params}
                              error={!!errors.rooms}
                              helperText={errors.rooms?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Box>
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
                    {editIndex !== null ? "Update Hostel" : "Add Hostel"}
                  </Button>
                </Stack>

                {/* Vehicle Table */}
                {hostelDetails && (
                  <Box sx={{ overflowX: "auto", width: "100%" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Hostel Name</TableCell>
                          <TableCell>Floors</TableCell>
                          <TableCell>Rooms</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {hostelDetails?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item?.hostelId?.name || "--"}</TableCell>
                            <TableCell>
                              {item?.floorNumber.join(',') || '--'}
                            </TableCell>
                            <TableCell>
                              {item?.roomNumber.join(',') || "--"}
                            </TableCell>
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
          </FormProvider>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default HostelForm;

HostelForm.propTypes = {
  hostelDetails: PropTypes.array.isRequired,
  setHostelDetails: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  hostelList: PropTypes.array.isRequired,
  methods: PropTypes.object.isRequired,
};
