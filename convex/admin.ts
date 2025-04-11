import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get dashboard statistics for admin
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    // Verify that the user is an admin
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.subject) {
      throw new ConvexError("Unauthorized: Missing or invalid identity");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new ConvexError("Unauthorized: Admin access required");
    }

    // Get count of products
    const products = await ctx.db.query("products").collect();
    const productCount = products.length;

    // Get count of schools
    const schools = await ctx.db.query("schools").collect();
    const schoolCount = schools.length;

    // Get count of orders
    const orders = await ctx.db.query("orders").collect();
    const orderCount = orders.length;

    // Get count of users
    const users = await ctx.db.query("users").collect();
    const userCount = users.length;

    // Calculate total revenue
    const totalRevenue = orders.reduce((total, order) => total + order.totalAmount, 0);

    // Get recent orders
    const recentOrders = await ctx.db
      .query("orders")
      .order("desc")
      .take(5);

    // Get low stock products (less than 5 in stock)
    const lowStockProducts = products.filter(product => product.stock < 5);
    
    // Count featured, sale, and new products
    const featuredProductsCount = products.filter(product => product.isFeatured).length;
    const saleProductsCount = products.filter(product => product.isSale).length;
    const newProductsCount = products.filter(product => product.isNew).length;

    return {
      counts: {
        products: productCount,
        schools: schoolCount,
        orders: orderCount,
        users: userCount,
        featuredProducts: featuredProductsCount,
        saleProducts: saleProductsCount,
        newProducts: newProductsCount,
      },
      revenue: totalRevenue,
      recentOrders,
      lowStockProducts,
    };
  },
});
