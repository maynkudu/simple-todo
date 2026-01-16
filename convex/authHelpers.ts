import type { MutationCtx, QueryCtx } from "./_generated/server";

export async function getUserFromToken(
  ctx: MutationCtx | QueryCtx,
  token?: string,
) {
  if (!token) return null;

  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .first();

  if (!session) return null;

  return await ctx.db.get(session.userId);
}

export function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return toHex(hash);
}
