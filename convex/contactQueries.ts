import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
// Mutation to add a new admin query
export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    subject: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const queryId = await ctx.db.insert("admin_queries", {
      ...args,
      createdAt: Date.now(),
    });

    return queryId;
  },
});

// Mutation to book a sizing appointment
export const bookSizingAppointment = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    school: v.id("schools"), // Changed from string to ID reference
  },
  handler: async (ctx, args) => {
    // Get school info for the notification
    const school = await ctx.db.get(args.school);
    const schoolName = school ? school.name : "Unknown School";

    // Create the appointment
    const appointmentId = await ctx.db.insert("sizing_appointments", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });

    // Create an admin notification
    await ctx.runMutation(api.adminNotifications.create, {
      message: `New sizing appointment requested by ${args.name} for ${schoolName}`,
      type: "info",
      link: "/admin/sizing-appointments",
    });

    return appointmentId;
  },
});

// Query to get all sizing appointments
export const getAllSizingAppointments = query({
  args: {
    status: v.optional(v.union(
      v.literal("all"),
      v.literal("pending"),
      v.literal("cancelled"),
      v.literal("confirmed"),
      v.literal("completed")
    )),
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

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    let appointmentsQuery;
    
    // Filter by status if provided
    if (args.status && args.status !== "all") {
      // Type assertion to tell TypeScript this is a valid status value
      const validStatus = args.status as "pending" | "cancelled" | "confirmed" | "completed";
      appointmentsQuery = ctx.db.query("sizing_appointments")
        .withIndex("by_status", q => q.eq("status", validStatus));
    } else {
      appointmentsQuery = ctx.db.query("sizing_appointments");
    }
    
    // Sort by creation date (newest first)
    return await appointmentsQuery.order("desc").collect();
  },
});

// Mutation to update a sizing appointment status and respond
export const respondToSizingAppointment = mutation({
  args: {
    appointmentId: v.id("sizing_appointments"),
    status: v.union(
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    adminResponse: v.string(),
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

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Update the appointment
    await ctx.db.patch(args.appointmentId, {
      status: args.status,
      adminResponse: args.adminResponse
    });

    return { success: true };
  },
});

// Query to get all admin queries
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const queries = await ctx.db.query("admin_queries").collect();
    return queries;
  },
});

// Mutation to respond to a contact query
export const respondToContactQuery = mutation({
  args: {
    queryId: v.id("admin_queries"),
    response: v.string(),
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

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Get the query to respond to
    const query = await ctx.db.get(args.queryId);
    if (!query) {
      throw new ConvexError("Contact query not found");
    }

    // In a real application, you would send an email here
    // For now, we'll just mark it as responded
    await ctx.db.patch(args.queryId, {
      responded: true,
      responseText: args.response,
      respondedAt: Date.now(),
    });

    // Create a notification about the response
    await ctx.db.insert("admin_notifications", {
      message: `Responded to contact query from ${query.name}`,
      type: "success",
      isRead: false,
      createdAt: Date.now(),
    });

    return { success: true };
  },
});
