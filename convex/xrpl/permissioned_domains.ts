import { action, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";

// Permissioned Domains Implementation (XLS-80)
// Provides credential-gated access control for XRPL resources

export const createPermissionedDomain = action({
  args: {
    fundId: v.optional(v.id("funds")),
    domain: v.string(),
    owner: v.string(),
    network: v.string(),
    accessRules: v.array(v.object({
      credentialType: v.string(),
      issuer: v.string(),
      required: v.boolean(),
      expiryCheck: v.boolean()
    })),
    kycRequired: v.boolean(),
    amlRequired: v.boolean(),
    jurisdictionRestrictions: v.array(v.string())
  },
  handler: async (ctx, args) => {
    try {
      // Generate unique domain ID
      const domainId = `domain_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Prepare domain creation transaction
      const domainTransaction = {
        TransactionType: "DomainCreate",
        Account: args.owner,
        Domain: Buffer.from(args.domain).toString('hex').toUpperCase(),
        DomainID: domainId
      };

      // Submit to XRPL
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "DomainCreate",
        account: args.owner,
        memos: [{
          data: Buffer.from(JSON.stringify({
            domainId,
            domain: args.domain,
            fundId: args.fundId,
            accessRules: args.accessRules,
            compliance: {
              kycRequired: args.kycRequired,
              amlRequired: args.amlRequired,
              jurisdictionRestrictions: args.jurisdictionRestrictions
            }
          })).toString('hex').toUpperCase(),
          type: Buffer.from("domain_creation").toString('hex').toUpperCase(),
          format: Buffer.from("application/json").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Domain creation failed: ${txResult.error}`);
      }

      // Store domain record
      await ctx.runMutation(api.xrpl.permissioned_domains.storeDomain, {
        domainId,
        fundId: args.fundId,
        domain: args.domain,
        owner: args.owner,
        accessRules: args.accessRules,
        authorizedIssuers: [],
        authorizedHolders: [],
        kycRequired: args.kycRequired,
        amlRequired: args.amlRequired,
        jurisdictionRestrictions: args.jurisdictionRestrictions,
        createdLedger: txResult.ledgerIndex,
        status: "active"
      });

      return {
        success: true,
        domainId,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Domain creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Domain creation failed"
      };
    }
  }
});

export const storeDomain = mutation({
  args: {
    domainId: v.string(),
    fundId: v.optional(v.id("funds")),
    domain: v.string(),
    owner: v.string(),
    accessRules: v.array(v.object({
      credentialType: v.string(),
      issuer: v.string(),
      required: v.boolean(),
      expiryCheck: v.boolean()
    })),
    authorizedIssuers: v.array(v.string()),
    authorizedHolders: v.array(v.string()),
    kycRequired: v.boolean(),
    amlRequired: v.boolean(),
    jurisdictionRestrictions: v.array(v.string()),
    createdLedger: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("suspended"),
      v.literal("revoked")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("permissionedDomains", {
      domainId: args.domainId,
      fundId: args.fundId,
      domain: args.domain,
      owner: args.owner,
      accessRules: args.accessRules,
      authorizedIssuers: args.authorizedIssuers,
      authorizedHolders: args.authorizedHolders,
      kycRequired: args.kycRequired,
      amlRequired: args.amlRequired,
      jurisdictionRestrictions: args.jurisdictionRestrictions,
      createdLedger: args.createdLedger,
      lastModified: Date.now(),
      status: args.status
    });
  }
});

export const authorizeCredentialIssuer = action({
  args: {
    domainId: v.string(),
    issuerAccount: v.string(),
    credentialType: v.string(),
    ownerAccount: v.string(),
    network: v.string(),
    authorize: v.boolean()
  },
  handler: async (ctx, args) => {
    try {
      // Submit issuer authorization transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "DomainSet",
        account: args.ownerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            domainId: args.domainId,
            action: args.authorize ? "authorize_issuer" : "revoke_issuer",
            issuer: args.issuerAccount,
            credentialType: args.credentialType
          })).toString('hex').toUpperCase(),
          type: Buffer.from("issuer_authorization").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Issuer authorization failed: ${txResult.error}`);
      }

      // Update domain record
      await ctx.runMutation(api.xrpl.permissioned_domains.updateAuthorizedIssuer, {
        domainId: args.domainId,
        issuerAccount: args.issuerAccount,
        authorize: args.authorize
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Issuer authorization failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Authorization failed"
      };
    }
  }
});

export const updateAuthorizedIssuer = mutation({
  args: {
    domainId: v.string(),
    issuerAccount: v.string(),
    authorize: v.boolean()
  },
  handler: async (ctx, args) => {
    const domain = await ctx.db
      .query("permissionedDomains")
      .filter(q => q.eq(q.field("domainId"), args.domainId))
      .unique();

    if (!domain) {
      throw new Error("Domain not found");
    }

    let authorizedIssuers = [...domain.authorizedIssuers];
    
    if (args.authorize) {
      if (!authorizedIssuers.includes(args.issuerAccount)) {
        authorizedIssuers.push(args.issuerAccount);
      }
    } else {
      authorizedIssuers = authorizedIssuers.filter(issuer => issuer !== args.issuerAccount);
    }

    await ctx.db.patch(domain._id, {
      authorizedIssuers,
      lastModified: Date.now()
    });

    return { success: true };
  }
});

export const verifyDomainAccess = query({
  args: {
    domainId: v.string(),
    holderAccount: v.string(),
    credentials: v.array(v.object({
      type: v.string(),
      issuer: v.string(),
      issuanceDate: v.string(),
      expirationDate: v.optional(v.string()),
      verified: v.boolean()
    }))
  },
  handler: async (ctx, args) => {
    const domain = await ctx.db
      .query("permissionedDomains")
      .filter(q => q.eq(q.field("domainId"), args.domainId))
      .unique();

    if (!domain) {
      return {
        authorized: false,
        reason: "Domain not found"
      };
    }

    if (domain.status !== "active") {
      return {
        authorized: false,
        reason: "Domain is not active"
      };
    }

    // Check if holder is explicitly authorized
    if (domain.authorizedHolders.includes(args.holderAccount)) {
      return {
        authorized: true,
        reason: "Explicitly authorized holder"
      };
    }

    // Verify access rules
    const accessResults = [];
    
    for (const rule of domain.accessRules) {
      const matchingCredential = args.credentials.find(cred => 
        cred.type === rule.credentialType && 
        domain.authorizedIssuers.includes(cred.issuer)
      );

      if (rule.required && !matchingCredential) {
        return {
          authorized: false,
          reason: `Missing required credential: ${rule.credentialType}`
        };
      }

      if (matchingCredential) {
        if (!matchingCredential.verified) {
          return {
            authorized: false,
            reason: `Unverified credential: ${rule.credentialType}`
          };
        }

        if (rule.expiryCheck && matchingCredential.expirationDate) {
          const expiryDate = new Date(matchingCredential.expirationDate);
          if (expiryDate < new Date()) {
            return {
              authorized: false,
              reason: `Expired credential: ${rule.credentialType}`
            };
          }
        }

        accessResults.push({
          rule: rule.credentialType,
          satisfied: true,
          credential: matchingCredential
        });
      }
    }

    return {
      authorized: true,
      reason: "All access rules satisfied",
      accessResults
    };
  }
});

export const grantDomainAccess = action({
  args: {
    domainId: v.string(),
    holderAccount: v.string(),
    ownerAccount: v.string(),
    network: v.string(),
    reason: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit access grant transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "DomainSet",
        account: args.ownerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            domainId: args.domainId,
            action: "grant_access",
            holder: args.holderAccount,
            reason: args.reason
          })).toString('hex').toUpperCase(),
          type: Buffer.from("access_grant").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Access grant failed: ${txResult.error}`);
      }

      // Update domain record
      await ctx.runMutation(api.xrpl.permissioned_domains.updateAuthorizedHolder, {
        domainId: args.domainId,
        holderAccount: args.holderAccount,
        authorize: true
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Access grant failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Access grant failed"
      };
    }
  }
});

export const updateAuthorizedHolder = mutation({
  args: {
    domainId: v.string(),
    holderAccount: v.string(),
    authorize: v.boolean()
  },
  handler: async (ctx, args) => {
    const domain = await ctx.db
      .query("permissionedDomains")
      .filter(q => q.eq(q.field("domainId"), args.domainId))
      .unique();

    if (!domain) {
      throw new Error("Domain not found");
    }

    let authorizedHolders = [...domain.authorizedHolders];
    
    if (args.authorize) {
      if (!authorizedHolders.includes(args.holderAccount)) {
        authorizedHolders.push(args.holderAccount);
      }
    } else {
      authorizedHolders = authorizedHolders.filter(holder => holder !== args.holderAccount);
    }

    await ctx.db.patch(domain._id, {
      authorizedHolders,
      lastModified: Date.now()
    });

    return { success: true };
  }
});

export const revokeDomainAccess = action({
  args: {
    domainId: v.string(),
    holderAccount: v.string(),
    ownerAccount: v.string(),
    network: v.string(),
    reason: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit access revocation transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "DomainSet",
        account: args.ownerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            domainId: args.domainId,
            action: "revoke_access",
            holder: args.holderAccount,
            reason: args.reason
          })).toString('hex').toUpperCase(),
          type: Buffer.from("access_revocation").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Access revocation failed: ${txResult.error}`);
      }

      // Update domain record
      await ctx.runMutation(api.xrpl.permissioned_domains.updateAuthorizedHolder, {
        domainId: args.domainId,
        holderAccount: args.holderAccount,
        authorize: false
      });

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Access revocation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Access revocation failed"
      };
    }
  }
});

export const getDomainInfo = query({
  args: {
    domainId: v.string()
  },
  handler: async (ctx, args) => {
    const domain = await ctx.db
      .query("permissionedDomains")
      .filter(q => q.eq(q.field("domainId"), args.domainId))
      .unique();

    if (!domain) {
      return null;
    }

    // Get associated fund info if applicable
    let fundInfo = null;
    if (domain.fundId) {
      fundInfo = await ctx.db.get(domain.fundId);
    }

    return {
      ...domain,
      fund: fundInfo
    };
  }
});

export const listDomainsByFund = query({
  args: {
    fundId: v.id("funds")
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("permissionedDomains")
      .filter(q => q.eq(q.field("fundId"), args.fundId))
      .collect();
  }
});

export const updateDomainAccessRules = action({
  args: {
    domainId: v.string(),
    accessRules: v.array(v.object({
      credentialType: v.string(),
      issuer: v.string(),
      required: v.boolean(),
      expiryCheck: v.boolean()
    })),
    ownerAccount: v.string(),
    network: v.string()
  },
  handler: async (ctx, args) => {
    try {
      // Submit access rules update transaction
      const txResult = await ctx.runAction(api.xrpl.enhanced_client.submitXRPLTransaction, {
        network: args.network,
        transactionType: "DomainSet",
        account: args.ownerAccount,
        memos: [{
          data: Buffer.from(JSON.stringify({
            domainId: args.domainId,
            action: "update_access_rules",
            accessRules: args.accessRules
          })).toString('hex').toUpperCase(),
          type: Buffer.from("access_rules_update").toString('hex').toUpperCase()
        }]
      });

      if (!txResult.success) {
        throw new Error(`Access rules update failed: ${txResult.error}`);
      }

      // Update domain record
      const domain = await ctx.db
        .query("permissionedDomains")
        .filter(q => q.eq(q.field("domainId"), args.domainId))
        .unique();

      if (domain) {
        await ctx.db.patch(domain._id, {
          accessRules: args.accessRules,
          lastModified: Date.now()
        });
      }

      return {
        success: true,
        txHash: txResult.hash,
        ledgerIndex: txResult.ledgerIndex
      };
    } catch (error) {
      console.error("Access rules update failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Access rules update failed"
      };
    }
  }
});
