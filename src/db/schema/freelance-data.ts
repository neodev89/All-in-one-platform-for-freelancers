import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { registeredFreelanceUsers } from "./registered-freelance-users";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const freelanceData = pgTable(
    'freelance_data_table', 
    {
        id: integer('id').notNull().primaryKey(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        email: text('email').notNull(),
        name: text('name'),
        lastName: text('lastName'),
        pIva: text('p_iva').notNull(),
        codiceFiscale: text('codice_fiscale'),
        imponibile: text('imponibile').notNull(),
        iva: text('iva').notNull(),
        totale: text('totale').notNull(),
        tokenUser: text('token_user').notNull().references(
            () => registeredFreelanceUsers.id
        )
    }
);

export const validateFreelanceData = createInsertSchema(freelanceData);
export const validateDBFreelanceData = createSelectSchema(freelanceData);
export type DBFreelanceTypeInsert = InferInsertModel<typeof freelanceData>;
export type DBFreelanceTypeSelect = InferSelectModel<typeof freelanceData>;