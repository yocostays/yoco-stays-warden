import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import CustomCards from "../../../components/customComponents/CustomCard";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopComplain,
  getMaintenanceReport,
} from "../../../features/maintenance/maintenanceSlice";
import CustomPieChart from "../../../components/customComponents/CustomPieChart";

const complaintData = [
  { label: "Resolved", value: 120 },
  { label: "Pending", value: 80 },
  { label: "Escalated", value: 50 },
  { label: "In Progress", value: 30 },
];

const MaintenanceCharts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { topComplaint, maintenanceSummary } = useSelector(
    (state) => state?.complaint
  );
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

  const list = topComplaint?.length
    ? topComplaint.map((item, index) => ({
        item: `${index + 1}.  ${item?.categoryName}`,
      }))
    : [{ item: "No data available" }];

  // Extract relevant data from maintenanceSummary
  const averageResolveTime =
    maintenanceSummary?.averageResolveTime || "No data available";
  const mostComplainedFloor = maintenanceSummary?.mostComplainedFloor
    ? `Floor: ${maintenanceSummary.mostComplainedFloor.floorNumber || "-"}, Complaints: ${maintenanceSummary.mostComplainedFloor.complaintCount}`
    : "No data available";

  useEffect(() => {
    if (selectedUser?.isHostelAssigned) {
      dispatch(getTopComplain());
      dispatch(getMaintenanceReport());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Box m={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomCards
                title="Top Complain"
                list={list}
                backgroundColor="#E2D2FF"
                textColor={theme.palette.text.primary}
                borderColor="#664DA0"
                fontWeight="500"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <CustomCards
                    title="Most Complain Block"
                    value={mostComplainedFloor}
                    backgroundColor="#FCE1AC"
                    textColor={theme.palette.text.primary}
                    borderColor="#D9A12B"
                    // variant={"body1"}
                    fontWeight="500"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <CustomCards
                    title="Average Time to Resolve"
                    value={averageResolveTime}
                    backgroundColor="#E8F9E6"
                    textColor={theme.palette.text.primary}
                    borderColor="#53AB46"
                    // variant={"body1"}
                    fontWeight="500"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomPieChart
            data={complaintData}
            pieWidth={500}
            pieHeight={200}
            marginRight={200}
            height="100%"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MaintenanceCharts;
