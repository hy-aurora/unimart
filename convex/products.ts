import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new product
export const add = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageUrls: v.array(v.string()),
    sizes: v.array(v.string()),
    gender: v.union(v.literal("boy"), v.literal("girl"), v.literal("unisex")),
    classLevel: v.string(),
    schoolId: v.id("schools"),
    stock: v.number(),
    allowCustomSize: v.boolean(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const productId = await ctx.db.insert("products", args);
    return productId;
  },
});

// Mutation to modify an existing product
export const modify = mutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    imageUrls: v.optional(v.array(v.string())),
    sizes: v.optional(v.array(v.string())),
    gender: v.optional(
      v.union(v.literal("boy"), v.literal("girl"), v.literal("unisex"))
    ),
    classLevel: v.optional(v.string()),
    stock: v.optional(v.number()),
    allowCustomSize: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const { productId, ...updates } = args;
    await ctx.db.patch(productId, updates);
    return { success: true };
  },
});

// Mutation to remove a product
export const remove = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.delete(args.productId);
    return { success: true };
  },
});

// Query to get all products
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});
