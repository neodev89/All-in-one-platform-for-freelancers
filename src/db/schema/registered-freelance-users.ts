export const dynamic = "force-static";

import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const registeredFreelanceUsers = pgTable(
    'register_freelance_data_table',
    {
        createdAt: timestamp('created_at').notNull().defaultNow(),
        email: text('email').notNull(),
        id: text('id').notNull().primaryKey(),
        password: text('password').notNull(),
    }
);

export const validateDBRegisterInsert = createInsertSchema(registeredFreelanceUsers);
export const validateDBRegisterDataSelect = createSelectSchema(registeredFreelanceUsers);
export type DBFreelanceRegisterTypeInsert = InferInsertModel<typeof registeredFreelanceUsers>;
export type DBFreelanceRegisterTypeSelect = InferSelectModel<typeof registeredFreelanceUsers>;
