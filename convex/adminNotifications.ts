import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new admin notification
export const add = mutation({
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
    if (!identity) {
      throw new ConvexError("Unauthorized");
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

// Mutation to mark an admin notification as read
export const markAsRead = mutation({
  args: {
    notificationId: v.id("admin_notifications"),
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

// Query to get all admin notifications
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const notifications = await ctx.db.query("admin_notifications").collect();
    return notifications;
  },
});
