import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MessManagementAddMenuTable from "./MessManagementAddMenuTable";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import RHFDatePicker from "@components/hook-form/RHFDatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessByIdState,
  createMessAPiAsync,
  getMessById,
  getMessListAsync,
  updateMessMealsAsync,
} from "@features/mess/messSlice";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import DragAndDropFile from "@pages/mess-details/components/MessManagment/DragandDropFile";
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";

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
  meals: yup.object().shape({
    breakfast: yup.string().required("breakfast details are required"),
    lunch: yup.string().required("lunch details are required"),
    snacks: yup.string().required("snacks details are required"),
    dinner: yup.string().required("dinner details are required"),
  }),
});

dayjs.extend(utc);

const MessAddMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { messById } = useSelector((state) => state.mess);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      startDate: null,
      endDate: null,
      meals: {
        breakfast: "",
        lunch: "",
        snacks: "",
        dinner: "",
      },
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const onSubmit = (data) => {
    const payload = {
      fromDate: dayjs(data?.startDate).utc(true).startOf("day").toISOString(),
      toDate: dayjs(data?.endDate).utc(true).startOf("day").toISOString(),
      date: dayjs(data?.startDate).utc(true).startOf("day").toISOString(),
      breakfast: data?.meals?.breakfast,
      lunch: data?.meals?.lunch,
      snacks: data?.meals?.snacks,
      dinner: data?.meals?.dinner,
    };

    if (messById._id && isRowSelected) {
      delete payload.fromDate;
      delete payload.toDate;
    }

    dispatch(
      messById?._id
        ? updateMessMealsAsync({ id: messById?._id, data: payload })
        : createMessAPiAsync(payload)
    ).then((response) => {
      if (response.payload.statusCode === 200) {
        toast.success(response.payload.message);
        reset();

        dispatch(
          getMessListAsync({
            page: page + 1,
            limit: rowsPerPage,
            mealType: "all",
          })
        );
        scrollToSection("add_menu");
      } else {
        toast.success(response.payload.message);
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetDataById = (id) => {
    setIsRowSelected(true);
    if (id) {
      dispatch(getMessById(id)).then((response) => {
        if (response.payload) {
          toast.success(response.payload.message);
          scrollToSection("back_button");
        }
      });
    }
  };

  const handleDeleteDataById = (id) => {
    console.log("id", id);
  };

  useEffect(() => {
    if (messById._id && isRowSelected) {
      setValue("startDate", (isRowSelected && messById.date) || null);
      setValue("endDate", (isRowSelected && messById.date) || null);
      setValue("meals.breakfast", (isRowSelected && messById.breakfast) || "");
      setValue("meals.lunch", (isRowSelected && messById.lunch) || "");
      setValue("meals.snacks", (isRowSelected && messById.snacks) || "");
      setValue("meals.dinner", (isRowSelected && messById.dinner) || "");
    }
    // else{
    //   // dispatch(clearMessByIdState());
    // }
  }, [messById, isRowSelected]);

  useEffect(() => {
    reset();
    dispatch(clearMessByIdState());
  }, [dispatch]);

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: `calc(100% - 260px)` },
          ml: { md: "270px", sm: 0 },
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: "-1",
        }}
      >
        <Box sx={{ border: "1px solid #7E57C2", borderRadius: "20px" }}>
          <Box sx={{ borderBottom: "1px solid #7E57C2", p: 2 }}>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
          </Box>
          <Box id="back_button"/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="grid"
              columnGap={1}
              rowGap={{ xs: 2, md: 2, lg: 0 }}
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
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  // mb={2}
                  flexDirection={{ xs: "column", sm: "row" }}
                  sx={{ flexWrap: "wrap" }}
                >
                  <Typography fontWeight="medium">Date:</Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                    sx={{ flexwrap: "wrap", width: "70%" }}
                  >
                    <Box sx={{ maxWidth: "50%" }}>
                      <RHFDatePicker
                        name="startDate"
                        control={control}
                        disabled={messById._id && isRowSelected}
                        size="small"
                        format="DD/MM/YYYY"
                        minDate={dayjs()}
                      />
                    </Box>
                    <Typography fontWeight="medium" color="#ACB5BD">
                      To
                    </Typography>
                    <Box sx={{ maxWidth: "50%" }}>
                      <RHFDatePicker
                        name="endDate"
                        control={control}
                        disabled={messById._id && isRowSelected}
                        size="small"
                        format="DD/MM/YYYY"
                        minDate={dayjs() && watch("startDate")}
                      />
                    </Box>
                  </Box>
                </Box>
                {["breakfast", "lunch", "snacks", "dinner"].map((meal) => (
                  <Box
                    key={meal}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={3}
                    mt={2}
                  >
                    <Typography
                      fontWeight="medium"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {meal}:
                    </Typography>
                    <Controller
                      name={`meals.${meal}`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={`Type here...`}
                          variant="outlined"
                          size="small"
                          error={!!errors?.meals?.[meal]}
                          helperText={errors?.meals?.[meal]?.message}
                          sx={{ width: "70%" }}
                        />
                      )}
                    />
                  </Box>
                ))}
                <Box display="flex" justifyContent="center" mt={3}>
                  <a href="#table">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => scrollToSection()}
                      sx={{ borderRadius: "10px", paddingX: 4 }}
                    >
                      Submit
                    </Button>
                  </a>
                </Box>
              </Box>
              <Box
                sx={{
                  py: 5,
                  border: "1px solid #7E57C2",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                  gap: 2,
                }}
                onClick={handleClickOpen}
              >
                <IconButton>
                  <UploadFileIcon sx={{ color: "#7E57C2" }} fontSize="large" />
                </IconButton>
                <Typography fontWeight="bold">
                  Drag & Drop your files here or
                </Typography>
                <Button variant="contained" sx={{ marginTop: 2 }}>
                  Choose Files
                </Button>
              </Box>
            </Box>
          </form>
          <Box id="table" mt={5} display="flex" justifyContent="center">
            <MessManagementAddMenuTable
              setRowsPerPage={setRowsPerPage}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              page={page}
              handleGetDataById={handleGetDataById}
              handleDeleteDataById={handleDeleteDataById}
            />
          </Box>
        </Box>
      </Box>

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
          <DragAndDropFile handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default MessAddMenu;
