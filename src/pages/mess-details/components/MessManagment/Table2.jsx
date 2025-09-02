/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  Typography,
  Box,
  TablePagination,
  Toolbar,
  Tooltip,
  DialogContent,
  Dialog,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@emotion/react";
import ListIcon from "@mui/icons-material/List";
import { useLocation, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getMessListAsync } from "./../../../../features/mess/messSlice";
import dayjs from "dayjs";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { deleteMessAsync } from "../../../../features/mess/messApi";
import { toast } from "react-toastify";
import TableLoader from "./../../../../components/tableLoader/TableLoader";

const MessTable2 = ({ reload }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const theme = useTheme();
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate(); // Use the navigate function for routing
  const dispatch = useDispatch();
  const [page, setPage] = useState(0); // State for pagination page (0-based index)
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const { getMessList, loading } = useSelector((state) => state.mess);
  const messData = getMessList || [];
  const count = getMessList?.count || 0; // Total number of items
  const [moreMenuID, setMoreMenuID] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const selectedUser = JSON.parse(localStorage.getItem("userData"));
  // permission access
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || "";
  const { permittedRoutes } = useSelector((state) => state?.permission);
  const [pagePermission, setPagePermission] = useState([]);

  useEffect(() => {
    if (permittedRoutes) {
      const path = location.pathname.substring(1); // Remove leading '/' to match the link
      const selectedRoute = permittedRoutes?.find(
        (route) => route?.link === path
      );

      if (selectedRoute) {
        setPagePermission(selectedRoute);
      }
    }
  }, [location.pathname, permittedRoutes]);

  const TABLE_HEAD = [
    { id: "sr.no", value: "Sr. No." },
    { id: "breakfast", value: "BreakFast" },
    { id: "lunch", value: "Lunch" },
    { id: "dinner", value: "Dinner" },
    { id: "day", value: "Day" },
    { id: "date", value: "Date" },
    { id: "createdBy", value: "Created By" },
    { id: "createdAt", value: "Created At" },
    { id: "action", value: "Actions" },
  ];

  // Menu Handlers
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMoreMenuID(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMoreMenuID(null);
  };

  const handleFilterOpen = (event) => setFilterAnchorEl(event.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleDetailsClick = (id) => {
    navigate(`/mess/mess-management/${id}`);
    handleMenuClose();
  };

  const handleEditClick = (id) => {
    navigate(`/mess/details/${id}`);
    handleMenuClose();
  };

  const handleAddClick = () => {
    navigate(`/mess/details`);
    handleMenuClose();
  };
  const handleDelete = () => {
    setDeleteLoader(true);
    const data = {
      messId: selectedUsers,
    };
    dispatch(deleteMessAsync(data))
      .then((res) => {
        setDeleteLoader(false);
        if (res?.payload?.statusCode === 200) {
          setOpenDelete(false);
          setSelectedUsers([]);
          toast.success(res?.payload?.message);
          dispatch(getMessListAsync({ page: page + 1, limit: rowsPerPage }));
        } else {
          toast.error(res?.payload?.message);
        }
      })
      .catch(() => setDeleteLoader(false));
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all users
    } else {
      setSelectedUsers(messData?.map((user) => user._id)); // Select all users
    }
    setSelectAll(!selectAll);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rowsPerPage state
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Fetch data whenever page or rowsPerPage changes
  useEffect(() => {
    // Dispatch getMessListAsync action with updated page (1-based index) and rowsPerPage
    if (selectedUser?.isHostelAssigned) {
      dispatch(getMessListAsync({ page: page + 1, limit: rowsPerPage }));
    }
    if (reload) {
      dispatch(getMessListAsync({ page: page + 1, limit: rowsPerPage }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page, reload, rowsPerPage]);

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: theme.palette.primary.light,
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="#fff"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Mess Menu
          </Typography>
        )}

        {/* {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={() => setOpenDelete(true)}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        )} */}
      </Toolbar>
    );
  }

  return (
    <Box sx={{ marginBottom: "30px", marginTop: "30px" }}>
      <Box>
        <Box sx={{ border: "1px solid #674D9F", borderRadius: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: { sm: "space-between", xs: "space-between" },
              bgcolor: "#ECE0FF",
              p: 2,
              borderRadius: "10px 10px 0px 0px",
              borderBottom: "1px solid #674D9F",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: { xs: 1, xl: 0 },
                mr: { xs: 1 },
              }}
            >
              <Typography variant="h6" gutterBottom>
                Mess Menu
              </Typography>
              <Button
                onClick={handleFilterOpen}
                size="small"
                sx={{
                  textTransform: "capitalize",
                  color: "#555",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <FilterAltIcon /> Filter
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={handleFilterClose} sx={{ fontSize: "14px" }}>
                  Floor-Wise
                </MenuItem>
                <MenuItem onClick={handleFilterClose} sx={{ fontSize: "14px" }}>
                  Building-Wise
                </MenuItem>
                <MenuItem onClick={handleFilterClose} sx={{ fontSize: "14px" }}>
                  Hostel-Wise
                </MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                justifyContent: "flex-start",
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: "50px",
                  display: `${pagePermission?.add === false ? "none" : "flex"}`,
                  textTransform: "capitalize",
                }}
                onClick={handleAddClick}
              >
                <AddCircleOutlineOutlinedIcon />
                &nbsp; Add menu
              </Button>
            </Box>
          </Box>
          {loading ? (
            <TableLoader />
          ) : (
            <TableContainer
              component={Paper}
              sx={{ borderRadius: "10px", fontSize: "50px" }}
            >
              {selectedUsers.length ? (
                <EnhancedTableToolbar numSelected={selectedUsers.length} />
              ) : null}
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ borderBottom: "2px solid #674D9F" }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: "#674D9F80" }}
                        checked={selectAll}
                        indeterminate={
                          selectedUsers.length > 0 &&
                          selectedUsers.length < messData.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {TABLE_HEAD?.map((item, index) => (
                      <TableCell key={index} align="left ">
                        {item.value}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messData?.filter((item) =>
                    Object.values(item).some((val) =>
                      String(val)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                  ).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    messData
                      ?.filter((item) =>
                        Object.values(item).some((val) =>
                          String(val)
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                      )
                      ?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              sx={{ color: "#674D9F80" }}
                              checked={selectedUsers.includes(item?._id)}
                              onChange={() => handleCheckboxChange(item?._id)}
                            />
                          </TableCell>
                          <TableCell>
                            {index + 1 + page * rowsPerPage}
                          </TableCell>{" "}
                          {/* Corrected row numbering */}
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography>
                                <Box
                                  sx={{
                                    maxWidth: 180, // Ensure it takes up full cell width
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    "& .comment-text": {
                                      display: "-webkit-box",
                                      WebkitLineClamp: 1,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      maxHeight: "3em", // Adjust based on line-height
                                      lineHeight: "1.5em", // Adjust line-height as needed
                                    },
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    className="comment-text"
                                  >
                                    <Tooltip title={item?.breakfast} arrow>
                                      <span>{item?.breakfast || "N/A"}</span>
                                    </Tooltip>
                                  </Typography>
                                </Box>
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              <Box
                                sx={{
                                  maxWidth: 180, // Ensure it takes up full cell width
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  "& .comment-text": {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxHeight: "3em", // Adjust based on line-height
                                    lineHeight: "1.5em", // Adjust line-height as needed
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  className="comment-text"
                                >
                                  <Tooltip title={item?.lunch} arrow>
                                    <span>{item?.lunch || "N/A"}</span>
                                  </Tooltip>
                                </Typography>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>
                              <Box
                                sx={{
                                  maxWidth: 180, // Ensure it takes up full cell width
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  "& .comment-text": {
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxHeight: "3em", // Adjust based on line-height
                                    lineHeight: "1.5em", // Adjust line-height as needed
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  className="comment-text"
                                >
                                  <Tooltip title={item?.dinner} arrow>
                                    <span>{item?.dinner || "N/A"}</span>
                                  </Tooltip>
                                </Typography>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ textTransform: "capitalize" }}>
                            {item?.day}
                          </TableCell>
                          <TableCell>
                            {dayjs(item?.date).format("DD MMM YYYY")}
                          </TableCell>
                          <TableCell>{item?.createdBy}</TableCell>
                          {/* <TableCell>{dayjs(item?.createdAt).format('DD MMM YYYY, HH:mm A')}</TableCell> */}
                          <TableCell>
                            {moment.utc(item?.createdAt).format("DD MMM YYYY")}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(event) =>
                                handleMenuClick(event, item?._id)
                              }
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={moreMenuID === item?._id}
                              onClose={handleMenuClose}
                            >
                              <MenuItem
                                onClick={() => handleDetailsClick(item?._id)}
                              >
                                <ListIcon sx={{ mr: 1, fontSize: "16px" }} />
                                <Typography fontSize={"14px"}>
                                  Details
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                sx={{
                                  display: `${
                                    pagePermission?.edit === false ? "none" : ""
                                  }`,
                                }}
                                onClick={() => handleEditClick(item?._id)}
                              >
                                <CreateOutlinedIcon
                                  sx={{ mr: 1, fontSize: "16px" }}
                                />{" "}
                                <Typography fontSize={"14px"}>Edit</Typography>
                              </MenuItem>
                              <MenuItem>
                                <ArrowDownwardOutlinedIcon
                                  sx={{ mr: 1, fontSize: "16px" }}
                                />{" "}
                                <Typography fontSize={"14px"}>
                                  DownLoad Receipt
                                </Typography>
                              </MenuItem>
                              <MenuItem>
                                <AccessTimeOutlinedIcon
                                  sx={{ mr: 1, fontSize: "16px" }}
                                />
                                <Typography fontSize={"14px"}>
                                  Send Reminder
                                </Typography>
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </Box>
      </Box>
      <Dialog open={openDelete} fullWidth maxWidth="xs">
        <DialogContent>
          <Typography>Are you sure you want to delete?</Typography>
          <Stack
            direction="row"
            gap={2}
            display="flex"
            justifyContent="flex-end"
            pt={2}
          >
            <LoadingButton
              loading={deleteLoader}
              variant="contained"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Delete
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => setOpenDelete(false)}
              size="small"
            >
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MessTable2;
