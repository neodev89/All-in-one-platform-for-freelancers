import { DBInvoiceTypeSelect } from "@/db/schema/invoices";

interface modalTableType {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectRow: DBInvoiceTypeSelect;
    setSelectRow: (selectRow: DBInvoiceTypeSelect) => void;
}

export type {
    modalTableType
}