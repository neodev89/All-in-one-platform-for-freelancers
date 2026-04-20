import { DBInvoiceTable } from "./DBInvoiceTable";

interface modalTableType {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectRow: DBInvoiceTable;
    setSelectRow: (selectRow: DBInvoiceTable) => void;
}

export type {
    modalTableType
}