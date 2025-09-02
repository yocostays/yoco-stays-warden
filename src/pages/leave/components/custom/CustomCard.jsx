import PropTypes from 'prop-types'; // Import PropTypes
import { Card, Box, Typography, CardContent, LinearProgress } from '@mui/material';

const CustomCard = ({
    headerTitle,
    headerValue,
    dataItems,
    isRow, // New prop to control row or column layout
    headerBgColor = '#6B52AE',
    headerTextColor = '#FFFFFF',
    cardBgColor = '#FFFFFF',
    cardBorderRadius = '20px',
    cardBoxShadow = '0px 8px 14px rgba(103, 77, 159, 0.2)',
}) => {
    return (
        <Card
            sx={{
                backgroundColor: cardBgColor,
                borderRadius: cardBorderRadius,
                boxShadow: cardBoxShadow,
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    backgroundColor: headerBgColor,
                    padding: '18px 22px',
                    borderTopLeftRadius: cardBorderRadius,
                    borderTopRightRadius: cardBorderRadius,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: headerTextColor,
                        fontSize: '16px',
                    }}
                >
                    {headerTitle}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: headerTextColor,
                        fontSize: '16px',
                    }}
                >
                    {headerValue}
                </Typography>
            </Box>

            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isRow ? 'row' : 'column', // Switch between row and column layout
                        gap: isRow ? 2 : 2.5, // Adjust spacing based on layout
                        flexWrap: 'wrap', // Ensure items wrap correctly when in row layout
                    }}
                >
                    {dataItems?.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                marginBottom: isRow ? 2 : 2.5, // Add margin between items in column layout
                                marginTop: isRow ? 2 : 1,
                                flex: isRow ? '1 1 45%' : 'unset', // Allow flex in row, reset in column
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: 0.5,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: item.bulletColor,
                                        borderRadius: '50%',
                                        marginRight: 1,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#000000',
                                    }}
                                >
                                    {item.label} - {item.value}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={item.progress}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: item.progressColor,
                                    },
                                    backgroundColor: '#E0E0E0',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

// Define PropTypes for the component
CustomCard.propTypes = {
    headerTitle: PropTypes.string,
    headerValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            progress: PropTypes.number,
            bulletColor: PropTypes.string,
            progressColor: PropTypes.string,
        })
    ),
    isRow: PropTypes.bool, // New prop to control row or column layout
    headerBgColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    cardBgColor: PropTypes.string,
    cardBorderRadius: PropTypes.string,
    cardBoxShadow: PropTypes.string,
};

export default CustomCard;
