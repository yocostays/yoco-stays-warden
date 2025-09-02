/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Autocomplete,
    TextField,
    Chip,
} from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from "react";
import { toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authorizeRole } from "../../../../../features/student/studentSlice";
import { getUsers } from "../../../../../features/users/userSlice";

const defaultValues = {
    autocomplete: null,
    textField: '',
};

const validationSchema = Yup.object().shape({
    autocomplete: Yup.boolean().required('Authorization selection is required'),
});


export const Authorization = ({ openAuthorize, handleAuthorizeClose, selectedUser, page, tabStatus, rowsPerPage }) => {
    const [textFieldError, setTextFieldError] = useState('');
    const dispatch = useDispatch();
    const [isAutocompleteDisabled, setAutocompleteDisabled] = useState(true);

    const id = selectedUser?._id
    const name = selectedUser?.name
    const {
        handleSubmit,
        control,
        setValue,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
    });

    const handleClose = (reloadState = false) => {
        reset(defaultValues)
        setTextFieldError('')
        handleAuthorizeClose(reloadState)
    }


    // Authorization Section
    // ----------- START ------------------

    const authorizationSubmit = async (data) => {
        try {
            const payload = {
                studentId: id,
                isAuthorized: data?.autocomplete,
                authorizRole: data?.autocomplete === true ? data?.textField : null,
            };

            if (data.autocomplete != false) {
                if (!data.textField) {
                    // Set the error message if textField is empty
                    setTextFieldError('Authorization role is required when an authorization is selected');
                    return;
                } else {
                    setTextFieldError('')
                }
            }
            setTextFieldError('')

            // Dispatch action with the payload
            const res = await dispatch(authorizeRole(payload)).unwrap();

            if (res?.statusCode === 200) {
                toast.success(res?.message || "Form submitted successfully!");
                reset(defaultValues)
                dispatch(
                    getUsers({ page: page + 1, limit: rowsPerPage, status: tabStatus })
                );
                handleClose(true)
            } else {
                console.error("Submission failed", res?.error?.message);
                toast.error(res?.error?.message || "Submission failed!");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error("An error occurred during submission!");
        }
    };

    // ----------- FINISH -----------------

    return (
        <>
            <Dialog
                open={openAuthorize}
                fullWidth
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Assign Authorization Role - <Chip label={name} size="medium" color='primary' />
                </DialogTitle>
                <DialogContent>
                    {/* Autocomplete */}
                    <Controller
                        name="autocomplete"
                        control={control}
                        defaultValue={false} // Default value as boolean
                        render={() => (
                            <Autocomplete
                                options={[{ label: 'Authorize', value: true }, { label: 'Do Not Authorize', value: false }]} // Example options
                                getOptionLabel={(option) => option.label}
                                onChange={(_, value) => {
                                    setValue('autocomplete', value?.value)
                                    setAutocompleteDisabled(value?.value === false ? true : false)
                                    setTextFieldError(value?.value === false && '');
                                    if (errors.autocomplete) {
                                        clearErrors('autocomplete');
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Authorization"
                                        error={!!errors.autocomplete}
                                        helperText={errors.autocomplete?.message || ''}
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />
                        )}
                    />

                    {/* Text Field */}
                    <Controller
                        name="textField"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Authorization Role"
                                error={!!textFieldError} // Check custom error state
                                helperText={textFieldError || errors.textField?.message} // Show custom error or validation error
                                fullWidth
                                disabled={isAutocompleteDisabled}
                                onInput={(e) => {
                                    setTextFieldError(e.target.value && '');
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit(authorizationSubmit)}
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
