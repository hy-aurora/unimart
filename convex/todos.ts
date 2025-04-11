import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Mutation to add a new todo
export const add = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db.get(args.createdBy);
    if (!user) {
      throw new ConvexError("User not found");
    }

    const todoId = await ctx.db.insert("admin_todos", {
      title: args.title,
      description: args.description,
      isCompleted: false,
      createdBy: args.createdBy,
    });

    return todoId;
  },
});

// Mutation to update a todo
export const update = mutation({
  args: {
    todoId: v.id("admin_todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const todo = await ctx.db.get(args.todoId);
    if (!todo) {
      throw new ConvexError("Todo not found");
    }

    const updates = Object.fromEntries(
      Object.entries(args).filter(
        ([key, value]) => key !== "todoId" && value !== undefined
      )
    );

    await ctx.db.patch(args.todoId, updates);
    return { success: true };
  },
});

// Mutation to remove a todo
export const remove = mutation({
  args: {
    todoId: v.id("admin_todos"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const todo = await ctx.db.get(args.todoId);
    if (!todo) {
      throw new ConvexError("Todo not found");
    }

    // Check if the user is an admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Delete the todo
    await ctx.db.delete(args.todoId);
    
    // Log the activity
    await ctx.db.insert("admin_notifications", {
      message: `Todo "${todo.title}" has been deleted`,
      type: "info", 
      isRead: false,
      createdAt: Date.now(),
    });
    
    return { success: true };
  },
});

// Query to get all todos for a specific user
export const getTodosByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const todos = await ctx.db
      .query("admin_todos")
      .withIndex("by_creator", (q) => q.eq("createdBy", args.userId))
      .collect();

    return todos;
  },
});
