import { API_URL } from "@/features/lib/api/baseUrl";
import { ContactSchema } from "../contactSchema";

export async function sendContactMessage(
  data: ContactSchema
): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to send contact message");
  }

  return res.json();
}
