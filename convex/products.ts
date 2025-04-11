import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new product
export const add = mutation({
  args: {
    id: v.string(),
    name: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    imageUrls: v.array(v.string()),
    rating: v.optional(v.number()),
    ratingCount: v.optional(v.number()),
    inStock: v.optional(v.boolean()),
    isNew: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isSale: v.optional(v.boolean()),
    category: v.optional(v.string()),
    description: v.string(), // Ensure this field is validated
    detailsAndCare: v.optional(v.object({
      materials: v.optional(v.string()),
      careInstructions: v.optional(v.array(v.string())),
      additionalInfo: v.optional(v.string())
    })),
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
    id: v.optional(v.string()),
    name: v.optional(v.string()),
    price: v.optional(v.number()),
    originalPrice: v.optional(v.number()),
    imageUrls: v.optional(v.array(v.string())),
    rating: v.optional(v.number()),
    ratingCount: v.optional(v.number()),
    inStock: v.optional(v.boolean()),
    isNew: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isSale: v.optional(v.boolean()),
    category: v.optional(v.string()),
    school: v.optional(v.string()),
    description: v.optional(v.string()),
    detailsAndCare: v.optional(v.object({
      materials: v.optional(v.string()),
      careInstructions: v.optional(v.array(v.string())),
      additionalInfo: v.optional(v.string())
    })),
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

    // Check if the user is an admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Get product details before deletion
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new ConvexError("Product not found");
    }

    // Check if product is in any user's cart
    const carts = await ctx.db
      .query("carts")
      .collect();
    
    let productInCart = false;
    for (const cart of carts) {
      if (cart.items.some(item => item.productId === args.productId)) {
        productInCart = true;
        break;
      }
    }

    if (productInCart) {
      // Option 1: Throw error
      // throw new ConvexError("Cannot delete product that is in users' carts");
      
      // Option 2: Remove from all carts
      for (const cart of carts) {
        const updatedItems = cart.items.filter(item => item.productId !== args.productId);
        if (updatedItems.length !== cart.items.length) {
          await ctx.db.patch(cart._id, {
            items: updatedItems,
            updatedAt: Date.now(),
          });
        }
      }
    }

    // Log inventory change before deletion
    await ctx.db.insert("inventory_logs", {
      productId: args.productId,
      change: -product.stock,
      reason: "Product deleted",
      createdAt: Date.now(),
    });

    // Delete the product
    await ctx.db.delete(args.productId);
    
    // Create notification for admins
    await ctx.db.insert("admin_notifications", {
      message: `Product "${product.name}" has been deleted`,
      type: "info",
      isRead: false,
      createdAt: Date.now(),
    });

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

// Query to get products by school ID
export const getBySchool = query({
  args: {
    schoolId: v.id("schools"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();
  },
});

// Query to get product details by ID
export const getProductById = query({
  args: {
    productId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_string_id", (q) => q.eq("id", args.productId))
      .first();
  },
});

// Query to get products grouped by schools
export const getGroupedBySchool = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const grouped = products.reduce<Record<string, typeof products>>((acc, product) => {
      const schoolId = product.schoolId.toString();
      if (!acc[schoolId]) {
        acc[schoolId] = [];
      }
      acc[schoolId].push(product);
      return acc;
    }, {});

    return grouped;
  },
});
