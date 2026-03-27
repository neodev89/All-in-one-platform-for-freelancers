import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/registered-freelance-users";

// Funzione helper per garantire che la stringa ci sia
const getPassword = (): string => {
  const pw = process.env.SUPABASE_DB_PASSWORD;
  if (typeof pw !== "string") {
    // Se arrivi qui, il driver non crasha con SASL ma Nextjs ti dice perché
    throw new Error("LA PASSWORD NON È UNA STRINGA! Valore attuale: " + typeof pw);
  }
  return pw;
};

export const pool = new Pool({
    host: process.env.SUPABASE_HOST!,
    port: 6543,
    user: process.env.SUPABASE_USER!,
    password: getPassword(),
    database: process.env.SUPABASE_DATABASE!,
    ssl: { rejectUnauthorized: false },
    max: 1,
});

export const db = drizzle(pool, { schema });