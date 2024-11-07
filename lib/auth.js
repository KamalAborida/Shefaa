import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

import db from "./db";
import { cookies } from "next/headers";

const adapter = new BetterSqlite3Adapter(db, {
  user: "employees", // users table name in your databaase
  session: "sessions", // authentication sessions table name in your databaase
});

const lucia = new Lucia(adapter, {
  // leave it's values as it is
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production", // make the authentication in the production version to only work with HTTPS
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {}); // userId, configObject
  const sessionCookie = lucia.createSessionCookie(session.id); // get session cookie data
  cookies().set(
    sessionCookie.name,
    sessionCookie.value, // ID
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  console.log(sessionCookie);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}


export async function destroySession() {
  const {session} = await verifyAuth()

  if (!session) {
    return {
      error: "unauthorized"
    }
  }

  await lucia.invalidateSession(session.id)
  // delete session from databAse

  // delete session cookie
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}