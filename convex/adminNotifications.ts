import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all admin notifications
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // Get the user identity
    const identity = await ctx.auth.getUserIdentity();
    
    // If no identity, return an empty array instead of throwing an error
    if (!identity) {
      return [];
    }

    // Check if the user is an admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    // If not an admin, return an empty array
    if (!user || user.role !== "admin") {
      return [];
    }

    // Get notifications sorted by creation date (newest first)
    const notifications = await ctx.db
      .query("admin_notifications")
      .order("desc")
      .collect();

    return notifications;
  },
});

// Mutation to create a new admin notification
export const create = mutation({
  args: {
    message: v.string(),
    type: v.union(
      v.literal("info"),
      v.literal("warning"),
      v.literal("success"),
      v.literal("error")
    ),
    link: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.subject) {
      throw new ConvexError("Unauthorized: Missing or invalid identity");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    const notificationId = await ctx.db.insert("admin_notifications", {
      message: args.message,
      type: args.type,
      isRead: false,
      createdAt: Date.now(),
      link: args.link,
    });

    return notificationId;
  },
});

// Mutation to mark a notification as read
export const markAsRead = mutation({
  args: {
    notificationId: v.id("admin_notifications"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.subject) {
      throw new ConvexError("Unauthorized: Missing or invalid identity");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.notificationId, { isRead: true });
    return { success: true };
  },
});

// Mutation to mark all notifications as read
export const markAllAsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.subject) {
      throw new ConvexError("Unauthorized: Missing or invalid identity");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    const unreadNotifications = await ctx.db
      .query("admin_notifications")
      .filter((q) => q.eq(q.field("isRead"), false))
      .collect();

    for (const notification of unreadNotifications) {
      await ctx.db.patch(notification._id, { isRead: true });
    }

    return { success: true };
  },
});

// Mutation to delete a notification
export const remove = mutation({
  args: {
    notificationId: v.id("admin_notifications"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.subject) {
      throw new ConvexError("Unauthorized: Missing or invalid identity");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    await ctx.db.delete(args.notificationId);
    return { success: true };
  },
});
