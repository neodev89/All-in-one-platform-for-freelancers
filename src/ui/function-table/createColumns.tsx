import { GridColDef } from "@mui/x-data-grid";

interface CreateColumnsProps<T extends object> {
    dataCols: T[];
}

const replaceField = (field: string): string => {
    return field
        .replace(/([A-Z])/g, " $1") // aggiunge spazio prima delle maiuscole
        .replace(/^./, (s) => s.toUpperCase()); // prima lettera maiuscola
};

export const createColumns = <T extends object>({
    dataCols,
}: CreateColumnsProps<T>): GridColDef<T>[] => {
    if (dataCols.length === 0) return [];

    const sample = dataCols[0]; // prendi le chiavi dal primo elemento

    return Object.keys(sample).map((key) => ({
        field: key,
        headerName: replaceField(key),
        minWidth: 150,
        sortable: true,
    }));
};
