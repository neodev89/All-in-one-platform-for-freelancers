export interface joinInvoiceAndFreelanceType {
    name: string | null;
    lastName: string | null;
    id: number;
    createdAt: Date;
    numInvoice: string;
    taxable: string;
    vat: string;
    total: string;
    creationDate: Date;
    protocolNumb: string;
    taxIdCode: string | null;
    invoiceToken: string;
}