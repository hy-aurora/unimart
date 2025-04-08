import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new category
export const addCategory = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const categoryId = await ctx.db.insert("categories", args);
    return categoryId;
  },
});

// Mutation to update an existing category
export const updateCategory = mutation({
  args: {
    categoryId: v.id("categories"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const { categoryId, ...updates } = args;
    await ctx.db.patch(categoryId, updates);
    return { success: true };
  },
});

// Mutation to remove a category
export const removeCategory = mutation({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.delete(args.categoryId);
    return { success: true };
  },
});

// Query to get all categories
export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

// Query to get a category by ID
export const getCategoryById = query({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.categoryId);
  },
});

// Query to get all categories
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});
