import type { TypeOf } from "zod";
import { object, string } from "zod";

export const userSchema = object({
  id: string(),
  name: string(),
}).strict();

export const userCreationSchema = userSchema.omit({ id: true });

export type User = TypeOf<typeof userSchema>;
