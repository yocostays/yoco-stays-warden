import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import { Container, Box, Button, Typography } from "@mui/material";
import RHFTextField from "@components/hook-form/RHFTextField";
import { RHFAutocomplete, RHFAutocompleteMulti } from "@components/hook-form";
import RHFDatePicker from "@components/hook-form/RHFDatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserByUniversityId,
  getActiveHostelDataAsync,
  getMissedBookingListAsync,
  getUserByUniversityIdAsync,
  postManualMissedBookingAsync,
} from "@features/mess/messSlice";
import { MealTypesOption } from "@components/enums/messEnums";
import { getFloorNoByHostelIdAsync } from "@features/hostel/hostelApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  academicYear: Yup.string().required("Academic Year is required"),
  date: Yup.date().nullable().required("Date is required"),
  courseName: Yup.object().nullable().required("Course Name is required"),
  mealType: Yup.array().min(1, "Meal Type is required"),
  floorNumber: Yup.object().nullable().required("Floor No. is required"),
  studentName: Yup.object().nullable().required("Student Name is required"),
});

const MissedBookingForm = () => {
  const dispatch = useDispatch();
  const {
    getActiveHostelData: { courses, name, university, _id },
    getUserByUniversityId,
  } = useSelector((state) => state.mess);
  const hostelId = _id;
  const { getFloorNoByHostelId } = useSelector((state) => state.hostel);

  const getUserNameWithUniqueId = getUserByUniversityId.map((user) => ({
    label: `${user.name}  (${user.uniqueId})`,
    value: user,
  }));

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      academicYear: "",
      collegeName: university?.name || "",
      date: null,
      courseName: null,
      hostelName: name || "",
      mealType: [],
      floorNumber: null,
      studentName: null,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const selectedYear = watch("academicYear");
  const selectedCourse = watch("courseName");
  const selectedMealTypes = watch("mealType", []);
  const selectedFloor = watch("floorNumber");

  const generateYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };
  const academicYears = generateYears(2021);

  const handleMealTypeChange = (newValue) => {
    if (newValue.some((option) => option.value === "full day")) {
      setValue("mealType", [
        MealTypesOption.find((opt) => opt.value === "full day"),
      ]);
    } else {
      setValue("mealType", newValue);
    }
  };

  // Check if "Full-day" is selected
  const isFullDaySelected = selectedMealTypes.some(
    (option) => option.value === "full day"
  );

  // Form submission handler
  const onSubmit = (data) => {
    const payload = {
      date: moment().utc(data.date).toISOString(),
      studentId: data.studentName.value._id,
      mealType: data.mealType.map((items) => items.value),
    };
    console.log('data', data)

    dispatch(postManualMissedBookingAsync(payload)).then((res) => {
      reset();
      toast.success(res.payload.message);
      dispatch(
        getMissedBookingListAsync({
          page: 1,
          limit: 10,
        })
      );

      dispatch(clearUserByUniversityId());
    });
  };

  useEffect(() => {
    if (selectedYear && university && selectedCourse && selectedFloor) {
      const payload = {
        academicYear: selectedYear,
        universityId: university._id,
        courseId: selectedCourse._id,
      };
      dispatch(getUserByUniversityIdAsync(payload));
    }
  }, [dispatch, selectedYear, university, selectedCourse, selectedFloor]);

  useEffect(() => {
    if (hostelId) {
      dispatch(getFloorNoByHostelIdAsync({ hostelId }));
    }
  }, [dispatch, hostelId]);

  useEffect(() => {
    dispatch(getActiveHostelDataAsync());
  }, [dispatch]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xl" sx={{ py: 5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                lg: "repeat(3, 1fr)",
                sm: "repeat(2, 1fr)",
                xs: "repeat(1, 1fr)",
              },
              rowGap: { sm: 2, lg: 2 },
              columnGap: { sm: 2, lg: 4 },
            }}
          >
            {/* Academic Year */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Academic Year
              </Typography>
              <RHFAutocomplete
                fullWidth
                name="academicYear"
                placeholder="Academic Year"
                size="small"
                options={academicYears || []}
                getOptionLabel={(option) => option || ""}
              />
            </Box>

            {/* College Name */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                College Name
              </Typography>
              <RHFTextField
                size="small"
                name="collegeName"
                placeholder="College Name"
                value={university?.name}
                fullWidth
              />
            </Box>

            {/* Hostel Name */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Hostel Name
              </Typography>
              <RHFTextField
                size="small"
                name="hostelName"
                placeholder="Hostel Name"
                value={name}
                fullWidth
              />
            </Box>

            {/* Floor No */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Floor No.
              </Typography>

              <RHFAutocomplete
                fullWidth
                name="floorNumber"
                placeholder="Floor No."
                size="small"
                options={getFloorNoByHostelId || []}
                getOptionLabel={(option) => option.floorNumber || ""}
              />
            </Box>

            {/* Course Name */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Course Name
              </Typography>
              <RHFAutocomplete
                fullWidth
                name="courseName"
                placeholder="Course Name"
                size="small"
                options={courses || []}
                getOptionLabel={(option) => option.name || ""}
              />
            </Box>

            {/* Meal Type */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Meal Type
              </Typography>

              <RHFAutocompleteMulti
                multiple
                fullWidth
                name="mealType"
                options={MealTypesOption.map((option) => ({
                  ...option,
                  disabled: isFullDaySelected && option.value !== "full day",
                }))}
                getOptionLabel={(option) => option.label || ""}
                placeholder="Meal Type"
                size="small"
                onChange={(_, newValue) => handleMealTypeChange(newValue)}
                sx={{
                  '& .MuiAutocomplete-option[aria-disabled="true"]': {
                    color: isFullDaySelected && "red", // Text color for disabled options
                    "& .MuiCheckbox-root": {
                      color: isFullDaySelected && "red", // Checkbox color for disabled options
                    },
                  },
                }}
              />
            </Box>

            {/* Student Name */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Student Name
              </Typography>
              <RHFAutocomplete
                fullWidth
                name="studentName"
                placeholder="Student Name"
                size="small"
                options={getUserNameWithUniqueId || []}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option.value._id === value._id
                }
              />
            </Box>

            {/* Date */}
            <Box sx={{ display: "flex", alignitems: "center" }}>
              <Typography
                fullWidth
                variant="subtitle2"
                minWidth={130}
                fontSize={16}
                pl={1}
              >
                Date
              </Typography>
              <Box sx={{ display: "grid" }}>
                <RHFDatePicker
                  fullWidth
                  name="date"
                  maxDate={dayjs()}
                  control={control}
                  size="small"
                  format="DD/MM/YYYY"
                />
                {errors?.date && (
                  <Typography
                    sx={{
                      display: "inline-block",
                      fontSize: "12px",
                      color: "#d94e4eff",
                      fontWeight: "500",
                      pl: 2,
                    }}
                  >
                    {errors?.date?.message || ""}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: "10px" }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </form>
    </FormProvider>
  );
};

export default MissedBookingForm;
