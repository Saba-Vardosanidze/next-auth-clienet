import {LoginFormValues} from "../LoginSchema";

export async function login(value: LoginFormValues) {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {"Content-Type": "aplication/json"},
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    throw new Error("invalid credentials");
  }
  return res.json();
}
 