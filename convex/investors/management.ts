import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const registerInvestor: any = mutation({
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
  handler: async (ctx: any, args: any) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Authentication required");
    }

    // Check if investor already exists
    const existingInvestor = await ctx.db
      .query("investors")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
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

export const updateKYCStatus: any = mutation({
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
  handler: async (ctx: any, args: any) => {
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
      id: v.string(),
      type: v.string(),
      issuer: v.string(),
      issuedAt: v.number(),
      expiresAt: v.optional(v.number()),
      status: v.union(
        v.literal("active"), 
        v.literal("revoked"), 
        v.literal("expired")
      )
    })
  },
  handler: async (ctx, args) => {
    const investor = await ctx.db.get(args.investorId);
    if (!investor) {
      throw new Error("Investor not found");
    }

    // Validate that the new credential matches the schema exactly
    const newCredential = {
      id: args.credential.id,
      type: args.credential.type,
      issuer: args.credential.issuer,
      issuedAt: args.credential.issuedAt,
      expiresAt: args.credential.expiresAt,
      status: args.credential.status
    };

    // Filter out any existing credentials that don't match the expected structure
    // This handles cases where credentials with DID structure might have been added incorrectly
    const validCredentials = investor.credentials.filter(cred => {
      // Check if credential has the correct investor structure
      const hasCorrectStructure = 
        typeof cred.id === 'string' &&
        typeof cred.type === 'string' &&
        typeof cred.issuer === 'string' &&
        typeof cred.issuedAt === 'number' &&
        (cred.expiresAt === undefined || typeof cred.expiresAt === 'number') &&
        (cred.status === 'active' || cred.status === 'revoked' || cred.status === 'expired');
      
      return hasCorrectStructure;
    });

    const updatedCredentials = [...validCredentials, newCredential];

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

    // Filter out any existing credentials that don't match the expected structure
    // This handles cases where credentials with DID structure might have been added incorrectly
    const validCredentials = investor.credentials.filter(cred => {
      // Check if credential has the correct investor structure
      const hasCorrectStructure = 
        typeof cred.id === 'string' &&
        typeof cred.type === 'string' &&
        typeof cred.issuer === 'string' &&
        typeof cred.issuedAt === 'number' &&
        (cred.expiresAt === undefined || typeof cred.expiresAt === 'number') &&
        (cred.status === 'active' || cred.status === 'revoked' || cred.status === 'expired');
      
      return hasCorrectStructure;
    });

    const updatedCredentials = validCredentials.map(cred => 
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

export const updateInvestorKYC: any = mutation({
  args: {
    investorId: v.id("investors"),
    kycStatus: v.union(
      v.literal("pending"),
      v.literal("in_review"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("expired"),
      v.literal("verified")
    ),
    kycProvider: v.string(),
    kycCompletedAt: v.number(),
    kycExpiresAt: v.number(),
    netWorth: v.number(),
    annualIncome: v.number(),
    investmentExperience: v.string(),
    riskTolerance: v.string(),
    jurisdictionOfResidence: v.string(),
    taxResidency: v.array(v.string()),
    pepStatus: v.boolean(),
    sanctionsScreening: v.object({
      status: v.union(v.literal("clear"), v.literal("flagged"), v.literal("blocked")),
      lastScreened: v.number(),
      provider: v.string()
    })
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.patch(args.investorId, {
      kycStatus: args.kycStatus,
      kycProvider: args.kycProvider,
      kycCompletedAt: args.kycCompletedAt,
      kycExpiresAt: args.kycExpiresAt,
      netWorth: args.netWorth,
      annualIncome: args.annualIncome,
      investmentExperience: args.investmentExperience,
      riskTolerance: args.riskTolerance,
      jurisdictionOfResidence: args.jurisdictionOfResidence,
      taxResidency: args.taxResidency,
      pepStatus: args.pepStatus,
      sanctionsScreening: args.sanctionsScreening
    });

    return { success: true };
  }
});

export const updateInvestorAML: any = mutation({
  args: {
    investorId: v.id("investors"),
    amlStatus: v.union(
      v.literal("pending"),
      v.literal("cleared"),
      v.literal("flagged"),
      v.literal("blocked")
    ),
    sanctionsScreening: v.object({
      status: v.union(v.literal("clear"), v.literal("flagged"), v.literal("blocked")),
      lastScreened: v.number(),
      provider: v.string()
    })
  },
  handler: async (ctx: any, args: any) => {
    await ctx.db.patch(args.investorId, {
      amlStatus: args.amlStatus,
      sanctionsScreening: args.sanctionsScreening
    });

    return { success: true };
  }
});

export const getInvestor = query({
  args: {
    userId: v.optional(v.id("users")),
    investorId: v.optional(v.id("investors"))
  },
  handler: async (ctx: any, args: any) => {
    if (args.investorId) {
      return await ctx.db.get(args.investorId);
    }

    if (args.userId) {
      return await ctx.db
        .query("investors")
        .withIndex("by_user", (q: any) => q.eq("userId", args.userId!))
        .unique();
    }

    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    return await ctx.db
      .query("investors")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
      .unique();
  }
});

export const getInvestorsByJurisdiction = query({
  args: {
    jurisdiction: v.string()
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("investors")
      .withIndex("by_jurisdictionOfResidence", (q: any) => q.eq("jurisdictionOfResidence", args.jurisdiction))
      .collect();
  }
});

export const getInvestorHoldings = query({
  args: {
    fundId: v.id("funds"),
    investorId: v.id("investors")
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.db
      .query("holdings")
      .filter((q: any) => q.and(
        q.eq(q.field("fundId"), args.fundId),
        q.eq(q.field("investorId"), args.investorId),
        q.eq(q.field("status"), "active")
      ))
      .unique();
  }
});

export const validateInvestorCompliance = query({
  args: {
    investorId: v.id("investors"),
    fundId: v.id("funds")
  },
  handler: async (ctx: any, args: any) => {
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
    if (fund.complianceRules && fund.complianceRules.kycRequired && investor.kycStatus !== "verified") {
      errors.push("KYC verification required");
    }

    // Check AML requirement
    if (fund.complianceRules && fund.complianceRules.amlRequired && investor.amlStatus !== "cleared") {
      errors.push("AML clearance required");
    }

    // Check accreditation requirement
    if (fund.complianceRules && fund.complianceRules.accreditedOnly && investor.accreditationStatus === "retail") {
      errors.push("Accredited investor status required");
    }

    // Check jurisdiction restrictions
    if (fund.complianceRules && fund.complianceRules.jurisdictionRestrictions && fund.complianceRules.jurisdictionRestrictions.includes(investor.jurisdiction)) {
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
