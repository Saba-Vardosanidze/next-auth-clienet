import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";
import {matchPath} from "./matchPath";
import {
  AUTH_PATH,
  DEFAULT_AUTH_PATH,
  DEFAULT_PROTECTED_PATH,
  PUBLIC_PATHS,
} from "./path";
function isTokenKindaValid(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = jwt.decode(token) as {exp: number};
    return decoded && decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function authGuard(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const token = request.cookies.get("tokken")?.value;
  const isAuthenticated = isTokenKindaValid(token);

  if (matchPath(pathname, PUBLIC_PATHS)) {
    return null;
  }

  if (matchPath(pathname, AUTH_PATH)) {
    return isAuthenticated
      ? new URL(DEFAULT_PROTECTED_PATH, request.url)
      : null;
  }
  return isAuthenticated ? null : new URL(DEFAULT_AUTH_PATH, request.url);
}
