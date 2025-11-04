import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    userId: v.id("users"),
    investorType: v.union(
      v.literal("retail"),
      v.literal("accredited"),
      v.literal("qualified_purchaser"),
      v.literal("institutional"),
      v.literal("sovereign_wealth"),
      v.literal("pension_fund"),
      v.literal("insurance_company"),
      v.literal("bank"),
      v.literal("family_office")
    ),
    xrplAccount: v.string(),
    didDocument: v.string(),
    credentialHash: v.string(),
    kycStatus: v.union(
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("expired"),
      v.literal("verified")
    ),
    amlStatus: v.union(
      v.literal("pending"),
      v.literal("cleared"),
      v.literal("flagged"),
      v.literal("blocked")
    ),
    kycProvider: v.optional(v.string()),
    kycCompletedAt: v.optional(v.number()),
    kycExpiresAt: v.optional(v.number()),
    jurisdictionOfResidence: v.string(),
    jurisdiction: v.string(),
    taxResidency: v.array(v.string()),
    sanctionsScreening: v.object({
      status: v.union(v.literal("clear"), v.literal("flagged"), v.literal("blocked")),
      lastScreened: v.number(),
      provider: v.string()
    }),
    pepStatus: v.boolean(),
    netWorth: v.optional(v.number()),
    annualIncome: v.optional(v.number()),
    accreditationStatus: v.union(
      v.literal("retail"),
      v.literal("accredited"),
      v.literal("qualified_purchaser"),
      v.literal("institutional")
    ),
    credentials: v.array(v.object({
      id: v.string(),
      type: v.string(),
      issuer: v.string(),
      issuedAt: v.number(),
      expiresAt: v.optional(v.number()),
      status: v.union(v.literal("active"), v.literal("revoked"), v.literal("expired"))
    })),
    domainMemberships: v.array(v.string()),
    status: v.union(v.literal("active"), v.literal("suspended"), v.literal("closed")),
    onboardingCompletedAt: v.optional(v.number()),
    lastActivity: v.number()
  },
  returns: v.id("investors"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("investors", args);
  },
});

