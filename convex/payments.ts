import { v, ConvexError } from "convex/values";
import { mutation } from "./_generated/server";

// Mutation to create a new payment
export const create = mutation({
  args: {
    orderId: v.id("orders"),
    razorpayPaymentId: v.string(),
    razorpayOrderId: v.string(),
    amount: v.number(),
    status: v.union(v.literal("success"), v.literal("failed")),
    paidAt: v.number(),
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

    const paymentId = await ctx.db.insert("payments", args);
    return paymentId;
  },
});

// Mutation to update payment status
export const updateStatus = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.union(v.literal("success"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const payment = await ctx.db.get(args.paymentId);
    if (!payment) {
      throw new ConvexError("Payment not found");
    }

    await ctx.db.patch(args.paymentId, { status: args.status });
    return { success: true };
  },
});
