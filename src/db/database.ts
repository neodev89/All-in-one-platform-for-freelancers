import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { registeredFreelanceUsers } from './schema/registered-freelance-users';
import { freelanceData } from './schema/freelance-data';


const connectionString = process.env.DATABASE_URL;

const schema = {
  registeredFreelanceUsers,
  freelanceData,
};

// 1. Creiamo il client SQL (senza eseguire nulla)
const pool = new Pool({
    host: process.env.SUPABASE_HOST!,
    port: 6543,
    user: process.env.SUPABASE_USER!,
    password: process.env.SUPABASE_DB_PASSWORD!,
    database: process.env.SUPABASE_DATABASE!,
});

export const db = drizzle(pool, { schema });