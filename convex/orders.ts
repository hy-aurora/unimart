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

// Query to get all orders with pagination and filtering for admin
export const getAllOrders = query({
  args: {
    status: v.optional(v.union(
      v.literal("all"),
      v.literal("pending"),
      v.literal("paid"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    )),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Verify admin access
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Set defaults
    const page = args.page || 0;
    const limit = args.limit || 10;
    const skip = page * limit;

    let ordersQuery = ctx.db.query("orders");

    // Apply status filter if provided and not "all"
    if (args.status && args.status !== "all") {
      ordersQuery = ordersQuery.filter(q => q.eq(q.field("status"), args.status));
    }

    // Sort by creation date (newest first) and apply pagination
    const orders = await ordersQuery
      .order("desc")
      .collect();

    // Manual pagination since Convex doesn't have direct skip/limit
    const paginatedOrders = orders.slice(skip, skip + limit);

    // Enhance orders with user information
    const enhancedOrders = await Promise.all(paginatedOrders.map(async (order) => {
      const orderUser = await ctx.db.get(order.userId);
      return {
        ...order,
        userName: orderUser?.name || "Unknown User",
        userEmail: orderUser?.email || "Unknown Email"
      };
    }));

    // Return orders and total count for pagination
    return {
      orders: enhancedOrders,
      totalCount: orders.length,
      totalPages: Math.ceil(orders.length / limit)
    };
  },
});

// Get a single order by ID with full details
export const getOrderById = query({
  args: {
    orderId: v.id("orders")
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

    const orderUser = await ctx.db.get(order.userId);
    
    // Enrich items with current product info
    const enrichedItems = await Promise.all(order.items.map(async (item) => {
      const product = await ctx.db.get(item.productId);
      return {
        ...item,
        currentStock: product?.stock || 0,
        currentPrice: product?.price || item.price,
      };
    }));

    return {
      ...order,
      items: enrichedItems,
      user: orderUser ? {
        name: orderUser.name,
        email: orderUser.email,
        phone: orderUser.phone
      } : null
    };
  }
});