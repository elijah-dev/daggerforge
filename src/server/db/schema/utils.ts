import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const timestampts = {
  created_at: timestamp({ withTimezone: true, mode: "string" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .notNull(),
  updated_at: timestamp({ withTimezone: true, mode: "string" })
    .default(sql`(now() AT TIME ZONE 'utc'::text)`)
    .$onUpdate(() => sql`(now() AT TIME ZONE 'utc'::text)`),
};
