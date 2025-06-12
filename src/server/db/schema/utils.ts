import { timestamp } from "drizzle-orm/pg-core";

export const timestampts = {
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
};
