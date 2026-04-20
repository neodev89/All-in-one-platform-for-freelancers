import { DBInvoiceTypeSelect } from "@/db/schema/invoices";
import { bodySendToPost } from "@/zod/joinInvoiceAndFreelanceDataSchema";


interface normalizeProps {
    form: bodySendToPost; 
    protocolNumb: string; 
    token: string;
}

function parseItalianDate(dateStr: string): Date {
  const [d, m, y] = dateStr.split("/");
  return new Date(`${y}-${m}-${d}T00:00:00`);
}

export function normalizeInvoiceForDB({
    form, protocolNumb, token
}: normalizeProps): DBInvoiceTypeSelect {
  return {
    id: form.id,
    createdAt: parseItalianDate(form.createdAt),
    numInvoice: form.numInvoice,
    taxable: form.taxable,
    vat: form.vat ?? "0",
    total: form.total,
    creationDate: parseItalianDate(form.creationDate),
    protocolNumb: protocolNumb || "0", // o generato
    taxIdCode: form.taxIdCode,
    invoiceToken: token,
  };
}
