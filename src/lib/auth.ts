import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

import { env } from '~/env';

export function signToken(id: string) {
  return new SignJWT()
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .setSubject(id)
    .sign(new TextEncoder().encode(env.JWT_SECRET));
}

export async function verifyToken(token: string | undefined | null) {
  if (!token) return null;
  try {
    const user = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return user.payload;
  } catch (error) {
    return null;
  }
}

export async function getAuth() {
  return verifyToken(cookies().get('token')?.value);
}
