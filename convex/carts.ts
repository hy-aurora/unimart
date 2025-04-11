import { v, ConvexError, GenericId } from "convex/values";
import { mutation, query } from "./_generated/server";
import { TableNamesInDataModel } from "convex/server";

// In-memory cache for non-logged-in users
const guestCartCache = new Map();

// Mutation to add an item to the cart or guest cache
export const addItem = mutation({
  args: {
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
    guestId: v.optional(v.string()), // For guest users
  },
  handler: async (ctx, args) => {
    if (args.guestId) {
      // Handle guest user
      const guestCart = guestCartCache.get(args.guestId) || [];
      guestCart.push(args);
      guestCartCache.set(args.guestId, guestCart);
      return { success: true, guestCart };
    }

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

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      await ctx.db.insert("carts", {
        userId: user._id,
        items: [args],
        updatedAt: Date.now(),
      });
    } else {
      const updatedItems = [...cart.items, args];
      await ctx.db.patch(cart._id, {
        items: updatedItems,
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Mutation to update an item in the cart
export const updateItem = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.optional(v.number()),
    size: v.optional(v.string()),
    customSize: v.optional(
      v.object({
        chest: v.optional(v.number()),
        waist: v.optional(v.number()),
        height: v.optional(v.number()),
        notes: v.optional(v.string()),
      })
    ),
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

    // Check if the product exists and has enough stock
    const product = await ctx.db.get(args.productId);
    if (!product) {
      throw new ConvexError("Product not found");
    }
    
    // Verify product stock if quantity is being updated
    if (args.quantity !== undefined) {
      if (args.quantity <= 0) {
        throw new ConvexError("Quantity must be greater than zero");
      }
      
      if (args.quantity > product.stock) {
        throw new ConvexError(`Sorry, only ${product.stock} items are available in stock`);
      }
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      throw new ConvexError("Cart not found");
    }

    const updatedItems = cart.items.map((item) =>
      item.productId === args.productId ? { ...item, ...args } : item
    );

    await ctx.db.patch(cart._id, {
      items: updatedItems,
      updatedAt: Date.now(),
    });

    // Log activity for analytics
    await ctx.db.insert("insights", {
      metric: "cart_update",
      value: 1,
      timestamp: Date.now(),
    });

    return { success: true };
  },
});

// Mutation to remove an item robustly
export const removeItem = mutation({
  args: {
    productId: v.id("products"),
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

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      throw new ConvexError("Cart not found");
    }

    const updatedItems = cart.items.filter(
      (item) => item.productId !== args.productId
    );

    await ctx.db.patch(cart._id, {
      items: updatedItems,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Mutation to clear the cart
export const clearCart = mutation({
  handler: async (ctx) => {
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

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      throw new ConvexError("Cart not found");
    }

    await ctx.db.patch(cart._id, {
      items: [],
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Mutation to merge guest cart into user cart upon login
export const mergeGuestCart = mutation({
  args: {
    guestId: v.string(),
  },
  handler: async (ctx, args) => {
    const guestCart = guestCartCache.get(args.guestId) || [];
    guestCartCache.delete(args.guestId);

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

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      await ctx.db.insert("carts", {
        userId: user._id,
        items: guestCart,
        updatedAt: Date.now(),
      });
    } else {
      const updatedItems = [...cart.items, ...guestCart];
      await ctx.db.patch(cart._id, {
        items: updatedItems,
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});

// Query to get the cart or guest cache
export const getCart = query({
  args: {
    guestId: v.optional(v.string()), // For guest users
  },
  handler: async (ctx, args) => {
    if (args.guestId) {
      // Handle guest user
      const guestCart = guestCartCache.get(args.guestId) || [];
      
      // Enhance guest cart items with product details
      const detailedItems = await Promise.all(
        guestCart.map(async (item: { productId: GenericId<TableNamesInDataModel<{ users: { document: { _id: GenericId<"users">; _creationTime: number; username: string; email: string; imageUrl: string; clerkId: string; password: string; name: string; role: "admin" | "user"; phone: string; isActive: boolean; address: string; }; fieldPaths: ("username" | "email" | "imageUrl" | "clerkId" | "password" | "name" | "role" | "phone" | "isActive" | "address" | "_creationTime") | "_id"; indexes: { by_username: ["username", "_creationTime"]; by_clerkId: ["clerkId", "_creationTime"]; by_email: ["email", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; schools: { document: { _id: GenericId<"schools">; _creationTime: number; name: string; slug: string; logoUrl: string; bannerUrl: string; description: string; location: string; createdAt: number; }; fieldPaths: ("name" | "_creationTime" | "slug" | "logoUrl" | "bannerUrl" | "description" | "location" | "createdAt") | "_id"; indexes: { by_slug: ["slug", "_creationTime"]; by_name: ["name", "_creationTime"]; by_createdAt: ["createdAt", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; products: { document: { _id: GenericId<"products">; _creationTime: number; originalPrice?: number | undefined; rating?: number | undefined; ratingCount?: number | undefined; inStock?: boolean | undefined; isNew?: boolean | undefined; isFeatured?: boolean | undefined; isSale?: boolean | undefined; category?: string | undefined; detailsAndCare?: { materials?: string | undefined; careInstructions?: string[] | undefined; additionalInfo?: string | undefined; } | undefined; id: string; name: string; description: string; createdAt: number; price: number; imageUrls: string[]; schoolId: GenericId<"schools">; sizes: string[]; gender: "boy" | "girl" | "unisex"; classLevel: string; stock: number; allowCustomSize: boolean; }; fieldPaths: ("id" | "name" | "_creationTime" | "description" | "createdAt" | "price" | "originalPrice" | "imageUrls" | "rating" | "ratingCount" | "inStock" | "isNew" | "isFeatured" | "isSale" | "category" | "schoolId" | "detailsAndCare" | "sizes" | "gender" | "classLevel" | "stock" | "allowCustomSize" | "detailsAndCare.materials" | "detailsAndCare.careInstructions" | "detailsAndCare.additionalInfo") | "_id"; indexes: { by_schoolId: ["schoolId", "_creationTime"]; by_price: ["price", "_creationTime"]; by_createdAt: ["createdAt", "_creationTime"]; by_string_id: ["id", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; carts: { document: { _id: GenericId<"carts">; _creationTime: number; userId: GenericId<"users">; items: { size?: string | undefined; customSize?: { chest?: number | undefined; waist?: number | undefined; height?: number | undefined; notes?: string | undefined; } | undefined; productId: GenericId<"products">; quantity: number; }[]; updatedAt: number; }; fieldPaths: ("_creationTime" | "userId" | "items" | "updatedAt") | "_id"; indexes: { by_userId: ["userId", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; payments: { document: { _id: GenericId<"payments">; _creationTime: number; status: "success" | "failed"; orderId: GenericId<"orders">; razorpayPaymentId: string; razorpayOrderId: string; amount: number; paidAt: number; }; fieldPaths: ("_creationTime" | "status" | "orderId" | "razorpayPaymentId" | "razorpayOrderId" | "amount" | "paidAt") | "_id"; indexes: { by_orderId: ["orderId", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; orders: { document: { _id: GenericId<"orders">; _creationTime: number; paymentId?: GenericId<"payments"> | undefined; createdAt: number; userId: GenericId<"users">; items: { size?: string | undefined; customSize?: { chest?: number | undefined; waist?: number | undefined; height?: number | undefined; notes?: string | undefined; } | undefined; name: string; price: number; productId: GenericId<"products">; quantity: number; }[]; totalAmount: number; status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"; shippingAddress: string; }; fieldPaths: ("_creationTime" | "createdAt" | "userId" | "items" | "totalAmount" | "status" | "shippingAddress" | "paymentId") | "_id"; indexes: { by_userId: ["userId", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; reviews: { document: { _id: GenericId<"reviews">; _creationTime: number; createdAt: number; rating: number; userId: GenericId<"users">; productId: GenericId<"products">; comment: string; }; fieldPaths: ("_creationTime" | "createdAt" | "rating" | "userId" | "productId" | "comment") | "_id"; indexes: { by_productId: ["productId", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; coupons: { document: { _id: GenericId<"coupons">; _creationTime: number; usageLimit?: number | undefined; isActive: boolean; code: string; discountPercentage: number; expiresAt: number; }; fieldPaths: ("isActive" | "_creationTime" | "code" | "discountPercentage" | "expiresAt" | "usageLimit") | "_id"; indexes: { by_code: ["code", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; inventory_logs: { document: { _id: GenericId<"inventory_logs">; _creationTime: number; createdAt: number; productId: GenericId<"products">; change: number; reason: string; }; fieldPaths: ("_creationTime" | "createdAt" | "productId" | "change" | "reason") | "_id"; indexes: { by_productId: ["productId", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; insights: { document: { _id: GenericId<"insights">; _creationTime: number; metric: string; value: number; timestamp: number; }; fieldPaths: ("_creationTime" | "metric" | "value" | "timestamp") | "_id"; indexes: { by_metric: ["metric", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; admin_todos: { document: { _id: GenericId<"admin_todos">; _creationTime: number; description?: string | undefined; title: string; isCompleted: boolean; createdBy: GenericId<"users">; }; fieldPaths: ("_creationTime" | "description" | "title" | "isCompleted" | "createdBy") | "_id"; indexes: { by_creator: ["createdBy", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; admin_notifications: { document: { _id: GenericId<"admin_notifications">; _creationTime: number; link?: string | undefined; type: "success" | "info" | "warning" | "error"; createdAt: number; message: string; isRead: boolean; }; fieldPaths: "_id" | ("type" | "_creationTime" | "createdAt" | "message" | "isRead" | "link"); indexes: { by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; user_notifications: { document: { _id: GenericId<"user_notifications">; _creationTime: number; link?: string | undefined; type: "success" | "info" | "warning" | "error"; createdAt: number; userId: GenericId<"users">; message: string; isRead: boolean; }; fieldPaths: ("type" | "_creationTime" | "createdAt" | "userId" | "message" | "isRead" | "link") | "_id"; indexes: { by_userId: ["userId", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; admin_queries: { document: { _id: GenericId<"admin_queries">; _creationTime: number; phone?: string | undefined; subject?: string | undefined; email: string; name: string; createdAt: number; message: string; }; fieldPaths: "_id" | ("email" | "name" | "phone" | "_creationTime" | "createdAt" | "message" | "subject"); indexes: { by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; categories: { document: { _id: GenericId<"categories">; _creationTime: number; description?: string | undefined; name: string; createdAt: number; }; fieldPaths: ("name" | "_creationTime" | "description" | "createdAt") | "_id"; indexes: { by_name: ["name", "_creationTime"]; by_id: ["_id"]; by_creation_time: ["_creationTime"]; }; searchIndexes: {}; vectorIndexes: {}; }; }>>; }) => {
          try {
            const product = await ctx.db.get(item.productId);
            if (!product) {
              return {
                ...item,
                name: "Product Not Available",
                price: 0,
                image: "/images/placeholder.webp",
              };
            }
            
            // Assert that product is from the products table
            const productData = product as {
              name: string;
              price: number;
              imageUrls?: string[];
            };
            
            return {
              ...item,
              name: productData.name,
              price: productData.price,
              image: productData.imageUrls?.[0] || "/images/placeholder.webp",
            };
          } catch (error) {
            console.error("Error getting product for guest cart:", error);
            return {
              ...item,
              name: "Error Loading Product",
              price: 0,
              image: "/images/placeholder.webp",
            };
          }
        })
      );
      
      return { items: detailedItems };
    }

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { items: [] }; // Return empty cart for non-logged-in users
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      // Return empty cart instead of throwing error when user is authenticated but not in the database
      return { items: [] };
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .unique();

    if (!cart) {
      return { items: [] };
    }

    // Make sure cart items is an array
    const cartItems = Array.isArray(cart.items) ? cart.items : [];
    
    const detailedItems = await Promise.all(
      cartItems.map(async (item) => {
        try {
          const product = await ctx.db.get(item.productId);
          if (!product) {
            return {
              ...item,
              name: "Product No Longer Available",
              price: 0,
              image: "/images/placeholder.webp",
            };
          }
          return {
            ...item,
            name: product.name,
            price: product.price,
            image: product.imageUrls?.[0] || "/images/placeholder.webp",
          };
        } catch (error) {
          console.error("Error fetching product details:", error);
          return {
            ...item,
            name: "Error Loading Product",
            price: 0,
            image: "/images/placeholder.webp",
          };
        }
      })
    );

    return { items: detailedItems };
  },
});
