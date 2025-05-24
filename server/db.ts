import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import dotenv from 'dotenv';
import { setTimeout } from 'timers/promises';

dotenv.config({ path: './.env' });

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Fallback for local testing
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost:5432/qzonme";

console.log("Effective DATABASE_URL:", DATABASE_URL);

export const pool = new Pool({ 
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Enable SSL for secure connections
});
export const db = drizzle({ client: pool, schema });

// Test database connection on startup
// Retry logic for database connection
const MAX_RETRIES = 5;
(async () => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const client = await pool.connect();
      console.log("Database connection successful");
      client.release();
      break;
    } catch (error) {
      console.error(`Database connection failed (Attempt ${attempt}/${MAX_RETRIES}):`, error.message);
      if (attempt === MAX_RETRIES) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      await setTimeout(5000); // Wait 5 seconds before retrying
    }
  }
})();
