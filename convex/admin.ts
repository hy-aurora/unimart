import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get dashboard statistics for admin
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    // Get the user identity 
    const identity = await ctx.auth.getUserIdentity();
    
    // Initialize default empty response
    const emptyStats = {
      counts: {
        products: 0,
        schools: 0,
        orders: 0,
        users: 0,
        featuredProducts: 0,
        saleProducts: 0,
        newProducts: 0,
      },
      revenue: 0,
      recentOrders: [],
      lowStockProducts: [],
      ordersByStatus: {
        pending: 0,
        paid: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
      },
      salesTrend: [],
      popularProducts: [],
    };

    // If no identity, return empty stats instead of throwing an error
    if (!identity) {
      return emptyStats;
    }

    // Check if the user is an admin
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    // If not an admin, return empty stats
    if (!user || user.role !== "admin") {
      return emptyStats;
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

    // Calculate sales by status
    const ordersByStatus = {
      pending: orders.filter(order => order.status === "pending").length,
      paid: orders.filter(order => order.status === "paid").length,
      shipped: orders.filter(order => order.status === "shipped").length,
      delivered: orders.filter(order => order.status === "delivered").length,
      cancelled: orders.filter(order => order.status === "cancelled").length,
    };

    // Get sales trend data (last 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Initialize arrays for each day
    const salesTrend = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      salesTrend.push({
        date: dateStr,
        sales: 0,
        orders: 0,
      });
    }
    
    // Populate with order data
    for (const order of orders) {
      const orderDate = new Date(order.createdAt);
      const orderDateStr = orderDate.toISOString().split('T')[0];
      
      // Only include orders from the last 7 days
      const trendDay = salesTrend.find(day => day.date === orderDateStr);
      if (trendDay) {
        trendDay.sales += order.totalAmount;
        trendDay.orders += 1;
      }
    }

    // Get popular products (by frequency in orders)
    interface ProductFrequencyItem {
      count: number;
      revenue: number;
      name: string;
      productId: string;
    }
    
    const productFrequency: Record<string, ProductFrequencyItem> = {};
    for (const order of orders) {
      for (const item of order.items) {
        if (!productFrequency[item.productId as string]) {
          productFrequency[item.productId] = {
            count: 0,
            revenue: 0,
            name: item.name,
            productId: item.productId,
          };
        }
        productFrequency[item.productId].count += item.quantity;
        productFrequency[item.productId].revenue += item.price * item.quantity;
      }
    }
    
    const popularProducts = Object.values(productFrequency)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

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
      ordersByStatus,
      salesTrend,
      popularProducts,
    };
  },
});
