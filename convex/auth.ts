import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { toHex, hashPassword } from "./authHelpers";

/* ---------- Signup ---------- */

export const signup = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existing) {
      throw new Error("Username already taken");
    }

    const passwordHash = await hashPassword(args.password);

    const userId = await ctx.db.insert("users", {
      username: args.username,
      passwordHash,
      createdAt: new Date().toISOString(),
    });

    return userId;
  },
});

/* ---------- Login ---------- */

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) throw new Error("Invalid credentials");

    const hash = await hashPassword(args.password);
    if (hash !== user.passwordHash) {
      throw new Error("Invalid credentials");
    }

    const token = crypto.randomUUID();

    await ctx.db.insert("sessions", {
      userId: user._id,
      token,
      createdAt: new Date().toISOString(),
    });

    return { token };
  },
});

/* ---------- Session ---------- */

export const getUserByToken = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) return null;

    return await ctx.db.get(session.userId);
  },
});
