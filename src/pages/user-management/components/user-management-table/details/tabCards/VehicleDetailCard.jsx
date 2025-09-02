import PropTypes from "prop-types";
import { Box, Card, Stack, Typography } from "@mui/material";

const VehicleDetailCard = ({ vechicleDetails }) => {
    return (
        <>
            <Typography variant="h6">Vehicle Details</Typography>
            <Box
                paddingY={3}
                display="grid"
                gap={2}
                sx={{
                    gridTemplateColumns: {
                        xs: "1fr",       // Single column on extra small screens
                        sm: "repeat(2, 1fr)", // Two columns on small screens
                        md: "repeat(2, 1fr)", // Two columns on small screens
                        lg: "repeat(4, 1fr)",       // Single column on large screens
                    },
                }}
            >
                {vechicleDetails?.map((item, index) => (
                    <Card
                        key={index}
                        variant="outlined"
                        sx={{ padding: 2, width: "300px", borderRadius: 4 }}
                    >
                        <Box mb={2}>
                            {[
                                { label: "Vehicle Type", value: item?.vechicleType },
                                { label: "Vehicle No.", value: item?.vechicleNumber },
                                { label: "Model Name", value: item?.modelName },
                                { label: "Engine Type", value: item?.engineType },
                            ].map(({ label, value }, idx) => (
                                <Stack
                                    key={idx}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mb={1}
                                >
                                    <Typography variant="subtitle1" fontWeight="bold" flexBasis="40%">
                                        {label}
                                    </Typography>
                                    <Typography flexBasis="5%">:</Typography>
                                    <Typography
                                        variant="body1"
                                        fontSize="14px"
                                        flexBasis="55%"
                                        sx={{ textTransform: "capitalize" }}
                                    >
                                        {value}
                                    </Typography>
                                </Stack>
                            ))}
                        </Box>
                    </Card>
                ))}
            </Box>
        </>
    );
};

VehicleDetailCard.propTypes = {
    vechicleDetails: PropTypes.arrayOf(
        PropTypes.shape({
            vechicleType: PropTypes.string,
            vechicleNumber: PropTypes.string,
            modelName: PropTypes.string,
            engineType: PropTypes.string,
        })
    ).isRequired,
};

export default VehicleDetailCard;
