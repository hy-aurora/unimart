import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to create a new order
export const create = mutation({
  args: {
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        quantity: v.number(),
        price: v.number(),
        size: v.optional(v.string()),
        customSize: v.optional(
          v.object({
            chest: v.optional(v.number()),
            waist: v.optional(v.number()),
            height: v.optional(v.number()),
            notes: v.optional(v.string()),
          })
        ),
      })
    ),
    totalAmount: v.number(),
    shippingAddress: v.string(),
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

    const orderId = await ctx.db.insert("orders", {
      userId: user._id,
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending",
      shippingAddress: args.shippingAddress,
      createdAt: Date.now(),
    });

    return orderId;
  },
});

// Mutation to update the status of an order
export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new ConvexError("Order not found");
    }

    await ctx.db.patch(args.orderId, { status: args.status });
    return { success: true };
  },
});

// Query to get all orders for the current user
export const getUserOrders = query({
  args: {},
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

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    return orders;
  },
});

// Query to get all orders
export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    return orders;
  },
});