import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material"
import dayjs from "dayjs";

const FamilyDetailsCard = ({ profileData, selectedTab }) => {
    const {
        name,
        email,
        phone,
        dob,
        bloodGroup,
        uniqueId,
        fatherName,
        fatherEmail,
        motherName,
        motherEmail,
        gateNumber,
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
                {/* <Typography variant="body1" fontSize={'14px'}>Name :</Typography> */}
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
                {/* <Typography variant="body1" fontSize={'14px'}>Email :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Email
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {email}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                {/* <Typography variant="body1" fontSize={'14px'}>Phone :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Phone
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {phone}
                </Typography>
            </Grid>
            <Grid item xs={2.3}>
                {/* <Typography variant="body1" fontSize={'14px'}>Date Of Birth :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Date Of Birth
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {dob !== null
                        ? dayjs(dob).format("DD MMM YYYY")
                        : "N/A"}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                {/* <Typography variant="body1" fontSize={'14px'}>Blood Group :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Blood Group
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {bloodGroup}
                </Typography>
            </Grid>
            {selectedTab === "security guard" && (
                <>
                    <Grid item xs={2.3}>
                        {/* <Typography variant="body1" fontSize={'14px'}>Blood Group :</Typography> */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="body1" fontSize={"14px"}>
                                Gate Number
                            </Typography>
                            <Typography variant="body1" fontSize={"14px"}>
                                :
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body1" fontSize={"14px"}>
                            {gateNumber || "N/A"}
                        </Typography>
                    </Grid>
                </>
            )}
            <Grid item xs={2.3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Father&apos;s Name
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {fatherName}
                </Typography>
            </Grid>
            <Grid item xs={2.3}>
                {/* <Typography variant="body1" fontSize={'14px'}>Father Email :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Father&apos;s Email
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {fatherEmail}
                </Typography>
            </Grid>

            <Grid item xs={2.3}>
                {/* <Typography variant="body1" fontSize={'14px'}>Mother Name :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Mother&apos;s Name
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {motherName}
                </Typography>
            </Grid>
            <Grid item xs={2.3}>
                {/* <Typography variant="body1" fontSize={'14px'}>Mother Email :</Typography> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" fontSize={"14px"}>
                        Mother&apos;s Email
                    </Typography>
                    <Typography variant="body1" fontSize={"14px"}>
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="body1" fontSize={"14px"}>
                    {motherEmail}
                </Typography>
            </Grid>
        </>
    )
}

FamilyDetailsCard.propTypes = {
    profileData: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        dob: PropTypes.string,
        bloodGroup: PropTypes.string,
        uniqueId: PropTypes.string,
        fatherName: PropTypes.string,
        fatherEmail: PropTypes.string,
        motherName: PropTypes.string,
        motherEmail: PropTypes.string,
        gateNumber: PropTypes.string,
    }),
    selectedTab: PropTypes.string,
};

export default FamilyDetailsCard
