import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const registeredFreelanceUsers = pgTable(
    'register_freelance_data_table',
    {
        id: integer('id').notNull().primaryKey(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        email: text('email').notNull()
    }
);

export const validateFreelanceRegister = createInsertSchema(registeredFreelanceUsers);
export const validateDBRegisterData = createSelectSchema(registeredFreelanceUsers);
export type DBFreelanceRegisterTypeInsert = InferInsertModel<typeof registeredFreelanceUsers>;
export type DBFreelanceRegisterTypeSelect = InferSelectModel<typeof registeredFreelanceUsers>;
