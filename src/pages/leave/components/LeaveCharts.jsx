import { useEffect } from "react";
import CustomStudentCard from "@components/customComponents/CustomStudentCard";
import {
  getCurrentlyOutInfo,
  getLeaveReportSummary,
} from "@features/leave/leaveSlice";
import { Box, Grid, Tooltip, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import CustomCard from "./custom/CustomCard";

const LeaveCharts = () => {
  const dispatch = useDispatch();
  const { leaveReportSummary, currentlyOutInfo } = useSelector(
    (state) => state.leave
  );
  const {
    totalLeave,
    applyleaveCount,
    approveLeaveCount,
    totalNightOut,
    nightOutCount,
    nightCountAprovedCount,
    totallateComing,
    lateComingCount,
    lateComingAprovedCount,
  } = leaveReportSummary;

  const selectedUser = JSON.parse(localStorage.getItem("userData"));
  // const [searchText, setSearchText] = useState("");

  const storedData = localStorage.getItem("selectedDuration"); // Retrieves data
  const durationTypeData = storedData ? JSON.parse(storedData) : null; // Parse if it's JSON

  const handleSearchChange = (searchData) => {
    if (searchData) {
      const data = {
        durationType: durationTypeData.value || "today",
        search: searchData,
      };
      handleSummaryAndCurrentlyOut(data);
    }
  };

  const handleSummaryAndCurrentlyOut = (requestData) => {
    dispatch(getCurrentlyOutInfo(requestData));
  };

  useEffect(() => {
    if (selectedUser?.isHostelAssigned) {
      dispatch(
        getLeaveReportSummary({ durationType: "today",})
      );
      dispatch(
        getCurrentlyOutInfo({ durationType: "today",})
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Box m={1}>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: { md: "-30px", sm: "60px", xs: "150px" } }}
      >
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <CustomCard
                headerTitle={
                  <Tooltip title={"Leave Count"} arrow>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        fontWeight: 500,
                      }}
                    >
                      {"Leave Count"}
                    </Typography>
                  </Tooltip>
                }
                headerValue={totalLeave || 0}
                dataItems={[
                  {
                    label: "Approved",
                    value: approveLeaveCount || 0,
                    bulletColor: "#6B52AE",
                    progress:
                      totalLeave > 0
                        ? ((approveLeaveCount || 0) / totalLeave) * 100
                        : 0,
                    progressColor: "#6B52AE",
                  },
                  {
                    label: "Pending",
                    value: applyleaveCount || 0,
                    bulletColor: "#FBB13C",
                    progress:
                      totalLeave > 0
                        ? ((applyleaveCount || 0) / totalLeave) * 100
                        : 0,
                    progressColor: "#FBB13C",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomCard
                headerTitle={
                  <Tooltip title={"Late Coming Count"} arrow>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        fontWeight: 500,
                        "@media (max-width:1280px)": {
                          maxWidth: "calc(100% - 10px)",
                        },
                      }}
                    >
                      {"Late Coming Count"}
                    </Typography>
                  </Tooltip>
                }
                headerValue={totallateComing || 0}
                dataItems={[
                  {
                    label: "Approved",
                    value: lateComingAprovedCount || 0,
                    bulletColor: "#6B52AE",
                    progress:
                      totallateComing > 0
                        ? ((lateComingAprovedCount || 0) / totallateComing) *
                          100
                        : 0,
                    progressColor: "#6B52AE",
                  },
                  {
                    label: "Pending",
                    value: lateComingCount || 0,
                    bulletColor: "#FBB13C",
                    progress:
                      totallateComing > 0
                        ? ((lateComingCount || 0) / totallateComing) * 100
                        : 0,
                    progressColor: "#FBB13C",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={4}>
              <CustomCard
                headerTitle={
                  <Tooltip title={"Day/Night Out Count"} arrow>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                        fontWeight: 500,
                        "@media (max-width:1280px)": {
                          maxWidth: "calc(100% - 10px)",
                        },
                      }}
                    >
                      {"Day/Night Out Count"}
                    </Typography>
                  </Tooltip>
                }
                headerValue={totalNightOut || 0}
                dataItems={[
                  {
                    label: "Approved",
                    value: nightCountAprovedCount || 0,
                    bulletColor: "#6B52AE",
                    progress:
                      totalNightOut > 0
                        ? ((nightCountAprovedCount || 0) / totalNightOut) * 100
                        : 0, // Set progress to 0 when nightOutCount is 0
                    progressColor: "#6B52AE",
                  },
                  {
                    label: "Pending",
                    value: nightOutCount || 0,
                    bulletColor: "#FBB13C",
                    progress:
                      totalNightOut > 0
                        ? ((nightOutCount || 0) / totalNightOut) * 100
                        : 0,
                    progressColor: "#FBB13C",
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <CustomStudentCard
            count={currentlyOutInfo?.length}
            students={currentlyOutInfo}
            onSearch={handleSearchChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaveCharts;
