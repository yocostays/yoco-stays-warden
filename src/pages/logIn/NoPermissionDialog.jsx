import * as React from 'react';
import { PropTypes } from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material'

NoPermissionDialog.propTypes = {
    noPermissionDialog: PropTypes.bool.isRequired,
    onClose : PropTypes.func.isRequired, // Function to set the noRoutePermission state in the parent component
};

function NoPermissionDialog({ noPermissionDialog, onClose  }) {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        onClose (); // Reset the noRoutePermission state in the parent component
    };

    React.useEffect(() => {
        if (noPermissionDialog) {
            setOpen(true);
        }
    }, [noPermissionDialog])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEnforceFocus // Allows focusing outside the dialog when it's open
                disableEscapeKeyDown={false} // Allow users to close with the Escape key
            >
                <DialogTitle>
                    <Typography variant="h6" gutterBottom>
                        You have no access.
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography id="alert-dialog-description">
                        You don&apos;t have permission to access this. Please contact your administrator for more information.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='error'
                        sx={{
                            textTransform: 'none',
                            borderRadius: '20px',
                        }}
                        onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NoPermissionDialog


