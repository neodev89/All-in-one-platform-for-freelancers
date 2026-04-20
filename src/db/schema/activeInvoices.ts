import { bigint, date, numeric, pgTable, text } from "drizzle-orm/pg-core";
import { registeredFreelanceUsers } from "./registered-freelance-users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";


export const activeInvoice = pgTable('active.invoice', {
    id: bigint('id', { mode: 'number' }).primaryKey(),
    userId: text('user_id').notNull().references(
        () => registeredFreelanceUsers.id
    ),
    customer: text('customer').notNull(),
    createDate: date('create_data').notNull().defaultNow(),
    protocol: text('protocol'),
    dateMonthCompetence: date('date_month_competence').notNull().defaultNow(),
    taxable: numeric('taxable', { mode: 'number' }).notNull().default(0),
    description: text('description').notNull(),
    vat: numeric('vat').default('22'),
    total: numeric('total').notNull(),
    discount1: numeric('discount1', { mode: 'number'}).default(0),
    discount2: numeric('discount2', { mode: 'number'}).default(0),
    discount3: numeric('discount3', { mode: 'number'}).default(0),
    rounding: numeric('rounding', { mode: 'number' }).default(0),
    sdiCode: text('sdi_code'),
    pec: text('pec'),
});

export const validateActiveInvoiceSelect = createSelectSchema(activeInvoice);
export const validateActiveInvoiceInsert = createInsertSchema(activeInvoice);

export type TypeActiveInvoiceSelect = InferSelectModel<typeof activeInvoice>;
export type TypeActiveInvoiceInsert = InferInsertModel<typeof activeInvoice>;