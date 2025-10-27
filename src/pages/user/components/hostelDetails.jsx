/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  Chip,
  capitalize,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RHFAutocomplete, RHFTextField } from "@components/hook-form";
import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getBedTypeAsync,
  getBillingCycleAsync,
  getFloorByHostelAsync,
  getRoommatesAsync,
  getRoomsByFloorAndHostelAsync,
} from "@features/hostel/hostelApi";
import { getVacantRoomDetails } from "@features/users/userSlice";
import { toast } from "react-toastify";
import { bedTypeOptions } from "@components/enums/studenEnums";
import FormLabel from "@utils/FormLabel";
import Input from "@components/customComponents/InputFields";

HostelDetailsForm.propTypes = {
  methods: PropTypes.object.isRequired,
  verified: PropTypes.bool,
  hostelList: PropTypes.array,
  setSelectedFloor: PropTypes.func,
  setSelectedRoom: PropTypes.func,
  selectedFloor: PropTypes.object,
  selectedRoom: PropTypes.object,
  id: PropTypes.string,
};

export default function HostelDetailsForm({
  methods,
  verified,
  hostelList,
  selectedFloor,
  setSelectedFloor,
  selectedRoom,
  setSelectedRoom,
  id,
}) {
  const dispatch = useDispatch();

  const { handleSubmit, setValue, watch, register, resetField, formState: { errors }, } = methods;
  const { bedType, floorList, roomList, roomMates, getBillingCycle } =
    useSelector((state) => state.hostel);

  const billingCycleOptions = getBillingCycle?.map((items) => ({
    label: capitalize(items),
    value: items,
  }));

  const [room, setRoom] = useState(false);
  const [floor, setFloor] = useState(false);
  const [hostelId, setHostelId] = useState("");
  const [bedTypeValue, setBedTypeValue] = useState(0);
  const [vacantRoom, setVacantRoom] = useState("0/0");
  const [isVacant, setIsVacant] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roomNumberInput, setRoomNumberInput] = useState("");

  // const [roommates, setRoommates] = useState([
  //   { id: 1, avatar: null },
  //   { id: 2, avatar: null },
  //   { id: 3, avatar: null },
  // ]); // State for roommates

  // required later
  // const handleAvatarChange = (event, roommateId) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setRoommates((prevRoommates) =>
  //         prevRoommates.map((roommate) =>
  //           roommate.id === roommateId
  //             ? { ...roommate, avatar: reader.result }
  //             : roommate
  //         )
  //       );
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleRoomNumberSelect = () => {
    if (roomNumberInput) {
      setSelectedRoom(parseInt(roomNumberInput, 10));
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    if (hostelId) {
      dispatch(getBedTypeAsync({ hostelId }))
    }
  }, [hostelId]);

  useEffect(() => {
    if (hostelList) {
      setValue("hostel", hostelList[0], { shouldValidate: true });
      setValue('hostelName', hostelList[0]?.name, { shouldValidate: true })
      setHostelId(hostelList[0]?._id);
    }
  }, [hostelList])

  useEffect(() => {
    if (hostelId && bedTypeValue) {
      dispatch(getFloorByHostelAsync({ hostelId, bedType: bedTypeValue })).then(
        (res) => {
          if (res?.payload?.statusCode === 200) {
            setFloor(true);
            setRoom(false);
          } else {
            toast.error(res?.payload, { variant: "error" });
          }
        }
      );
    }
  }, [hostelId, bedTypeValue]);

  useEffect(() => {
    if (hostelId && bedTypeValue && selectedFloor?.floorNumber) {
      dispatch(
        getRoomsByFloorAndHostelAsync({
          hostelId,
          bedType: bedTypeValue,
          floorNumber: selectedFloor?.floorNumber,
        })
      ).then((res) => {
        if (res?.payload?.statusCode === 200) {
          setRoom(true);
        }
      });
    }
  }, [hostelId, bedTypeValue, selectedFloor?.floorNumber]);

  useEffect(() => {
    if (selectedRoom) {
      const payload = {
        hostelId: hostelId,
        bedType: bedTypeValue,
        roomNumber: selectedRoom?.roomNumber,
      };

      dispatch(getRoommatesAsync(payload));

      dispatch(getBillingCycleAsync({ hostelId }));

      dispatch(getVacantRoomDetails(payload)).then((res) => {
        if (res?.payload?.statusCode === 200) {
          const [numerator] = res?.payload?.data?.vacant?.split("/");
          setVacantRoom(res?.payload?.data?.vacant);
          if (numerator !== "0") {
            setIsVacant(true);
          } else {
            toast.error("Selected room is not vacant !", { variant: "error" });
            setIsVacant(false);
          }
        }
      });
    }
  }, [selectedRoom]);


  const floorNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const singlebedNo = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },

  ]

  const doublebedNo = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },

  ]

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        px: { sm: "35px", sx: "10px" },
        mt: "30px",
        mb: "150px",
        bgcolor: "#674D9F0D",
        py: "30px",
        paddingLeft: "16px",
        paddingRight: "16px",
        borderRadius: "20px",
      }}
    >
      {/* {/ Header Section /} */}
      <Typography variant="h5" fontWeight="bold" color="#5E2E8C" mb={3}>
        Hostel Details
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit()}>
          <Grid container spacing={3}>
            {/* {/ Hostel Name /} */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Hostel Name" required />

            </Grid>

            <Grid item xs={12} sm={9}>
              {/* <RHFAutocomplete
                name="hostel"
                label="Select Hostel"
                size="small"
                options={hostelList || []}
                // disabled={!id && !verified}
                onChange={(e, value) => {
                  setValue("hostel", value, { shouldValidate: true });
                  setValue("selectWing", value.buildingNumber, {
                    shouldValidate: true,
                  });
                  setHostelId(value?._id);
                  setValue("bedType", {}, { shouldValidate: true });
                  setBedTypeValue(null);
                  setVacantRoom("0/0");
                  setSelectedFloor(null);
                  setSelectedRoom(null);
                  setIsVacant(false);
                  setFloor(false);
                  setRoom(false);
                  // setRoommates([
                  //   { id: 1, avatar: null },
                  //   { id: 2, avatar: null },
                  //   { id: 3, avatar: null },
                  // ]);
                }}
              /> */}

              <Input
                error={errors?.hostelName?.message}
                value={hostelList[0]?.name}
                disabled={true}
                placeholder="Hostel" register={register}
                name="hostelName"
                onChange={(e) => {
                  const value = e?.target?.value.replace(/^\s+/, "");
                  setValue('hostelName', value, { shouldValidate: true })
                }
                }
              />
            </Grid>

            {/* {/ Building/Wing /} */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Building/Wing" />

            </Grid>
            <Grid item xs={12} sm={9}>
              {/* <RHFTextField name="selectWing" disabled size="small" /> */}
              <Input
                error={errors?.bedType?.message}
                value={watch("selectWing")}
                placeholder="Building/Wing" register={register}
                name="selectWing"
                onChange={(e) => {
                  const value = e?.target?.value.replace(/^\s+/, "");
                  setValue('selectWing', value, { shouldValidate: true })
                }
                }
              />
            </Grid>

            {/* Bed Type */}
            <Grid item xs={12} sm={3}>
              <FormLabel label="Select Bed Type" />

            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFAutocomplete
                name="bedType"
                label="Select Bed Type"
                size="small"
                // options={bedType || []}
                options={[{
                  label: "Single",
                  value: "Single"
                }, {
                  label: "Bunker",
                  value: "Bunker"
                }]}
                // disabled={!id && !verified}
                // getOptionLabel={(option) => {
                //   const matchedOption = bedTypeOptions.find(
                //     (item) => item.value === option.bedType
                //   );

                //   return matchedOption ? matchedOption.label : ""; // Return label if found, else empty string
                // }}
                onChange={(e, value) => {
                  setValue("bedType", value, { shouldValidate: true });
                  resetField('bedNo')
                  setBedTypeValue(value?.bedType);
                  setVacantRoom("0/0");
                  setSelectedFloor(null);
                  setIsVacant(false);
                  setRoom(false);
                  // setRoommates([
                  //   { id: 1, avatar: null },
                  //   { id: 2, avatar: null },
                  //   { id: 3, avatar: null },
                  // ]);
                }}
              />
            </Grid>

            {/* Floor Selection */}
            {/* {floor && floorList?.length > 0 && ( */}

            <>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Floor Number
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                    fontWeight="bold"
                  >
                    Floor
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {floorNo?.map((floor) => (
                      <Button
                        key={floor}
                        onClick={() => {
                          setValue('floor',floor)
                          setSelectedFloor(floor);
                          setIsVacant(false);
                          setRoom(true);
                        }} // Set selected floor
                        sx={{
                          textTransform: "none",
                          backgroundColor:
                            selectedFloor === floor ? "#5E2E8C" : "#674D9F0d",
                          color:
                            selectedFloor === floor ? "white" : "#5E2E8C",
                          border: "1px solid #5E2E8C",
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "14px",
                          "&:hover": {
                            backgroundColor: "#5E2E8C",
                            color: "white",
                          },
                          minWidth: "unset", // Remove default minWidth
                          padding: 0, // Remove padding
                        }}
                      // disabled={!id && !verified}
                      >
                        {floor || ""}
                      </Button>
                    ))}
                  </Box>
                </>
                {/* {room && roomList?.length > 0 && ( */}
                <>
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, mb: 1 }}
                    fontWeight="bold"
                  >
                    Room Number
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Input
                      error={errors?.roomNumber?.message}
                      // value={watch('studentName')}
                      placeholder="Room No." register={register}
                      name={"roomNumber"}
                      type={"text"}
                      onChange={(e) => {
                        const value = e?.target?.value.replace(/^\s+/, "");
                         const onlyDigits = value.replace(/\D/g, '');
                        setValue('roomNumber', onlyDigits, { shouldValidate: true })
                      }
                      }
                    />
                    {/* {roomList?.map((room) => ( */}

                    {/* ))} */}
                    {/* {roomList?.length > 5 && ( */}
                    {/* <Button
                            onClick={() => setDialogOpen(true)}
                            // disabled={!verified}
                            sx={{
                              backgroundColor: "#5E2E8C",
                              color: "white",
                              cursor: "pointer",
                              height: "40px",
                              width: "40px",
                              minWidth: "unset",
                              padding: 0,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <MoreHorizIcon />
                          </Button> */}
                    {/* )} */}
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <Typography
                      variant="body2"
                      sx={{ mt: 2, mb: 1 }}
                      fontWeight="bold"
                    >
                      Bed Number
                    </Typography>
                    <RHFAutocomplete
                      name="bedNo"
                      label="Select Bed No."
                      size="small"
                      options={watch('bedType')?.value === "Single" ? singlebedNo : doublebedNo}
                    // disabled={!id && !verified}
                    />

                  </Box>
                  {/* <Box mt={2}>
                    <Typography fontSize={"14px"}>
                      Vacant:{" "}
                      <Chip
                        label={vacantRoom}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: "500",
                          backgroundColor: "#846ABF",
                          color: "white",
                        }}
                      />{" "}
                      (Free/Total)
                    </Typography>
                  </Box> */}
                </>
                {/* )} */}
              </Grid>
            </>
            {/* )} */}
            {/* Dialog for Number Picker */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogContent>
                <Typography variant="body1" mb={2}>
                  Enter Room Number
                </Typography>

                <RHFTextField
                  placeholder="Type Here"
                  value={roomNumberInput}
                  onChange={(e) => setRoomNumberInput(e.target.value)}
                  size="small"
                  name="roomNumber"
                // disabled={!id && !verified}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDialogOpen(false)}
                  sx={{ color: "#5E2E8C" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRoomNumberSelect}
                  sx={{
                    backgroundColor: "#5E2E8C",
                    color: "white",
                    "&:hover": { backgroundColor: "#472b73" },
                  }}
                >
                  Select
                </Button>
              </DialogActions>
            </Dialog>

            {/* Bed Number */}
            {room && selectedRoom && isVacant && (
              <>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1">Bed Number</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFAutocomplete
                    name="bedNumber"
                    label="Select Bed Number"
                    size="small"
                    options={
                      selectedRoom?.bedNumbers.filter((bed) => bed?.isVacant) ??
                      []
                    }
                    getOptionLabel={(option) => option.bedNumber || ""}
                    disabled={!id && !verified}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1">Billing Cycle</Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <RHFAutocomplete
                    name="billingCycle"
                    label="Select Billing Cycle"
                    size="small"
                    options={billingCycleOptions || []}
                    getOptionLabel={(option) => option.label || ""}
                    disabled={!id && !verified}
                  />
                </Grid>
                {/* Roommates */}
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1">Room mates</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    maxWidth: "100%",
                    justifyContent: "flex-start",
                  }}
                >
                  {roomMates.length > 0 ? (
                    roomMates?.map((roommate) => (
                      <Box
                        key={roommate.id}
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar
                          src={roommate?.image}
                          sx={{
                            width: 40,
                            height: 40,
                            border: "2px solid rgb(169, 143, 196)",
                          }}
                          disabled={true}
                        />

                        <Typography variant="caption">
                          {roommate?.name}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box>
                      <Typography>No Roommates Yet!</Typography>
                    </Box>
                  )}

                  {/* <Avatar
                sx={{
                  backgroundColor: "#5E2E8C",
                  color: "white",
                  cursor: "pointer",
                  width: 40,
                  height: 40,
                }}
                onClick={handleAddRoommate}
              >
                <AddIcon />
              </Avatar> */}
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
