import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

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
    featured: v.optional(v.boolean()), // Add featured field to args
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const schoolId = await ctx.db.insert("schools", args);

    // Create an admin notification
    await ctx.runMutation(api.adminNotifications.create, {
      message: `New school added: ${args.name}${args.featured ? " (Featured)" : ""}`,
      type: "info",
    });

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
    featured: v.optional(v.boolean()), // Add featured field to args
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const { schoolId, ...updates } = args;
    
    // If featured status is changing, create a notification
    if (updates.featured !== undefined) {
      const school = await ctx.db.get(schoolId);
      if (school && school.featured !== updates.featured) {
        await ctx.db.insert("admin_notifications", {
          message: `School "${school.name}" has been ${updates.featured ? "featured" : "unfeatured"}`,
          type: "info",
          isRead: false,
          createdAt: Date.now(),
        });
      }
    }
    
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

    // Check if the user is an admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Check if there are products associated with this school
    const associatedProducts = await ctx.db
      .query("products")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    if (associatedProducts.length > 0) {
      throw new ConvexError(
        `Cannot delete school with ${associatedProducts.length} associated products. Please remove or reassign these products first.`
      );
    }

    // Get school details for notification
    const school = await ctx.db.get(args.schoolId);
    
    // Delete the school
    await ctx.db.delete(args.schoolId);
    
    // Create notification for admins
    await ctx.db.insert("admin_notifications", {
      message: `School "${school?.name}" has been deleted`,
      type: "info",
      isRead: false,
      createdAt: Date.now(),
    });

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
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

// Query to get a school with its products
export const getWithProducts = query({
  args: {
    schoolId: v.id("schools"),
  },
  handler: async (ctx, args) => {
    const school = await ctx.db.get(args.schoolId);
    if (!school) {
      throw new ConvexError("School not found");
    }

    const products = await ctx.db
      .query("products")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    return { ...school, products };
  },
});

// Query to get a school ID by name
export const getIdByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const school = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (!school) {
      throw new ConvexError("School not found");
    }
    return school._id;
  },
});

// Query to get featured schools for the home page
export const getFeaturedSchools = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;
    
    // First try to get schools marked as featured
    let schools = await ctx.db
      .query("schools")
      .filter(q => q.eq(q.field("featured"), true))
      .take(limit);
    
    // If not enough featured schools, fill with other schools
    if (schools.length < limit) {
      const additionalSchools = await ctx.db
        .query("schools")
        .order("desc")
        .filter(q => q.neq(q.field("featured"), true)) // Get non-featured schools
        .take(limit - schools.length);
      
      schools = [...schools, ...additionalSchools];
    }
    
    return schools;
  },
});

// Query to search schools by name or location
export const searchSchools = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    let schools;
    
    if (args.query.trim() === '') {
      // If no query provided, return all schools
      schools = await ctx.db.query("schools").collect();
    } else {
      // Search by name or location (simple contains search)
      // Note: In a real app, you might want to use a more sophisticated search mechanism
      const allSchools = await ctx.db.query("schools").collect();
      const lowerQuery = args.query.toLowerCase();
      
      schools = allSchools.filter(school => 
        school.name.toLowerCase().includes(lowerQuery) ||
        (school.location && school.location.toLowerCase().includes(lowerQuery))
      );
    }
    
    return schools;
  },
});

// Get a single school by ID
export const getSchool = query({
  args: {
    id: v.id("schools"),
  },
  handler: async (ctx, args) => {
    const school = await ctx.db.get(args.id);
    return school;
  },
});
