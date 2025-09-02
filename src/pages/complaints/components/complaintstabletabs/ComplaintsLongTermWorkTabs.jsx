import {
    Box,
    Button,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Popover,
    TextField,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
  import SearchIcon from "@mui/icons-material/Search";
  import FilterListIcon from "@mui/icons-material/FilterList";
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
  import { mealBookoptions } from "@components/enums/messEnums";
  import SwapVertIcon from "@mui/icons-material/SwapVert";
//   import ComplaintsTableContainer from "./ComplaintsTableContainer";
  import { getAllMessListAsync } from "@features/mess/messSlice";
  import { useDispatch } from "react-redux";
import ComplaintsLongTermWorkTableContainer from "./ComplaintsLongTermWorkTableContainer";
  
  const ComplaintsLongTermWorkTabs = () => {
    const [floor, setFloor] = useState("G");
    const [showSearch, setShowSearch] = useState(false);
    const [dropdownAnchor, setDropdownAnchor] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Security");
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [filter, setFilter] = useState("");
    const [customAnchorEl, setCustomAnchorEl] = useState(null);
    const openCustom = Boolean(customAnchorEl);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [filterMenuAnchorEl, setFilterMenuAnchorEl] = useState(null);
    const [rowsPerPage] = useState(10);
    const [page] = useState(0);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
  
    const handleGetAllMessList = () => {
      dispatch(
        getAllMessListAsync({
          page: page + 1,
          limit: rowsPerPage,
          status: selectedOption.toLowerCase(),
          sort: filter,
          search,
        })
      );
    };
    useEffect(() => {
      handleGetAllMessList();
    }, [filter, selectedOption, search, page]);
  
    const handleFloorChange = (newFloor) => {
      setFloor(newFloor);
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
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleCustomClick = (event) => {
      setCustomAnchorEl(event.currentTarget);
    };
  
    const handleSelectOption = (option) => {
      setSelectedOption(option);
      handleCloseMenu();
    };
  
    const handleCloseDate = () => {
      setAnchorEl(null);
      setCustomAnchorEl(null);
    };
  
    const handleFilterMenuOpen = (event) => {
      setFilterMenuAnchorEl(event.currentTarget);
    };
  
    const handleFilterMenuClose = () => {
      setFilterMenuAnchorEl(null);
    };
  
    return (
        <Box width="100%">
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
                      {selectedOption}
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
                      {mealBookoptions.map((option) => (
                        <MenuItem
                          sx={{
                            color: "#0E0031",
                            fontWeight: "700",
                            fontSize: "14px",
                          }}
                          key={option.value}
                          onClick={() => handleSelectOption(option.value)}
                        >
                          {option.label}
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
                      onChange={(e) => setSearch(e.target.value)}
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
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={() => setFilter("ascending")}>
                    By Alphabet A-Z
                  </MenuItem>
                  <MenuItem onClick={() => setFilter("recent")}>
                    By Date (Recent)
                  </MenuItem>
                  <MenuItem onClick={() => setFilter("oldest")}>
                    By Date (Oldest)
                  </MenuItem>
                  <MenuItem onClick={handleCustomClick}>Custom</MenuItem>
                </Menu>
                <Popover
                  open={openCustom}
                  anchorEl={customAnchorEl}
                  onClose={handleCloseDate}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    sx: {
                      width: { xs: "90%", sm: "400px" },
                      padding: 2,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    gap={2}
                    alignItems="center"
                  >
                    <TextField
                      size="small"
                      label="Start Date"
                      type="date"
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          backgroundColor: "white",
                          color: "#ACB5BD",
                        },
                      }}
                    />
                    <Box>
                      <ArrowForwardIcon sx={{ color: "#6B52AE" }} />
                    </Box>
                    <TextField
                      size="small"
                      label="End Date"
                      type="date"
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        sx: {
                          borderRadius: "20px",
                          backgroundColor: "white",
                          color: "#ACB5BD",
                        },
                      }}
                    />
                  </Box>
                </Popover>
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
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mb: 2,
                          fontWeight: "bold",
                          color: "#D3D3D3",
                          paddingBottom: "6px",
                        }}
                      >
                        FILTERS
                      </Typography>

                      {/* Floor Selection */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: "#0E0031",
                          mb: 2,
                          textAlign: "left",
                        }}
                      >
                        Floor
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        {["G", "F1", "F2", "F3"].map((f) => (
                          <Button
                            key={f}
                            variant={floor === f ? "contained" : "outlined"}
                            onClick={() => handleFloorChange(f)}
                            sx={{
                              width: 40,
                              height: 40,
                              minWidth: "unset",
                              padding: 0,
                              borderRadius: "60%",
                              border: "1px solid #0E0031",
                              color: floor === f ? "white" : "#674D9F",
                              backgroundColor:
                                floor === f ? "#674D9F" : "transparent",
                            }}
                          >
                            {f}
                          </Button>
                        ))}
                      </Box>

                      {/* Room Number Selection */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          color: "#0E0031",
                          mb: 2,
                          textAlign: "left",
                        }}
                      >
                        Room Number
                      </Typography>
                      <Grid
                        container
                        spacing={1}
                        sx={{ justifyContent: "space-between", mb: 2 }}
                      ></Grid>
                    </Box>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <ComplaintsLongTermWorkTableContainer />
        </Box>
      </Box>
    );
  };
  
  export default ComplaintsLongTermWorkTabs;
  