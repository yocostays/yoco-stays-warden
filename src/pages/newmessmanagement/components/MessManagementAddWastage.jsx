/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import RHFDatePicker from "@components/hook-form/RHFDatePicker";
import { UnitTypes } from "@components/enums/messEnums";
import { useDispatch, useSelector } from "react-redux";
import {
  clearWastageByIdState,
  createFoodWastageAsync,
  getFoodWastageByIdAsync,
  updateFoodWastageAsync,
} from "@features/mess/messSlice";
import { toast } from "react-toastify";
import MessManagementFoodWastageTable from "./MessManagementFoodWastageTable";
import {
  deleteFoodWastageAsync,
  getFoodWastageDeatilListAsync,
} from "@features/mess/messApi";
import utc from "dayjs/plugin/utc";
import DragandDropFileUploadWastage from "./DragandDropFileUploadWastage";
import CloseIcon from "@mui/icons-material/Close";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  startDate: yup
    .date()
    .required("Start Date is required")
    .typeError("Invalid Start Date"),
  endDate: yup
    .date()
    .required("End Date is required")
    .typeError("Invalid End Date")
    .min(yup.ref("startDate"), "End Date cannot be before Start Date"),
  // meals: yup.object().shape({
  //   breakfast: yup.object().shape({
  //     amount: yup
  //       .number()
  //       .required("Amount is required")
  //       .min(1, "Amount must be greater than 0"),
  //     unit: yup.string().required("Unit is required"),
  //   }),
  //   lunch: yup.object().shape({
  //     amount: yup
  //       .number()
  //       .required("Amount is required")
  //       .min(1, "Amount must be greater than 0"),
  //     unit: yup.string().required("Unit is required"),
  //   }),
  //   snacks: yup.object().shape({
  //     amount: yup
  //       .number()
  //       .required("Amount is required")
  //       .min(1, "Amount must be greater than 0"),
  //     unit: yup.string().required("Unit is required"),
  //   }),
  //   dinner: yup.object().shape({
  //     amount: yup
  //       .number()
  //       .required("Amount is required")
  //       .min(1, "Amount must be greater than 0"),
  //     unit: yup.string().required("Unit is required"),
  //   }),
  // }),

  // file: yup                                                                         // Required Later
  //   .mixed()
  //   .required("File is required")
  //   .test("fileType", "Only PDF, Image, or Video files are allowed", (value) =>
  //     ["application/pdf", "image/jpeg", "image/png", "video/mp4"].includes(
  //       value?.type
  //     )
  //   ),
});

const AddWastage = () => {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState({});
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedMeal, setSelectedMeal] = useState("all");

  const { foodWastageById } = useSelector((state) => state.mess);
  const rowId = foodWastageById?._id;
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      startDate: null,
      endDate: null,
      meals: {
        breakfast: { amount: 0, unit: "" },
        lunch: { amount: 0, unit: "" },
        snacks: { amount: 0, unit: "" },
        dinner: { amount: 0, unit: "" },
      },
    },
  });

  const fetchMealBookingHistory = (data) => {
    dispatch(getFoodWastageDeatilListAsync(data));
  };


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = (values) => {
    const { startDate, endDate, meals } = values;

    const isoStartDate = dayjs(startDate)
      .utc(true)
      .startOf("day")
      .toISOString();
    const isoEndDate = dayjs(endDate).utc(true).startOf("day").toISOString();

    // Collect errors for all meal fields
    let hasError = false;
    const errors = [];

    ["breakfast", "lunch", "snacks", "dinner"].forEach((mealType) => {
      if (meals[mealType]?.amount > 0 && !meals[mealType]?.unit) {
        setError(`meals.${mealType}.unit`, {
          type: "required",
          message: "Unit is required.",
        });
        hasError = true;
        errors.push(`${mealType} unit is missing.`);
      }
    });

    // If any error exists, stop execution
    if (hasError) {
      console.error("Validation Errors:", errors);
      return;
    }

    const data = {
      startDate: isoStartDate,
      endDate: isoEndDate,
      lunch: {
        amount: meals.lunch.amount,
        unit: meals.lunch.unit,
      },
      snacks: {
        amount: meals.snacks.amount,
        unit: meals.snacks.unit,
      },
      dinner: {
        amount: meals.dinner.amount,
        unit: meals.dinner.unit,
      },
      breakfast: {
        amount: meals.breakfast.amount,
        unit: meals.breakfast.unit,
      },
    };

    ["breakfast", "lunch", "snacks", "dinner"].forEach((mealType) => {
      if (meals[mealType]?.amount === 0) {
        delete data[mealType];
      }
    });

    dispatch(
      rowId
        ? updateFoodWastageAsync({ id: rowId, data })
        : createFoodWastageAsync(data)
    )
      .then((response) => {
        if (response.payload.statusCode === 200) {
          toast.success(response.payload.message);
          const paylaod = {
            page: 1,
            limit: 10,
            mealType: "all",
          };
          setPage(0),
            setRowsPerPage(10),
            setSelectedMeal("all"),
            fetchMealBookingHistory(paylaod);
           scrollToSection('food_wastage') 
          reset();
        }
      })
      .catch((errors) => {
        console.error(errors);
        toast.error(errors);
      });
  };

  const handleGetDataById = (row) => {
    setRowData(row);
    if (row._id) {
      dispatch(getFoodWastageByIdAsync(row._id)).then((response) => {
        if (response.payload?.statusCode === 200) {
          toast.success(response.payload.message);
          scrollToSection('back_button')
        }
      });
    }
  };

  // Delet Function
  const handleDelete = (row) => {
    if (row._id) {
      dispatch(deleteFoodWastageAsync(row._id)).then((response) => {
        if (response.payload?.statusCode === 200) {
          toast.success(response.payload.message);
          fetchMealBookingHistory();
        }
      });
    }
  };

  useEffect(() => {
    if (foodWastageById?._id && rowData) {
      setValue(
        "startDate",
        dayjs.utc(foodWastageById.startDate).format("YYYY-MM-DD") || null
      );
      setValue(
        "endDate",
        dayjs.utc(foodWastageById.endDate).format("YYYY-MM-DD") || null
      );

      ["breakfast", "lunch", "snacks", "dinner"].forEach((meal) => {
        if (foodWastageById[meal]) {
          setValue(
            `meals.${meal}.amount`,
            Number(foodWastageById[meal].amount) || ""
          );
          setValue(`meals.${meal}.unit`, foodWastageById[meal].unit || "");
        }
      });
    }
  }, [foodWastageById?._id, rowData]);

  useEffect(() => {
    reset();
    dispatch(clearWastageByIdState());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <Box
      sx={{
        // width: { xs: "100%", sm: "100%",  md: ``, md: `calc(100% - 270px)` },
        // minHeight: "100vh",
        ml: { md: "270px", sm: 0 },
        p: 1,
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        gap: 2,
        zIndex: "-1",
      }}
    >
      <Box
        sx={{
          border: "1px solid #7E57C2",
          borderRadius: "20px",
        }}
      >
        <Box sx={{ borderBottom: "1px solid #7E57C2" }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ borderRadius: "none" }}
          >
            <Button id='back_button' startIcon={<ArrowBackIosIcon />}>Back</Button>
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="grid"
              columnGap={1}
              gridTemplateColumns={{
                xs: "1fr",
                sm: "1fr",
                md: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
              }}
              alignItems="center"
              mt={5}
            >
              <Box
                py={4}
                border="1px solid #7E57C2"
                borderRadius="20px"
                px={5}
                display="flex"
                flexDirection="column"
                gap={3}
                sx={{
                  minHeight: "500px",
                }}
              >
                <Box
                  display="flex"
                  alignItems="start"
                  justifyContent="space-between"
                  // gap={}
                  // mb={}
                  flexDirection={{ xs: "column", sm: "row" }}
                  sx={{ flexWrap: "wrap" }}
                >
                  <Typography fontWeight="medium">Date:</Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    sx={{ flexWrap: "wrap", width: "82%" }}
                  >
                    <Box sx={{ maxWidth: "46%" }}>
                      <RHFDatePicker
                        name="startDate"
                        control={control}
                        size="small"
                        format="DD/MM/YYYY"
                        maxDate={dayjs()}
                      />
                      {errors?.startDate?.message && (
                        <Typography variant="caption" color="error">
                          {errors?.startDate?.message}
                        </Typography>
                      )}
                    </Box>

                    <Typography fontWeight="medium" color="#ACB5BD">
                      To
                    </Typography>

                    <Box sx={{ maxWidth: "45%" }}>
                      <RHFDatePicker
                        name="endDate"
                        control={control}
                        size="small"
                        format="DD/MM/YYYY"
                        maxDate={dayjs()}
                        minDate={watch("startDate")}
                      />
                      {errors?.endDate?.message && (
                        <Typography variant="caption" color="error">
                          {errors?.endDate?.message}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                {["breakfast", "lunch", "snacks", "dinner"].map((meal) => (
                  <Box
                    key={meal}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    gap={1}
                  >
                    <Box textAlign="start" flex="1">
                      <Typography
                        fontWeight="medium"
                        textTransform="capitalize"
                      >
                        {meal}:
                      </Typography>
                    </Box>
                    <Controller
                      name={`meals.${meal}.amount`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Amount"
                          type="number"
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            setValue(
                              `meals.${meal}.amount`,
                              Number(e.target.value)
                            );
                          }}
                          error={!!errors?.meals?.[meal]?.amount}
                          helperText={errors?.meals?.[meal]?.amount?.message}
                          sx={{ width: "40%" }}
                        />
                      )}
                    />
                    <Controller
                      name={`meals.${meal}.unit`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Unit"
                          variant="outlined"
                          size="small"
                          select
                          error={!!errors?.meals?.[meal]?.unit}
                          helperText={errors?.meals?.[meal]?.unit?.message}
                          sx={{ width: "40%" }}
                        >
                          {UnitTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Box>
                ))}
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ borderRadius: "10px", paddingX: 4 }}
                  >
                    {foodWastageById?._id && rowData ? "Update" : "Submit"}
                  </Button>
                </Box>
                {/* <Box display="flex" justifyContent="center">                       // Required Later
                  {(foodWastageById?._id && rowData)  && (
                    <Button
                      onClick={() => reset()}
                      variant="contained"
                      sx={{ borderRadius: "10px", paddingX: 4 }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box> */}
              </Box>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #7E57C2",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  gap: 2,
                }}
              >
                <Controller
                  name="file"
                  control={control}
                  rules={{ required: "File is required" }}
                  render={({ field }) => (
                    <>
                      {/* Hidden Input Field */}
                      <input
                        id="file-input"
                        type="file"
                        accept=".xlsx, .xls, .csv"
                        style={{ display: "none" }}
                        // onChange={(e) => {
                        //   const file = e.target.files[0];
                        //   field.onChange(file); // Set file in form state
                        // }}
                      />
                      {/* Display Selected File Name */}
                      {field.value && (
                        <Typography sx={{ marginTop: 1 }} fontWeight="bold">
                          Selected File: {field.value.name}
                        </Typography>
                      )}
                      {/* Validation Error Message */}
                      {errors.file && (
                        <Typography color="error">
                          {errors.file.message}
                        </Typography>
                      )}
                    </>
                  )}
                />
                <IconButton
                  onClick={handleClickOpen}
                  // onClick={() => document.getElementById("file-input").click()}
                >
                  <UploadFileIcon sx={{ color: "#7E57C2" }} fontSize="large" />
                </IconButton>
                <Typography fontWeight="bold">
                  Drag & Drop your files here or
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2 }}
                  // onClick={() => document.getElementById("file-input").click()}
                  onClick={handleClickOpen}

                >
                  Choose Files
                </Button>
 
              </Box>
            </Box>
          </form>
        </FormProvider>

        {/* bulupload download */}
        <Dialog
          open={open}
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            Bulk Upload
            <IconButton
              aria-label="close"
              onClick={() => handleClose()}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DragandDropFileUploadWastage
              handleClose={handleClose}
              scrollToSection={ scrollToSection}
              fetchMealBookingHistory={() => {
                const paylaod = {
                  page: 1,
                  limit: 10,
                  mealType: "all",
                };
                setPage(0),
                  setRowsPerPage(10),
                  setSelectedMeal("all"),
                
                  fetchMealBookingHistory(paylaod);
              }}
            />
          </DialogContent>
        </Dialog>
        <Box
          sx={{
            borderRadius: "20px",
            minHeight: { lg: "80vh", xs: "100vh" },
          }}
        >
          <MessManagementFoodWastageTable
            handleGetDataById={handleGetDataById}
            handleDelete={handleDelete}
            fetchMealBookingHistory={fetchMealBookingHistory}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            scrollToSection={scrollToSection}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AddWastage);
