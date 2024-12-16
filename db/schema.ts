import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// Define the "users" table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }), // Nullable by default
});
