'use client'

import { tables } from "@/@types/custom-table"
import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react"

export const CustomTable = <T extends object>({
    columns, rows, onRowDoubleClick,
}: tables<T>) => {

    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);

    return (
        <Box sx={{
            height: '500px',
            maxHeight: '80%',
            width: '100%',
        }}>
            <DataGrid
                columns={columns}
                rows={rows}
                paginationModel={{ page, pageSize }}
                sortingMode="server"
                onPaginationModelChange={(model) => {
                    setPage(model.page);
                    setPageSize(model.pageSize);
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                checkboxSelection={false}
                onRowDoubleClick={onRowDoubleClick}
                disableColumnSorting
            />
        </Box>
    )
};