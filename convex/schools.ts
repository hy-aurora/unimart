import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new school
export const add = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    logoUrl: v.string(),
    bannerUrl: v.string(),
    description: v.string(),
    location: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const schoolId = await ctx.db.insert("schools", args);
    return schoolId;
  },
});

// Mutation to update an existing school
export const update = mutation({
  args: {
    schoolId: v.id("schools"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    bannerUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const { schoolId, ...updates } = args;
    await ctx.db.patch(schoolId, updates);
    return { success: true };
  },
});

// Mutation to remove a school
export const remove = mutation({
  args: {
    schoolId: v.id("schools"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.delete(args.schoolId);
    return { success: true };
  },
});

// Query to get all schools
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("schools")
      .withIndex("by_createdAt") // ✅ Sort schools by creation date
      .order("desc") // ✅ Order by newest first
      .collect();
  },
});

// Query to get a school by ID
export const getById = query({
  args: {
    schoolId: v.id("schools"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.schoolId);
  },
});

// Query to get schools for the catalog
export const getForCatalog = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("schools")
      .withIndex("by_createdAt") // Sort schools by creation date
      .order("desc") // Order by newest first
      .collect();
  },
});
