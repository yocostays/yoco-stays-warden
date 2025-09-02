import * as React from "react";
import { PropTypes } from "prop-types";
import { Box, Card } from "@mui/material";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

CalendarBox.propTypes = {
  onStartDate: PropTypes.string,
  onEndDate: PropTypes.string,
  onReset: PropTypes.bool,
};

export default function CalendarBox({ onStartDate, onEndDate, onReset }) {
  const [dateRange, setDateRange] = React.useState([null, null]);

  const handleDateRangeChange = (newRange) => {
    if (Array.isArray(newRange)) {
      const [start, end] = newRange;
      setDateRange([start ? dayjs(start) : null, end ? dayjs(end) : null]);
      onStartDate(start);
      onEndDate(end);
    } else if (newRange instanceof Date) {
      setDateRange([dayjs(newRange), null]);
    } else {
      setDateRange([null, null]);
    }
  };

  // Reset date range when onReset is true
  React.useEffect(() => {
    if (onReset) {
      setDateRange([null, null]);
      onStartDate(null);
      onEndDate(null);
    }
  }, [onReset, onStartDate, onEndDate]);

  // Function to highlight Sundays and make Saturdays black
  const tileClassName = ({ date }) => {
    const day = dayjs(date).day();
    if (day === 0) {
      return "highlight-sunday"; // Highlight Sundays (day 0)
    } else if (day === 6) {
      return "highlight-saturday"; // Make Saturdays black
    }
    return null;
  };

  return (
    <>
        <style>
          {`
          /* Parent container (card) should take full height and width of the screen */
          .card-container {
            height: 1000vh; /* Full viewport height */
            width: 100vw; /* Full viewport width */
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            margin: 0;
            box-sizing: border-box; /* Ensure padding and borders don't affect dimensions */
          }
          /* Ensure the calendar takes full width and height within the card */
          .custom-calendar {
           height: 100%;
           width: 100%;
           border: none !important; /* Force border removal */
           box-shadow: none !important; /* Force shadow removal */
           overflow: hidden; /* Prevent scrollbars */
          }
           
          /* Styling for the individual calendar tiles */
          .custom-calendar .react-calendar__tile {
            border: none; /* Remove tile borders */
            color: #674D9F; /* Default color for weekdays (Mon to Sat) */
          }

         .custom-calendar .react-calendar__tile--active {
           background-color: #F1EEF9 !important; /* Set the background color for selected dates */
           color: #674D9F; /* Change text color for contrast */
          }

         .custom-calendar .react-calendar__tile--now {
            background-color: #F1EEF9; /* Color for present date */
            color: #674D9F; /* Change text color for contrast */
            border-radius: 20px; /* Optional: Make it round */
          }

          .custom-calendar .react-calendar__tile--range {
            border-radius: 0; /* Square middle tiles */
          }

          /* Prevent hover effect on the current date */
          .custom-calendar .react-calendar__tile--now:hover {
            background-color: #F1EEF9; /* Background color for hover on other tiles */
          }

          .custom-calendar .react-calendar__tile--hover {
            background-color: #F1EEF9; /* Background color for hover on other tiles */
          }

          /* Custom style for Sundays */
         .highlight-sunday {
           color: red !important; /* Set text color to red for Sundays */
          }

          /* Custom style for Saturdays */
          .highlight-saturday {
            color: #674D9F !important; /* Set text color to black for Saturdays */
          }
         `}
        </style>

      <Card
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: '12px',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
          width: "100%",
          height: "100%", // Full height
          border:'2px solid #0E00311A'
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Full height
          }}
        >
          <Calendar
            selectRange
            value={dateRange.map((date) => (date ? date.toDate() : null))}
            onChange={(newRange) => handleDateRangeChange(newRange)}
            className="custom-calendar" // Apply the custom class
            tileClassName={tileClassName} // Apply the custom class for Sundays and Saturdays
            minDate={new Date()} // Prevent past dates from being selected
          />
        </Box>
      </Card>
    </>
  );
}
