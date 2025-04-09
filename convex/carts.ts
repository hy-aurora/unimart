import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// In-memory cache for non-logged-in users
const guestCartCache = new Map();

// Mutation to add an item to the cart or guest cache
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
    guestId: v.optional(v.string()), // For guest users
  },
  handler: async (ctx, args) => {
    if (args.guestId) {
      // Handle guest user
      const guestCart = guestCartCache.get(args.guestId) || [];
      guestCart.push(args);
      guestCartCache.set(args.guestId, guestCart);
      return { success: true, guestCart };
    }

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

// Mutation to remove an item robustly
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
  },
});

// Mutation to merge guest cart into user cart upon login
export const mergeGuestCart = mutation({
  args: {
    guestId: v.string(),
  },
  handler: async (ctx, args) => {
    const guestCart = guestCartCache.get(args.guestId) || [];
    guestCartCache.delete(args.guestId);

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
        items: guestCart,
        updatedAt: Date.now(),
      });
    } else {
      const updatedItems = [...cart.items, ...guestCart];
      await ctx.db.patch(cart._id, {
        items: updatedItems,
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Query to get the cart or guest cache
export const getCart = query({
  args: {
    guestId: v.optional(v.string()), // For guest users
  },
  handler: async (ctx, args) => {
    if (args.guestId) {
      // Handle guest user
      const guestCart = guestCartCache.get(args.guestId) || [];
      return { items: guestCart };
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { items: [] }; // Return empty cart for non-logged-in users
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
      return { items: [] };
    }

    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          name: product?.name || "Unknown Product",
          price: product?.price || 0,
          image: product?.imageUrls?.[0] || "/images/placeholder.webp",
        };
      })
    );

    return { items: detailedItems };
  },
});
