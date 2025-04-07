import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new admin query
export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    subject: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const queryId = await ctx.db.insert("admin_queries", {
      ...args,
      createdAt: Date.now(),
    });

    return queryId;
  },
});

// Query to get all admin queries
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const queries = await ctx.db.query("admin_queries").collect();
    return queries;
  },
});
