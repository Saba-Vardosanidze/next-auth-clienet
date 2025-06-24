import { includes } from "zod/v4-mini";
import { CreateFaqInput, Faq } from "../faqTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api/faq";

export async function fetchFaqs(): Promise<Faq[]> {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch FAQs");

  return res.json();
}

export async function createFaq(data: CreateFaqInput): Promise<Faq> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to Create FAQ");
  const json = await res.json();
  return json.faq;
}

//                         6856e3c8f199eb9415064d6d
export async function deleteFaq(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`failed to delete FAQ: ${errorText || res.status}`);
  }
}

export async function updateFaq(
  id: string,
  data: CreateFaqInput
): Promise<Faq> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to Edit FAQ");
  const json = await res.json();
  return json.faq;
}
