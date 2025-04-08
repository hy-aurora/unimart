import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users Table
  users: defineTable({
    username: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    phone: v.string(),
    address: v.string(),
  })
    .index("by_username", ["username"])
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  // Schools Table
  schools: defineTable({
    name: v.string(),
    slug: v.string(),
    logoUrl: v.string(),
    bannerUrl: v.string(),
    description: v.string(),
    location: v.string(),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_name", ["name"])
    .index("by_createdAt", ["createdAt"]),

  // Products Table
  products: defineTable({
    id: v.string(),
    name: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    imageUrls: v.array(v.string()),
    rating: v.optional(v.number()),
    ratingCount: v.optional(v.number()),
    inStock: v.optional(v.boolean()),
    isNew: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isSale: v.optional(v.boolean()),
    category: v.optional(v.string()),
    schoolId: v.id("schools"),
    description: v.string(),
    sizes: v.array(v.string()),
    gender: v.union(v.literal("boy"), v.literal("girl"), v.literal("unisex")),
    classLevel: v.string(),
    stock: v.number(),
    allowCustomSize: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_schoolId", ["schoolId"])
    .index("by_price", ["price"])
    .index("by_createdAt", ["createdAt"]),

  // Cart Table
  carts: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
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
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  // Orders Table
  orders: defineTable({
    userId: v.id("users"),
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
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    shippingAddress: v.string(),
    paymentId: v.optional(v.id("payments")),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  // Payments Table
  payments: defineTable({
    orderId: v.id("orders"),
    razorpayPaymentId: v.string(),
    razorpayOrderId: v.string(),
    status: v.union(v.literal("success"), v.literal("failed")),
    amount: v.number(),
    paidAt: v.number(),
  }).index("by_orderId", ["orderId"]),

  // Reviews Table
  reviews: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    rating: v.number(),
    comment: v.string(),
    createdAt: v.number(),
  }).index("by_productId", ["productId"]),

  // Coupons Table
  coupons: defineTable({
    code: v.string(),
    discountPercentage: v.number(),
    isActive: v.boolean(),
    expiresAt: v.number(),
    usageLimit: v.optional(v.number()),
  }).index("by_code", ["code"]),

  // Inventory Logs Table
  inventory_logs: defineTable({
    productId: v.id("products"),
    change: v.number(),
    reason: v.string(),
    createdAt: v.number(),
  }).index("by_productId", ["productId"]),

  // Insights Table
  insights: defineTable({
    metric: v.string(),
    value: v.number(),
    timestamp: v.number(),
  }).index("by_metric", ["metric"]),

  // ✅ Admin Todos Table
  admin_todos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    isCompleted: v.boolean(),
    createdBy: v.id("users"),
  }).index("by_creator", ["createdBy"]),

  // ✅ Admin Notifications Table
  admin_notifications: defineTable({
    message: v.string(),
    type: v.union(
      v.literal("info"),
      v.literal("warning"),
      v.literal("success"),
      v.literal("error")
    ),
    isRead: v.boolean(),
    createdAt: v.number(),
    link: v.optional(v.string()),
  }),

  // ✅ User Notifications Table
  user_notifications: defineTable({
    userId: v.id("users"),
    message: v.string(),
    type: v.union(
      v.literal("info"),
      v.literal("warning"),
      v.literal("success"),
      v.literal("error")
    ),
    isRead: v.boolean(),
    createdAt: v.number(),
    link: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  // ✅ Admin Queries Table (Contact Form)
  admin_queries: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    subject: v.optional(v.string()),
    phone: v.optional(v.string()),
    createdAt: v.number(),
  }),

  // Categories Table
  categories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_name", ["name"]),
});
