
import { Box, TablePagination, IconButton } from "@mui/material";
import {
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import PropTypes from "prop-types";

// Custom Pagination Actions
const CustomPaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  
  const handleFirstPage = () => onPageChange(null, 0);
  const handleLastPage = () =>
    onPageChange(null, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  const handleBackPage = () => onPageChange(null, page - 1);
  const handleNextPage = () => onPageChange(null, page + 1);

  return (
    <Box display="flex" alignItems="center">
      <IconButton
        onClick={handleFirstPage}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackPage}
        disabled={page === 0}
        aria-label="previous page"
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={handleNextPage}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <ChevronRight />
      </IconButton>
      <IconButton
        onClick={handleLastPage}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};

CustomPaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const CustomPagination = ({
  rowsPerPage,
  page,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  children,
  ...props
}) => {
  return (
    <Box
      // display="flex"
      // alignItems="center"
      // justifyContent="space-between"
      sx={{ border: "2px solid #674D9F", padding: 1, mb: 10 }}
      boxShadow="0px 10px 9px rgba(103, 77, 159, 0.2)"
      {...props}
    >
      {children}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={(subprops) => (
          <CustomPaginationActions {...subprops} />
        )}
        sx={{
          "& .MuiTablePagination-actions button": {
            borderRadius: "50%",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          },
        }}
      />
    </Box>
  );
};

CustomPagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  children: PropTypes.node,
};

CustomPagination.defaultProps = {
  children: null,
};

export default CustomPagination;
