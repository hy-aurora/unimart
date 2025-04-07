import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Define the "users" table to store user information
  users: defineTable({
    username: v.string(),  // Username of the user
    email: v.string(),     // Email address of the user
    imageUrl: v.string(),  // URL of the user's profile image
    clerkId: v.string(),   // Unique ID from Clerk authentication
    password: v.string(),  // Hashed password (typically hashed)
    name: v.string(),       // Full name of the user
    role: v.union(v.literal("admin"), v.literal("user")), // Role of the user (admin or user)
    phone: v.string(),     // Phone number of the user
    address: v.string(), // Address of the user
  })
  .index("by_username", ["username"])
  .index("by_clerkId", ["clerkId"])
  .index("by_email", ["email"]),

});