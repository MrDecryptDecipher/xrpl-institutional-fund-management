import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Create or update user profile with Xaman authentication
 */
export const createUserProfile = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    xrplAccount: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    // Check if user profile already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_xrpl_account", (q) => q.eq("xrplAccount", args.xrplAccount))
      .first();

    if (existingUser) {
      // Update existing user
      await ctx.db.patch(existingUser._id, {
        fullName: args.fullName,
        email: args.email,
        lastLogin: Date.now(),
      });
      return existingUser._id;
    } else {
      // Create new user
      const userId = await ctx.db.insert("users", {
        fullName: args.fullName,
        email: args.email,
        xrplAccount: args.xrplAccount,
        networkPreference: "demo", // Default to demo mode
        createdAt: Date.now(),
        lastLogin: Date.now(),
      });
      return userId;
    }
  },
});

/**
 * Get user profile by XRPL account
 */
export const getUserProfile = query({
  args: {
    xrplAccount: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_xrpl_account", (q) => q.eq("xrplAccount", args.xrplAccount))
      .first();
    
    return user;
  },
});

/**
 * Update user's network preference
 */
export const updateNetworkPreference = mutation({
  args: {
    xrplAccount: v.string(),
    networkPreference: v.union(v.literal("demo"), v.literal("testnet"), v.literal("mainnet")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_xrpl_account", (q) => q.eq("xrplAccount", args.xrplAccount))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      networkPreference: args.networkPreference,
    });

    return { success: true };
  },
});

/**
 * Get current authenticated user
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    // Try to find user by identity
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .first();

    return user;
  },
});

/**
 * Store Xaman user token for push notifications
 */
export const storeXamanUserToken = mutation({
  args: {
    xrplAccount: v.string(),
    userToken: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_xrpl_account", (q) => q.eq("xrplAccount", args.xrplAccount))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Token expires after 30 days (as per Xaman documentation)
    const expiryTimestamp = Date.now() + (30 * 24 * 60 * 60 * 1000);

    await ctx.db.patch(user._id, {
      xamanUserToken: args.userToken,
      xamanTokenExpiry: expiryTimestamp,
    });

    return { success: true, expiryTimestamp };
  },
});

/**
 * Get Xaman user token for an account
 */
export const getXamanUserToken = query({
  args: {
    xrplAccount: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_xrpl_account", (q) => q.eq("xrplAccount", args.xrplAccount))
      .first();

    if (!user || !user.xamanUserToken) {
      return null;
    }

    // Check if token is expired
    if (user.xamanTokenExpiry && user.xamanTokenExpiry < Date.now()) {
      return null; // Token expired
    }

    return {
      userToken: user.xamanUserToken,
      expiryTimestamp: user.xamanTokenExpiry,
    };
  },
});

