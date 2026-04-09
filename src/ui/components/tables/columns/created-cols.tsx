import { GridColDef } from "@mui/x-data-grid"

export const createdCols = <T extends Record<string, any>>(raws: Array<T>) => {
    if (!Array.isArray(raws) || raws.length === 0) {
        console.log("I dati passati alla funzione per creare le colonne sono inesistenti!");
        return [];
    } else {
        const keyRaws = Object.keys(raws[0]) as Array<keyof T>;
        console.log("Copilot dice che mi servono queste", keyRaws)
        const cols = keyRaws.map((el) => {
            const columnDef: GridColDef[] = [
                {
                    field: el as string,
                    headerName: String(el).toUpperCase(),
                    minWidth: 200,
                    sortable: true,
                }
            ];
            return columnDef;
        });
        return cols.flat();
    }
};