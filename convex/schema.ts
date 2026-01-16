import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  }),
});
