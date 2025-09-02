
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { default as notFound } from "../assets/images/404.svg"

const Page404 = () => {
    const navigate = useNavigate();
    const permissionRoute = JSON.parse(localStorage.getItem("permittedRoutes"))
    const handleGoBack = () => {
        navigate(`/${permissionRoute[0]?.link}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                bgcolor: '#f5f5f5',
                padding: '20px',
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <Box
                    component="img"
                    src={notFound} // Replace with your image URL or path
                    alt="Description of the image"
                    sx={{
                        width: 520,           // Full width
                        height: "auto",      // Maintain aspect ratio
                        objectFit: "cover",  // Adjust how the image fits within its box
                    }}
                />

            </Box>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 15 }}
                onClick={handleGoBack}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default Page404;
