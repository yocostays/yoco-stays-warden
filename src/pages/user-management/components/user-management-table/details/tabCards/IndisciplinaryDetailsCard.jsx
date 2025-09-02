import * as React from 'react';
import PropTypes from "prop-types";
import {
    Button, Card, Grid, Typography, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton
} from "@mui/material";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import { IndiciplinForm } from '../IndiciplinForm';
import { Icon } from '@iconify/react'

const IndisciplinaryDetailsCard = ({ indisciplinaryActions, pagePermission, onReload }) => {

    const [indicipline, setIndicipline] = React.useState(false);
    const [checkedRows, setCheckedRows] = React.useState([]);

    const handleAddIndisciplinary = () => {
        setIndicipline(true);
    };

    const handleCloseIndisciplinary = () => {
        setIndicipline(false);
    };

    const handleDelete = (id) => {
        // Implement delete functionality here
        console.log(`Delete action for id: ${id}`);
    };

    const handleCheckboxChange = (id) => {
        setCheckedRows((prev) =>
            prev.includes(id)
                ? prev.filter((rowId) => rowId !== id)
                : [...prev, id]
        );
    };

    console.log('checkedRows :>> ', checkedRows);

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">
                    Reports of Indisciplinary Actions:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Card} sx={{ mt: 2, border: 1, borderRadius: 3, borderColor: '#B4B4B4' }}>
                    <Table>
                        <TableHead sx={{ borderBottom: 2, borderColor: '#B4B4B4' }}>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={checkedRows.length > 0 && checkedRows.length < indisciplinaryActions.length}
                                        checked={checkedRows.length === indisciplinaryActions.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setCheckedRows(indisciplinaryActions.map((item) => item?._id));
                                            } else {
                                                setCheckedRows([]);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>Indisciplinary Actions</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Fine Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {indisciplinaryActions.length > 0 ? (
                                indisciplinaryActions.map((item, key) => (
                                    <TableRow key={key} sx={{ backgroundColor: key % 2 === 0 ? '#F5F7FB' : 'transparent' }}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={checkedRows.includes(item?._id)}
                                                onChange={() => handleCheckboxChange(item?._id)}
                                            />
                                        </TableCell>
                                        <TableCell>{item?.remark}</TableCell>
                                        <TableCell>{dayjs(item?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell>Rs. {item?.fineAmount}</TableCell>
                                        <TableCell>
                                            <IconButton color="error" onClick={() => handleDelete(item?.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="body1" fontSize={"14px"} fontWeight={"bold"}>
                                            No Data Available
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    my: 3,
                }}
            >
                <Button
                    variant="text"
                    color="primary"
                    sx={{
                        borderRadius: "30px",
                        ml: 1,
                        display: `${pagePermission?.add === false ? "none" : "flex"}`
                    }}
                    onClick={handleAddIndisciplinary}
                    endIcon={<Icon icon="ic:baseline-add" />}
                >
                    Add Action
                </Button>
            </Grid>

            <IndiciplinForm
                open={indicipline}
                onClose={handleCloseIndisciplinary}
                onReload={onReload}
            />
        </>
    )
}

IndisciplinaryDetailsCard.propTypes = {
    indisciplinaryActions: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired, // Adjusted id field to _id as per the usage
        createdAt: PropTypes.string,
        remark: PropTypes.string,
        fineAmount: PropTypes.number,
    })),
    pagePermission: PropTypes.shape({
        add: PropTypes.bool,
    }),
    onReload: PropTypes.func,
};

export default IndisciplinaryDetailsCard;
