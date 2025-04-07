import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

// Mutation to update user data by Clerk ID
export const update = mutation({
  args: {
    username: v.string(), // Username of the new user
    password: v.string(), // Password for the new user (should be hashed before storing)
    email: v.string(), // Email address of the new user
    name: v.string(), // Full name of the new user
    imageUrl: v.string(), // URL of the user's profile image
    clerkId: v.string(), // Unique identifier from Clerk authentication
    role: v.union(v.literal("user"), v.literal("admin")), // Role of the user (either "user" or "admin")
    phone: v.string(), // Phone number of the new user
    address: v.string(), // Address of the new user
  },
  handler: async (ctx, args) => {
    // Get the user identity from the auth context
    const identity = await ctx.auth.getUserIdentity();

    // If no identity is found, throw an unauthorized error
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    // Query the "users" table using the "by_clerkId" index to find the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    // Check if the user is null
    if (!user) {
      throw new ConvexError("User not found in the database");
    }

    // Filter out undefined fields from the update arguments
    const updatedFields = Object.fromEntries(
      Object.entries(args).filter(([_, value]) => value !== undefined)
    );

    // Use the `patch` method to update the user record
    await ctx.db.patch(user._id, updatedFields);

    // Return the updated user data
    return { ...user, ...updatedFields };
  },
});

// Query to get user data by Clerk ID
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    // If no identity is found, return null instead of throwing an error
    if (!identity) {
      return null;
    }

    // Fetch the user details from the database using Clerk ID
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    // If the user is not found, return null
    if (!currentUser) {
      return null;
    }

    const user = await ctx.db.get(currentUser._id);

    if (!user) {
      return null;
    }

    // Return only the fields you want
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      clerkId: user.clerkId,
      role: user.role,
      phone: user.phone,
      address: user.address,
      // Add any other fields you want to return
    };
  },
});
