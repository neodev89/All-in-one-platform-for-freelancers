import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const registeredFreelanceUsers = pgTable(
    'register_freelance_data_table',
    {
        id: integer('id').primaryKey(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        email: text('email').notNull()
    }
);

export type registeredFreelanceUsersType = InferSelectModel<typeof registeredFreelanceUsers>