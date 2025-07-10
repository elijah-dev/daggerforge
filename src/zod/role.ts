import z from "zod";

export const roles = ["admin", "user", "superadmin"] as const;
export const rolesEnum = z.enum(roles);
