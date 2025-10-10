import { Box, Card } from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { useState } from 'react';


const Table = ({ children, viewMode = "table", columns, data = [], renderTopToolbarCustomActions, ...rest }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useMaterialReactTable({
        data,
        columns,
        enableTableHead: viewMode !== "card",
        enableBottomToolbar: viewMode !== "card",
        enablePagination: viewMode !== "card",
        enableTopToolbar: true, // optional if you want actions or not
        enableGlobalFilter: viewMode !== "card",
        enableDensityToggle: viewMode !== "card",
        enableHiding: viewMode !== "card",
        enableFullScreenToggle: viewMode !== "card",
        enableFilters: viewMode !== "card",
        // ✅ Disable sorting & actions in card mode too
        enableSorting: viewMode !== "card",
        enableColumnActions: viewMode !== "card",
        enableSorting: false,
        enableColumnActions: false,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableRowSelection: true,
        enablePagination: true,
        renderTopToolbarCustomActions,
        manualPagination: true, // ✅ full control
        rowCount: 0, // from API response
        state: { pagination },
        onPaginationChange: setPagination,
        // enableColumnResizing:true,
        muiTableContainerProps: {
            sx: {
                maxHeight: "50vh",
                height: "100%"
            },
        },

        muiTablePaperProps: {
            elevation: 0,
            sx: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                boxShadow: '0px 10px 9px rgba(103, 77, 159, 0.2)',
            },
        },

        muiBottomToolbarProps: {
            sx: {
                border: '1px solid #674D9F',
                backgroundColor: '#FDFAFF',
            },
        },

        muiTableHeadCellProps: {
            sx: {
                fontWeight: 500,
                borderTop: '1px solid #674D9F',
                borderBottom: '1px solid #674D9F',
                padding: '7px 5px',
                textAlign: 'center',
                // backgroundColor: '#F3ECFF',
                color: '#0E0031',
            },
        },

        // ✅ alternate row colors and consistent cell style
        muiTableBodyCellProps: {
            sx: {
                fontWeight: 400,
                cursor: 'pointer',
                color: '#0E0031',
                transition: 'background-color 0.25s ease',
                padding: '7px 5px',
            },
        },
        muiTableBodyProps: viewMode === "card" ? { sx: { display: "none" } } : {},
        // ✅ alternate background + bottom-only box shadow on hover
        // muiTableBodyRowProps: ({ row }) => ({
        //     sx: {
        //         cursor: 'pointer',
        //         transition: 'all 0.25s ease',
        //         position: 'relative',
        //         borderRadius: '6px',
        //         backgroundColor: row.index % 2 === 0 ? '#f7f6fa' : '#FFFFFF',
        //     },
        // }),

        ...rest,
    });


    return (
        <Box m={1} mt={5} mb={11} sx={{
            background: "linear-gradient(180deg, #674D9F, #FDFAFF)",
            padding: "1.5px 2px 0px 2px ",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            boxShadow: '0px 8px 14px rgba(103, 77, 159, 0.2)'
        }}>
            <Card sx={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                boxShadow: '0px 10px 9px rgba(103, 77, 159, 0.2)',
            }}>

                <MaterialReactTable
                    table={table} />

                {viewMode === "card" && (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 2,
                            p: 2,
                        }}
                    >
                        {children}
                    </Box>
                )}
            </Card>
        </Box>
    )
}

export default Table