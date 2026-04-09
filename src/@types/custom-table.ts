import { DataGridProps, GridRowParams } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";

export type tables<T extends object> = DataGridProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: GridColDef<any>[];
    rows: Array<T>;
    onRowDoubleClick?: (params: GridRowParams<T>) => void;
};