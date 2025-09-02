import { Box, Grid } from "@mui/material";
import CustomCards from "../../../../components/customComponents/CustomCard";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMessReportSummary } from "../../../../features/mess/messSlice";
import TableLoader from "../../../../components/tableLoader/TableLoader";

const MessCards = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedUser = JSON.parse(localStorage.getItem("userData"));

  const [selectedStatus, setSelectedStatus] = useState("today");
  const [mealSummaries, setMealSummaries] = useState({
    lunch: {},
    dinner: {},
    breakfast: {},
  }); // State for each meal type

  const { loading, error } = useSelector((state) => state.mess);

  const reportDropDownTypes = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Current Week", value: "current week" },
    { label: "Last Week", value: "last week" },
    { label: "Past Two Week", value: "past two week" },
    { label: "Current Month", value: "current month" },
    { label: "Last Month", value: "last month" },
    { label: "Current Year", value: "current year" },
    { label: "Last Year", value: "last year" },
  ];

  const mealTypes = ["lunch", "dinner", "breakfast"];

  const handleDropdownChange = (selectedValue, mealType) => {
    setSelectedStatus(selectedValue);
    fetchSummary(selectedValue, mealType);
  };

  const fetchSummary = (status, mealType) => {
    const payload = { status, type: mealType };
    dispatch(getMessReportSummary(payload)).then((action) => {
      // Update the specific meal type data
      const newSummary = action.payload.data;

      setMealSummaries((prevSummaries) => ({
        ...prevSummaries,
        [mealType]: newSummary,
      }));
    });
  };

  useEffect(() => {
    if (selectedUser?.isHostelAssigned) {
      mealTypes.forEach((type) => fetchSummary(selectedStatus, type));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]); // Only depend on dispatch

  if (loading) {
    return <TableLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {mealTypes.map((meal) => (
          <Grid item xs={12} sm={4} key={meal}>
            <CustomCards
              title={meal.charAt(0).toUpperCase() + meal.slice(1)} // Capitalize first letter
              value={`${mealSummaries[meal][`${meal}Count`] || 0}/${mealSummaries[meal].activeUserCount || 0
                }`}
              fontWeight={600}
              dropdownOptions={reportDropDownTypes}
              buttonText={
                <span style={{ fontSize: "10px" }}>View Details</span>
              }
              backgroundColor={
                meal === "lunch"
                  ? "#D7E9FE"
                  : meal === "dinner"
                    ? "#CFFFB2"
                    : "#ECE0FF"
              }
              textColor={theme.palette.text.primary}
              borderColor={
                meal === "lunch"
                  ? "#4288D9"
                  : meal === "dinner"
                    ? "#45B501"
                    : "#664DA0"
              }
              onDropdownChange={(selectedValue) =>
                handleDropdownChange(selectedValue, meal)
              }
              dropbutton
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MessCards;
