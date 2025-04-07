import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add an inventory log
export const addInventoryLog = mutation({
  args: {
    productId: v.id("products"),
    change: v.number(),
    reason: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new ConvexError("Product not found");
    }

    const logId = await ctx.db.insert("inventory_logs", args);
    return logId;
  },
});

// Query to get inventory logs for a specific product
export const getInventoryLogsByProduct = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("inventory_logs")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .collect();

    return logs;
  },
});
