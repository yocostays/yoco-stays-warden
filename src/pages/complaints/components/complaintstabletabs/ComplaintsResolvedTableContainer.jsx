
import {
  Box,
  Checkbox,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import theme from "@theme/Theme";
import CustomPagination from "@pages/leave/components/table/customPagination/CustomPagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
// import { downloadCSV } from "@utils/downloadCSV";
// import { toast } from "react-toastify";
import ComplaintsSideDrawer from "../ComplaintsSideDrawer";

const ComplaintsResolvedTableContainer = () => {
  
  const TABLE_HEAD = [
    { id: "ticketid", value: "Ticket ID" },
    { id: "name", value: "Name" },
    { id: "createddate", value: "Created Date" },
    { id: "resolveddate", value: "Resolved Date" },
    { id: "fixtime", value: "Fix Time" },
    { id: "typesofcomplaints", value: "Types Of Complaints" },
    { id: "complaintsreason", value: "Complaint Reason" },
  ];

  const dummyTableData = [
      {
        ticketid: "Y1234",
        name: "Harsh Jogi",
        createddate: "23rd Jan, 2024 | 11:00 AM",
        resolveddate: "25th Jan, 2024 | 03:30 PM",
        fixtime: "2 days 4 hours",
        typesofcomplaints: "Security",
        complaintsreason: "Absence of guard",
      },
      {
          ticketid: "Y1234",
          name: "Harsh Jogi",
          createddate: "23rd Jan, 2024 | 11:00 AM",
          resolveddate: "25th Jan, 2024 | 03:30 PM",
          fixtime: "2 days 4 hours",
          typesofcomplaints: "Security",
          complaintsreason: "Absence of guard",
        },
        {
          ticketid: "Y1234",
          name: "Harsh Jogi",
          createddate: "23rd Jan, 2024 | 11:00 AM",
          resolveddate: "25th Jan, 2024 | 03:30 PM",
          fixtime: "2 days 4 hours",
          typesofcomplaints: "Security",
          complaintsreason: "Absence of guard",
        },
        {
          ticketid: "Y1234",
          name: "Harsh Jogi",
          createddate: "23rd Jan, 2024 | 11:00 AM",
          resolveddate: "25th Jan, 2024 | 03:30 PM",
          fixtime: "2 days 4 hours",
          typesofcomplaints: "Security",
          complaintsreason: "Absence of guard",
        },
        {
          ticketid: "Y1234",
          name: "Harsh Jogi",
          createddate: "23rd Jan, 2024 | 11:00 AM",
          resolveddate: "25th Jan, 2024 | 03:30 PM",
          fixtime: "2 days 4 hours",
          typesofcomplaints: "Security",
          complaintsreason: "Absence of guard",
        },
    ];

    const resolveOptions = [
      { value: "resolve", label: "Resolve" },
      { value: "hold", label: "Hold" },
      { value: "long term work", label: "Long Term Work" },
      { value: "reject", label: "Reject" },
      { value: "escalate", label: "Escalate" },
    ];
    

  const [selectedRows, setSelectedRows] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportAnchorEl, setExportAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const openExport = Boolean(exportAnchorEl);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dropdownAnchor, setDropdownAnchor] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Resolve");
  // const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleCloseDrawer = () => {
    setDrawerOpen(false); // Close the drawer
    setSelectedRow(null); // Clear the selected row
    setIsFullScreen(false); // Reset fullscreen mode
  };

  const handleExpandToFullPage = () => {
    setIsFullScreen((prev) => !prev); // Expand the drawer to fullscreen
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(dummyTableData.map((row) => row.ticketid));
      setIsSelectedAll(true);
    } else {
      setSelectedRows([]);
      setIsSelectedAll(false);
    }
  };
  const handleSelectRow = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prev) => [...prev, rowId]); // Add row ID to selectedRows
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== rowId)); // Remove row ID from selectedRows
    }
  };

  const handleOpenMenu = (event) => {
    setDropdownAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setDropdownAnchor(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null); // Closes the menu
  };
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    handleCloseMenu();
  };

  // const handleMenuClose = () => {
  //   setMenuAnchorEl(null);
  // };

  // const handleMenuOpen = (event) => {
  //   setMenuAnchorEl(event.currentTarget);
  //   // setSelectedAssignee(assignee);
  // };

  const { totalDataCount } = useSelector((state) => state.mess);

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          borderWidth: "2px",
          borderStyle: "solid",
          borderRadius: "20px",
          borderImage: "linear-gradient(180deg, #9B7BC6, #FDFAFF) 1",
          boxShadow: "0px 4px 10px rgba(103, 77, 159, 0.2)",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid #947dc6" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={{ color: "#674D9F80" }}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {TABLE_HEAD.map((item, index) => (
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#0E0031",
                  }}
                  key={index}
                  align="left"
                >
                  {item.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyTableData.length === 0 ? (
              // No Data State
              <TableRow>
                <TableCell colSpan={TABLE_HEAD.length + 1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "300px",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" color="textSecondary">
                      No data available
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              // Data Available State
              dummyTableData.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    transition: "box-shadow 0.4s, transform 0.4s",
                    "&:hover": {
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1)",
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      sx={{ color: "#674D9F80" }}
                      checked={selectedRows.includes(item.ticketid)}
                      onChange={(event) =>
                        handleSelectRow(event, item.ticketid)
                      }
                    />
                  </TableCell>
                  <TableCell>{item.ticketid || "--"}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      <img
                        src="public/9440456 1.png"
                        alt={item.name}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      {item.name || "--"}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {item.createddate || "--"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {item.resolveddate || "--"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {item.fixtime || "--"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px",textAlign:"center", fontWeight: "500" }}>
                    {item.typesofcomplaints || "--"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px", fontWeight: "500" }}>
                    {item.complaintsreason || "--"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <CustomPagination
          rowsPerPage={rowsPerPage}
          page={page}
          count={totalDataCount}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          sx
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            {/* Display selected rows count */}
            <Typography variant="body1" mr={3} ml={1}>
              <span style={{ color: "#674D9F" }}>Action: </span>
              {selectedRows.length} Selected
            </Typography>

            <Box>
              <TextField
                size="small"
                id="outlined-basic"
                label="Add Remark"
                variant="outlined"
                sx={{
                  backgroundColor: "#F4BE3033",
                  color: "#ACB5BD",
                  borderRadius: "6px",
                }}
              />
            </Box>

            {/* Center: Resolve dropdown */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #AECAAA",
                color: "#0E6100",
                padding: "8px 16px",
                borderRadius: "50px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
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
                    color: "#0E6100",
                  }}
                />
              </Typography>
              <Menu
                anchorEl={dropdownAnchor}
                open={Boolean(dropdownAnchor)}
                onClose={handleCloseMenu}
              >
                {resolveOptions.map((option) => (
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
            <Menu
              anchorEl={exportAnchorEl}
              open={Boolean(openExport)}
              onClose={handleExportClose}
            >
              <MenuItem
                disabled={!isSelectedAll}
                // onClick={() => onExportExcel()}
              >
                All Export
              </MenuItem>
              <MenuItem
                disabled={!selectedRows.length}
                // onClick={() => onExportExcel()}
              >
                Export ({selectedRows.length})
              </MenuItem>
            </Menu>
          </Box>
        </CustomPagination>
      </TableContainer>
      <ComplaintsSideDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        isFullScreen={isFullScreen}
        isSmallScreen={isSmallScreen}
        selectedRow={selectedRow}
        handleExpandToFullPage={handleExpandToFullPage}
      />
    </Box>
  );
};

export default ComplaintsResolvedTableContainer;