/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ComplaintsTableContainer from "./ComplaintsTableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getComplaintCategoryAsync } from "@features/complaints/complaintsSlice";
import { ClearSelectedRoomDetails } from "@features/hostel/hostelSlice";
import {
  getFloorNoByHostelIdAsync,
  getRoomNumberByFloorNumberAsync,
} from "@features/hostel/hostelApi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import debounce from "lodash.debounce";

const ComplaintsTableHead = ({
  selectedTab,
  selectedRows,
  setSelectedRows,
  isSelectedAll,
  setIsSelectedAll,
  filterValues,
  setFilterValues,
  handleChange
}) => {
  const [floorNumber, setFloorNumber] = useState(null);
  const [searchFloorNumber, setSearchFloorNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [selectedOption, setSelectedOption] = useState("All");
  const [search, setSearch] = useState("");
  const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [tempDateStart, setTempDateStart] = useState(null); // Temporary start date inside dialog
  const [tempDateEnd, setTempDateEnd] = useState(null);
  const [filter, setFilter] = useState("");

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { getComplaintCategory } = useSelector((state) => state.complaint);
  const [categoryId, setCategoryId] = useState("");
  const {
    getFloorNoByHostelId,
    getRoomNumberByFloorNumber,
    isRoomLoading,
    isFloorLoading,
  } = useSelector((state) => state.hostel);
  useEffect(() => {
    dispatch(getComplaintCategoryAsync());
  }, [dispatch]);

  const filteredFloorData = getFloorNoByHostelId.filter((item) =>
    item.floorNumber.toString().includes(searchFloorNumber)
  );

  const performUnselectFunction = () => {
    dispatch(ClearSelectedRoomDetails());
    setRoomNumber("");
    handleFilterMenuClose();
  };

  const handleFloorChange = (floor) => {
    if (floorNumber === floor.floorNumber) {
      setFloorNumber(null);
      performUnselectFunction(); // Call the function for unselecting
    } else {
      setFloorNumber(floor.floorNumber);
      setFilterValues({ ...filterValues, floorNumber: floor?.floorNumber });
    }
  };
  const handleApplyFilter = () => {
    setDateStart(tempDateStart.toISOString());
    setDateEnd(tempDateEnd.toISOString());
    setFilter("custom");
    setFilterValues({
      ...filterValues,
      startDate: tempDateStart.toISOString(),
      endDate: tempDateEnd.toISOString(),
    });
    setOpenDialog(false);
  };

  const handleSearchClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleOpenMenu = (event) => {
    setDropdownAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setDropdownAnchor(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCustomClick = () => {
    handleClose(); // Close dropdown before opening dialog
    setOpenDialog(true);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option?.name);
    setFilterValues({ ...filterValues, categoryId: option._id || "" });
    setCategoryId(option?._id || ""); // Sets categoryId to "" when "All" is selected
    handleCloseMenu();
  };

  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchorEl(null);
  };
  const handleSearchFloorData = (event) => {
    setSearchFloorNumber(event.target.value);
  };
  const handleRoomSelect = (room) => {
    if (room === "...") {
      setShowSearchBar(!showSearchBar); // Toggle search bar
    } else {
      setRoomNumber(room);
      setFilterValues({ ...filterValues, roomNumber: room?.roomNumber });
      setShowSearchBar(false); // Hide search bar
      handleFilterMenuClose();
    }
  };

  useEffect(() => {
    dispatch(getFloorNoByHostelIdAsync());
  }, [dispatch]);

  useEffect(() => {
    if (floorNumber) {
      dispatch(getRoomNumberByFloorNumberAsync({ floorNumber: floorNumber }));
    }
  }, [dispatch, floorNumber]);

  useEffect(() => {
    setFloorNumber(null);
    setRoomNumber("");
    setFilterValues((prev) => ({
      ...prev,
      floorNumber: null,
      roomNumber: "",
    }));
  }, [selectedTab]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value)
      setFilterValues((prev) => ({
        ...prev,
        search: value,
      }));
    }, 500), // Adjust debounce delay as needed
    []
  );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ marginBottom: { xs: 2, sm: 2, md: 0 } }}
      >
        <Box width="100%" >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            sx={{
              border: "2px solid #674D9F",
              borderBottom: "none",
              flexWrap: "wrap",
              borderRadius: "20px 20px 0px 0px",
              background: "white"
            }}
          >
            <Box>
              <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                Complaints
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={1}
              borderRadius={2}
            >
              <Box
                display="flex"
                flexDirection="row"
                gap={4}
                alignItems="center"
                justifyContent="center"
                width="100%"
              >
                {/* </Box> */}
                <Box display="flex" alignItems="center" gap={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#674D9F",
                        color: "#FFFFFF",
                        padding: "8px 16px",
                        borderRadius: "3px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                        onClick={handleOpenMenu}
                      >
                        {selectedOption || "All"}{" "}
                        {/* Default label when nothing is selected */}
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: "24px",
                            marginLeft: "6px",
                            color: "#FFFFFF",
                          }}
                        />
                      </Typography>
                      <Menu
                        anchorEl={dropdownAnchor}
                        open={Boolean(dropdownAnchor)}
                        onClose={handleCloseMenu}
                      >
                        {/* Default "All" Option */}
                        <MenuItem
                          sx={{
                            color: "#0E0031",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                          onClick={() =>
                            handleSelectOption({ name: "All", value: "" })
                          } // Sends blank value
                        >
                          All
                        </MenuItem>

                        {/* Dynamic Options */}
                        {getComplaintCategory?.data?.map((option) => (
                          <MenuItem
                            sx={{
                              color: "#0E0031",
                              fontWeight: "700",
                              fontSize: "14px",
                            }}
                            key={option._id}
                            onClick={() => handleSelectOption(option)}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                    <IconButton
                      sx={{ color: "#6B52AE", p: 0 }}
                      onClick={handleSearchClick}
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
                          "& .MuiInput-underline:before": {
                            borderBottom: "none",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottom: "none",
                          },
                        }}
                        onChange={(e) => {
                          // setSearch(e.target.value);
                          debouncedSearch(e.target.value);
                        }}
                      />
                    )}
                  </Box>
                  <IconButton
                    sx={{ color: open ? "#6B52AE" : "#A9A9A9", p: 0 }}
                    onClick={handleClick}
                  >
                    <SwapVertIcon />
                  </IconButton>
                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        border: "2px solid #D3D3D3",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        "& .MuiMenuItem-root": {
                          fontFamily: "inherit",
                          fontSize: 14,
                          color: "#4C4C4C",
                        },
                      },
                    }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <MenuItem
                      onClick={() => {
                        setFilter("ascending");
                        setFilterValues({ ...filterValues, sort: "ascending" });
                        handleClose();
                      }}
                    >
                      By Alphabet A-Z
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setFilter("recent");
                        setFilterValues({ ...filterValues, sort: "recent" });
                        handleClose();
                      }}
                    >
                      By Date (Recent)
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setFilter("oldest");
                        setFilterValues({ ...filterValues, sort: "oldest" });
                        handleClose();
                      }}
                    >
                      By Date (Oldest)
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleCustomClick();
                        setFilterValues({ ...filterValues, sort: "custom" });
                      }}
                    >
                      Custom
                    </MenuItem>
                  </Menu>

                  {/* Date Range Dialog */}
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    sx={{
                      "& .MuiPaper-root": {
                        zIndex: 1301,
                        borderRadius: "16px",
                        border: "2px solid #ACB5BD",
                      },
                    }}
                  >
                    <DialogTitle
                      sx={{ fontSize: "14px", textTransform: "uppercase" }}
                    >
                      Date Range
                    </DialogTitle>
                    <Divider sx={{ borderBottomWidth: "2px" }} />
                    <DialogContent
                      sx={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={2}
                          sx={{
                            padding: 2,
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                          }}
                        >
                          {/* Start Date Picker */}
                          <DatePicker
                            label="Start Date"
                            value={tempDateStart ? dayjs(tempDateStart) : null} // Converts stored ISO date back to dayjs
                            format="YYYY-MM-DD"
                            onChange={(newValue) =>
                              setTempDateStart(newValue?.toDate())
                            } // Stores as JavaScript Date object
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "30px",
                              },
                              "& .MuiInputBase-input": { fontSize: "14px" },
                            }}
                          />

                          {/* Arrow Icon */}
                          <Typography
                            variant="h6"
                            sx={{ color: "#555", fontWeight: "bold" }}
                          >
                            →
                          </Typography>

                          {/* End Date Picker */}
                          <DatePicker
                            label="End Date"
                            value={tempDateEnd ? dayjs(tempDateEnd) : null} // Converts stored ISO date back to dayjs
                            format="YYYY-MM-DD"
                            minDate={
                              tempDateStart ? dayjs(tempDateStart) : null
                            } // Prevents selecting an end date before start date
                            onChange={(newValue) =>
                              setTempDateEnd(newValue?.toDate())
                            } // Stores as JavaScript Date object
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "30px",
                              },
                              "& .MuiInputBase-input": { fontSize: "14px" },
                            }}
                          />
                        </Box>
                      </LocalizationProvider>
                    </DialogContent>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                      mb={2}
                    >
                      <Box>
                        <Button
                          variant="contained"
                          sx={{ fontSize: "14px", borderRadius: "16px" }}
                          onClick={() => setOpenDialog(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          sx={{ fontSize: "14px", borderRadius: "16px" }}
                          onClick={handleApplyFilter}
                          color="primary"
                        >
                          Apply
                        </Button>
                      </Box>
                    </Box>
                  </Dialog>
                  <Box sx={{ display: "flex" }}>
                    {/* Filter Icon */}
                    <IconButton onClick={handleFilterMenuOpen} sx={{ p: 0 }}>
                      <FilterListIcon />
                    </IconButton>

                    {/* Filter Menu */}
                    <Menu
                      anchorEl={filterMenuAnchorEl}
                      open={Boolean(filterMenuAnchorEl)}
                      onClose={handleFilterMenuClose}
                    >
                      <Box
                        sx={{
                          p: 2,
                          width: 300,
                        }}
                      >
                        <TextField
                          sx={{ height: "40px", mb: 1, mt: -1 }}
                          size="small"
                          fullWidth
                          variant="standard"
                          label="FILTERS"
                          onChange={handleSearchFloorData}
                        />
                        {/* Floor Selection */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            color: "#0E0031",
                            mb: 1,
                            textAlign: "left",
                          }}
                        >
                          Floor
                        </Typography>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "repeat(5, 1fr)",
                              lg: "repeat(6, 1fr)",
                            },
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          {isFloorLoading ? (
                            <Box sx={{ width: "100%", height: "100%" }}>
                              <CircularProgress />
                            </Box>
                          ) : filteredFloorData.length === 0 ? (
                            <Box
                              sx={{
                                width: "300px",
                                height: "100%",
                                textAlign: "center",
                              }}
                            >
                              <Typography>No floors are available!</Typography>
                            </Box>
                          ) : (
                            filteredFloorData?.map((f) => (
                              <Button
                                key={f.floorNumber}
                                variant={
                                  floorNumber === f.floorNumber
                                    ? "contained"
                                    : "outlined"
                                }
                                onClick={() => handleFloorChange(f)}
                                sx={{
                                  width: 35,
                                  height: 35,
                                  borderRadius: "60%",
                                  minWidth: "unset",
                                  fontSize: "14px",
                                  padding: 0, // Remove padding
                                  border: "1px solid #0E0031", // Add a border to match the style
                                  color:
                                    floorNumber === f.floorNumber
                                      ? "white"
                                      : "#674D9F", // Set text color based on selected state
                                  backgroundColor:
                                    floorNumber === f.floorNumber
                                      ? "#674D9F"
                                      : "transparent", // Set background based on selected state
                                }}
                              >
                                {f.floorNumber}
                              </Button>
                            ))
                          )}
                        </Box>
                        {/* Room Number Selection */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            mt: 1.5,
                            fontWeight: "bold",
                            color: "#0E0031", // Match the color of text
                            mb: 1, // Add margin-bottom
                            textAlign: "left", // Align text
                          }}
                        >
                          Room Number
                        </Typography>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: {
                              xs: "repeat(5, 1fr)",
                              lg: "repeat(6, 1fr)",
                            },
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          {isRoomLoading ? (
                            <Box sx={{ width: "100%", height: "100%" }}>
                              <CircularProgress />
                            </Box>
                          ) : getRoomNumberByFloorNumber.length === 0 ||
                            filteredFloorData.length === 0 ? (
                            <Box
                              sx={{
                                width: "300px",
                                height: "100%",
                                textAlign: "center",
                              }}
                            >
                              <Typography>No rooms are available !</Typography>
                            </Box>
                          ) : (
                            getRoomNumberByFloorNumber?.map((room) => (
                              // filteredRoomData?.map((room) => (
                              <Grid item xs={3} key={room}>
                                <Button
                                  variant={
                                    roomNumber.roomNumber === room?.roomNumber
                                      ? "contained"
                                      : "outlined"
                                  }
                                  onClick={() => handleRoomSelect(room)}
                                  sx={{
                                    width: 35,
                                    height: 35,
                                    minWidth: "unset", // Remove default minWidth
                                    padding: 0, // Remove padding
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    backgroundColor:
                                      roomNumber.roomNumber === room?.roomNumber
                                        ? "#674D9F"
                                        : "transparent",
                                    color:
                                      roomNumber.roomNumber === room?.roomNumber
                                        ? "white"
                                        : "#674D9F",
                                    border: "1px solid #0E0031",
                                  }}
                                >
                                  {room?.roomNumber}
                                </Button>
                              </Grid>
                            ))
                          )}
                        </Box>
                      </Box>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <ComplaintsTableContainer
              filter={filter}
              search={search}
              dateStart={dateStart}
              dateEnd={dateEnd}
              categoryId={categoryId}
              selectedTab={selectedTab}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              setIsSelectedAll={setIsSelectedAll}
              isSelectedAll={isSelectedAll}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              roomNumber={roomNumber}
              floorNumber={floorNumber}
              searchFloorNumber={searchFloorNumber}
              handleChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ComplaintsTableHead;
