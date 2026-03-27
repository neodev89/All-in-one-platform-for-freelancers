import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface rowsProps <T extends object>{
    rows: Array<T>;
    columns: GridColDef[];
}

export const CreateRows = <T extends object,>(props: rowsProps<T>) => {

    return (
        <DataGrid
            rows={props.rows}
            columns={props.columns}
        />
    )
}