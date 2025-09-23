import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const registerInvestor = mutation({
  args: {
    didDocument: v.string(),
    xrplAccount: v.string(),
    jurisdiction: v.string(),
    accreditationStatus: v.union(
      v.literal("retail"),
      v.literal("accredited"),
      v.literal("institutional")
    )
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    // Check if investor already exists
    const existingInvestor = await ctx.db
      .query("investors")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();

    if (existingInvestor) {
      throw new Error("Investor already registered");
    }

    const investorId = await ctx.db.insert("investors", {
      userId: userId,
      investorType: "retail",
      xrplAccount: args.xrplAccount,
      didDocument: args.didDocument,
      credentialHash: "pending",
      kycStatus: "pending",
      amlStatus: "pending",
      jurisdictionOfResidence: args.jurisdiction,
      jurisdiction: args.jurisdiction,
      taxResidency: [args.jurisdiction],
      sanctionsScreening: {
        status: "clear",
        lastScreened: Date.now(),
        provider: "internal"
      },
      pepStatus: false,
      accreditationStatus: args.accreditationStatus,
      credentials: [],
      domainMemberships: [],
      status: "active",
      lastActivity: Date.now()
    });

    return investorId;
  }
});

export const updateKYCStatus = mutation({
  args: {
    investorId: v.id("investors"),
    kycStatus: v.union(
      v.literal("pending"),
      v.literal("verified"),
      v.literal("rejected"),
      v.literal("expired")
    ),
    amlStatus: v.union(
      v.literal("pending"),
      v.literal("cleared"),
      v.literal("flagged")
    )
  },
  handler: async (ctx, args) => {
    // This should be called by authorized KYC/AML providers
    await ctx.db.patch(args.investorId, {
      kycStatus: args.kycStatus,
      amlStatus: args.amlStatus
    });

    return { success: true };
  }
});

export const addCredential = mutation({
  args: {
    investorId: v.id("investors"),
    credential: v.object({
      type: v.string(),
      issuer: v.string(),
      issuanceDate: v.number(),
      expiryDate: v.optional(v.number()),
      status: v.union(v.literal("active"), v.literal("revoked"))
    })
  },
  handler: async (ctx, args) => {
    const investor = await ctx.db.get(args.investorId);
    if (!investor) {
      throw new Error("Investor not found");
    }

    const updatedCredentials = [...investor.credentials, args.credential];

    await ctx.db.patch(args.investorId, {
      credentials: updatedCredentials
    });

    return { success: true };
  }
});

export const revokeCredential = mutation({
  args: {
    investorId: v.id("investors"),
    credentialType: v.string(),
    issuer: v.string()
  },
  handler: async (ctx, args) => {
    const investor = await ctx.db.get(args.investorId);
    if (!investor) {
      throw new Error("Investor not found");
    }

    const updatedCredentials = investor.credentials.map(cred => 
      cred.type === args.credentialType && cred.issuer === args.issuer
        ? { ...cred, status: "revoked" as const }
        : cred
    );

    await ctx.db.patch(args.investorId, {
      credentials: updatedCredentials
    });

    return { success: true };
  }
});

export const addDomainMembership = mutation({
  args: {
    investorId: v.id("investors"),
    domainId: v.string()
  },
  handler: async (ctx, args) => {
    const investor = await ctx.db.get(args.investorId);
    if (!investor) {
      throw new Error("Investor not found");
    }

    if (!investor.domainMemberships.includes(args.domainId)) {
      const updatedMemberships = [...investor.domainMemberships, args.domainId];

      await ctx.db.patch(args.investorId, {
        domainMemberships: updatedMemberships
      });
    }

    return { success: true };
  }
});

export const getInvestor = query({
  args: {
    userId: v.optional(v.id("users")),
    investorId: v.optional(v.id("investors"))
  },
  handler: async (ctx, args) => {
    if (args.investorId) {
      return await ctx.db.get(args.investorId);
    }

    if (args.userId) {
      return await ctx.db
        .query("investors")
        .withIndex("by_user", q => q.eq("userId", args.userId!))
        .unique();
    }

    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return await ctx.db
      .query("investors")
      .withIndex("by_user", q => q.eq("userId", userId))
      .unique();
  }
});

export const getInvestorsByJurisdiction = query({
  args: {
    jurisdiction: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("investors")
      .withIndex("by_jurisdictionOfResidence", q => q.eq("jurisdictionOfResidence", args.jurisdiction))
      .collect();
  }
});

export const validateInvestorCompliance = query({
  args: {
    investorId: v.id("investors"),
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    const investor = await ctx.db.get(args.investorId);
    const fund = await ctx.db.get(args.fundId);

    if (!investor || !fund) {
      return {
        isCompliant: false,
        errors: ["Investor or fund not found"]
      };
    }

    const errors: string[] = [];

    // Check KYC requirement
    if (fund.complianceRules.kycRequired && investor.kycStatus !== "verified") {
      errors.push("KYC verification required");
    }

    // Check AML requirement
    if (fund.complianceRules.amlRequired && investor.amlStatus !== "cleared") {
      errors.push("AML clearance required");
    }

    // Check accreditation requirement
    if (fund.complianceRules.accreditedOnly && investor.accreditationStatus === "retail") {
      errors.push("Accredited investor status required");
    }

    // Check jurisdiction restrictions
    if (fund.complianceRules.jurisdictionRestrictions.includes(investor.jurisdiction)) {
      errors.push(`Investment restricted for jurisdiction: ${investor.jurisdiction}`);
    }

    return {
      isCompliant: errors.length === 0,
      errors: errors,
      investor: investor,
      fund: fund
    };
  }
});
