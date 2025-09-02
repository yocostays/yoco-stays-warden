
import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMessById } from "../../../../features/mess/messSlice";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import TableLoader from "../../../../components/tableLoader/TableLoader";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManagementDetails = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { messById, loading } = useSelector((state) => state?.mess);
  const [isEdit, setIsEdit] = useState(false);

  const validationSchema = Yup.object().shape({
    breakfast: Yup.string().required("Breakfast is required"),
    lunch: Yup.string().required("Lunch is required"),
    snacks: Yup.string().required("Snacks is required"),
    dinner: Yup.string().required("Dinner is required"),
    day: Yup.string().required("Day is required"),
    date: Yup.date().required("Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      breakfast: "",
      lunch: "",
      snacks: "",
      dinner: "",
      day: "",
      date: "",
    },
    validationSchema,
    onSubmit: () => {
      setIsEdit(false);
    },
  });

  useEffect(() => {
    dispatch(getMessById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (messById) {
      formik.setValues({
        breakfast: messById.breakfast || "",
        lunch: messById.lunch || "",
        snacks: messById.snacks || "",
        dinner: messById.dinner || "",
        day: messById.day || "",
        date: dayjs(messById.date).format("YYYY-MM-DD") || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messById]);

  return (
    <Box m={1}>
      {loading ? (
        <TableLoader />
      ) : (
        <Card sx={{ padding: 4, borderRadius: 2, border: "1px solid #B4B4B4" }}>
          {/* Edit Button */}
          <Grid container justifyContent="flex-end">
            {!isEdit && (
              <Button
                variant="outlined"
                onClick={() => setIsEdit(true)}
                sx={{
                  marginBottom: 2,
                  border: "2px solid #000",
                  borderRadius: "20px",
                  display: "none",
                }}
              >
                Edit
              </Button>
            )}
          </Grid>

          {/* User Information */}
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={2.3}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  <strong>Break Fast:</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {!isEdit ? (
                  <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                    :{" "}
                    <span style={{ marginLeft: "8px" }}>
                      {formik.values.breakfast || "-"}
                    </span>
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="breakfast"
                    value={formik.values.breakfast}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.breakfast &&
                      Boolean(formik.errors.breakfast)
                    }
                    helperText={
                      formik.touched.breakfast && formik.errors.breakfast
                    }
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>

              <Grid item xs={2.3}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  <strong>Lunch:</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {!isEdit ? (
                  <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                    :{" "}
                    <span style={{ marginLeft: "8px" }}>
                      {formik.values.lunch || "-"}
                    </span>
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="lunch"
                    value={formik.values.lunch}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lunch && Boolean(formik.errors.lunch)}
                    helperText={formik.touched.lunch && formik.errors.lunch}
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>

              <Grid item xs={2.3}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  <strong>Snack:</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {!isEdit ? (
                  <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                    :{" "}
                    <span style={{ marginLeft: "8px" }}>
                      {formik.values.snacks || "-"}
                    </span>
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="snacks"
                    value={formik.values.snacks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.snacks && Boolean(formik.errors.snacks)
                    }
                    helperText={formik.touched.snacks && formik.errors.snacks}
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>

              <Grid item xs={2.3}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  <strong>Dinner:</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {!isEdit ? (
                  <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                    :{" "}
                    <span style={{ marginLeft: "8px" }}>
                      {formik.values.dinner || "-"}
                    </span>
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="dinner"
                    value={formik.values.dinner}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.dinner && Boolean(formik.errors.dinner)
                    }
                    helperText={formik.touched.dinner && formik.errors.dinner}
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>

              <Grid item xs={2.3}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  <strong>Day:</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  :{" "}
                  <span style={{ marginLeft: "8px" }}>
                    {formik.values.day || "-"}
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={2.3}>
                <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                  <strong>Date:</strong>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {!isEdit ? (
                  <Typography fontSize={'14px'} sx={{ display: "flex" }}>
                    :{" "}
                    <span style={{ marginLeft: "8px" }}>
                      {dayjs(formik.values.date).format("DD-MMM-YYYY") || "-"}
                    </span>
                  </Typography>
                ) : (
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    sx={{ mb: 2 }}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {isEdit && (
                  <Stack
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    gap={2}
                  >
                    <Button variant="contained" color="primary" type="submit">
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setIsEdit(false)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </form>
        </Card>
      )}
    </Box>
  );
};

export default ManagementDetails;
