import { Checkbox, TableCell, TableRow, IconButton, Box } from '@mui/material';
import PropTypes from 'prop-types';


const CustomHandlerTable = ({
  data,
  selectedRows,
  onSelectRow,
  onSelectAll,
  isAllSelected,
  isIndeterminate,
  onRowClick,
  columns,
  actionsColumn
}) => {

  // Handle Select All
  const handleSelectAll = (event) => {
    onSelectAll(event.target.checked); // Pass the checked state to parent
  };

  // Handle Row Selection
  const handleSelectRow = (event, rowId) => {
    onSelectRow(event.target.checked, rowId); // Pass the checked state and rowId to parent
  };

  return (
    <>
      <TableRow sx={{ borderBottom: "2px solid #674D9F" }}>
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: "#674D9F80" }}
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
          />
        </TableCell>
        {columns.map((col, index) => (
          <TableCell key={index} sx={{ fontWeight: "bold", fontSize: "16px" }}>
            {col.header}
          </TableCell>
        ))}
        {actionsColumn && <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>Actions</TableCell>}
      </TableRow>

      {data.map((item) => (
        <TableRow
          key={item._id}
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
              checked={selectedRows.includes(item._id)}
              onChange={(event) => handleSelectRow(event, item._id)}
            />
          </TableCell>

          {/* Loop through dynamic columns */}
          {columns.map((col, index) => (
            <TableCell key={index}>
              {col.accessor && item[col.accessor] ? item[col.accessor] : '--'}
            </TableCell>
          ))}

          {/* Actions Column */}
          {actionsColumn && (
            <TableCell>
              <IconButton onClick={() => onRowClick(item)}>
                <Box component="img" src="edit-icon.png" alt="Edit" sx={{ width: 20, height: 20 }} />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
};

export default CustomHandlerTable;


CustomHandlerTable.propTypes = {
    data: PropTypes.array.isRequired,
    selectedRows: PropTypes.object.isRequired,
    onSelectRow: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    isAllSelected: PropTypes.bool.isRequired,
    isIndeterminate: PropTypes.bool.isRequired,
    onRowClick: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    actionsColumn: PropTypes.bool.isRequired,
}
