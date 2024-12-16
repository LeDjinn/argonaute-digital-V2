import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from "./db/schema"; // Import your schema

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use the POSTGRES_URL from .env.local
});

// Export the Drizzle instance
export const db = drizzle(pool, { schema });
