import PropTypes from "prop-types";
import { Box, Grid, Stack, Typography } from '@mui/material'

const HostelDetailCard = ({ profileData, selectedTab }) => {
    const {
        name,
        uniqueId,
        roomNumber,
        floorNumber,
        hostelName,
        roomMatesData,
        branch,
        authorizRole,
        academicYear,
        semester,
        shiftStartTime,
        shiftEndTime,
    } = profileData;
    return (
        <>
            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Yoco ID
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {uniqueId}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Name
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {name}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Room No
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {roomNumber}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Floor Number
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {floorNumber}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Hostel
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {hostelName}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Room Mate
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                {roomMatesData?.map((item, key) => (
                    <Box key={key}>
                        <Stack
                            display="flex"
                            flexDirection={{ sm: "row", xs: "column" }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                <strong>Name : </strong>
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                {" "}
                                {item?.name}
                            </Typography>
                        </Stack>
                    </Box>
                ))}
            </Grid>

            {selectedTab !== "student" && (
                <>
                    <Grid item xs={2.3}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                Shift Time
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                :
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography
                            variant="body1"
                            fontSize={"14px"}
                        >{`${shiftStartTime} to ${shiftEndTime}`}</Typography>
                    </Grid>
                </>
            )}

            {selectedTab === "student" && (
                <>
                    <Grid item xs={2.3}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                Branch
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                :
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" fontSize={"14px"}>
                            {branch}
                        </Typography>
                    </Grid>

                    <Grid item xs={2.3}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                Role
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                :
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" fontSize={"14px"}>
                            {authorizRole || "N/A"}
                        </Typography>
                    </Grid>

                    <Grid item xs={2.3}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                Year
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                :
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" fontSize={"14px"}>
                            {academicYear}
                        </Typography>
                    </Grid>

                    <Grid item xs={2.3}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                Sem
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                :
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" fontSize={"14px"}>
                            {semester}
                        </Typography>
                    </Grid>
                </>
            )}
        </>
    )
}

HostelDetailCard.propTypes = {
    profileData: PropTypes.shape({
        name: PropTypes.string,
        uniqueId: PropTypes.string,
        roomNumber: PropTypes.string,
        floorNumber: PropTypes.string,
        hostelName: PropTypes.string,
        roomMatesData: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        branch: PropTypes.string,
        authorizRole: PropTypes.string,
        academicYear: PropTypes.string,
        semester: PropTypes.string,
        shiftStartTime: PropTypes.string,
        shiftEndTime: PropTypes.string
    }),
    selectedTab: PropTypes.string
};

export default HostelDetailCard
