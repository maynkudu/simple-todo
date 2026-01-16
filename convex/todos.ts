import { Effect } from "effect";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const program = Effect.tryPromise(() => {
      return ctx.db.query("todos").collect();
    });

    return Effect.runPromise(program);
    // return await ctx.db.query("todos").collect();
  },
});

export const add = mutation({
  args: { text: v.string(), token: v.string() },
  handler: async (ctx, args) => {
    const sessionProgram = Effect.tryPromise(() => {
      return ctx.db
        .query("sessions")
        .withIndex("by_token", (q) => q.eq("token", args.token))
        .first();
    });

    const session = await Effect.runPromise(sessionProgram);

    if (!session) throw new Error("Invalid token");

    const program = Effect.tryPromise(() => {
      return ctx.db.insert("todos", {
        text: args.text,
        completed: false,
        userId: session.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    return Effect.runPromise(program);

    // await ctx.db.insert("todos", {
    //   text: args.text,
    //   completed: false,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // });
  },
});

export const toggle = mutation({
  args: {
    id: v.id("todos"),
    completed: v.boolean(),
  },
  handler: async (ctx, args) => {
    const program = Effect.tryPromise(() => {
      return ctx.db.patch(args.id, {
        completed: args.completed,
        updatedAt: new Date().toISOString(),
      });
    });

    return Effect.runPromise(program);

    // await ctx.db.patch(args.id, {
    //   completed: args.completed,
    //   updatedAt: new Date().toISOString(),
    // });
  },
});
