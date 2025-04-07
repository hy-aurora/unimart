import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new user notification
export const add = mutation({
  args: {
    userId: v.id("users"),
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
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("User not found");
    }

    const notificationId = await ctx.db.insert("user_notifications", {
      userId: args.userId,
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
    notificationId: v.id("user_notifications"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const notification = await ctx.db.get(args.notificationId);
    if (!notification) {
      throw new ConvexError("Notification not found");
    }

    await ctx.db.patch(args.notificationId, { isRead: true });
    return { success: true };
  },
});

// Query to get all notifications for a specific user
export const getByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const notifications = await ctx.db
      .query("user_notifications")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return notifications;
  },
});
