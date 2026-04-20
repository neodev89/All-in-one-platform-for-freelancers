export type DBInvoiceTable = {
    createdAt: string;
    creationDate: string;
    id: number;
    numInvoice: string;
    taxable: string;
    vat: string;
    total: string;
    protocolNumb: string;
    taxIdCode: string | null;
    invoiceToken: string;
}