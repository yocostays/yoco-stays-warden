import { RHFAutocomplete } from "@components/hook-form";
import { getCoursesAsync } from "@features/course/courseApi";
import { getUniversityList } from "@features/university/universitySlice";
import { Box, Typography, Grid } from "@mui/material";
import FormLabel from "@utils/FormLabel";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

AcademicDetailsForm.propTypes = {
  methods: PropTypes.object.isRequired,
  verified: PropTypes.bool,
  id: PropTypes.string,
};

export default function AcademicDetailsForm({ methods, verified, id }) {
  const dispatch = useDispatch();
  const { handleSubmit, setValue } = methods;
  const [universityId, setUniversityId] = useState("");
  const { universityList } = useSelector((state) => state.university);
  const { courseList } = useSelector((state) => state.course);

  const semesterOptions = [
    { value: "1", label: "1st" },
    { value: "2", label: "2nd" },
    { value: "3", label: "3rd" },
    { value: "4", label: "4th" },
    { value: "5", label: "5th" },
    { value: "6", label: "6th" },
    { value: "7", label: "7th" },
    { value: "8", label: "8th" },
  ];
  

  const generateYears = (startYear) => {
    const currentYear = moment().year();
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };
  const academicYears = generateYears(2021);

  useEffect(() => {
    dispatch(getUniversityList());
  }, [dispatch]);

  useEffect(() => {
    if (universityId) {
      dispatch(getCoursesAsync({ universityId: universityId }));
    }
  }, [universityId]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        px: { sm: "35px", sx: "10px" },
        bgcolor: "#674D9F0D",
        paddingLeft: "16px",
        paddingRight: "16px",
        mb: "150px",
        mt: "60px",
        py: "30px",
        borderRadius: "20px",
      }}
    >
      {/* Header Section */}
      <Typography variant="h5" fontWeight="bold" color="#5E2E8C" mb={3}>
        Academic Details
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit()}>
          <Grid container spacing={3} alignItems="center">
            {/* Academic year Section */}
            <Grid item xs={12} sm={3}>
              <Typography variant="body1">Academic Year</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFAutocomplete
                name="academicYear"
                label="Select Academic Year"
                size="small"
                options={academicYears || []}
                disabled={!id && !verified}
                getOptionLabel={(option) => option || ""}
              />
            </Grid>

            {/*Cource Section */}
            <Grid item xs={12} sm={3}>
             <FormLabel label="College Name" required />

            </Grid>
            <Grid item xs={12} sm={9}>
              <RHFAutocomplete
                name="college"
                label="Select College"
                size="small"
                options={universityList || []}
                disabled={!id && !verified}
                onChange={(e, value) => {
                  setValue("college", value, { shouldValidate: true });
                  setUniversityId(value?._id);
                }}
              />
            </Grid>

            {/*Cource Section */}
            <Grid item xs={12} sm={3}>
                            <FormLabel label="Course Name" required />

            </Grid>

            <Grid item xs={12} sm={9}>
              <RHFAutocomplete
                name="course"
                label="Select Course"
                size="small"
                options={courseList || []}
                disabled={!id && !verified}
              />
            </Grid>

            {/*Semester Section */}
            <Grid item xs={12} sm={3}>
                            <FormLabel label="Semester" required />

            </Grid>

            <Grid item xs={12} sm={9}>
              <RHFAutocomplete
                name="semester"
                label="Select Semester"
                size="small"
                options={semesterOptions}
                disabled={!id && !verified}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}

