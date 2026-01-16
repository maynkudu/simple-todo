import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    createdAt: v.string(),
  }).index("by_username", ["username"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    createdAt: v.string(),
  }).index("by_token", ["token"]),

  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    userId: v.id("users"),
    createdAt: v.string(),
    updatedAt: v.string(),
  }),
});
