import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const USER_COOKIE = "user_token";

export interface UserJwtPayload {
  id: string;
  email: string;
}

export function signUserToken(payload: UserJwtPayload, rememberMe = false) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: rememberMe ? "30d" : "7d",
  });
}

export function verifyUserToken(token: string): UserJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserJwtPayload;
  } catch {
    return null;
  }
}

/**
 * Reads + verifies the customer session from the request cookies.
 * Returns the decoded payload or null. Use inside API route handlers.
 */
export async function getCurrentUser(): Promise<UserJwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_COOKIE)?.value;
  if (!token) return null;
  return verifyUserToken(token);
}
