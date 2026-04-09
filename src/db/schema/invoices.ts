import { bigint, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { registeredFreelanceUsers } from "./registered-freelance-users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const invoices = pgTable(
    "invoices",
    {
        id: bigint('id', { mode: 'number' }).primaryKey(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        numInvoice: numeric('num_invoice').notNull(),
        taxable: text('taxable').notNull(),
        vat: text('vat').notNull(),
        total: text('total').notNull(),
        creationDate: timestamp('creation_date').notNull().defaultNow(),
        protocolNumb: numeric('protocol_numb').notNull(),
        taxIdCode: text('tax_id_code'),
        invoiceToken: text('invoice_token').notNull().references(
            () => registeredFreelanceUsers.id
        ),   
    }
);

export const validateDBInvoicesInsert = createInsertSchema(invoices);
export const validateDBInvoicesSelect = createSelectSchema(invoices);

export type DBInvoiceTypeInsert = InferInsertModel<typeof invoices>;
export type DBInvoiceTypeSelect = InferSelectModel<typeof invoices>;