import {z} from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is Required"),
  email: z.string().min(2, "Email is Required"),
  message: z.string().optional(),
  phone: z.string().min(2, "Phone is Required"),
});

export type ContactSchema = z.infer<typeof contactSchema>;

//   "name": "asddddddd",
//   "email": "jane@example.com",
//   "message": "I’d like to learn more about your services.",
//   "phone": "555111111"
