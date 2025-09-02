import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import PropTypes from "prop-types";

const CustomTableHead = ({ isAllSelected, isIndeterminate, handleSelectAll, columns }) => (
  <TableHead sx={{ fontWeight: 500 }}>
    <TableRow sx={{ borderBottom: "1px solid #674D9F" }}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={handleSelectAll}
        />
      </TableCell>
      {columns.map((column, index) => (
        <TableCell key={index} align={column.align || "left"}>
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

CustomTableHead.propTypes = {
  isAllSelected: PropTypes.bool.isRequired,
  isIndeterminate: PropTypes.bool.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center", "justify", "inherit"]),
    })
  ).isRequired,
};

export default CustomTableHead;
