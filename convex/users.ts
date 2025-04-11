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

// Mutation to update user status (active/disabled)
export const updateStatus = mutation({
  args: {
    userId: v.id("users"),
    isActive: v.boolean()
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    // Ensure current user is an admin
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
    
    if (!currentUser || currentUser.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Get the target user
    const targetUser = await ctx.db.get(args.userId);
    if (!targetUser) {
      throw new ConvexError("User not found");
    }

    // Check if trying to modify an admin account
    if (targetUser.role === "admin") {
      throw new ConvexError("Cannot modify admin accounts");
    }

    // Update user status
    await ctx.db.patch(args.userId, { isActive: args.isActive });
    
    return { success: true };
  }
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

// Add this new function to get all users (for admin)
export const getAllUsers = query({
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

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Get all users
    const allUsers = await ctx.db.query("users").collect();
    
    return allUsers;
  },
});

// Add new mutation for managing user addresses
export const addAddress = mutation({
  args: {
    name: v.string(),
    line1: v.string(),
    line2: v.optional(v.string()),
    city: v.string(),
    postalCode: v.string(),
    country: v.string(),
    isDefault: v.boolean(),
    type: v.string(),
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

    // Ensure addresses is an array
    const currentAddresses = Array.isArray(user.address) ? user.address : [];

    // If this is the first address or marked as default, update all others
    const updatedAddresses = args.isDefault
      ? currentAddresses.map((addr: any) => ({ ...addr, isDefault: false }))
      : [...currentAddresses];

    // Add new address with unique ID
    const newAddress = {
      ...args,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: Date.now(),
    };

    updatedAddresses.push(newAddress);

    // Update user with new addresses
    await ctx.db.patch(user._id, { address: JSON.stringify(updatedAddresses) });

    return newAddress;
  },
});

export const updateAddress = mutation({
  args: {
    addressId: v.string(),
    name: v.optional(v.string()),
    line1: v.optional(v.string()),
    line2: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    country: v.optional(v.string()),
    isDefault: v.optional(v.boolean()),
    type: v.optional(v.string()),
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

    const { addressId, ...updates } = args;
    const currentAddresses = Array.isArray(user.address) ? user.address : [];

    // Find the address to update
    const addressIndex = currentAddresses.findIndex((addr) => addr.id === addressId);
    if (addressIndex === -1) {
      throw new ConvexError("Address not found");
    }

    // Update the address
    const updatedAddresses = [...currentAddresses];
    updatedAddresses[addressIndex] = { ...updatedAddresses[addressIndex], ...updates };

    // Handle default status if needed
    if (updates.isDefault) {
      updatedAddresses.forEach((addr, i) => {
        if (i !== addressIndex) {
          addr.isDefault = false;
        }
      });
    }

    // Update user with modified addresses
    await ctx.db.patch(user._id, { address: JSON.stringify(updatedAddresses) });

    return updatedAddresses[addressIndex];
  },
});

// Delete an address
export const deleteAddress = mutation({
  args: {
    addressId: v.string(),
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

    const currentAddresses = typeof user.address === "string" ? JSON.parse(user.address) : user.address || [];
    
    // Filter out the address to remove
    const updatedAddresses = currentAddresses.filter((addr: { id: string; }) => addr.id !== args.addressId);
    
    // Make sure there's always a default if any addresses remain
    if (updatedAddresses.length > 0 && !updatedAddresses.some((addr: { isDefault: any; }) => addr.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }

    // Update user with new addresses list
    await ctx.db.patch(user._id, { address: JSON.stringify(updatedAddresses) });

    return { success: true };
  }
});

// Update user profile (simplified version)
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized: You must be logged in");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Update user with provided fields
    await ctx.db.patch(user._id, { ...args });

    // Add a notification for the user
    await ctx.db.insert("user_notifications", {
      userId: user._id,
      message: "Your profile has been updated successfully",
      type: "success",
      isRead: false,
      createdAt: Date.now(),
      link: "/profile",
    });

    return { success: true, ...args };
  }
});

// Get user orders
export const getUserOrders = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return [];
    }

    // Query orders for this user
    let ordersQuery = ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", user._id));

    // Filter by status if provided
    if (args.status && args.status !== "all") {
      ordersQuery = ordersQuery.filter(q => q.eq(q.field("status"), args.status));
    }

    // Sort by creation date (newest first)
    const orders = await ordersQuery
      .order("desc")
      .collect();
    
    // Enhance order details with product info
    const enhancedOrders = await Promise.all(
      orders.map(async (order) => {
        // Make sure items exists and is an array
        const items = Array.isArray(order.items) ? order.items : [];
        
        const enhancedItems = await Promise.all(
          items.map(async (item) => {
            try {
              const product = await ctx.db.get(item.productId);
              return {
                ...item,
                name: product?.name || item.name || "Unknown Product",
                image: product?.imageUrls?.[0] || "/placeholder.svg",
              };
            } catch (error) {
              console.error("Error fetching product:", error);
              return {
                ...item,
                name: item.name || "Unknown Product",
                image: "/placeholder.svg",
              };
            }
          })
        );
        
        return {
          ...order,
          items: enhancedItems,
        };
      })
    );

    return enhancedOrders;
  }
});
