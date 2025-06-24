import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { matchPath } from "./matchPath";
import {
  AUTH_PATH,
  DEFFAULT_AUTH_PATH,
  DEFFAULT_PROTECTED_PATH,
  PUBLIC_PATHS,
} from "./path";

function isTokenKindaValid(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const decoded = jwt.decode(token) as { exp: number };
    return decoded && decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function authGuard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = isTokenKindaValid(token);

  //   Public
  if (matchPath(pathname, PUBLIC_PATHS)) {
    return null;
  }

  // Auth Part
  if (matchPath(pathname, AUTH_PATH)) {
    return isAuthenticated
      ? new URL(DEFFAULT_PROTECTED_PATH, request.url)
      : null;
  }

  // all other paths
  return isAuthenticated ? null : new URL(DEFFAULT_AUTH_PATH, request.url);
}
