import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api } from "../_generated/api";

// Mock KYC/AML Provider Integration
// In production, integrate with providers like Jumio, Onfido, Chainalysis, etc.

export const initiateKYCVerification = action({
  args: {
    investorId: v.id("investors"),
    provider: v.union(
      v.literal("jumio"),
      v.literal("onfido"),
      v.literal("sumsub"),
      v.literal("shufti_pro")
    ),
    documentType: v.union(
      v.literal("passport"),
      v.literal("drivers_license"),
      v.literal("national_id")
    ),
    jurisdiction: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Mock KYC provider API call
      const kycSessionId = `kyc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // In production, this would call the actual KYC provider API
      const mockKYCResponse = {
        sessionId: kycSessionId,
        status: "initiated",
        verificationUrl: `https://verify.${args.provider}.com/session/${kycSessionId}`,
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      // Store KYC session in database
      await ctx.runMutation(api.compliance.kyc.storeKYCSession, {
        investorId: args.investorId,
        sessionId: kycSessionId,
        provider: args.provider,
        status: "initiated",
        verificationUrl: mockKYCResponse.verificationUrl,
        expiresAt: mockKYCResponse.expiresAt
      });
      
      return {
        success: true,
        sessionId: kycSessionId,
        verificationUrl: mockKYCResponse.verificationUrl,
        expiresAt: mockKYCResponse.expiresAt
      };
    } catch (error) {
      console.error("KYC initiation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "KYC initiation failed"
      };
    }
  }
});

export const storeKYCSession = mutation({
  args: {
    investorId: v.id("investors"),
    sessionId: v.string(),
    provider: v.string(),
    status: v.string(),
    verificationUrl: v.string(),
    expiresAt: v.number()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("kycSessions", {
      investorId: args.investorId,
      sessionId: args.sessionId,
      provider: args.provider,
      status: args.status,
      verificationUrl: args.verificationUrl,
      expiresAt: args.expiresAt,
      createdAt: Date.now()
    });
  }
});

export const processKYCWebhook = action({
  args: {
    sessionId: v.string(),
    status: v.union(
      v.literal("completed"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("expired")
    ),
    riskScore: v.optional(v.number()),
    documentData: v.optional(v.object({
      firstName: v.string(),
      lastName: v.string(),
      dateOfBirth: v.string(),
      nationality: v.string(),
      documentNumber: v.string()
    }))
  },
  handler: async (ctx, args) => {
    try {
      // Update KYC session status
      const session = await ctx.runQuery(api.compliance.kyc.getKYCSession, {
        sessionId: args.sessionId
      });
      
      if (!session) {
        throw new Error("KYC session not found");
      }
      
      await ctx.runMutation(api.compliance.kyc.updateKYCSession, {
        sessionId: args.sessionId,
        status: args.status,
        riskScore: args.riskScore,
        documentData: args.documentData
      });
      
      // Update investor KYC status
      const kycStatus = args.status === "approved" ? "verified" : 
                      args.status === "rejected" ? "rejected" : "pending";
      
      return { success: true };
    } catch (error) {
      console.error("KYC webhook processing failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Webhook processing failed"
      };
    }
  }
});

export const getKYCSession = query({
  args: {
    sessionId: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("kycSessions")
      .filter(q => q.eq(q.field("sessionId"), args.sessionId))
      .unique();
  }
});

export const updateKYCSession = mutation({
  args: {
    sessionId: v.string(),
    status: v.string(),
    riskScore: v.optional(v.number()),
    documentData: v.optional(v.object({
      firstName: v.string(),
      lastName: v.string(),
      dateOfBirth: v.string(),
      nationality: v.string(),
      documentNumber: v.string()
    }))
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("kycSessions")
      .filter(q => q.eq(q.field("sessionId"), args.sessionId))
      .unique();
    
    if (!session) {
      throw new Error("KYC session not found");
    }
    
    await ctx.db.patch(session._id, {
      status: args.status,
      riskScore: args.riskScore,
      documentData: args.documentData,
      updatedAt: Date.now()
    });
    
    return { success: true };
  }
});

export const performAMLScreening = action({
  args: {
    investorId: v.id("investors"),
    fullName: v.string(),
    dateOfBirth: v.string(),
    nationality: v.string(),
    address: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    try {
      // Mock AML screening against sanctions lists
      // In production, integrate with Chainalysis, Elliptic, or similar providers
      
      const sanctionsLists = [
        "OFAC SDN", "EU Sanctions", "UN Sanctions", "PEP Lists"
      ];
      
      const mockAMLResult = {
        riskScore: Math.floor(Math.random() * 100),
        matches: [],
        sanctionsChecked: sanctionsLists,
        pepStatus: false,
        adverseMediaHits: 0
      };
      
      // Determine AML status based on risk score
      const amlStatus = mockAMLResult.riskScore < 30 ? "cleared" :
                       mockAMLResult.riskScore < 70 ? "pending" : "flagged";
      
      return {
        success: true,
        amlResult: {
          status: amlStatus,
          riskScore: mockAMLResult.riskScore,
          sanctionsChecked: mockAMLResult.sanctionsChecked,
          pepStatus: mockAMLResult.pepStatus
        }
      };
    } catch (error) {
      console.error("AML screening failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "AML screening failed"
      };
    }
  }
});
