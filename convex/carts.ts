import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add an item to the cart
export const addItem = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
    size: v.optional(v.string()),
    customSize: v.optional(
      v.object({
        chest: v.optional(v.number()),
        waist: v.optional(v.number()),
        height: v.optional(v.number()),
        notes: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      await ctx.db.insert("carts", {
        userId: user._id,
        items: [args],
        updatedAt: Date.now(),
      });
    } else {
      const updatedItems = [...cart.items, args];
      await ctx.db.patch(cart._id, {
        items: updatedItems,
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Mutation to update an item in the cart
export const updateItem = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.optional(v.number()),
    size: v.optional(v.string()),
    customSize: v.optional(
      v.object({
        chest: v.optional(v.number()),
        waist: v.optional(v.number()),
        height: v.optional(v.number()),
        notes: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      throw new ConvexError("Cart not found");
    }

    const updatedItems = cart.items.map((item) =>
      item.productId === args.productId ? { ...item, ...args } : item
    );

    await ctx.db.patch(cart._id, {
      items: updatedItems,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Mutation to remove an item from the cart
export const removeItem = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      throw new ConvexError("Cart not found");
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId !== args.productId
    );

    await ctx.db.patch(cart._id, {
      items: updatedItems,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Mutation to clear the cart
export const clearCart = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      throw new ConvexError("Cart not found");
    }

    await ctx.db.patch(cart._id, {
      items: [],
      updatedAt: Date.now(),
    });

    return { success: true };
  }
});

// Query to get the cart for a user
export const getCart = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    return cart || { items: [] };
  }
});