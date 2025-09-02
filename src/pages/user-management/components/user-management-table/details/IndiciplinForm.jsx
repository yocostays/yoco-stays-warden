/* eslint-disable react/prop-types */
import * as React from 'react'
import {
    Button,
    Grid,
    Autocomplete,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createIndisciplinary } from '../../../../../features/student/studentSlice'
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify"; // Import Toastify components

const validationSchema = yup.object().shape({
    remark: yup.string().required('Remark is required'),
    fineStatus: yup
        .mixed()
        .required('Fine Status is required')
        .test('is-boolean', 'Fine Status must be true or false', (value) => {
            return typeof value === 'boolean';
        }),
});

export const IndiciplinForm = ({ open, onClose, onReload }) => {
    const dispatch = useDispatch();
    const { submitting } = useSelector((state) => state?.student)
    const student = localStorage.getItem('studentId')
    const [fineDisable, setFineDisable] = React.useState(true);
    const [textFieldError, setTextFieldError] = React.useState('');

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fineAmount: '', // Set initial default value
            remark: '', // Set initial default value
            fineStatus: '', // Set initial default value
        },
    });

    const onSubmitDiciplineReport = async (data) => {
        if (data.fineStatus != false) {
            if (!data.fineAmount) {
                // Set the error message if textField is empty
                setTextFieldError('Fine is required');
                return;
            }
        }
        const payload = {
            studentId: student,
            remark: data?.remark,
            isFine: data?.fineStatus,
            ...(data?.fineStatus === true && { fineAmount: data?.fineAmount })
        };
        const res = await dispatch(createIndisciplinary(payload))
        if (res?.payload?.statusCode === 200) {
            toast.success(
                res?.payload?.message || "Form submitted successfully!"
            );
            setTextFieldError('')
            reset();
            onClose();
            onReload()
        } else {
            toast.error(
                res?.payload?.message || "Form submitted failed!"
            );
        }
    };

    const handleClose = () => {
        reset();
        setTextFieldError('')
        onClose();
    }

    const booleanOptions = [
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];
    return (
        <Dialog
            open={open}
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography>Report Indicipline Actions</Typography>
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmitDiciplineReport)}>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {/* Remark Field */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="remark"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Remark"
                                            variant="outlined"
                                            error={Boolean(errors.remark)}
                                            helperText={errors.remark?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Fine Status Autocomplete */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="fineStatus"
                                    control={control}
                                    render={({ field: { onChange, onBlur, ref } }) => (
                                        <Autocomplete
                                            options={booleanOptions}
                                            getOptionLabel={(option) => option.label}
                                            onChange={(event, newValue) => {
                                                onChange(newValue ? newValue.value : null);
                                                setFineDisable(newValue.value === true ? false : true)
                                                setTextFieldError(newValue.value === true && "")
                                            }}
                                            onBlur={onBlur}
                                            ref={ref}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Select Fine Status"
                                                    variant="outlined"
                                                    error={Boolean(errors.fineStatus)}
                                                    helperText={errors.fineStatus?.message}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Fine Amount Field */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="fineAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Fine Amount"
                                            variant="outlined"
                                            disabled={fineDisable}
                                            type="tel"
                                            inputProps={{
                                                pattern: "[0-9]*",
                                                inputMode: "numeric",
                                            }}
                                            error={textFieldError}
                                            helperText={textFieldError || errors.fineAmount?.message}
                                            fullWidth
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                                setTextFieldError(e.target.value && '');
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <LoadingButton loading={submitting} type="submit" variant="contained" color="primary">
                        Add
                    </LoadingButton>
                    <Button variant="outlined" color="error" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
