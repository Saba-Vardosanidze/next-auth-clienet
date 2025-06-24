import {z} from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "at least 6 letters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
