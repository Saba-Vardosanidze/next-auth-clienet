import { z } from "zod";

export const schema = z.object({
  question: z.string().min(5, "სამწუხაროდ ძალიან პატარა ტექსტია, მინიმუმ 5"),
  answer: z.string().min(5, "სამწუხაროდ ძალიან პატარა პასუხია, მინიმუმ 5"),
});
