import { z } from "zod";

export const joinInvoiceAndFreelanceDataSchema = z.object({
    name: z.string()
        .min(4, "minimo 4 caratteri")
        .nonempty(),
    lastName: z.string()
        .min(4, "minimo 4 caratteri")
        .nonempty(),
    id: z.number(),
    createdAt: z.date(),
    numInvoice: z.string().min(1, "Numero Fattura richiede almeno un numero").nonempty(),
    taxable: z.string().min(1, "Imponibile richiede almeno un valore numerico").nonempty(),
    vat: z.string().min(1, "Iva richiede almeno un numero").nullable(),
    total: z.string().min(1, "Il totale richiede almeno un numero").nonempty(),
    creationDate: z.date(),
    protocolNumb: z.string(),
    taxIdCode: z
        .string()
        .min(11, "Se non disponibile inserire p. iva")
        .max(16, "Il codice fiscale deve avere 16 caratteri")
        .nullable()
    ,
    invoiceToken: z.string().nonempty(),
});

export const bodySendToPostSchema = z.object({
    name: z.string()
        .min(4, "minimo 4 caratteri")
        .nonempty(),
    lastName: z.string()
        .min(4, "minimo 4 caratteri")
        .nonempty(),
    id: z.number(),
    createdAt: z.string().nonempty(),
    numInvoice: z.string().min(1, "Numero Fattura richiede almeno un numero").nonempty(),
    taxable: z.string().min(1, "Imponibile richiede almeno un valore numerico").nonempty(),
    vat: z.string().min(1, "Iva richiede almeno un numero").nullable(),
    total: z.string().min(1, "Il totale richiede almeno un numero").nonempty(),
    creationDate: z.string().nonempty(),
    taxIdCode: z
        .string()
        .min(11, "Se non disponibile inserire p. iva")
        .max(16, "Il codice fiscale deve avere 16 caratteri")
        .nullable()
    ,
});

export type joinInvoiceAndFreelanceDataType = z.infer<typeof joinInvoiceAndFreelanceDataSchema>;
export type bodySendToPost = z.infer<typeof bodySendToPostSchema>;
