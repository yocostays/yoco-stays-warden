import {
  Avatar,
  Box,
  Card,
  Divider,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useCallback, useMemo, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import NoDataAvailable from "@pages/leave/components/table/NoDataAvailable";
import { debounce } from "lodash";

const StudentsCard = ({ title, students, onSearch }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => onSearch(value), 300),
    [onSearch, searchText]
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedSearch(value);
    if (value.length === 0){
      setShowSearch(false);
      setSearchText('');
    }
  };

  useEffect(() => {
    if (searchText.length === 0) {
      setSearchText("");
      debouncedSearch("");
    }
  }, [searchText]);

  const handleViewProfile = (id) => {
    localStorage.setItem('profileView', 'leave'); // Set the key in localStorage
    navigate(`/users/student/details/${id}`);
  };
  

  const studentList = useMemo(
    () =>
      students?.map((student, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
          sx={{ cursor: "pointer" }}
          onClick={() => handleViewProfile(student._id)}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{ width: 30, height: 30, mr: 2 }}
              src={student.image || ""}
              alt={student.name}
            >
              {!student.image && student.name?.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography variant="subtitle2" fontWeight={800} color="#0E0031">
                {student.name} ({student.uniqueId})
              </Typography>
              <Typography variant="caption" color="#0E0031" fontWeight={600}>
                {moment(student.startDate).format("Do MMM, YYYY")} |{" "}
                {student.leaveStatus}
              </Typography>
            </Box>
          </Box>
        </Box>
      )),
    [students, navigate]
  );

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 5,
        boxShadow: "0px 8px 14px rgba(103, 77, 159, 0.2)",
        width: "100%",
        height: "237px",
        "@media (max-width: 600px)": { padding: 1 },
      }}
    >
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#FBB13C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="#000">
                {students.length}
              </Typography>
            </Box>
            <Typography variant="subtitle1" fontWeight={600} ml={1}>
              {title}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #674D9F",
                p: "0 8px",
                maxWidth: "150px",
                borderRadius: 1,
                boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
                backgroundColor: "#fff",
                borderWidth: "2px",
                height: "40px",
              }}
            >
              <IconButton
                sx={{ color: "#6B52AE", p: 0 }}
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Toggle search"
              >
                <SearchIcon />
              </IconButton>

              {showSearch && (
                <TextField
                  size="small"
                  placeholder="Type Search.."
                  variant="standard"
                  autoFocus
                  sx={{
                    width: 100,
                    transition: "width 0.3s ease-in-out",
                    "& .MuiInput-underline:before": { borderBottom: "none" },
                    "& .MuiInput-underline:after": { borderBottom: "none" },
                  }}
                  value={searchText}
                  onChange={handleSearchChange}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: "#674D9F" }} />
      </Box>

      <Box mt={2} maxHeight={130} sx={{ overflowY: "auto" }}>
        {students?.length > 0 ? (
          studentList
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <NoDataAvailable />
          </Box>
        )}
      </Box>
    </Card>
  );
};

StudentsCard.propTypes = {
  title: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      leaveStatus: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      uniqueId: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  onSearch: PropTypes.func,
};

StudentsCard.defaultProps = {
  title: "Students Currently Out",
  students: [],
  onSearch: () => {},
};

export default StudentsCard;
